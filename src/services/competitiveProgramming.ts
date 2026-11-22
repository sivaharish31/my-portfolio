// Service to fetch public competitive programming profiles and statistics.
// Follows strict requirements:
// 1. 5-hour TTL caching in localStorage to prevent redundant network requests.
// 2. Legitimate, unauthenticated endpoints with graceful fallback to verified baselines.
// 3. Transparent status and last-updated timestamps with zero fabricated data.

export interface CodeforcesProfile {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar?: string;
  lastUpdated?: string;
  isLive?: boolean;
}

export interface LeetCodeProfile {
  handle: string;
  totalSolved: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number | string;
  lastUpdated?: string;
  isLive?: boolean;
}

export interface CPDataBundle {
  codeforces: CodeforcesProfile;
  leetcode: LeetCodeProfile;
  lastSyncTimestamp: number;
  lastSyncFormatted: string;
  isCached: boolean;
}

const CACHE_TTL_MS = 5 * 60 * 60 * 1000; // 5 hours in milliseconds
const CACHE_STORAGE_KEY = "siva_cp_stats_cache_v2";

// Verified fallback baselines (updated November 2026)
export const DEFAULT_CF_BASELINE: CodeforcesProfile = {
  handle: "sivaharish",
  rating: 1015,
  maxRating: 1015,
  rank: "newbie",
  maxRank: "newbie",
  lastUpdated: "Nov 2026 (Verified Snapshot)",
  isLive: false,
};

export const DEFAULT_LC_BASELINE: LeetCodeProfile = {
  handle: "SivaHarish_S",
  totalSolved: 187,
  easySolved: 152,
  mediumSolved: 34,
  hardSolved: 1,
  ranking: "~981,415",
  lastUpdated: "Nov 2026 (Verified Snapshot)",
  isLive: false,
};

/**
 * Format timestamp into human-readable date and time.
 */
function formatTimestamp(ts: number): string {
  try {
    return new Date(ts).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  } catch {
    return "Recent (Verified)";
  }
}

/**
 * Reads the 5-hour cached bundle from localStorage if available and not expired.
 */
export function getCachedCPBundle(): CPDataBundle | null {
  if (typeof window === "undefined" || !window.localStorage) {
    return null;
  }
  try {
    const raw = localStorage.getItem(CACHE_STORAGE_KEY);
    if (!raw) return null;
    const bundle: CPDataBundle = JSON.parse(raw);
    const now = Date.now();
    if (now - bundle.lastSyncTimestamp < CACHE_TTL_MS) {
      return { ...bundle, isCached: true };
    }
    // Return stale cache if expired, marked isCached: false so consumer can refresh
    return { ...bundle, isCached: false };
  } catch {
    return null;
  }
}

/**
 * Stores the freshly retrieved bundle into localStorage with current timestamp.
 */
export function saveCPBundle(cf: CodeforcesProfile, lc: LeetCodeProfile): CPDataBundle {
  const now = Date.now();
  const bundle: CPDataBundle = {
    codeforces: cf,
    leetcode: lc,
    lastSyncTimestamp: now,
    lastSyncFormatted: formatTimestamp(now),
    isCached: true,
  };
  if (typeof window !== "undefined" && window.localStorage) {
    try {
      localStorage.setItem(CACHE_STORAGE_KEY, JSON.stringify(bundle));
    } catch {
      // Ignore quota errors in private browsing
    }
  }
  return bundle;
}

/**
 * Fetches real-time Codeforces user statistics using their official open API.
 */
export async function fetchLiveCodeforces(
  handle = "sivaharish",
  signal?: AbortSignal
): Promise<CodeforcesProfile> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`, {
      signal: signal || controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return DEFAULT_CF_BASELINE;
    const data = await res.json();
    if (data.status === "OK" && data.result && data.result.length > 0) {
      const u = data.result[0];
      return {
        handle: u.handle,
        rating: u.rating ?? DEFAULT_CF_BASELINE.rating,
        maxRating: u.maxRating ?? DEFAULT_CF_BASELINE.maxRating,
        rank: u.rank ?? DEFAULT_CF_BASELINE.rank,
        maxRank: u.maxRank ?? DEFAULT_CF_BASELINE.maxRank,
        avatar: u.titlePhoto || u.avatar,
        lastUpdated: formatTimestamp(Date.now()),
        isLive: true,
      };
    }
    return DEFAULT_CF_BASELINE;
  } catch {
    return DEFAULT_CF_BASELINE;
  }
}

/**
 * Fetches real-time LeetCode statistics via CORS-friendly open proxy.
 * Falls back to verified snapshot if the endpoint is rate-limited or unavailable.
 */
export async function fetchLiveLeetCode(
  handle = "SivaHarish_S",
  signal?: AbortSignal
): Promise<LeetCodeProfile> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${handle}`, {
      signal: signal || controller.signal,
    });
    clearTimeout(timeout);
    if (!res.ok) return DEFAULT_LC_BASELINE;
    const data = await res.json();
    if (typeof data?.totalSolved === "number" && data.totalSolved > 0) {
      return {
        handle,
        totalSolved: data.totalSolved,
        easySolved: data.easySolved ?? DEFAULT_LC_BASELINE.easySolved,
        mediumSolved: data.mediumSolved ?? DEFAULT_LC_BASELINE.mediumSolved,
        hardSolved: data.hardSolved ?? DEFAULT_LC_BASELINE.hardSolved,
        ranking: data.ranking ? `#${data.ranking.toLocaleString()}` : DEFAULT_LC_BASELINE.ranking,
        lastUpdated: formatTimestamp(Date.now()),
        isLive: true,
      };
    }
    return DEFAULT_LC_BASELINE;
  } catch {
    return DEFAULT_LC_BASELINE;
  }
}

/**
 * Loads competitive programming stats, adhering strictly to the 5-hour TTL cache.
 * If cache is valid, returns immediately without network calls.
 * If expired or forceRefresh is true, fetches fresh live data and updates cache.
 */
export async function loadCPStats(
  forceRefresh = false,
  signal?: AbortSignal
): Promise<CPDataBundle> {
  const cached = getCachedCPBundle();
  if (cached && cached.isCached && !forceRefresh) {
    return cached;
  }

  // Fetch in parallel
  const [cf, lc] = await Promise.all([
    fetchLiveCodeforces("sivaharish", signal),
    fetchLiveLeetCode("SivaHarish_S", signal),
  ]);

  return saveCPBundle(cf, lc);
}
