import { motion } from "motion/react";
import { Server, Cpu, Code2, GitMerge, GraduationCap, MapPin, Compass } from "lucide-react";
import { config } from "../data/portfolio";

const iconMap: Record<string, React.ReactNode> = {
  server: <Server className="w-5 h-5 text-indigo-600" />,
  cpu: <Cpu className="w-5 h-5 text-blue-600" />,
  "code-2": <Code2 className="w-5 h-5 text-purple-600" />,
  "git-merge": <GitMerge className="w-5 h-5 text-emerald-600" />,
};

export function About() {
  return (
    <section
      id="about"
      className="py-20 md:py-24 bg-slate-50/70 relative overflow-hidden border-y border-slate-200/60"
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>About Me</span>
          </div>

          <h2
            id="about-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] max-w-2xl"
          >
            Driven by curiosity.{" "}
            <span className="text-slate-400 font-normal">
              Grounded in core engineering.
            </span>
          </h2>
        </motion.div>

        {/* 2-Column Asymmetric Composition */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Narrative & Quote (7 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-5"
          >
            {config.about.paragraphs.map((para, i) => (
              <p
                key={i}
                className="text-slate-700 text-base sm:text-lg leading-relaxed"
              >
                {para}
              </p>
            ))}

            {/* Philosophy Callout Quote */}
            <div className="mt-8 p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs relative overflow-hidden">
              <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-gradient-to-b from-blue-600 to-indigo-600" />
              <p className="text-slate-800 text-sm sm:text-base italic leading-relaxed pl-2 font-medium">
                "Good software is not just about making something work. It's about making it reliable, maintainable, and engineered with discipline."
              </p>
            </div>
          </motion.div>

          {/* Right Column: Focus Areas & Education (5 cols) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 space-y-4"
          >
            <p className="text-xs font-semibold tracking-wider text-slate-500 uppercase mb-1">
              Core Engineering Focus
            </p>

            {/* Focus Area Badges */}
            <div className="space-y-3">
              {config.about.highlights.map((h) => (
                <div
                  key={h.label}
                  className="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all group"
                >
                  <div className="p-2 rounded-lg bg-slate-50 group-hover:bg-blue-50 transition-colors">
                    {iconMap[h.icon] ?? <Server className="w-5 h-5 text-blue-600" />}
                  </div>
                  <span className="font-semibold text-sm text-slate-900">
                    {h.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Academic Foundation Card */}
            <div className="mt-6 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-blue-700">
                  <GraduationCap className="w-4 h-4" />
                  <span>Academic Foundation</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  Class of 2029
                </span>
              </div>

              <h3 className="font-bold text-base text-slate-900 leading-snug">
                {config.education.degree}
              </h3>
              <p className="text-xs text-slate-600 mt-1">
                {config.education.college}
              </p>

              <div className="flex items-center gap-2 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-100">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{config.education.location}</span>
                <span className="text-slate-300">·</span>
                <span>Computer Science & Engineering</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
