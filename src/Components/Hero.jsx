"use client"
import Me from "../assets/Me1.png"
import { FaFacebook, FaInstagram, FaLinkedin, FaGithub, FaMedium, FaBehance } from "react-icons/fa"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [theme, setTheme] = useState("dark")

  // Update useEffect to match our other components:
  useEffect(() => {
    setIsLoaded(true)
    setTheme(localStorage.getItem("theme") || "dark")

    // Add event listener to update theme when it changes
    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "dark")
    }

    window.addEventListener("storage", handleThemeChange)
    document.addEventListener("themeChanged", handleThemeChange)

    return () => {
      window.removeEventListener("storage", handleThemeChange)
      document.removeEventListener("themeChanged", handleThemeChange)
    }
  }, [])

  return (
    <div className="relative overflow-hidden py-10 md:py-0 md:h-screen" id="Hero">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <motion.svg
          className="w-full h-full md:w-[900px] md:h-[900px] md:ml-[20%]"
          viewBox="0 0 1374 1303"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            x: ["-50%", "50%", "-50%"],
          }}
          transition={{
            duration: 25,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <g filter="url(#filter0_f_12_124)">
            <path
              d="M405.022 627.498C424.222 505.898 545.022 512.831 603.022 531.498C611.689 546.165 663.822 590.698 803.022 651.498C977.022 727.498 625.022 791.498 547.022 879.498C469.022 967.498 381.022 779.498 405.022 627.498Z"
              fill="#D958FF"
            />
            <path
              d="M405.022 627.498C424.222 505.898 545.022 512.831 603.022 531.498C611.689 546.165 663.822 590.698 803.022 651.498C977.022 727.498 625.022 791.498 547.022 879.498C469.022 967.498 381.022 779.498 405.022 627.498Z"
              stroke="black"
            />
          </g>
          <g filter="url(#filter1_f_12_124)">
            <path
              d="M680.022 303.498C699.222 181.898 820.022 188.831 878.022 207.498C886.689 222.165 938.822 266.698 1078.02 327.498C1252.02 403.498 900.022 467.498 822.022 555.498C744.022 643.498 656.022 455.498 680.022 303.498Z"
              fill="#865DFF"
            />
            <path
              d="M680.022 303.498C699.222 181.898 820.022 188.831 878.022 207.498C886.689 222.165 938.822 266.698 1078.02 327.498C1252.02 403.498 900.022 467.498 822.022 555.498C744.022 643.498 656.022 455.498 680.022 303.498Z"
              stroke="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_12_124"
              x="0.500031"
              y="120.5"
              width="1250.74"
              height="1182.02"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_12_124" />
            </filter>
            <filter
              id="filter1_f_12_124"
              x="275.5"
              y="-203.5"
              width="1250.74"
              height="1182.02"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_12_124" />
            </filter>
          </defs>
        </motion.svg>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-10 md:pt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
          <motion.div
            className="w-full md:w-1/2 text-center md:text-left"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-2 md:mb-4 bg-gradient-to-r from-text-white to-accent-color-1 bg-clip-text text-transparent"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Tharindu Dushan
            </motion.h1>

            <motion.h3
              className="text-xl md:text-2xl text-text-light-accent font-light mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Passionate Developer | Designer
            </motion.h3>

            <motion.div
              className="max-w-xl mx-auto md:mx-0 mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <p className="text-sm md:text-base">
                Performance-oriented software engineering undergraduate with a passion for developing and designing
                innovative solutions. My dedication to crafting efficient and elegant code drives my continuous learning
                and growth in the field.
              </p>
            </motion.div>

            <motion.a
              href="#ContactMe"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <button className="contactBTN bg-accent-color-2 px-6 py-3 rounded-lg text-white font-medium hover:bg-accent-color-1 transition-all transform hover:scale-105 shadow-lg">
                Contact me
              </button>
            </motion.a>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 flex justify-center md:justify-end"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="relative block">
              {/* Decorative elements around the image */}
              <motion.div
                className={`absolute -inset-4 rounded-full ${theme === "light" ? "bg-gradient-to-r from-purple-300/50 to-pink-300/50" : "bg-gradient-to-r from-accent-color-2/30 to-accent-color-1/30"} blur-lg`}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              />

              <motion.div
                className={`absolute -inset-1 rounded-full ${theme === "light" ? "bg-gradient-to-r from-purple-400/70 to-pink-400/70" : "bg-gradient-to-r from-accent-color-1/50 to-accent-color-2/50"}`}
                animate={{
                  rotate: [0, 360],
                }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              />

              {/* Image container with mask */}
              <div className="relative rounded-full overflow-hidden border-4 border-white/10 shadow-2xl">
                <motion.img
                  src={Me}
                  alt="Tharindu Dushan"
                  className="w-64 h-64 md:w-80 md:h-80 object-cover object-top"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />

                {/* Shine effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent"
                  initial={{ x: "-100%", y: "-100%" }}
                  animate={{ x: "100%", y: "100%" }}
                  transition={{ duration: 1.5, delay: 1, repeat: Number.POSITIVE_INFINITY, repeatDelay: 5 }}
                />
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-12 md:mt-16"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 shadow-lg border border-white/10">
            <div className="flex justify-center space-x-6 md:space-x-10">
              {[
                { icon: FaFacebook, href: "https://www.facebook.com/tharindu.prime/", delay: 0 },
                { icon: FaInstagram, href: "https://www.instagram.com/_dushxn/", delay: 0.1 },
                { icon: FaLinkedin, href: "https://www.linkedin.com/in/tharindu-mahindarathna-6577a9190/", delay: 0.2 },
                { icon: FaGithub, href: "https://github.com/Dushxn", delay: 0.3 },
                { icon: FaMedium, href: "https://medium.com/@tdmahindarathne", delay: 0.4 },
                { icon: FaBehance, href: "https://www.behance.net/mahindarathnetd", delay: 0.5 },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transform hover:scale-110 transition-transform"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 + social.delay, duration: 0.3 }}
                  whileHover={{
                    scale: 1.2,
                    color: "var(--accent-color-1)",
                    transition: { duration: 0.2 },
                  }}
                >
                  <social.icon className="icon text-3xl md:text-4xl" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Hero
