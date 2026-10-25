"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

const planets = [
  {
    name: "Mercury",
    size: 7,
    distance: 50,
    duration: 3.5,
    initialAngle: 45,
    gradient: ["#b5b5b5", "#787878", "#424242"],
    glowColor: "rgba(181, 181, 181, 0.45)",
    features: "cratered",
  },
  {
    name: "Venus",
    size: 11,
    distance: 74,
    duration: 5.5,
    initialAngle: 135,
    gradient: ["#ffe0a3", "#e6a74c", "#ad5b0c"],
    glowColor: "rgba(255, 224, 163, 0.45)",
    features: "atmosphere",
  },
  {
    name: "Earth",
    size: 13,
    distance: 102,
    duration: 7.5,
    initialAngle: 220,
    gradient: ["#7ec8f2", "#3a86c8", "#17467a"],
    glowColor: "rgba(126, 200, 242, 0.55)",
    features: "earth",
  },
  {
    name: "Mars",
    size: 9,
    distance: 128,
    duration: 9.5,
    initialAngle: 315,
    gradient: ["#f28c79", "#d95338", "#782317"],
    glowColor: "rgba(242, 140, 121, 0.45)",
    features: "mars",
  },
  {
    name: "Jupiter",
    size: 28,
    distance: 176,
    duration: 14,
    initialAngle: 80,
    gradient: ["#ebd7a7", "#cfa75a", "#946a36"],
    glowColor: "rgba(235, 215, 167, 0.45)",
    features: "jupiter",
  },
  {
    name: "Saturn",
    size: 23,
    distance: 224,
    duration: 18,
    initialAngle: 195,
    gradient: ["#f7e7c4", "#deb87a", "#aa8246"],
    glowColor: "rgba(247, 231, 196, 0.45)",
    features: "saturn",
  },
  {
    name: "Uranus",
    size: 16,
    distance: 266,
    duration: 22,
    initialAngle: 285,
    gradient: ["#c5f0f0", "#7ad8d8", "#3fa7a7"],
    glowColor: "rgba(122, 216, 216, 0.45)",
    features: "uranus",
  },
  {
    name: "Neptune",
    size: 15,
    distance: 304,
    duration: 26,
    initialAngle: 160,
    gradient: ["#79a1f2", "#416dd6", "#213e8c"],
    glowColor: "rgba(121, 161, 242, 0.5)",
    features: "neptune",
  },
]

const asteroidCount = 60
const asteroids = Array.from({ length: asteroidCount }, (_, i) => {
  const angle = (i / asteroidCount) * 360 + ((i * 17) % 7) - 3.5
  const rad = 149 + ((i * 13) % 11) - 5
  const size = 1.2 + ((i * 7) % 3) * 0.5
  const alpha = 0.35 + ((i * 19) % 5) * 0.12
  return { angle, rad, size, alpha }
})

function CosmicBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      initStars()
    }
    window.addEventListener("resize", handleResize)

    const colors = ["#ffffff", "#e0f2fe", "#fef3c7", "#ede9fe", "#bae6fd"]
    let stars: {
      x: number
      y: number
      size: number
      alpha: number
      speed: number
      phase: number
      color: string
    }[] = []

    const initStars = () => {
      stars = []
      const count = Math.min(Math.floor((width * height) / 7000), 140)
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.6 + 0.6,
          alpha: Math.random() * 0.7 + 0.3,
          speed: Math.random() * 0.04 + 0.015,
          phase: Math.random() * Math.PI * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
        })
      }
    }
    initStars()

    let meteors: {
      x: number
      y: number
      length: number
      speed: number
      opacity: number
    }[] = []
    let lastMeteor = Date.now()

    const spawnMeteor = () => {
      meteors.push({
        x: Math.random() * width * 0.7,
        y: Math.random() * height * 0.35,
        length: Math.random() * 90 + 70,
        speed: Math.random() * 8 + 12,
        opacity: 0.95,
      })
    }

    let time = 0
    const render = () => {
      time += 0.015
      ctx.clearRect(0, 0, width, height)

      // Deep space cosmic gradient
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        60,
        width / 2,
        height / 2,
        Math.max(width, height) / 1.1
      )
      bgGrad.addColorStop(0, "rgba(9, 14, 30, 0.98)")
      bgGrad.addColorStop(0.55, "rgba(4, 7, 16, 0.99)")
      bgGrad.addColorStop(1, "#020306")
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Nebulae
      const cx = width / 2
      const cy = height / 2

      // Indigo nebula
      const n1 = ctx.createRadialGradient(
        cx - 160 + Math.sin(time) * 20,
        cy - 90,
        30,
        cx - 160,
        cy - 90,
        360
      )
      n1.addColorStop(0, "rgba(99, 102, 241, 0.14)")
      n1.addColorStop(0.65, "rgba(168, 85, 247, 0.06)")
      n1.addColorStop(1, "transparent")
      ctx.fillStyle = n1
      ctx.fillRect(0, 0, width, height)

      // Cyan nebula
      const n2 = ctx.createRadialGradient(
        cx + 170,
        cy + 110 + Math.cos(time) * 20,
        40,
        cx + 170,
        cy + 110,
        380
      )
      n2.addColorStop(0, "rgba(6, 182, 212, 0.12)")
      n2.addColorStop(0.6, "rgba(59, 130, 246, 0.05)")
      n2.addColorStop(1, "transparent")
      ctx.fillStyle = n2
      ctx.fillRect(0, 0, width, height)

      // Stars
      for (const s of stars) {
        s.phase += s.speed
        const a = Math.max(0.1, Math.min(1, s.alpha + Math.sin(s.phase) * 0.3))
        ctx.beginPath()
        ctx.fillStyle = s.color
        ctx.globalAlpha = a
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Meteors
      if (Date.now() - lastMeteor > 3200) {
        spawnMeteor()
        lastMeteor = Date.now()
      }
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.speed * 0.707
        m.y += m.speed * 0.707
        m.opacity -= 0.018

        const tailX = m.x - 0.707 * m.length
        const tailY = m.y - 0.707 * m.length
        const grad = ctx.createLinearGradient(tailX, tailY, m.x, m.y)
        grad.addColorStop(0, "transparent")
        grad.addColorStop(1, `rgba(56, 189, 248, ${m.opacity})`)
        ctx.beginPath()
        ctx.strokeStyle = grad
        ctx.lineWidth = 2
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(m.x, m.y)
        ctx.stroke()

        if (m.opacity <= 0) meteors.splice(i, 1)
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  )
}

function RealisticPlanet({
  planet,
  index,
}: {
  planet: (typeof planets)[0]
  index: number
}) {
  const id = `preloader-planet-${index}`

  return (
    <svg
      width={planet.size * 2}
      height={planet.features === "saturn" ? planet.size * 1.4 : planet.size * 2}
      viewBox={planet.features === "saturn" ? "0 0 100 70" : "0 0 100 100"}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Main planet gradient with realistic lighting */}
        <radialGradient id={`${id}-gradient`} cx="40%" cy="40%">
          <stop offset="0%" stopColor={planet.gradient[0]} />
          <stop offset="60%" stopColor={planet.gradient[1]} />
          <stop offset="100%" stopColor={planet.gradient[2]} />
        </radialGradient>

        {/* Atmosphere glow */}
        <radialGradient id={`${id}-glow`} cx="50%" cy="50%">
          <stop offset="80%" stopColor={planet.gradient[0]} stopOpacity="0" />
          <stop offset="100%" stopColor={planet.gradient[0]} stopOpacity="0.4" />
        </radialGradient>

        {/* Shadow for 3D effect */}
        <radialGradient id={`${id}-shadow`} cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.55" />
        </radialGradient>
      </defs>

      {/* Saturn's rings behind planet */}
      {planet.features === "saturn" && (
        <>
          <ellipse
            cx="50"
            cy="35"
            rx="48"
            ry="10"
            fill="none"
            stroke="#a67c52"
            strokeWidth="3"
            opacity="0.35"
          />
          <ellipse
            cx="50"
            cy="35"
            rx="44"
            ry="8"
            fill="none"
            stroke="#c4a35a"
            strokeWidth="4"
            opacity="0.45"
          />
          <ellipse
            cx="50"
            cy="35"
            rx="38"
            ry="6"
            fill="none"
            stroke="#dab86f"
            strokeWidth="3"
            opacity="0.55"
          />
        </>
      )}

      {/* Main planet body */}
      <circle
        cx="50"
        cy={planet.features === "saturn" ? 35 : 50}
        r="30"
        fill={`url(#${id}-gradient)`}
      />

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
          <ellipse
            cx="50"
            cy="40"
            rx="25"
            ry="8"
            fill="#ffd699"
            opacity="0.3"
            transform="rotate(-15 50 40)"
          />
          <ellipse
            cx="50"
            cy="55"
            rx="22"
            ry="6"
            fill="#e6b366"
            opacity="0.4"
            transform="rotate(10 50 55)"
          />
          <ellipse
            cx="45"
            cy="48"
            rx="18"
            ry="5"
            fill="#cc8800"
            opacity="0.3"
            transform="rotate(-5 45 48)"
          />
        </>
      )}

      {planet.features === "earth" && (
        <>
          {/* Continents */}
          <path
            d="M35 35 Q45 30 50 38 Q48 48 38 50 Q32 45 35 35"
            fill="#228b22"
            opacity="0.8"
          />
          <path
            d="M55 30 Q65 32 68 42 Q64 50 56 48 Q52 38 55 30"
            fill="#228b22"
            opacity="0.75"
          />
          <path
            d="M58 55 Q68 58 70 65 Q62 70 55 66 Q56 60 58 55"
            fill="#228b22"
            opacity="0.7"
          />
          {/* Ice caps */}
          <ellipse cx="50" cy="23" rx="15" ry="5" fill="#fff" opacity="0.75" />
          <ellipse cx="50" cy="77" rx="12" ry="4" fill="#fff" opacity="0.65" />
          {/* Clouds */}
          <ellipse
            cx="42"
            cy="42"
            rx="10"
            ry="3"
            fill="#fff"
            opacity="0.4"
            transform="rotate(-20 42 42)"
          />
          <ellipse
            cx="60"
            cy="58"
            rx="8"
            ry="2"
            fill="#fff"
            opacity="0.35"
            transform="rotate(15 60 58)"
          />
        </>
      )}

      {planet.features === "mars" && (
        <>
          <ellipse cx="40" cy="45" rx="10" ry="8" fill="#5c2018" opacity="0.5" />
          <ellipse cx="58" cy="55" rx="8" ry="6" fill="#5c2018" opacity="0.4" />
          <ellipse cx="50" cy="23" rx="12" ry="4" fill="#fff" opacity="0.65" />
          <circle cx="62" cy="40" r="4" fill="#e8967a" opacity="0.5" />
        </>
      )}

      {planet.features === "jupiter" && (
        <>
          <ellipse cx="50" cy="32" rx="28" ry="3" fill="#a67c52" opacity="0.6" />
          <ellipse cx="50" cy="40" rx="29" ry="4" fill="#f5e6c8" opacity="0.5" />
          <ellipse cx="50" cy="48" rx="28" ry="3" fill="#c4a35a" opacity="0.6" />
          <ellipse cx="50" cy="56" rx="29" ry="4" fill="#8b6914" opacity="0.5" />
          <ellipse cx="50" cy="64" rx="27" ry="3" fill="#d8ca9d" opacity="0.5" />
          <ellipse cx="62" cy="52" rx="8" ry="5" fill="#c44536" opacity="0.75" />
        </>
      )}

      {planet.features === "saturn" && (
        <>
          <ellipse cx="50" cy="28" rx="28" ry="2" fill="#c49a3d" opacity="0.4" />
          <ellipse cx="50" cy="35" rx="29" ry="3" fill="#f4d58d" opacity="0.35" />
          <ellipse cx="50" cy="42" rx="28" ry="2" fill="#dab86f" opacity="0.4" />
        </>
      )}

      {planet.features === "uranus" && (
        <>
          <ellipse cx="50" cy="42" rx="26" ry="8" fill="#4fb3b3" opacity="0.3" />
          <ellipse cx="50" cy="58" rx="24" ry="6" fill="#7dd3d3" opacity="0.25" />
          <ellipse
            cx="50"
            cy="50"
            rx="38"
            ry="4"
            fill="none"
            stroke="#b5e3e3"
            strokeWidth="1.2"
            opacity="0.35"
            transform="rotate(98 50 50)"
          />
        </>
      )}

      {planet.features === "neptune" && (
        <>
          <ellipse cx="50" cy="38" rx="26" ry="4" fill="#7b9fe8" opacity="0.4" />
          <ellipse cx="50" cy="50" rx="28" ry="3" fill="#2d4a9e" opacity="0.5" />
          <ellipse cx="50" cy="62" rx="25" ry="4" fill="#7b9fe8" opacity="0.35" />
          <ellipse cx="40" cy="48" rx="7" ry="5" fill="#1e3570" opacity="0.6" />
          <ellipse cx="45" cy="44" rx="5" ry="2" fill="#b5d4ff" opacity="0.5" />
        </>
      )}

      {/* Saturn's rings in front of planet (smooth continuous lower arc) */}
      {planet.features === "saturn" && (
        <>
          <path
            d="M 2 35 Q 25 45 50 45 Q 75 45 98 35"
            fill="none"
            stroke="#dab86f"
            strokeWidth="3"
            opacity="0.6"
          />
          <path
            d="M 6 35 Q 27 43 50 43 Q 73 43 94 35"
            fill="none"
            stroke="#c4a35a"
            strokeWidth="4"
            opacity="0.5"
          />
          <path
            d="M 12 35 Q 31 41 50 41 Q 69 41 88 35"
            fill="none"
            stroke="#a67c52"
            strokeWidth="3"
            opacity="0.4"
          />
        </>
      )}

      {/* 3D shadow overlay */}
      <circle
        cx="50"
        cy={planet.features === "saturn" ? 35 : 50}
        r="30"
        fill={`url(#${id}-shadow)`}
      />

      {/* Atmosphere glow */}
      <circle
        cx="50"
        cy={planet.features === "saturn" ? 35 : 50}
        r="32"
        fill={`url(#${id}-glow)`}
      />
    </svg>
  )
}

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [scale, setScale] = useState(1)

  // Scale solar system stage so it fits cleanly on any screen width/height without clipping
  useEffect(() => {
    const handleResize = () => {
      const minDim = Math.min(window.innerWidth, window.innerHeight)
      const targetScale = Math.min(1, Math.max(0.42, (minDim * 0.8) / 660))
      setScale(targetScale)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Allow ESC key to skip
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onComplete()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(onComplete, 400)
          return 100
        }
        return prev + 2
      })
    }, 45)

    return () => clearInterval(interval)
  }, [onComplete])

  const getStatusText = (pct: number) => {
    if (pct < 22) return "CALIBRATING ORBITAL TELEMETRY..."
    if (pct < 45) return "ALIGNING CELESTIAL COORDINATES..."
    if (pct < 70) return "INITIALIZING PROPULSION SYSTEMS..."
    if (pct < 92) return "SYNCHRONIZING PLANETARY DYNAMICS..."
    return "ORBITAL INSERTION CONFIRMED • WELCOME ABOARD"
  }

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] bg-[#020408] flex flex-col items-center justify-center overflow-hidden select-none"
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        {/* Dynamic Starfield & Nebulae Canvas */}
        <CosmicBackdrop />

        {/* Top Status HUD Badge */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#22d3ee]" />
          <span className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-white/80">
            Deep Space Observation • Solar System
          </span>
        </motion.div>

        {/* Scaled Solar System Stage Container */}
        <div
          className="relative flex items-center justify-center transition-transform duration-300 ease-out z-10"
          style={{
            width: 660,
            height: 660,
            transform: `scale(${scale})`,
          }}
        >
          {/* Sun with multi-layer radiant corona */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none">
            {/* Outermost ambient heat glow */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 150,
                height: 150,
                background:
                  "radial-gradient(circle, rgba(255,165,0,0.35) 0%, rgba(255,90,0,0.18) 45%, rgba(255,40,0,0) 75%)",
                filter: "blur(14px)",
              }}
              animate={{ scale: [1, 1.15, 1], opacity: [0.75, 1, 0.75] }}
              transition={{
                duration: 3.5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />

            {/* Rotating solar corona flare wave */}
            <motion.div
              className="absolute rounded-full"
              style={{
                width: 100,
                height: 100,
                background:
                  "radial-gradient(circle, rgba(255,220,120,0.45) 0%, rgba(255,130,0,0.2) 65%, transparent 100%)",
                filter: "blur(7px)",
              }}
              animate={{ rotate: 360, scale: [1, 1.08, 1] }}
              transition={{
                rotate: {
                  duration: 22,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
                scale: {
                  duration: 2.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
            />

            {/* Sun Core Graphic */}
            <motion.div
              animate={{ scale: [1, 1.03, 1] }}
              transition={{
                duration: 2.8,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <svg width="76" height="76" viewBox="0 0 100 100">
                <defs>
                  <radialGradient id="sunCore" cx="45%" cy="45%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="25%" stopColor="#fff3cc" />
                    <stop offset="55%" stopColor="#ffb703" />
                    <stop offset="85%" stopColor="#fb8500" />
                    <stop offset="100%" stopColor="#d00000" />
                  </radialGradient>
                  <radialGradient id="sunCorona" cx="50%" cy="50%">
                    <stop offset="60%" stopColor="#ffb703" stopOpacity="0.45" />
                    <stop offset="90%" stopColor="#fb8500" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#d00000" stopOpacity="0" />
                  </radialGradient>
                  <filter
                    id="sunGlow"
                    x="-20%"
                    y="-20%"
                    width="140%"
                    height="140%"
                  >
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <circle cx="50" cy="50" r="48" fill="url(#sunCorona)" />
                <circle
                  cx="50"
                  cy="50"
                  r="34"
                  fill="url(#sunCore)"
                  filter="url(#sunGlow)"
                />
                <circle cx="42" cy="40" r="4.5" fill="#fff7d6" opacity="0.8" />
                <circle cx="58" cy="54" r="3.5" fill="#ffa200" opacity="0.6" />
                <circle cx="50" cy="60" r="2.5" fill="#ff7700" opacity="0.5" />
                <circle cx="36" cy="52" r="3" fill="#ffdd55" opacity="0.7" />
              </svg>
            </motion.div>
          </div>

          {/* Asteroid Belt (Between Mars and Jupiter at radius 149px) */}
          <div className="absolute left-1/2 top-1/2 pointer-events-none">
            {/* Faint dotted belt path */}
            <div
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10"
              style={{ width: 149 * 2, height: 149 * 2 }}
            />
            {/* Drifting asteroids */}
            <motion.div
              className="absolute"
              style={{
                width: 149 * 2,
                height: 149 * 2,
                left: -149,
                top: -149,
                transformOrigin: "center center",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 55,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            >
              {asteroids.map((ast, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-stone-300 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${
                      50 +
                      (ast.rad / 149) * 50 * Math.cos((ast.angle * Math.PI) / 180)
                    }%`,
                    top: `${
                      50 +
                      (ast.rad / 149) * 50 * Math.sin((ast.angle * Math.PI) / 180)
                    }%`,
                    width: ast.size,
                    height: ast.size,
                    opacity: ast.alpha,
                  }}
                />
              ))}
            </motion.div>
          </div>

          {/* Orbits and Mathematically Centered Planets */}
          {planets.map((planet, index) => {
            const orbitDiameter = planet.distance * 2

            return (
              <div
                key={planet.name}
                className="absolute left-1/2 top-1/2 pointer-events-none"
              >
                {/* 1. Orbit path ring */}
                <div
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/20"
                  style={{
                    width: orbitDiameter,
                    height: orbitDiameter,
                    boxShadow: "0 0 10px rgba(6, 182, 212, 0.04)",
                  }}
                />

                {/* 2. Planetary orbital rotator (rotates around center/Sun) */}
                <motion.div
                  className="absolute"
                  style={{
                    width: orbitDiameter,
                    height: orbitDiameter,
                    left: -planet.distance,
                    top: -planet.distance,
                    transformOrigin: "center center",
                  }}
                  initial={{ rotate: planet.initialAngle }}
                  animate={{ rotate: planet.initialAngle + 360 }}
                  transition={{
                    duration: planet.duration,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  {/* 3. Planet Anchor: Mathematically centered directly on (left: 50%, top: 0) of the orbit circle */}
                  <div
                    className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center group pointer-events-auto cursor-pointer"
                    style={{
                      left: "50%",
                      top: 0,
                    }}
                  >
                    {/* Planet Counter-rotator */}
                    <motion.div
                      className="flex items-center justify-center relative"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: planet.duration,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      {/* Subtle atmospheric glow halo behind planet */}
                      <div
                        className="absolute rounded-full filter blur-[5px] pointer-events-none"
                        style={{
                          width: planet.size * 1.8,
                          height: planet.size * 1.8,
                          background: `radial-gradient(circle, ${planet.glowColor} 0%, transparent 70%)`,
                          opacity: 0.6,
                        }}
                      />

                      <RealisticPlanet planet={planet} index={index} />
                    </motion.div>

                    {/* Planet name label */}
                    <div
                      className="absolute -bottom-4 sm:-bottom-5 whitespace-nowrap text-[9px] font-mono tracking-wider uppercase text-white/50 opacity-0 group-hover:opacity-100 sm:opacity-75 transition-opacity duration-300 pointer-events-none select-none"
                      style={{
                        textShadow:
                          "0 0 6px rgba(0,0,0,0.9), 0 0 3px rgba(0,0,0,1)",
                      }}
                    >
                      {planet.name}
                    </div>
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>

        {/* Futuristic Mission Control HUD Progress Console */}
        <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 w-full max-w-xs sm:max-w-sm px-4 flex flex-col items-center z-20">
          <div className="w-full p-3.5 sm:p-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-xl shadow-[0_0_25px_rgba(0,0,0,0.8)] flex flex-col items-center">
            {/* Dynamic mission status line */}
            <motion.p
              key={Math.floor(progress / 22)}
              initial={{ opacity: 0, y: 3 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-[10px] sm:text-xs font-mono text-cyan-300 tracking-wider mb-2.5 text-center h-4 line-clamp-1"
            >
              {getStatusText(progress)}
            </motion.p>

            {/* Glowing Dual-Tone Progress Bar */}
            <div className="relative w-full h-1.5 sm:h-2 bg-white/10 rounded-full overflow-hidden p-[1px]">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-amber-300 shadow-[0_0_12px_rgba(6,182,212,0.7)]"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Telemetry Stats & Percentage */}
            <div className="w-full flex justify-between items-center mt-2 px-0.5 text-[10px] font-mono text-white/50">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                SYS STATUS: NOMINAL
              </span>
              <span className="text-white/95 font-bold text-xs">{progress}%</span>
            </div>
          </div>

          {/* Quick Skip Option */}
          <button
            onClick={onComplete}
            className="mt-2.5 text-[10px] sm:text-[11px] font-mono tracking-wider text-white/40 hover:text-white transition-colors uppercase cursor-pointer"
          >
            Skip Launch [ESC] →
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
