# Background Unification, Section Separators & Pricing Redesign

**Date:** 2026-04-17
**Status:** Approved

---

## Overview

Two changes to the landing page:

1. **Visual consistency** — Unify all section backgrounds to `brand-dark` (#0F0A1E) and replace colour-change section separators with an animated dot-wave `SectionDivider` component.
2. **Pricing restructure** — Simplify from 4 plans to 3, with real prices revealed (no more placeholder copy), a new £4.99 lifetime hero tier, and a £2.50/month supporter tier.

---

## 1. Background Unification & Section Separators

### Background

All sections currently on `bg-brand-mid` (#1A1035) switch to `bg-brand-dark` (#0F0A1E). The `<main>` wrapper in `page.tsx` gets `bg-brand-dark` as a safety net for any gaps between sections.

Affected sections:
- `Pricing.tsx` — currently `bg-brand-mid`, switches to `bg-brand-dark`
- `Features.tsx` — currently `bg-brand-mid`, switches to `bg-brand-dark`

### SectionDivider Component

A new `src/components/SectionDivider.tsx` component. It renders a full-width row of small dots that pulse in a wave animation.

**Visual spec:**
- Full width, `bg-brand-dark` background (invisible strip), `overflow: hidden`
- 200 dots rendered in a `flex-nowrap`, `justify-center` row. Centering ensures symmetric overflow on both sides; `overflow: hidden` clips any excess cleanly. No dynamic sizing needed.
- Alternating purple (`#8B5CF6`) and green (`#4ADE80`) — full opaque colours. The opacity keyframe handles all fading; do not use semi-transparent base colours.
- Each dot implemented as a `<span>` with Tailwind classes: `w-[3px] h-[3px] rounded-full flex-shrink-0`. Background colour set via inline `style={{ background: '#8B5CF6' }}` (or green). Spaced 6px apart via `gap-1.5` on the flex container.
- Wave animation applied via inline style on each `<span>`: `style={{ animation: 'dotWave 2s ease-in-out infinite', animationDelay: \`${(index % 25) * 80}ms\` }}`. Do not use a Tailwind `animate-` class — `animation-delay` cannot be set cleanly via Tailwind utilities with a per-index value. The keyframe drives: `opacity: 0.2, scale(1)` at rest → `opacity: 1, scale(1.5)` at peak. Stagger uses `(index % 25) * 80ms` — 25 steps × 80ms = 2000ms, matching the animation duration so the wave repeats continuously.
- Animation duration: 2s ease-in-out, infinite
- Vertical padding: `py-1`. Do not set a fixed height on the container — `py-1` with `overflow: hidden` is sufficient. The `scale` transform is a visual-only transform and does not expand the layout box, so no layout shift occurs.

**Keyframe (to add to `globals.css`):**
```css
@keyframes dotWave {
  0%, 100% { opacity: 0.2; transform: scale(1); }
  50%       { opacity: 1;   transform: scale(1.5); }
}
```

### page.tsx structure

```tsx
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
```

No divider between `FooterCTA` and `Footer` — they're visually joined.

---

## 2. Pricing Restructure

### New Plan Structure

3 plans, replacing the existing 4.

#### Plan 1 — Free
- **id:** `"free"`
- **Badge:** "Start here" (gray)
- **Price:** Free
- **Period:** null
- **Description:** "Clean your first 1,000 emails. No card required."
- **Features:** 1,000 email clean-up, Smart categorisation, Mass deletion, Bulk unsubscribe
- **CTA:** "Join the Waitlist →" (green)
- **Hero:** false

#### Plan 2 — Lifetime (hero)
- **id:** `"lifetime"`
- **Badge:** "Own it forever" (purple)
- **Price:** £4.99
- **Period:** "one-time"
- **Description:** "Less than a coffee. Pay once, clean your inbox forever. All features, all future updates."
- **Features:** Unlimited emails, All features included, All future updates, Priority support, One payment. That's it.
- **CTA:** "Join the Waitlist →" (purple)
- **Hero:** true

#### Plan 3 — Supporter
- **id:** `"supporter"`
- **Badge:** "Support the dev" (green)
- **Price:** £2.50
- **Period:** "/month"
- **Description:** "Not for features — this is for people who want to actively back ongoing development. Every penny goes straight into the app."
- **Features:** Unlimited emails, All features included, Early access to new features, Priority support
- **CTA:** "Join the Waitlist →" (outline)
- **Hero:** false

### Grid layout

Switch from `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` → `grid-cols-1 md:grid-cols-3`. Three columns from `md` (768px) upward — wide enough for the cards to breathe comfortably. Single column below `md`. Remove the `sm:grid-cols-2` intermediate breakpoint entirely. The `PricingCard` className ternary should read after all edits:

```
plan.hero
  ? "md:-mt-4 md:mb-4 border-2 border-brand-purple"
  : "border border-white/8"
```

And the inline background style:
```
plan.hero ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.04)"
```

This combines two changes: (1) elevation breakpoint `lg` → `md` to match the new grid, and (2) removal of the `plan.id === "lifetime"` amber branch. The non-hero fallback values (`border border-white/8`, `rgba(255,255,255,0.04)`) become the unconditional defaults. No id-based overrides remain.

### Bottom callout (updated copy)

**Headline:** "Honest pricing. Open books."

**Body:**
> £4.99 unlocks everything, permanently — no subscriptions, no renewals.
> The £2.50/month option isn't a different feature tier. It's for people who want to actively support ongoing development. Every penny goes straight back into the app.
>
> No investor pressure. No upsell traps. We'll always be transparent about how your money is used.

**Stripe Climate line (updated — remove milestone reference):**
> 🌱 1% of every payment goes to carbon removal via [Stripe Climate](https://stripe.com/climate). As we grow, that percentage goes up — and we'll announce every increase publicly.

### Removals

- `LAUNCH_PRICES` constant — delete entirely, along with the `// To reveal at launch` developer comment and the `// eslint-disable-next-line @typescript-eslint/no-unused-vars` directive above it
- `PLACEHOLDER_PRICE` constant — delete entirely
- `badgeStyle: "amber"` — remove from `Badge` component classes lookup AND from the `Plan` interface union type (`"gray" | "purple" | "green"` only)
- `ctaStyle: "amber"` — remove from `CtaButton` component AND from the `Plan` interface union type (`"green" | "purple" | "outline"` only)
- `.amber-shine-ring` CSS in `globals.css` — remove
- `@keyframes amberShineSpin` in `globals.css` — remove
- The `monthly` and `annual` plan objects — delete
- `plan.id === "lifetime"` conditionals in `PricingCard` JSX — remove both (the amber border and amber background inline styles). The new lifetime plan uses the standard hero path (`plan.hero === true`) only — no id-based special-casing.
- All three `aria-hidden` decorative divs at the top of the `<section>` in `Pricing.tsx` — remove all of them (the 1px gradient line, the 50%-height radial gradient blob, and the dot-grid overlay). They were designed against `bg-brand-mid` and are all replaced by the consistent dark background + `SectionDivider`.
- The 1px gradient `aria-hidden` div at the top of `Features.tsx` — remove it for the same reason (designed against `bg-brand-mid`, replaced by `SectionDivider`).
- `bg-brand-mid` on the `<section>` tag in `Features.tsx` (line 105) — change to `bg-brand-dark`.

---

## Out of Scope

- Copy changes to other sections (Features, Hero, SocialProof)
- Any routing or waitlist logic changes
- Mobile-specific layout adjustments beyond what the grid change naturally produces

---

## Implementation Order

1. Add `@keyframes dotWave` to `globals.css`
2. Create `SectionDivider.tsx`
3. Update `page.tsx` — add `bg-brand-dark` to `<main>`, insert `<SectionDivider />` between sections
4. Update `Pricing.tsx` — new plan data, 3-col grid, updated callout, remove amber styles
5. Update `globals.css` — remove amber keyframes and shine ring
6. Update any other sections using `bg-brand-mid`
