# CTA Update & Sign In Link Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all "Join the Waiting List" CTAs with "Get Started Free", wire them through a single config constant for one-line launch-day swap, and add a "Sign In" link to the navbar.

**Architecture:** A new `src/lib/launch.ts` exports `CTA_HREF` (currently `/waitlist`). Hero, Navbar, FooterCTA, and the Pricing free plan import it. The two premium pricing plans keep per-plan `// LAUNCH:` comments because their launch URLs differ. A plain `<a>` link in the Navbar points directly to `https://app.inboxbuster.com/login` — no auth logic on the landing page.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind CSS v4. No test framework — verification is `npm run build` (TypeScript + Next.js) and `npm run dev` visual checks.

**Spec:** `docs/superpowers/specs/2026-05-06-cta-update-and-sign-in-design.md`

---

## File Map

| Action | Path |
|--------|------|
| Create | `src/lib/launch.ts` |
| Modify | `src/components/Hero.tsx` |
| Modify | `src/components/Navbar.tsx` |
| Modify | `src/components/FooterCTA.tsx` |
| Modify | `src/components/Pricing.tsx` |
| Modify | `src/app/waitlist/page.tsx` |

---

## Task 1: Create the launch config constant

**Files:**
- Create: `src/lib/launch.ts`

- [ ] **Step 1: Create `src/lib/launch.ts`**

```ts
export const CTA_HREF = "/waitlist"; // LAUNCH: swap to "https://app.inboxbuster.com/login"
```

- [ ] **Step 2: Verify TypeScript is happy**

```powershell
npm run build
```

Expected: build succeeds (or fails only on pre-existing errors unrelated to this file).

- [ ] **Step 3: Commit**

```powershell
git add src/lib/launch.ts
git commit -m "feat: add launch config constant for CTA href"
```

---

## Task 2: Update Hero CTA

**Files:**
- Modify: `src/components/Hero.tsx` (line ~144 — the "Join the Waiting List →" anchor)

- [ ] **Step 1: Import `CTA_HREF` at the top of Hero.tsx**

Add to the existing import block at the top of the file (after the React import):

```ts
import { CTA_HREF } from "@/lib/launch";
```

- [ ] **Step 2: Update the CTA anchor**

Find (~line 144):
```tsx
<a
  href="/waitlist"
  className="inline-flex items-center rounded-full bg-brand-green px-7 py-3.5 text-sm font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
  style={{
    boxShadow:
      "0 0 0 1px rgba(74,222,128,0.3), 0 8px 32px rgba(74,222,128,0.30)",
  }}
>
  Join the Waiting List&nbsp;&rarr;
</a>
```

Replace with:
```tsx
<a
  href={CTA_HREF}
  className="inline-flex items-center rounded-full bg-brand-green px-7 py-3.5 text-sm font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
  style={{
    boxShadow:
      "0 0 0 1px rgba(74,222,128,0.3), 0 8px 32px rgba(74,222,128,0.30)",
  }}
>
  Get Started Free&nbsp;&rarr;
</a>
```

- [ ] **Step 3: Verify**

```powershell
npm run build
```

Expected: clean build. Then optionally `npm run dev` and confirm the Hero button reads "Get Started Free →" and navigates to `/waitlist`.

- [ ] **Step 4: Commit**

```powershell
git add src/components/Hero.tsx
git commit -m "feat: update Hero CTA text and use CTA_HREF"
```

---

## Task 3: Update Navbar — Sign In link + CTA hrefs

**Files:**
- Modify: `src/components/Navbar.tsx`

This task has three sub-changes: import the constant, update two existing CTA hrefs (desktop + mobile), and add a "Sign In" link in both desktop and mobile views.

- [ ] **Step 1: Add import**

At the top of `src/components/Navbar.tsx`, alongside the existing imports:

```ts
import { CTA_HREF } from "@/lib/launch";
```

- [ ] **Step 2: Update desktop CTA + add Sign In link**

Find the desktop CTA block (~line 44):
```tsx
<div className="flex items-center gap-3">
  <a
    href="#pricing"
    className="hidden md:inline-flex items-center rounded-full bg-brand-green px-5 py-2 text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
  >
    Get Started Free
  </a>
```

Replace with:
```tsx
<div className="flex items-center gap-3">
  <a
    href="https://app.inboxbuster.com/login"
    className="hidden md:inline-flex text-sm font-semibold uppercase tracking-wider text-white/60 transition-colors duration-200 hover:text-white"
  >
    Sign In
  </a>
  <a
    href={CTA_HREF}
    className="hidden md:inline-flex items-center rounded-full bg-brand-green px-5 py-2 text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
  >
    Get Started Free
  </a>
```

- [ ] **Step 3: Update mobile menu — add Sign In + fix CTA href**

Find the mobile menu footer block (~line 80):
```tsx
<div className="mt-5 border-t border-white/10 pt-5">
  <a
    href="#pricing"
    className="block w-full rounded-full bg-brand-green py-3 text-center text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 active:scale-95"
    onClick={() => setOpen(false)}
  >
    Get Started Free
  </a>
</div>
```

Replace with:
```tsx
<div className="mt-5 border-t border-white/10 pt-5 flex flex-col gap-3">
  <a
    href="https://app.inboxbuster.com/login"
    className="block text-center text-sm font-semibold uppercase tracking-wider text-white/60 transition-colors duration-200 hover:text-white"
    onClick={() => setOpen(false)}
  >
    Sign In
  </a>
  <a
    href={CTA_HREF}
    className="block w-full rounded-full bg-brand-green py-3 text-center text-sm font-bold uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 active:scale-95"
    onClick={() => setOpen(false)}
  >
    Get Started Free
  </a>
</div>
```

- [ ] **Step 4: Verify**

```powershell
npm run build
```

Then `npm run dev` and check:
- Desktop nav shows "Sign In" (quiet text) followed by green "Get Started Free" pill
- Mobile menu shows "Sign In" text link above the green "Get Started Free" button
- "Sign In" link goes to `https://app.inboxbuster.com/login`
- "Get Started Free" still navigates to `/waitlist` (pre-launch)

- [ ] **Step 5: Commit**

```powershell
git add src/components/Navbar.tsx
git commit -m "feat: add Sign In link and wire Navbar CTAs through CTA_HREF"
```

---

## Task 4: Update FooterCTA href

**Files:**
- Modify: `src/components/FooterCTA.tsx`

- [ ] **Step 1: Add import**

At the top of `src/components/FooterCTA.tsx`:

```ts
import { CTA_HREF } from "@/lib/launch";
```

- [ ] **Step 2: Replace the hardcoded href**

Find (~line 45):
```tsx
<a
  href="#pricing"
  className="inline-flex items-center rounded-full bg-brand-green px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
  style={{
    boxShadow:
      "0 0 0 1px rgba(74,222,128,0.35), 0 8px 40px rgba(74,222,128,0.35)",
  }}
>
  Get Started Free&nbsp;&rarr;
</a>
```

Replace `href="#pricing"` with `href={CTA_HREF}`:
```tsx
<a
  href={CTA_HREF}
  className="inline-flex items-center rounded-full bg-brand-green px-6 py-3.5 text-sm sm:px-8 sm:py-4 sm:text-base font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
  style={{
    boxShadow:
      "0 0 0 1px rgba(74,222,128,0.35), 0 8px 40px rgba(74,222,128,0.35)",
  }}
>
  Get Started Free&nbsp;&rarr;
</a>
```

- [ ] **Step 3: Verify build**

```powershell
npm run build
```

- [ ] **Step 4: Commit**

```powershell
git add src/components/FooterCTA.tsx
git commit -m "feat: wire FooterCTA through CTA_HREF"
```

---

## Task 5: Update Pricing CTAs

**Files:**
- Modify: `src/components/Pricing.tsx` (the `PLANS` array at the top of the file)

- [ ] **Step 1: Add import**

At the top of `src/components/Pricing.tsx`, after the existing imports:

```ts
import { CTA_HREF } from "@/lib/launch";
```

- [ ] **Step 2: Update the `PLANS` array**

Replace the entire `PLANS` constant with the updated version below. Key changes:
- All three non-BMC plans: `cta` → "Get Started Free"
- `free` plan: `ctaHref` → `CTA_HREF`
- `premium` and `premium-support`: `ctaHref` stays as a literal string with a `// LAUNCH:` comment
- `// At launch:` comments renamed to `// LAUNCH:`

```ts
const PLANS: Plan[] = [
  {
    id: "free",
    badge: "Start here",
    badgeStyle: "gray",
    price: "Free",
    period: null,
    description: "Clean your first 1,000 emails every month. No card required.",
    features: [
      "1,000 emails per month",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
    ],
    cta: "Get Started Free",
    ctaHref: CTA_HREF,
    ctaStyle: "green",
    hero: false,
    variant: "standard",
  },
  {
    id: "premium",
    badge: "Own it forever",
    badgeStyle: "purple",
    price: "",
    period: "one-off",
    description:
      "Pay what you feel is fair. Unlock unlimited emails forever. One payment - no renewals, no expiry.",
    features: [
      "Unlimited emails",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
      "Your price. Your call.",
    ],
    cta: "Get Started Free",
    // LAUNCH: swap to "https://app.inboxbuster.com/upgrade?amount={amount}" - see docs/superpowers/specs/2026-05-06-cta-update-and-sign-in-design.md
    ctaHref: "/waitlist",
    ctaStyle: "purple",
    hero: true,
    variant: "pwyw",
  },
  {
    id: "premium-support",
    badge: "Premium + Support",
    badgeStyle: "green",
    price: "£2.50",
    period: "/mo",
    description:
      "Get Premium first, then add support ticket access for £2.50/mo. Cancel anytime. Your premium status stays.",
    features: [
      "Unlimited emails",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
      "Support ticket access",
    ],
    cta: "Get Started Free",
    // LAUNCH: swap to "https://app.inboxbuster.com/upgrade?plan=subscription"
    ctaHref: "/waitlist",
    ctaStyle: "outline",
    hero: false,
    variant: "standard",
  },
  {
    id: "bmc",
    badge: "Buy me a coffee",
    badgeStyle: "amber",
    price: "☕",
    period: null,
    description:
      "No account needed. No app changes. Just a thank you if InboxBuster saves you time.",
    features: [
      "Any amount, any time",
      "No strings attached",
      "Means a lot to an indie dev",
    ],
    cta: "Buy me a coffee",
    ctaHref: "https://buymeacoffee.com/tonextlevel",
    ctaStyle: "amber",
    hero: false,
    variant: "bmc",
  },
];
```

- [ ] **Step 3: Verify build**

```powershell
npm run build
```

TypeScript will catch any type mismatch if `CTA_HREF` isn't assignable to `string`. It should be fine.

- [ ] **Step 4: Visual check**

`npm run dev` — scroll to the Pricing section. All three non-BMC cards should read "Get Started Free". Clicking any card button should navigate to `/waitlist`.

- [ ] **Step 5: Commit**

```powershell
git add src/components/Pricing.tsx
git commit -m "feat: update Pricing CTAs and wire free plan through CTA_HREF"
```

---

## Task 6: Update waitlist page submit button

**Files:**
- Modify: `src/app/waitlist/page.tsx`

- [ ] **Step 1: Update the submit button text**

Find (~line 396):
```tsx
{loading ? "Joining…" : "Join the Waiting List →"}
```

Replace with:
```tsx
{loading ? "Sending…" : "Get Early Access →"}
```

- [ ] **Step 2: Verify build**

```powershell
npm run build
```

- [ ] **Step 3: Visual check**

`npm run dev`, navigate to `/waitlist`. The form submit button should read "Get Early Access →". Submitting the form should show "Sending…" while in flight.

- [ ] **Step 4: Commit**

```powershell
git add src/app/waitlist/page.tsx
git commit -m "feat: update waitlist submit button text"
```

---

## Task 7: Final verification

- [ ] **Step 1: Full build**

```powershell
npm run build
```

Expected: clean build with zero TypeScript errors.

- [ ] **Step 2: Visual walkthrough**

Start `npm run dev` and check each of the following:

| Location | What to verify |
|---|---|
| Navbar (desktop) | "Sign In" text link (dim, no pill) + "Get Started Free" green pill both visible |
| Navbar (mobile) | Hamburger → "Sign In" text + "Get Started Free" green button |
| "Sign In" click | Navigates to `https://app.inboxbuster.com/login` |
| Hero button | Reads "Get Started Free →", navigates to `/waitlist` |
| Pricing cards | All three non-BMC cards read "Get Started Free", navigate to `/waitlist` |
| FooterCTA button | Reads "Get Started Free →", navigates to `/waitlist` |
| `/waitlist` form | Submit button reads "Get Early Access →" |

- [ ] **Step 3: Final commit if any last tweaks were made**

```powershell
git add -p
git commit -m "fix: final tweaks from visual walkthrough"
```

---

## Go-live reference

When you say "we're going live", execute these 5 steps (also in the spec at `docs/superpowers/specs/2026-05-06-cta-update-and-sign-in-design.md`):

1. **`src/lib/launch.ts`** — change `CTA_HREF` to `"https://app.inboxbuster.com/login"`
2. **`src/components/Pricing.tsx`** — update the two `// LAUNCH:` hrefs:
   - `premium` plan `ctaHref`: `"/waitlist"` → `"https://app.inboxbuster.com/upgrade?amount={amount}"` (amount wired dynamically)
   - `premium-support` plan `ctaHref`: `"/waitlist"` → `"https://app.inboxbuster.com/upgrade?plan=subscription"`
3. **Delete `src/app/waitlist/`** (entire directory — the waitlist page)
4. **Delete `src/app/api/waitlist/route.ts`** (the waitlist API route)
5. **`next.config.ts`** — add a permanent redirect so old `/waitlist` links don't 404:
   ```ts
   async redirects() {
     return [
       { source: '/waitlist', destination: 'https://app.inboxbuster.com/login', permanent: true },
     ];
   }
   ```
