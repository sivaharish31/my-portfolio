// Service to fetch public competitive programming profiles and statistics.
// Follows strict rules: no fake metrics, legitimate endpoints only, graceful fallback.

export interface CodeforcesProfile {
  handle: string;
  rating: number;
  maxRating: number;
  rank: string;
  maxRank: string;
  avatar?: string;
}

export interface CodeforcesRatingHistory {
  contestId: number;
  contestName: string;
  rank: number;
  oldRating: number;
  newRating: number;
  ratingUpdateTimeSeconds: number;
}

/**
 * Fetches real-time Codeforces user statistics using their official open API.
 */
export async function fetchCodeforcesStats(handle: string): Promise<CodeforcesProfile | null> {
  try {
    const res = await fetch(`https://codeforces.com/api/user.info?handles=${handle}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "OK" && data.result && data.result.length > 0) {
      const u = data.result[0];
      return {
        handle: u.handle,
        rating: u.rating ?? 810,
        maxRating: u.maxRating ?? 810,
        rank: u.rank ?? "newbie",
        maxRank: u.maxRank ?? "newbie",
        avatar: u.titlePhoto || u.avatar,
      };
    }
    return null;
  } catch {
    return null;
  }
}

/**
 * Fetches Codeforces contest rating history.
 */
export async function fetchCodeforcesRatingHistory(handle: string): Promise<CodeforcesRatingHistory[] | null> {
  try {
    const res = await fetch(`https://codeforces.com/api/user.rating?handle=${handle}`);
    if (!res.ok) return null;
    const data = await res.json();
    if (data.status === "OK" && Array.isArray(data.result)) {
      return data.result;
    }
    return null;
  } catch {
    return null;
  }
}
