"use client"
import TD from "../assets/TD.png"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { HiMenu, HiX } from "react-icons/hi"
import { MdLightMode, MdDarkMode } from "react-icons/md"

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light")
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light"
    setTheme(storedTheme)
    document.body.setAttribute("data-theme", storedTheme)
    document.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: storedTheme } }))
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    document.body.setAttribute("data-theme", newTheme)
    localStorage.setItem("theme", newTheme)

    // Dispatch a custom event to notify other components
    document.dispatchEvent(new CustomEvent("themeChanged", { detail: { theme: newTheme } }))
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <motion.div
      className="sticky top-0 z-50 backdrop-blur-lg md:bg-opacity-70 bg-opacity-90 bg-bg-color"
      id="Navbar"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ delay: 0.1, duration: 0.3 }}
    >
      <div className="container mx-auto flex items-center justify-between p-4 relative z-50">
        <div className="flex items-center">
          <img src={TD || "/placeholder.svg"} alt="Logo" className="h-10 w-10 md:h-12 md:w-12" />
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full hover:bg-gray-800/20 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <MdLightMode className="text-2xl md:text-3xl toggler" />
            ) : (
              <MdDarkMode className="text-2xl md:text-3xl toggler" />
            )}
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden p-2 text-white focus:outline-none" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <a href="#AboutMe" className="p-2 hover:text-accent-color-1 transition-colors">
            About me
          </a>
          <a href="#Skills" className="p-2 hover:text-accent-color-1 transition-colors">
            Skills
          </a>
          <a href="#Projects" className="p-2 hover:text-accent-color-1 transition-colors">
            Projects
          </a>
          
          <a
            className="BTN bg-accent-color-2 px-6 py-2 rounded-lg text-white font-semibold hover:bg-accent-color-1 transition-colors"
            href="#ContactMe"
          >
            Contact Me
          </a>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            className="absolute top-full left-0 right-0 bg-bg-color bg-opacity-95 backdrop-blur-lg md:hidden z-50"
            data-mobile-menu="true"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col p-4">
              <a href="#AboutMe" className="hover:text-accent-color-1 transition-colors" onClick={closeMenu}>
                About me
              </a>
              <a href="#Skills" className="hover:text-accent-color-1 transition-colors" onClick={closeMenu}>
                Skills
              </a>
              <a href="#Projects" className="hover:text-accent-color-1 transition-colors" onClick={closeMenu}>
                Projects
              </a>
              
              <a
                className="BTN bg-accent-color-2 rounded-lg text-white font-semibold text-center hover:bg-accent-color-1 transition-colors"
                href="#ContactMe"
                onClick={closeMenu}
              >
                Contact Me
              </a>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}

export default Navbar
