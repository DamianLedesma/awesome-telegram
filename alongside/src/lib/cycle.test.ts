import { describe, it, expect } from "vitest";
import { getPhaseInfo, upcomingPeriods, addDays, daysBetween, LUTEAL_LENGTH } from "./cycle";
import type { CycleProfile } from "./types";

const base: CycleProfile = {
  trackerName: "Test",
  lastPeriodStart: "2026-01-01",
  cycleLength: 28,
  periodLength: 5,
};

describe("date helpers", () => {
  it("adds days across month boundaries", () => {
    expect(addDays("2026-01-30", 5)).toBe("2026-02-04");
  });
  it("computes whole-day differences", () => {
    expect(daysBetween("2026-01-01", "2026-01-08")).toBe(7);
    expect(daysBetween("2026-01-08", "2026-01-01")).toBe(-7);
  });
});

describe("getPhaseInfo — phases for a 28-day cycle", () => {
  it("is menstrual on day 1", () => {
    const p = getPhaseInfo(base, "2026-01-01");
    expect(p.id).toBe("menstrual");
    expect(p.cycleDay).toBe(1);
  });

  it("is menstrual on the last bleeding day (day 5)", () => {
    expect(getPhaseInfo(base, "2026-01-05").id).toBe("menstrual");
  });

  it("is follicular shortly after the period (day 8)", () => {
    expect(getPhaseInfo(base, "2026-01-08").id).toBe("follicular");
  });

  it("is ovulation around day 14 (cycleLength - 14 = day 14)", () => {
    const p = getPhaseInfo(base, "2026-01-14");
    expect(p.id).toBe("ovulation");
    expect(p.isFertileWindow).toBe(true);
  });

  it("is luteal in the back half (day 22)", () => {
    expect(getPhaseInfo(base, "2026-01-22").id).toBe("luteal");
  });

  it("flags the PMS window in the final days before the period", () => {
    // Next period starts 2026-01-29; day 27 is 2 days out.
    const p = getPhaseInfo(base, "2026-01-27");
    expect(p.id).toBe("luteal");
    expect(p.isPmsWindow).toBe(true);
  });
});

describe("getPhaseInfo — predictions", () => {
  it("predicts the next period exactly one cycle out", () => {
    const p = getPhaseInfo(base, "2026-01-01");
    expect(p.nextPeriodStart).toBe("2026-01-29");
    expect(p.daysUntilNextPeriod).toBe(28);
  });

  it("counts down days until the next period mid-cycle", () => {
    const p = getPhaseInfo(base, "2026-01-20");
    expect(p.nextPeriodStart).toBe("2026-01-29");
    expect(p.daysUntilNextPeriod).toBe(9);
  });

  it("rolls forward correctly across multiple elapsed cycles", () => {
    // ~3 cycles after the anchor date.
    const p = getPhaseInfo(base, "2026-03-26"); // 2026-01-01 + 84 days = day 1 again
    expect(p.cycleDay).toBe(1);
    expect(p.id).toBe("menstrual");
  });

  it("anchors ovulation to a constant luteal length for long cycles", () => {
    const long: CycleProfile = { ...base, cycleLength: 35 };
    const ovIso = getPhaseInfo(long, "2026-01-01").ovulationDate;
    // Ovulation should sit LUTEAL_LENGTH days before the next period.
    const nextStart = getPhaseInfo(long, "2026-01-01").nextPeriodStart;
    expect(daysBetween(ovIso, nextStart)).toBe(LUTEAL_LENGTH);
  });
});

describe("upcomingPeriods", () => {
  it("returns evenly spaced future period starts", () => {
    const dates = upcomingPeriods(base, "2026-01-10", 3);
    expect(dates).toEqual(["2026-01-29", "2026-02-26", "2026-03-26"]);
  });
});
