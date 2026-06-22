import type { PhaseId } from "./types";

export interface PhaseMeta {
  id: PhaseId;
  label: string;
  emoji: string;
  /** A short, plain-language description of what's happening physiologically. */
  whatsHappening: string;
  /** What the partner is likely to notice. */
  youMayNotice: string;
  accent: string; // tailwind text/border color token
  bg: string; // tailwind bg token
}

export const PHASES: Record<PhaseId, PhaseMeta> = {
  menstrual: {
    id: "menstrual",
    label: "Menstrual",
    emoji: "🌑",
    whatsHappening:
      "The period has started. Hormone levels are at their lowest and energy often dips. Cramps, fatigue and low mood are common.",
    youMayNotice: "Lower energy, a need for rest, cramps or back pain, wanting comfort and quiet.",
    accent: "text-bloom-600",
    bg: "bg-bloom-50",
  },
  follicular: {
    id: "follicular",
    label: "Follicular",
    emoji: "🌒",
    whatsHappening:
      "After the period, estrogen rises. Energy, mood and motivation usually climb — often the best stretch of the cycle.",
    youMayNotice: "More energy, optimism, openness to plans, new ideas and social time.",
    accent: "text-calm-700",
    bg: "bg-calm-50",
  },
  ovulation: {
    id: "ovulation",
    label: "Ovulation",
    emoji: "🌕",
    whatsHappening:
      "Estrogen peaks and an egg is released. Confidence, libido and sociability are often at their highest. This is the fertile window.",
    youMayNotice: "High energy, confidence, higher libido, feeling outgoing.",
    accent: "text-calm-700",
    bg: "bg-calm-50",
  },
  luteal: {
    id: "luteal",
    label: "Luteal",
    emoji: "🌘",
    whatsHappening:
      "Progesterone rises then falls toward the period. Energy winds down and PMS symptoms can appear in the final days.",
    youMayNotice: "Winding down, more sensitivity, cravings, bloating, irritability or anxiety late in the phase.",
    accent: "text-bloom-700",
    bg: "bg-bloom-50",
  },
};
