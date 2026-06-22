# Alongside — Product & Business Strategy

A senior-SaaS-developer's take on *the best kind of app* for partners of menstruating
people: what to build, how it stands out, and how it can earn passive income.

---

## 1. The opportunity

- **Huge top-of-funnel.** ~26% of the global population menstruates; most have at
  least one partner, friend, or family member who wants to be supportive but doesn't
  know how. The *supporter* is an under-served, almost untouched user segment.
- **Crowded on one side, empty on the other.** Tracker apps (Clue, Flo, Stardust,
  Spot On, Natural Cycles) are mature and well-funded — all aimed at the *menstruating
  person*. Partner-facing apps are a graveyard of novelty toys ("PMS warning!") and
  abandoned projects. **The respectful, useful partner app does not really exist yet.**
- **Cultural tailwind.** Menstrual-health literacy, emotional labour, and "mental load"
  are mainstream conversations. An app that helps people show up well fits the moment.

## 2. Competitive benchmark

| Product | Built for | Strength | Gap Alongside exploits |
| --- | --- | --- | --- |
| **Clue** | Tracker | Science-backed, trusted | Partner is an afterthought |
| **Flo** | Tracker | Huge reach, "partner mode" | Partner view is read-only data, not guidance |
| **Stardust** | Tracker | Community, astrology angle | Not partner-oriented; privacy concerns |
| **Spot On (PP)** | Tracker | Free, clinical | No partner support layer |
| Novelty "PMS" apps | Partner | — | Creepy framing, no consent, no real value |

**Insight:** every incumbent treats the partner as a passive viewer of someone else's
data. Alongside treats the partner as the *primary user with their own job to do*:
**show up well.** That reframing is the moat.

## 3. Positioning

> **Alongside** — *Show up at the right time, every time.*
> The cycle-support app for partners. Consent-first, practical, for every relationship.

Three pillars:

1. **Consent-first.** The menstruating person owns the data and the sharing switches.
   This is both an ethical stance and the marketing wedge that separates us from creepy
   competitors.
2. **Actionable over informational.** We answer "what do I *do*?" not "what day is it?"
3. **Universal.** Inclusive language; works for any gender and any relationship
   (romantic, friend, parent, roommate). Bigger market, less stigma.

## 4. What makes it stand out (the "useful for everybody" test)

- Turns a data point (cycle phase) into **behaviour** (do/say/avoid/prepare/gift).
- **Symptom-aware**: today's shared symptoms override the statistical average, so advice
  is real, not generic.
- **Reduces stigma** by educating supporters — value that radiates beyond the couple.
- **Low effort, high payoff**: open once a day, get one or two concrete nudges.

## 5. Monetisation — paths to passive income

Layered so the free tier is genuinely good (great for word-of-mouth and SEO) while
several revenue streams compound:

1. **Freemium subscription** — Premium at **$4.99/mo** (or ~$39/yr).
   - Preparation/restock reminders, symptom-specific guidance, curated gift ideas,
     multiple people, smart notifications.
   - Even a small conversion on a large, cheap-to-acquire top-of-funnel scales well.
2. **Ethical affiliate commerce** — clearly-marked, optional links to relevant products
   (heating pads, supplies, comfort items, gifts). Tied to *Prepare/Gift* tips, so it's
   contextual and helpful, not spammy. Recurring, hands-off commission revenue.
3. **B2B / employer wellness (Teams)** — menstrual-health literacy as an employee
   benefit; aggregate, anonymised, opt-in only. Higher ACV, stickier.
4. **Content/SEO engine** — the *Learn* library targets high-intent searches
   ("how to support partner on period", "what to do for PMS"), driving free organic
   installs that feed (1) and (2).

**Why it can be "passive":** content + SEO + affiliate + auto-renewing subscriptions are
low-touch once built. The roadmap intentionally front-loads the durable, compounding
assets (engine, content, sharing model).

## 6. Ethics & trust (non-negotiable, and a competitive advantage)

- **Never sell personal cycle data.** State it loudly; it's a differentiator.
- **Consent is revocable instantly**; sharing scopes enforced server-side in production.
- **Encrypt cycle data at rest.**
- **Not medical advice** — clear disclaimers; defer to the user and clinicians.

## 7. 90-day plan

- **Weeks 1–3:** This MVP → auth + real pairing flow.
- **Weeks 4–6:** Encrypted backend, server-enforced sharing scopes, Stripe Premium.
- **Weeks 7–9:** Push notifications (period heads-up + daily nudge), affiliate
  integration on Prepare/Gift tips.
- **Weeks 10–12:** SEO content sprint on the Learn library; soft launch; native wrappers.

## 8. Key risks & mitigations

| Risk | Mitigation |
| --- | --- |
| "Creepy/surveillance" perception | Lead with consent-first; tracker owns all switches |
| Medical accuracy / liability | Clear "not medical advice"; conservative, supportive framing |
| Low willingness to pay | Free tier drives reach; affiliate + B2B diversify revenue |
| Privacy regulation (health data) | On-device by default; encryption; minimal data; opt-in |
