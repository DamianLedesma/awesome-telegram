export type PhaseId = "menstrual" | "follicular" | "ovulation" | "luteal";

export type Mood = "great" | "good" | "okay" | "low" | "rough";

export type SymptomId =
  | "cramps"
  | "fatigue"
  | "headache"
  | "bloating"
  | "back-pain"
  | "tender-breasts"
  | "low-mood"
  | "irritable"
  | "anxious"
  | "cravings"
  | "high-energy"
  | "none";

/** What the menstruating person ("the tracker") chooses to share with their partner. */
export interface SharingPrefs {
  sharePhase: boolean;
  shareSymptoms: boolean;
  sharePredictions: boolean;
  shareMood: boolean;
}

/** Cycle parameters owned by the tracker. */
export interface CycleProfile {
  /** ISO date (yyyy-mm-dd) of the most recent period start. */
  lastPeriodStart: string;
  /** Average length of the full cycle in days. */
  cycleLength: number;
  /** Average number of bleeding days. */
  periodLength: number;
  /** Display name of the person being supported. */
  trackerName: string;
}

export interface DailyLog {
  date: string; // yyyy-mm-dd
  mood?: Mood;
  symptoms: SymptomId[];
  note?: string;
}

export interface Pairing {
  /** Pseudonymous pairing code that links partner <-> tracker. */
  code: string;
  partnerName: string;
  consentGivenAt: string; // ISO timestamp
}

export interface AppState {
  profile: CycleProfile;
  sharing: SharingPrefs;
  pairing?: Pairing;
  logs: DailyLog[];
  premium: boolean;
}

export interface PhaseInfo {
  id: PhaseId;
  /** 1-indexed day within the current cycle. */
  cycleDay: number;
  /** Days remaining until the next predicted period start. */
  daysUntilNextPeriod: number;
  /** ISO date of the next predicted period start. */
  nextPeriodStart: string;
  /** ISO date of the predicted ovulation day. */
  ovulationDate: string;
  /** True during the ~4 days of luteal phase where PMS commonly occurs. */
  isPmsWindow: boolean;
  /** True when within the fertile window. */
  isFertileWindow: boolean;
}
