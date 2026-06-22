"use client";

import { PHASES } from "@/lib/phases";

const faqs = [
  {
    q: "Is every cycle 28 days?",
    a: "No — anywhere from 21 to 35 days is typical, and it varies month to month. Alongside anchors ovulation to a roughly constant luteal phase rather than assuming a fixed “day 14,” which keeps predictions sensible for shorter and longer cycles.",
  },
  {
    q: "What is PMS, really?",
    a: "Premenstrual symptoms appear in the days before the period as hormones fall — they can be physical (cramps, bloating, fatigue) and emotional (irritability, low mood, anxiety). They're physiological, not a character flaw. The most helpful response is patience and not dismissing feelings.",
  },
  {
    q: "What's the single most useful thing I can do?",
    a: "Ask, then listen. “What would feel good right now?” beats guessing. Take a task off their plate without being asked, and don't attribute every feeling to “hormones.”",
  },
  {
    q: "Should I track this myself?",
    a: "Only with consent. Alongside is built so the person whose cycle it is decides what to share. Awareness should reduce friction, never feel like surveillance.",
  },
];

export default function LearnPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learn</h1>
        <p className="text-sm text-ink/50">A plain-language guide to the cycle and how to show up.</p>
      </div>

      <section className="space-y-3">
        <h2 className="font-semibold">The four phases</h2>
        {Object.values(PHASES).map((p) => (
          <div key={p.id} className={`card ${p.bg}`}>
            <p className={`font-bold ${p.accent}`}>
              {p.emoji} {p.label}
            </p>
            <p className="mt-2 text-sm text-ink/75">{p.whatsHappening}</p>
            <p className="mt-1.5 text-sm text-ink/60">
              <strong>You may notice:</strong> {p.youMayNotice}
            </p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="font-semibold">Common questions</h2>
        {faqs.map((f) => (
          <details key={f.q} className="card">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-ink/70">{f.a}</p>
          </details>
        ))}
      </section>

      <p className="text-center text-xs text-ink/40">
        Educational content, not medical advice. For health concerns, talk to a clinician.
      </p>
    </div>
  );
}
