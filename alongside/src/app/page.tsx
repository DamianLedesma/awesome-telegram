import Link from "next/link";
import { Brand } from "@/components/Brand";

const features = [
  {
    emoji: "🤝",
    title: "Consent-first by design",
    body: "Your partner shares exactly what they choose — phase, symptoms, mood, or nothing at all. No surveillance, ever.",
  },
  {
    emoji: "🎯",
    title: "Practical, not just data",
    body: "Not “she's on day 14.” Instead: the helpful thing to do, say, or avoid today — tuned to the phase and how they actually feel.",
  },
  {
    emoji: "📅",
    title: "Never caught off guard",
    body: "Gentle heads-up before the period starts so you can restock supplies and plan a lighter few days together.",
  },
  {
    emoji: "📚",
    title: "Learn the why",
    body: "A plain-language library on the cycle and its phases — destigmatising and genuinely useful for everyone.",
  },
  {
    emoji: "🌈",
    title: "For every relationship",
    body: "Partner, friend, parent, roommate — any gender, any relationship. Support is universal.",
  },
  {
    emoji: "🔒",
    title: "Privacy as a feature",
    body: "Cycle data stays on-device in this build. The whole model is opt-in and revocable at any moment.",
  },
];

const steps = [
  { n: 1, title: "Pair with consent", body: "Your partner sends a pairing invite and chooses what to share." },
  { n: 2, title: "Get daily guidance", body: "Open the Today view for the phase and one or two concrete ways to show up." },
  { n: 3, title: "Show up on time", body: "Heads-up before the period, gentle reminders, and a growing sense of being in sync." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Brand />
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/pricing" className="hidden font-medium text-ink/70 hover:text-ink sm:inline">
            Pricing
          </Link>
          <Link href="/app" className="btn-primary">
            Open the app
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-10 pt-10 sm:pt-16">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="chip border-bloom-200 bg-bloom-50 text-bloom-700">
              The support app for partners
            </span>
            <h1 className="mt-5 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
              Show up at the right time, <span className="text-bloom-500">every time.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-ink/70">
              Most period apps are built for the person bleeding. <strong>Alongside is built for the
              person beside them</strong> — turning the cycle into clear, kind, practical ways to help.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/app" className="btn-primary">
                Try the demo — no signup
              </Link>
              <Link href="/pricing" className="btn-ghost">
                See pricing
              </Link>
            </div>
            <p className="mt-4 text-sm text-ink/50">
              Demo runs entirely in your browser. Nothing leaves your device.
            </p>
          </div>

          <div className="card bg-gradient-to-br from-white to-bloom-50">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-ink/60">Today for Sam</p>
              <span className="chip border-bloom-200 bg-white text-bloom-700">🌘 Luteal · day 25</span>
            </div>
            <p className="mt-4 text-lg font-semibold">PMS window — lead with patience and preparation</p>
            <ul className="mt-4 space-y-2 text-sm">
              <li className="rounded-xl bg-white p-3 shadow-sm">
                💛 <strong>Say:</strong> “Whatever you're feeling is valid. I'm on your team.”
              </li>
              <li className="rounded-xl bg-white p-3 shadow-sm">
                ✅ <strong>Do:</strong> Take dinner off their plate tonight.
              </li>
              <li className="rounded-xl bg-white p-3 shadow-sm">
                📦 <strong>Prepare:</strong> Period likely in 3 days — restock the supply drawer.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="text-2xl font-bold tracking-tight">Why it's different</h2>
        <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="card">
              <div className="text-2xl">{f.emoji}</div>
              <h3 className="mt-3 font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-ink/70">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 pb-14">
        <div className="card bg-calm-50">
          <h2 className="text-2xl font-bold tracking-tight">How it works</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-3">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="grid h-9 w-9 place-items-center rounded-full bg-calm-500 font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-ink/70">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <div className="card flex flex-col items-center gap-4 bg-bloom-500 py-10 text-center text-white">
          <h2 className="text-2xl font-bold">Be the partner who just gets it.</h2>
          <p className="max-w-md text-white/80">
            Try the live demo now — set a cycle, open the Today view, and see the guidance update.
          </p>
          <Link href="/app" className="btn bg-white text-bloom-600 hover:bg-bloom-50">
            Open the app
          </Link>
        </div>
      </section>

      <footer className="border-t border-bloom-100">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-ink/60 sm:flex-row">
          <Brand />
          <p>Not medical advice. © {new Date().getFullYear()} Alongside.</p>
        </div>
      </footer>
    </main>
  );
}
