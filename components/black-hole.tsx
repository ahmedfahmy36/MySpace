"use client";

import { motion } from "framer-motion";

export function BlackHole({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center select-none pointer-events-none w-full max-w-[min(90vw,460px)] aspect-square ${className}`}
    >
      {/* 1. Deep Gravitational Lensing Halo (Far Outer Ambient Glow) */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          scale: [0.95, 1.06, 0.95],
          opacity: [0.45, 0.7, 0.45],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          background:
            "radial-gradient(circle at center, rgba(245,158,11,0.3) 0%, rgba(234,88,12,0.2) 30%, rgba(147,51,234,0.12) 55%, transparent 75%)",
          filter: "blur(28px)",
        }}
      />

      {/* 2. Outer Gravitational Light Wave (Subtle Expansion Pulse) */}
      <motion.div
        className="absolute w-[92%] h-[92%] rounded-full border border-amber-500/20"
        animate={{
          scale: [1, 1.04, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{
          boxShadow: "0 0 35px rgba(245,158,11,0.25), inset 0 0 35px rgba(245,158,11,0.15)",
        }}
      />

      {/* 3. Swirling Relativistic Matter Vortex (Circular Accretion Swirl - No Horizontal Tilt) */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 24, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute w-[82%] h-[82%] rounded-full"
        style={{
          background:
            "conic-gradient(from 0deg at 50% 50%, rgba(254,240,138,0.9) 0deg, rgba(251,191,36,0.75) 75deg, rgba(239,68,68,0.4) 160deg, rgba(168,85,247,0.18) 230deg, rgba(245,158,11,0.65) 310deg, rgba(254,240,138,0.9) 360deg)",
          boxShadow:
            "0 0 50px rgba(245,158,11,0.65), 0 0 80px rgba(239,68,68,0.3), inset 0 0 30px rgba(254,240,138,0.6)",
          filter: "blur(3px)",
        }}
      />

      {/* 4. Counter-Rotating Inner Hot Plasma Ring (Adds Deep Fluid Turbulence) */}
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        className="absolute w-[68%] h-[68%] rounded-full"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.95) 0deg, rgba(254,215,170,0.85) 60deg, rgba(249,115,22,0.45) 150deg, rgba(251,191,36,0.75) 280deg, rgba(255,255,255,0.95) 360deg)",
          boxShadow:
            "0 0 35px rgba(255,255,255,0.8), inset 0 0 25px rgba(254,240,138,0.8)",
          filter: "blur(2px)",
        }}
      />

      {/* 5. Razor-Thin Photon Sphere (Bright Glowing Relativistic Boundary Ring) */}
      <div
        className="absolute w-[52%] h-[52%] rounded-full border-2 border-amber-100"
        style={{
          boxShadow:
            "0 0 20px #ffffff, 0 0 40px #fbbf24, 0 0 70px #f97316, inset 0 0 20px #fef08a",
        }}
      />

      {/* 6. Pure Black Event Horizon Singularity (Spherical Dark Core) */}
      <div
        className="relative z-10 w-[48%] h-[48%] rounded-full bg-black flex items-center justify-center shadow-2xl"
        style={{
          boxShadow:
            "inset 0 0 35px rgba(0,0,0,1), 0 0 25px rgba(0,0,0,0.98)",
        }}
      >
        {/* Core Event Horizon Void */}
        <div className="w-[90%] h-[90%] rounded-full bg-black shadow-[inset_0_0_25px_#000000]" />
      </div>
    </div>
  );
}
