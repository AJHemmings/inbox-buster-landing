# Landing Page Integration Handover
**Prepared for:** Claude in `AJHemmings/inbox-buster-landing`  
**Date:** 2026-04-24  
**Status:** Session complete. Landing page updated and pushed. Pre-launch checklist in section 11.

---

## 0. What Was Done This Session

All changes below were implemented and pushed on 2026-04-24.

1. **Pricing section** — rebuilt to three-tier model (Free, Premium, Premium + Support) with correct prices, descriptions, and feature lists. All CTA buttons say "Join the Waiting List" and route to `/waitlist` until launch. The `ctaHref` field per plan is wired up — at launch, swap the three href strings to the live app URLs and the buttons automatically switch to external `<a>` links.
2. **Hero section** — "a disaster." now has a real flame animation (SVG paths from `docs/plans/flames.md`, CSS `flameWobble` + `flamefly` keyframes). Free trial copy updated to 1,000 emails. Bonus pill updated to "surprise bonus". Badge updated to "Now live on Android & Web".
3. **Features section** — "Move & Archive" marked Coming Soon. Last card updated from "Web & iOS" to "iOS" only (web is live).
4. **Brand icon** — Navbar and Footer now use the SVG envelope + lightning bolt logo from `docs/plans/inbox-buster-icon-dark.svg` via `src/components/BrandIcon.tsx`. Lucide `<Zap>` removed.
5. **En/em dashes** — removed from all `.tsx` files across the project. Replaced with periods, commas, or hyphens where appropriate.
6. **"disappear." animation** — the word "disappear." in the InAction section fades out to nothing and snaps back on a 4-second loop.
7. **Privacy & Terms plan** — written at `docs/plans/privacy-terms-plan.md`. Pages not yet built.

---

## 1. What Is Inbox Buster?

Inbox Buster is an email cleaner app for Android and web. It syncs a user's inbox, categorises emails by sender, and lets them mass delete, unsubscribe, and archive in bulk. It supports Gmail and Outlook accounts.

---

## 2. URL Architecture

| Surface | URL | Notes |
|---|---|---|
| Landing page | `https://www.inboxbuster.com` | This repo — marketing + pricing |
| Web app | `https://app.inboxbuster.com` | Live on Vercel. Custom domain configured and DNS live. |
| Backend API | `https://backend-two-indol-79.vercel.app` | Node.js on Vercel — landing page does not call this directly |

The landing page does not call the backend API directly. All API calls are made from `app.inboxbuster.com`. The landing page only links to the web app.

---

## 3. Tier Model

### Free
- 1,000 emails cleaned per calendar month
- No support
- Default for all new users

### Premium (one-off, £5.00)
- Unlimited emails cleaned
- No support
- Permanent — never expires, never requires a subscription

### Premium + Support (£5.00 one-off + £2.50/month)
- Unlimited emails cleaned
- Access to support ticket submission (email-based)
- Support access is tied to the active subscription — cancelling removes support access but does not remove premium
- Users must have paid the £5 one-off before they can add the support subscription

The £2.50/month subscription is an add-on to premium, not a standalone tier.

---

## 4. Pricing CTAs — Current vs Launch State

All three pricing cards currently route to `/waitlist`. To go live, update the three `ctaHref` values in `src/components/Pricing.tsx` `PLANS` array:

```ts
// Free
ctaHref: "https://app.inboxbuster.com",

// Premium
ctaHref: "https://app.inboxbuster.com/upgrade",

// Premium + Support
ctaHref: "https://app.inboxbuster.com/upgrade?plan=subscription",
```

The `CtaButton` component automatically switches from `<Link>` (internal) to `<a target="_blank">` (external) based on whether the href starts with `http`. No other code changes needed.

---

## 5. Web App Pages (for linking)

| Page | URL | Purpose |
|---|---|---|
| Dashboard | `/dashboard` | Main app view |
| Login | `/login` | Sign in with Google or Microsoft |
| Upgrade | `/upgrade` | Stripe checkout — premium one-off payment |
| Upgrade (subscription) | `/upgrade?plan=subscription` | Stripe checkout — £2.50/month support add-on (requires premium) |
| Account management | `/account` | View tier status, manage subscription, submit support request |

---

## 6. Backend API Reference

All endpoints at `https://backend-two-indol-79.vercel.app`. All require a Firebase ID token in `Authorization: Bearer <token>`. The landing page does not call these.

### Billing

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/billing/checkout` | Creates Stripe Checkout Session for £5 premium one-off. Returns `{ url: string }`. |
| `POST` | `/billing/checkout-subscription` | Creates Stripe Checkout Session for £2.50/month support. Requires `status: 'premium'`. Returns `{ url: string }`. |
| `POST` | `/billing/portal` | Creates Stripe Customer Portal session. Returns `{ url: string }`. |
| `GET` | `/billing/status` | Returns `{ status: 'free' \| 'premium', support: boolean, subscriptionStatus: 'active' \| 'cancelled' \| null }` |

### Support

| Method | Path | Purpose |
|---|---|---|
| `POST` | `/support/ticket` | Submits support ticket. Requires `support: true`. Returns `403 { subscriptionRequired: true }` if no active subscription. |

---

## 7. Firestore Subscription Schema

```
subscriptions/{userId}:
  user_id: string
  status: 'free' | 'premium'
  support: boolean
  stripe_customer_id: string
  stripe_payment_intent_id: string
  stripe_subscription_id: string | null
  subscription_status: 'active' | 'cancelled' | null
  upgraded_at: ISO string | null
  support_since: ISO string | null
```

When a subscription is cancelled: `subscription_status` → `'cancelled'`, `support` → `false`, `status` remains `'premium'`.

---

## 8. Stripe Webhook Events

| Event | Effect |
|---|---|
| `checkout.session.completed` (mode: payment) | Sets `status: 'premium'`, `upgraded_at: now`, `stripe_payment_intent_id` |
| `checkout.session.completed` (mode: subscription) | Sets `support: true`, `subscription_status: 'active'`, `stripe_subscription_id`, `support_since: now` |
| `customer.subscription.deleted` | Sets `support: false`, `subscription_status: 'cancelled'` |
| `customer.subscription.updated` | Updates `subscription_status` |

Webhooks received at `/billing/webhook` on the backend. `STRIPE_WEBHOOK_SECRET` is an env var on the backend Vercel project only.

---

## 9. Plans Written (not yet built)

| Plan | File | Status |
|---|---|---|
| Privacy Policy + Terms of Service pages | `docs/plans/privacy-terms-plan.md` | Design spec + content outline written. Pages not implemented. |

---

## 10. Pre-Launch Checklist

- [ ] Swap three `ctaHref` values in `Pricing.tsx` to live app URLs (see section 4)
- [ ] Update Hero CTA (`src/components/Hero.tsx` line ~187) from `/waitlist` to `https://app.inboxbuster.com`
- [ ] Build `/privacy` and `/terms` pages (plan at `docs/plans/privacy-terms-plan.md`)
- [ ] Update Footer links for Privacy and Terms from `href="#"` to `/privacy` and `/terms`
- [ ] Confirm `https://www.inboxbuster.com` domain is pointed at this Vercel project

---

## 11. Notes

- The support email for the app is not yet set up — do not add a contact email to the landing page. The support form lives inside the web app for subscribed users only.
- The landing page does not link to `/account` — that page is for mobile deep-links only.
- `background-clip: text` and CSS `filter` cannot coexist on parent/child elements in Chrome — they fight over compositing layers. Do not apply `filter` to any ancestor of the "a disaster." gradient text span.
