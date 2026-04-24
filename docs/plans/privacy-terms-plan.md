# Privacy Policy & Terms of Service — Implementation Plan
**Date:** 2026-04-24
**Status:** Planning

---

## 0. Summary

Two new static pages needed before launch:
- `/privacy` — Privacy Policy
- `/terms` — Terms of Service

Both are legal/informational pages. No backend calls, no auth, no dynamic content. Design should match the rest of the landing page (dark background, brand typography).

---

## 1. Routes

| Page | Route | File |
|---|---|---|
| Privacy Policy | `/privacy` | `src/app/privacy/page.tsx` |
| Terms of Service | `/terms` | `src/app/terms/page.tsx` |

Footer links (currently `href="#"`) should be updated to point to these routes once they exist.

---

## 2. Privacy Policy — Content Outline

### What data is collected
- **Account data:** email address, name, and profile photo via Google or Microsoft OAuth (Firebase Auth)
- **Email metadata:** sender, subject, date, and counts — fetched via Gmail API / Microsoft Graph API. Message body is never stored.
- **Payment data:** handled entirely by Stripe. Inbox Buster stores only a Stripe customer ID, not card details.
- **Usage data:** standard Vercel/Firebase analytics (page views, error logs). No ad tracking.

### How data is used
- To authenticate the user and restore sessions
- To display inbox categorisation and counts within the app
- To process payments and track subscription status
- To send support responses (email only, for subscribed users)

### Third-party services
| Service | Purpose | Their privacy policy |
|---|---|---|
| Firebase (Google) | Auth, Firestore database | https://firebase.google.com/support/privacy |
| Google OAuth | Sign in with Google | https://policies.google.com/privacy |
| Microsoft OAuth | Sign in with Outlook | https://privacy.microsoft.com |
| Stripe | Payments | https://stripe.com/privacy |
| Vercel | Hosting, analytics | https://vercel.com/legal/privacy-policy |

### Data retention
- Account and subscription data: retained while account exists
- Email metadata: not persisted — fetched on demand, processed in memory, not stored
- Deleted accounts: data removed within 30 days

### User rights (GDPR)
- Right to access, correct, or delete their data
- Right to withdraw consent (delete account)
- Contact: adamhemmingsdev@gmail.com

---

## 3. Terms of Service — Content Outline

### Acceptance
Using the app constitutes acceptance of these terms.

### What the service does
Inbox Buster connects to a user's Gmail or Outlook account (with explicit OAuth consent) to categorise, display, and action emails on their behalf.

### Payment terms
- **Free tier:** 1,000 emails cleaned per calendar month at no cost.
- **Premium (£5 one-off):** Unlimited emails, permanent. Non-refundable after use.
- **Support subscription (£2.50/month):** Gives access to support ticket submission. Cancel any time via the Account page. Cancelling removes support access; premium status is retained.

### Refund policy
- One-off premium payment: no refund once the upgrade has been applied to an account.
- Support subscription: cancel any time; no partial-month refunds.

### Acceptable use
- Users must not attempt to extract, scrape, or misuse email data beyond normal app use.
- Users must not attempt to bypass rate limits or quota enforcement.

### Limitation of liability
- Inbox Buster is provided as-is. We are not liable for accidental deletion of emails — users are responsible for confirming actions before they are applied.
- Maximum liability is capped at the amount paid in the 12 months prior to any claim.

### Account termination
- We may suspend accounts that violate these terms.
- Users may delete their account at any time from the Account page.

### Changes to terms
We will notify users by email before making material changes.

---

## 4. Page Design

### Layout
- `<Navbar />` and `<Footer />` — reuse existing components
- Content area: `max-w-3xl mx-auto px-6 py-24`
- Light typography on dark background, consistent with rest of site

### Typography
- `<h1>` — page title (e.g. "Privacy Policy"), large, font-black, white
- `<h2>` — section headings, brand-purple or white/80
- `<p>`, `<ul>` — body text, white/60, text-sm or text-base, leading-relaxed
- Last updated date below title in white/30

### No new dependencies
Pure HTML/TSX. No MDX, no CMS, no markdown renderer needed at this scale.

---

## 5. Build Order

1. Create `src/app/privacy/page.tsx` with Navbar + content + Footer
2. Create `src/app/terms/page.tsx` with Navbar + content + Footer
3. Update Footer links: `href="#"` → `/privacy` and `/terms`
4. Confirm both pages render correctly at `/privacy` and `/terms`

---

## 6. Notes

- The support email for legal contact is **adamhemmingsdev@gmail.com** — this should appear on the Privacy page as the data controller contact.
- Do not publish a postal address — not legally required for a digital-only product at this stage.
- These are v1 pages. A proper legal review is recommended before launch.
