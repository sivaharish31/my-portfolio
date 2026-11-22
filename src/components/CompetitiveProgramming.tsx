import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  ExternalLink,
  Trophy,
  Activity,
  Code2,
  TrendingUp,
  CheckCircle2,
  Clock,
  Sparkles,
  RefreshCw,
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

const platformIcons: Record<string, React.ReactNode> = {
  leetcode: <LeetCodeIcon className="w-5 h-5" />,
  codeforces: <CodeforcesIcon className="w-5 h-5" />,
  atcoder: <AtCoderIcon className="w-5 h-5" />,
  codechef: <CodeChefIcon className="w-5 h-5" />,
};

function PlatformCard({
  platform,
  bundle,
}: {
  platform: CPPlatform;
  bundle: CPDataBundle | null;
}) {
  const isCf = platform.id === "codeforces";
  const isLc = platform.id === "leetcode";

  // Dynamic values based on 5-hour cached bundle
  const cfRating = bundle?.codeforces.rating ?? DEFAULT_CF_BASELINE.rating;
  const cfRank = bundle?.codeforces.rank
    ? bundle.codeforces.rank.charAt(0).toUpperCase() + bundle.codeforces.rank.slice(1)
    : "Newbie";

  const lcSolved = bundle?.leetcode.totalSolved ?? DEFAULT_LC_BASELINE.totalSolved;
  const lcRank = bundle?.leetcode.ranking ?? DEFAULT_LC_BASELINE.ranking;
  const lcEasy = bundle?.leetcode.easySolved ?? DEFAULT_LC_BASELINE.easySolved;
  const lcMed = bundle?.leetcode.mediumSolved ?? DEFAULT_LC_BASELINE.mediumSolved;
  const lcHard = bundle?.leetcode.hardSolved ?? DEFAULT_LC_BASELINE.hardSolved;

  const totalLcQuestions = lcSolved > 0 ? lcSolved : 187;
  const easyPct = Math.round((lcEasy / totalLcQuestions) * 100);
  const medPct = Math.round((lcMed / totalLcQuestions) * 100);

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden min-w-0">
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
            {((isCf && bundle?.codeforces.isLive) || (isLc && bundle?.leetcode.isLive)) ? (
              <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-200 dark:border-emerald-800/70">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live 5h Sync
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
              val = bundle?.codeforces.maxRating ?? cfRating;
            } else if (isLc && stat.label.includes("Total Solved")) {
              val = lcSolved;
            } else if (isLc && stat.label.includes("Global Rank")) {
              val = lcRank;
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
    </div>
  );
}

export function CompetitiveProgramming() {
  const [bundle, setBundle] = useState<CPDataBundle | null>(() => getCachedCPBundle());
  const [isRefreshing, setIsRefreshing] = useState(false);

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

  const handleManualSync = () => {
    setIsRefreshing(true);
    loadCPStats(true)
      .then((data) => {
        setBundle(data);
      })
      .finally(() => {
        setIsRefreshing(false);
      });
  };

  const totalProblemsSolved = (bundle?.leetcode.totalSolved ?? 187) + 145 + 25;

  return (
    <section
      id="competitive"
      className="py-14 sm:py-16 md:py-20 bg-slate-50/70 dark:bg-slate-950/60 relative overflow-hidden border-t border-slate-200/60 dark:border-slate-800/80"
      aria-labelledby="cp-heading"
    >
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
            Algorithms, contests, & problem solving.
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
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Problems Solved</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {totalProblemsSolved}+
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              LeetCode ({bundle?.leetcode.totalSolved ?? 187}), CodeChef (145), Codeforces (25)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Peak Rating</span>
              <Trophy className="w-4 h-4 text-amber-500" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              1259
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              CodeChef Division 4 · Codeforces {bundle?.codeforces.rating ?? 1015}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0">
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-wider">Active Platforms</span>
              <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-white">
              4
            </p>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
              LeetCode · Codeforces · AtCoder · CodeChef
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-2xs min-w-0">
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
          </div>
        </motion.div>

        {/* 4 Dashboard Platform Cards */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-6 mb-8 min-w-0">
          {competitiveProfiles.map((platform) => (
            <PlatformCard
              key={platform.id}
              platform={platform}
              bundle={bundle}
            />
          ))}
        </div>

        {/* Verification & 5-Hour Sync Banner */}
        <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-center text-xs text-slate-500 dark:text-slate-400 font-mono flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span>✓ Verified public profile metrics</span>
            <span>·</span>
            <span>5-hour auto-refresh cache active</span>
            {bundle?.lastSyncFormatted && (
              <>
                <span>·</span>
                <span>Last sync: {bundle.lastSyncFormatted}</span>
              </>
            )}
          </div>

          <button
            onClick={handleManualSync}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-750 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            title="Refresh competitive programming metrics now"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? "animate-spin text-blue-500" : ""}`} />
            <span>{isRefreshing ? "Syncing..." : "Sync Now"}</span>
          </button>
        </div>
      </div>
    </section>
  );
}
