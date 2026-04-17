# Background Unification, Section Separators & Pricing Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Unify all section backgrounds to `brand-dark`, replace colour-change separators with an animated dot-wave `SectionDivider`, and restructure pricing from 4 plans to 3 with real prices.

**Architecture:** `SectionDivider` is a new presentational component inserted between sections in `page.tsx`. Pricing data is fully replaced in `PLANS` — no incremental patching. CSS changes are isolated to `globals.css`.

**Tech Stack:** Next.js 16, Tailwind v4, TypeScript, CSS keyframes

---

## File Map

| File | Action | What changes |
|------|--------|-------------|
| `src/app/globals.css` | Modify | Add `@keyframes dotWave`; remove `@keyframes amberShineSpin` and `.amber-shine-ring` |
| `src/components/SectionDivider.tsx` | **Create** | New animated dot-wave separator component |
| `src/app/page.tsx` | Modify | Add `bg-brand-dark` to `<main>`; insert `<SectionDivider />` between sections |
| `src/components/Features.tsx` | Modify | `bg-brand-mid` → `bg-brand-dark`; remove top `aria-hidden` gradient div |
| `src/components/Pricing.tsx` | Modify | Replace all 4 plan objects with 3; update grid, callout copy, remove all amber code |

---

### Task 1: Add `dotWave` keyframe to globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Add the keyframe**

Open `src/app/globals.css`. After the existing `@keyframes marquee` block (around line 38), add:

```css
@keyframes dotWave {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.5); }
}
```

- [ ] **Step 2: Verify no syntax errors**

The dev server should still be running. Check the browser at `http://localhost:3000` — page should load without errors. No visual change expected yet.

- [ ] **Step 3: Commit**

```bash
git add src/app/globals.css
git commit -m "style: add dotWave keyframe for section divider animation"
```

---

### Task 2: Create SectionDivider component

**Files:**
- Create: `src/components/SectionDivider.tsx`

- [ ] **Step 1: Create the file**

Create `src/components/SectionDivider.tsx` with this exact content:

```tsx
const DOTS = Array.from({ length: 200 }, (_, i) => ({
  key: i,
  color: i % 2 === 0 ? "#8B5CF6" : "#4ADE80",
  delay: `${(i % 25) * 80}ms`,
}));

export default function SectionDivider() {
  return (
    <div
      className="w-full overflow-hidden bg-brand-dark py-1 flex justify-center gap-1.5 flex-nowrap"
      aria-hidden="true"
    >
      {DOTS.map(({ key, color, delay }) => (
        <span
          key={key}
          className="w-[3px] h-[3px] rounded-full flex-shrink-0"
          style={{
            background: color,
            animation: "dotWave 2s ease-in-out infinite",
            animationDelay: delay,
          }}
        />
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Verify in browser**

The component isn't wired in yet — no visual check needed. Just confirm the file exists and the dev server hasn't errored.

- [ ] **Step 3: Commit**

```bash
git add src/components/SectionDivider.tsx
git commit -m "feat: add SectionDivider animated dot-wave component"
```

---

### Task 3: Wire SectionDivider into page.tsx

**Files:**
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update page.tsx**

Replace the entire content of `src/app/page.tsx` with:

```tsx
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import InAction from "@/components/InAction";
import Pricing from "@/components/Pricing";
import SocialProof from "@/components/SocialProof";
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";
import SectionDivider from "@/components/SectionDivider";

export default function Home() {
  return (
    <main className="bg-brand-dark">
      <Hero />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <InAction />
      <SectionDivider />
      <Pricing />
      <SectionDivider />
      <SocialProof />
      <SectionDivider />
      <FooterCTA />
      <Footer />
    </main>
  );
}
```

Note: no `<SectionDivider />` between `FooterCTA` and `Footer` — they're visually joined.

- [ ] **Step 2: Verify in browser**

Open `http://localhost:3000`. You should see the dot-wave separator between each section. The dots alternate purple and green, pulsing in a rolling wave. Check that:
- Dots are visible between Hero and Features
- Dots are visible between all subsequent sections
- No divider appears between FooterCTA and Footer
- No console errors

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: wire SectionDivider between all sections in page.tsx"
```

---

### Task 4: Clean up Features.tsx

**Files:**
- Modify: `src/components/Features.tsx`

- [ ] **Step 1: Read the current file**

Open `src/components/Features.tsx`. Locate:
1. The `<section>` tag (around line 105) with `bg-brand-mid` — change to `bg-brand-dark`
2. The `aria-hidden` div at the very top of the `<section>` body — this is the 1px gradient line separator. Delete that entire div.

The aria-hidden div to remove looks like this (exact markup may vary slightly):
```tsx
<div
  aria-hidden="true"
  className="pointer-events-none absolute inset-x-0 top-0 h-px"
  style={{
    background: "linear-gradient(...)",
  }}
/>
```

- [ ] **Step 2: Apply the changes**

  - On the `<section>` opening tag: replace `bg-brand-mid` with `bg-brand-dark`
  - Delete the `aria-hidden` 1px gradient div entirely

- [ ] **Step 3: Verify in browser**

Open `http://localhost:3000` and scroll to the Features section. It should now share the same dark background as Hero. No visible seam or colour shift between Hero and Features.

- [ ] **Step 4: Commit**

```bash
git add src/components/Features.tsx
git commit -m "style: unify Features section to bg-brand-dark, remove top gradient separator"
```

---

### Task 5: Rewrite Pricing.tsx

This is the largest task. Work through it in sub-steps.

**Files:**
- Modify: `src/components/Pricing.tsx`

#### 5a — Replace plan data and clean up constants

- [ ] **Step 1: Delete the LAUNCH_PRICES block**

Remove these lines entirely (lines 6–12 in current file):
```tsx
// To reveal at launch: replace each plan's `price` with LAUNCH_PRICES values and restore `period` fields.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const LAUNCH_PRICES = {
  monthly: "£3",
  annual: "£28",
  lifetime: "£100",
} as const;
```

- [ ] **Step 2: Delete PLACEHOLDER_PRICE**

Remove:
```tsx
const PLACEHOLDER_PRICE = "Pricing confirmed\nat launch";
```

- [ ] **Step 3: Update the Plan interface**

Replace the current `Plan` interface with:
```tsx
interface Plan {
  id: string;
  badge: string;
  badgeStyle: "gray" | "purple" | "green";
  price: string;
  period: string | null;
  description: string;
  features: string[];
  cta: string;
  ctaStyle: "green" | "purple" | "outline";
  hero: boolean;
}
```

Note: `"amber"` is removed from both union types.

- [ ] **Step 4: Replace the PLANS array**

Replace the entire `PLANS` array with:
```tsx
const PLANS: Plan[] = [
  {
    id: "free",
    badge: "Start here",
    badgeStyle: "gray",
    price: "Free",
    period: null,
    description: "Clean your first 1,000 emails. No card required.",
    features: [
      "1,000 email clean-up",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
    ],
    cta: "Join the Waitlist →",
    ctaStyle: "green",
    hero: false,
  },
  {
    id: "lifetime",
    badge: "Own it forever",
    badgeStyle: "purple",
    price: "£4.99",
    period: "one-time",
    description:
      "Less than a coffee. Pay once, clean your inbox forever. All features, all future updates.",
    features: [
      "Unlimited emails",
      "All features included",
      "All future updates",
      "Priority support",
      "One payment. That's it.",
    ],
    cta: "Join the Waitlist →",
    ctaStyle: "purple",
    hero: true,
  },
  {
    id: "supporter",
    badge: "Support the dev",
    badgeStyle: "green",
    price: "£2.50",
    period: "/month",
    description:
      "Not for features — this is for people who want to actively back ongoing development. Every penny goes straight into the app.",
    features: [
      "Unlimited emails",
      "All features included",
      "Early access to new features",
      "Priority support",
    ],
    cta: "Join the Waitlist →",
    ctaStyle: "outline",
    hero: false,
  },
];
```

#### 5b — Update Badge and CtaButton components

- [ ] **Step 5: Update Badge component**

Replace the `classes` object inside `Badge` with:
```tsx
const classes: Record<Plan["badgeStyle"], string> = {
  gray: "bg-white/10 text-white/60",
  purple: "bg-brand-purple text-white",
  green: "bg-brand-green/15 text-brand-green",
};
```

- [ ] **Step 6: Remove amber branch from CtaButton**

Delete the entire `if (style === "amber")` block from `CtaButton` (the block with the `amber-shine-ring` wrapper div).

#### 5c — Update PricingCard

- [ ] **Step 7: Fix PricingCard className ternary**

In `PricingCard`, find the className ternary that currently has three branches (hero / lifetime / default). Replace it with a two-branch version:

```tsx
className={[
  "pricing-card relative flex flex-col rounded-2xl p-7",
  plan.hero
    ? "md:-mt-4 md:mb-4 border-2 border-brand-purple"
    : "border border-white/8",
].join(" ")}
```

- [ ] **Step 8: Fix PricingCard background style**

Find the inline `style` on the card div that has three branches. Replace with:

```tsx
style={{
  background: plan.hero
    ? "rgba(139,92,246,0.10)"
    : "rgba(255,255,255,0.04)",
  animationDelay: `${index * 100}ms`,
  boxShadow: plan.hero
    ? "0 20px 60px rgba(139,92,246,0.20), 0 0 0 1px rgba(139,92,246,0.15)"
    : "none",
}}
```

#### 5d — Update section wrapper

- [ ] **Step 9: Remove three aria-hidden decorative divs**

Inside the `<section>` in the `Pricing` default export, find and delete all three `aria-hidden` divs:
1. The 1px gradient line (`h-px`, `inset-x-0 top-0`)
2. The 50%-height radial gradient blob
3. The dot-grid overlay (with `radial-gradient(circle, ...)` backgroundImage and `backgroundSize: "28px 28px"`)

- [ ] **Step 10: Change section background**

On the `<section>` tag, change `bg-brand-mid` to `bg-brand-dark`.

- [ ] **Step 11: Update grid columns**

Find the grid div inside the section. Change:
```tsx
className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:items-start"
```
to:
```tsx
className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-start"
```

#### 5e — Update callout copy

- [ ] **Step 12: Update callout text**

Find the bottom callout div. Replace its inner content with:

```tsx
<p className="mb-1 text-base font-bold leading-relaxed text-white">
  Honest pricing. Open books.
</p>
<p className="text-sm leading-relaxed text-white/70">
  £4.99 unlocks everything, permanently — no subscriptions, no renewals.
  The £2.50/month option isn&rsquo;t a different feature tier. It&rsquo;s for people who want to
  actively support ongoing development. Every penny goes straight back into the app.
</p>

<p className="mt-4 text-sm leading-relaxed text-white/55">
  No investor pressure. No upsell traps. We&rsquo;ll always be transparent about how your money is used.
</p>

<p className="mt-4 text-sm leading-relaxed text-white/55">
  🌱 1% of every payment goes to carbon removal via{" "}
  <a
    href="https://stripe.com/climate"
    target="_blank"
    rel="noopener noreferrer"
    className="font-semibold text-white/70 underline underline-offset-2 decoration-white/20 transition-colors hover:text-brand-purple hover:decoration-brand-purple/40"
  >
    Stripe Climate
  </a>
  . As we grow, that percentage goes up — and we&rsquo;ll announce every increase publicly.
</p>
```

#### 5f — Verify and commit

- [ ] **Step 13: Verify in browser**

Open `http://localhost:3000` and scroll to the Pricing section. Check:
- 3 cards displayed (Free, Own it forever, Support the dev)
- Lifetime card is elevated with purple border
- Prices show: Free, £4.99 one-time, £2.50/month
- No amber styling anywhere on the page
- Callout copy reads correctly
- No TypeScript errors in the terminal

- [ ] **Step 14: Commit**

```bash
git add src/components/Pricing.tsx
git commit -m "feat: restructure pricing to 3 plans (free, £4.99 lifetime, £2.50/mo supporter)"
```

---

### Task 6: Remove amber CSS from globals.css

**Files:**
- Modify: `src/app/globals.css`

- [ ] **Step 1: Remove amber-shine-ring and amberShineSpin**

In `src/app/globals.css`, find and delete:

1. The `.amber-shine-ring` rule block:
```css
.amber-shine-ring {
  background: conic-gradient(
    from 0deg,
    transparent 0%, transparent 62%,
    rgba(255, 255, 255, 0.4) 70%,
    rgba(251, 191, 36, 0.9) 75%,
    rgba(255, 255, 255, 0.4) 80%,
    transparent 88%, transparent 100%
  );
  animation: amberShineSpin 2.5s linear infinite;
}
```

2. The `@keyframes amberShineSpin` block:
```css
@keyframes amberShineSpin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
```

- [ ] **Step 2: Verify no regressions**

Check `http://localhost:3000` once more. Full page visual check:
- Hero section loads correctly
- Dot separators visible between all sections
- Features section same dark background as Hero — no colour seam
- InAction section separators working
- Pricing section: 3 cards, correct prices, no amber styling
- SocialProof, FooterCTA, Footer all load correctly
- No `animate-spin` or amber flicker anywhere
- Browser console shows no errors

- [ ] **Step 3: Final commit**

```bash
git add src/app/globals.css
git commit -m "style: remove amber-shine-ring and amberShineSpin, no longer used"
```
