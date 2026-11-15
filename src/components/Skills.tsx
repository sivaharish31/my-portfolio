import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Cpu, Layout, Database, Wrench, Sparkles } from "lucide-react";
import { skillCategories } from "../data/portfolio";

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code2 className="w-4 h-4 text-blue-600" />,
  "Java Concepts": <Cpu className="w-4 h-4 text-indigo-600" />,
  "Frontend Development": <Layout className="w-4 h-4 text-purple-600" />,
  Databases: <Database className="w-4 h-4 text-emerald-600" />,
  "Tools & Platforms": <Wrench className="w-4 h-4 text-amber-600" />,
  "Engineering Interests": <Sparkles className="w-4 h-4 text-slate-600" />,
};

const categoryBadgeStyles: Record<string, { bg: string; text: string; border: string }> = {
  "Programming Languages": { bg: "bg-blue-50", text: "text-blue-900", border: "border-blue-200" },
  "Java Concepts": { bg: "bg-indigo-50", text: "text-indigo-900", border: "border-indigo-200" },
  "Frontend Development": { bg: "bg-purple-50", text: "text-purple-900", border: "border-purple-200" },
  Databases: { bg: "bg-emerald-50", text: "text-emerald-900", border: "border-emerald-200" },
  "Tools & Platforms": { bg: "bg-amber-50", text: "text-amber-900", border: "border-amber-200" },
  "Engineering Interests": { bg: "bg-slate-100", text: "text-slate-800", border: "border-slate-200" },
};

export function Skills() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", ...skillCategories.map((c) => c.title)];

  const displayedCategories =
    selectedCategory === "All"
      ? skillCategories
      : skillCategories.filter((c) => c.title === selectedCategory);

  return (
    <section
      id="skills"
      className="py-20 md:py-24 bg-white relative overflow-hidden"
      aria-labelledby="skills-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-10"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Technical Foundation</span>
          </div>

          <h2
            id="skills-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3"
          >
            Technologies I work with.
          </h2>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            An authentic overview of my programming foundation, core concepts, and active technical interests—calibrated without exaggerated proficiency meters.
          </p>
        </motion.div>

        {/* Category Filter Pills */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap gap-2 mb-8 pb-1"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Categorized Bento Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {displayedCategories.map((category) => {
              const style =
                categoryBadgeStyles[category.title] || {
                  bg: "bg-slate-50",
                  text: "text-slate-800",
                  border: "border-slate-200",
                };

              return (
                <div
                  key={category.title}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-50/70 border border-slate-200 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-200/60">
                      <div className="p-2 rounded-xl bg-white shadow-2xs border border-slate-200/60 group-hover:scale-105 transition-transform">
                        {categoryIcons[category.title] ?? <Cpu className="w-4 h-4 text-blue-600" />}
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                        {category.title}
                      </h3>
                    </div>

                    {/* Skill Pills */}
                    <div className="flex flex-wrap gap-2">
                      {category.items.map((skill) => (
                        <div
                          key={skill.name}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${style.bg} ${style.text} ${style.border} shadow-2xs hover:scale-[1.02] transition-transform`}
                        >
                          <span>{skill.name}</span>
                          {skill.level && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white border border-black/10 text-slate-600 font-bold">
                              {skill.level}
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] font-mono text-slate-400">
                    <span>{category.items.length} items verified</span>
                    <span>✓ Active Knowledge</span>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Clean Note */}
        <p className="mt-8 text-xs text-slate-400 text-center font-mono">
          Technologies and proficiency levels reflect active coursework and verified project code.
        </p>
      </div>
    </section>
  );
}
