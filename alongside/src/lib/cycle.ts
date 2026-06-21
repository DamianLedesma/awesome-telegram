import type { CycleProfile, PhaseId, PhaseInfo } from "./types";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * The luteal phase (from ovulation to next period) is the most consistent part
 * of the cycle across individuals, lasting roughly 14 days. We anchor ovulation
 * to `cycleLength - LUTEAL_LENGTH` so predictions stay sane for short and long
 * cycles alike — this is materially more accurate than the naive "day 14" rule.
 */
export const LUTEAL_LENGTH = 14;

/** Parse a yyyy-mm-dd string into a UTC-midnight Date to avoid TZ drift. */
export function parseDate(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
}

export function toISODate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function addDays(iso: string, days: number): string {
  return toISODate(new Date(parseDate(iso).getTime() + days * MS_PER_DAY));
}

/** Whole-day difference (b - a), ignoring time-of-day. */
export function daysBetween(aIso: string, bIso: string): number {
  return Math.round((parseDate(bIso).getTime() - parseDate(aIso).getTime()) / MS_PER_DAY);
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, n));
}

/**
 * Compute the cycle phase and key predictions for a given day.
 * Pure and deterministic — easy to unit test and to run on either side of a
 * client/server boundary.
 */
export function getPhaseInfo(profile: CycleProfile, onIso: string): PhaseInfo {
  const cycleLength = clamp(Math.round(profile.cycleLength) || 28, 21, 45);
  const periodLength = clamp(Math.round(profile.periodLength) || 5, 1, 10);

  // How many days since the anchored last period start (can span many cycles).
  const elapsed = daysBetween(profile.lastPeriodStart, onIso);

  // Position within the current cycle, normalised to [0, cycleLength).
  const offset = ((elapsed % cycleLength) + cycleLength) % cycleLength;
  const cycleDay = offset + 1; // 1-indexed

  const cycleStartIso = addDays(onIso, -offset);
  const nextPeriodStart = addDays(cycleStartIso, cycleLength);
  const daysUntilNextPeriod = daysBetween(onIso, nextPeriodStart);

  // +1 so the gap from the ovulation date to the next period start equals
  // LUTEAL_LENGTH exactly (next period falls on cycleStart + cycleLength).
  const ovulationDay = clamp(cycleLength - LUTEAL_LENGTH + 1, periodLength + 1, cycleLength - 1);
  const ovulationDate = addDays(cycleStartIso, ovulationDay - 1);

  // Fertile window: ~5 days before ovulation through 1 day after.
  const isFertileWindow = cycleDay >= ovulationDay - 5 && cycleDay <= ovulationDay + 1;

  let id: PhaseId;
  if (cycleDay <= periodLength) {
    id = "menstrual";
  } else if (cycleDay >= ovulationDay - 1 && cycleDay <= ovulationDay + 1) {
    id = "ovulation";
  } else if (cycleDay < ovulationDay - 1) {
    id = "follicular";
  } else {
    id = "luteal";
  }

  // PMS commonly shows up in the last few days before the period.
  const isPmsWindow = id === "luteal" && daysUntilNextPeriod <= 4;

  return {
    id,
    cycleDay,
    daysUntilNextPeriod,
    nextPeriodStart,
    ovulationDate,
    isPmsWindow,
    isFertileWindow,
  };
}

/** Project the next N period start dates — used for the calendar view. */
export function upcomingPeriods(profile: CycleProfile, fromIso: string, count = 6): string[] {
  const cycleLength = clamp(Math.round(profile.cycleLength) || 28, 21, 45);
  const first = getPhaseInfo(profile, fromIso).nextPeriodStart;
  const out: string[] = [];
  for (let i = 0; i < count; i++) {
    out.push(addDays(first, i * cycleLength));
  }
  return out;
}
