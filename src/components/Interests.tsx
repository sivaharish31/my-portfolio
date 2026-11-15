import { motion, useInView } from "motion/react";
import { useRef } from "react";
import {
  Server, Cpu, Code2, Database, GitBranch, ShieldCheck, Sparkles,
} from "lucide-react";
import { interests } from "../data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  cpu: <Cpu className="w-5 h-5 text-blue-600" />,
  server: <Server className="w-5 h-5 text-indigo-600" />,
  "code-2": <Code2 className="w-5 h-5 text-purple-600" />,
  database: <Database className="w-5 h-5 text-emerald-600" />,
  "git-branch": <GitBranch className="w-5 h-5 text-amber-600" />,
  "shield-check": <ShieldCheck className="w-5 h-5 text-sky-600" />,
};

export function Interests() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="interests"
      ref={ref}
      className="py-32 bg-white relative overflow-hidden"
      aria-labelledby="interests-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className="mb-4"
            >
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                Technical Curiosity
              </span>
            </motion.div>

            <motion.h2
              id="interests-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15]"
            >
              Always learning.{" "}
              <span className="text-slate-400 font-normal">
                Always building.
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-600 max-w-sm text-sm leading-relaxed"
          >
            Areas of computer science and software development I am actively exploring and deepening my practical knowledge in.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {interests.map((interest, i) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.08 + 0.25, ease: "easeOut" }}
              className="p-6 rounded-2xl bg-slate-50/70 border border-slate-200/80 hover:border-slate-300 hover:bg-white hover:shadow-md transition-all group cursor-default"
              whileHover={{ y: -3 }}
            >
              <div className="p-3 bg-white rounded-xl shadow-2xs border border-slate-200/60 w-fit mb-4 group-hover:scale-105 transition-transform">
                {iconMap[interest.icon] ?? <Server className="w-5 h-5 text-blue-600" />}
              </div>
              <h3 className="font-bold text-base text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                {interest.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {interest.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
