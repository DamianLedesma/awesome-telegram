# Alongside

**The cycle-support app for partners. Show up at the right time, every time.**

Most period apps are built for the person who menstruates. **Alongside is built for
the person beside them** — turning the menstrual cycle into clear, kind, practical
ways to help, with consent-first sharing at its core.

> ⚠️ Educational support tool, **not medical advice**.

---

## 🚀 Launch the live demo

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FDamianLedesma%2Fawesome-telegram&root-directory=alongside&project-name=alongside&repository-name=alongside)

This repo lives in a subdirectory, so set **Root Directory** when importing:

1. Go to **[vercel.com/new](https://vercel.com/new)** and import `DamianLedesma/awesome-telegram`
   (use the branch `claude/menstrual-partner-app-vx76ck`).
2. **Set _Root Directory_ to `alongside`** — this is the one setting that matters.
3. Leave the rest on defaults (Vercel auto-detects Next.js via `vercel.json`) and **Deploy**.

You'll get a public `https://<project>.vercel.app` link in ~2 minutes. Free tier is plenty.

> The one-click button above clones the repo into your own account; the manual steps
> deploy this repo directly. Either works.

---

## Why this app

The market for period trackers is crowded (Clue, Flo, Stardust). The market for
**partner-facing support** is nearly empty and what exists is mostly novelty or
faintly creepy ("warn me when she's angry"). Alongside takes the respectful,
genuinely useful angle:

| Differentiator | What it means |
| --- | --- |
| **Consent-first** | The menstruating person controls exactly what's shared. No surveillance. |
| **Actionable, not just data** | Not "she's on day 14" — the helpful thing to *do / say / avoid* today. |
| **Phase + symptom aware** | Guidance reflects both the cycle phase and what was actually shared today. |
| **Inclusive** | Any relationship, any gender. Support is universal. |
| **Privacy as a feature** | Cycle data stays on-device in this MVP; the model is opt-in and revocable. |

See [`PRODUCT.md`](./PRODUCT.md) for the full benchmarking, positioning and
monetisation strategy.

## What's in this MVP

A runnable **Next.js + TypeScript + Tailwind** app:

- **Landing + pricing** marketing pages.
- **Today** — phase, what's happening, and grouped support tips (do / say / avoid /
  prepare / gift), driven by phase **and** shared symptoms.
- **Calendar** — five-week phase view + predicted upcoming periods.
- **Learn** — plain-language library on the four phases + FAQs.
- **Settings** — edit the cycle, flip consent toggles, log symptoms, toggle Premium,
  and watch the whole app respond.
- **Tested prediction engine** (`src/lib/cycle.ts`) anchoring ovulation to a constant
  ~14-day luteal phase for accuracy across short and long cycles.

Persistence is browser `localStorage`, behind a small interface (`src/lib/storage.ts`)
so it can be swapped for an authenticated, encrypted backend without touching the UI.

## Run it

```bash
cd alongside
npm install
npm run dev     # http://localhost:3000
npm test        # cycle-engine unit tests (vitest)
npm run build   # production build
```

## Project structure

```
src/
  app/
    page.tsx              landing
    pricing/page.tsx      pricing tiers
    app/                  the product (Today / Calendar / Learn / Settings)
  components/             Brand, Nav, AppProvider (state context)
  lib/
    cycle.ts              prediction engine (pure, tested)
    cycle.test.ts         unit tests
    phases.ts             phase descriptions
    support.ts            phase + symptom support content
    storage.ts            persistence interface
    types.ts              domain types
```

## Roadmap to production

1. **Auth + real pairing** — invite codes link a tracker and partner; consent stored server-side.
2. **Encrypted backend** — cycle data encrypted at rest; sharing scopes enforced on the server.
3. **Push notifications** — heads-up before the period; gentle daily nudge.
4. **Payments** — Stripe for Premium ($4.99/mo) with a 14-day trial.
5. **Ethical affiliate commerce** — clearly-marked product suggestions (supplies, comfort, gifts).
6. **Native wrappers** — ship to iOS/Android via the same codebase.

## License

MIT (see repository root).
