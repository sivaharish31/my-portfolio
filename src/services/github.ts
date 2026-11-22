// GitHub API service — fetches public PR status and contribution activity.
// All requests are unauthenticated to avoid exposing secrets in frontend code.
// GitHub's public rate limit is 60 requests/hour without auth.

export type PRStatus = "open" | "merged" | "closed" | "unknown";

interface GitHubPR {
  state: "open" | "closed";
  merged_at: string | null;
}

/**
 * Fetches the status of a GitHub Pull Request with timeout and abort support.
 * Returns "unknown" on any error (rate limit, network failure, invalid format).
 */
export async function fetchPRStatus(
  prUrl: string,
  externalSignal?: AbortSignal
): Promise<PRStatus> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  const onAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timer);
      return "unknown";
    }
    externalSignal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    const match = prUrl.match(/github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/);
    if (!match) return "unknown";

    const [, owner, repo, prNumber] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;

    const response = await fetch(apiUrl, {
      headers: { Accept: "application/vnd.github.v3+json" },
      signal: controller.signal,
    });

    if (!response.ok) return "unknown";

    const data: GitHubPR = await response.json();

    if (data.state === "open") return "open";
    if (data.state === "closed" && data.merged_at) return "merged";
    if (data.state === "closed") return "closed";

    return "unknown";
  } catch {
    return "unknown";
  } finally {
    clearTimeout(timer);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", onAbort);
    }
  }
}

/**
 * Fetches basic GitHub user stats.
 * Returns null on failure — callers should handle gracefully.
 */
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

export async function fetchGitHubUser(
  username: string,
  externalSignal?: AbortSignal
): Promise<GitHubUser | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 3000);

  const onAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timer);
      return null;
    }
    externalSignal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    const response = await fetch(`https://api.github.com/users/${username}`, {
      headers: { Accept: "application/vnd.github.v3+json" },
      signal: controller.signal,
    });

    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", onAbort);
    }
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

// Backwards-compatibility alias
export type RollingThreeMonthData = RollingContributionData;

/**
 * Processes raw contribution days into an interactive rolling weekly grid.
 * Supports rolling 3-month (13 weeks), 6-month (26 weeks), and 12-month (52 weeks) views
 * with pagination offset controls.
 */
export function processRollingContributions(
  days: ContributionDay[],
  range: TimeRange = "3m",
  offsetWeeks = 0
): RollingContributionData | null {
  if (!Array.isArray(days) || days.length === 0) {
    return null;
  }

  // Weeks to display per range
  const rangeWeeks = range === "3m" ? 13 : range === "6m" ? 26 : 52;
  const daysInWindow = rangeWeeks * 7;

  // Calculate the reference latest date with offset
  const maxDayIndex = days.length - 1;
  const offsetDays = Math.max(0, offsetWeeks * 7);
  const targetEndIndex = Math.max(0, maxDayIndex - offsetDays);

  const targetEndDateStr = days[targetEndIndex]?.date;
  if (!targetEndDateStr) return null;

  const targetEndDate = new Date(targetEndDateStr + "T00:00:00Z");
  if (Number.isNaN(targetEndDate.getTime())) return null;

  // Window start date: rangeWeeks prior
  const cutoff = new Date(targetEndDate);
  cutoff.setUTCDate(cutoff.getUTCDate() - (daysInWindow - 7));

  // Align start date to the preceding Sunday for clean calendar grid layout
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
  let currentWeek: (ContributionDay | null)[] = [];
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

    if (dayOfWeek === 0 && currentWeek.length > 0) {
      weeks.push({ days: currentWeek });
      currentWeek = [];
    }

    if (month !== lastMonth) {
      monthLabels.push({ month, weekIndex: weeks.length });
      lastMonth = month;
    }

    currentWeek[dayOfWeek] = day;
  }

  if (currentWeek.length > 0) {
    weeks.push({ days: currentWeek });
  }

  const totalContributions = filtered.reduce((sum, d) => sum + d.count, 0);

  const canGoNext = offsetWeeks > 0;
  // Can go previous if there are days prior to filtered[0]
  const firstFilteredDate = new Date(filtered[0].date + "T00:00:00Z");
  const earliestAvailableDate = new Date(days[0].date + "T00:00:00Z");
  const canGoPrev = firstFilteredDate.getTime() > earliestAvailableDate.getTime() + (7 * 24 * 60 * 60 * 1000);

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

/**
 * Backward-compatible helper for 3-month processing.
 */
export function processContributions(
  days: ContributionDay[]
): RollingContributionData | null {
  return processRollingContributions(days, "3m", 0);
}

/**
 * Fetches raw GitHub contribution days from the public contributions service.
 */
export async function fetchRawContributions(
  username: string,
  externalSignal?: AbortSignal
): Promise<ContributionDay[] | null> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 4000);

  const onAbort = () => controller.abort();
  if (externalSignal) {
    if (externalSignal.aborted) {
      clearTimeout(timer);
      return null;
    }
    externalSignal.addEventListener("abort", onAbort, { once: true });
  }

  try {
    const response = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
      { signal: controller.signal }
    );

    if (!response.ok) return null;

    const data = await response.json();
    if (Array.isArray(data?.contributions) && data.contributions.length > 0) {
      return data.contributions;
    }

    return null;
  } catch {
    return null;
  } finally {
    clearTimeout(timer);
    if (externalSignal) {
      externalSignal.removeEventListener("abort", onAbort);
    }
  }
}

/**
 * Fetches rolling GitHub contribution data from the contributions API.
 */
export async function fetchThreeMonthContributions(
  username: string,
  externalSignal?: AbortSignal
): Promise<RollingContributionData | null> {
  const days = await fetchRawContributions(username, externalSignal);
  if (!days) return null;
  return processContributions(days);
}
