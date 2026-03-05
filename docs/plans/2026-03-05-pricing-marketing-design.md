# Pricing Section — Marketing & Transparency Design

**Date:** 2026-03-05
**Status:** Approved
**Scope:** `src/components/Pricing.tsx` only

---

## Goal

Communicate that pricing reflects real infrastructure costs — not profit-seeking — while elevating the Stripe Climate pledge from a footnote to a prominent brand value. Add a Lifetime tier and prepare prices for a launch-day reveal.

---

## Changes

### 1. Plans data

Real prices are stored as a `LAUNCH_PRICES` constant in the file, hidden from the UI until launch day. The displayed price for all paid tiers reads `"Pricing confirmed at launch"`. Free stays `"Free"`.

```ts
const LAUNCH_PRICES = { monthly: "£3", annual: "£28", lifetime: "£100" };
```

- `period` (e.g. `/ month`) is also hidden while prices are TBC, so no dangling suffix appears.
- On launch day: swap the displayed `price` strings to pull from `LAUNCH_PRICES` and restore `period` values.

### 2. Lifetime card (new 4th tier)

- **Badge:** "Own it forever" — gold/amber accent (`bg-amber-400/15 text-amber-400`)
- **Price display:** "Pricing confirmed at launch"
- **Description:** "Pay once. No renewals."
- **Features:** Unlimited emails · All features · All future updates · Priority support · One payment. That's it.
- **CTA:** "Join the Waitlist →" — amber/gold button style
- **Card border:** `border-amber-400/40`, background `rgba(251,191,36,0.06)`

### 3. Grid layout

Change from `md:grid-cols-3` to `sm:grid-cols-2 lg:grid-cols-4`. This gives:
- 1 column on mobile
- 2×2 on tablet
- 4-column on large screens

The Monthly plan remains the hero card (raised, purple border).

### 4. Manifesto block

A full-width block below the 4 cards. Replaces the existing small Stripe Climate footnote.

**Copy:**
> Software should be honest.
> We charge what it costs to run — nothing more.
> No upsell traps. No investor pressure.
> Revenue keeps this app self-sufficient, and that's enough.
>
> 🌱 1% of every payment goes to carbon removal via [Stripe Climate →](https://stripe.com/climate)

**Styling:**
- Left border: `border-l-4 border-brand-green`
- Background: `rgba(74,222,128,0.04)`
- Outer border: `border border-brand-green/12`
- Manifesto text: `text-white/75`, first line `text-white font-bold`
- Stripe Climate link: existing hover-to-purple behaviour

### 5. CTAs

All plan CTAs remain `"Join the Waitlist →"` linking to `/waitlist`. No changes needed.

---

## What is NOT changing

- Section header copy ("Simple pricing. No surprises.")
- Overall section layout, background, and ambient effects
- Features section — no new card added there
- Any other page components

---

## Launch-day checklist

- [ ] Replace displayed `price` strings in `PLANS` with values from `LAUNCH_PRICES`
- [ ] Restore `period` values (`/ month`, `/ year`) on Monthly and Annual cards
- [ ] Update Lifetime card price to `LAUNCH_PRICES.lifetime`
- [ ] Update CTAs from "Join the Waitlist →" to live purchase links
