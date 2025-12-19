"use client"

import { AnimatedSection } from "./animated-section"
import { motion } from "framer-motion"
import { SectionTitle } from "./planets"

export function AboutSection() {
  return (
    <AnimatedSection id="about">
      <div className="max-w-4xl mx-auto">
        <SectionTitle planet="mars" number="01" title="About Me" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="space-y-4 leading-relaxed text-sm sm:text-base text-foreground/90"
        >
          <p>
            Frontend Developer specializing in React, Angular and modern JavaScript frameworks with strong skills in
            clean architecture, state management, and responsive UI. Experienced in building scalable web apps with
            robust code structures and seamless API integrations.
          </p>
          <p>
            Passionate about clean code, user experience, and learning cutting-edge technologies. Proven ability to
            deliver production-grade projects in both corporate and freelance environments.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  )
}
