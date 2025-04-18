"use client"
import HTML from "../assets/html.png"
import CSS from "../assets/css.png"
import JS from "../assets/javascript.png"
import ReactIcon from "../assets/reactdark.png"
import Node from "../assets/nodejs.png"
import Figma from "../assets/figma.png"
import Tailwind from "../assets/tailwindcss.png"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Skills = () => {
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

  const skills = [
    { name: "HTML", icon: HTML, category: "Frontend" },
    { name: "CSS", icon: CSS, category: "Frontend" },
    { name: "JavaScript", icon: JS, category: "Frontend" },
    { name: "Node.js", icon: Node, category: "Backend" },
    { name: "React", icon: ReactIcon, category: "Frontend" },
    { name: "Figma", icon: Figma, category: "Design" },
    { name: "Tailwind CSS", icon: Tailwind, category: "Frontend" },
  ]

  const categories = ["All", "Frontend", "Backend", "Design"]

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden" id="Skills">
      <div className="absolute inset-0 z-0 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 1440 2103" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_12_150)">
            <path
              d="M411.335 926.382C515.023 836.026 607.515 924.978 640.8 980.749C637.159 999.197 646.949 1072.96 715.229 1220.44C800.579 1404.78 470 1217.29 343.212 1238.61C216.423 1259.93 281.726 1039.33 411.335 926.382Z"
              fill="#D958FF"
            />
            <path
              d="M411.335 926.382C515.023 836.026 607.515 924.978 640.8 980.749C637.159 999.197 646.949 1072.96 715.229 1220.44C800.579 1404.78 470 1217.29 343.212 1238.61C216.423 1259.93 281.726 1039.33 411.335 926.382Z"
              stroke="black"
            />
          </g>
          <g filter="url(#filter1_f_12_150)">
            <path
              d="M868.313 839.517C972 749.161 1064.49 838.113 1097.78 893.884C1094.14 912.332 1103.93 986.098 1172.21 1133.57C1257.56 1317.92 926.978 1130.43 800.189 1151.75C673.401 1173.06 738.703 952.463 868.313 839.517Z"
              fill="#865DFF"
            />
            <path
              d="M868.313 839.517C972 749.161 1064.49 838.113 1097.78 893.884C1094.14 912.332 1103.93 986.098 1172.21 1133.57C1257.56 1317.92 926.978 1130.43 800.189 1151.75C673.401 1173.06 738.703 952.463 868.313 839.517Z"
              stroke="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_12_150"
              x="-525.628"
              y="87.2141"
              width="2055.25"
              height="2015.63"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="350" result="effect1_foregroundBlur_12_150" />
            </filter>
            <filter
              id="filter1_f_12_150"
              x="-68.6505"
              y="0.348999"
              width="2055.25"
              height="2015.63"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="400" result="effect1_foregroundBlur_12_150" />
            </filter>
          </defs>
        </svg>
      </div>

      <motion.div
        className="container mx-auto relative z-10"
        initial={{ y: -50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 about-title">My Expertise Area</h2>
        <h3 className="text-xl text-center mb-6 text-text-dark-accent">what I know</h3>

        {/* Category filters */}
        <motion.div
          className="flex justify-center gap-3 mb-10 flex-wrap"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={index}
              className="px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm hover:bg-accent-color-2 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        <div className="bg-white/5 backdrop-blur-md rounded-xl p-8 shadow-lg border border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 md:gap-12">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -10 }}
              >
                <motion.div
                  className={`bg-white/10 p-4 rounded-2xl mb-3 relative group ${theme === "light" ? "hover:shadow-purple-300/50" : ""}`}
                  whileHover={{
                    scale: 1.1,
                    boxShadow:
                      theme === "light" ? "0 0 20px rgba(147, 51, 234, 0.4)" : "0 0 20px rgba(217, 88, 255, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img
                    src={skill.icon || "/placeholder.svg"}
                    alt={skill.name}
                    className="w-16 h-16 md:w-20 md:h-20 object-contain"
                  />

                  {/* Skill category badge */}
                  <motion.div
                    className={`absolute -top-2 -right-2 ${theme === "light" ? "bg-purple-600" : "bg-accent-color-2"} text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                  >
                    {skill.category}
                  </motion.div>
                </motion.div>
                <span className="text-sm md:text-base text-text-white font-medium">{skill.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Skill level indicator */}
        <motion.div
          className="mt-16 bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-semibold mb-6 text-center text-text-white">Proficiency Levels</h3>
          <div className="space-y-6">
            {[
              { name: "Frontend Development", level: 90 },
              { name: "UI/UX Design", level: 85 },
              { name: "Backend Development", level: 75 },
              { name: "Mobile Development", level: 65 },
            ].map((skill, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-text-white">{skill.name}</span>
                  <span className={`${theme === "light" ? "text-purple-600" : "text-accent-color-1"}`}>
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
  className={`h-full rounded-full ${
    theme === "light"
      ? "bg-gradient-to-r from-purple-600 to-pink-500"
      : "bg-gradient-accent"
  }`}
  initial={{ width: 0 }}
  whileInView={{ width: `${skill.level}%` }}
  transition={{ duration: 1, delay: index * 0.2 }}
  viewport={{ once: true }}
  key={`skill-bar-${theme}-${index}`}
/>

                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Skills
