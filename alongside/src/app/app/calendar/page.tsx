"use client";

import { useApp } from "@/components/AppProvider";
import { getPhaseInfo, upcomingPeriods, addDays, toISODate } from "@/lib/cycle";
import { PHASES } from "@/lib/phases";

const DOT: Record<string, string> = {
  menstrual: "bg-bloom-500",
  follicular: "bg-calm-300",
  ovulation: "bg-calm-500",
  luteal: "bg-bloom-200",
};

export default function CalendarPage() {
  const { state, ready } = useApp();
  if (!ready) return <div className="animate-pulse text-ink/40">Loading…</div>;

  const today = toISODate(new Date());
  const days = Array.from({ length: 35 }, (_, i) => addDays(today, i));
  const periods = upcomingPeriods(state.profile, today, 6);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Calendar</h1>
        <p className="text-sm text-ink/50">The next five weeks for {state.profile.trackerName}.</p>
      </div>

      <div className="card">
        <div className="grid grid-cols-7 gap-2">
          {days.map((iso) => {
            const phase = getPhaseInfo(state.profile, iso);
            const isToday = iso === today;
            return (
              <div
                key={iso}
                className={`flex flex-col items-center rounded-xl border p-2 text-center ${
                  isToday ? "border-bloom-400 bg-bloom-50" : "border-transparent"
                }`}
                title={`${PHASES[phase.id].label} · cycle day ${phase.cycleDay}`}
              >
                <span className="text-[11px] text-ink/50">{new Date(iso + "T00:00:00").getDate()}</span>
                <span className={`mt-1 h-2.5 w-2.5 rounded-full ${DOT[phase.id]}`} />
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-3 text-xs text-ink/60">
          {Object.values(PHASES).map((p) => (
            <span key={p.id} className="inline-flex items-center gap-1.5">
              <span className={`h-2.5 w-2.5 rounded-full ${DOT[p.id]}`} /> {p.label}
            </span>
          ))}
        </div>
      </div>

      {state.sharing.sharePredictions ? (
        <div className="card">
          <h2 className="font-semibold">Predicted upcoming periods</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {periods.map((iso) => (
              <li key={iso} className="flex items-center justify-between border-b border-bloom-50 pb-2 last:border-0">
                <span>{new Date(iso + "T00:00:00").toLocaleDateString(undefined, { weekday: "short", month: "long", day: "numeric" })}</span>
                <span className="chip border-bloom-200 bg-bloom-50 text-bloom-700">🌑 ~{state.profile.periodLength} days</span>
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-ink/40">Predictions are estimates and shift as the cycle is logged.</p>
        </div>
      ) : (
        <div className="card text-sm text-ink/60">
          {state.profile.trackerName} has turned off prediction sharing.
        </div>
      )}
    </div>
  );
}
