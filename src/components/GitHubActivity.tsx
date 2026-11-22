import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState, useCallback, useMemo } from "react";
import {
  ExternalLink,
  BookOpen,
  GitCommit,
  Users,
  FolderGit2,
  Calendar,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { GitHubIcon } from "./icons";
import { config } from "../data/portfolio";
import {
  fetchGitHubUser,
  fetchThreeMonthContributions,
  type GitHubUser,
  type RollingThreeMonthData,
  type MonthLabel,
} from "../services/github";

function formatDisplayDate(dateStr: string) {
  const [y, m, d] = dateStr.split("-");
  const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, parseInt(d, 10));
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
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

  const [user, setUser] = useState<GitHubUser | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  const [contributions, setContributions] =
    useState<RollingThreeMonthData | null>(null);
  const [contribState, setContribState] = useState<
    "loading" | "success" | "error"
  >("loading");

  const activeAbortRef = useRef<AbortController | null>(null);

  const fetchContributions = useCallback(() => {
    if (activeAbortRef.current) {
      activeAbortRef.current.abort();
    }
    const controller = new AbortController();
    activeAbortRef.current = controller;

    fetchThreeMonthContributions("sivaharish31", controller.signal).then(
      (data) => {
        if (controller.signal.aborted) return;
        if (data) {
          setContributions(data);
          setContribState("success");
        } else {
          setContributions(null);
          setContribState("error");
        }
      }
    );
  }, []);

  const handleRetry = () => {
    setContribState("loading");
    fetchContributions();
  };

  useEffect(() => {
    const userController = new AbortController();
    fetchGitHubUser("sivaharish31", userController.signal).then((data) => {
      if (userController.signal.aborted) return;
      setUser(data);
      setUserLoading(false);
    });

    fetchContributions();

    return () => {
      userController.abort();
      if (activeAbortRef.current) {
        activeAbortRef.current.abort();
      }
    };
  }, [fetchContributions]);

  // Precise month labels filtering: avoids visual collision while maintaining accurate column alignment
  const displayMonthLabels = useMemo(() => {
    if (!contributions?.monthLabels) return [];
    const result: MonthLabel[] = [];
    for (const m of contributions.monthLabels) {
      const prev = result[result.length - 1];
      // Keep label if it's the first one, or at least 3 week columns after the previous label
      if (!prev || m.weekIndex - prev.weekIndex >= 3) {
        // Ensure label doesn't hang off the far right edge
        if (contributions.weeks.length - m.weekIndex >= 1) {
          result.push(m);
        }
      }
    }
    return result;
  }, [contributions]);

  return (
    <section
      id="github"
      ref={ref}
      className="py-14 sm:py-16 md:py-20 bg-slate-50/60 dark:bg-slate-950/60 border-t border-slate-200/60 dark:border-slate-800/80 relative overflow-hidden"
      aria-labelledby="github-heading"
    >
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
              {/* Header with Badges */}
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Rolling 90-Day Contribution Heatmap
                  </h4>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/70 font-medium">
                    90 Days
                  </span>
                  {contribState === "success" && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800/70 font-medium">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Live Sync
                    </span>
                  )}
                </div>
              </div>

              {/* Rolling 3-Month Heatmap Visualization */}
              <div className="overflow-x-auto max-w-full rounded-xl p-2.5 sm:p-4 bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 flex flex-col justify-center min-h-[145px]">
                {contribState === "loading" && (
                  <div className="h-[120px] w-full flex items-center justify-center">
                    <div className="flex items-center gap-2 text-xs font-mono text-slate-500 dark:text-slate-400">
                      <Calendar className="w-4 h-4 animate-spin text-blue-500" />
                      <span>Loading recent 3-month contributions…</span>
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

                {contribState === "success" && contributions && (
                  <div className="w-max mx-auto py-1 [--cell-size:10px] [--cell-gap:2.5px] min-[400px]:[--cell-size:11px] min-[400px]:[--cell-gap:3px] sm:[--cell-size:12px] sm:[--cell-gap:3.5px] md:[--cell-size:13px] md:[--cell-gap:3.5px]">
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
                            className="absolute text-[10px] sm:text-[11px] font-mono font-semibold text-slate-600 dark:text-slate-400 leading-none"
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
                        {contributions.weeks.map((week, wIdx) => (
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
                                  style={{
                                    width: "var(--cell-size)",
                                    height: "var(--cell-size)",
                                  }}
                                  className={`rounded-[2px] border transition-transform hover:scale-125 cursor-pointer ${getSquareColor(
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
                  {contribState === "success" && contributions
                    ? `${contributions.totalContributions} contributions in the last 3 months`
                    : "Rolling 90-day activity"}
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

              {contribState === "success" && contributions && (
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono text-center pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  Rolling window: {formatDisplayDate(contributions.startDate)} –{" "}
                  {formatDisplayDate(contributions.endDate)}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
