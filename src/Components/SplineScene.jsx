"use client"

import { Suspense, lazy, useState, useEffect } from "react"
const Spline = lazy(() => import("@splinetool/react-spline"))

export function SplineScene({ scene, className }) {
  const [isLoading, setIsLoading] = useState(true)
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
    <div className={`relative w-full h-full ${className || ""}`}>
      {isLoading && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center z-10">
          <span className="loader"></span>
        </div>
      )}
      <Suspense
        fallback={
          <div className="w-full h-full flex items-center justify-center">
            <span className="loader"></span>
          </div>
        }
      >
        <Spline scene={scene} className={className} onLoad={() => setIsLoading(false)} />
      </Suspense>
    </div>
  )
}
