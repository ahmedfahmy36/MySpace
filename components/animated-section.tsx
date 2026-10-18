"use client"

import { motion } from "framer-motion"
import type { ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  id: string
  className?: string
}

export function AnimatedSection({ children, id, className = "" }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`py-16 sm:py-24 2xl:py-32 px-4 sm:px-6 2xl:px-12 overflow-x-clip ${className}`}
    >
      {children}
    </motion.section>
  )
}
