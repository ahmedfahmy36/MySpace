"use client"

import { AnimatedSection } from "./animated-section"
import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin } from "lucide-react"
import { SectionTitle } from "./planets"

const experiences = [
  {
    title: "Front-End Developer",
    company: "Intrazero",
    location: "Egypt",
    period: "May 2024 - Present",
    type: "Full-time",
    responsibilities: [
      "Developed and maintained the company's core website using React, Next.js, and SCSS, ensuring optimal performance, responsiveness, and accessibility.",
      "Improved legacy codebases by fixing bugs, refactoring UI components, and aligning UX with modern standards.",
      "Collaborated with design and backend teams to integrate APIs and boost SEO using SSR and optimized routing.",
    ],
  },
 
]

export function ExperienceSection() {
  return (
    <AnimatedSection id="experience">
      <div className="max-w-4xl mx-auto">
        <SectionTitle planet="jupiter" number="03" title="Experience" />

        <div className="space-y-6 sm:space-y-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.5 }}
              className="bg-card p-4 sm:p-6 rounded-xl border border-border hover:border-primary/50 transition-colors"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 mb-4">
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-primary">{exp.title}</h3>
                  <p className="text-foreground font-medium">{exp.company}</p>
                </div>
                <div className="flex flex-col gap-1 text-xs sm:text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                    {exp.period}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 sm:w-4 sm:h-4" />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4" />
                    {exp.type}
                  </span>
                </div>
              </div>
              <ul className="space-y-2">
                {exp.responsibilities.map((resp, i) => (
                  <li key={i} className="text-muted-foreground text-xs sm:text-sm flex gap-2">
                    <span className="text-primary mt-1">▹</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}
