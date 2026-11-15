import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ExternalLink, GitPullRequest, CheckCircle2, Circle, XCircle, Globe, GitBranch } from "lucide-react";
import { contributions, communityLinks, type Contribution } from "../data/portfolio";
import { fetchPRStatus, type PRStatus } from "../services/github";

const orgThemes: Record<
  string,
  { bg: string; text: string; border: string; accentGlow: string }
> = {
  netflix: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    accentGlow: "hover:border-red-300 hover:shadow-red-500/5",
  },
  microsoft: {
    bg: "bg-sky-50",
    text: "text-sky-700",
    border: "border-sky-200",
    accentGlow: "hover:border-sky-300 hover:shadow-sky-500/5",
  },
  google: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    accentGlow: "hover:border-blue-300 hover:shadow-blue-500/5",
  },
  aws: {
    bg: "bg-amber-50",
    text: "text-amber-800",
    border: "border-amber-200",
    accentGlow: "hover:border-amber-300 hover:shadow-amber-500/5",
  },
  ibm: {
    bg: "bg-indigo-50",
    text: "text-indigo-800",
    border: "border-indigo-200",
    accentGlow: "hover:border-indigo-300 hover:shadow-indigo-500/5",
  },
};

function StatusBadge({ status }: { status: PRStatus }) {
  if (status === "merged") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-200 shadow-2xs">
        <CheckCircle2 className="w-3 h-3 text-purple-600" />
        Merged
      </span>
    );
  }
  if (status === "open") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 shadow-2xs">
        <GitPullRequest className="w-3 h-3 text-emerald-600" />
        Open
      </span>
    );
  }
  if (status === "closed") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-full border border-slate-200">
        <XCircle className="w-3 h-3 text-slate-500" />
        Closed
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-slate-100 text-slate-500 text-xs font-medium rounded-full">
      <Circle className="w-2.5 h-2.5" />
      Checking…
    </span>
  );
}

function ContributionCard({
  contribution,
  status,
}: {
  contribution: Contribution;
  status: PRStatus;
}) {
  const orgKey = contribution.org.toLowerCase();
  const theme =
    orgThemes[orgKey] || {
      bg: "bg-slate-50",
      text: "text-slate-700",
      border: "border-slate-200",
      accentGlow: "hover:border-slate-300",
    };

  return (
    <div
      className={`p-6 rounded-2xl bg-white border border-slate-200 hover:shadow-md transition-all group flex flex-col justify-between h-full ${theme.accentGlow}`}
    >
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-xl border ${theme.bg} ${theme.text} ${theme.border} shadow-2xs`}
            >
              <img
                src={contribution.orgLogoUrl}
                alt=""
                className="w-3.5 h-3.5 object-contain"
              />
              {contribution.orgDisplayName}
            </span>
            <span className="text-xs font-mono text-slate-500">
              /{contribution.repo} #{contribution.prNumber}
            </span>
          </div>

          <StatusBadge status={status} />
        </div>

        {/* Title */}
        <h3 className="font-bold text-base text-slate-900 leading-snug mb-2.5 group-hover:text-blue-600 transition-colors">
          {contribution.prTitle}
        </h3>

        {/* Technical Description */}
        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-4">
          {contribution.prDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {contribution.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-lg bg-slate-50 text-slate-600 text-[11px] font-mono border border-slate-200"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-slate-100">
        <span className="text-xs text-slate-500 font-mono flex items-center gap-1.5">
          <GitPullRequest className="w-3.5 h-3.5 text-slate-400" />
          {contribution.language}
        </span>

        <a
          href={contribution.prUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-800 transition-colors"
          aria-label={`View Pull Request on GitHub: ${contribution.prTitle}`}
        >
          <span>View PR</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}

export function OpenSource() {
  const [filter, setFilter] = useState<"all" | "merged" | "open">("all");

  const [statuses, setStatuses] = useState<Record<string, PRStatus>>(() =>
    Object.fromEntries(contributions.map((c) => [c.id, c.status]))
  );

  useEffect(() => {
    contributions.forEach((c) => {
      fetchPRStatus(c.prUrl).then((fetchedStatus) => {
        if (fetchedStatus !== "unknown") {
          setStatuses((prev) => ({ ...prev, [c.id]: fetchedStatus }));
        }
      });
    });
  }, []);

  const filteredContributions = contributions.filter((c) => {
    const currentStatus = statuses[c.id] || c.status;
    if (filter === "merged") return currentStatus === "merged";
    if (filter === "open") return currentStatus === "open";
    return true;
  });

  return (
    <section
      id="opensource"
      className="py-20 md:py-24 bg-white relative overflow-hidden"
      aria-labelledby="oss-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase mb-3">
              <GitBranch className="w-3.5 h-3.5" />
              <span>Open-Source Contributions</span>
            </div>

            <h2
              id="oss-heading"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.15] mb-3"
            >
              Contributing beyond my own projects.
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Selected contributions to repositories maintained by{" "}
              <strong className="text-slate-900 font-semibold">Netflix</strong>,{" "}
              <strong className="text-slate-900 font-semibold">Microsoft</strong>,{" "}
              <strong className="text-slate-900 font-semibold">Google</strong>,{" "}
              <strong className="text-slate-900 font-semibold">AWS</strong>, and{" "}
              <strong className="text-slate-900 font-semibold">IBM</strong>.
            </p>
          </motion.div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200">
            {(["all", "merged", "open"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                  filter === tab
                    ? "bg-white text-slate-950 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Organization Brand Logo Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { name: "Netflix", logo: "/logos/netflix.svg" },
            { name: "Microsoft", logo: "/logos/microsoft.svg" },
            { name: "Google", logo: "/logos/google.svg" },
            { name: "AWS", logo: "/logos/aws.svg" },
            { name: "IBM", logo: "/logos/ibm.svg" },
          ].map((org) => (
            <span
              key={org.name}
              className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-xl text-xs font-semibold text-slate-800 border border-slate-200 shadow-2xs"
            >
              <img src={org.logo} alt="" className="w-3.5 h-3.5 object-contain" />
              <span>{org.name}</span>
            </span>
          ))}
        </div>

        {/* Contributions Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10"
          >
            {filteredContributions.map((contribution) => (
              <ContributionCard
                key={contribution.id}
                contribution={contribution}
                status={statuses[contribution.id] || contribution.status}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* OSCI Community Callout Banner */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-blue-50/70 via-indigo-50/50 to-slate-50 border border-blue-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 bg-white rounded-xl text-blue-600 shadow-2xs border border-blue-100 flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                Open Source Connect India (OSCI)
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Explore additional open-source initiatives and community contribution tracking on my OSCI dashboard.
              </p>
            </div>
          </div>

          <a
            href={communityLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors whitespace-nowrap cursor-pointer"
          >
            <span>Open OSCI Dashboard</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Note */}
        <p className="mt-6 text-xs text-slate-400 text-center font-mono">
          PR statuses are verified against live GitHub API endpoints.
        </p>
      </div>
    </section>
  );
}
