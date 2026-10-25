"use client"

import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"

interface PlasmaParticle {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  color: string
}

function lerpAngle(current: number, target: number, t: number): number {
  let diff = (target - current) % 360
  if (diff < -180) diff += 360
  if (diff > 180) diff -= 360
  return current + diff * t
}

export function ScrollRocket() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [renderState, setRenderState] = useState({
    x: 0,
    y: 0,
    rotation: 0,
    speed: 0,
    isThrusting: false,
  })

  // Physics engine references (avoid re-render overhead in 60fps loop)
  const physicsRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    rotation: 0,
    targetRotation: 0,
    isDragging: false,
    dragTargetX: 0,
    dragTargetY: 0,
    isBoosting: false,
  })

  const keysPressed = useRef<Set<string>>(new Set())
  const animationRef = useRef<number | undefined>(undefined)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const particlesRef = useRef<PlasmaParticle[]>([])
  const particleIdRef = useRef(0)

  // Initialize position responsive to screen size
  useEffect(() => {
    const isMobile = window.innerWidth < 640
    const startX = window.innerWidth - (isMobile ? 50 : 75)
    const startY = window.innerHeight * 0.7

    physicsRef.current.x = startX
    physicsRef.current.y = startY
    setRenderState({
      x: startX,
      y: startY,
      rotation: 0,
      speed: 0,
      isThrusting: false,
    })
    setIsInitialized(true)

    const timeout = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timeout)
  }, [])

  // Canvas resize and particle loop
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight

      const p = physicsRef.current
      if (p.x > window.innerWidth - 40) p.x = Math.max(40, window.innerWidth - 50)
      if (p.y > window.innerHeight - 60) p.y = Math.min(window.innerHeight - 60, window.innerHeight * 0.7)
    }

    window.addEventListener("resize", handleResize)

    let animId: number
    const renderParticles = () => {
      ctx.clearRect(0, 0, width, height)

      const particles = particlesRef.current
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.alpha -= 0.025
        p.size *= 0.95

        if (p.alpha <= 0 || p.size <= 0.3) {
          particles.splice(i, 1)
          continue
        }

        ctx.beginPath()
        ctx.fillStyle = p.color
        ctx.globalAlpha = Math.max(0, p.alpha)
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      animId = requestAnimationFrame(renderParticles)
    }

    animId = requestAnimationFrame(renderParticles)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Particle emission helper
  const emitPlasma = useCallback((posX: number, posY: number, currentRotation: number, intensity: number) => {
    const rad = ((currentRotation + 90) * Math.PI) / 180
    const nozzleDistance = 24
    const nozzleX = posX - Math.cos(rad) * nozzleDistance
    const nozzleY = posY - Math.sin(rad) * nozzleDistance

    const colors = ["#f97316", "#facc15", "#38bdf8", "#ef4444", "#ffffff"]
    const count = Math.min(Math.floor(2 + intensity * 2), 6)

    for (let i = 0; i < count; i++) {
      const spread = (Math.random() - 0.5) * 0.6
      const ejectSpeed = Math.random() * 4 + 3 + intensity * 2
      const particleRad = rad + Math.PI + spread

      particlesRef.current.push({
        id: particleIdRef.current++,
        x: nozzleX,
        y: nozzleY,
        vx: Math.cos(particleRad) * ejectSpeed,
        vy: Math.sin(particleRad) * ejectSpeed,
        size: Math.random() * 3.5 + 2,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      })
    }
  }, [])

  // Smooth Edge Scrolling
  const handleEdgeScroll = useCallback((currentY: number) => {
    const threshold = 60
    const scrollAmount = 80

    if (currentY <= threshold && window.scrollY > 0) {
      window.scrollBy({ top: -scrollAmount, behavior: "smooth" })
    } else if (currentY >= window.innerHeight - threshold) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY < maxScroll) {
        window.scrollBy({ top: scrollAmount, behavior: "smooth" })
      }
    }
  }, [])

  // 60FPS Game Physics Loop
  useEffect(() => {
    let lastTime = performance.now()

    const physicsLoop = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime = now

      const p = physicsRef.current
      const keys = keysPressed.current

      let ax = 0
      let ay = 0
      const thrustPower = 28 // Acceleration in px/s^2
      const drag = 0.92 // Space friction damping
      const maxSpeed = 12

      // Keyboard Controls
      if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) ay -= thrustPower
      if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) ay += thrustPower
      if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) ax -= thrustPower
      if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) ax += thrustPower

      // Dragging / Touch Controls (Smooth spring pull)
      if (p.isDragging) {
        const dx = p.dragTargetX - p.x
        const dy = p.dragTargetY - p.y
        ax += dx * 6.5
        ay += dy * 6.5
      }

      // Apply acceleration to velocity
      p.vx += ax * dt
      p.vy += ay * dt

      // Apply atmospheric space drag
      p.vx *= drag
      p.vy *= drag

      // Clamp max velocity
      const currentSpeed = Math.hypot(p.vx, p.vy)
      if (currentSpeed > maxSpeed) {
        p.vx = (p.vx / currentSpeed) * maxSpeed
        p.vy = (p.vy / currentSpeed) * maxSpeed
      }

      // Update position
      p.x += p.vx
      p.y += p.vy

      // Soft boundary bounce (screen limits)
      const pad = 35
      const maxX = window.innerWidth - pad
      const maxY = window.innerHeight - pad

      if (p.x < pad) {
        p.x = pad
        p.vx = -p.vx * 0.4
      } else if (p.x > maxX) {
        p.x = maxX
        p.vx = -p.vx * 0.4
      }

      if (p.y < pad) {
        p.y = pad
        p.vy = -p.vy * 0.4
      } else if (p.y > maxY) {
        p.y = maxY
        p.vy = -p.vy * 0.4
      }

      // Smooth Angular Rotation (Inertia turn)
      const isMoving = currentSpeed > 0.4
      const isThrusting = (ax !== 0 || ay !== 0 || p.isDragging) && isMoving

      if (isMoving) {
        p.targetRotation = Math.atan2(p.vy, p.vx) * (180 / Math.PI) + 90
        p.rotation = lerpAngle(p.rotation, p.targetRotation, 0.16)
        emitPlasma(p.x, p.y, p.rotation, currentSpeed / maxSpeed)
        handleEdgeScroll(p.y)
      } else {
        // Idle floating oscillation (Zero-G hovering effect)
        const idleWobble = Math.sin(now * 0.003) * 1.5
        p.rotation = lerpAngle(p.rotation, p.targetRotation + idleWobble, 0.08)
      }

      // Update render state
      const idleFloatY = isMoving ? 0 : Math.sin(now * 0.0025) * 3
      setRenderState({
        x: p.x,
        y: p.y + idleFloatY,
        rotation: p.rotation,
        speed: currentSpeed,
        isThrusting,
      })

      animationRef.current = requestAnimationFrame(physicsLoop)
    }

    animationRef.current = requestAnimationFrame(physicsLoop)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [emitPlasma, handleEdgeScroll])

  // Key listeners
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
        return
      }

      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "w", "a", "s", "d", "W", "A", "S", "D"].includes(e.key)) {
        e.preventDefault()
        keysPressed.current.add(e.key)
        setShowHint(false)
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysPressed.current.delete(e.key)
    }

    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  // Touch and drag handlers (Smooth joystick pulling)
  const handleTouchStart = (e: React.TouchEvent) => {
    physicsRef.current.isDragging = true
    physicsRef.current.dragTargetX = e.touches[0].clientX
    physicsRef.current.dragTargetY = e.touches[0].clientY
    setShowHint(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!physicsRef.current.isDragging) return
    e.preventDefault()
    physicsRef.current.dragTargetX = e.touches[0].clientX
    physicsRef.current.dragTargetY = e.touches[0].clientY
  }

  const handleTouchEnd = () => {
    physicsRef.current.isDragging = false
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    physicsRef.current.isDragging = true
    physicsRef.current.dragTargetX = e.clientX
    physicsRef.current.dragTargetY = e.clientY
    setShowHint(false)

    const onMouseMove = (moveEvent: MouseEvent) => {
      physicsRef.current.dragTargetX = moveEvent.clientX
      physicsRef.current.dragTargetY = moveEvent.clientY
    }

    const onMouseUp = () => {
      physicsRef.current.isDragging = false
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseup", onMouseUp)
    }

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseup", onMouseUp)
  }

  // Hyper-boost launch to top on click
  const scrollToTop = () => {
    if (physicsRef.current.isDragging && Math.hypot(physicsRef.current.vx, physicsRef.current.vy) > 1.5) {
      return
    }
    // Launch impulse upwards
    physicsRef.current.vy = -12
    physicsRef.current.targetRotation = 0
    emitPlasma(physicsRef.current.x, physicsRef.current.y, 0, 2)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!isInitialized) return null

  return (
    <>
      {/* Background canvas for glowing plasma particles */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-45" />

      {showHint && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card/90 backdrop-blur-md border border-border/80 rounded-full px-4 py-2 text-xs sm:text-sm shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-muted-foreground hidden sm:inline">Pilot ship with </span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-0.5 hidden sm:inline-block font-mono">WASD</kbd>
          <span className="text-muted-foreground hidden sm:inline"> or </span>
          <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs mx-0.5 hidden sm:inline-block font-mono">Arrows</kbd>
          <span className="text-muted-foreground sm:hidden">Drag the spaceship to fly</span>
        </motion.div>
      )}

      {/* Spaceship Button */}
      <button
        onClick={scrollToTop}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed z-50 cursor-grab active:cursor-grabbing group touch-none select-none focus:outline-none"
        style={{
          left: `${renderState.x}px`,
          top: `${renderState.y}px`,
          transform: `translate(-50%, -50%) rotate(${renderState.rotation}deg)`,
          transition: "transform 0.04s linear",
        }}
        aria-label="Drag to fly spaceship or click to return to top"
      >
        <svg
          className="w-11 h-15 xs:w-12 xs:h-16 sm:w-14 sm:h-20 drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] filter transition-transform duration-100"
          viewBox="0 0 40 60"
          fill="none"
        >
          {/* Main Hull */}
          <path
            d="M20 4 L29 25 L27 36 L20 33 L13 36 L11 25 Z"
            fill="url(#scrollRocketBody)"
            stroke="var(--primary)"
            strokeWidth="1.2"
          />
          {/* Cabin Windshield */}
          <ellipse cx="20" cy="17" rx="4.5" ry="5.5" fill="var(--primary)" opacity="0.95" />
          <ellipse cx="19" cy="16" rx="2.5" ry="3" fill="#ffffff" opacity="0.5" />
          {/* Left & Right Wings */}
          <path d="M11 25 L4 39 L11 34 Z" fill="var(--primary)" opacity="0.85" />
          <path d="M29 25 L36 39 L29 34 Z" fill="var(--primary)" opacity="0.85" />

          {/* Dynamic Reactive Plasma Thruster Flame */}
          <g
            style={{
              transformOrigin: "20px 35px",
              transform: `scaleY(${renderState.isThrusting ? 1.4 + (renderState.speed / 12) * 0.8 : 1}) scaleX(${
                renderState.isThrusting ? 1.1 : 0.95
              })`,
              transition: "transform 0.08s ease-out",
            }}
          >
            <path d="M14 35 L20 56 L26 35" fill="url(#scrollFlame)" />
            <path d="M16 35 L20 49 L24 35" fill="#FCD34D" opacity="0.9" />
            <path d="M18 35 L20 43 L22 35" fill="#38BDF8" opacity="0.85" />
          </g>

          <defs>
            <linearGradient id="scrollRocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="scrollFlame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        <span className="hidden sm:block absolute left-full ml-3 top-1/2 -translate-y-1/2 px-2.5 py-1 bg-card/90 backdrop-blur-md border border-border/80 rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
          Click to return home
        </span>
      </button>
    </>
  )
}
