import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { ExternalLink, Layers, ArrowUpRight } from "lucide-react";
import {
  GitHubIcon,
  LinkedInIcon,
  CodolioIcon,
  LeetCodeIcon,
  CodeforcesIcon,
  AtCoderIcon,
  CodeChefIcon,
} from "./icons";
import { unifiedDeveloperIdentity } from "../data/portfolio";
import { MaskedHeading, SpotlightCard, SectionWatermark } from "./MotionPrimitives";

const platformIconMap: Record<string, React.ReactNode> = {
  GitHub: <GitHubIcon className="w-5 h-5 text-slate-900 dark:text-white" />,
  LinkedIn: <LinkedInIcon className="w-5 h-5 text-blue-600" />,
  LeetCode: <LeetCodeIcon className="w-5 h-5" />,
  Codeforces: <CodeforcesIcon className="w-5 h-5" />,
  AtCoder: <AtCoderIcon className="w-5 h-5" />,
  CodeChef: <CodeChefIcon className="w-5 h-5" />,
  Codolio: <CodolioIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />,
};

export function UnifiedDeveloperIdentity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="ecosystem"
      ref={ref}
      className="py-14 sm:py-16 md:py-20 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300"
      aria-labelledby="identity-heading"
    >
      <SectionWatermark text="08 // ECOSYSTEM" align="left" direction="right" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Header */}
        <div className="max-w-2xl mb-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 dark:bg-blue-950/60 dark:text-blue-400 dark:border-blue-900/60 uppercase">
              <Layers className="w-3.5 h-3.5" />
              Unified Ecosystem
            </span>
          </motion.div>

          <h2
            id="identity-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-4"
          >
            <MaskedHeading>One developer. One connected identity.</MaskedHeading>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Bridging software engineering, real-world open-source contributions, algorithmic problem solving, and community engagement into a cohesive engineering profile.
          </motion.p>
        </div>

        {/* 8-Platform Unified Matrix */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 min-w-0">
          {unifiedDeveloperIdentity.map((item, idx) => (
            <SpotlightCard
              key={item.platform}
              spotlightColor="rgba(59, 130, 246, 0.12)"
              tiltStrength={3.5}
              className="rounded-2xl h-full"
            >
              <motion.a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.05 + 0.2 }}
                className="p-5 rounded-2xl bg-slate-50/75 border border-slate-200/80 hover:border-blue-300/70 hover:bg-white hover:shadow-lg dark:bg-slate-800/50 dark:border-slate-800 dark:hover:bg-slate-800/85 dark:hover:border-blue-700/60 transition-all group flex flex-col justify-between min-w-0 h-full"
                whileHover={{ y: -4 }}
              >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 shadow-2xs border border-slate-200/60 dark:border-slate-700 group-hover:scale-105 transition-transform">
                    {platformIconMap[item.platform]}
                  </div>

                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 font-semibold text-slate-700 dark:text-slate-300">
                    {item.highlight}
                  </span>
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1">
                  {item.category}
                </p>
                <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                  <span>{item.platform}</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-0.5 mb-2.5">
                  @{item.handle}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 mt-4 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between text-[11px] font-medium text-blue-600 dark:text-blue-400">
                <span>View Profile</span>
                <ExternalLink className="w-3 h-3 text-slate-500 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" />
              </div>
              </motion.a>
            </SpotlightCard>
          ))}
        </div>
      </div>
    </section>
  );
}
