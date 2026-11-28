import { useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ExternalLink,
  GitPullRequest,
  CheckCircle2,
  Circle,
  XCircle,
  GitBranch,
  HelpCircle,
  RefreshCw,
  Calendar,
} from "lucide-react";
import { contributions, type Contribution } from "../data/portfolio";
import {
  type GitHubAuthoredPR,
  type PRStatus,
} from "../services/github";
import { useGitHubSnapshot } from "../hooks/useGitHubSnapshot";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { gsap } from "../lib/animations";
import { MaskedHeading, SpotlightCard } from "./MotionPrimitives";

const orgThemes: Record<
  string,
  { bg: string; text: string; border: string; accentGlow: string; spotlight: string; dot: string }
> = {
  netflix: {
    bg: "bg-red-50 dark:bg-red-950/50",
    text: "text-red-700 dark:text-red-300",
    border: "border-red-200 dark:border-red-900/60",
    accentGlow: "hover:border-red-400 dark:hover:border-red-600 hover:shadow-red-500/10",
    spotlight: "rgba(239, 68, 68, 0.14)",
    dot: "bg-red-500 ring-red-500/20",
  },
  microsoft: {
    bg: "bg-sky-50 dark:bg-sky-950/50",
    text: "text-sky-700 dark:text-sky-300",
    border: "border-sky-200 dark:border-sky-900/60",
    accentGlow: "hover:border-sky-400 dark:hover:border-sky-600 hover:shadow-sky-500/10",
    spotlight: "rgba(14, 165, 233, 0.14)",
    dot: "bg-sky-500 ring-sky-500/20",
  },
  google: {
    bg: "bg-blue-50 dark:bg-blue-950/50",
    text: "text-blue-700 dark:text-blue-300",
    border: "border-blue-200 dark:border-blue-900/60",
    accentGlow: "hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-blue-500/10",
    spotlight: "rgba(59, 130, 246, 0.15)",
    dot: "bg-blue-500 ring-blue-500/20",
  },
  aws: {
    bg: "bg-amber-50 dark:bg-amber-950/50",
    text: "text-amber-800 dark:text-amber-300",
    border: "border-amber-200 dark:border-amber-900/60",
    accentGlow: "hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-amber-500/10",
    spotlight: "rgba(245, 158, 11, 0.14)",
    dot: "bg-amber-500 ring-amber-500/20",
  },
  ibm: {
    bg: "bg-indigo-50 dark:bg-indigo-950/50",
    text: "text-indigo-800 dark:text-indigo-300",
    border: "border-indigo-200 dark:border-indigo-900/60",
    accentGlow: "hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-indigo-500/10",
    spotlight: "rgba(99, 102, 241, 0.14)",
    dot: "bg-indigo-500 ring-indigo-500/20",
  },
  elastic: {
    bg: "bg-teal-50 dark:bg-teal-950/50",
    text: "text-teal-800 dark:text-teal-300",
    border: "border-teal-200 dark:border-teal-900/60",
    accentGlow: "hover:border-teal-400 dark:hover:border-teal-600 hover:shadow-teal-500/10",
    spotlight: "rgba(20, 184, 166, 0.14)",
    dot: "bg-teal-500 ring-teal-500/20",
  },
  uber: {
    bg: "bg-slate-100 dark:bg-slate-800/80",
    text: "text-slate-800 dark:text-slate-200",
    border: "border-slate-300 dark:border-slate-700",
    accentGlow: "hover:border-slate-400 dark:hover:border-slate-500 hover:shadow-slate-500/10",
    spotlight: "rgba(100, 116, 139, 0.14)",
    dot: "bg-slate-600 ring-slate-500/20",
  },
};

export interface LivePRState {
  status: PRStatus;
  loading: boolean;
}

function StatusBadge({ state }: { state?: LivePRState }) {
  if (!state || state.loading) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-700 animate-pulse">
        <Circle className="w-2 h-2 fill-slate-400" />
        Syncing…
      </span>
    );
  }

  if (state.status === "merged") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold rounded-full border border-purple-200 dark:border-purple-800/70 shadow-2xs">
        <CheckCircle2 className="w-3 h-3 text-purple-600 dark:text-purple-400" />
        Merged
      </span>
    );
  }

  if (state.status === "open") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold rounded-full border border-emerald-200 dark:border-emerald-800/70 shadow-2xs">
        <GitPullRequest className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
        Open
      </span>
    );
  }

  if (state.status === "closed") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-full border border-slate-200 dark:border-slate-700">
        <XCircle className="w-3 h-3 text-slate-500 dark:text-slate-400" />
        Closed
      </span>
    );
  }

  return (
    <span
      title="Live status unavailable due to public API rate limits or network issues"
      className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-400 text-xs font-medium rounded-full border border-dashed border-slate-300 dark:border-slate-700"
    >
      <HelpCircle className="w-3 h-3 text-slate-400" />
      Snapshot
    </span>
  );
}

function ContributionCard({
  contribution,
  liveState,
  index,
}: {
  contribution: Contribution;
  liveState?: LivePRState;
  index: number;
}) {
  const orgKey = contribution.org.toLowerCase();
  const theme =
    orgThemes[orgKey] || {
      bg: "bg-slate-50 dark:bg-slate-800",
      text: "text-slate-700 dark:text-slate-300",
      border: "border-slate-200 dark:border-slate-700",
      accentGlow: "hover:border-slate-300 dark:hover:border-slate-700",
      spotlight: "rgba(59, 130, 246, 0.12)",
      dot: "bg-blue-500 ring-blue-500/20",
    };

  return (
    <motion.div
      initial={{ opacity: 0, x: -16, y: 18 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.55, delay: Math.min(index * 0.06, 0.28), ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-6 sm:pl-8 h-full min-w-0 w-full"
    >
      {/* Timeline Node Connector */}
      <span
        className={`absolute left-[-5px] top-7 w-2.5 h-2.5 rounded-full ${theme.dot} ring-4 shadow-sm`}
        aria-hidden="true"
      />
      <SpotlightCard spotlightColor={theme.spotlight} tiltStrength={4} className="rounded-2xl h-full">
        <motion.a
          href={contribution.prUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          aria-label={`View Pull Request #${contribution.prNumber} on GitHub: ${contribution.prTitle} (${contribution.orgDisplayName})`}
          className={`p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/85 border border-slate-200 dark:border-slate-800 hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full min-w-0 cursor-pointer ${theme.accentGlow}`}
        >
          <div>
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3.5">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <span
                  className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border ${theme.bg} ${theme.text} ${theme.border} shadow-2xs flex-shrink-0`}
                >
                  {contribution.orgLogoUrl ? (
                    <img
                      src={contribution.orgLogoUrl}
                      alt={`${contribution.orgDisplayName} logo`}
                      width={14}
                      height={14}
                      loading="lazy"
                      decoding="async"
                      className="w-3.5 h-3.5 object-contain"
                    />
                  ) : (
                    <GitBranch className="w-3.5 h-3.5 shrink-0" />
                  )}
                  <span>{contribution.orgDisplayName}</span>
                </span>
                <span className="text-xs font-mono text-slate-500 dark:text-slate-400 truncate">
                  {contribution.repoOwner}/{contribution.repo} #{contribution.prNumber}
                </span>
              </div>

              <StatusBadge state={liveState} />
            </div>

            {/* Title */}
            <h3 className="font-bold text-base text-slate-900 dark:text-white leading-snug mb-2.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors break-words">
              {contribution.prTitle}
            </h3>

            {/* Technical Description */}
            <p className="text-slate-600 dark:text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
              {contribution.prDescription}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {contribution.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 text-[11px] font-mono border border-slate-200 dark:border-slate-700/60"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3.5 border-t border-slate-100 dark:border-slate-800 gap-2">
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 font-mono min-w-0">
              <span className="flex items-center gap-1">
                <GitPullRequest className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                {contribution.language}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px]">
                <Calendar className="w-3 h-3 text-slate-400 dark:text-slate-500" />
                {contribution.updatedAt}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors shrink-0">
              <span>View PR</span>
              <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>
          </div>
        </motion.a>
      </SpotlightCard>
    </motion.div>
  );
}

export function OpenSource() {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState<"all" | "merged" | "open" | "closed">("all");
  const { snapshot, loading, source, stale, rateLimited, refresh } = useGitHubSnapshot();
  const livePRs = useMemo(() => snapshot?.pullRequests ?? [], [snapshot]);
  const syncMeta = {
    loading,
    fromCache: source === "cache",
    rateLimited,
    stale,
    syncedAt: snapshot?.syncedAt ?? null,
  };

  useScrollReveal(sectionRef, () => {
    gsap.fromTo(
      ".oss-timeline-spine",
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".oss-timeline-container",
          start: "top 75%",
          end: "bottom 70%",
          scrub: true,
        },
      }
    );

    gsap.fromTo(
      ".oss-watermark",
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

  // Merge verified static metadata with live GitHub API statuses & dates
  const mergedContributions = useMemo(() => {
    const liveMap = new Map<string, GitHubAuthoredPR>();
    for (const pr of livePRs) {
      liveMap.set(pr.html_url.toLowerCase(), pr);
    }

    return contributions.map((c) => {
      const live = liveMap.get(c.prUrl.toLowerCase());
      if (!live) return c;
      return {
        ...c,
        prTitle: live.title || c.prTitle,
        status: live.state,
        updatedAt: live.updated_at.slice(0, 10),
      };
    });
  }, [livePRs]);

  const filteredContributions = mergedContributions.filter((c) => {
    if (filter === "merged") return c.status === "merged";
    if (filter === "open") return c.status === "open";
    if (filter === "closed") return c.status === "closed";
    return true;
  });

  return (
    <section
      id="opensource"
      ref={sectionRef}
      className="py-16 sm:py-20 md:py-24 bg-white dark:bg-slate-900 relative overflow-hidden"
      aria-labelledby="oss-heading"
    >
      {/* Editorial Parallax Watermark */}
      <div
        className="oss-watermark block absolute top-6 sm:top-8 lg:top-10 left-0 text-[3.25rem] sm:text-[5.5rem] lg:text-[8rem] font-black tracking-tighter text-slate-900/[0.065] dark:text-white/[0.03] select-none pointer-events-none whitespace-nowrap"
        aria-hidden="true"
      >
        04 // OPEN SOURCE
      </div>

      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase mb-3">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Open-Source Contributions</span>
            </div>

            <h2
              id="oss-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3"
            >
              <MaskedHeading>Contributing beyond my own projects.</MaskedHeading>
            </h2>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              Verified pull requests to repositories maintained by{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">Netflix</strong>,{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">Microsoft</strong>,{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">AWS</strong>,{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">IBM</strong>,{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">Elastic</strong>,{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">Uber</strong>, and{" "}
              <strong className="text-slate-900 dark:text-white font-semibold">Google</strong>.
            </p>
          </motion.div>

          {/* Filter Pills + Sync Control */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
              {(["all", "merged", "open", "closed"] as const).map((tab) => {
                const isSelected = filter === tab;
                return (
                  <button
                    type="button"
                    key={tab}
                    onClick={() => setFilter(tab)}
                    className={`relative px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-colors cursor-pointer whitespace-nowrap ${
                      isSelected
                        ? "text-slate-950 dark:text-white font-bold"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                    }`}
                  >
                    {isSelected && (
                      <motion.span
                        layoutId="oss-active-filter"
                        className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10">{tab}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={refresh}
              disabled={syncMeta.loading}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer disabled:opacity-50"
              title={
                syncMeta.syncedAt
                  ? `Last synced: ${new Date(syncMeta.syncedAt).toLocaleString()}`
                  : "Refresh live PR status"
              }
              aria-label="Refresh live PR status"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${syncMeta.loading ? "animate-spin" : ""}`} />
              <span className="hidden sm:inline">
                {syncMeta.loading
                  ? "Syncing"
                  : syncMeta.stale || syncMeta.rateLimited
                  ? "Stale Snapshot"
                  : syncMeta.fromCache
                  ? "Cached"
                  : "Synced 30m"}
              </span>
            </button>
          </div>
        </div>

        {/* Organization Brand Logo Pills (Authentic Local Assets Only) */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { name: "Netflix", logo: "/logos/netflix.svg" },
            { name: "Microsoft", logo: "/logos/microsoft.svg" },
            { name: "Google", logo: "/logos/google.svg" },
            { name: "AWS", logo: "/logos/aws.svg" },
            { name: "IBM", logo: "/logos/ibm.svg" },
          ].map((org) => (
            <motion.span
              key={org.name}
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.15 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800/80 rounded-xl text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-2xs cursor-default"
            >
              <img
                src={org.logo}
                alt={`${org.name} logo`}
                width={14}
                height={14}
                loading="lazy"
                decoding="async"
                className="w-3.5 h-3.5 object-contain"
              />
              <span>{org.name}</span>
            </motion.span>
          ))}
        </div>

        {/* Animated Contribution Timeline & Cards */}
        <div className="oss-timeline-container relative mb-10 ml-1.5 sm:ml-2 min-w-0">
          <div
            className="absolute left-0 top-0 bottom-0 w-[2px] bg-slate-200/80 dark:bg-slate-800"
            aria-hidden="true"
          />
          <div
            className="oss-timeline-spine absolute left-0 top-0 bottom-0 w-[2px] origin-top bg-gradient-to-b from-blue-600 via-purple-500 to-emerald-500"
            aria-hidden="true"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid md:grid-cols-2 gap-6 min-w-0"
            >
              {filteredContributions.map((contribution, idx) => (
                <ContributionCard
                  key={contribution.id}
                  contribution={contribution}
                  liveState={{
                    status: contribution.status,
                    loading: syncMeta.loading && !syncMeta.fromCache && livePRs.length === 0,
                  }}
                  index={idx}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
