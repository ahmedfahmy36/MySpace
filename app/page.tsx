"use client"

import { useState } from "react"
import { StarBackground } from "@/components/star-background"
import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsSection } from "@/components/projects-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { ScrollRocket } from "@/components/scroll-rocket"
import { Preloader } from "@/components/preloader"
import { ExperienceSection } from "@/components/experience-section"

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}

      <main className="relative min-h-screen">
        <StarBackground />
        <Navigation />
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ExperienceSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        {!isLoading && <ScrollRocket />}
      </main>
    </>
  )
}
