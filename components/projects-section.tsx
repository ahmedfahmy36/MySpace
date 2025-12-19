"use client";

import { useState } from "react";
import { AnimatedSection } from "./animated-section";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X } from "lucide-react";
import { SectionTitle } from "./planets";

const projects = [
  {
    title: "Starwarsgeek",
    description:
      "A StarWars movies website that uses SWAPI to display star wars information as characters, films, planets, vehicles, species and spaceships for the fans of star wars universe.",
    technologies: ["React.js", "CSS", "Bootstrap", "JavaScript"],
    github: "https://github.com/ahmedfahmy36/Starwarsgeek",
    live: "https://ahmedfahmy36.github.io/Starwarsgeek/",
    image: "/Starwars.png",
  },
  {
    title: "Intrazero",
    description:
      "Developed and maintained the main company website, focusing on a responsive, high-performance user experience with complex UI/UX designs and strong SEO practices using SSR.",
    technologies: ["Next.js", "React", "TypeScript", "SCSS"],
    github: "#",
    live: "https://www.intrazero.com",
    image: "/intrazero.png",
  },
  {
    title: "Noxe",
    description:
      "A comprehensive online library of trending movies, series, and actors. Integrates with a live API to fetch updated content and display features like ratings, similar to IMDB.",
    technologies: ["HTML", "CSS", "Bootstrap", "Angular"],
    github: "https://github.com/ahmedfahmy36/Noxe",
    live: "https://ahmedfahmy36.github.io/Noxe/home",
    image: "/noxe.png",
  },
  {
    title: "SVOIMDB",
    description:
      "A dynamic online movie and series library, integrating with the TMDB API to display trending content and ratings. Built as a performant Single-Page Application.",
    technologies: ["React.js", "Tailwind CSS", "Vite"],
    github: "https://github.com/ahmedfahmy36/SVOIMDB",
    live: "https://ahmedfahmy36.github.io/SVOIMDB/",
    image: "/SVOIMDB.png",
  },
  {
    title: "3Brothers",
    description:
      "Corporate data show site with responsive design and interactive, filterable product catalog. Features asynchronous form submissions and robust sign-in system.",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "Laravel"],
    github: "#",
    live: "https://www.3-brothers.com/",
    image: "/3brothers.png",
  },
  {
    title: "PortfolioV1.0",
    description:
      "My first data showcase portfolio website built to present my skills, projects, and experience as a developer. Features a clean design and responsive layout.",
    technologies: ["HTML", "CSS", "Tailwind", "JavaScript"],
    github: "https://github.com/ahmedfahmy36/Ahmed-Fahmy",
    live: "https://ahmedfahmy36.github.io/Ahmed-Fahmy/",
    image: "/portfolio.png",
  },
];

function ProjectModal({
  project,
  onClose,
}: {
  project: (typeof projects)[0] | null;
  onClose: () => void;
}) {
  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Glass Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-auto rounded-2xl border border-white/20 shadow-2xl"
          style={{
            background: "rgba(10, 15, 30, 0.7)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 text-white" />
          </button>

          {/* Project Image */}
          <div className="relative w-full aspect-video overflow-hidden rounded-t-2xl">
            <img
              src={project.image || "/placeholder.svg"}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
              {project.title}
            </h3>

            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-6">
              {project.description}
            </p>

            {/* Technologies */}
            <div className="mb-6">
              <h4 className="text-xs uppercase tracking-wider text-white/50 mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium"
                    style={{
                      background: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-4">
              {project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  <Github className="w-4 h-4" />
                  View Code
                </a>
              )}
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground transition-all hover:scale-105 hover:opacity-90"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<
    (typeof projects)[0] | null
  >(null);

  return (
    <>
      <AnimatedSection id="projects">
        <div className="max-w-6xl mx-auto">
          <SectionTitle planet="neptune" number="04" title="Projects" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedProject(project)}
                className="group bg-card rounded-xl border border-border hover:border-primary/50 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer hover:scale-[1.02]"
              >
                {/* Card Header */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <div className="flex gap-3">
                      {project.github !== "#" && (
                        <span className="text-muted-foreground group-hover:text-primary transition-colors">
                          <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                        </span>
                      )}
                      <span className="text-muted-foreground group-hover:text-primary transition-colors">
                        <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
                      </span>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed flex-1 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-auto">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 sm:py-1 bg-secondary text-secondary-foreground rounded text-[10px] sm:text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 sm:py-1 bg-secondary text-secondary-foreground rounded text-[10px] sm:text-xs font-mono">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </>
  );
}
