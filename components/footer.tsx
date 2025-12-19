"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone } from "lucide-react"

export function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="py-8 sm:py-12 px-4 sm:px-6 border-t border-border"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-4">
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/ahmedfahmy36"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-mohamed-6956b9195"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5" />
          </a>
          <a
            href="mailto:ahmedfahmy900122@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Email"
          >
            <Mail className="w-5 h-5" />
          </a>
          <a
            href="tel:01122764488"
            className="text-muted-foreground hover:text-primary transition-colors"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5" />
          </a>
        </div>
        <p className="text-sm text-muted-foreground font-mono text-center">Designed & Built by Ahmed Fahmy</p>
        <p className="text-xs text-muted-foreground">© 2025 All rights reserved.</p>
      </div>
    </motion.footer>
  )
}
