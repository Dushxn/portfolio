"use client"

import { useEffect, useState } from "react"
import { SplineScene } from "./SplineScene"
import { motion } from "framer-motion"

export function SplineHero() {
  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    // Get theme
    setTheme(localStorage.getItem("theme") || "dark")

    const handleThemeChange = () => {
      setTheme(localStorage.getItem("theme") || "dark")
    }

    window.addEventListener("storage", handleThemeChange)
    document.addEventListener("themeChanged", handleThemeChange)

    return () => {
      window.removeEventListener("storage", handleThemeChange)
      document.removeEventListener("themeChanged", handleThemeChange)
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  // Skip rendering on mobile for better performance
  if (isMobile) {
    return null
  }

  return (
    <div
      className={`w-full h-[500px] relative overflow-hidden rounded-lg border shadow-xl ${
        theme === "light" ? "bg-white/80 border-gray-200" : "bg-black/80 border-gray-800"
      }`}
    >
      <div className="flex h-full">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
          <motion.h1
            className={`text-4xl md:text-5xl font-bold ${
              theme === "light" ? "text-purple-700" : "text-accent-color-1"
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Creative Development
          </motion.h1>
          <motion.p
            className={`mt-4 max-w-lg ${theme === "light" ? "text-gray-700" : "text-neutral-300"}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Bringing ideas to life with elegant code and immersive experiences that capture attention and showcase
            innovation.
          </motion.p>
        </div>

        {/* Right content - Spline Scene */}
        <div className="flex-1 relative">
          <SplineScene
            scene="https://prod.spline.design/pQuyHp2Md2cSK3Tex8J52TZh4mrZ2e/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
