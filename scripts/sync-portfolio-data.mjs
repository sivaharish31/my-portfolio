#!/usr/bin/env node
/**
 * Multi-platform Portfolio Data Synchronizer (6 Profiles)
 * Synchronizes: GitHub, LeetCode, Codeforces, CodeChef, AtCoder, and Codolio
 *
 * Reliability guarantees:
 * - Runs all 6 platform fetchers independently & concurrently via Promise.allSettled.
 * - Per-platform timeouts + exponential backoff retries on transient failures.
 * - Strict schema validation before accepting any platform update.
 * - One failed platform never blocks others; preserves lastSuccessfulUpdate & data as `stale`.
 * - Never fabricates zeros or fake values on failure.
 */

import fs from "node:fs";
import path from "node:path";

const PROFILES = {
  github: "sivaharish31",
  leetcode: "SivaHarish_S",
  codeforces: "sivaharish",
  codechef: "sivaharish_31",
  atcoder: "sivaharish31",
  codolio: "Sivaharish",
};

const TOKEN = process.env.GITHUB_TOKEN || "";

async function fetchWithRetry(url, opts = {}, { retries = 2, timeoutMs = 10000 } = {}) {
  let attempt = 0;
  while (true) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...opts, signal: controller.signal });
      clearTimeout(timer);

      if (res.status === 403 || res.status === 429) {
        throw new Error(`Rate limited (${res.status}) on ${url}`);
      }
      if (!res.ok) {
        if (res.status >= 500 && attempt < retries) {
          attempt++;
          await new Promise((r) => setTimeout(r, 800 * attempt));
          continue;
        }
        throw new Error(`HTTP ${res.status} from ${url}`);
      }
      return res;
    } catch (err) {
      clearTimeout(timer);
      if (attempt < retries && !String(err.message).includes("Rate limited")) {
        attempt++;
        await new Promise((r) => setTimeout(r, 800 * attempt));
        continue;
      }
      throw err;
    }
  }
}

function ghHeaders() {
  const h = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "siva-portfolio-sync-bot",
  };
  if (TOKEN) h.Authorization = `Bearer ${TOKEN}`;
  return h;
}

// ── 1. GitHub Fetcher ──────────────────────────────────────────
async function fetchGitHubData() {
  const username = PROFILES.github;
  const [profileRes, contribRes] = await Promise.all([
    fetchWithRetry(`https://api.github.com/users/${username}`, { headers: ghHeaders() }),
    fetchWithRetry(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      headers: { "User-Agent": "siva-portfolio-sync-bot" },
    }),
  ]);

  const profileRaw = await profileRes.json();
  const contribRaw = await contribRes.json();

  if (!profileRaw?.login || profileRaw.login.toLowerCase() !== username.toLowerCase()) {
    throw new Error("Invalid GitHub profile response");
  }
  if (!Array.isArray(contribRaw?.contributions) || contribRaw.contributions.length < 300) {
    throw new Error("Incomplete GitHub contributions calendar");
  }

  // Paginated authored PRs
  const pullRequests = [];
  const seenPrUrls = new Set();
  for (let page = 1; page <= 10; page++) {
    const url = `https://api.github.com/search/issues?q=${encodeURIComponent(
      `type:pr author:${username}`
    )}&sort=created&order=desc&per_page=100&page=${page}`;
    const prRes = await fetchWithRetry(url, { headers: ghHeaders() });
    const data = await prRes.json();
    const items = Array.isArray(data?.items) ? data.items : [];
    for (const item of items) {
      const htmlUrl = String(item.html_url || "");
      if (!htmlUrl || seenPrUrls.has(htmlUrl)) continue;
      seenPrUrls.add(htmlUrl);
      const fullRepo = String(item.repository_url || "").replace("https://api.github.com/repos/", "");
      const [owner = "", repo = ""] = fullRepo.split("/");
      const mergedAt = item.pull_request?.merged_at || null;
      const state =
        item.state === "open" ? "open" : item.state === "closed" && mergedAt ? "merged" : "closed";
      pullRequests.push({
        id: item.id,
        number: item.number,
        title: item.title,
        html_url: htmlUrl,
        owner,
        repo,
        fullRepo,
        state,
        created_at: item.created_at,
        updated_at: item.updated_at,
        merged_at: mergedAt,
      });
    }
    if (items.length < 100 || pullRequests.length >= (data.total_count ?? 0)) break;
  }

  // Paginated public repos
  const repositories = [];
  for (let page = 1; page <= 5; page++) {
    const repoRes = await fetchWithRetry(
      `https://api.github.com/users/${username}/repos?type=owner&sort=updated&per_page=100&page=${page}`,
      { headers: ghHeaders() }
    );
    const items = await repoRes.json();
    if (!Array.isArray(items) || items.length === 0) break;
    for (const r of items) {
      if (r.private) continue;
      repositories.push({
        name: r.name,
        full_name: r.full_name,
        html_url: r.html_url,
        description: r.description || null,
        language: r.language || null,
        stargazers_count: Number(r.stargazers_count ?? 0),
        forks_count: Number(r.forks_count ?? 0),
        updated_at: r.updated_at,
      });
    }
    if (items.length < 100) break;
  }

  return {
    status: "success",
    source: "GitHub REST API & Contributions API",
    data: {
      profile: {
        login: profileRaw.login,
        name: profileRaw.name || profileRaw.login,
        public_repos: Number(profileRaw.public_repos),
        followers: Number(profileRaw.followers),
        following: Number(profileRaw.following),
        html_url: profileRaw.html_url,
        bio: profileRaw.bio || null,
        avatar_url: profileRaw.avatar_url,
        created_at: profileRaw.created_at,
      },
      pullRequests,
      repositories,
      contributions: {
        totalLastYear: Number(
          contribRaw?.total?.lastYear ??
            contribRaw.contributions.reduce((s, d) => s + Number(d.count || 0), 0)
        ),
        days: contribRaw.contributions,
      },
    },
  };
}

// ── 2. LeetCode Fetcher ────────────────────────────────────────
async function fetchLeetCodeData() {
  const handle = PROFILES.leetcode;
  const res = await fetchWithRetry("https://leetcode.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Referer: "https://leetcode.com",
      "User-Agent": "Mozilla/5.0",
    },
    body: JSON.stringify({
      query: `query($u:String!){
        matchedUser(username:$u){
          username
          profile{ ranking }
          submitStats: submitStatsGlobal{ acSubmissionNum{ difficulty count } }
          badges{ displayName }
          userCalendar{ submissionCalendar }
        }
        userContestRanking(username:$u){ rating attendedContestsCount globalRanking }
      }`,
      variables: { u: handle },
    }),
  });

  const json = await res.json();
  const user = json?.data?.matchedUser;
  if (!user || !Array.isArray(user?.submitStats?.acSubmissionNum)) {
    throw new Error("Invalid LeetCode GraphQL response");
  }

  const counts = {};
  for (const row of user.submitStats.acSubmissionNum) {
    counts[row.difficulty] = Number(row.count);
  }
  if (typeof counts.All !== "number" || counts.All <= 0) {
    throw new Error("Missing LeetCode solved counts");
  }

  const contest = json?.data?.userContestRanking;
  return {
    status: "success",
    source: "LeetCode GraphQL API",
    data: {
      handle: user.username,
      totalSolved: counts.All,
      easySolved: counts.Easy ?? 0,
      mediumSolved: counts.Medium ?? 0,
      hardSolved: counts.Hard ?? 0,
      ranking: user.profile?.ranking ? Number(user.profile.ranking) : null,
      contestRating: contest?.rating ? Math.round(Number(contest.rating)) : null,
      attendedContestsCount: contest?.attendedContestsCount ? Number(contest.attendedContestsCount) : 0,
      badgesCount: Array.isArray(user.badges) ? user.badges.length : 0,
    },
  };
}

// ── 3. Codeforces Fetcher ──────────────────────────────────────
async function fetchCodeforcesData() {
  const handle = PROFILES.codeforces;
  const [infoRes, ratingRes, statusRes] = await Promise.all([
    fetchWithRetry(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
    fetchWithRetry(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`),
    fetchWithRetry(`https://codeforces.com/api/user.status?handle=${encodeURIComponent(handle)}&from=1&count=100`),
  ]);

  const info = await infoRes.json();
  const ratingJson = await ratingRes.json();
  const statusJson = await statusRes.json();

  if (info?.status !== "OK" || !Array.isArray(info.result) || info.result.length === 0) {
    throw new Error("Invalid Codeforces user.info response");
  }

  const u = info.result[0];
  const contests = Array.isArray(ratingJson?.result)
    ? ratingJson.result.map((c) => ({
        contestId: c.contestId,
        contestName: c.contestName,
        rank: Number(c.rank),
        oldRating: Number(c.oldRating),
        newRating: Number(c.newRating),
        ratingUpdateTimeSeconds: Number(c.ratingUpdateTimeSeconds),
      }))
    : [];

  const solvedSet = new Set();
  if (Array.isArray(statusJson?.result)) {
    for (const sub of statusJson.result) {
      if (sub.verdict === "OK" && sub.problem) {
        solvedSet.add(`${sub.problem.contestId || ""}-${sub.problem.index || sub.problem.name}`);
      }
    }
  }

  return {
    status: "success",
    source: "Codeforces Official API",
    data: {
      handle: u.handle,
      rating: Number(u.rating ?? 0),
      maxRating: Number(u.maxRating ?? u.rating ?? 0),
      rank: String(u.rank || "unrated"),
      maxRank: String(u.maxRank || u.rank || "unrated"),
      ratedContests: contests.length,
      recentSolvedSample: solvedSet.size,
      ratingHistory: contests.slice(-6),
    },
  };
}

// ── 4. CodeChef Fetcher ────────────────────────────────────────
async function fetchCodeChefData() {
  const handle = PROFILES.codechef;
  const res = await fetchWithRetry(`https://www.codechef.com/users/${encodeURIComponent(handle)}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const html = await res.text();
  if (!html || html.length < 5000) {
    throw new Error("Unexpected CodeChef profile HTML length");
  }

  const ratingMatch = html.match(/class="rating-number"[^>]*>\s*(\d+)/);
  const maxMatch = html.match(/Highest Rating\s*(\d+)/i);
  const starMatch = html.match(/class="rating-star"[^>]*>([\s\S]*?)<\/div>/);
  const solvedMatch = html.match(/Total Problems Solved:\s*(\d+)/i);
  const globalRankMatch = html.match(/<a[^>]*href="[^"]*ratings[^"]*"[^>]*>\s*<strong>(\d+)<\/strong>\s*<\/a>\s*Global Rank/i) ||
    html.match(/<strong>(\d+)<\/strong>\s*<\/a>\s*<\/li>\s*<li>\s*<small>Global Rank/i);

  const rating = ratingMatch ? Number(ratingMatch[1]) : null;
  const maxRating = maxMatch ? Number(maxMatch[1]) : rating;
  const totalSolved = solvedMatch ? Number(solvedMatch[1]) : null;

  if (rating === null && maxRating === null && totalSolved === null) {
    throw new Error("Unable to parse CodeChef stats from HTML");
  }

  const starRaw = starMatch ? starMatch[1].replace(/&#9733;|&starf;/g, "★").replace(/<[^>]+>/g, "").trim() : "";
  const isPartial = rating === null || totalSolved === null;

  return {
    status: isPartial ? "partial" : "success",
    source: "CodeChef Public Profile",
    data: {
      handle,
      rating: rating ?? maxRating,
      maxRating: maxRating ?? rating,
      stars: starRaw || null,
      globalRank: globalRankMatch ? Number(globalRankMatch[1]) : null,
      totalSolved,
    },
  };
}

// ── 5. AtCoder Fetcher ─────────────────────────────────────────
async function fetchAtCoderData() {
  const handle = PROFILES.atcoder;
  const res = await fetchWithRetry(`https://atcoder.jp/users/${encodeURIComponent(handle)}/history/json`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const history = await res.json();
  if (!Array.isArray(history)) {
    throw new Error("Invalid AtCoder history JSON");
  }

  const rated = history.filter((c) => c.IsRated);
  const latestRated = rated.length > 0 ? rated[rated.length - 1] : null;
  const highestRating = rated.reduce((max, c) => Math.max(max, Number(c.NewRating ?? 0)), 0);

  return {
    status: "success",
    source: "AtCoder Official History JSON",
    data: {
      handle,
      rating: latestRated ? Number(latestRated.NewRating ?? 0) : 0,
      highestRating,
      ratedMatches: rated.length,
      totalContests: history.length,
      recentContests: rated.slice(-5).map((c) => ({
        contestName: c.ContestName,
        place: Number(c.Place),
        newRating: Number(c.NewRating),
        performance: Number(c.Performance),
        startTime: c.StartTime,
      })),
    },
  };
}

// ── 6. Codolio Fetcher ─────────────────────────────────────────
async function fetchCodolioData() {
  const handle = PROFILES.codolio;
  const res = await fetchWithRetry(`https://api.codolio.com/profile?userKey=${encodeURIComponent(handle)}`, {
    headers: { "User-Agent": "Mozilla/5.0" },
  });
  const json = await res.json();
  const d = json?.data;
  if (!json?.status?.success || !d?.profileName) {
    throw new Error("Invalid Codolio API response");
  }

  return {
    status: "success",
    source: "Codolio Public API",
    data: {
      handle: d.profileName,
      firstName: d.firstName || d.profileName,
      githubProfile: d.userDetails?.githubProfile || null,
      profileViews: Number(d.profileViews ?? 0),
      graduationYear: d.userDetails?.userPersonalDetails?.yearOfGraduation || null,
      country: d.userDetails?.userPersonalDetails?.country || null,
    },
  };
}

function stablePlatformPayload(snapshot) {
  const normalized = {};
  for (const [k, v] of Object.entries(snapshot.platforms || {})) {
    normalized[k] = {
      status: v.status === "stale" ? "stale" : v.status,
      data: v.data,
      error: v.error,
    };
  }
  return JSON.stringify(normalized);
}

async function main() {
  const args = process.argv.slice(2);
  const outIdx = args.indexOf("--out");
  const compareIdx = args.indexOf("--compare");
  const outPath = outIdx !== -1 ? args[outIdx + 1] : "portfolio-snapshot.json";
  const comparePath = compareIdx !== -1 ? args[compareIdx + 1] : null;
  const simulateFail = args.includes("--simulate-fail-codechef");

  let previous = null;
  if (comparePath && fs.existsSync(comparePath)) {
    try {
      previous = JSON.parse(fs.readFileSync(comparePath, "utf8"));
    } catch {
      previous = null;
    }
  }

  const nowIso = new Date().toISOString();
  const tasks = {
    github: fetchGitHubData(),
    leetcode: fetchLeetCodeData(),
    codeforces: fetchCodeforcesData(),
    codechef: simulateFail ? Promise.reject(new Error("Simulated failure for CodeChef")) : fetchCodeChefData(),
    atcoder: fetchAtCoderData(),
    codolio: fetchCodolioData(),
  };

  const keys = Object.keys(tasks);
  const settled = await Promise.allSettled(Object.values(tasks));
  const platforms = {};

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    const res = settled[i];
    const prevEntry = previous?.platforms?.[key];

    if (res.status === "fulfilled") {
      platforms[key] = {
        status: res.value.status,
        source: res.value.source,
        lastUpdated: nowIso,
        lastSuccessfulUpdate: nowIso,
        error: null,
        data: res.value.data,
      };
    } else {
      const errMsg = res.reason?.message || "Unknown fetch error";
      if (prevEntry?.data) {
        platforms[key] = {
          status: "stale",
          source: prevEntry.source || "Cached Snapshot",
          lastUpdated: nowIso,
          lastSuccessfulUpdate: prevEntry.lastSuccessfulUpdate || prevEntry.lastUpdated || null,
          error: errMsg,
          data: prevEntry.data,
        };
      } else {
        platforms[key] = {
          status: "unavailable",
          source: "Unavailable",
          lastUpdated: nowIso,
          lastSuccessfulUpdate: null,
          error: errMsg,
          data: null,
        };
      }
    }
  }

  const snapshot = {
    schemaVersion: 2,
    generatedAt: nowIso,
    platforms,
  };

  if (previous && stablePlatformPayload(previous) === stablePlatformPayload(snapshot)) {
    console.log("NO_CHANGES: All 6 platform payloads match previous snapshot. Skipping write.");
    return;
  }

  fs.mkdirSync(path.dirname(path.resolve(outPath)), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(snapshot, null, 2) + "\n", "utf8");

  for (const [k, v] of Object.entries(platforms)) {
    console.log(`  [${k}] status=${v.status} source="${v.source}"${v.error ? ` err="${v.error}"` : ""}`);
  }
  console.log(`UPDATED: Wrote multi-platform snapshot to ${outPath}`);
}

main().catch((err) => {
  console.error("FATAL_SYNC_ERROR:", err);
  process.exit(1);
});
