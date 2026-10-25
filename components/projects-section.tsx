"use client";

import { useState } from "react";
import { AnimatedSection } from "./animated-section";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, X, CheckCircle2 } from "lucide-react";
import { SectionTitle } from "./planets";

interface Project {
  title: string;
  subtitle?: string;
  description: string;
  technologies: string[];
  features?: string[];
  github?: string;
  live: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "Art Meat & Grill (AMG)",
    subtitle: "Full-Stack Restaurant Platform & Custom CRM",
    description:
      "Developed the complete digital platform for 'Art Meat and Grill (AMG)' from scratch, transforming a static Figma design into a highly dynamic, production-ready web application. Applying Next.js and modern full-stack architecture, engineered both the frontend experience and a robust backend system with custom operations management.",
    technologies: [
      "Next.js",
      "Node.js",
      "Express.js",
      "MongoDB",
      "TypeScript",
      "Tailwind CSS",
      "i18n",
    ],
    features: [
      "Modern Tech Stack: Built from the ground up utilizing Next.js, Node.js, Express.js, and MongoDB.",
      "Advanced Custom CRM: Developed a secure backend dashboard featuring strict authentication and robust data validation to manage the platform's operations.",
      "Built-in Analytics (Tracker System): Integrated a custom tracker system within the CRM dashboard to monitor visitor traffic and log user interactions in real-time.",
      "Full Localization: Implemented seamless multi-language support (English & Arabic) to serve a diverse customer base.",
      "Responsive & Pixel-Perfect: Converted complex Figma UI designs into highly responsive layouts optimized for all devices, ensuring flawless rendering of dynamic menus, galleries, and contact forms.",
      "Rapid Delivery: Successfully completed full-cycle development—from initial codebase setup to live production deployment—in just one week.",
    ],
    github: "#",
    live: "https://artmeat.ae",
    image: "/artmeat.png",
  },
  {
    title: "Starwarsgeek",
    subtitle: "Interactive Star Wars Universe Explorer",
    description:
      "A StarWars movies website that uses SWAPI to display star wars information as characters, films, planets, vehicles, species and spaceships for the fans of star wars universe.",
    technologies: ["React.js", "CSS", "Bootstrap", "JavaScript"],
    features: [
      "SWAPI Integration: Connects to the Star Wars API to query characters, films, starships, vehicles, and planets.",
      "Interactive Exploration: Dedicated views with search and filtering for an immersive fan experience.",
      "Responsive Sci-Fi UI: Clean, responsive layout crafted with React.js, CSS, and Bootstrap.",
    ],
    github: "https://github.com/ahmedfahmy36/Starwarsgeek",
    live: "https://ahmedfahmy36.github.io/Starwarsgeek/",
    image: "/Starwars.png",
  },
  {
    title: "Intrazero",
    subtitle: "Corporate Portal & High-Performance SSR Website",
    description:
      "Developed and maintained the main company website, focusing on a responsive, high-performance user experience with complex UI/UX designs and strong SEO practices using SSR.",
    technologies: ["Next.js", "React", "TypeScript", "SCSS"],
    features: [
      "Next.js & SSR Architecture: Leveraged Server-Side Rendering for fast load times and optimized enterprise SEO.",
      "Complex UI/UX Implementation: Built pixel-perfect, highly responsive layouts with modular SCSS stylesheets.",
      "Production Maintenance: Continuously optimized core web vitals, responsiveness, and cross-browser stability.",
    ],
    github: "#",
    live: "https://www.intrazero.com",
    image: "/intrazero.png",
  },
  {
    title: "Noxe",
    subtitle: "Trending Movies & TV Shows Discovery Platform",
    description:
      "A comprehensive online library of trending movies, series, and actors. Integrates with a live API to fetch updated content and display features like ratings, similar to IMDB.",
    technologies: ["HTML", "CSS", "Bootstrap", "Angular"],
    features: [
      "Real-Time API Integration: Fetches live data for trending movies, series, ratings, and cast members.",
      "Angular SPA Architecture: Structured component-based frontend with reactive state and routing.",
      "Rich Media Catalog: In-depth information pages with ratings, trailers, and responsive media grids.",
    ],
    github: "https://github.com/ahmedfahmy36/Noxe",
    live: "https://ahmedfahmy36.github.io/Noxe/home",
    image: "/noxe.png",
  },
  {
    title: "SVOIMDB",
    subtitle: "TMDB Movie & Series Browser (SPA)",
    description:
      "A dynamic online movie and series library, integrating with the TMDB API to display trending content and ratings. Built as a performant Single-Page Application.",
    technologies: ["React.js", "Tailwind CSS", "Vite"],
    features: [
      "TMDB API Powered: Dynamically pulls and categorizes top-rated, trending, and genre-specific titles.",
      "High Performance SPA: Built with React.js and Vite for instant page transitions and low latency.",
      "Tailwind Modern UI: Sleek dark-mode interface with smooth hover interactions and responsive layouts.",
    ],
    github: "https://github.com/ahmedfahmy36/SVOIMDB",
    live: "https://ahmedfahmy36.github.io/SVOIMDB/",
    image: "/SVOIMDB.png",
  },
  {
    title: "3Brothers",
    subtitle: "Corporate Showcase & Interactive Product Catalog",
    description:
      "Corporate data show site with responsive design and interactive, filterable product catalog. Features asynchronous form submissions and robust sign-in system.",
    technologies: ["HTML", "CSS", "Bootstrap", "JavaScript", "Laravel"],
    features: [
      "Interactive Product Filtering: Dynamic catalog with multi-category search and filtering for product lines.",
      "Laravel Backend Integration: Robust backend handling asynchronous inquiry forms and user authentication.",
      "Responsive Showcase: Corporate-grade data presentation optimized across desktop, tablet, and mobile devices.",
    ],
    github: "#",
    live: "https://www.3-brothers.com/",
    image: "/3brothers.png",
  },
  {
    title: "IAssets",
    subtitle: "Healthcare & Medical Asset Management System",
    description:
      "Built a full-stack assets management system for medical facilities and organizations, featuring advanced dashboards, responsive React UIs, and secure Laravel API integration.",
    technologies: ["React.js", "TypeScript", "Tailwind CSS", "PHP", "Laravel"],
    features: [
      "Asset Lifecycle Tracking: Comprehensive tracking system for medical equipment, allocations, and maintenance.",
      "Role-Based Dashboards: Secure administrative control with multi-tier user authentication and permissions.",
      "React & Laravel Architecture: Modern single-page UI backed by scalable RESTful PHP/Laravel endpoints.",
    ],
    github: "#",
    live: "https://iassets.intrazero.org/",
    image: "/iassets.png",
  },
];

function ProjectModal({
  project,
  onClose,
}: {
  project: Project | null;
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
          <div className="p-4 xs:p-6 sm:p-8">
            <div className="mb-3 sm:mb-4">
              <h3 className="text-xl xs:text-2xl sm:text-3xl font-bold text-white pr-8">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="text-primary text-xs xs:text-sm sm:text-base font-medium mt-1">
                  {project.subtitle}
                </p>
              )}
            </div>

            <p className="text-white/70 text-xs xs:text-sm sm:text-base leading-relaxed mb-5 sm:mb-6">
              {project.description}
            </p>

            {/* Key Features & Highlights */}
            {project.features && project.features.length > 0 && (
              <div className="mb-5 sm:mb-6">
                <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2.5 sm:mb-3">
                  Key Features & Highlights
                </h4>
                <ul className="space-y-2 sm:space-y-2.5">
                  {project.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Technologies */}
            <div className="mb-5 sm:mb-6">
              <h4 className="text-xs uppercase tracking-wider text-white/50 mb-2.5 sm:mb-3">
                Technologies
              </h4>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium"
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
            <div className="flex flex-wrap gap-3 sm:gap-4">
              {project.github && project.github !== "#" && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs xs:text-sm font-medium transition-all hover:scale-105 flex-1 xs:flex-initial"
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
                className="flex items-center justify-center gap-2 px-3.5 py-2 rounded-lg text-xs xs:text-sm font-medium bg-primary text-primary-foreground transition-all hover:scale-105 hover:opacity-90 flex-1 xs:flex-initial"
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
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <>
      <AnimatedSection id="projects">
        <div className="max-w-6xl 2xl:max-w-7xl 3xl:max-w-[105rem] mx-auto">
          <SectionTitle planet="neptune" number="04" title="Projects" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 gap-4 sm:gap-6 2xl:gap-8">
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
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p className="text-xs text-primary/80 font-medium mt-0.5 line-clamp-1">
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-3 shrink-0 ml-2">
                      {project.github && project.github !== "#" && (
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
