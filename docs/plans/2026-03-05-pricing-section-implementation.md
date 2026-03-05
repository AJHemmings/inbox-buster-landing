# Pricing Section — Lifetime Tier + Manifesto Block Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update `Pricing.tsx` to add a Lifetime tier, hide prices until launch, and replace the small Stripe Climate footnote with a prominent values-led manifesto block.

**Architecture:** All changes are self-contained in `src/components/Pricing.tsx`. No new files, no API changes, no other components touched. Real prices are stored in a `LAUNCH_PRICES` constant but not displayed — swapping them live on launch day is a one-line change per plan.

**Tech Stack:** Next.js 14, React, Tailwind CSS, Lucide React icons

**Design doc:** `docs/plans/2026-03-05-pricing-marketing-design.md`

---

## Context: Current state of Pricing.tsx

- 3 plans: Free, Monthly (£X placeholder), Annual (£XX placeholder)
- Grid: `md:grid-cols-3`
- Stripe Climate: small footnote, `text-white/40`
- Badge styles: `gray | purple | green`
- CTA styles: `green | purple | outline`
- No Lifetime plan exists

## What we are NOT changing

- Section header copy ("Simple pricing. No surprises.")
- Ambient background effects, dot grid, gradient bridge
- CTA text — all remain "Join the Waitlist →" linking to `/waitlist`
- Any other component

---

### Task 1: Add LAUNCH_PRICES constant and hide paid plan prices

**File:**
- Modify: `src/components/Pricing.tsx`

**What to do:**

Directly below the `"use client";` line and imports, add a `LAUNCH_PRICES` constant. Then update the `PLANS` array so all paid plans display a placeholder price string and no `period`.

**Step 1: Add LAUNCH_PRICES constant**

In `Pricing.tsx`, after the imports block and before the `interface Plan` definition, add:

```ts
/* ─── Launch prices (hidden until launch day) ────────────────────────────── */
// To reveal on launch: replace plan `price` strings with these values
// and restore the `period` fields below.
const LAUNCH_PRICES = {
  monthly: "£3",
  annual: "£28",
  lifetime: "£100",
} as const;

// Suppress unused-variable warning until launch day
void LAUNCH_PRICES;
```

**Step 2: Update Monthly plan in PLANS array**

Find the monthly plan object and change `price` and `period`:

```ts
// Before:
price: "£X",
period: "/ month",

// After:
price: "Pricing confirmed\nat launch",
period: null,
```

**Step 3: Update Annual plan in PLANS array**

```ts
// Before:
price: "£XX",
period: "/ year",

// After:
price: "Pricing confirmed\nat launch",
period: null,
```

**Step 4: Verify the dev server renders cleanly**

```bash
npm run dev
```

Open `http://localhost:3000/#pricing`. Monthly and Annual cards should show "Pricing confirmed at launch" with no period suffix. Free card unchanged.

**Step 5: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: store launch prices, display placeholder until launch day"
```

---

### Task 2: Add amber badge style and amber CTA button

**File:**
- Modify: `src/components/Pricing.tsx`

**What to do:**

Extend the `Badge` and `CtaButton` components to support an `"amber"` style for the new Lifetime card.

**Step 1: Add `"amber"` to the Plan interface badge and CTA types**

Find the `interface Plan` definition. Update:

```ts
// Before:
badgeStyle: "gray" | "purple" | "green";
// ...
ctaStyle: "green" | "purple" | "outline";

// After:
badgeStyle: "gray" | "purple" | "green" | "amber";
// ...
ctaStyle: "green" | "purple" | "outline" | "amber";
```

**Step 2: Add amber to Badge classes map**

In the `Badge` component, find the `classes` object and add:

```ts
amber: "bg-amber-400/15 text-amber-400",
```

**Step 3: Add amber CTA button case in CtaButton**

After the `if (style === "purple")` block and before the `// outline` fallback, add:

```tsx
if (style === "amber") {
  return (
    <Link
      href="/waitlist"
      className={`${base} bg-amber-400/15 text-amber-400 border border-amber-400/30 hover:bg-amber-400/25 hover:scale-[1.02] active:scale-100`}
    >
      {label}
    </Link>
  );
}
```

**Step 4: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: add amber badge and CTA button styles for Lifetime tier"
```

---

### Task 3: Add Lifetime plan and update grid to 4 columns

**File:**
- Modify: `src/components/Pricing.tsx`

**What to do:**

Add the Lifetime plan object to `PLANS` and update the grid layout.

**Step 1: Add Lifetime plan to PLANS array**

Append as the 4th item in the `PLANS` array:

```ts
{
  id: "lifetime",
  badge: "Own it forever",
  badgeStyle: "amber",
  price: "Pricing confirmed\nat launch",
  period: null,
  description: "Pay once. No renewals.",
  features: [
    "Unlimited emails",
    "All features included",
    "All future updates",
    "Priority support",
    "One payment. That's it.",
  ],
  cta: "Join the Waitlist →",
  ctaStyle: "amber",
  hero: false,
},
```

**Step 2: Update the PricingCard component to handle the amber border**

In `PricingCard`, the card currently uses `border-2 border-brand-purple` for hero cards and `border border-white/8` for others. Add an amber border condition for the lifetime card:

```tsx
// Before:
plan.hero
  ? "md:-mt-4 md:mb-4 border-2 border-brand-purple"
  : "border border-white/8",

// After:
plan.hero
  ? "md:-mt-4 md:mb-4 border-2 border-brand-purple"
  : plan.id === "lifetime"
    ? "border border-amber-400/40"
    : "border border-white/8",
```

Also update the card background style to include the amber card background:

```tsx
// Before:
background: plan.hero ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.04)",

// After:
background: plan.hero
  ? "rgba(139,92,246,0.10)"
  : plan.id === "lifetime"
    ? "rgba(251,191,36,0.06)"
    : "rgba(255,255,255,0.04)",
```

**Step 3: Update grid to 4 columns**

Find the grid div in the `Pricing` section:

```tsx
// Before:
<div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-start">

// After:
<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
```

Also update `max-w-6xl` to `max-w-7xl` on the container div so 4 cards have breathing room:

```tsx
// Before:
<div className="relative mx-auto max-w-6xl px-6 lg:px-8">

// After:
<div className="relative mx-auto max-w-7xl px-6 lg:px-8">
```

**Step 4: Verify in browser**

```bash
npm run dev
```

Check `http://localhost:3000/#pricing`. Should see 4 cards: Free (gray), Monthly (purple hero, raised), Annual (green badge), Lifetime (amber border + amber CTA). Grid should be 2×2 on tablet, 4-column on large screen.

**Step 5: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: add Lifetime tier card with amber styling and 4-column grid"
```

---

### Task 4: Replace Stripe Climate footnote with manifesto block

**File:**
- Modify: `src/components/Pricing.tsx`

**What to do:**

Remove the existing small `<p>` Stripe Climate callout and replace it with the full manifesto block.

**Step 1: Remove the existing callout**

Find and delete this entire block (including the `<p>` tag and its contents):

```tsx
{/* ── Stripe Climate callout ────────────────────────────────────── */}
<p
  className="pricing-callout mx-auto mt-12 max-w-md text-center text-sm leading-relaxed text-white/40"
  style={{ animationDelay: "350ms" }}
>
  🌱 1% of every subscription goes to carbon removal via{" "}
  <a
    href="https://stripe.com/climate"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-white/55 underline underline-offset-2 decoration-white/20 transition-colors hover:text-brand-purple hover:decoration-brand-purple/40"
  >
    Stripe Climate
  </a>
  .
</p>
```

**Step 2: Add the manifesto block in its place**

```tsx
{/* ── Manifesto block ──────────────────────────────────────────── */}
<div
  className="pricing-callout mx-auto mt-14 max-w-2xl rounded-2xl border border-brand-green/12 px-8 py-7"
  style={{
    background: "rgba(74,222,128,0.04)",
    borderLeft: "4px solid rgba(74,222,128,0.5)",
    animationDelay: "350ms",
  }}
>
  <p className="mb-1 text-base font-bold leading-relaxed text-white">
    Software should be honest.
  </p>
  <p className="text-sm leading-relaxed text-white/70">
    We charge what it costs to run — nothing more.
    <br />
    No upsell traps. No investor pressure.
    <br />
    Revenue keeps this app self-sufficient, and that&rsquo;s enough.
  </p>

  <p className="mt-5 text-sm leading-relaxed text-white/55">
    🌱 1% of every payment goes to carbon removal via{" "}
    <a
      href="https://stripe.com/climate"
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-white/70 underline underline-offset-2 decoration-white/20 transition-colors hover:text-brand-purple hover:decoration-brand-purple/40"
    >
      Stripe Climate
    </a>
    .
  </p>
</div>
```

**Step 3: Verify in browser**

```bash
npm run dev
```

Check `http://localhost:3000/#pricing`. The manifesto block should appear below the cards — prominent, left green border, readable. The Stripe Climate link should be clickable.

**Step 4: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: replace footnote with prominent pricing manifesto block"
```

---

### Task 5: Final build check

**Step 1: Run a production build to catch any TypeScript errors**

```bash
npm run build
```

Expected: clean build, no type errors. If TypeScript complains about `void LAUNCH_PRICES`, remove that line and add `// eslint-disable-next-line @typescript-eslint/no-unused-vars` above the const instead, or just leave it — it won't cause a runtime issue.

**Step 2: Visual QA checklist**

- [ ] Free card: unchanged, green CTA
- [ ] Monthly card: hero (raised, purple border), price shows "Pricing confirmed at launch", no period
- [ ] Annual card: "Best value" green badge, price shows "Pricing confirmed at launch"
- [ ] Lifetime card: "Own it forever" amber badge, amber border, amber CTA, "Pay once. No renewals."
- [ ] All 4 CTAs say "Join the Waitlist →" and link to `/waitlist`
- [ ] Grid: stacks on mobile, 2×2 on tablet, 4-col on large screen
- [ ] Manifesto block: visible below cards, green left border, correct copy, Stripe Climate link works
- [ ] No console errors

**Step 3: Commit if any fixes were needed from build**

```bash
git add src/components/Pricing.tsx
git commit -m "fix: resolve build warnings in Pricing.tsx"
```

---

## Launch-Day Checklist (for future reference)

When the app goes live:

1. In `LAUNCH_PRICES`, the values are already set: `£3`, `£28`, `£100`
2. Update each paid plan's `price` field to pull from `LAUNCH_PRICES`
3. Restore `period: "/ month"` on Monthly, `period: "/ year"` on Annual
4. Remove the `void LAUNCH_PRICES;` line
5. Update all CTA `href` values from `/waitlist` to live purchase links
6. Commit: `feat: reveal launch pricing and activate purchase CTAs`
