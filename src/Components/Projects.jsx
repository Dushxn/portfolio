"use client"
import Retro from "../assets/RetroDB.png"
import { FaGithub } from "react-icons/fa6"
import { FaExternalLinkAlt } from "react-icons/fa"
import Shelter from "../assets/Shelter.png"
import Ella from "../assets/Ella.png"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"

const Projects = () => {
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

  const projects = [
    {
      title: "RetroDB",
      description:
        "RetroDB is a movie and TV show review site where users can find information on popular, top-rated, currently playing, and upcoming movies and TV shows. The site is built using Vite + React and styled with Tailwind CSS.",
      image: Retro,
      github: "https://github.com/Dushxn/MovieDetails",
      live: "https://retrodb.netlify.app/",
      year: "2023",
      technologies: ["React", "Tailwind CSS", "Vite", "API Integration"],
    },
    {
      title: "Shelter Vehicle Insurance System",
      description:
        "Shelter-Vehicle-Insurance is an innovative vehicle insurance system developed as part of our first-year university project. This system streamlines and automates the services of vehicle insurance management companies, providing efficient and user-friendly solutions.",
      image: Shelter,
      github: "https://github.com/Dushxn/Shelter-Vehicle-Insurance",
      live: "",
      year: "2022",
      technologies: ["HTML", "CSS", "JavaScript", "PHP"],
    },
    {
      title: "Ella Jungle Resort",
      description:
        'As part of our "IT Project" module, we developed a comprehensive application using the MERN stack. This project allowed us to enhance our skills in version control with Git, frontend development with React and Tailwind CSS, and server-side development with Express, Node.js, and MongoDB.',
      image: Ella,
      github: "#",
      live: "#",
      year: "2023",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Tailwind CSS"],
    },
  ]

  return (
    <section className="py-16 md:py-24 px-4 relative overflow-hidden" id="Projects">
      <div className="absolute right-0 top-0 z-0 opacity-30">
        <svg width="100%" height="100%" viewBox="0 0 538 1709" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_f_21_204)">
            <path
              d="M803.324 562.724C882.697 675.042 784.822 758.034 725.963 785.491C707.978 779.998 633.6 782.255 479.96 835.224C287.909 901.435 507.963 591.579 499.615 463.282C491.267 334.985 704.107 422.327 803.324 562.724Z"
              fill="#D958FF"
            />
            <path
              d="M803.324 562.724C882.697 675.042 784.822 758.034 725.963 785.491C707.978 779.998 633.6 782.255 479.96 835.224C287.909 901.435 507.963 591.579 499.615 463.282C491.267 334.985 704.107 422.327 803.324 562.724Z"
              stroke="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_f_21_204"
              x="0.568665"
              y="0.311523"
              width="1233.04"
              height="1244.58"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
              <feGaussianBlur stdDeviation="200" result="effect1_foregroundBlur_21_204" />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="text-center mb-16"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold about-title">Project Timeline</h2>
          <p className="text-text-light-accent mt-4 max-w-2xl mx-auto">
            A chronological journey through my key projects and their evolution over time
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <motion.div
            className={`absolute left-1/2 top-0 bottom-0 w-1 ${
              theme === "light"
                ? "bg-gradient-to-b from-purple-500/70 via-purple-600/70 to-purple-500/70"
                : "bg-gradient-to-b from-accent-color-1 via-accent-color-2 to-accent-color-1"
            } hidden md:block`}
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            viewport={{ once: true }}
            key={`timeline-line-${theme}`} // Add key to force re-render when theme changes
          />

          <div className="space-y-24 md:space-y-32">
            {projects.map((project, index) => (
              <div key={index} className="relative">
                {/* Year marker for timeline */}
                <motion.div
                  className="absolute left-1/2 transform -translate-x-1/2 -top-12 hidden md:block"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div
                    className={`${
                      theme === "light" ? "bg-purple-600" : "bg-accent-color-1"
                    } text-white px-4 py-1 rounded-full font-bold shadow-lg`}
                  >
                    {project.year}
                  </div>
                </motion.div>

                {/* Timeline node */}
                <motion.div
                  className={`absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 ${
                    theme === "light" ? "bg-purple-600" : "bg-accent-color-1"
                  } rounded-full z-10 hidden md:block`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: [0, 1.5, 1] }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`absolute inset-0 ${
                      theme === "light" ? "bg-purple-600" : "bg-accent-color-1"
                    } rounded-full`}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  />
                </motion.div>

                <div
                  className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} gap-8 md:gap-12 items-center`}
                >
                  <motion.div
                    className="w-full md:w-1/2"
                    initial={{
                      x: index % 2 === 0 ? -100 : 100,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="bg-white/5 backdrop-blur-md rounded-xl overflow-hidden shadow-lg border border-white/10 group">
                      <div className="relative overflow-hidden">
                        <img
                          src={project.image || "/placeholder.svg"}
                          alt={project.title}
                          className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <div className="p-4 w-full">
                            <div className="flex flex-wrap gap-2 mb-2">
                              {project.technologies.map((tech, techIndex) => (
                                <span
                                  key={techIndex}
                                  className={`text-xs ${
                                    theme === "light" ? "bg-purple-600/90" : "bg-accent-color-2/80"
                                  } text-white px-2 py-1 rounded-full`}
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="w-full md:w-1/2"
                    initial={{
                      x: index % 2 === 0 ? 100 : -100,
                      opacity: 0,
                    }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    viewport={{ once: true, amount: 0.3 }}
                  >
                    <div className="md:hidden mb-2 bg-accent-color-2 text-white px-3 py-1 rounded-full text-sm inline-block">
                      {project.year}
                    </div>
                    <h3 className="text-3xl md:text-4xl font-semibold mb-4 text-text-white">{project.title}</h3>
                    <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/10 mb-6 transform transition-transform hover:translate-y-[-5px]">
                      <p className="text-text-light-accent mb-4">{project.description}</p>
                      <div className="flex space-x-6">
                        <motion.a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-text-white hover:text-accent-color-1 transition-colors"
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <FaGithub className="text-3xl" />
                        </motion.a>
                        {project.live && (
                          <motion.a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-text-white hover:text-accent-color-1 transition-colors"
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FaExternalLinkAlt className="text-3xl" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-text-light-accent mb-6">Interested in seeing more of my work?</p>
          <motion.a
            href="https://github.com/Dushxn"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 ${
              theme === "light" ? "bg-purple-600 hover:bg-purple-700" : "bg-accent-color-2 hover:bg-accent-color-1"
            } text-white px-6 py-3 rounded-lg transition-colors shadow-lg`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub className="text-xl" />
            <span>View More on GitHub</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default Projects
