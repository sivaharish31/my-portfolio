import { useRef } from "react";
import { motion } from "motion/react";
import { Server, Cpu, Code2, GitMerge, GraduationCap, MapPin, Compass } from "lucide-react";
import { config } from "../data/portfolio";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { gsap } from "../lib/animations";
import { MaskedHeading, SpotlightCard } from "./MotionPrimitives";

const iconMap: Record<string, React.ReactNode> = {
  server: <Server className="w-5 h-5 text-indigo-600" />,
  cpu: <Cpu className="w-5 h-5 text-blue-600" />,
  "code-2": <Code2 className="w-5 h-5 text-purple-600" />,
  "git-merge": <GitMerge className="w-5 h-5 text-emerald-600" />,
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, () => {
    gsap.fromTo(
      ".about-fade-in",
      { opacity: 0, y: 26 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    gsap.fromTo(
      ".about-watermark",
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
      id="about"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-slate-50/70 dark:bg-slate-950/60 relative overflow-hidden border-y border-slate-200/60 dark:border-slate-800/80"
      aria-labelledby="about-heading"
    >
      {/* Editorial Parallax Watermark */}
      <div
        className="about-watermark block absolute top-6 sm:top-8 lg:top-10 right-0 text-[3.25rem] sm:text-[5.5rem] lg:text-[8rem] font-black tracking-tighter text-slate-900/[0.065] dark:text-white/[0.03] select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        01 // ENGINEERING
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Section Header */}
        <div className="mb-10 sm:mb-12 min-w-0">
          <div className="about-fade-in inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>

          <h2
            id="about-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] max-w-2xl break-words"
          >
            <MaskedHeading>Driven by curiosity.</MaskedHeading>{" "}
            <span className="text-slate-400 dark:text-slate-500 font-normal">
              <MaskedHeading delay={0.18}>Grounded in core engineering.</MaskedHeading>
            </span>
          </h2>
        </div>

        {/* 2-Column Asymmetric Composition */}
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start min-w-0">
          {/* Left Column: Narrative & Quote (7 cols) */}
          <div className="lg:col-span-7 space-y-5 min-w-0 w-full">
            {config.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-slate-700 dark:text-slate-300 text-base sm:text-lg leading-relaxed break-words about-fade-in"
              >
                {para}
              </p>
            ))}

            {/* Philosophy Callout Quote */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
              className="mt-8 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-sm relative overflow-hidden min-w-0 about-fade-in"
            >
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600" />
              <p className="text-slate-800 dark:text-slate-200 text-sm sm:text-base italic leading-relaxed pl-2 font-medium break-words">
                "Good software is not just about making something work. It's about making it reliable, maintainable, and engineered with discipline."
              </p>
            </motion.div>
          </div>

          {/* Right Column: Focus Areas & Education (5 cols) */}
          <div className="lg:col-span-5 space-y-4 min-w-0 w-full">
            <p className="text-xs font-semibold tracking-wider text-slate-600 dark:text-slate-400 uppercase mb-1 about-fade-in">
              Core Engineering Focus
            </p>

            {/* Focus Area Badges */}
            <div className="space-y-3">
              {config.about.highlights.map((h) => (
                <motion.div
                  key={h.label}
                  whileHover={{ x: 6, scale: 1.01 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-md transition-all group about-fade-in cursor-default"
                >
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800 group-hover:bg-blue-50 dark:group-hover:bg-blue-950/50 group-hover:scale-110 transition-all">
                    {iconMap[h.icon] ?? <Server className="w-5 h-5 text-blue-600 dark:text-blue-400" />}
                  </div>
                  <span className="font-semibold text-sm text-slate-900 dark:text-white">
                    {h.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Academic Foundation Card with 3D Spotlight */}
            <SpotlightCard
              spotlightColor="rgba(59, 130, 246, 0.14)"
              tiltStrength={4}
              className="mt-6 rounded-2xl about-fade-in"
            >
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden">
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                    <GraduationCap className="w-4 h-4" />
                    <span>Academic Foundation</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70">
                    Class of 2029
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug">
                  {config.education.degree}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                  {config.education.college}
                </p>

                <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  <span>{config.education.location}</span>
                  <span className="text-slate-300 dark:text-slate-700">·</span>
                  <span>Computer Science & Engineering</span>
                </div>
              </div>
            </SpotlightCard>
          </div>
        </div>
      </div>
    </section>
  );
}
