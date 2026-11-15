import { motion, useInView } from "motion/react";
import { useRef, useEffect, useState } from "react";
import { ExternalLink, BookOpen, GitCommit, Users, FolderGit2 } from "lucide-react";
import { GitHubIcon } from "./icons";
import { config } from "../data/portfolio";
import { fetchGitHubUser, type GitHubUser } from "../services/github";

export function GitHubActivity() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubUser("sivaharish31").then((data) => {
      setUser(data);
      setLoading(false);
    });
  }, []);

  return (
    <section
      id="github"
      ref={ref}
      className="py-32 bg-slate-50/60 relative overflow-hidden"
      aria-labelledby="github-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="max-w-xl mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-200 uppercase">
              <GitHubIcon className="w-3.5 h-3.5" />
              Developer Activity
            </span>
          </motion.div>

          <motion.h2
            id="github-heading"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight leading-[1.15] mb-4"
          >
            My GitHub activity.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="text-slate-600 text-sm sm:text-base leading-relaxed"
          >
            Public code activity, repository development, and continuous commits on GitHub.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Live GitHub Stats Card (5 cols) */}
          <div className="lg:col-span-5">
            {loading ? (
              <div className="space-y-3">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="h-20 bg-white rounded-2xl border border-slate-200 animate-pulse"
                  />
                ))}
              </div>
            ) : user ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25, ease: "easeOut" }}
                className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-6"
              >
                {/* Profile Header */}
                <div className="flex items-center gap-4 pb-5 border-b border-slate-100">
                  <img
                    src={user.avatar_url}
                    alt={`${user.name}'s GitHub Avatar`}
                    className="w-14 h-14 rounded-2xl border-2 border-white shadow-sm ring-1 ring-slate-200"
                  />
                  <div>
                    <h3 className="font-bold text-slate-900 text-base leading-tight">
                      {user.name || "Siva Harish"}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">
                      @{user.login}
                    </p>
                    {user.bio && (
                      <p className="text-xs text-slate-600 mt-1 line-clamp-1">
                        {user.bio}
                      </p>
                    )}
                  </div>
                </div>

                {/* Stats Counters */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                    <FolderGit2 className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-900 leading-tight">
                      {user.public_repos}
                    </p>
                    <p className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">
                      Repos
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                    <Users className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-900 leading-tight">
                      {user.followers}
                    </p>
                    <p className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">
                      Followers
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                    <GitCommit className="w-4 h-4 text-purple-600 mx-auto mb-1" />
                    <p className="text-xl font-bold text-slate-900 leading-tight">
                      {user.following}
                    </p>
                    <p className="text-[10px] uppercase font-mono text-slate-500 mt-0.5">
                      Following
                    </p>
                  </div>
                </div>

                {/* Button */}
                <motion.a
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <GitHubIcon className="w-3.5 h-3.5" />
                  View Complete Profile on GitHub
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </motion.a>
              </motion.div>
            ) : (
              /* Fallback Card */
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm text-center">
                <GitHubIcon className="w-8 h-8 text-slate-700 mx-auto mb-3" />
                <h3 className="font-bold text-slate-900 text-sm">
                  github.com/sivaharish31
                </h3>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Check out repositories, code commits, and open-source activities.
                </p>
                <a
                  href={config.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl"
                >
                  Open GitHub
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>

          {/* Right Column: Visual Contribution Chart (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <h4 className="text-sm font-bold text-slate-900">
                    Annual Contribution Heatmap
                  </h4>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200 font-medium">
                  Live Sync
                </span>
              </div>

              {/* GitHub Contribution Graph Embed */}
              <div className="overflow-x-auto rounded-xl p-2 bg-slate-50/60 border border-slate-100 flex items-center justify-center min-h-[140px]">
                <img
                  src="https://ghchart.rshah.org/2563EB/sivaharish31"
                  alt="Siva Harish GitHub contribution chart"
                  className="w-full h-auto min-w-[500px]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 font-mono pt-1">
                <span>Reflects public commits and pull requests</span>
                <span>Year to date</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
