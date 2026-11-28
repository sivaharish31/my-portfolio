import { useState, useEffect, useCallback } from "react";
import {
  fetchPortfolioSnapshot,
  type GitHubSnapshot,
  type MultiPlatformSnapshot,
  type SnapshotLoadResult,
} from "../services/github";

const POLL_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

interface SharedSnapshotState {
  snapshot: GitHubSnapshot | null;
  multiPlatform: MultiPlatformSnapshot | null;
  loading: boolean;
  source: SnapshotLoadResult["source"];
  stale: boolean;
  rateLimited: boolean;
  error: string | null;
}

let sharedState: SharedSnapshotState = {
  snapshot: null,
  multiPlatform: null,
  loading: true,
  source: "cache",
  stale: false,
  rateLimited: false,
  error: null,
};

const listeners = new Set<(state: SharedSnapshotState) => void>();
let pollTimer: ReturnType<typeof setInterval> | null = null;
let inFlightPromise: Promise<void> | null = null;
let activeSubscribers = 0;

function notifyListeners() {
  for (const listener of listeners) {
    listener(sharedState);
  }
}

async function runSnapshotSync(forceRefresh = false): Promise<void> {
  if (inFlightPromise && !forceRefresh) {
    return inFlightPromise;
  }

  sharedState = { ...sharedState, loading: true };
  notifyListeners();

  const task = fetchPortfolioSnapshot({ forceRefresh })
    .then((result) => {
      sharedState = {
        // Preserve previous valid snapshot if refresh failed
        snapshot: result.snapshot ?? sharedState.snapshot,
        multiPlatform: result.multiPlatform ?? sharedState.multiPlatform,
        loading: false,
        source: result.source,
        stale: result.stale,
        rateLimited: result.rateLimited,
        error: result.error,
      };
    })
    .catch(() => {
      sharedState = {
        ...sharedState,
        loading: false,
        stale: true,
        error: "Unable to refresh GitHub snapshot.",
      };
    })
    .finally(() => {
      inFlightPromise = null;
      notifyListeners();
    });

  inFlightPromise = task;
  return task;
}

/**
 * Subscribes to the shared GitHub portfolio snapshot with a single 30-minute
 * polling interval across all components (prevents duplicate API requests and intervals).
 */
export function useGitHubSnapshot() {
  const [state, setState] = useState<SharedSnapshotState>(sharedState);

  useEffect(() => {
    listeners.add(setState);
    activeSubscribers++;

    // Initial fetch if we haven't loaded yet
    if (!sharedState.snapshot && !inFlightPromise) {
      void runSnapshotSync(false);
    }

    // Start a single shared 30-minute polling interval
    if (!pollTimer) {
      pollTimer = setInterval(() => {
        void runSnapshotSync(true);
      }, POLL_INTERVAL_MS);
    }

    return () => {
      listeners.delete(setState);
      activeSubscribers = Math.max(0, activeSubscribers - 1);
      if (activeSubscribers === 0 && pollTimer) {
        clearInterval(pollTimer);
        pollTimer = null;
      }
    };
  }, []);

  const refresh = useCallback(() => {
    void runSnapshotSync(true);
  }, []);

  return {
    ...state,
    refresh,
  };
}
