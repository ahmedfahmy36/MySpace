"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Mars, Saturn, Jupiter, Neptune, Earth } from "./planets"

const navItems = [
  { name: "About", href: "#about", planet: Mars },
  { name: "Skills", href: "#skills", planet: Saturn },
  { name: "Experience", href: "#experience", planet: Jupiter },
  { name: "Projects", href: "#projects", planet: Neptune },
  { name: "Contact", href: "#contact", planet: Earth },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState("")
  const [scrolled, setScrolled] = useState(false)
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = navItems.map((item) => item.href.slice(1))
      for (const section of sections.reverse()) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-md border-b border-border" : ""
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <ul className="flex items-center justify-center gap-4 xs:gap-6 sm:gap-8 md:gap-10 lg:gap-14">
          {navItems.map((item) => {
            const PlanetIcon = item.planet
            const isActive = activeSection === item.href.slice(1)
            const isHovered = hoveredItem === item.name

            return (
              <li key={item.name}>
                <a
                  href={item.href}
                  className="relative flex flex-col items-center gap-1 group"
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <motion.div
                    animate={{
                      scale: isActive || isHovered ? 1.2 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <PlanetIcon size={28} className="xs:w-8 xs:h-8 sm:w-9 sm:h-9" />
                  </motion.div>

                  {/* Nav link name - shows on hover or active */}
                  <AnimatePresence>
                    {(isHovered || isActive) && (
                      <motion.span
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2 }}
                        className={`text-xs font-medium whitespace-nowrap ${isActive ? "text-primary" : "text-muted-foreground"}`}
                      >
                        {item.name}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Active indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activePlanet"
                      className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </motion.nav>
  )
}
