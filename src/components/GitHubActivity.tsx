import { motion, useInView } from "motion/react";
import { useRef, useState, useMemo } from "react";
import {
  ExternalLink,
  BookOpen,
  GitCommit,
  Users,
  FolderGit2,
  Calendar,
  AlertCircle,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import { GitHubIcon } from "./icons";
import { config } from "../data/portfolio";
import { SectionWatermark } from "./MotionPrimitives";
import {
  processRollingContributions,
  type RollingContributionData,
  type TimeRange,
  type MonthLabel,
} from "../services/github";
import { useGitHubSnapshot } from "../hooks/useGitHubSnapshot";

function formatDisplayDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  const date = new Date(Date.UTC(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10)));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function getSquareColor(level: number): string {
  switch (level) {
    case 1:
      return "bg-blue-200 dark:bg-blue-900/80 border-blue-300 dark:border-blue-800";
    case 2:
      return "bg-blue-400 dark:bg-blue-600 border-blue-500 dark:border-blue-500";
    case 3:
      return "bg-blue-600 dark:bg-blue-500 border-blue-600 dark:border-blue-400";
    case 4:
      return "bg-blue-800 dark:bg-blue-400 border-blue-900 dark:border-blue-300";
    default:
      return "bg-slate-100 dark:bg-slate-800/80 border-slate-200/60 dark:border-slate-700/60";
  }
}

export function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const { snapshot, loading, stale, refresh } = useGitHubSnapshot();
  const user = snapshot?.profile ?? null;
  const userLoading = loading && !user;
  const rawDays = snapshot?.contributions?.days ?? null;
  const contribState: "loading" | "success" | "error" =
    rawDays && rawDays.length > 0 ? "success" : loading ? "loading" : "error";

  // Interactive controls state
  const [range, setRange] = useState<TimeRange>("3m");
  const [offsetWeeks, setOffsetWeeks] = useState(0);

  const handleRetry = () => {
    refresh();
  };

  // Derived processed data based on range and offsetWeeks
  const currentContributions = useMemo<RollingContributionData | null>(() => {
    if (!rawDays) return null;
    return processRollingContributions(rawDays, range, offsetWeeks);
  }, [rawDays, range, offsetWeeks]);

  // Step size when paging through history: 13 weeks for 3m, 26 weeks for 6m, 52 weeks for 12m
  const stepSize = range === "3m" ? 13 : range === "6m" ? 26 : 52;

  const handlePrev = () => {
    if (currentContributions?.canGoPrev) {
      setOffsetWeeks((prev) => prev + stepSize);
    }
  };

  const handleNext = () => {
    if (currentContributions?.canGoNext) {
      setOffsetWeeks((prev) => Math.max(0, prev - stepSize));
    }
  };

  const handleResetToToday = () => {
    setOffsetWeeks(0);
  };

  const handleRangeChange = (newRange: TimeRange) => {
    setRange(newRange);
    setOffsetWeeks(0); // Reset to today when switching scale
  };

  // Month labels filtering based on view density
  const displayMonthLabels = useMemo(() => {
    if (!currentContributions?.monthLabels) return [];
    const minSpacing = range === "12m" ? 4 : range === "6m" ? 3 : 2;
    const result: MonthLabel[] = [];
    for (const m of currentContributions.monthLabels) {
      const prev = result[result.length - 1];
      if (!prev || m.weekIndex - prev.weekIndex >= minSpacing) {
        if (currentContributions.weeks.length - m.weekIndex >= 1) {
          result.push(m);
        }
      }
    }
    return result;
  }, [currentContributions, range]);

  return (
    <section
      id="github"
      ref={ref}
      className="py-14 sm:py-16 md:py-20 bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800/80 relative overflow-hidden"
      aria-labelledby="github-heading"
    >
      <SectionWatermark text="07 // GITHUB" align="right" direction="left" />
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10 min-w-0">
        {/* Header */}
        <div className="max-w-xl mb-8 sm:mb-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-3"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800/70 uppercase">
              <GitHubIcon className="w-3.5 h-3.5" />
              Developer Activity
            </span>
          </motion.div>

          <motion.h2
            id="github-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white tracking-tight leading-[1.15] mb-3"
          >
            My GitHub activity.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed"
          >
            Public code activity, repository development, and continuous commits on GitHub.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-stretch min-w-0 w-full">
          {/* Left Column: Live GitHub Stats Card (5 cols) */}
          <div className="lg:col-span-5 min-w-0 w-full flex">
            {userLoading ? (
              <div className="space-y-3 w-full">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 animate-pulse"
                  />
                ))}
              </div>
            ) : user ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, ease: "easeOut" }}
                className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between w-full h-full space-y-5"
              >
                <div>
                  {/* Profile Header */}
                  <div className="flex items-center gap-3.5 pb-4 border-b border-slate-100 dark:border-slate-800">
                    <img
                      src={user.avatar_url}
                      alt={`${user.name || "Sivaharish"}'s GitHub Avatar`}
                      width={52}
                      height={52}
                      loading="lazy"
                      decoding="async"
                      className="w-13 h-13 rounded-2xl border-2 border-white dark:border-slate-800 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 object-cover"
                    />
                    <div>
                      <h3 className="font-bold text-slate-900 dark:text-white text-base leading-tight">
                        {user.name || "Sivaharish"}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        @{user.login}
                      </p>
                      {user.bio && (
                        <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 line-clamp-1">
                          {user.bio}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Stats Counters */}
                  <div className="grid grid-cols-3 gap-2.5 mt-5">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <FolderGit2 className="w-4 h-4 text-blue-600 dark:text-blue-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {user.public_repos}
                      </p>
                      <p className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        Repos
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {user.followers}
                      </p>
                      <p className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        Followers
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-center">
                      <GitCommit className="w-4 h-4 text-purple-600 dark:text-purple-400 mx-auto mb-1" />
                      <p className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                        {user.following}
                      </p>
                      <p className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 mt-0.5">
                        Following
                      </p>
                    </div>
                  </div>
                </div>

                {/* Button */}
                <motion.a
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer mt-4"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  View Complete Profile on GitHub
                  <ExternalLink className="w-3 h-3 text-slate-400 dark:text-slate-600" />
                </motion.a>
              </motion.div>
            ) : (
              /* Profile Card when user API is unavailable */
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-sm text-center flex flex-col justify-between w-full h-full">
                <div>
                  <GitHubIcon className="w-8 h-8 text-slate-700 dark:text-slate-300 mx-auto mb-3" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    github.com/sivaharish31
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">
                    Check out repositories, code commits, and open-source activities.
                  </p>
                </div>
                <a
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-950 dark:hover:bg-slate-100 text-xs font-semibold rounded-xl"
                >
                  Open GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Visual Contribution Chart (7 cols) */}
          <div className="lg:col-span-7 min-w-0 w-full flex">
            <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col justify-between w-full h-full space-y-4 min-w-0">
              {/* Header with Title and Range Switcher */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Interactive Activity Heatmap
                  </h4>
                </div>

                {/* Range Pills (3M, 6M, 12M) */}
                <div className="inline-flex items-center p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-xs font-mono">
                  {(["3m", "6m", "12m"] as TimeRange[]).map((r) => {
                    const isSelected = range === r;
                    return (
                      <button
                        key={r}
                        onClick={() => handleRangeChange(r)}
                        className={`relative px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                          isSelected
                            ? "text-blue-600 dark:text-blue-400 font-bold"
                            : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                        }`}
                      >
                        {isSelected && (
                          <motion.span
                            layoutId="gh-range-pill"
                            className="absolute inset-0 bg-white dark:bg-slate-900 rounded-lg shadow-2xs"
                            transition={{ type: "spring", stiffness: 450, damping: 32 }}
                          />
                        )}
                        <span className="relative z-10">{r === "3m" ? "3M" : r === "6m" ? "6M" : "1Y"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Navigation Controls Bar */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
                {/* Period Indicator */}
                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {offsetWeeks === 0 ? "Current Period" : "Previous Period"}
                  </span>
                    {offsetWeeks === 0 && (
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] px-1.5 py-0.5 rounded font-semibold border ${
                        stale
                          ? "bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/70"
                          : "bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/70"
                      }`}
                      title={
                        snapshot?.syncedAt
                          ? `Last synced: ${new Date(snapshot.syncedAt).toLocaleString()}`
                          : undefined
                      }
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          stale ? "bg-amber-500" : "bg-emerald-500 animate-pulse"
                        }`}
                      />
                      {stale ? "Stale Cache" : "Latest"}
                    </span>
                  )}
                </div>

                {/* Pagination Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={handlePrev}
                    disabled={!currentContributions?.canGoPrev}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="View earlier period"
                    aria-label="Previous period"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  {offsetWeeks > 0 && (
                    <button
                      onClick={handleResetToToday}
                      className="inline-flex items-center gap-1 px-2 py-1 text-[11px] rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      title="Reset to today"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>Today</span>
                    </button>
                  )}

                  <button
                    onClick={handleNext}
                    disabled={!currentContributions?.canGoNext}
                    className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                    title="View later period"
                    aria-label="Next period"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Rolling Heatmap Grid View */}
              <div className="overflow-x-auto max-w-full rounded-xl p-2.5 sm:p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-center min-h-[145px]">
                {contribState === "loading" && (
                  <div className="h-[120px] w-full flex items-center justify-center">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Loading GitHub contributions…</span>
                    </div>
                  </div>
                )}

                {contribState === "error" && (
                  <div className="h-[120px] w-full flex flex-col items-center justify-center text-center p-3">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                      <AlertCircle className="w-4 h-4 text-amber-500" />
                      <span>Contribution data temporarily unavailable</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mb-3 max-w-xs">
                      Live sync could not reach the contributions service. No stale or fabricated data is shown.
                    </p>
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-750 transition-colors shadow-2xs cursor-pointer"
                    >
                      <RefreshCw className="w-3 h-3 text-slate-500" />
                      Retry Connection
                    </button>
                  </div>
                )}

                {contribState === "success" && currentContributions && (
                  <div
                    className={`w-max mx-auto py-1 ${
                      range === "12m"
                        ? "[--cell-size:9px] [--cell-gap:2px] sm:[--cell-size:10px] sm:[--cell-gap:2.5px]"
                        : range === "6m"
                        ? "[--cell-size:10px] [--cell-gap:2.5px] sm:[--cell-size:11px] sm:[--cell-gap:3px]"
                        : "[--cell-size:10px] [--cell-gap:2.5px] min-[400px]:[--cell-size:11px] min-[400px]:[--cell-gap:3px] sm:[--cell-size:12px] sm:[--cell-gap:3.5px] md:[--cell-size:13px] md:[--cell-gap:3.5px]"
                    }`}
                  >
                    {/* Top Row: Spacing spacer + Aligned Month Labels */}
                    <div className="flex items-center mb-1.5">
                      {/* Left spacer aligning with the weekday labels column */}
                      <div className="w-5 sm:w-6 shrink-0 pr-1.5" />

                      {/* Month Labels container aligned with week columns */}
                      <div className="relative h-4 flex-1 select-none">
                        {displayMonthLabels.map((m) => (
                          <span
                            key={`${m.month}-${m.weekIndex}`}
                            style={{
                              left: `calc(${m.weekIndex} * (var(--cell-size) + var(--cell-gap)))`,
                            }}
                            className="absolute text-[10px] sm:text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 leading-none whitespace-nowrap"
                          >
                            {m.month}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Main Row: Weekday column + Week contribution cells */}
                    <div className="flex items-start">
                      {/* Weekday column (Sun to Sat) */}
                      <div
                        className="w-5 sm:w-6 shrink-0 flex flex-col text-[9px] sm:text-[10px] font-mono text-slate-400 dark:text-slate-500 text-right pr-1.5 select-none"
                        style={{ gap: "var(--cell-gap)" }}
                      >
                        {[
                          { label: "", show: false },
                          { label: "Mon", show: true },
                          { label: "", show: false },
                          { label: "Wed", show: true },
                          { label: "", show: false },
                          { label: "Fri", show: true },
                          { label: "", show: false },
                        ].map((d, i) => (
                          <div
                            key={i}
                            style={{ height: "var(--cell-size)" }}
                            className="flex items-center justify-end leading-none"
                          >
                            {d.show ? d.label : null}
                          </div>
                        ))}
                      </div>

                      {/* Weeks Columns */}
                      <div
                        className="flex"
                        style={{ gap: "var(--cell-gap)" }}
                      >
                        {currentContributions.weeks.map((week, wIdx) => (
                          <div
                            key={wIdx}
                            className="flex flex-col"
                            style={{ gap: "var(--cell-gap)" }}
                          >
                            {[0, 1, 2, 3, 4, 5, 6].map((dayIdx) => {
                              const day = week.days[dayIdx];
                              if (!day) {
                                return (
                                  <div
                                    key={dayIdx}
                                    style={{
                                      width: "var(--cell-size)",
                                      height: "var(--cell-size)",
                                    }}
                                    className="rounded-[2px] bg-transparent"
                                  />
                                );
                              }

                              const formatted = formatDisplayDate(day.date);
                              const title = `${day.count} contribution${
                                day.count === 1 ? "" : "s"
                              } on ${formatted}`;

                              return (
                                <div
                                  key={dayIdx}
                                  title={title}
                                  tabIndex={0}
                                  aria-label={title}
                                  style={{
                                    width: "var(--cell-size)",
                                    height: "var(--cell-size)",
                                  }}
                                  className={`rounded-[2px] border transition-transform hover:scale-125 focus:scale-125 focus:outline-hidden cursor-pointer ${getSquareColor(
                                    day.level
                                  )}`}
                                />
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Details & Legend */}
              <div className="flex flex-wrap items-center justify-between gap-2.5 text-xs text-slate-600 dark:text-slate-400 font-mono pt-1">
                <span className="font-medium text-[11px] sm:text-xs">
                  {contribState === "success" && currentContributions
                    ? `${currentContributions.totalContributions} contributions in this view`
                    : "Activity Heatmap"}
                </span>

                <div className="flex items-center gap-1 text-[10px]">
                  <span className="text-slate-400 mr-0.5">Less</span>
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-slate-100 dark:bg-slate-800/80 border border-slate-200/60 dark:border-slate-700/60" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-200 dark:bg-blue-900/80 border border-blue-300 dark:border-blue-800" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-400 dark:bg-blue-600 border border-blue-500 dark:border-blue-500" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-600 dark:bg-blue-500 border border-blue-600 dark:border-blue-400" />
                  <span className="w-2.5 h-2.5 rounded-[2px] bg-blue-800 dark:bg-blue-400 border border-blue-900 dark:border-blue-300" />
                  <span className="text-slate-400 ml-0.5">More</span>
                </div>
              </div>

              {contribState === "success" && currentContributions && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center pt-2 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-1.5">
                  <span>Window:</span>
                  <span className="font-semibold text-slate-700 dark:text-slate-300">
                    {formatDisplayDate(currentContributions.startDate)} – {formatDisplayDate(currentContributions.endDate)}
                  </span>
                  <span>({range === "3m" ? "3 Months" : range === "6m" ? "6 Months" : "1 Year"})</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
