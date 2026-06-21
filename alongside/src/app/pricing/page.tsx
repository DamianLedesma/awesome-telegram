import Link from "next/link";
import { Brand } from "@/components/Brand";

const tiers = [
  {
    name: "Free",
    price: "$0",
    cadence: "forever",
    blurb: "Everything you need to show up better, today.",
    features: [
      "Daily phase view & predictions",
      "Core support tips (do / say / avoid)",
      "5-week calendar",
      "Learn library",
      "Consent-first sharing",
    ],
    cta: "Open the app",
    href: "/app",
    highlight: false,
  },
  {
    name: "Premium",
    price: "$4.99",
    cadence: "per month",
    blurb: "For partners who want to go the extra mile.",
    features: [
      "Everything in Free",
      "Preparation & restock reminders",
      "Symptom-specific guidance",
      "Curated gift & comfort ideas",
      "Multiple people / relationships",
      "Smart heads-up notifications",
    ],
    cta: "Start 14-day free trial",
    href: "/app",
    highlight: true,
  },
  {
    name: "Teams",
    price: "Let's talk",
    cadence: "employer wellness",
    blurb: "Menstrual-health literacy as an employee benefit.",
    features: ["Org-wide access", "Aggregate, anonymised insights", "Manager education modules", "Priority support"],
    cta: "Contact sales",
    href: "/app",
    highlight: false,
  },
];

export default function PricingPage() {
  return (
    <main className="min-h-screen">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Brand />
        <Link href="/app" className="btn-primary">
          Open the app
        </Link>
      </header>

      <section className="mx-auto max-w-6xl px-6 py-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Simple, honest pricing</h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/70">
          Free is genuinely useful — not a crippled trial. Premium adds preparation, personalisation and thoughtful
          extras.
        </p>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 lg:grid-cols-3">
        {tiers.map((t) => (
          <div
            key={t.name}
            className={`card flex flex-col ${t.highlight ? "border-bloom-400 ring-2 ring-bloom-200" : ""}`}
          >
            {t.highlight && (
              <span className="chip mb-3 w-fit border-bloom-300 bg-bloom-50 text-bloom-700">Most popular</span>
            )}
            <h2 className="text-xl font-bold">{t.name}</h2>
            <p className="mt-1 text-sm text-ink/60">{t.blurb}</p>
            <div className="mt-4">
              <span className="text-3xl font-extrabold">{t.price}</span>{" "}
              <span className="text-sm text-ink/50">{t.cadence}</span>
            </div>
            <ul className="mt-5 space-y-2 text-sm text-ink/75">
              {t.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <span className="text-bloom-500">✓</span> {f}
                </li>
              ))}
            </ul>
            <Link
              href={t.href}
              className={`mt-6 ${t.highlight ? "btn-primary" : "btn-ghost"} w-full`}
            >
              {t.cta}
            </Link>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <p className="text-sm text-ink/50">
          Ethical monetisation only: no selling personal cycle data, ever. Optional affiliate links to products are
          clearly marked and never required.
        </p>
        <div className="mt-6">
          <Brand className="justify-center" />
        </div>
      </section>
    </main>
  );
}
