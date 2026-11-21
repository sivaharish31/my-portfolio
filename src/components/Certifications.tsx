import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { Award, CheckCircle2, Cloud, GraduationCap } from "lucide-react";
import { OracleIcon, AWSIcon, NPTELIcon, INIIcon } from "./icons";
import { certifications, type Certification } from "../data/portfolio";

function getIssuerIcon(cert: Certification) {
  if (cert.isAws) {
    return <AWSIcon className="w-5 h-5 text-[#FF9900]" />;
  }
  if (cert.issuer === "Oracle") {
    return <OracleIcon className="w-5 h-5" />;
  }
  if (cert.issuer === "NPTEL") {
    return <NPTELIcon className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />;
  }
  return <INIIcon className="w-5 h-5 text-sky-600 dark:text-sky-400" />;
}

function CertificationCard({
  cert,
  index,
  inView,
}: {
  cert: Certification;
  index: number;
  inView: boolean;
}) {
  const isElite = cert.category === "Course (Elite)";
  const isOracle = cert.issuer === "Oracle";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -4 }}
      className={`p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/80 border transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden min-w-0 shadow-xs hover:shadow-lg ${
        cert.isAws
          ? "border-amber-200/90 dark:border-amber-900/50 hover:border-amber-300 dark:hover:border-amber-800"
          : isElite
          ? "border-indigo-200/90 dark:border-indigo-900/50 hover:border-indigo-300 dark:hover:border-indigo-800"
          : isOracle
          ? "border-red-200/90 dark:border-red-900/50 hover:border-red-300 dark:hover:border-red-800"
          : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700"
      }`}
    >
      {/* Top ambient color glow */}
      <div
        className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${cert.accentGlow} blur-2xl pointer-events-none opacity-60 dark:opacity-40 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between gap-3 pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3 min-w-0">
            <div
              className={`w-11 h-11 rounded-2xl flex items-center justify-center p-2.5 shadow-2xs border transition-transform group-hover:scale-105 flex-shrink-0 ${
                cert.isAws
                  ? "bg-amber-500/10 dark:bg-amber-950/40 border-amber-200/80 dark:border-amber-800/70"
                  : isElite
                  ? "bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200/80 dark:border-indigo-800/70"
                  : isOracle
                  ? "bg-red-50 dark:bg-red-950/40 border-red-200/80 dark:border-red-800/70"
                  : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              }`}
            >
              {getIssuerIcon(cert)}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white leading-tight truncate">
                {cert.issuer}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 truncate">
                {cert.category}
              </p>
            </div>
          </div>

          {/* Recognition Pill */}
          {cert.isAws ? (
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200/80 dark:border-amber-800/80 shadow-2xs whitespace-nowrap flex-shrink-0">
              AWS Training Badge
            </span>
          ) : isElite ? (
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80 shadow-2xs whitespace-nowrap flex-shrink-0">
              ★ Elite Distinction
            </span>
          ) : isOracle ? (
            <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-700 dark:text-red-300 border border-red-200/80 dark:border-red-800/80 shadow-2xs whitespace-nowrap flex-shrink-0">
              Certification
            </span>
          ) : (
            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 whitespace-nowrap flex-shrink-0">
              Course
            </span>
          )}
        </div>

        {/* Title & Category */}
        <div className="mt-4 mb-2.5">
          <h4 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
            {cert.name}
          </h4>
          <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1">
            {cert.category}
          </p>
        </div>

        {/* Concise Neutral Description */}
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
          {cert.description}
        </p>
      </div>

      {/* Card Footer */}
      <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-mono">
        <span className="flex items-center gap-1.5 min-w-0">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
          <span className="truncate">{cert.issuer}</span>
        </span>
        <span className="text-[11px] text-slate-600 dark:text-slate-400 flex-shrink-0 font-medium">
          {cert.statusLabel}
        </span>
      </div>
    </motion.div>
  );
}

export function Certifications() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="certifications"
      ref={ref}
      className="py-20 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300 border-t border-slate-200/60 dark:border-slate-800/80"
      aria-labelledby="certifications-heading"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase">
              <Award className="w-3.5 h-3.5" />
              <span>Certifications & Training</span>
            </span>
          </motion.div>

          <motion.h2
            id="certifications-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3"
          >
            Certified skills & specialized training.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Formal technical coursework, training programs, and recognized credentials completed across artificial intelligence, cloud operations, database systems, and computer science foundations.
          </motion.p>
        </div>

        {/* Factual Overview Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="grid sm:grid-cols-3 gap-3.5 sm:gap-4 mb-10 min-w-0"
        >
          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Certification
              </span>
              <Award className="w-4 h-4 text-red-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              1 Professional
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Oracle Agentic AI Foundations
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Training Badges
              </span>
              <Cloud className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              2 AWS Badges
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              Cloud Operations & ML for NLP
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Academic Courses
              </span>
              <GraduationCap className="w-4 h-4 text-indigo-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              3 Courses
            </p>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
              NPTEL (1 Elite) & INI
            </p>
          </div>
        </motion.div>

        {/* 6 Credential Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 min-w-0">
          {certifications.map((cert, index) => (
            <CertificationCard
              key={cert.id}
              cert={cert}
              index={index}
              inView={inView}
            />
          ))}
        </div>

        {/* Factual Institutional Summary Banner */}
        <div className="mt-10 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 font-mono flex flex-wrap items-center justify-center gap-2">
          <span>✓ Curriculum and training completed under institutional guidelines</span>
          <span className="hidden sm:inline">·</span>
          <span>Issuers: Oracle, AWS Academy, NPTEL, and INI</span>
        </div>
      </div>
    </section>
  );
}
