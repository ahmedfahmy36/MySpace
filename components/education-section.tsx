"use client"

import { AnimatedSection } from "./animated-section"
import { motion } from "framer-motion"

const certifications = ["React Development", "Angular Framework", "Next.js & SSR", "TypeScript"]

export function EducationSection() {
  return (
    <AnimatedSection id="education">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-8 flex items-center gap-4"
        >
          <span className="text-primary font-mono text-lg sm:text-xl">05.</span>
          Expertise
          <span className="h-px bg-border flex-1 ml-4" />
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, index) => (
              <motion.span
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.3 }}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-full text-sm font-medium"
              >
                {cert}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
