# CTA Update & Sign In Link — Design Spec
_Date: 2026-05-06_

## Overview

The product has moved past waitlist-only mode and is approaching live launch. This spec covers two changes:

1. Update all "Join the Waiting List" CTAs to "Get Started Free" / "Get Early Access" using a single config constant that makes the launch-day URL swap a one-line change.
2. Add a "Sign In" link to the navbar pointing to `https://app.inboxbuster.com/login`.

---

## Architecture

### Config constant (`src/lib/launch.ts`)

A single exported constant controls where all primary CTA buttons point:

```ts
export const CTA_HREF = "/waitlist"; // LAUNCH: swap to "https://app.inboxbuster.com/login"
```

All CTA buttons import from this file. At launch, one line change propagates site-wide.

### Sign In link

A plain `<a>` tag in the Navbar pointing to `https://app.inboxbuster.com/login`. No auth logic on the landing page. The app subdomain handles all authentication, account-status checks (free vs premium), and post-login routing.

---

## Components to change

### `src/lib/launch.ts` — New file
- Export `CTA_HREF = "/waitlist"` with a `// LAUNCH:` comment.

### `src/components/Hero.tsx`
- Button text: "Join the Waiting List →" → "Get Started Free →"
- `href`: import and use `CTA_HREF`

### `src/components/Pricing.tsx`
- `cta` field on `free`, `premium`, and `premium-support` plans: "Join the Waiting List" → "Get Started Free"
- `ctaHref` on those three plans: import and use `CTA_HREF`
- Remove existing `// At launch: swap to...` comments (superseded by `launch.ts`)
- `bmc` plan is unchanged

### `src/app/waitlist/page.tsx`
- Submit button text: "Join the Waiting List →" → "Get Early Access →"
- Loading state text: "Joining…" → "Sending…"
- (The `/waitlist` route itself is retired at launch — see go-live checklist)

### `src/components/Navbar.tsx`
- Desktop: add a "Sign In" text link immediately left of the green CTA button
  - Style: quiet secondary (`text-white/60 hover:text-white`, no pill/border)
  - Points to `https://app.inboxbuster.com/login`, `target="_blank"` not needed (same product)
- Mobile menu: add "Sign In" as a text link below the nav links, above the green CTA block

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
2. Delete `src/app/waitlist/` (entire directory)
3. Delete `src/app/api/waitlist/route.ts`
4. Add a redirect in `next.config` (or `next.config.ts`) for `/waitlist` → `https://app.inboxbuster.com/login` so any old links don't 404:
   ```js
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
- Changes to Footer, Features, or other sections
