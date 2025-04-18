"use client"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Aboutme = () => {
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

  const stats = [
    { value: "3+", label: "Years Experience" },
    { value: "15+", label: "Projects Completed" },
    { value: "5+", label: "Happy Clients" },
    { value: "3", label: "Awards" },
  ]

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden" id="AboutMe">
      <div className="absolute inset-0 z-0 opacity-30">
        <motion.div
          className="w-full h-full"
          animate={{
            background: [
              "radial-gradient(circle at 20% 30%, rgba(217, 88, 255, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 80% 70%, rgba(217, 88, 255, 0.15) 0%, transparent 70%)",
              "radial-gradient(circle at 20% 30%, rgba(217, 88, 255, 0.15) 0%, transparent 70%)",
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
          About Me
        </motion.h2>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-5 gap-8 md:gap-12">
            {/* Left column - Stats */}
            <motion.div
              className="md:col-span-2"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className={`bg-white/5 backdrop-blur-md rounded-xl p-4 text-center border border-white/10 shadow-lg ${theme === "light" ? "hover:shadow-purple-300/50" : "hover:shadow-accent-color-1/40"}`}
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{
                      y: -5,
                      boxShadow:
                        theme === "light"
                          ? "0 10px 25px -5px rgba(147, 51, 234, 0.3)"
                          : "0 10px 25px -5px rgba(217, 88, 255, 0.4)",
                    }}
                  >
                    <h3 className="text-3xl md:text-4xl font-bold text-accent-color-1 mb-1">{stat.value}</h3>
                    <p className="text-sm text-text-light-accent">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="mt-8 bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <h3 className="text-xl font-semibold mb-4 text-text-white">Education</h3>
                <div className="space-y-4">
                  <div className="relative pl-6 border-l-2 border-accent-color-2">
                    <div className="absolute w-3 h-3 bg-accent-color-1 rounded-full -left-[7px] top-1"></div>
                    <h4 className="text-text-white font-medium">BSc in Software Engineering</h4>
                    <p className="text-sm text-text-light-accent">SLIIT - 2021 to Present</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Right column - Bio */}
            <motion.div
              className="md:col-span-3"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 md:p-8 shadow-lg border border-white/10 mb-8">
                <p className="text-base md:text-lg leading-relaxed mb-6">
                  I am a results-driven third year Software Engineering undergraduate student at SLIIT who recognizes
                  the significance of teamwork, productivity, time management and communication. My proven record of
                  numerous leadership roles, including organizing events and handling members with effective teamwork
                  make me a valuable asset to any team or department.
                </p>

                <p className="text-base md:text-lg leading-relaxed">
                  With a passion for creating elegant and efficient solutions, I specialize in frontend development
                  while continuously expanding my skills in full-stack technologies. I believe in writing clean,
                  maintainable code and creating intuitive user experiences that solve real-world problems.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-text-white">My Approach</h3>
                  <ul className="space-y-2 text-text-light-accent">
                    <li className="flex items-start">
                      <span className="text-accent-color-1 mr-2">•</span>
                      <span>User-centered design thinking</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-color-1 mr-2">•</span>
                      <span>Clean, maintainable code</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-color-1 mr-2">•</span>
                      <span>Continuous learning mindset</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-white/10 shadow-lg"
                  initial={{ y: 30, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <h3 className="text-xl font-semibold mb-4 text-text-white">Interests</h3>
                  <ul className="space-y-2 text-text-light-accent">
                    <li className="flex items-start">
                      <span className="text-accent-color-1 mr-2">•</span>
                      <span>Web & Mobile Development</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-color-1 mr-2">•</span>
                      <span>UI/UX Design</span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-accent-color-1 mr-2">•</span>
                      <span>Emerging Technologies</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/CV.pdf"
              download
              className={`resume ${
                theme === "light"
                  ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-purple-300/50"
                  : "bg-gradient-to-r from-accent-color-2 to-accent-color-1 hover:shadow-accent-color-1/30"
              } px-8 py-3 rounded-lg text-white font-semibold inline-block hover:shadow-lg transition-all transform hover:scale-105`}
              whileHover={{
                scale: 1.05,
                boxShadow: theme === "light" ? "0 0 20px rgba(147, 51, 234, 0.4)" : "0 0 20px rgba(217, 88, 255, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Download Resume
            </motion.a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Aboutme
