"use client"

import { motion } from "framer-motion"

export function Mars({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <defs>
        <radialGradient id="marsGradientNav" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#e8967a" />
          <stop offset="40%" stopColor="#c44536" />
          <stop offset="100%" stopColor="#5c2018" />
        </radialGradient>
        <radialGradient id="marsShadow" cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#marsGradientNav)" />
      {/* Dark regions */}
      <ellipse cx="35" cy="42" rx="12" ry="10" fill="#5c2018" opacity="0.5" />
      <ellipse cx="62" cy="55" rx="10" ry="8" fill="#5c2018" opacity="0.4" />
      <ellipse cx="50" cy="68" rx="8" ry="5" fill="#5c2018" opacity="0.35" />
      {/* Polar cap */}
      <ellipse cx="50" cy="12" rx="18" ry="6" fill="#fff" opacity="0.7" />
      {/* Olympus Mons */}
      <circle cx="65" cy="38" r="5" fill="#e8967a" opacity="0.6" />
      {/* Shadow */}
      <circle cx="50" cy="50" r="45" fill="url(#marsShadow)" />
    </motion.svg>
  )
}

export function Saturn({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size * 0.7}
      viewBox="0 0 140 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <defs>
        <radialGradient id="saturnGradientNav" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#f5e6c8" />
          <stop offset="50%" stopColor="#dab86f" />
          <stop offset="100%" stopColor="#8b6914" />
        </radialGradient>
        <radialGradient id="saturnShadow" cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.4" />
        </radialGradient>
      </defs>
      {/* Rings behind */}
      <ellipse cx="70" cy="50" rx="60" ry="12" fill="none" stroke="#8b6914" strokeWidth="3" opacity="0.3" />
      <ellipse cx="70" cy="50" rx="55" ry="10" fill="none" stroke="#a67c52" strokeWidth="5" opacity="0.4" />
      <ellipse cx="70" cy="50" rx="48" ry="7" fill="none" stroke="#c4a35a" strokeWidth="4" opacity="0.5" />
      {/* Planet */}
      <circle cx="70" cy="50" r="30" fill="url(#saturnGradientNav)" />
      {/* Bands */}
      <ellipse cx="70" cy="38" rx="28" ry="3" fill="#c4a35a" opacity="0.4" />
      <ellipse cx="70" cy="50" rx="29" ry="4" fill="#f5e6c8" opacity="0.3" />
      <ellipse cx="70" cy="62" rx="27" ry="3" fill="#a67c52" opacity="0.4" />
      {/* Shadow */}
      <circle cx="70" cy="50" r="30" fill="url(#saturnShadow)" />
      {/* Rings in front */}
      <path d="M 10 50 Q 40 45 70 50" fill="none" stroke="#c4a35a" strokeWidth="4" opacity="0.5" />
      <path d="M 15 50 Q 42 46 70 50" fill="none" stroke="#a67c52" strokeWidth="5" opacity="0.4" />
      <path d="M 22 50 Q 45 47 70 50" fill="none" stroke="#8b6914" strokeWidth="3" opacity="0.3" />
    </motion.svg>
  )
}

export function Neptune({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 30, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <defs>
        <radialGradient id="neptuneGradientNav" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#7b9fe8" />
          <stop offset="50%" stopColor="#4361c2" />
          <stop offset="100%" stopColor="#1e3570" />
        </radialGradient>
        <radialGradient id="neptuneShadow" cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#neptuneGradientNav)" />
      {/* Atmospheric bands */}
      <ellipse cx="50" cy="35" rx="38" ry="5" fill="#7b9fe8" opacity="0.4" />
      <ellipse cx="50" cy="50" rx="42" ry="4" fill="#2d4a9e" opacity="0.5" />
      <ellipse cx="50" cy="65" rx="36" ry="5" fill="#7b9fe8" opacity="0.35" />
      {/* Great Dark Spot */}
      <ellipse cx="35" cy="48" rx="10" ry="7" fill="#1e3570" opacity="0.6" />
      {/* Bright clouds */}
      <ellipse cx="42" cy="42" rx="6" ry="2" fill="#b5d4ff" opacity="0.5" />
      <ellipse cx="60" cy="58" rx="5" ry="2" fill="#b5d4ff" opacity="0.4" />
      {/* Shadow */}
      <circle cx="50" cy="50" r="45" fill="url(#neptuneShadow)" />
    </motion.svg>
  )
}

export function Earth({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <defs>
        <radialGradient id="earthGradientNav" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#6b93d6" />
          <stop offset="50%" stopColor="#4a7ab8" />
          <stop offset="100%" stopColor="#1e3a5f" />
        </radialGradient>
        <radialGradient id="earthShadow" cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#earthGradientNav)" />
      {/* Continents */}
      <path d="M25 35 Q38 28 48 38 Q45 52 32 55 Q22 48 25 35" fill="#228b22" opacity="0.85" />
      <path d="M52 25 Q68 28 72 42 Q68 52 58 50 Q50 38 52 25" fill="#228b22" opacity="0.8" />
      <path d="M55 55 Q70 58 75 72 Q65 78 52 72 Q53 62 55 55" fill="#228b22" opacity="0.75" />
      <path d="M30 60 Q40 58 45 68 Q38 75 28 70 Q28 65 30 60" fill="#228b22" opacity="0.7" />
      {/* Ice caps */}
      <ellipse cx="50" cy="10" rx="22" ry="8" fill="#fff" opacity="0.8" />
      <ellipse cx="50" cy="90" rx="18" ry="6" fill="#fff" opacity="0.7" />
      {/* Clouds */}
      <ellipse cx="38" cy="40" rx="12" ry="3" fill="#fff" opacity="0.5" transform="rotate(-15 38 40)" />
      <ellipse cx="62" cy="55" rx="10" ry="2.5" fill="#fff" opacity="0.45" transform="rotate(20 62 55)" />
      <ellipse cx="45" cy="70" rx="8" ry="2" fill="#fff" opacity="0.4" transform="rotate(-10 45 70)" />
      {/* Shadow */}
      <circle cx="50" cy="50" r="45" fill="url(#earthShadow)" />
    </motion.svg>
  )
}

export function Jupiter({ size = 24, className = "" }: { size?: number; className?: string }) {
  return (
    <motion.svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={className}
      animate={{ rotate: 360 }}
      transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
    >
      <defs>
        <radialGradient id="jupiterGradientNav" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#f4d8b8" />
          <stop offset="50%" stopColor="#d4a574" />
          <stop offset="100%" stopColor="#a67c52" />
        </radialGradient>
        <radialGradient id="jupiterShadow" cx="70%" cy="70%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="100%" stopColor="#000" stopOpacity="0.5" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="45" fill="url(#jupiterGradientNav)" />
      {/* Cloud bands */}
      <ellipse cx="50" cy="25" rx="42" ry="4" fill="#c4916f" opacity="0.6" />
      <ellipse cx="50" cy="35" rx="44" ry="3" fill="#f4d8b8" opacity="0.5" />
      <ellipse cx="50" cy="45" rx="43" ry="4" fill="#b8845f" opacity="0.7" />
      <ellipse cx="50" cy="55" rx="44" ry="3" fill="#d4a574" opacity="0.5" />
      <ellipse cx="50" cy="65" rx="42" ry="4" fill="#c4916f" opacity="0.6" />
      <ellipse cx="50" cy="75" rx="40" ry="3" fill="#b8845f" opacity="0.5" />
      {/* Great Red Spot */}
      <ellipse cx="65" cy="58" rx="10" ry="7" fill="#d4775f" opacity="0.8" />
      <ellipse cx="65" cy="58" rx="7" ry="5" fill="#e88870" opacity="0.6" />
      {/* Turbulence swirls */}
      <path d="M 30 40 Q 35 38 38 42" fill="none" stroke="#c4916f" strokeWidth="1.5" opacity="0.4" />
      <path d="M 70 48 Q 75 46 78 50" fill="none" stroke="#b8845f" strokeWidth="1.5" opacity="0.4" />
      {/* Shadow */}
      <circle cx="50" cy="50" r="45" fill="url(#jupiterShadow)" />
    </motion.svg>
  )
}

export function SectionTitle({
  planet,
  number,
  title,
}: {
  planet: "mars" | "saturn" | "neptune" | "earth" | "jupiter"
  number: string
  title: string
}) {
  const PlanetComponent = {
    mars: Mars,
    saturn: Saturn,
    neptune: Neptune,
    earth: Earth,
    jupiter: Jupiter,
  }[planet]

  return (
    <motion.h2
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-3 sm:gap-4"
    >
      <PlanetComponent size={36} className="shrink-0" />
      <span className="text-primary font-mono text-base sm:text-xl">{number}.</span>
      {title}
      <span className="h-px bg-border flex-1 ml-2 sm:ml-4" />
    </motion.h2>
  )
}
