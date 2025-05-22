"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { SplineScene } from "../components/ui/spline"
import { Card } from "../components/ui/card"
import { Spotlight } from "../components/ui/spotlight"

const SplineDemo = () => {
  const [theme, setTheme] = useState("dark")

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || "dark")

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
    <section className="py-16 md:py-24 px-4 relative overflow-hidden" id="SplineDemo">
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div
          className="w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 80% 20%, rgba(217, 88, 255, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 80%, rgba(217, 88, 255, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 20%, rgba(217, 88, 255, 0.15) 0%, transparent 70%)",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
        />
      </div>

      <motion.div
        className="container mx-auto relative z-10"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2
          className="text-4xl md:text-5xl font-bold text-center mb-12 about-title"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          
        </motion.h2>

        <Card
          className={`w-full h-[500px] ${theme === "light" ? "bg-white/90" : "bg-black/[0.96]"} relative overflow-hidden border-white/10`}
        >
          <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill={theme === "light" ? "#9333ea" : "white"} />

          <div className="flex flex-col md:flex-row h-full">
            {/* Left content */}
            <div className="flex-1 p-8 relative z-10 flex flex-col justify-center">
              <h1
                className={`text-4xl md:text-5xl font-bold bg-clip-text text-transparent ${
                  theme === "light"
                    ? "bg-gradient-to-b from-purple-700 to-purple-500"
                    : "bg-gradient-to-b from-neutral-50 to-neutral-400"
                }`}
              >
                "The future belongs to those who design it."
              </h1>
              <p className={`mt-4 ${theme === "light" ? "text-gray-700" : "text-neutral-300"} max-w-lg`}>
               As a developer and designer, I craft tomorrow's experiences today — with code, creativity, and curiosity.
              </p>
             
            </div>

            {/* Right content */}
            <div className="flex-1 relative">
              <SplineScene
                scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </Card>
      </motion.div>
    </section>
  )
}

export default SplineDemo
