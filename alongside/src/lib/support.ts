import type { PhaseId, PhaseInfo, SymptomId } from "./types";

export interface SupportTip {
  id: string;
  text: string;
  /** Category drives the icon and grouping in the UI. */
  category: "do" | "say" | "avoid" | "prepare" | "gift";
  /** Premium tips are part of the paid tier. */
  premium?: boolean;
}

/** Evergreen, phase-specific support suggestions. */
const PHASE_TIPS: Record<PhaseId, SupportTip[]> = {
  menstrual: [
    { id: "m1", text: "Offer a heating pad, hot water bottle, or a warm drink — heat genuinely helps cramps.", category: "do" },
    { id: "m2", text: "Take an item off their plate without being asked: cook, do the dishes, or handle an errand.", category: "do" },
    { id: "m3", text: '"What would feel good right now — company or space?" Then honour the answer.', category: "say" },
    { id: "m4", text: "Keep plans flexible. Don't push social events if they'd rather rest.", category: "avoid" },
    { id: "m5", text: "Restock supplies before they run low — pads, tampons, painkillers, favourite snacks.", category: "prepare", premium: true },
    { id: "m6", text: "Magnesium and gentle movement (a slow walk) can ease cramps — offer, don't insist.", category: "do", premium: true },
  ],
  follicular: [
    { id: "f1", text: "Energy is usually up — a great time to suggest a date, trip, or that thing you've been meaning to do.", category: "do" },
    { id: "f2", text: "Match the momentum: start a project together or plan something to look forward to.", category: "do" },
    { id: "f3", text: '"You seem really energised lately — want to do something fun this weekend?"', category: "say" },
    { id: "f4", text: "Back their new ideas and goals; this is often when motivation peaks.", category: "do", premium: true },
  ],
  ovulation: [
    { id: "o1", text: "Confidence and sociability are often high — say yes to plans and lean into connection.", category: "do" },
    { id: "o2", text: "A good window for meaningful conversations and quality time.", category: "do" },
    { id: "o3", text: '"I love this energy on you." A genuine compliment lands well right now.', category: "say" },
    { id: "o4", text: "If you're trying to conceive, this is the fertile window. If you're not, keep contraception in mind.", category: "prepare", premium: true },
  ],
  luteal: [
    { id: "l1", text: "Energy is winding down. Lower the bar on chores and social obligations together.", category: "do" },
    { id: "l2", text: "Stock comfort foods and snacks — cravings are physiological, not a failing.", category: "prepare" },
    { id: "l3", text: '"Whatever you\'re feeling is valid. I\'m on your team." Reassurance over fixing.', category: "say" },
    { id: "l4", text: 'Avoid "are you sure that\'s not just your hormones?" — it dismisses real feelings.', category: "avoid" },
    { id: "l5", text: "Pre-empt the next period: tidy the supply drawer and plan a lighter few days.", category: "prepare", premium: true },
    { id: "l6", text: "Plan a low-key comfort gift for the coming days — favourite chocolate, cosy socks, a film night.", category: "gift", premium: true },
  ],
};

/** Extra tips that fire when a specific symptom has been shared today. */
const SYMPTOM_TIPS: Partial<Record<SymptomId, SupportTip>> = {
  cramps: { id: "s-cramps", text: "Cramps logged today — lead with heat, painkillers within reach, and no pressure to be productive.", category: "do" },
  fatigue: { id: "s-fatigue", text: "Fatigue logged — protect their rest. Handle dinner and dim the to-do list.", category: "do" },
  headache: { id: "s-headache", text: "Headache logged — water, a dark quiet room, and lower the noise/screens around them.", category: "do" },
  "low-mood": { id: "s-lowmood", text: "Low mood shared — sit with them, don't try to fix it. Presence beats advice.", category: "say" },
  irritable: { id: "s-irritable", text: "Irritability shared — don't take it personally. Give a little space and stay kind.", category: "avoid" },
  anxious: { id: "s-anxious", text: "Anxiety shared — a calm, steady presence and a clear plan for the day can settle things.", category: "say" },
  cravings: { id: "s-cravings", text: "Cravings shared — surprise them with the snack they actually want. Small, easy win.", category: "gift" },
  bloating: { id: "s-bloating", text: "Bloating shared — comfy clothes, no comments about food, gentle walk if they're up for it.", category: "avoid" },
  "back-pain": { id: "s-back", text: "Back pain shared — offer heat on the lower back and a hand with anything that needs lifting.", category: "do" },
  "tender-breasts": { id: "s-tender", text: "Tenderness shared — be gentle with physical affection and let them set the pace.", category: "do" },
};

export interface SupportResult {
  headline: string;
  tips: SupportTip[];
}

/**
 * Build today's support guidance from the phase plus any shared symptoms.
 * Symptom-driven tips are prioritised because they reflect what's actually
 * happening right now over the statistical average for the phase.
 */
export function getSupport(
  phase: PhaseInfo,
  sharedSymptoms: SymptomId[],
  premium: boolean,
): SupportResult {
  const symptomTips = sharedSymptoms
    .map((s) => SYMPTOM_TIPS[s])
    .filter((t): t is SupportTip => Boolean(t));

  let phaseTips = PHASE_TIPS[phase.id];
  if (phase.isPmsWindow) {
    phaseTips = [
      { id: "pms1", text: "Period is close. Extra patience now; restock supplies and plan a gentle few days.", category: "prepare" },
      ...phaseTips,
    ];
  }

  const all = [...symptomTips, ...phaseTips];
  const tips = premium ? all : all.filter((t) => !t.premium);

  const headline = phase.isPmsWindow
    ? "PMS window — lead with patience and preparation"
    : {
        menstrual: "Period days — comfort, rest and taking things off their plate",
        follicular: "High-energy stretch — a great time to connect and make plans",
        ovulation: "Peak energy — say yes to connection and quality time",
        luteal: "Winding down — lower the bar and offer reassurance",
      }[phase.id];

  return { headline, tips };
}
