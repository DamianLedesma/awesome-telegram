"use client";

import { useApp } from "@/components/AppProvider";
import { defaultState, upsertLog } from "@/lib/storage";
import { toISODate } from "@/lib/cycle";
import type { SharingPrefs, SymptomId } from "@/lib/types";

const SYMPTOMS: SymptomId[] = [
  "cramps",
  "fatigue",
  "headache",
  "bloating",
  "back-pain",
  "tender-breasts",
  "low-mood",
  "irritable",
  "anxious",
  "cravings",
  "high-energy",
];

const SHARING_LABELS: Record<keyof SharingPrefs, string> = {
  sharePhase: "Share current phase",
  sharePredictions: "Share predictions (next period, calendar)",
  shareSymptoms: "Share daily symptoms",
  shareMood: "Share mood",
};

export default function SettingsPage() {
  const { state, setState, ready } = useApp();
  if (!ready) return <div className="animate-pulse text-ink/40">Loading…</div>;

  const today = toISODate(new Date());
  const todaySymptoms = state.logs.find((l) => l.date === today)?.symptoms ?? [];

  const toggleSymptom = (s: SymptomId) => {
    setState((prev) => {
      const existing = prev.logs.find((l) => l.date === today)?.symptoms ?? [];
      const next = existing.includes(s) ? existing.filter((x) => x !== s) : [...existing, s];
      return { ...prev, logs: upsertLog(prev.logs, { date: today, symptoms: next }) };
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-sm text-ink/50">
          In a real app, the tracker controls these. Here you can play with everything to see how the app responds.
        </p>
      </div>

      {/* Cycle profile */}
      <section className="card space-y-4">
        <h2 className="font-semibold">Cycle profile</h2>
        <label className="block text-sm">
          <span className="text-ink/60">Name of person you're supporting</span>
          <input
            className="mt-1 w-full rounded-xl border border-bloom-200 px-3 py-2"
            value={state.profile.trackerName}
            onChange={(e) => setState((p) => ({ ...p, profile: { ...p.profile, trackerName: e.target.value } }))}
          />
        </label>
        <label className="block text-sm">
          <span className="text-ink/60">Last period start date</span>
          <input
            type="date"
            className="mt-1 w-full rounded-xl border border-bloom-200 px-3 py-2"
            value={state.profile.lastPeriodStart}
            onChange={(e) => setState((p) => ({ ...p, profile: { ...p.profile, lastPeriodStart: e.target.value } }))}
          />
        </label>
        <div className="grid grid-cols-2 gap-4">
          <label className="block text-sm">
            <span className="text-ink/60">Cycle length: {state.profile.cycleLength} days</span>
            <input
              type="range"
              min={21}
              max={40}
              className="mt-2 w-full accent-bloom-500"
              value={state.profile.cycleLength}
              onChange={(e) => setState((p) => ({ ...p, profile: { ...p.profile, cycleLength: Number(e.target.value) } }))}
            />
          </label>
          <label className="block text-sm">
            <span className="text-ink/60">Period length: {state.profile.periodLength} days</span>
            <input
              type="range"
              min={2}
              max={8}
              className="mt-2 w-full accent-bloom-500"
              value={state.profile.periodLength}
              onChange={(e) => setState((p) => ({ ...p, profile: { ...p.profile, periodLength: Number(e.target.value) } }))}
            />
          </label>
        </div>
      </section>

      {/* Sharing / consent */}
      <section className="card space-y-3">
        <h2 className="font-semibold">Sharing & consent</h2>
        <p className="text-sm text-ink/60">The tracker decides what a partner can see. Toggle to watch the app adapt.</p>
        {(Object.keys(SHARING_LABELS) as (keyof SharingPrefs)[]).map((key) => (
          <label key={key} className="flex items-center justify-between gap-3 text-sm">
            <span>{SHARING_LABELS[key]}</span>
            <input
              type="checkbox"
              className="h-5 w-5 accent-bloom-500"
              checked={state.sharing[key]}
              onChange={(e) => setState((p) => ({ ...p, sharing: { ...p.sharing, [key]: e.target.checked } }))}
            />
          </label>
        ))}
      </section>

      {/* Today's log (simulating the tracker) */}
      <section className="card space-y-3">
        <h2 className="font-semibold">Log today's symptoms</h2>
        <p className="text-sm text-ink/60">Stand-in for what the tracker logs. These drive today's symptom-specific tips.</p>
        <div className="flex flex-wrap gap-2">
          {SYMPTOMS.map((s) => {
            const on = todaySymptoms.includes(s);
            return (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`chip ${on ? "border-bloom-500 bg-bloom-500 text-white" : "border-bloom-200 bg-white text-ink/70"}`}
              >
                {s.replace("-", " ")}
              </button>
            );
          })}
        </div>
      </section>

      {/* Premium + reset */}
      <section className="card flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-semibold">Premium (demo toggle)</h2>
          <p className="text-sm text-ink/60">Unlocks preparation, gift and symptom tips.</p>
        </div>
        <button
          onClick={() => setState((p) => ({ ...p, premium: !p.premium }))}
          className={state.premium ? "btn-ghost" : "btn-primary"}
        >
          {state.premium ? "Premium on — turn off" : "Enable Premium"}
        </button>
      </section>

      <button
        onClick={() => {
          if (confirm("Reset all demo data?")) setState(() => defaultState());
        }}
        className="text-sm text-ink/50 underline"
      >
        Reset demo data
      </button>
    </div>
  );
}
