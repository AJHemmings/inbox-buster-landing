# Pay-What-You-Want — Backend Handover
**Date:** 2026-04-27
**Context:** The landing page pricing was updated to replace the fixed £5 Premium card with a
"pay what you want" (PWYW) card. The user enters any amount they choose; paying unlocks
`status: 'premium'` permanently in Firestore, same as before.

This document describes every backend and app change needed. The landing page changes are
already shipped. The backend is at `https://backend-two-indol-79.vercel.app` and lives in a
separate project.

---

## What Changed (Landing Page — Already Done)

- The Premium card now shows a `£` prefix and a number input instead of a fixed price.
- The CTA still routes to `/waitlist` (pre-launch). At launch, it needs to link to
  `https://app.inboxbuster.com/upgrade?amount={amount}` where `amount` is whatever the user
  typed.
- The Buy Me a Coffee card was added as a 4th card. It links to
  `https://buymeacoffee.com/tonextlevel` and has no backend involvement.

---

## 1. Backend — `/billing/checkout` Endpoint

**File:** wherever `POST /billing/checkout` is defined in the backend project.

### Current behaviour
Creates a Stripe Checkout Session with a hardcoded `unit_amount: 500` (£5.00 in pence).

### New behaviour
Accepts an `amount` field in the request body. Validates it, converts to pence, passes it to
Stripe.

### Change to make

```js
// Before
app.post('/billing/checkout', authenticate, async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'gbp',
        unit_amount: 500, // hardcoded £5
        product_data: { name: 'Inbox Buster Premium' },
      },
      quantity: 1,
    }],
    // ... rest of config
  });
  res.json({ url: session.url });
});

// After
app.post('/billing/checkout', authenticate, async (req, res) => {
  const rawAmount = req.body.amount; // pounds, e.g. 5 or 12.50

  // Validate
  const pounds = parseFloat(rawAmount);
  if (isNaN(pounds) || pounds < 1) {
    return res.status(400).json({ error: 'Minimum amount is £1' });
  }

  const pence = Math.round(pounds * 100); // Stripe requires integer pence

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: [{
      price_data: {
        currency: 'gbp',
        unit_amount: pence,
        product_data: { name: 'Inbox Buster Premium' },
      },
      quantity: 1,
    }],
    // ... rest of config unchanged
  });
  res.json({ url: session.url });
});
```

**Nothing else changes in this endpoint.** The webhook fires exactly the same on completion,
Firestore gets `status: 'premium'` regardless of amount paid. The minimum is £1 to prevent
zero/near-zero abuse.

---

## 2. No Changes Needed

| Component | Status | Reason |
|---|---|---|
| `/billing/checkout-subscription` | No change | Support subscription is still fixed at £2.50/mo |
| `/billing/portal` | No change | Unrelated |
| `/billing/webhook` | No change | Still fires `checkout.session.completed` → sets `status: 'premium'` |
| `/billing/status` | No change | Returns same shape |
| `/support/ticket` | No change | Unrelated |
| Firestore schema | No change | `status: 'premium'` is still the unlock |
| Stripe dashboard | No change | No Price objects used — `price_data` is inline |
| Stripe Climate 1% | No change | Applies to all payments automatically |

---

## 3. Web App — `/upgrade` Page

The app's `/upgrade` page needs two small additions:

### 3a. Read `amount` from query param

When the landing page links to `https://app.inboxbuster.com/upgrade?amount=7`, the upgrade
page should pre-fill the amount input with `7`.

```ts
// Next.js App Router example
const searchParams = useSearchParams();
const prefilledAmount = searchParams.get('amount') ?? '';
```

### 3b. PWYW input on the upgrade page

The upgrade page currently has a fixed-price flow for the £5 card. It needs a number input
for the PWYW tier:

```tsx
<input
  type="number"
  min="1"
  step="1"
  defaultValue={prefilledAmount}
  onChange={(e) => setAmount(e.target.value)}
  placeholder="5"
/>
```

### 3c. POST the amount to the backend

When the user confirms, POST to `/billing/checkout` with the amount:

```ts
const res = await fetch('https://backend-two-indol-79.vercel.app/billing/checkout', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${await user.getIdToken()}`,
  },
  body: JSON.stringify({ amount: parseFloat(amount) }),
});
const { url } = await res.json();
window.location.href = url; // redirect to Stripe
```

---

## 4. Landing Page — Launch Checklist (PWYW Card)

The PWYW card currently shows static "You choose" text with no input, because the CTA goes
to `/waitlist` and showing an amount field would imply a working payment flow. At launch,
restore the full interactive card:

### 4a. Re-add the amount input in `src/components/Pricing.tsx`

Find the `plan.variant === "pwyw"` branch in `PricingCard` and replace the static block with:

```tsx
// Re-add useState to imports: import React, { useState } from "react";
// Add to PricingCard: const [amount, setAmount] = useState("");

<div className="mb-2">
  <p className="mb-1.5 text-xs font-bold uppercase tracking-widest text-white/40">
    Your amount
  </p>
  <div className="flex items-baseline gap-1">
    <span
      className="font-black tracking-tight text-white"
      style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1 }}
    >
      £
    </span>
    <input
      type="number"
      min="1"
      step="1"
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
      placeholder="5"
      aria-label="Amount in pounds"
      className="w-20 bg-transparent font-black tracking-tight text-white outline-none border-b-2 border-brand-purple/40 focus:border-brand-purple placeholder:text-white/20"
      style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1 }}
    />
    <span className="text-sm font-medium text-white/40">one-off</span>
  </div>
  <p className="mt-1.5 text-xs text-white/30">minimum £1</p>
</div>
```

### 4b. Update the CTA href

In the `PLANS` array, find `id: "premium"` and change `ctaHref`:

```ts
// Before (pre-launch)
ctaHref: "/waitlist",

// After (launch) — passes chosen amount to the app's upgrade page
ctaHref: `https://app.inboxbuster.com/upgrade?amount=${amount}`,
```

Because `amount` is component state, this href must be built dynamically. Change the
`CtaButton` inside the `pwyw` branch from a `<Link>` to an `<a>` tag that uses the live
state value, or pass `amount` into the `CtaButton` as a prop and build the href there.

### 4c. Update the CTA label

The button currently says "Join the Waiting List" which was correct pre-launch. At launch,
change the `cta` field for the `id: "premium"` plan in the `PLANS` array:

```ts
// Before (pre-launch)
cta: "Join the Waiting List",

// After (launch)
cta: "Get Premium",
```

---

## 5. Summary of Work for the Backend Agent

1. **Edit** `POST /billing/checkout`: accept `amount` in body, validate min £1, convert to
   pence, pass to Stripe `unit_amount`. Remove the hardcoded `500`.
2. **Edit** `/upgrade` page in the web app: add a number input with a "minimum £1" hint,
   read `?amount` query param to pre-fill it, POST the amount to the updated checkout endpoint.
3. **Test** with a £1 test payment in Stripe test mode — confirm webhook fires, Firestore
   sets `status: 'premium'`.
4. **No other changes needed** anywhere in the stack.

## 6. Landing Page — Final Launch Checklist (do last, once backend + app are live)

- [ ] Restore the PWYW amount input in `PricingCard` (section 4a above)
- [ ] Add `"minimum £1"` hint below the input (included in the code block in 4a)
- [ ] Change `ctaHref` for `id: "premium"` to `https://app.inboxbuster.com/upgrade?amount=${amount}` (section 4b)
- [ ] Change `cta` label for `id: "premium"` from `"Join the Waiting List"` to `"Get Premium"` (section 4c)
- [ ] Re-add `useState` to imports in `Pricing.tsx`
- [ ] Change all other waitlist `ctaHref` values to live app URLs (see original landing-page-handover.md section 4)
