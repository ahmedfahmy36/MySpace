"use client"

import type React from "react"

import { AnimatedSection } from "./animated-section"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, Phone } from "lucide-react"
import { SectionTitle } from "./planets"
import { useState } from "react"

export function ContactSection() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // WhatsApp phone number (remove leading 0 and add country code)
    const whatsappNumber = "201122764488" // Egypt country code (20) + your number

    // Format the message
    const whatsappMessage = `*Name:* ${name}%0A*Message:* ${message}`

    // Open WhatsApp with pre-filled message
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank")

    // Reset form
    setName("")
    setMessage("")
  }

  return (
    <AnimatedSection id="contact">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex justify-center mb-8">
          <SectionTitle planet="earth" number="05" title="Get In Touch" />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base"
        >
          I'm currently seeking new opportunities and open to connecting with fellow developers. Feel free to reach out!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12"
        >
          <a
            href="mailto:ahmedfahmy900122@gmail.com"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-4 h-4 text-primary" />
            <span className="text-sm">ahmedfahmy900122@gmail.com</span>
          </a>
          <a
            href="tel:01122764488"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-4 h-4 text-primary" />
            <span className="text-sm">01122764488</span>
          </a>
          {/* <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-4 h-4 text-primary" />
            <span className="text-sm">Egypt</span>
          </div> */}
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="space-y-4 mb-6"
        >
          <div className="text-left">
            <Input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors"
            />
          </div>
          <div className="text-left">
            <Textarea
              placeholder="Your Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={5}
              className="bg-background/50 backdrop-blur-sm border-primary/20 focus:border-primary transition-colors resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="group w-full sm:w-auto">
            Send via WhatsApp
            <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Button>
        </motion.form>
      </div>
    </AnimatedSection>
  )
}
