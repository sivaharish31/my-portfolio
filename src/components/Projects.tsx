import { useRef } from "react";
import { motion } from "motion/react";
import { CheckCircle2, Layers, Compass, ArrowUpRight, Clock, Bell, Radio, Database } from "lucide-react";
import { GitHubIcon, TechnologyIcon } from "./icons";
import { projects, type Project } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { gsap } from "../lib/animations";
import { MaskedHeading, SpotlightCard, Magnetic } from "./MotionPrimitives";

function ContestCompassShowcase({ project }: { project: Project }) {
  return (
    <SpotlightCard
      spotlightColor="rgba(59, 130, 246, 0.16)"
      tiltStrength={3.5}
      className="rounded-3xl"
    >
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="rounded-3xl border border-slate-200/90 dark:border-slate-800 hover:border-blue-300/80 dark:hover:border-blue-700/70 bg-white dark:bg-slate-900/90 shadow-lg hover:shadow-2xl overflow-hidden p-4 sm:p-8 lg:p-10 min-w-0 w-full transition-all duration-300"
      >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start min-w-0 w-full">
        
        {/* Left Column: Project Details & Features (7 cols) */}
        <div className="lg:col-span-7 space-y-5 min-w-0 w-full">
          {/* Header Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/70">
              Featured Flagship Project
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
              {project.projectType}
            </span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {project.name}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Architecture Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
              <Layers className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span>System Architecture</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-mono-code">
              {project.architecture}
            </p>
          </div>

          {/* Implemented Features Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2.5">
              Key Implemented Features
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 bg-slate-50/80 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700/60"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  <TechnologyIcon name={tech} className="w-3.5 h-3.5 shrink-0" />
                  <span>{tech}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
            <Magnetic strength={0.22}>
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer group"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <GitHubIcon className="w-4 h-4" />
                <span>View Repository on GitHub</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </motion.a>
            </Magnetic>
          </div>
        </div>

        {/* Right Column: Interactive Product Presentation (5 cols) */}
        <div className="lg:col-span-5 relative min-w-0 w-full">
          <div className="rounded-2xl glass-panel p-5 border border-slate-300 dark:border-slate-700/80 shadow-md bg-slate-50/70 dark:bg-slate-900/80 space-y-3.5">
            
            {/* App Mockup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-xs border border-slate-200 dark:border-slate-700 p-1.5 flex items-center justify-center">
                  <img
                    src="/contest-compass-logo.png"
                    alt="Contest Compass logo"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Contest Compass
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    <span>Sync Active</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                Live Feed
              </span>
            </div>

            {/* Simulated Live Contest Feed */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    Codeforces Round #980
                  </span>
                  <span className="text-[10px] font-mono text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded font-bold border border-blue-200 dark:border-blue-800/70">
                    Div. 2
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" /> Starts in 2h 15m
                  </span>
                  <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-medium">
                    <Bell className="w-3 h-3 text-blue-500" /> Reminder Set
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    LeetCode Weekly Contest 420
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 px-2 py-0.5 rounded font-bold border border-amber-200 dark:border-amber-800/70">
                    Rated
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" /> Sunday 8:00 AM
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
                    ✓ Synchronized
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700/80 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    AtCoder Beginner Contest 375
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-2 py-0.5 rounded font-bold border border-purple-200 dark:border-purple-800/70">
                    ABC
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] text-slate-500 dark:text-slate-400 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400 dark:text-slate-500" /> Saturday 5:30 PM
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 text-[10px] font-medium">Saved</span>
                </div>
              </div>
            </div>

            {/* Architecture Indicators */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400 font-mono border-t border-slate-200 dark:border-slate-800">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-600 dark:text-emerald-400" /> MySQL 8.0
              </span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">REST API 200 OK</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
    </SpotlightCard>
  );
}

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, () => {
    gsap.fromTo(
      ".projects-watermark",
      { x: 40 },
      {
        x: -40,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      }
    );
  });

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-slate-50/70 dark:bg-slate-950/60 relative overflow-hidden border-t border-slate-200/60 dark:border-slate-800/80"
      aria-labelledby="projects-heading"
    >
      {/* Editorial Parallax Watermark */}
      <div
        className="projects-watermark block absolute top-6 sm:top-8 lg:top-10 right-0 text-[3.25rem] sm:text-[5.5rem] lg:text-[8rem] font-black tracking-tighter text-slate-900/[0.065] dark:text-white/[0.03] select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        03 // PROJECTS
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Featured Project</span>
          </div>

          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3"
          >
            <MaskedHeading>Things I've built.</MaskedHeading>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            Full-stack software engineering with focus on robust backend logic, database persistence, and multi-platform data synchronization.
          </p>
        </motion.div>

        {/* Project Showcase */}
        {projects.map((project) => (
          <ContestCompassShowcase key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
