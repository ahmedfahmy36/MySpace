"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const letterVariants = {
  hidden: { y: -100, opacity: 0, scale: 1.5 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      type: "spring",
      stiffness: 100,
      damping: 10,
    },
  }),
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3,
    },
  },
}

export function HeroSection() {
  const name = "Ahmed Fahmy"
  const title = "Front-End Developer"

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-4 sm:px-6 overflow-hidden">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center relative z-10">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.6 }}
          className="text-base sm:text-lg text-muted-foreground mb-2"
        >
          Hello, I'm
        </motion.p>

        <div className="flex justify-center flex-wrap mb-3 sm:mb-4">
          {name.split("").map((letter, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={letterVariants}
              className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-primary"
              style={{ display: "inline-block" }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl text-foreground font-medium mb-4 sm:mb-6"
        >
          {title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-sm sm:text-base text-muted-foreground max-w-xs sm:max-w-md md:max-w-lg mx-auto mb-6 sm:mb-8 leading-relaxed px-2"
        >
          A dedicated Front-End Developer specializing in building beautiful and functional web applications.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="flex items-center justify-center gap-4 sm:gap-6 mb-6"
        >
          <a
            href="https://github.com/ahmedfahmy36"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="https://www.linkedin.com/in/ahmed-mohamed-6956b9195"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="mailto:ahmedfahmy900122@gmail.com"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="Email"
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
          <a
            href="tel:01122764488"
            className="text-muted-foreground hover:text-primary transition-colors p-2"
            aria-label="Phone"
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
        >
          <Button asChild size="lg" className="group">
            <a href="/Ahmed_Fahmy_CV.pdf" download>
              <Download className="w-4 h-4 mr-2" />
              Download My CV
            </a>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-6 sm:bottom-8"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-muted-foreground rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-2 sm:w-1.5 sm:h-3 bg-primary rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
