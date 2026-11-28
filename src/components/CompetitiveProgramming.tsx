import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import {
  ExternalLink,
  Trophy,
  Activity,
  Code2,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
} from "lucide-react";
import {
  LeetCodeIcon,
  CodeforcesIcon,
  AtCoderIcon,
  CodeChefIcon,
} from "./icons";
import { competitiveProfiles, type CPPlatform } from "../data/portfolio";
import {
  loadCPStats,
  getCachedCPBundle,
  type CPDataBundle,
  DEFAULT_CF_BASELINE,
  DEFAULT_LC_BASELINE,
} from "../services/competitiveProgramming";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useGitHubSnapshot } from "../hooks/useGitHubSnapshot";
import type { MultiPlatformSnapshot, PlatformSyncStatus } from "../services/github";
import { gsap } from "../lib/animations";
import { MaskedHeading, SpotlightCard, SectionWatermark } from "./MotionPrimitives";

function AnimatedNumber({ value, suffix = "" }: { value: number; suffix?: string }) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced || !isInView) return;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: value,
      duration: 1.4,
      ease: "power2.out",
      onUpdate: () => {
        setAnimatedValue(Math.round(obj.val));
      },
    });

    return () => {
      tween.kill();
    };
  }, [isInView, value, prefersReduced]);

  const display = prefersReduced ? value : animatedValue;

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const platformIcons: Record<string, React.ReactNode> = {
  leetcode: <LeetCodeIcon className="w-5 h-5" />,
  codeforces: <CodeforcesIcon className="w-5 h-5" />,
  atcoder: <AtCoderIcon className="w-5 h-5" />,
  codechef: <CodeChefIcon className="w-5 h-5" />,
};

function PlatformCard({
  platform,
  bundle,
  multiPlatform,
}: {
  platform: CPPlatform;
  bundle: CPDataBundle | null;
  multiPlatform: MultiPlatformSnapshot | null;
}) {
  const isCf = platform.id === "codeforces";
  const isLc = platform.id === "leetcode";
  const isCc = platform.id === "codechef";
  const isAc = platform.id === "atcoder";

  const mpEntry = multiPlatform?.platforms?.[platform.id];
  const mpStatus: PlatformSyncStatus | null = mpEntry?.status ?? null;

  // Prefer 30-minute multi-platform snapshot if valid; fallback to 5-hour CP bundle / verified baseline
  const cfData = multiPlatform?.platforms?.codeforces?.data;
  const lcData = multiPlatform?.platforms?.leetcode?.data;
  const ccData = multiPlatform?.platforms?.codechef?.data;
  const acData = multiPlatform?.platforms?.atcoder?.data;

  const cfRating = cfData?.rating ?? bundle?.codeforces.rating ?? DEFAULT_CF_BASELINE.rating;
  const cfMaxRating = cfData?.maxRating ?? bundle?.codeforces.maxRating ?? cfRating;
  const cfRankRaw = cfData?.rank ?? bundle?.codeforces.rank ?? "newbie";
  const cfRank = cfRankRaw.charAt(0).toUpperCase() + cfRankRaw.slice(1);
  const cfContests = cfData?.ratedContests ?? 4;

  const lcSolved = lcData?.totalSolved ?? bundle?.leetcode.totalSolved ?? DEFAULT_LC_BASELINE.totalSolved;
  const lcRank = lcData?.ranking
    ? `#${lcData.ranking.toLocaleString()}`
    : bundle?.leetcode.ranking ?? DEFAULT_LC_BASELINE.ranking;
  const lcEasy = lcData?.easySolved ?? bundle?.leetcode.easySolved ?? DEFAULT_LC_BASELINE.easySolved;
  const lcMed = lcData?.mediumSolved ?? bundle?.leetcode.mediumSolved ?? DEFAULT_LC_BASELINE.mediumSolved;
  const lcHard = lcData?.hardSolved ?? bundle?.leetcode.hardSolved ?? DEFAULT_LC_BASELINE.hardSolved;

  const ccRating = ccData?.rating ?? 1259;
  const ccMaxRating = ccData?.maxRating ?? 1299;
  const ccSolved = ccData?.totalSolved ?? 145;

  const acRating = acData?.rating ?? 32;
  const acHighest = acData?.highestRating ?? 32;
  const acMatches = acData?.ratedMatches ?? 4;

  const totalLcQuestions = lcSolved > 0 ? lcSolved : 187;
  const easyPct = Math.round((lcEasy / totalLcQuestions) * 100);
  const medPct = Math.round((lcMed / totalLcQuestions) * 100);

  return (
    <SpotlightCard
      spotlightColor="rgba(59, 130, 246, 0.14)"
      tiltStrength={3.5}
      className="rounded-3xl h-full"
    >
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
        className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/85 border border-slate-200 dark:border-slate-800 hover:border-blue-300/80 dark:hover:border-blue-700/70 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden min-w-0"
      >
      {/* Top ambient lighting tint */}
      <div
        className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${platform.bgGradient} blur-2xl pointer-events-none opacity-60 dark:opacity-40 group-hover:opacity-100 transition-opacity`}
      />

      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2 flex items-center justify-center shadow-2xs group-hover:scale-105 transition-transform">
              {platformIcons[platform.id]}
            </div>
            <div>
              <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                {platform.name}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                @{platform.handle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {mpStatus === "success" || (isCf && bundle?.codeforces.isLive) || (isLc && bundle?.leetcode.isLive) ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {mpStatus === "success" ? "Synced 30m" : "Live Sync"}
              </span>
            ) : mpStatus === "partial" || mpStatus === "stale" ? (
              <span
                title={mpEntry?.error || "Showing last successful snapshot"}
                className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 font-semibold border border-amber-200 dark:border-amber-800/70"
              >
                {mpStatus === "partial" ? "Partial" : "Stale"}
              </span>
            ) : (
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold border border-slate-200 dark:border-slate-700">
                Verified
              </span>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 mb-4 leading-relaxed">
          {platform.tagline}
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {platform.stats.map((stat, i) => {
            let val = stat.value;
            let sub = stat.subtext;

            if (isCf && stat.label.includes("Current Rating")) {
              val = cfRating;
              sub = cfRank;
            } else if (isCf && stat.label.includes("Max Rating")) {
              val = cfMaxRating;
            } else if (isCf && stat.label.includes("Rated Rounds")) {
              val = cfContests;
            } else if (isLc && stat.label.includes("Total Solved")) {
              val = lcSolved;
            } else if (isLc && stat.label.includes("Global Rank")) {
              val = lcRank;
            } else if (isCc && stat.label === "Rating") {
              val = ccRating;
            } else if (isCc && stat.label.includes("Highest Rating")) {
              val = ccMaxRating;
            } else if (isCc && stat.label.includes("Problems Solved")) {
              val = ccSolved;
            } else if (isAc && stat.label === "Rating") {
              val = acRating;
            } else if (isAc && stat.label.includes("Highest Rating")) {
              val = acHighest;
            } else if (isAc && stat.label.includes("Rated Matches")) {
              val = acMatches;
            }

            return (
              <div
                key={i}
                className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 text-center"
              >
                <p className="text-base font-extrabold text-slate-900 dark:text-white leading-none">
                  {val}
                </p>
                <p className="text-[10px] font-mono uppercase text-slate-600 dark:text-slate-400 mt-1 truncate">
                  {stat.label}
                </p>
                {sub && (
                  <p className="text-[10px] text-slate-600 dark:text-slate-400 font-mono truncate mt-0.5">
                    {sub}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        {/* Custom Visual Widget for LeetCode */}
        {isLc && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              <span className="flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                Problem Breakdown
              </span>
              <span className="text-[11px] font-mono font-bold text-slate-700 dark:text-slate-300">
                {lcSolved} Solved
              </span>
            </div>

            <div className="h-2 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden flex">
              <div
                className="bg-emerald-500 h-full"
                style={{ width: `${easyPct}%` }}
                title={`${lcEasy} Easy Solved (${easyPct}%)`}
              />
              <div
                className="bg-amber-500 h-full"
                style={{ width: `${medPct}%` }}
                title={`${lcMed} Medium Solved (${medPct}%)`}
              />
              {lcHard > 0 && (
                <div
                  className="bg-red-500 h-full flex-1"
                  title={`${lcHard} Hard Solved`}
                />
              )}
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-600 dark:text-slate-400 mt-1.5">
              <span>
                Easy: <strong className="text-slate-800 dark:text-slate-200">{lcEasy}</strong>
              </span>
              <span>
                Medium: <strong className="text-slate-800 dark:text-slate-200">{lcMed}</strong>
              </span>
              <span>
                Hard: <strong className="text-slate-800 dark:text-slate-200">{lcHard}</strong>
              </span>
            </div>
          </div>
        )}

        {/* Custom Visual Widget for Codeforces */}
        {isCf && (
          <div className="mb-4 p-3 rounded-xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200/60 dark:border-blue-900/40">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1.5">
              <span className="flex items-center gap-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                Rating Progression
              </span>
              <span className="text-[11px] font-mono text-blue-700 dark:text-blue-300 font-bold">
                367 → {cfRating}
              </span>
            </div>

            <div className="space-y-1">
              {platform.ratingHistory?.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between text-[10px] text-slate-600 dark:text-slate-400 py-0.5 border-b border-blue-100/50 dark:border-blue-900/30 last:border-none"
                >
                  <span className="truncate max-w-[170px] text-slate-700 dark:text-slate-300">
                    {item.contestName}
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-1.5 py-0.2 rounded border border-blue-100 dark:border-blue-900/40">
                    {item.rating}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Custom Visual Widget for CodeChef */}
        {platform.id === "codechef" && (
          <div className="mb-4 p-3 rounded-xl bg-amber-50/50 dark:bg-amber-950/30 border border-amber-200/60 dark:border-amber-900/40 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-4 h-4 text-amber-700 dark:text-amber-400" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Peak Contest Rating</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">CodeChef Division 4 · 145 Solved</p>
              </div>
            </div>
            <span className="text-sm font-extrabold font-mono text-amber-900 dark:text-amber-300 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-800/60">
              1259 Peak
            </span>
          </div>
        )}

        {/* Custom Visual Widget for AtCoder */}
        {platform.id === "atcoder" && (
          <div className="mb-4 p-3 rounded-xl bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-slate-700 dark:text-slate-300" />
              <div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">AtCoder Beginner Contests</p>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">4 Rated Rounds (ABC 482-485)</p>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
              32 Rating
            </span>
          </div>
        )}
      </div>

      {/* Card Action */}
      <div className="pt-3.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between mt-2">
        <span className="text-[11px] font-mono text-slate-600 dark:text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          {bundle?.lastSyncFormatted ? `Sync: ${bundle.lastSyncFormatted}` : platform.lastVerified}
        </span>

        <motion.a
          href={platform.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-semibold shadow-2xs transition-colors cursor-pointer group focus-visible:ring-2 focus-visible:ring-blue-500"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span>Open Profile</span>
          <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-white dark:group-hover:text-slate-950 transition-colors" />
        </motion.a>
      </div>
    </motion.div>
    </SpotlightCard>
  );
}

export function CompetitiveProgramming() {
  const [bundle, setBundle] = useState<CPDataBundle | null>(() => getCachedCPBundle());
  const { multiPlatform } = useGitHubSnapshot();

  useEffect(() => {
    let isSubscribed = true;
    loadCPStats(false).then((data) => {
      if (isSubscribed) {
        setBundle(data);
      }
    }).catch(() => {
      // Keep existing bundle
    });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const lcSolvedTotal = multiPlatform?.platforms?.leetcode?.data?.totalSolved ?? bundle?.leetcode.totalSolved ?? 187;
  const ccSolvedTotal = multiPlatform?.platforms?.codechef?.data?.totalSolved ?? 145;
  const totalProblemsSolved = lcSolvedTotal + ccSolvedTotal + 25;

  return (
    <section
      id="competitive"
      className="py-14 sm:py-16 md:py-20 bg-slate-50/70 dark:bg-slate-950/60 relative overflow-hidden border-t border-slate-200/60 dark:border-slate-800/80"
      aria-labelledby="cp-heading"
    >
      <SectionWatermark text="05 // PROBLEM SOLVING" align="right" direction="left" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="max-w-2xl mb-8"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase mb-3">
            <Trophy className="w-3.5 h-3.5" />
            <span>Competitive Programming & Problem Solving</span>
          </div>

          <h2
            id="cp-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3"
          >
            <MaskedHeading>Algorithms, contests, & problem solving.</MaskedHeading>
          </h2>

          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
            An analytical overview of my competitive programming journey across LeetCode, Codeforces, AtCoder, and CodeChef. Data is strictly verified from public profiles with zero fabricated numbers.
          </p>
        </motion.div>

        {/* Consolidated Overview Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10 min-w-0"
        >
          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0"
          >
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Problems Solved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              <AnimatedNumber value={totalProblemsSolved} suffix="+" />
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              LeetCode ({lcSolvedTotal}), CodeChef ({ccSolvedTotal}), Codeforces (25)
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0"
          >
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Peak Rating</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              <AnimatedNumber value={multiPlatform?.platforms?.codechef?.data?.maxRating ?? 1299} />
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              CodeChef Division 4 · Codeforces {multiPlatform?.platforms?.codeforces?.data?.rating ?? bundle?.codeforces.rating ?? 1015}
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0"
          >
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Platforms</span>
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              <AnimatedNumber value={4} />
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              LeetCode · Codeforces · AtCoder · CodeChef
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -3 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0"
          >
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Primary Language</span>
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              Java
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              Object-oriented design & algorithms
            </p>
          </motion.div>
        </motion.div>

        {/* 4 Dashboard Platform Cards */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-8 min-w-0">
          {competitiveProfiles.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              bundle={bundle}
              multiPlatform={multiPlatform}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
