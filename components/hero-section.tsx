"use client"

import { motion } from "framer-motion"
import { Github, Linkedin, Mail, Phone, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

const letterVariants = {
  hidden: { y: -100, opacity: 0, scale: 1.5 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
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
  const nameWords = [
    { word: "Ahmed", startIndex: 0 },
    { word: "Fahmy", startIndex: 6 },
  ]
  const title = "Front-End Developer"

  return (
    <section className="min-h-screen flex flex-col items-center justify-center relative px-3 xs:px-4 sm:px-6 overflow-hidden">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="text-center relative z-10 w-full max-w-5xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0, duration: 0.6 }}
          className="text-xs xs:text-sm sm:text-base md:text-lg text-muted-foreground mb-1.5 sm:mb-3 tracking-wider uppercase font-mono"
        >
          Hello, I'm
        </motion.p>

        <h1 className="flex flex-wrap justify-center items-center gap-x-3.5 xs:gap-x-5 sm:gap-x-7 md:gap-x-9 mb-3 sm:mb-5">
          {nameWords.map((item) => (
            <span key={item.word} className="inline-flex whitespace-nowrap">
              {item.word.split("").map((letter, idx) => {
                const i = item.startIndex + idx
                return (
                  <motion.span
                    key={idx}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{
                      delay: i * 0.08,
                      duration: 0.6,
                      type: "spring",
                      stiffness: 100,
                      damping: 10,
                    }}
                    className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 2xl:text-[10rem] font-extrabold tracking-tight text-primary inline-block select-none"
                  >
                    {letter}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-base xs:text-lg sm:text-xl md:text-2xl 2xl:text-3xl text-foreground font-semibold mb-3 sm:mb-5 tracking-tight"
        >
          {title}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="text-xs xs:text-sm sm:text-base md:text-lg 2xl:text-xl text-muted-foreground max-w-xs xs:max-w-sm sm:max-w-xl md:max-w-2xl mx-auto mb-6 sm:mb-8 leading-relaxed px-2"
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
            <a href="/Ahmed Mohamed Fahmy.pdf"download target="_blank" rel="noopener noreferrer">
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
