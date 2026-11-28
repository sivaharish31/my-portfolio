import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Cpu, Layout, Database, Wrench, Sparkles } from "lucide-react";
import { TechnologyIcon } from "./icons";
import { skillCategories } from "../data/portfolio";
import { MaskedHeading, SpotlightCard } from "./MotionPrimitives";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { gsap } from "../lib/animations";

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 className="w-4 h-4 text-blue-600" />,
  "Java Concepts": <Cpu className="w-4 h-4 text-indigo-600" />,
  "Frontend Development": <Layout className="w-4 h-4 text-purple-600" />,
  Databases: <Database className="w-4 h-4 text-emerald-600" />,
  "Tools & Platforms": <Wrench className="w-4 h-4 text-amber-600" />,
  "Engineering Interests": <Sparkles className="w-4 h-4 text-slate-600" />,
};

const categoryBadgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  "Programming Languages": {
    bg: "bg-blue-50 dark:bg-blue-950/60",
    text: "text-blue-900 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800/70",
  },
  "Java Concepts": {
    bg: "bg-indigo-50 dark:bg-indigo-950/60",
    text: "text-indigo-900 dark:text-indigo-200",
    border: "border-indigo-200 dark:border-indigo-800/70",
  },
  "Frontend Development": {
    bg: "bg-purple-50 dark:bg-purple-950/60",
    text: "text-purple-900 dark:text-purple-200",
    border: "border-purple-200 dark:border-purple-800/70",
  },
  Databases: {
    bg: "bg-emerald-50 dark:bg-emerald-950/60",
    text: "text-emerald-900 dark:text-emerald-200",
    border: "border-emerald-200 dark:border-emerald-800/70",
  },
  "Tools & Platforms": {
    bg: "bg-amber-50 dark:bg-amber-950/60",
    text: "text-amber-900 dark:text-amber-200",
    border: "border-amber-200 dark:border-amber-800/70",
  },
  "Engineering Interests": {
    bg: "bg-slate-100 dark:bg-slate-800/80",
    text: "text-slate-800 dark:text-slate-200",
    border: "border-slate-200 dark:border-slate-700/80",
  },
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const sectionRef = useRef<HTMLElement>(null);

  useScrollReveal(sectionRef, () => {
    gsap.fromTo(
      ".skills-watermark",
      { x: -40 },
      {
        x: 40,
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

  const categories = ["All", ...skillCategories.map((c) => c.title)];

  const displayedCategories =
    selectedCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.title === selectedCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      {/* Editorial Parallax Watermark */}
      <div
        className="skills-watermark block absolute top-6 sm:top-8 lg:top-10 left-0 text-[3.25rem] sm:text-[5.5rem] lg:text-[8rem] font-black tracking-tighter text-slate-900/[0.065] dark:text-white/[0.025] select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        02 // TECH STACK
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Section Header */}
        <div className="max-w-2xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase mb-3"
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Foundation</span>
          </motion.div>

          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3"
          >
            <MaskedHeading>Technologies I work with.</MaskedHeading>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            An authentic overview of my programming foundation, core concepts, and active technical interests—calibrated without exaggerated proficiency meters.
          </motion.p>
        </div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 pb-1"
        >
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? "text-white dark:text-slate-950 font-bold"
                    : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="skills-active-filter"
                    className="absolute inset-0 bg-slate-900 dark:bg-white rounded-xl shadow-xs"
                    transition={{ type: "spring", stiffness: 450, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Categorized Bento Grid with 3D Spotlight Cards */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 min-w-0"
          >
            {displayedCategories.map((category, catIdx) => {
              const style =
                categoryBadgeStyles[category.title] || {
                  bg: "bg-slate-50 dark:bg-slate-800",
                  text: "text-slate-800 dark:text-slate-200",
                  border: "border-slate-200 dark:border-slate-700",
                };

              return (
                <SpotlightCard
                  key={category.title}
                  spotlightColor="rgba(59, 130, 246, 0.12)"
                  tiltStrength={4}
                  className="rounded-2xl h-full"
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{ duration: 0.5, delay: catIdx * 0.06 }}
                    className="p-5 sm:p-6 rounded-2xl bg-slate-50/75 dark:bg-slate-900/75 border border-slate-200 dark:border-slate-800 hover:border-blue-300/80 dark:hover:border-blue-700/70 hover:bg-white dark:hover:bg-slate-800/85 hover:shadow-lg transition-all flex flex-col justify-between group min-w-0 h-full"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-200/60 dark:border-slate-800">
                        <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-2xs border border-slate-200/60 dark:border-slate-700 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                          {categoryIcons[category.title] ?? <Cpu className="w-4 h-4 text-blue-600" />}
                        </div>
                        <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                          {category.title}
                        </h3>
                      </div>

                      {/* Skill Pills with Authentic Technology Logos */}
                      <div className="flex flex-wrap gap-2">
                        {category.items.map((skill, skillIdx) => (
                          <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, scale: 0.92 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.3, delay: skillIdx * 0.03 }}
                            whileHover={{ scale: 1.06, y: -2 }}
                            whileTap={{ scale: 0.96 }}
                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-2xs transition-shadow cursor-default group/pill`}
                          >
                            <TechnologyIcon
                              name={skill.name}
                              className="w-3.5 h-3.5 shrink-0 group-hover/pill:scale-110 transition-transform"
                            />
                            <span>{skill.name}</span>
                            {skill.level && (
                              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white dark:bg-slate-900 border border-black/10 dark:border-white/10 text-slate-600 dark:text-slate-300 font-bold">
                                {skill.level}
                              </span>
                            )}
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-600 dark:text-slate-400">
                      <span>{category.items.length} items verified</span>
                      <span>✓ Active Knowledge</span>
                    </div>
                  </motion.div>
                </SpotlightCard>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Clean Note */}
        <p className="mt-8 text-xs text-slate-600 dark:text-slate-400 text-center font-mono">
          Technologies and proficiency levels reflect active coursework and verified project code.
        </p>
      </div>
    </section>
  );
}
