"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useApp } from "@/components/AppProvider";
import { getPhaseInfo, toISODate } from "@/lib/cycle";
import { getSupport } from "@/lib/support";
import { PHASES } from "@/lib/phases";
import { logForDate } from "@/lib/storage";
import type { SupportTip } from "@/lib/support";

const CATEGORY: Record<SupportTip["category"], { icon: string; label: string }> = {
  do: { icon: "✅", label: "Do" },
  say: { icon: "💛", label: "Say" },
  avoid: { icon: "🚫", label: "Gently avoid" },
  prepare: { icon: "📦", label: "Prepare" },
  gift: { icon: "🎁", label: "Small gift" },
};

export default function TodayPage() {
  const { state, ready } = useApp();
  const today = toISODate(new Date());

  const { phase, support, sharedSymptoms } = useMemo(() => {
    const phase = getPhaseInfo(state.profile, today);
    const todayLog = logForDate(state.logs, today);
    const sharedSymptoms = state.sharing.shareSymptoms ? todayLog?.symptoms ?? [] : [];
    const support = getSupport(state.sharing.sharePhase ? phase : { ...phase, id: phase.id }, sharedSymptoms, state.premium);
    return { phase, support, sharedSymptoms };
  }, [state, today]);

  if (!ready) {
    return <div className="animate-pulse text-ink/40">Loading…</div>;
  }

  const meta = PHASES[phase.id];
  const name = state.profile.trackerName;
  const grouped = group(support.tips);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Today for {name}</h1>
        <p className="text-sm text-ink/50">{formatLong(today)}</p>
      </div>

      {/* Phase summary */}
      {state.sharing.sharePhase ? (
        <div className={`card ${meta.bg}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className={`text-lg font-bold ${meta.accent}`}>
              {meta.emoji} {meta.label} phase
            </span>
            <span className="chip border-white bg-white/70 text-ink/70">Cycle day {phase.cycleDay}</span>
          </div>
          <p className="mt-3 text-sm text-ink/75">{meta.whatsHappening}</p>
          <p className="mt-2 text-sm text-ink/60">
            <strong>You may notice:</strong> {meta.youMayNotice}
          </p>
          {state.sharing.sharePredictions && (
            <p className="mt-3 text-sm font-medium text-ink/80">
              {phase.daysUntilNextPeriod <= 0
                ? "Period expected today."
                : `Next period in ~${phase.daysUntilNextPeriod} day${phase.daysUntilNextPeriod === 1 ? "" : "s"} (${formatShort(
                    phase.nextPeriodStart,
                  )}).`}
            </p>
          )}
        </div>
      ) : (
        <div className="card text-sm text-ink/60">
          {name} has paused phase sharing. You'll still get general supportive reminders.
        </div>
      )}

      {/* Shared symptoms today */}
      {state.sharing.shareSymptoms && sharedSymptoms.length > 0 && (
        <div className="card">
          <p className="text-sm font-semibold">{name} shared today</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {sharedSymptoms.map((s) => (
              <span key={s} className="chip border-bloom-200 bg-bloom-50 text-bloom-700">
                {s.replace("-", " ")}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Support guidance */}
      <div>
        <h2 className="text-lg font-bold">{support.headline}</h2>
        <div className="mt-3 space-y-4">
          {grouped.map(([cat, tips]) => (
            <div key={cat} className="card">
              <p className="text-sm font-semibold text-ink/70">
                {CATEGORY[cat].icon} {CATEGORY[cat].label}
              </p>
              <ul className="mt-2 space-y-2">
                {tips.map((t) => (
                  <li key={t.id} className="text-sm text-ink/80">
                    {t.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {!state.premium && (
        <Link href="/pricing" className="card flex items-center justify-between bg-bloom-50 hover:bg-bloom-100">
          <span className="text-sm font-medium text-bloom-800">
            ✨ Unlock preparation tips, gift ideas and symptom-specific guidance
          </span>
          <span className="text-sm font-bold text-bloom-700">Go Premium →</span>
        </Link>
      )}

      <p className="text-center text-xs text-ink/40">
        General guidance, not medical advice. Everyone's cycle is different — follow {name}'s lead.
      </p>
    </div>
  );
}

function group(tips: SupportTip[]): [SupportTip["category"], SupportTip[]][] {
  const order: SupportTip["category"][] = ["say", "do", "prepare", "gift", "avoid"];
  const map = new Map<SupportTip["category"], SupportTip[]>();
  for (const t of tips) {
    if (!map.has(t.category)) map.set(t.category, []);
    map.get(t.category)!.push(t);
  }
  return order.filter((c) => map.has(c)).map((c) => [c, map.get(c)!]);
}

function formatLong(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function formatShort(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString(undefined, { month: "short", day: "numeric" });
}
