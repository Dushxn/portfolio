"use client"

import { useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com"
import { FaEnvelope, FaMapMarkerAlt, FaPhone } from "react-icons/fa"

const Contact = () => {
  const form = useRef()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)
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

  const sendEmail = (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    emailjs
      .sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form.current,
        import.meta.env.VITE_EMAILJS_USER_ID,
      )
      .then(
        (result) => {
          console.log(result.text)
          setSubmitStatus({ success: true, message: "Message sent successfully!" })
          e.target.reset()
        },
        (error) => {
          console.log(error.text)
          setSubmitStatus({ success: false, message: "An error occurred, please try again." })
        },
      )
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section className="py-12 md:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden" id="ContactMe">
      <div className="absolute inset-0 z-0">
        {/* Your motion.svg background remains unchanged */}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ y: -30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold about-title">Get In Touch</h2>
          <p className="text-text-light-accent mt-4 max-w-2xl mx-auto text-sm sm:text-base">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {/* Contact Info Cards */}
          <motion.div
            className="space-y-6"
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {[{
              icon: FaEnvelope,
              title: "Email",
              content: "tdmahindarathne@gmail.com",
              link: "mailto:tdmahindarathne@gmail.com",
              color: theme === "light" ? "from-purple-500 to-purple-600" : "from-purple-500 to-pink-500",
            },
            {
              icon: FaPhone,
              title: "Phone",
              content: "+94 76 123 4567",
              link: "tel:+94761234567",
              color: theme === "light" ? "from-purple-600 to-purple-700" : "from-blue-500 to-purple-500",
            },
            {
              icon: FaMapMarkerAlt,
              title: "Location",
              content: "Colombo, Sri Lanka",
              link: "#",
              color: theme === "light" ? "from-purple-500 to-purple-600" : "from-pink-500 to-orange-500",
            },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                className="block bg-white/5 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 shadow-lg hover:shadow-accent-color-1/20 transition-all"
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex items-start">
                  {/* ICON - only visible on large (lg) screens and above */}
                  <div
                    className={`hidden lg:flex items-center justify-center p-4 lg:p-5 rounded-lg bg-gradient-to-r ${item.color} mr-4`}
                  >
                    <item.icon className="text-white text-2xl xl:text-xl" />
                  </div>

                  {/* Text content - responsive sizing */}
                  <div>
                    <h3 className="text-base sm:text-lg md:text-xl lg:text-3xl font-semibold text-text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base md:text-lg text-text-light-accent">
                      {item.content}
                    </p>
                  </div>
                </div>
              </motion.a>


            ))}

            {/* Working Hours */}
            <motion.div
              className="bg-white/5 backdrop-blur-md rounded-xl p-5 sm:p-6 border border-white/10 shadow-lg"
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-base sm:text-lg font-semibold text-text-white mb-4">Working Hours</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-text-light-accent">Mon - Fri</span>
                  <span className="text-text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light-accent">Saturday</span>
                  <span className="text-text-white">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-text-light-accent">Sunday</span>
                  <span className="text-text-white">Closed</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className="md:col-span-2"
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-white/5 backdrop-blur-md rounded-xl p-5 sm:p-6 md:p-8 shadow-lg border border-white/10">
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-text-white">Send Me a Message</h3>

              {submitStatus && (
                <motion.div
                  className={`p-3 rounded-lg mb-6 text-sm ${submitStatus.success ? "bg-green-500/20 text-green-200" : "bg-red-500/20 text-red-200"
                    }`}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <form ref={form} onSubmit={sendEmail} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm text-text-white mb-2">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-accent-color-1 focus:outline-none text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-text-white mb-2">Your Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="john@example.com"
                      className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-accent-color-1 focus:outline-none text-sm"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-text-white mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    placeholder="Project Inquiry"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-accent-color-1 focus:outline-none text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm text-text-white mb-2">Message</label>
                  <textarea
                    name="content"
                    placeholder="Tell me about your project..."
                    rows="5"
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 focus:border-accent-color-1 focus:outline-none text-sm resize-none"
                    required
                  ></textarea>
                </div>

                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`text-sm px-6 py-3 sm:px-8 rounded-full text-white font-semibold transition-all transform hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed ${theme === "light"
                      ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:shadow-purple-300/30"
                      : "bg-gradient-to-r from-accent-color-2 to-accent-color-1 hover:shadow-accent-color-1/30"
                      }`}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

  )
}

export default Contact
