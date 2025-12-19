"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const planets = [
  {
    name: "Mercury",
    size: 6,
    distance: 50,
    duration: 3,
    // Gray, cratered surface
    gradient: ["#8c8c8c", "#5c5c5c", "#3d3d3d"],
    features: "cratered",
  },
  {
    name: "Venus",
    size: 10,
    distance: 70,
    duration: 5,
    // Yellowish with thick atmosphere swirls
    gradient: ["#ffd699", "#e6b366", "#cc8800"],
    features: "atmosphere",
  },
  {
    name: "Earth",
    size: 12,
    distance: 95,
    duration: 7,
    // Blue with green continents
    gradient: ["#6b93d6", "#4a7ab8", "#1e3a5f"],
    features: "earth",
  },
  {
    name: "Mars",
    size: 8,
    distance: 120,
    duration: 9,
    // Red/orange with dark patches
    gradient: ["#e07a5f", "#c44536", "#772e25"],
    features: "mars",
  },
  {
    name: "Jupiter",
    size: 32,
    distance: 165,
    duration: 13,
    // Tan with iconic bands
    gradient: ["#d8ca9d", "#c4a35a", "#a67c52"],
    features: "jupiter",
  },
  {
    name: "Saturn",
    size: 26,
    distance: 215,
    duration: 17,
    // Pale gold with rings
    gradient: ["#f4d58d", "#dab86f", "#c49a3d"],
    features: "saturn",
  },
  {
    name: "Uranus",
    size: 18,
    distance: 260,
    duration: 21,
    // Pale cyan/teal
    gradient: ["#b5e3e3", "#7dd3d3", "#4fb3b3"],
    features: "uranus",
  },
  {
    name: "Neptune",
    size: 17,
    distance: 300,
    duration: 25,
    // Deep blue with visible storms
    gradient: ["#5b7fde", "#4361c2", "#2d4a9e"],
    features: "neptune",
  },
]

function RealisticPlanet({ planet, index }: { planet: (typeof planets)[0]; index: number }) {
  const id = `planet-${index}`

  return (
    <svg
      width={planet.size * 2}
      height={planet.features === "saturn" ? planet.size * 1.4 : planet.size * 2}
      viewBox={planet.features === "saturn" ? "0 0 100 70" : "0 0 100 100"}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Main planet gradient with realistic lighting */}
        <radialGradient id={`${id}-gradient`} cx="35%" cy="35%">
          <stop offset="0%" stopColor={planet.gradient[0]} />
          <stop offset="60%" stopColor={planet.gradient[1]} />
          <stop offset="100%" stopColor={planet.gradient[2]} />
        </radialGradient>

        {/* Atmosphere glow */}
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%">
          <stop offset="80%" stopColor={planet.gradient[0]} stopOpacity="0" />
          <stop offset="100%" stopColor={planet.gradient[0]} stopOpacity="0.3" />
        </radialGradient>

        {/* Shadow for 3D effect */}
        <radialGradient id={`${id}-shadow`} cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>

      {/* Saturn's rings behind planet */}
      {planet.features === "saturn" && (
        <>
          <ellipse cx="50" cy="35" rx="48" ry="10" fill="none" stroke="#a67c52" strokeWidth="3" opacity="0.3" />
          <ellipse cx="50" cy="35" rx="44" ry="8" fill="none" stroke="#c4a35a" strokeWidth="4" opacity="0.4" />
          <ellipse cx="50" cy="35" rx="38" ry="6" fill="none" stroke="#dab86f" strokeWidth="3" opacity="0.5" />
        </>
      )}

      {/* Main planet body */}
      <circle cx="50" cy={planet.features === "saturn" ? 35 : 50} r="30" fill={`url(#${id}-gradient)`} />

      {/* Planet-specific features */}
      {planet.features === "cratered" && (
        <>
          <circle cx="35" cy="40" r="5" fill="#3d3d3d" opacity="0.4" />
          <circle cx="55" cy="55" r="7" fill="#3d3d3d" opacity="0.3" />
          <circle cx="60" cy="35" r="4" fill="#3d3d3d" opacity="0.35" />
          <circle cx="42" cy="60" r="3" fill="#3d3d3d" opacity="0.3" />
        </>
      )}

      {planet.features === "atmosphere" && (
        <>
          <ellipse cx="50" cy="40" rx="25" ry="8" fill="#ffd699" opacity="0.3" transform="rotate(-15 50 40)" />
          <ellipse cx="50" cy="55" rx="22" ry="6" fill="#e6b366" opacity="0.4" transform="rotate(10 50 55)" />
          <ellipse cx="45" cy="48" rx="18" ry="5" fill="#cc8800" opacity="0.3" transform="rotate(-5 45 48)" />
        </>
      )}

      {planet.features === "earth" && (
        <>
          {/* Continents */}
          <path d="M35 35 Q45 30 50 38 Q48 48 38 50 Q32 45 35 35" fill="#228b22" opacity="0.8" />
          <path d="M55 30 Q65 32 68 42 Q64 50 56 48 Q52 38 55 30" fill="#228b22" opacity="0.75" />
          <path d="M58 55 Q68 58 70 65 Q62 70 55 66 Q56 60 58 55" fill="#228b22" opacity="0.7" />
          {/* Ice caps */}
          <ellipse cx="50" cy="23" rx="15" ry="5" fill="#fff" opacity="0.7" />
          <ellipse cx="50" cy="77" rx="12" ry="4" fill="#fff" opacity="0.6" />
          {/* Clouds */}
          <ellipse cx="42" cy="42" rx="10" ry="3" fill="#fff" opacity="0.4" transform="rotate(-20 42 42)" />
          <ellipse cx="60" cy="58" rx="8" ry="2" fill="#fff" opacity="0.35" transform="rotate(15 60 58)" />
        </>
      )}

      {planet.features === "mars" && (
        <>
          {/* Dark regions (Syrtis Major, etc) */}
          <ellipse cx="40" cy="45" rx="10" ry="8" fill="#5c2018" opacity="0.5" />
          <ellipse cx="58" cy="55" rx="8" ry="6" fill="#5c2018" opacity="0.4" />
          {/* Polar ice cap */}
          <ellipse cx="50" cy="23" rx="12" ry="4" fill="#fff" opacity="0.6" />
          {/* Olympus Mons hint */}
          <circle cx="62" cy="40" r="4" fill="#e8967a" opacity="0.5" />
        </>
      )}

      {planet.features === "jupiter" && (
        <>
          {/* Cloud bands */}
          <ellipse cx="50" cy="32" rx="28" ry="3" fill="#a67c52" opacity="0.6" />
          <ellipse cx="50" cy="40" rx="29" ry="4" fill="#f5e6c8" opacity="0.5" />
          <ellipse cx="50" cy="48" rx="28" ry="3" fill="#c4a35a" opacity="0.6" />
          <ellipse cx="50" cy="56" rx="29" ry="4" fill="#8b6914" opacity="0.5" />
          <ellipse cx="50" cy="64" rx="27" ry="3" fill="#d8ca9d" opacity="0.5" />
          {/* Great Red Spot */}
          <ellipse cx="62" cy="52" rx="8" ry="5" fill="#c44536" opacity="0.7" />
        </>
      )}

      {planet.features === "saturn" && (
        <>
          {/* Cloud bands */}
          <ellipse cx="50" cy="28" rx="28" ry="2" fill="#c49a3d" opacity="0.4" />
          <ellipse cx="50" cy="35" rx="29" ry="3" fill="#f4d58d" opacity="0.3" />
          <ellipse cx="50" cy="42" rx="28" ry="2" fill="#dab86f" opacity="0.4" />
        </>
      )}

      {planet.features === "uranus" && (
        <>
          {/* Subtle atmosphere bands */}
          <ellipse cx="50" cy="42" rx="26" ry="8" fill="#4fb3b3" opacity="0.3" />
          <ellipse cx="50" cy="58" rx="24" ry="6" fill="#7dd3d3" opacity="0.25" />
          {/* Faint ring */}
          <ellipse
            cx="50"
            cy="50"
            rx="38"
            ry="4"
            fill="none"
            stroke="#b5e3e3"
            strokeWidth="1"
            opacity="0.3"
            transform="rotate(98 50 50)"
          />
        </>
      )}

      {planet.features === "neptune" && (
        <>
          {/* Cloud bands and storms */}
          <ellipse cx="50" cy="38" rx="26" ry="4" fill="#7b9fe8" opacity="0.4" />
          <ellipse cx="50" cy="50" rx="28" ry="3" fill="#2d4a9e" opacity="0.5" />
          <ellipse cx="50" cy="62" rx="25" ry="4" fill="#7b9fe8" opacity="0.35" />
          {/* Great Dark Spot */}
          <ellipse cx="40" cy="48" rx="7" ry="5" fill="#1e3570" opacity="0.6" />
          {/* Bright clouds */}
          <ellipse cx="45" cy="44" rx="5" ry="2" fill="#b5d4ff" opacity="0.5" />
        </>
      )}

      {/* Saturn's rings in front of planet */}
      {planet.features === "saturn" && (
        <>
          <path d="M 2 35 Q 25 30 50 35" fill="none" stroke="#dab86f" strokeWidth="3" opacity="0.5" />
          <path d="M 6 35 Q 28 31 50 35" fill="none" stroke="#c4a35a" strokeWidth="4" opacity="0.4" />
          <path d="M 12 35 Q 30 32 50 35" fill="none" stroke="#a67c52" strokeWidth="3" opacity="0.3" />
        </>
      )}

      {/* 3D shadow overlay */}
      <circle cx="50" cy={planet.features === "saturn" ? 35 : 50} r="30" fill={`url(#${id}-shadow)`} />

      {/* Atmosphere glow */}
      <circle cx="50" cy={planet.features === "saturn" ? 35 : 50} r="32" fill={`url(#${id}-glow)`} />
    </svg>
  )
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 2
      })
    }, 50)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Solar System Container */}
        <div className="relative w-[90vmin] h-[90vmin] max-w-[700px] max-h-[700px]">
          {/* Sun with realistic corona */}
          <motion.div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <svg width="70" height="70" viewBox="0 0 100 100">
              <defs>
                <radialGradient id="sunCore" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#fff7e0" />
                  <stop offset="30%" stopColor="#ffdd55" />
                  <stop offset="60%" stopColor="#ffaa00" />
                  <stop offset="100%" stopColor="#ff6600" />
                </radialGradient>
                <radialGradient id="sunCorona" cx="50%" cy="50%">
                  <stop offset="70%" stopColor="#ffaa00" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#ff6600" stopOpacity="0" />
                </radialGradient>
                <filter id="sunGlow">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              {/* Corona */}
              <circle cx="50" cy="50" r="48" fill="url(#sunCorona)" />
              {/* Sun surface */}
              <circle cx="50" cy="50" r="35" fill="url(#sunCore)" filter="url(#sunGlow)" />
              {/* Surface details */}
              <circle cx="40" cy="42" r="4" fill="#ffcc00" opacity="0.6" />
              <circle cx="58" cy="55" r="3" fill="#ff9900" opacity="0.5" />
              <circle cx="52" cy="38" r="2" fill="#ffdd55" opacity="0.7" />
            </svg>
          </motion.div>

          {/* Orbits and Planets */}
          {planets.map((planet, index) => (
            <div key={planet.name} className="absolute left-1/2 top-1/2">
              {/* Orbit path */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5"
                style={{
                  width: planet.distance * 2,
                  height: planet.distance * 2,
                }}
              />

              {/* Planet container - rotates around center */}
              <motion.div
                className="absolute"
                style={{
                  width: planet.distance * 2,
                  height: planet.distance * 2,
                  left: -planet.distance,
                  top: -planet.distance,
                }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: planet.duration,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              >
                {/* Planet positioned at top of orbit */}
                <motion.div
                  className="absolute flex items-center justify-center"
                  style={{
                    left: "50%",
                    top: 0,
                    transform: "translateX(-50%)",
                  }}
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: planet.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <RealisticPlanet planet={planet} index={index} />
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Loading text and progress */}
        <div className="absolute bottom-16 sm:bottom-20 left-1/2 -translate-x-1/2 text-center">
          <motion.p
            className="text-white/80 text-xs sm:text-sm mb-4 tracking-widest uppercase"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            Launching into orbit...
          </motion.p>

          {/* Progress bar */}
          <div className="w-40 sm:w-48 h-1 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-white/60 text-xs mt-2">{progress}%</p>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
