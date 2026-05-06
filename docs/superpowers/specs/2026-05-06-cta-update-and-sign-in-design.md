# CTA Update & Sign In Link — Design Spec
_Date: 2026-05-06_

## Overview

The product has moved past waitlist-only mode and is approaching live launch. This spec covers two changes:

1. Update all "Join the Waiting List" CTAs to "Get Started Free" / "Get Early Access" using a single config constant that makes the launch-day URL swap a one-line change.
2. Add a "Sign In" link to the navbar pointing to `https://app.inboxbuster.com/login`.

---

## Architecture

### Config constant (`src/lib/launch.ts`)

A single exported constant controls where the primary "Get Started" CTA buttons point:

```ts
export const CTA_HREF = "/waitlist"; // LAUNCH: swap to "https://app.inboxbuster.com/login"
```

Used by: Hero, Navbar (desktop + mobile), FooterCTA, and the Pricing Free plan.

The Premium (PWYW) and Premium+Support pricing plans are intentionally excluded from `CTA_HREF` — their launch-day destinations differ (a dynamic upgrade URL and a subscription URL respectively). They retain their own `// LAUNCH:` comments in `Pricing.tsx`.

### Sign In link

A plain `<a>` tag in the Navbar pointing to `https://app.inboxbuster.com/login`. No auth logic on the landing page. The app subdomain handles all authentication, account-status checks (free vs premium), and post-login routing.

---

## Components to change

### `src/lib/launch.ts` — New file
- Export `CTA_HREF = "/waitlist"` with a `// LAUNCH:` comment.

### `src/components/Hero.tsx`
- Button text: "Join the Waiting List →" → "Get Started Free →"
- `href`: import and use `CTA_HREF`

### `src/components/Navbar.tsx`
- Desktop: add a "Sign In" text link immediately left of the existing green CTA button
  - Style: quiet secondary (`text-white/60 hover:text-white`, no pill/border)
  - Points to `https://app.inboxbuster.com/login`
- Desktop: existing "Get Started Free" button `href` → import and use `CTA_HREF` (currently `#pricing`)
- Mobile menu: add "Sign In" as a text link below the nav links, above the green CTA block
- Mobile: existing "Get Started Free" block `href` → import and use `CTA_HREF` (currently `#pricing`)

### `src/components/FooterCTA.tsx`
- "Get Started Free →" `href` → import and use `CTA_HREF` (currently `#pricing`)
- Text and style unchanged

### `src/components/Pricing.tsx`
- `free` plan:
  - `cta`: "Join the Waiting List" → "Get Started Free"
  - `ctaHref`: import and use `CTA_HREF`
- `premium` (PWYW) plan:
  - `cta`: "Join the Waiting List" → "Get Started Free"
  - `ctaHref`: stays as `"/waitlist"` with its own `// LAUNCH: swap to "https://app.inboxbuster.com/upgrade?amount={amount}"` comment (dynamic amount means it cannot share `CTA_HREF`)
- `premium-support` plan:
  - `cta`: "Join the Waiting List" → "Get Started Free"
  - `ctaHref`: stays as `"/waitlist"` with its own `// LAUNCH: swap to "https://app.inboxbuster.com/upgrade?plan=subscription"` comment
- `bmc` plan: unchanged
- Rename existing `// At launch:` comments to `// LAUNCH:` for consistency

### `src/app/waitlist/page.tsx`
- Submit button text: "Join the Waiting List →" → "Get Early Access →"
- Loading state text: "Joining…" → "Sending…"
- (The `/waitlist` route itself is retired at launch — see go-live checklist)

---

## Sign In link behaviour

- Clicking "Sign In" from `inboxbuster.com` → redirects to `https://app.inboxbuster.com/login`
- All logic (user exists check, free vs premium, post-login redirect) lives in the app — zero auth code on the landing page

---

## Go-live checklist (when you say "we're going live")

1. In `src/lib/launch.ts`, change:
   ```ts
   export const CTA_HREF = "/waitlist";
   ```
   to:
   ```ts
   export const CTA_HREF = "https://app.inboxbuster.com/login";
   ```
2. In `src/components/Pricing.tsx`, update the two remaining `// LAUNCH:` hrefs:
   - `premium` plan `ctaHref`: `"/waitlist"` → `"https://app.inboxbuster.com/upgrade?amount={amount}"` (amount will be wired dynamically from user input in the component)
   - `premium-support` plan `ctaHref`: `"/waitlist"` → `"https://app.inboxbuster.com/upgrade?plan=subscription"`
3. Delete `src/app/waitlist/` (entire directory)
4. Delete `src/app/api/waitlist/route.ts`
5. In `next.config.ts`, add a permanent redirect so old `/waitlist` links don't 404:
   ```ts
   async redirects() {
     return [
       { source: '/waitlist', destination: 'https://app.inboxbuster.com/login', permanent: true },
     ];
   }
   ```

---

## Out of scope

- Any auth logic on `inboxbuster.com`
- Changes to the `bmc` pricing card
- Changes to Features, SocialProof, InAction, or other content sections
