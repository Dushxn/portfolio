"use client"

import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Pages/Home"
import Navbar from "./Shared/Navbar"
import Contact from "./Components/Contact"
import { SplashCursor } from "./Components/ui/splash-cursor"
import { useEffect, useState } from "react"

const App = () => {
  const [theme, setTheme] = useState("dark")
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    const storedTheme = localStorage.getItem("theme") || "dark"
    setTheme(storedTheme)

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

  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <SplashCursor
          BACK_COLOR={theme === "light" ? { r: 0.95, g: 0.95, b: 0.95 } : { r: 0, g: 0, b: 0 }}
          SPLAT_RADIUS={0.3}
          COLOR_UPDATE_SPEED={6}
          DENSITY_DISSIPATION={isMobile ? 4 : 2.5}
          VELOCITY_DISSIPATION={isMobile ? 2.5 : 1.5}
          SPLAT_FORCE={isMobile ? 4000 : 8000}
          isMobile={isMobile}
        />
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/contactme" element={<Contact />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App
