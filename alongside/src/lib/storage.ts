"use client";

import type { AppState, DailyLog } from "./types";
import { toISODate, addDays } from "./cycle";

const KEY = "alongside.state.v1";

/**
 * Demo persistence layer. Everything lives in the browser so no personal cycle
 * data ever leaves the device in this MVP. The interface is intentionally small
 * so it can be swapped for an authenticated API + encrypted store later without
 * touching the UI.
 */

export function defaultState(): AppState {
  const today = toISODate(new Date());
  return {
    profile: {
      trackerName: "Sam",
      lastPeriodStart: addDays(today, -7),
      cycleLength: 28,
      periodLength: 5,
    },
    sharing: {
      sharePhase: true,
      shareSymptoms: true,
      sharePredictions: true,
      shareMood: true,
    },
    logs: [],
    premium: false,
  };
}

export function loadState(): AppState {
  if (typeof window === "undefined") return defaultState();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaultState();
    return { ...defaultState(), ...(JSON.parse(raw) as AppState) };
  } catch {
    return defaultState();
  }
}

export function saveState(state: AppState): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function upsertLog(logs: DailyLog[], log: DailyLog): DailyLog[] {
  const rest = logs.filter((l) => l.date !== log.date);
  return [...rest, log].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function logForDate(logs: DailyLog[], date: string): DailyLog | undefined {
  return logs.find((l) => l.date === date);
}
