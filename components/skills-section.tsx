"use client"

import { AnimatedSection } from "./animated-section"
import { motion } from "framer-motion"
import { useState } from "react"
import { SectionTitle } from "./planets"

const skills = [
  { name: "HTML5", color: "#e34f26", icon: "H5" },
  { name: "CSS3", color: "#1572b6", icon: "C3" },
  { name: "JavaScript", color: "#f7df1e", icon: "JS" },
  { name: "TypeScript", color: "#3178c6", icon: "TS" },
  { name: "React", color: "#61dafb", icon: "⚛" },
  { name: "Angular", color: "#dd0031", icon: "Ng" },
  { name: "Next.js", color: "#ffffff", icon: "N" },
  { name: "Bootstrap", color: "#7952b3", icon: "B" },
  { name: "Tailwind", color: "#06b6d4", icon: "≋" },
  { name: "SCSS", color: "#cc6699", icon: "S" },
  { name: "Git", color: "#f05032", icon: "⌥" },
  { name: "Vite", color: "#646cff", icon: "⚡" },
]

function SkillCube({ skill, index }: { skill: (typeof skills)[0]; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
      className="flex flex-col items-center gap-2 sm:gap-3"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      <div
        className="relative w-14 h-14 xs:w-16 xs:h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 cursor-pointer"
        style={{ perspective: "200px" }}
      >
        <motion.div
          className="w-full h-full relative"
          animate={{ rotateY: isHovered ? 180 : 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Front face - Icon */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl border border-border/50 shadow-lg"
            style={{
              backfaceVisibility: "hidden",
              background: `linear-gradient(135deg, ${skill.color}20 0%, ${skill.color}10 100%)`,
              boxShadow: `0 0 15px ${skill.color}25, inset 0 0 15px ${skill.color}08`,
            }}
          >
            <span className="text-lg xs:text-xl sm:text-2xl font-bold" style={{ color: skill.color }}>
              {skill.icon}
            </span>
          </div>

          {/* Back face - Name */}
          <div
            className="absolute inset-0 flex items-center justify-center rounded-lg sm:rounded-xl border border-border/50"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: `linear-gradient(135deg, ${skill.color}40 0%, ${skill.color}20 100%)`,
              boxShadow: `0 0 20px ${skill.color}40`,
            }}
          >
            <span
              className="text-[10px] xs:text-xs sm:text-sm font-bold text-center px-1 leading-tight"
              style={{ color: skill.color }}
            >
              {skill.name}
            </span>
          </div>
        </motion.div>
      </div>

      <span className="text-[10px] xs:text-xs text-muted-foreground sm:hidden text-center">{skill.name}</span>
    </motion.div>
  )
}

export function SkillsSection() {
  return (
    <AnimatedSection id="skills">
      <div className="max-w-4xl mx-auto px-2 sm:px-0">
        <SectionTitle planet="saturn" number="02" title="Skills" />

        <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-4 md:grid-cols-6 gap-4 xs:gap-5 sm:gap-6 md:gap-8 justify-items-center">
          {skills.map((skill, index) => (
            <SkillCube key={skill.name} skill={skill} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center text-muted-foreground mt-8 sm:mt-10 text-xs sm:text-sm hidden sm:block"
        >
          Hover over the cubes to reveal skill names
        </motion.p>
      </div>
    </AnimatedSection>
  )
}
