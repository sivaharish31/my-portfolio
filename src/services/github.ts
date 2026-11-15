// GitHub API service — fetches public PR status without auth tokens.
// All requests are unauthenticated to avoid exposing secrets in frontend code.
// GitHub's public rate limit is 60 requests/hour without auth.

export type PRStatus = "open" | "merged" | "closed" | "unknown";

interface GitHubPR {
  state: "open" | "closed";
  merged_at: string | null;
}

/**
 * Fetches the status of a GitHub Pull Request.
 * Returns "unknown" on any error (rate limit, network failure, etc.)
 */
export async function fetchPRStatus(prUrl: string): Promise<PRStatus> {
  try {
    // Convert https://github.com/owner/repo/pull/123 → API URL
    const match = prUrl.match(
      /github\.com\/([^/]+)\/([^/]+)\/pull\/(\d+)/
    );
    if (!match) return "unknown";

    const [, owner, repo, prNumber] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`;

    const response = await fetch(apiUrl, {
      headers: { Accept: "application/vnd.github.v3+json" },
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

export async function fetchGitHubUser(username: string): Promise<GitHubUser | null> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}`,
      { headers: { Accept: "application/vnd.github.v3+json" } }
    );
    if (!response.ok) return null;
    return await response.json();
  } catch {
    return null;
  }
}
