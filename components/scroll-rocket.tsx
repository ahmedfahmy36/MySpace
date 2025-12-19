"use client"

import type React from "react"

import { useState, useEffect, useCallback, useRef } from "react"
import { motion } from "framer-motion"

export function ScrollRocket() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [rotation, setRotation] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)
  const [showHint, setShowHint] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const keysPressed = useRef<Set<string>>(new Set())
  const animationRef = useRef<number>()
  const speed = 8

  useEffect(() => {
    setPosition({
      x: window.innerWidth - 60,
      y: window.innerHeight / 2,
    })
    setIsInitialized(true)

    const timeout = setTimeout(() => setShowHint(false), 5000)
    return () => clearTimeout(timeout)
  }, [])

  const handleEdgeScroll = useCallback((newY: number) => {
    const threshold = 50
    const scrollAmount = 100

    if (newY <= threshold && window.scrollY > 0) {
      window.scrollBy({ top: -scrollAmount, behavior: "smooth" })
    } else if (newY >= window.innerHeight - threshold) {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      if (window.scrollY < maxScroll) {
        window.scrollBy({ top: scrollAmount, behavior: "smooth" })
      }
    }
  }, [])

  const updatePosition = useCallback(() => {
    const keys = keysPressed.current
    let dx = 0
    let dy = 0

    if (keys.has("ArrowUp") || keys.has("w") || keys.has("W")) dy -= speed
    if (keys.has("ArrowDown") || keys.has("s") || keys.has("S")) dy += speed
    if (keys.has("ArrowLeft") || keys.has("a") || keys.has("A")) dx -= speed
    if (keys.has("ArrowRight") || keys.has("d") || keys.has("D")) dx += speed

    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      setRotation(angle)

      setPosition((prev) => {
        const newX = Math.max(30, Math.min(window.innerWidth - 30, prev.x + dx))
        const newY = Math.max(30, Math.min(window.innerHeight - 30, prev.y + dy))

        handleEdgeScroll(newY)

        return { x: newX, y: newY }
      })
    }

    animationRef.current = requestAnimationFrame(updatePosition)
  }, [handleEdgeScroll])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't move rocket if user is typing in an input, textarea, or contenteditable
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

    animationRef.current = requestAnimationFrame(updatePosition)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
      window.removeEventListener("keyup", handleKeyUp)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [updatePosition])

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true)
    setShowHint(false)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return
    e.preventDefault()

    const touch = e.touches[0]
    const newX = Math.max(30, Math.min(window.innerWidth - 30, touch.clientX))
    const newY = Math.max(30, Math.min(window.innerHeight - 30, touch.clientY))

    const dx = newX - position.x
    const dy = newY - position.y
    if (dx !== 0 || dy !== 0) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 90
      setRotation(angle)
    }

    setPosition({ x: newX, y: newY })
    handleEdgeScroll(newY)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)
  }

  const scrollToTop = () => {
    if (!isDragging) {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  if (!isInitialized) return null

  return (
    <>
      {showHint && (
        <motion.div
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-card/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs sm:text-sm max-w-[90vw]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-muted-foreground hidden sm:inline">Use </span>
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs mx-0.5 hidden sm:inline-block">Arrows</kbd>
          <span className="text-muted-foreground hidden sm:inline"> or </span>
          <kbd className="px-1 py-0.5 bg-muted rounded text-xs mx-0.5 hidden sm:inline-block">WASD</kbd>
          <span className="text-muted-foreground hidden sm:inline"> to fly</span>
          <span className="text-muted-foreground sm:hidden">Drag the rocket to fly</span>
        </motion.div>
      )}

      <motion.button
        onClick={scrollToTop}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="fixed z-50 cursor-pointer group touch-none"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) rotate(${rotation}deg)`,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Drag to fly or click to scroll to top"
      >
        <svg className="w-10 h-14 xs:w-12 xs:h-16 sm:w-14 sm:h-20 drop-shadow-lg" viewBox="0 0 40 60" fill="none">
          <path
            d="M20 5 L28 25 L26 35 L20 32 L14 35 L12 25 Z"
            fill="url(#scrollRocketBody)"
            stroke="var(--primary)"
            strokeWidth="1"
          />
          <ellipse cx="20" cy="18" rx="4" ry="5" fill="var(--primary)" opacity="0.9" />
          <ellipse cx="19" cy="17" rx="2" ry="2.5" fill="white" opacity="0.4" />
          <path d="M12 25 L5 38 L12 33 Z" fill="var(--primary)" opacity="0.8" />
          <path d="M28 25 L35 38 L28 33 Z" fill="var(--primary)" opacity="0.8" />
          <motion.g
            animate={{
              scaleY: [1, 1.3, 1],
              opacity: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 0.1,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <path d="M14 35 L20 55 L26 35" fill="url(#scrollFlame)" />
            <path d="M16 35 L20 48 L24 35" fill="#FCD34D" opacity="0.8" />
          </motion.g>
          <defs>
            <linearGradient id="scrollRocketBody" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="scrollFlame" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>

        <span className="hidden sm:block absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-card border border-border rounded text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Click to go home
        </span>
      </motion.button>
    </>
  )
}
