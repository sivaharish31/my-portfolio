// GitHub API service — fetches public PR status, authored PRs, user profile, and contribution activity.
// All requests are unauthenticated to avoid exposing secrets in frontend code.
// GitHub's public REST API rate limit is 60 requests/hour (and 10/min for Search API) without auth.

export type PRStatus = "open" | "merged" | "closed" | "unknown";

export interface GitHubAuthoredPR {
  id: number;
  number: number;
  title: string;
  html_url: string;
  owner: string;
  repo: string;
  fullRepo: string;
  state: PRStatus;
  created_at: string;
  updated_at: string;
  merged_at: string | null;
}

export interface GitHubPRSyncResult {
  prs: GitHubAuthoredPR[];
  isLive: boolean;
  fromCache: boolean;
  rateLimited: boolean;
  lastSyncedAt: number | null;
}

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes to respect GitHub unauthenticated rate limits
const STORAGE_PREFIX = "siva_portfolio_gh_v1_";

function readCache<T>(key: string, allowStale = false): { data: T; timestamp: number; isFresh: boolean } | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_PREFIX + key);
    if (!raw) return null;
    const parsed: CacheEntry<T> = JSON.parse(raw);
    if (!parsed || typeof parsed.timestamp !== "number") return null;
    const isFresh = Date.now() - parsed.timestamp < CACHE_TTL_MS;
    if (!isFresh && !allowStale) return null;
    return { data: parsed.data, timestamp: parsed.timestamp, isFresh };
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T): number {
  const timestamp = Date.now();
  if (typeof window === "undefined") return timestamp;
  try {
    const entry: CacheEntry<T> = { data, timestamp };
    window.localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(entry));
  } catch {
    // Ignore storage quota errors
  }
  return timestamp;
}

async function fetchWithTimeoutAndRetry(
  url: string,
  options: RequestInit & { timeoutMs?: number; retries?: number } = {}
): Promise<Response> {
  const { timeoutMs = 6000, retries = 1, signal: externalSignal, ...fetchOpts } = options;

  let attempt = 0;
  while (true) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    const onAbort = () => controller.abort();

    if (externalSignal) {
      if (externalSignal.aborted) {
        clearTimeout(timer);
        throw new DOMException("Aborted", "AbortError");
      }
      externalSignal.addEventListener("abort", onAbort, { once: true });
    }

    try {
      const res = await fetch(url, { ...fetchOpts, signal: controller.signal });
      clearTimeout(timer);
      if (externalSignal) externalSignal.removeEventListener("abort", onAbort);

      // Do not retry client/rate-limit errors (403, 404, 422, 429)
      if (res.ok || (res.status >= 400 && res.status < 500)) {
        return res;
      }

      if (attempt >= retries) return res;
    } catch (err) {
      clearTimeout(timer);
      if (externalSignal) externalSignal.removeEventListener("abort", onAbort);
      if ((err as Error)?.name === "AbortError" && externalSignal?.aborted) {
        throw err;
      }
      if (attempt >= retries) throw err;
    }

    attempt++;
    await new Promise((r) => setTimeout(r, 400 * attempt));
  }
}

interface SearchIssueItem {
  id: number;
  number: number;
  title: string;
  html_url: string;
  repository_url: string;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  pull_request?: {
    merged_at: string | null;
  };
}

interface SearchIssuesResponse {
  total_count: number;
  items: SearchIssueItem[];
}

/**
 * Discovers all public pull requests authored by `username` across all GitHub repositories
 * using GitHub's official Search API with full pagination, 15-minute TTL caching,
 * and graceful stale-cache fallback on rate limits.
 */
export async function fetchAllAuthoredPRs(
  username: string,
  options?: { signal?: AbortSignal; forceRefresh?: boolean }
): Promise<GitHubPRSyncResult> {
  const cacheKey = `authored_prs_${username}`;

  if (!options?.forceRefresh) {
    const fresh = readCache<GitHubAuthoredPR[]>(cacheKey, false);
    if (fresh) {
      return {
        prs: fresh.data,
        isLive: true,
        fromCache: true,
        rateLimited: false,
        lastSyncedAt: fresh.timestamp,
      };
    }
  }

  const allPrs: GitHubAuthoredPR[] = [];
  let page = 1;
  const perPage = 100;
  let rateLimited = false;

  try {
    while (page <= 10) {
      const url = `https://api.github.com/search/issues?q=${encodeURIComponent(
        `type:pr author:${username}`
      )}&sort=created&order=desc&per_page=${perPage}&page=${page}`;

      const response = await fetchWithTimeoutAndRetry(url, {
        headers: { Accept: "application/vnd.github+json" },
        signal: options?.signal,
        timeoutMs: 6000,
        retries: 1,
      });

      if (response.status === 403 || response.status === 429) {
        rateLimited = true;
        break;
      }

      if (!response.ok) {
        break;
      }

      const data: SearchIssuesResponse = await response.json();
      const items = Array.isArray(data?.items) ? data.items : [];

      for (const item of items) {
        const repoPath = item.repository_url.replace("https://api.github.com/repos/", "");
        const [owner = "", repo = ""] = repoPath.split("/");
        const mergedAt = item.pull_request?.merged_at ?? null;
        let state: PRStatus = "unknown";
        if (item.state === "open") state = "open";
        else if (item.state === "closed" && mergedAt) state = "merged";
        else if (item.state === "closed") state = "closed";

        allPrs.push({
          id: item.id,
          number: item.number,
          title: item.title,
          html_url: item.html_url,
          owner,
          repo,
          fullRepo: repoPath,
          state,
          created_at: item.created_at,
          updated_at: item.updated_at,
          merged_at: mergedAt,
        });
      }

      if (items.length < perPage || allPrs.length >= (data.total_count ?? 0)) {
        const ts = writeCache(cacheKey, allPrs);
        return {
          prs: allPrs,
          isLive: true,
          fromCache: false,
          rateLimited: false,
          lastSyncedAt: ts,
        };
      }

      page++;
    }
  } catch (err) {
    if ((err as Error)?.name === "AbortError" && options?.signal?.aborted) {
      throw err;
    }
  }

  // Fallback to stale cache if API failed or hit rate limit
  const stale = readCache<GitHubAuthoredPR[]>(cacheKey, true);
  if (stale) {
    return {
      prs: stale.data,
      isLive: false,
      fromCache: true,
      rateLimited,
      lastSyncedAt: stale.timestamp,
    };
  }

  return {
    prs: allPrs,
    isLive: false,
    fromCache: false,
    rateLimited,
    lastSyncedAt: null,
  };
}

interface GitHubPR {
  state: "open" | "closed";
  merged_at: string | null;
}

/**
 * Fetches the status of an individual GitHub Pull Request with timeout and abort support.
 * Checks local authored-PR cache first to avoid redundant API requests.
 */
export async function fetchPRStatus(
  prUrl: string,
  externalSignal?: AbortSignal
): Promise<PRStatus> {
  const cachedPRs = readCache<GitHubAuthoredPR[]>("authored_prs_sivaharish31", true);
  if (cachedPRs) {
    const match = cachedPRs.data.find(
      (p) => p.html_url.toLowerCase() === prUrl.toLowerCase()
    );
    if (match && cachedPRs.isFresh) return match.state;
  }

  try {
    const match = prUrl.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
    if (!match) return "unknown";

    const [, owner, repo, prNumber] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;

    const response = await fetchWithTimeoutAndRetry(apiUrl, {
      headers: { Accept: "application/vnd.github+json" },
      signal: externalSignal,
      timeoutMs: 4500,
      retries: 1,
    });

    if (!response.ok) return "unknown";

    const data: GitHubPR = await response.json();

    if (data.state === "open") return "open";
    if (data.state === "closed" && data.merged_at) return "merged";
    if (data.state === "closed") return "closed";

    return "unknown";
  } catch {
    return "unknown";
  }
}

export interface GitHubUser {
  login: string;
  name: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  bio: string | null;
  avatar_url: string;
  created_at: string;
}

/**
 * Fetches basic GitHub user stats with 15-minute TTL caching and stale fallback.
 */
export async function fetchGitHubUser(
  username: string,
  externalSignal?: AbortSignal,
  forceRefresh = false
): Promise<GitHubUser | null> {
  const cacheKey = `user_${username}`;
  if (!forceRefresh) {
    const fresh = readCache<GitHubUser>(cacheKey, false);
    if (fresh) return fresh.data;
  }

  try {
    const response = await fetchWithTimeoutAndRetry(
      `https://api.github.com/users/${username}`,
      {
        headers: { Accept: "application/vnd.github+json" },
        signal: externalSignal,
        timeoutMs: 4500,
        retries: 1,
      }
    );

    if (!response.ok) {
      return readCache<GitHubUser>(cacheKey, true)?.data ?? null;
    }

    const data: GitHubUser = await response.json();
    writeCache(cacheKey, data);
    return data;
  } catch {
    return readCache<GitHubUser>(cacheKey, true)?.data ?? null;
  }
}

export interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

export interface ContributionWeek {
  days: (ContributionDay | null)[];
}

export interface MonthLabel {
  month: string;
  weekIndex: number;
}

export type TimeRange = "3m" | "6m" | "12m";

export interface RollingContributionData {
  totalContributions: number;
  weeks: ContributionWeek[];
  monthLabels: MonthLabel[];
  startDate: string;
  endDate: string;
  range: TimeRange;
  offsetWeeks: number;
  canGoNext: boolean;
  canGoPrev: boolean;
}

export type RollingThreeMonthData = RollingContributionData;

/**
 * Processes raw contribution days into an interactive rolling weekly grid.
 * Supports rolling 3-month (13 weeks), 6-month (26 weeks), and 12-month (52 weeks) views
 * with pagination offset controls and UTC-safe date handling.
 */
export function processRollingContributions(
  days: ContributionDay[],
  range: TimeRange = "3m",
  offsetWeeks = 0
): RollingContributionData | null {
  if (!Array.isArray(days) || days.length === 0) {
    return null;
  }

  const rangeWeeks = range === "3m" ? 13 : range === "6m" ? 26 : 52;
  const daysInWindow = rangeWeeks * 7;

  const maxDayIndex = days.length - 1;
  const offsetDays = Math.max(0, offsetWeeks * 7);
  const targetEndIndex = Math.max(0, maxDayIndex - offsetDays);

  const targetEndDateStr = days[targetEndIndex]?.date;
  if (!targetEndDateStr) return null;

  const targetEndDate = new Date(targetEndDateStr + "T00:00:00Z");
  if (Number.isNaN(targetEndDate.getTime())) return null;

  const cutoff = new Date(targetEndDate);
  cutoff.setUTCDate(cutoff.getUTCDate() - (daysInWindow - 7));

  const startDate = new Date(cutoff);
  startDate.setUTCDate(startDate.getUTCDate() - startDate.getUTCDay());

  const filtered = days.filter((d) => {
    const dDate = new Date(d.date + "T00:00:00Z");
    return dDate >= startDate && dDate <= targetEndDate;
  });

  if (filtered.length === 0) {
    return null;
  }

  const weeks: ContributionWeek[] = [];
  let currentWeek: (ContributionDay | null)[] = Array(7).fill(null);
  const monthLabels: MonthLabel[] = [];
  let lastMonth = "";

  for (let i = 0; i < filtered.length; i++) {
    const day = filtered[i];
    const dateObj = new Date(day.date + "T00:00:00Z");
    const dayOfWeek = dateObj.getUTCDay();
    const month = dateObj.toLocaleString("en-US", {
      month: "short",
      timeZone: "UTC",
    });

    if (dayOfWeek === 0 && currentWeek.some((d) => d !== null)) {
      weeks.push({ days: currentWeek });
      currentWeek = Array(7).fill(null);
    }

    if (month !== lastMonth) {
      monthLabels.push({ month, weekIndex: weeks.length });
      lastMonth = month;
    }

    currentWeek[dayOfWeek] = day;
  }

  if (currentWeek.some((d) => d !== null)) {
    weeks.push({ days: currentWeek });
  }

  const totalContributions = filtered.reduce((sum, d) => sum + d.count, 0);

  const canGoNext = offsetWeeks > 0;
  const firstFilteredDate = new Date(filtered[0].date + "T00:00:00Z");
  const earliestAvailableDate = new Date(days[0].date + "T00:00:00Z");
  const canGoPrev =
    firstFilteredDate.getTime() >
    earliestAvailableDate.getTime() + 7 * 24 * 60 * 60 * 1000;

  return {
    totalContributions,
    weeks,
    monthLabels,
    startDate: filtered[0].date,
    endDate: filtered[filtered.length - 1].date,
    range,
    offsetWeeks,
    canGoNext,
    canGoPrev,
  };
}

export function processContributions(
  days: ContributionDay[]
): RollingContributionData | null {
  return processRollingContributions(days, "3m", 0);
}

/**
 * Fetches raw GitHub contribution days with 15-minute TTL caching and stale fallback.
 */
export async function fetchRawContributions(
  username: string,
  externalSignal?: AbortSignal,
  forceRefresh = false
): Promise<ContributionDay[] | null> {
  const cacheKey = `contributions_${username}`;
  if (!forceRefresh) {
    const fresh = readCache<ContributionDay[]>(cacheKey, false);
    if (fresh) return fresh.data;
  }

  try {
    const response = await fetchWithTimeoutAndRetry(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      {
        signal: externalSignal,
        timeoutMs: 5000,
        retries: 1,
      }
    );

    if (!response.ok) {
      return readCache<ContributionDay[]>(cacheKey, true)?.data ?? null;
    }

    const data = await response.json();
    if (Array.isArray(data?.contributions) && data.contributions.length > 0) {
      writeCache(cacheKey, data.contributions);
      return data.contributions;
    }

    return readCache<ContributionDay[]>(cacheKey, true)?.data ?? null;
  } catch {
    return readCache<ContributionDay[]>(cacheKey, true)?.data ?? null;
  }
}

export interface GitHubRepoSummary {
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
}

export type PlatformSyncStatus = "success" | "partial" | "stale" | "unavailable";

export interface PlatformSnapshotEntry<T> {
  status: PlatformSyncStatus;
  source: string;
  lastUpdated: string;
  lastSuccessfulUpdate: string | null;
  error: string | null;
  data: T | null;
}

export interface LeetCodeSnapshotData {
  handle: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | null;
  contestRating: number | null;
  attendedContestsCount: number;
  badgesCount: number;
}

export interface CodeforcesSnapshotData {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  ratedContests: number;
  recentSolvedSample: number;
  ratingHistory?: {
    contestId: number;
    contestName: string;
    rank: number;
    oldRating: number;
    newRating: number;
    ratingUpdateTimeSeconds: number;
  }[];
}

export interface CodeChefSnapshotData {
  handle: string;
  rating: number | null;
  maxRating: number | null;
  stars: string | null;
  globalRank: number | null;
  totalSolved: number | null;
}

export interface AtCoderSnapshotData {
  handle: string;
  rating: number;
  highestRating: number;
  ratedMatches: number;
  totalContests: number;
  recentContests?: {
    contestName: string;
    place: number;
    newRating: number;
    performance: number;
    startTime: string;
  }[];
}

export interface CodolioSnapshotData {
  handle: string;
  firstName: string;
  githubProfile: string | null;
  profileViews: number;
  graduationYear: string | null;
  country: string | null;
}

export interface GitHubPlatformData {
  profile: GitHubUser;
  pullRequests: GitHubAuthoredPR[];
  repositories: GitHubRepoSummary[];
  contributions: {
    totalLastYear: number;
    days: ContributionDay[];
  };
}

export interface MultiPlatformSnapshot {
  schemaVersion: 2;
  generatedAt: string;
  platforms: {
    github: PlatformSnapshotEntry<GitHubPlatformData>;
    leetcode: PlatformSnapshotEntry<LeetCodeSnapshotData>;
    codeforces: PlatformSnapshotEntry<CodeforcesSnapshotData>;
    codechef: PlatformSnapshotEntry<CodeChefSnapshotData>;
    atcoder: PlatformSnapshotEntry<AtCoderSnapshotData>;
    codolio: PlatformSnapshotEntry<CodolioSnapshotData>;
  };
}

export interface GitHubSnapshot {
  schemaVersion: number;
  username: string;
  syncedAt: string;
  profile: GitHubUser;
  pullRequests: GitHubAuthoredPR[];
  repositories: GitHubRepoSummary[];
  contributions: {
    totalLastYear: number;
    days: ContributionDay[];
  };
}

export interface SnapshotLoadResult {
  snapshot: GitHubSnapshot | null;
  multiPlatform: MultiPlatformSnapshot | null;
  source: "portfolio-data" | "live-api" | "cache";
  stale: boolean;
  rateLimited: boolean;
  error: string | null;
}

const PORTFOLIO_SNAPSHOT_URL =
  "https://raw.githubusercontent.com/sivaharish31/my-portfolio/portfolio-data/portfolio-snapshot.json";
const PORTFOLIO_CACHE_KEY = "portfolio_snapshot_v2_sivaharish31";
const SNAPSHOT_CACHE_KEY = "snapshot_v1_sivaharish31";

function isValidMultiPlatformSnapshot(data: unknown): data is MultiPlatformSnapshot {
  if (!data || typeof data !== "object") return false;
  const s = data as Partial<MultiPlatformSnapshot>;
  return (
    s.schemaVersion === 2 &&
    typeof s.generatedAt === "string" &&
    Boolean(s.platforms?.github) &&
    Boolean(s.platforms?.leetcode) &&
    Boolean(s.platforms?.codeforces) &&
    Boolean(s.platforms?.codechef) &&
    Boolean(s.platforms?.atcoder) &&
    Boolean(s.platforms?.codolio)
  );
}

function extractGitHubFromMulti(mp: MultiPlatformSnapshot): GitHubSnapshot | null {
  const gh = mp.platforms.github?.data;
  if (!gh?.profile?.login || !Array.isArray(gh.pullRequests) || !Array.isArray(gh.contributions?.days)) {
    return null;
  }
  return {
    schemaVersion: 2,
    username: gh.profile.login,
    syncedAt: mp.platforms.github.lastSuccessfulUpdate || mp.generatedAt,
    profile: gh.profile,
    pullRequests: gh.pullRequests,
    repositories: gh.repositories ?? [],
    contributions: gh.contributions,
  };
}

function isValidSnapshot(data: unknown): data is GitHubSnapshot {
  if (!data || typeof data !== "object") return false;
  const s = data as Partial<GitHubSnapshot>;
  return (
    typeof s.syncedAt === "string" &&
    Boolean(s.profile?.login) &&
    Array.isArray(s.pullRequests) &&
    Array.isArray(s.contributions?.days)
  );
}

/**
 * Fetches the latest 6-platform synchronized snapshot from the `portfolio-data` branch.
 * Falls back gracefully to public API endpoints and cached localStorage data if unavailable.
 */
export async function fetchPortfolioSnapshot(options?: {
  signal?: AbortSignal;
  forceRefresh?: boolean;
}): Promise<SnapshotLoadResult> {
  if (!options?.forceRefresh) {
    const freshMulti = readCache<MultiPlatformSnapshot>(PORTFOLIO_CACHE_KEY, false);
    if (freshMulti && isValidMultiPlatformSnapshot(freshMulti.data)) {
      return {
        snapshot: extractGitHubFromMulti(freshMulti.data),
        multiPlatform: freshMulti.data,
        source: "cache",
        stale: false,
        rateLimited: false,
        error: null,
      };
    }
  }

  // 1. Try dedicated portfolio-data branch multi-platform JSON snapshot
  try {
    const bust = options?.forceRefresh ? `?t=${Date.now()}` : "";
    const res = await fetchWithTimeoutAndRetry(`${PORTFOLIO_SNAPSHOT_URL}${bust}`, {
      signal: options?.signal,
      timeoutMs: 5000,
      retries: 1,
      cache: options?.forceRefresh ? "no-store" : "default",
    });

    if (res.ok) {
      const json: unknown = await res.json();
      if (isValidMultiPlatformSnapshot(json)) {
        writeCache(PORTFOLIO_CACHE_KEY, json);
        return {
          snapshot: extractGitHubFromMulti(json),
          multiPlatform: json,
          source: "portfolio-data",
          stale: false,
          rateLimited: false,
          error: null,
        };
      }
    }
  } catch (err) {
    if ((err as Error)?.name === "AbortError" && options?.signal?.aborted) {
      throw err;
    }
  }

  // 2. Graceful fallback to public endpoints if `portfolio-data` branch is not yet published
  try {
    const [prResult, user, days] = await Promise.all([
      fetchAllAuthoredPRs("sivaharish31", options),
      fetchGitHubUser("sivaharish31", options?.signal, options?.forceRefresh),
      fetchRawContributions("sivaharish31", options?.signal, options?.forceRefresh),
    ]);

    if (user && days && days.length > 0 && prResult.prs.length > 0) {
      const snapshot: GitHubSnapshot = {
        schemaVersion: 1,
        username: "sivaharish31",
        syncedAt: new Date(prResult.lastSyncedAt ?? Date.now()).toISOString(),
        profile: user,
        pullRequests: prResult.prs,
        repositories: [],
        contributions: {
          totalLastYear: days.reduce((sum, d) => sum + d.count, 0),
          days,
        },
      };
      writeCache(SNAPSHOT_CACHE_KEY, snapshot);
      return {
        snapshot,
        multiPlatform: null,
        source: "live-api",
        stale: prResult.rateLimited,
        rateLimited: prResult.rateLimited,
        error: null,
      };
    }
  } catch (err) {
    if ((err as Error)?.name === "AbortError" && options?.signal?.aborted) {
      throw err;
    }
  }

  // 3. Preserve previous valid cached snapshot on refresh failure
  const staleMulti = readCache<MultiPlatformSnapshot>(PORTFOLIO_CACHE_KEY, true);
  if (staleMulti && isValidMultiPlatformSnapshot(staleMulti.data)) {
    return {
      snapshot: extractGitHubFromMulti(staleMulti.data),
      multiPlatform: staleMulti.data,
      source: "cache",
      stale: true,
      rateLimited: false,
      error: "Unable to refresh live snapshot; showing last verified data.",
    };
  }

  const stale = readCache<GitHubSnapshot>(SNAPSHOT_CACHE_KEY, true);
  if (stale && isValidSnapshot(stale.data)) {
    return {
      snapshot: stale.data,
      multiPlatform: null,
      source: "cache",
      stale: true,
      rateLimited: false,
      error: "Unable to refresh live snapshot; showing last verified data.",
    };
  }

  return {
    snapshot: null,
    multiPlatform: null,
    source: "cache",
    stale: true,
    rateLimited: false,
    error: "Portfolio snapshot unavailable.",
  };
}

export async function fetchThreeMonthContributions(
  username: string,
  externalSignal?: AbortSignal
): Promise<RollingContributionData | null> {
  const days = await fetchRawContributions(username, externalSignal);
  if (!days) return null;
  return processRollingContributions(days, "3m", 0);
}
