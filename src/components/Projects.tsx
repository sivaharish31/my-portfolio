import { motion } from "motion/react";
import { CheckCircle2, Layers, Compass, ArrowUpRight, Clock, Bell, Radio, Database } from "lucide-react";
import { GitHubIcon } from "./icons";
import { projects, type Project } from "../data/portfolio";

function ContestCompassShowcase({ project }: { project: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-3xl border border-slate-200/90 bg-white shadow-lg overflow-hidden p-6 sm:p-8 lg:p-10"
    >
      <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Left Column: Project Details & Features (7 cols) */}
        <div className="lg:col-span-7 space-y-5">
          {/* Header Badges */}
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-blue-50 text-blue-700 border border-blue-200">
              Featured Flagship Project
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
              {project.projectType}
            </span>
          </div>

          <div>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              {project.name}
            </h3>
            <p className="text-sm sm:text-base font-semibold text-blue-600 mt-1">
              {project.tagline}
            </p>
          </div>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Architecture Card */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 shadow-2xs">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              <Layers className="w-4 h-4 text-blue-600" />
              <span>System Architecture</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-mono-code">
              {project.architecture}
            </p>
          </div>

          {/* Implemented Features Grid */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
              Key Implemented Features
            </h4>
            <div className="grid sm:grid-cols-2 gap-2">
              {project.features.map((feat) => (
                <div
                  key={feat}
                  className="flex items-start gap-2 text-xs text-slate-700 bg-slate-50/80 p-2 rounded-xl border border-slate-200/60"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-blue-600 flex-shrink-0" />
                  <span className="font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Pills */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-xl text-xs font-bold bg-slate-100 text-slate-800 border border-slate-200 shadow-2xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-3 border-t border-slate-100">
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold shadow-md hover:shadow-lg transition-all cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <GitHubIcon className="w-4 h-4" />
              <span>View Repository on GitHub</span>
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </motion.a>
          </div>
        </div>

        {/* Right Column: Interactive Product Presentation (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div className="rounded-2xl glass-panel p-5 border border-slate-300 shadow-md bg-slate-50/70 space-y-3.5">
            
            {/* App Mockup Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white shadow-xs border border-slate-200 p-1.5 flex items-center justify-center">
                  <img
                    src="/contest-compass-logo.png"
                    alt="Contest Compass"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 leading-tight">
                    Contest Compass
                  </h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    <span>Sync Active</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white text-slate-700 font-semibold border border-slate-200">
                Live Feed
              </span>
            </div>

            {/* Simulated Live Contest Feed */}
            <div className="space-y-2.5">
              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Codeforces Round #980
                  </span>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded font-bold border border-blue-200">
                    Div. 2
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> Starts in 2h 15m
                  </span>
                  <span className="flex items-center gap-1 text-slate-700 font-medium">
                    <Bell className="w-3 h-3 text-blue-500" /> Reminder Set
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    LeetCode Weekly Contest 420
                  </span>
                  <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-bold border border-amber-200">
                    Rated
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> Sunday 8:00 AM
                  </span>
                  <span className="text-emerald-700 text-[10px] font-bold">
                    ✓ Synchronized
                  </span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-white border border-slate-200 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    AtCoder Beginner Contest 375
                  </span>
                  <span className="text-[10px] font-mono text-purple-700 bg-purple-50 px-2 py-0.5 rounded font-bold border border-purple-200">
                    ABC
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 mt-2">
                  <span className="flex items-center gap-1 font-mono">
                    <Clock className="w-3 h-3 text-slate-400" /> Saturday 5:30 PM
                  </span>
                  <span className="text-slate-500 text-[10px] font-medium">Saved</span>
                </div>
              </div>
            </div>

            {/* Architecture Indicators */}
            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-600 font-mono border-t border-slate-200">
              <span className="flex items-center gap-1">
                <Database className="w-3 h-3 text-emerald-600" /> MySQL 8.0
              </span>
              <span className="text-blue-700 font-bold">REST API 200 OK</span>
            </div>
          </div>
        </div>

      </div>
    </motion.div>
  );
}

export function Projects() {
  return (
    <section
      id="projects"
      className="py-20 md:py-24 bg-slate-50/70 relative overflow-hidden border-t border-slate-200/60"
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>Featured Project</span>
          </div>

          <h2
            id="projects-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3"
          >
            Things I've built.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
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
