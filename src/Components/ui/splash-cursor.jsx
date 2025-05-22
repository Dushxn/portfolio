"use client"
import { useEffect, useRef } from "react"

function SplashCursor({
  // Add whatever props you like for customization
  SIM_RESOLUTION = 128,
  DYE_RESOLUTION = 1024,
  CAPTURE_RESOLUTION = 512,
  DENSITY_DISSIPATION = 3.5,
  VELOCITY_DISSIPATION = 2,
  PRESSURE = 0.1,
  PRESSURE_ITERATIONS = 20,
  CURL = 3,
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 6000,
  SHADING = true,
  COLOR_UPDATE_SPEED = 10,
  BACK_COLOR = { r: 0.5, g: 0, b: 0 },
  TRANSPARENT = true,
  isMobile = false,
}) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas to full window size
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    function pointerPrototype() {
      this.id = -1
      this.texcoordX = 0
      this.texcoordY = 0
      this.prevTexcoordX = 0
      this.prevTexcoordY = 0
      this.deltaX = 0
      this.deltaY = 0
      this.down = false
      this.moved = false
      this.color = [0, 0, 0]
    }

    const config = {
      SIM_RESOLUTION,
      DYE_RESOLUTION,
      CAPTURE_RESOLUTION,
      DENSITY_DISSIPATION,
      VELOCITY_DISSIPATION,
      PRESSURE,
      PRESSURE_ITERATIONS,
      CURL,
      SPLAT_RADIUS,
      SPLAT_FORCE,
      SHADING,
      COLOR_UPDATE_SPEED,
      PAUSED: false,
      BACK_COLOR,
      TRANSPARENT,
    }

    const pointers = [new pointerPrototype()]

    // Handle window resize
    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener("resize", handleResize)

    // Try to get WebGL context with error handling
    let gl, ext
    try {
      const result = getWebGLContext(canvas)
      gl = result.gl
      ext = result.ext

      if (!gl) {
        console.error("WebGL not supported")
        return
      }

      if (!ext.supportLinearFiltering) {
        config.DYE_RESOLUTION = 256
        config.SHADING = false
      }
    } catch (e) {
      console.error("Error initializing WebGL:", e)
      return
    }

    function getWebGLContext(canvas) {
      const params = {
        alpha: true,
        depth: false,
        stencil: false,
        antialias: false,
        preserveDrawingBuffer: false,
      }
      let gl = canvas.getContext("webgl2", params)
      const isWebGL2 = !!gl
      if (!isWebGL2) gl = canvas.getContext("webgl", params) || canvas.getContext("experimental-webgl", params)

      if (!gl) return { gl: null, ext: null }

      let halfFloat
      let supportLinearFiltering
      if (isWebGL2) {
        gl.getExtension("EXT_color_buffer_float")
        supportLinearFiltering = gl.getExtension("OES_texture_float_linear")
      } else {
        halfFloat = gl.getExtension("OES_texture_half_float")
        supportLinearFiltering = gl.getExtension("OES_texture_half_float_linear")
      }
      gl.clearColor(0.0, 0.0, 0.0, 1.0)
      const halfFloatTexType = isWebGL2 ? gl.HALF_FLOAT : halfFloat && halfFloat.HALF_FLOAT_OES
      let formatRGBA
      let formatRG
      let formatR

      if (isWebGL2) {
        formatRGBA = getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, halfFloatTexType)
        formatRG = getSupportedFormat(gl, gl.RG16F, gl.RG, halfFloatTexType)
        formatR = getSupportedFormat(gl, gl.R16F, gl.RED, halfFloatTexType)
      } else {
        formatRGBA = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
        formatRG = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
        formatR = getSupportedFormat(gl, gl.RGBA, gl.RGBA, halfFloatTexType)
      }

      return {
        gl,
        ext: {
          formatRGBA,
          formatRG,
          formatR,
          halfFloatTexType,
          supportLinearFiltering,
        },
      }
    }

    function getSupportedFormat(gl, internalFormat, format, type) {
      if (!supportRenderTextureFormat(gl, internalFormat, format, type)) {
        switch (internalFormat) {
          case gl.R16F:
            return getSupportedFormat(gl, gl.RG16F, gl.RG, type)
          case gl.RG16F:
            return getSupportedFormat(gl, gl.RGBA16F, gl.RGBA, type)
          default:
            return null
        }
      }
      return {
        internalFormat,
        format,
      }
    }

    function supportRenderTextureFormat(gl, internalFormat, format, type) {
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, 4, 4, 0, format, type, null)
      const fbo = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
      const status = gl.checkFramebufferStatus(gl.FRAMEBUFFER)
      return status === gl.FRAMEBUFFER_COMPLETE
    }

    class Material {
      constructor(vertexShader, fragmentShaderSource) {
        this.vertexShader = vertexShader
        this.fragmentShaderSource = fragmentShaderSource
        this.programs = []
        this.activeProgram = null
        this.uniforms = []
      }
      setKeywords(keywords) {
        let hash = 0
        for (let i = 0; i < keywords.length; i++) hash += hashCode(keywords[i])
        let program = this.programs[hash]
        if (program == null) {
          const fragmentShader = compileShader(gl.FRAGMENT_SHADER, this.fragmentShaderSource, keywords)
          program = createProgram(this.vertexShader, fragmentShader)
          this.programs[hash] = program
        }
        if (program === this.activeProgram) return
        this.uniforms = getUniforms(program)
        this.activeProgram = program
      }
      bind(gl) {
        gl.useProgram(this.activeProgram)
      }
    }

    class Program {
      constructor(vertexShader, fragmentShader) {
        this.uniforms = {}
        this.program = createProgram(vertexShader, fragmentShader)
        this.uniforms = getUniforms(this.program)
      }
      bind(gl) {
        gl.useProgram(this.program)
      }
    }

    function createProgram(vertexShader, fragmentShader) {
      const program = gl.createProgram()
      gl.attachShader(program, vertexShader)
      gl.attachShader(program, fragmentShader)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) console.trace(gl.getProgramInfoLog(program))
      return program
    }

    function getUniforms(program) {
      const uniforms = []
      const uniformCount = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS)
      for (let i = 0; i < uniformCount; i++) {
        const uniformName = gl.getActiveUniform(program, i).name
        uniforms[uniformName] = gl.getUniformLocation(program, uniformName)
      }
      return uniforms
    }

    function compileShader(type, source, keywords) {
      source = addKeywords(source, keywords)
      const shader = gl.createShader(type)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.trace(gl.getShaderInfoLog(shader))
      return shader
    }

    function addKeywords(source, keywords) {
      if (!keywords) return source
      let keywordsString = ""
      keywords.forEach((keyword) => {
        keywordsString += "#define " + keyword + "\n"
      })
      return keywordsString + source
    }

    const baseVertexShader = compileShader(
      gl.VERTEX_SHADER,
      `
        precision highp float;
        attribute vec2 aPosition;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform vec2 texelSize;

        void main () {
            vUv = aPosition * 0.5 + 0.5;
            vL = vUv - vec2(texelSize.x, 0.0);
            vR = vUv + vec2(texelSize.x, 0.0);
            vT = vUv + vec2(0.0, texelSize.y);
            vB = vUv - vec2(0.0, texelSize.y);
            gl_Position = vec4(aPosition, 0.0, 1.0);
        }
      `,
    )

    const copyShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;

        void main () {
            gl_FragColor = texture2D(uTexture, vUv);
        }
      `,
    )

    const clearShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        uniform sampler2D uTexture;
        uniform float value;

        void main () {
            gl_FragColor = value * texture2D(uTexture, vUv);
        }
     `,
    )

    const displayShaderSource = `
      precision highp float;
      precision highp sampler2D;
      varying vec2 vUv;
      varying vec2 vL;
      varying vec2 vR;
      varying vec2 vT;
      varying vec2 vB;
      uniform sampler2D uTexture;
      uniform sampler2D uDithering;
      uniform vec2 ditherScale;
      uniform vec2 texelSize;

      vec3 linearToGamma (vec3 color) {
          color = max(color, vec3(0));
          return max(1.055 * pow(color, vec3(0.416666667)) - 0.055, vec3(0));
      }

      void main () {
          vec3 c = texture2D(uTexture, vUv).rgb;
          #ifdef SHADING
              vec3 lc = texture2D(uTexture, vL).rgb;
              vec3 rc = texture2D(uTexture, vR).rgb;
              vec3 tc = texture2D(uTexture, vT).rgb;
              vec3 bc = texture2D(uTexture, vB).rgb;

              float dx = length(rc) - length(lc);
              float dy = length(tc) - length(bc);

              vec3 n = normalize(vec3(dx, dy, length(texelSize)));
              vec3 l = vec3(0.0, 0.0, 1.0);

              float diffuse = clamp(dot(n, l) + 0.7, 0.7, 1.0);
              c *= diffuse;
          #endif

          float a = max(c.r, max(c.g, c.b));
          gl_FragColor = vec4(c, a);
      }
    `

    const splatShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uTarget;
        uniform float aspectRatio;
        uniform vec3 color;
        uniform vec2 point;
        uniform float radius;

        void main () {
            vec2 p = vUv - point.xy;
            p.x *= aspectRatio;
            vec3 splat = exp(-dot(p, p) / radius) * color;
            vec3 base = texture2D(uTarget, vUv).xyz;
            gl_FragColor = vec4(base + splat, 1.0);
        }
      `,
    )

    const advectionShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        uniform sampler2D uVelocity;
        uniform sampler2D uSource;
        uniform vec2 texelSize;
        uniform vec2 dyeTexelSize;
        uniform float dt;
        uniform float dissipation;

        vec4 bilerp (sampler2D sam, vec2 uv, vec2 tsize) {
            vec2 st = uv / tsize - 0.5;
            vec2 iuv = floor(st);
            vec2 fuv = fract(st);

            vec4 a = texture2D(sam, (iuv + vec2(0.5, 0.5)) * tsize);
            vec4 b = texture2D(sam, (iuv + vec2(1.5, 0.5)) * tsize);
            vec4 c = texture2D(sam, (iuv + vec2(0.5, 1.5)) * tsize);
            vec4 d = texture2D(sam, (iuv + vec2(1.5, 1.5)) * tsize);

            return mix(mix(a, b, fuv.x), mix(c, d, fuv.x), fuv.y);
        }

        void main () {
            #ifdef MANUAL_FILTERING
                vec2 coord = vUv - dt * bilerp(uVelocity, vUv, texelSize).xy * texelSize;
                vec4 result = bilerp(uSource, coord, dyeTexelSize);
            #else
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                vec4 result = texture2D(uSource, coord);
            #endif
            float decay = 1.0 + dissipation * dt;
            gl_FragColor = result / decay;
        }
      `,
      ext.supportLinearFiltering ? null : ["MANUAL_FILTERING"],
    )

    const divergenceShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).x;
            float R = texture2D(uVelocity, vR).x;
            float T = texture2D(uVelocity, vT).y;
            float B = texture2D(uVelocity, vB).y;

            vec2 C = texture2D(uVelocity, vUv).xy;
            if (vL.x < 0.0) { L = -C.x; }
            if (vR.x > 1.0) { R = -C.x; }
            if (vT.y > 1.0) { T = -C.y; }
            if (vB.y < 0.0) { B = -C.y; }

            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `,
    )

    const curlShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uVelocity, vL).y;
            float R = texture2D(uVelocity, vR).y;
            float T = texture2D(uVelocity, vT).x;
            float B = texture2D(uVelocity, vB).x;
            float vorticity = R - L - T + B;
            gl_FragColor = vec4(0.5 * vorticity, 0.0, 0.0, 1.0);
        }
      `,
    )

    const vorticityShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision highp float;
        precision highp sampler2D;
        varying vec2 vUv;
        varying vec2 vL;
        varying vec2 vR;
        varying vec2 vT;
        varying vec2 vB;
        uniform sampler2D uVelocity;
        uniform sampler2D uCurl;
        uniform float curl;
        uniform float dt;

        void main () {
            float L = texture2D(uCurl, vL).x;
            float R = texture2D(uCurl, vR).x;
            float T = texture2D(uCurl, vT).x;
            float B = texture2D(uCurl, vB).x;
            float C = texture2D(uCurl, vUv).x;

            vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
            force /= length(force) + 0.0001;
            force *= curl * C;
            force.y *= -1.0;

            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity += force * dt;
            velocity = min(max(velocity, -1000.0), 1000.0);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `,
    )

    const pressureShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uDivergence;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            float C = texture2D(uPressure, vUv).x;
            float divergence = texture2D(uDivergence, vUv).x;
            float pressure = (L + R + B + T - divergence) * 0.25;
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `,
    )

    const gradientSubtractShader = compileShader(
      gl.FRAGMENT_SHADER,
      `
        precision mediump float;
        precision mediump sampler2D;
        varying highp vec2 vUv;
        varying highp vec2 vL;
        varying highp vec2 vR;
        varying highp vec2 vT;
        varying highp vec2 vB;
        uniform sampler2D uPressure;
        uniform sampler2D uVelocity;

        void main () {
            float L = texture2D(uPressure, vL).x;
            float R = texture2D(uPressure, vR).x;
            float T = texture2D(uPressure, vT).x;
            float B = texture2D(uPressure, vB).x;
            vec2 velocity = texture2D(uVelocity, vUv).xy;
            velocity.xy -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `,
    )

    const blit = (() => {
      gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer())
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW)
      gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(0)
      return (target, clear = false) => {
        if (target == null) {
          gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight)
          gl.bindFramebuffer(gl.FRAMEBUFFER, null)
        } else {
          gl.viewport(0, 0, target.width, target.height)
          gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo)
        }
        if (clear) {
          gl.clearColor(0.0, 0.0, 0.0, 1.0)
          gl.clear(gl.COLOR_BUFFER_BIT)
        }
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
      }
    })()

    let dye, velocity, divergence, curl, pressure

    const copyProgram = new Program(baseVertexShader, copyShader)
    const clearProgram = new Program(baseVertexShader, clearShader)
    const splatProgram = new Program(baseVertexShader, splatShader)
    const advectionProgram = new Program(baseVertexShader, advectionShader)
    const divergenceProgram = new Program(baseVertexShader, divergenceShader)
    const curlProgram = new Program(baseVertexShader, curlShader)
    const vorticityProgram = new Program(baseVertexShader, vorticityShader)
    const pressureProgram = new Program(baseVertexShader, pressureShader)
    const gradienSubtractProgram = new Program(baseVertexShader, gradientSubtractShader)
    const displayMaterial = new Material(baseVertexShader, displayShaderSource)

    function initFramebuffers() {
      const simRes = getResolution(config.SIM_RESOLUTION)
      const dyeRes = getResolution(config.DYE_RESOLUTION)
      const texType = ext.halfFloatTexType
      const rgba = ext.formatRGBA
      const rg = ext.formatRG
      const r = ext.formatR
      const filtering = ext.supportLinearFiltering ? gl.LINEAR : gl.NEAREST
      gl.disable(gl.BLEND)

      if (!dye) dye = createDoubleFBO(dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)
      else dye = resizeDoubleFBO(dye, dyeRes.width, dyeRes.height, rgba.internalFormat, rgba.format, texType, filtering)

      if (!velocity)
        velocity = createDoubleFBO(simRes.width, simRes.height, rg.internalFormat, rg.format, texType, filtering)
      else
        velocity = resizeDoubleFBO(
          velocity,
          simRes.width,
          simRes.height,
          rg.internalFormat,
          rg.format,
          texType,
          filtering,
        )

      divergence = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
      curl = createFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
      pressure = createDoubleFBO(simRes.width, simRes.height, r.internalFormat, r.format, texType, gl.NEAREST)
    }

    function createFBO(w, h, internalFormat, format, type, param) {
      gl.activeTexture(gl.TEXTURE0)
      const texture = gl.createTexture()
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, param)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, param)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
      gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null)

      const fbo = gl.createFramebuffer()
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo)
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0)
      gl.viewport(0, 0, w, h)
      gl.clear(gl.COLOR_BUFFER_BIT)

      const texelSizeX = 1.0 / w
      const texelSizeY = 1.0 / h
      return {
        texture,
        fbo,
        width: w,
        height: h,
        texelSizeX,
        texelSizeY,
        attach(id) {
          gl.activeTexture(gl.TEXTURE0 + id)
          gl.bindTexture(gl.TEXTURE_2D, texture)
          return id
        },
      }
    }

    function createDoubleFBO(w, h, internalFormat, format, type, param) {
      let fbo1 = createFBO(w, h, internalFormat, format, type, param)
      let fbo2 = createFBO(w, h, internalFormat, format, type, param)
      return {
        width: w,
        height: h,
        texelSizeX: fbo1.texelSizeX,
        texelSizeY: fbo1.texelSizeY,
        get read() {
          return fbo1
        },
        set read(value) {
          fbo1 = value
        },
        get write() {
          return fbo2
        },
        set write(value) {
          fbo2 = value
        },
        swap() {
          const temp = fbo1
          fbo1 = fbo2
          fbo2 = temp
        },
      }
    }

    function resizeFBO(target, w, h, internalFormat, format, type, param) {
      const newFBO = createFBO(w, h, internalFormat, format, type, param)
      copyProgram.bind(gl)
      gl.uniform1i(copyProgram.uniforms.uTexture, target.attach(0))
      blit(newFBO)
      return newFBO
    }

    function resizeDoubleFBO(target, w, h, internalFormat, format, type, param) {
      if (target.width === w && target.height === h) return target
      target.read = resizeFBO(target.read, w, h, internalFormat, format, type, param)
      target.write = createFBO(w, h, internalFormat, format, type, param)
      target.width = w
      target.height = h
      target.texelSizeX = 1.0 / w
      target.texelSizeY = 1.0 / h
      return target
    }

    function updateKeywords() {
      const displayKeywords = []
      if (config.SHADING) displayKeywords.push("SHADING")
      displayMaterial.setKeywords(displayKeywords)
    }

    updateKeywords()
    initFramebuffers()
    let lastUpdateTime = Date.now()
    let colorUpdateTimer = 0.0
    let animationFrameId = null
    let splatsInterval

    function updateFrame() {
      const dt = calcDeltaTime()
      if (resizeCanvas()) initFramebuffers()
      updateColors(dt)
      applyInputs()
      step(dt)
      render(null)
      animationFrameId = requestAnimationFrame(updateFrame)
    }

    function calcDeltaTime() {
      const now = Date.now()
      let dt = (now - lastUpdateTime) / 1000
      dt = Math.min(dt, 0.016666)
      lastUpdateTime = now
      return dt
    }

    function resizeCanvas() {
      const width = scaleByPixelRatio(canvas.clientWidth)
      const height = scaleByPixelRatio(canvas.clientHeight)
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        return true
      }
      return false
    }

    function updateColors(dt) {
      colorUpdateTimer += dt * config.COLOR_UPDATE_SPEED
      if (colorUpdateTimer >= 1) {
        colorUpdateTimer = wrap(colorUpdateTimer, 0, 1)
        pointers.forEach((p) => {
          p.color = generateColor()
        })
      }
    }

    function applyInputs() {
      pointers.forEach((p) => {
        if (p.moved) {
          p.moved = false
          splatPointer(p)
        }
      })
    }

    function step(dt) {
      gl.disable(gl.BLEND)
      // Curl
      curlProgram.bind(gl)
      gl.uniform2f(curlProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(curlProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(curl)

      // Vorticity
      vorticityProgram.bind(gl)
      gl.uniform2f(vorticityProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(vorticityProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(vorticityProgram.uniforms.uCurl, curl.attach(1))
      gl.uniform1f(vorticityProgram.uniforms.curl, config.CURL)
      gl.uniform1f(vorticityProgram.uniforms.dt, dt)
      blit(velocity.write)
      velocity.swap()

      // Divergence
      divergenceProgram.bind(gl)
      gl.uniform2f(divergenceProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(divergenceProgram.uniforms.uVelocity, velocity.read.attach(0))
      blit(divergence)

      // Clear pressure
      clearProgram.bind(gl)
      gl.uniform1i(clearProgram.uniforms.uTexture, pressure.read.attach(0))
      gl.uniform1f(clearProgram.uniforms.value, config.PRESSURE)
      blit(pressure.write)
      pressure.swap()

      // Pressure
      pressureProgram.bind(gl)
      gl.uniform2f(pressureProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(pressureProgram.uniforms.uDivergence, divergence.attach(0))
      for (let i = 0; i < config.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProgram.uniforms.uPressure, pressure.read.attach(1))
        blit(pressure.write)
        pressure.swap()
      }

      // Gradient Subtract
      gradienSubtractProgram.bind(gl)
      gl.uniform2f(gradienSubtractProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      gl.uniform1i(gradienSubtractProgram.uniforms.uPressure, pressure.read.attach(0))
      gl.uniform1i(gradienSubtractProgram.uniforms.uVelocity, velocity.read.attach(1))
      blit(velocity.write)
      velocity.swap()

      // Advection
      advectionProgram.bind(gl)
      gl.uniform2f(advectionProgram.uniforms.texelSize, velocity.texelSizeX, velocity.texelSizeY)
      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, velocity.texelSizeX, velocity.texelSizeY)
      const velocityId = velocity.read.attach(0)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocityId)
      gl.uniform1i(advectionProgram.uniforms.uSource, velocityId)
      gl.uniform1f(advectionProgram.uniforms.dt, dt)
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.VELOCITY_DISSIPATION)
      blit(velocity.write)
      velocity.swap()

      if (!ext.supportLinearFiltering)
        gl.uniform2f(advectionProgram.uniforms.dyeTexelSize, dye.texelSizeX, dye.texelSizeY)
      gl.uniform1i(advectionProgram.uniforms.uVelocity, velocity.read.attach(0))
      gl.uniform1i(advectionProgram.uniforms.uSource, dye.read.attach(1))
      gl.uniform1f(advectionProgram.uniforms.dissipation, config.DENSITY_DISSIPATION)
      blit(dye.write)
      dye.swap()
    }

    function render(target) {
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      gl.enable(gl.BLEND)
      drawDisplay(target)
    }

    function drawDisplay(target) {
      const width = target == null ? gl.drawingBufferWidth : target.width
      const height = target == null ? gl.drawingBufferHeight : target.height
      displayMaterial.bind(gl)
      if (config.SHADING) gl.uniform2f(displayMaterial.uniforms.texelSize, 1.0 / width, 1.0 / height)
      gl.uniform1i(displayMaterial.uniforms.uTexture, dye.read.attach(0))
      blit(target)
    }

    function splatPointer(pointer) {
      const dx = pointer.deltaX * config.SPLAT_FORCE
      const dy = pointer.deltaY * config.SPLAT_FORCE
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, pointer.color)
    }

    function clickSplat(pointer) {
      const color = generateColor()
      color.r *= 10.0
      color.g *= 10.0
      color.b *= 10.0
      const dx = 10 * (Math.random() - 0.5)
      const dy = 30 * (Math.random() - 0.5)
      splat(pointer.texcoordX, pointer.texcoordY, dx, dy, color)
    }

    function splat(x, y, dx, dy, color) {
      splatProgram.bind(gl)
      gl.uniform1i(splatProgram.uniforms.uTarget, velocity.read.attach(0))
      gl.uniform1f(splatProgram.uniforms.aspectRatio, canvas.width / canvas.height)
      gl.uniform2f(splatProgram.uniforms.point, x, y)
      gl.uniform3f(splatProgram.uniforms.color, dx, dy, 0.0)
      gl.uniform1f(splatProgram.uniforms.radius, correctRadius(config.SPLAT_RADIUS / 100.0))
      blit(velocity.write)
      velocity.swap()

      gl.uniform1i(splatProgram.uniforms.uTarget, dye.read.attach(0))
      gl.uniform3f(splatProgram.uniforms.color, color.r, color.g, color.b)
      blit(dye.write)
      dye.swap()
    }

    function correctRadius(radius) {
      const aspectRatio = canvas.width / canvas.height
      if (aspectRatio > 1) radius *= aspectRatio
      return radius
    }

    function updatePointerDownData(pointer, id, posX, posY) {
      pointer.id = id
      pointer.down = true
      pointer.moved = false
      pointer.texcoordX = posX / canvas.width
      pointer.texcoordY = 1.0 - posY / canvas.height
      pointer.prevTexcoordX = pointer.texcoordX
      pointer.prevTexcoordY = pointer.texcoordY
      pointer.deltaX = 0
      pointer.deltaY = 0
      pointer.color = generateColor()
    }

    function updatePointerMoveData(pointer, posX, posY, color) {
      pointer.prevTexcoordX = pointer.texcoordX
      pointer.prevTexcoordY = pointer.texcoordY
      pointer.texcoordX = posX / canvas.width
      pointer.texcoordY = 1.0 - posY / canvas.height
      pointer.deltaX = correctDeltaX(pointer.texcoordX - pointer.prevTexcoordX)
      pointer.deltaY = correctDeltaY(pointer.texcoordY - pointer.prevTexcoordY)
      pointer.moved = Math.abs(pointer.deltaX) > 0 || Math.abs(pointer.deltaY) > 0
      pointer.color = color || pointer.color
    }

    function updatePointerUpData(pointer) {
      pointer.down = false
    }

    function correctDeltaX(delta) {
      const aspectRatio = canvas.width / canvas.height
      if (aspectRatio < 1) delta *= aspectRatio
      return delta
    }

    function correctDeltaY(delta) {
      const aspectRatio = canvas.width / canvas.height
      if (aspectRatio > 1) delta /= aspectRatio
      return delta
    }

    function generateColor() {
      const c = HSVtoRGB(Math.random(), 1.0, 1.0)
      c.r *= 0.15
      c.g *= 0.15
      c.b *= 0.15
      return c
    }

    function HSVtoRGB(h, s, v) {
      let r, g, b, i, f, p, q, t
      i = Math.floor(h * 6)
      f = h * 6 - i
      p = v * (1 - s)
      q = v * (1 - f * s)
      t = v * (1 - (1 - f) * s)
      switch (i % 6) {
        case 0:
          r = v
          g = t
          b = p
          break
        case 1:
          r = q
          g = v
          b = p
          break
        case 2:
          r = p
          g = v
          b = t
          break
        case 3:
          r = p
          g = q
          b = v
          break
        case 4:
          r = t
          g = p
          b = v
          break
        case 5:
          r = v
          g = p
          b = q
          break
        default:
          break
      }
      return { r, g, b }
    }

    function wrap(value, min, max) {
      const range = max - min
      if (range === 0) return min
      return ((value - min) % range) + min
    }

    function getResolution(resolution) {
      let aspectRatio = gl.drawingBufferWidth / gl.drawingBufferHeight
      if (aspectRatio < 1) aspectRatio = 1.0 / aspectRatio
      const min = Math.round(resolution)
      const max = Math.round(resolution * aspectRatio)
      if (gl.drawingBufferWidth > gl.drawingBufferHeight) return { width: max, height: min }
      else return { width: min, height: max }
    }

    function scaleByPixelRatio(input) {
      const pixelRatio = window.devicePixelRatio || 1
      return Math.floor(input * pixelRatio)
    }

    function hashCode(s) {
      if (s.length === 0) return 0
      let hash = 0
      for (let i = 0; i < s.length; i++) {
        hash = (hash << 5) - hash + s.charCodeAt(i)
        hash |= 0
      }
      return hash
    }

    // Create a random splat on load to make it more obvious that something is happening
    function createInitialSplats() {
      for (let i = 0; i < 5; i++) {
        const color = generateColor()
        color.r *= 10.0
        color.g *= 10.0
        color.b *= 10.0
        const x = Math.random()
        const y = Math.random()
        const dx = 1000 * (Math.random() - 0.5)
        const dy = 1000 * (Math.random() - 0.5)
        splat(x, y, dx, dy, color)
      }
    }

    // Use document instead of canvas for event listeners to ensure they work in production
    function handleMouseMove(e) {
      const pointer = pointers[0]
      const rect = canvas.getBoundingClientRect()
      const posX = scaleByPixelRatio(e.clientX - rect.left)
      const posY = scaleByPixelRatio(e.clientY - rect.top)
      updatePointerMoveData(pointer, posX, posY)
    }

    function handleTouchMove(e) {
      e.preventDefault()
      const pointer = pointers[0]
      const rect = canvas.getBoundingClientRect()
      const posX = scaleByPixelRatio(e.touches[0].clientX - rect.left)
      const posY = scaleByPixelRatio(e.touches[0].clientY - rect.top)
      updatePointerMoveData(pointer, posX, posY)
    }

    function handleMouseDown(e) {
      const pointer = pointers[0]
      const rect = canvas.getBoundingClientRect()
      const posX = scaleByPixelRatio(e.clientX - rect.left)
      const posY = scaleByPixelRatio(e.clientY - rect.top)
      updatePointerDownData(pointer, -1, posX, posY)
      clickSplat(pointer)
    }

    function handleTouchStart(e) {
      e.preventDefault()
      const pointer = pointers[0]
      const rect = canvas.getBoundingClientRect()
      const posX = scaleByPixelRatio(e.touches[0].clientX - rect.left)
      const posY = scaleByPixelRatio(e.touches[0].clientY - rect.top)
      updatePointerDownData(pointer, e.touches[0].identifier, posX, posY)
    }

    function handleMouseUp() {
      updatePointerUpData(pointers[0])
    }

    function handleTouchEnd(e) {
      const pointer = pointers[0]
      if (e.touches.length === 0) {
        updatePointerUpData(pointer)
      } else {
        const rect = canvas.getBoundingClientRect()
        const posX = scaleByPixelRatio(e.touches[0].clientX - rect.left)
        const posY = scaleByPixelRatio(e.touches[0].clientY - rect.top)
        updatePointerMoveData(pointer, posX, posY)
      }
    }

    // Add event listeners to document instead of canvas
    const isMobileDevice = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (!isMobileDevice) {
      // Only add mouse/touch event listeners on non-mobile devices
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("touchmove", handleTouchMove, { passive: false })
      document.addEventListener("mousedown", handleMouseDown)
      document.addEventListener("touchstart", handleTouchStart, { passive: false })
      document.addEventListener("mouseup", handleMouseUp)
      document.addEventListener("touchend", handleTouchEnd)
    } else {
      // For mobile devices, create periodic random splats to keep animation interesting
      const createRandomSplats = () => {
        const pointer = pointers[0]
        const x = Math.random()
        const y = Math.random()
        const dx = 1000 * (Math.random() - 0.5)
        const dy = 1000 * (Math.random() - 0.5)
        const color = generateColor()
        color.r *= 10.0
        color.g *= 10.0
        color.b *= 10.0
        splat(x, y, dx, dy, color)
      }

      // Create random splats periodically
      splatsInterval = setInterval(createRandomSplats, 3000)

      // Clean up interval on unmount
      return () => {
        clearInterval(splatsInterval)
      }
    }

    // Start the animation loop
    updateFrame()
    createInitialSplats()

    // Clean up on unmount
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }

      // Remove event listeners only if they were added
      if (!isMobileDevice) {
        document.removeEventListener("mousemove", handleMouseMove)
        document.removeEventListener("touchmove", handleTouchMove)
        document.removeEventListener("mousedown", handleMouseDown)
        document.removeEventListener("touchstart", handleTouchStart)
        document.removeEventListener("mouseup", handleMouseUp)
        document.removeEventListener("touchend", handleTouchEnd)
      } else if (splatsInterval) {
        clearInterval(splatsInterval)
      }

      window.removeEventListener("resize", handleResize)
    }
  }, [
    SIM_RESOLUTION,
    DYE_RESOLUTION,
    CAPTURE_RESOLUTION,
    DENSITY_DISSIPATION,
    VELOCITY_DISSIPATION,
    PRESSURE,
    PRESSURE_ITERATIONS,
    CURL,
    SPLAT_RADIUS,
    SPLAT_FORCE,
    SHADING,
    COLOR_UPDATE_SPEED,
    BACK_COLOR,
    TRANSPARENT,
    isMobile,
  ])

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none md:pointer-events-auto z-0">
      <canvas ref={canvasRef} id="fluid" className="w-full h-full" />
    </div>
  )
}

export { SplashCursor }
