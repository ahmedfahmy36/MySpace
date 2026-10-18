"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  alpha: number;
  vx: number;
  vy: number;
  color: string;
}

export function CosmicCursor() {
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isHoveringInteractive, setIsHoveringInteractive] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const particlesRef = useRef<Particle[]>([]);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particleIdRef = useRef(0);

  useEffect(() => {
    // Only enable on desktop pointer devices
    if (window.matchMedia("(pointer: fine)").matches) {
      setIsTouchDevice(false);
    } else {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const colors = ["#38bdf8", "#818cf8", "#c084fc", "#f472b6", "#fbbf24"];

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Spawn stardust particles
      if (Math.random() > 0.4) {
        particlesRef.current.push({
          id: particleIdRef.current++,
          x: e.clientX + (Math.random() - 0.5) * 8,
          y: e.clientY + (Math.random() - 0.5) * 8,
          size: Math.random() * 2 + 1,
          alpha: 0.9,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 + 0.3, // gently sink
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }

      // Check if hovering over interactive element
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.classList.contains("cursor-pointer") ||
          target.getAttribute("role") === "button")
      ) {
        setIsHoveringInteractive(true);
      } else {
        setIsHoveringInteractive(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Render loop for stardust canvas
    let animationId: number;
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.02;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Orbiting Ring / Gravitational Well Cursor */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        animate={{
          x: mousePos.x,
          y: mousePos.y,
          scale: isHoveringInteractive ? 1.6 : 1,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 450, mass: 0.2 }}
      >
        {/* Core Photon */}
        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] mx-auto my-auto" />

        {/* Orbiting Gravitational Ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: isHoveringInteractive ? 2 : 6, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border transition-all duration-300 ${
            isHoveringInteractive
              ? "w-10 h-10 border-primary/60 border-dashed"
              : "w-6 h-6 border-white/20"
          }`}
        >
          {/* Micro-moon satellite */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#22d3ee]" />
        </motion.div>
      </motion.div>
    </div>
  );
}
