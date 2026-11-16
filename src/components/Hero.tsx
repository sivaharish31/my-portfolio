import { useState } from "react";
import { motion } from "motion/react";
import { ArrowDown, Mail, ChevronRight, Terminal, ShieldCheck, Flame } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodolioIcon } from "./icons";
import { config } from "../data/portfolio";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export function Hero() {
  const [activeCodeTab, setActiveCodeTab] = useState<"contest" | "errorProne">("contest");

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] flex flex-col justify-center overflow-hidden bg-gradient-to-b from-white via-slate-50/60 to-white dark:from-slate-950 dark:via-slate-900/60 dark:to-slate-950 pt-24 pb-12 md:py-20"
      aria-label="Introduction"
    >
      {/* Background Atmosphere & Radial Glows */}
      <div
        className="absolute inset-0 bg-subtle-grid opacity-50 pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[450px] ambient-glow-blue blur-3xl pointer-events-none opacity-70"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/3 right-10 w-[500px] h-[500px] ambient-glow-purple blur-3xl pointer-events-none opacity-50"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-6 left-10 w-[400px] h-[350px] ambient-glow-cyan blur-3xl pointer-events-none opacity-40"
        aria-hidden="true"
      />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 w-full min-w-0">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-8 items-center min-w-0">
          
          {/* Left Column: Personal Brand & Intro (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 max-w-2xl min-w-0 w-full"
          >
            {/* Status Pill */}
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/70 dark:border-blue-800/70 shadow-2xs max-w-full">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600 dark:bg-blue-400" />
                </span>
                <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-blue-900 dark:text-blue-300 uppercase leading-snug">
                  Engineering Student · Open-Source Contributor
                </span>
              </div>
            </div>

            {/* Expressive Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-[2rem] sm:text-5xl lg:text-[3.75rem] font-extrabold text-slate-900 dark:text-white leading-[1.12] tracking-tight mb-5 break-words"
            >
              Building software{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400 inline-block">
                that solves
              </span>{" "}
              real problems.
            </motion.h1>

            {/* Introduction Paragraph */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-base sm:text-lg text-slate-700 dark:text-slate-300 leading-relaxed mb-3 break-words"
            >
              Hi, I'm <strong className="text-slate-950 dark:text-white font-bold">Sivaharish</strong> — a Computer Science & Engineering student at{" "}
              <span className="text-slate-900 dark:text-slate-200 font-semibold">St. Joseph's College of Engineering</span>, Chennai (Class of 2029).
            </motion.p>

            {/* Supporting Context */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed mb-7 max-w-xl break-words"
            >
              Aspiring Software Development Engineer focused on Java programming, data structures & algorithms, and practical backend architecture with verified code contributions to established open-source projects.
            </motion.p>

            {/* Action Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3.5 mb-7"
            >
              <motion.button
                onClick={() => scrollTo("projects")}
                className="inline-flex items-center gap-2 px-5 sm:px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Explore My Work</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>

            {/* Social Profile Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="flex flex-wrap items-center gap-2 pt-5 border-t border-slate-200/80 dark:border-slate-800"
            >
              <a
                href={config.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <GitHubIcon className="w-3.5 h-3.5 shrink-0" />
                <span>GitHub</span>
              </a>

              <a
                href={config.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <LinkedInIcon className="w-3.5 h-3.5 shrink-0" />
                <span>LinkedIn</span>
              </a>

              <a
                href={config.codolio}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <CodolioIcon className="w-3.5 h-3.5 shrink-0" />
                <span>Codolio</span>
              </a>

              <a
                href={`mailto:${config.email}`}
                className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 hover:text-slate-950 dark:hover:text-white border border-transparent dark:border-slate-800 transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 max-w-full truncate"
              >
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{config.email}</span>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column: Interactive Code & Engineering Terminal (5 cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative min-w-0 w-full"
          >
            {/* Ambient Back Glow */}
            <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-blue-600/15 via-indigo-600/10 to-purple-600/15 blur-xl pointer-events-none max-w-full" />

            {/* Glass Code Window */}
            <div className="relative rounded-2xl glass-card overflow-hidden border border-slate-300 dark:border-slate-800 shadow-xl bg-slate-950 text-slate-200 w-full max-w-full">
              {/* Window Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-slate-900 border-b border-slate-800">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/90" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/90" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/90" />
                  </div>
                  <span className="text-[10px] sm:text-[11px] font-mono text-slate-400 pl-1 flex items-center gap-1 truncate">
                    <Terminal className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="truncate">sivaharish-core.java</span>
                  </span>
                </div>

                {/* File Tabs */}
                <div className="flex items-center gap-1 shrink-0 overflow-x-auto max-w-full">
                  <button
                    onClick={() => setActiveCodeTab("contest")}
                    className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "contest"
                        ? "bg-slate-800 text-blue-400 font-bold border border-slate-700"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    ContestCompass.java
                  </button>
                  <button
                    onClick={() => setActiveCodeTab("errorProne")}
                    className={`px-2 py-1 rounded-md text-[10px] font-mono transition-colors cursor-pointer ${
                      activeCodeTab === "errorProne"
                        ? "bg-slate-800 text-blue-400 font-bold border border-slate-700"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    GooglePR#6351.java
                  </button>
                </div>
              </div>

              {/* Code Snippet */}
              <div className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs leading-relaxed bg-slate-950 text-slate-200 overflow-x-auto min-h-[200px] w-full max-w-full">
                {activeCodeTab === "contest" ? (
                  <div>
                    <p className="text-slate-400">// Contest Compass · Core Sync Engine</p>
                    <p className="mt-1">
                      <span className="text-purple-400">public class</span>{" "}
                      <span className="text-amber-300">ContestSyncService</span> {"{"}
                    </p>
                    <p className="pl-4">
                      <span className="text-blue-400">@Transactional</span>
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-400">public</span> SyncResult{" "}
                      <span className="text-blue-300">syncPlatforms</span>() {"{"}
                    </p>
                    <p className="pl-8 text-slate-300">
                      List&lt;Contest&gt; active = fetchLiveContests();
                    </p>
                    <p className="pl-8 text-emerald-400">
                      repository.saveVerified(active);
                    </p>
                    <p className="pl-8 text-slate-400">
                      <span className="text-purple-400">return</span> SyncResult.ok(active.size());
                    </p>
                    <p className="pl-4">{"}"}</p>
                    <p>{"}"}</p>
                  </div>
                ) : (
                  <div>
                    <p className="text-slate-400">// Google Error Prone PR #6351</p>
                    <p className="mt-1">
                      <span className="text-purple-400">public class</span>{" "}
                      <span className="text-amber-300">DoNotCallSuggester</span> {"{"}
                    </p>
                    <p className="pl-4 text-slate-400">
                      // Handle nested single-statement blocks
                    </p>
                    <p className="pl-4">
                      <span className="text-purple-400">if</span> (statement instanceof BlockTree block) {"{"}
                    </p>
                    <p className="pl-8 text-emerald-400">
                      StatementTree inner = unwrapNestedStatement(block);
                    </p>
                    <p className="pl-8 text-slate-300">
                      <span className="text-purple-400">return</span> matchInvocation(inner);
                    </p>
                    <p className="pl-4">{"}"}</p>
                    <p>{"}"}</p>
                  </div>
                )}
              </div>

              {/* Bottom Details Bar */}
              <div className="p-2.5 sm:p-3 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold text-slate-300">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Real Code · Verified in Production</span>
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono bg-blue-950 text-blue-300 border border-blue-800 font-semibold">
                    Java 21
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-950 text-indigo-300 border border-indigo-800 font-semibold">
                    Spring Boot
                  </span>
                  <span className="px-1.5 sm:px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 text-emerald-300 border border-emerald-800 font-semibold">
                    MySQL
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Credibility Callout */}
            <div className="hidden sm:flex absolute -bottom-4 -left-3 items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-900 shadow-md border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 animate-float-slow">
              <Flame className="w-4 h-4 text-amber-500" />
              <span>Netflix · Microsoft · Google · AWS · IBM Contributor</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Subtle Scroll Cue */}
      <div
        className="mt-6 flex flex-col items-center justify-center gap-1 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors cursor-pointer"
        onClick={() => scrollTo("about")}
        aria-hidden="true"
      >
        <span className="text-[10px] font-mono uppercase tracking-widest">Explore</span>
        <div className="animate-bounce mt-1">
          <ArrowDown className="w-3.5 h-3.5" />
        </div>
      </div>
    </section>
  );
}
