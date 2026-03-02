# Inbox Buster Landing Page — Design Document
**Date:** 2026-03-02
**Stack:** Next.js + Tailwind CSS
**Deploy target:** Vercel

---

## Overview

Landing page for **Inbox Buster** — an Android app that cleans your email inbox. Features mass deletion, bulk unsubscription (with deletion), smart categorisation, and folder/archive movement. Future platforms: Web and iOS.

**Monetisation:** Free trial (500 emails, no card required) → Monthly subscription OR Annual payment. Stripe Climate member (1% of revenue to carbon removal).

---

## Brand Identity

| Token | Value |
|-------|-------|
| Primary (brand) | `#8B5CF6` — violet-500 |
| Action/CTA | `#4ADE80` — green-400 |
| Background (dark) | `#0F0A1E` — near-black with purple tint |
| Background (light) | `#F5F3FF` — purple-50 |
| Wordmark | "INBOX" white + "BUSTER" green, uppercase, bold |
| Accent icon | Lightning bolt ⚡ |

**Tone:** Bold, energetic, punchy. Headlines are direct and slightly irreverent. No corporate fluff.

---

## Page Structure

### 1. Hero (dark background `#0F0A1E`)

- **Wordmark:** `⚡ INBOX BUSTER` — INBOX in white, BUSTER in green
- **Headline:** "Your inbox is a disaster. Let's fix that."
- **Subhead:** "Mass delete. Unsubscribe in bulk. Sort the chaos. Inbox Buster takes the job you've been putting off and finishes it in minutes."
- **CTAs:**
  - Primary: `Get 500 Emails Free →` (green pill)
  - Secondary: `See how it works` (ghost, purple border)
- **Visual:** CSS/JS phone mockup showing **mass deletion animation** (right on desktop, below on mobile)
- **Badge:** Stripe Climate badge bottom corner — "We contribute 1% to carbon removal"

**Mass Deletion Animation (looping):**
1. Email rows fade in with category tags (Promotions, Newsletters, Receipts)
2. Checkboxes tick themselves down the list rapidly
3. Green `Delete 47 emails` button pulses and is "clicked"
4. Rows shake and dissolve/slide out in a sweep
5. `✓ Inbox cleared` confirmation in green
6. Loop

---

### 2. Features Grid (white background)

- **Headline:** "Everything your inbox needs. Nothing it doesn't."
- **Layout:** 3-column grid desktop, 1-column mobile
- **6 cards** (Lucide icon + title + description):

| Icon | Title | Description |
|------|-------|-------------|
| LayoutGrid | Smart Categorisation | Automatically groups emails by type — newsletters, receipts, social, promotions |
| Trash2 | Mass Deletion | Select a category and wipe hundreds of emails in one tap |
| BellOff | Bulk Unsubscribe | Unsubscribe from entire sender lists and delete their emails in one action |
| FolderInput | Move & Archive | Send emails to folders or archive in bulk — your way, your structure |
| BarChart2 | Inbox Summary | A clear breakdown of who's filling your inbox and how bad it really is |
| Globe | Coming Soon: Web & iOS | Already on Android — browser and iPhone support on the way |

- Cards have subtle purple border on hover, icons in green

---

### 3. See It In Action (dark background, `#0F0A1E`)

- **Headline:** "Watch the clutter disappear."
- **Layout:** Two phone mockups side by side on desktop, stacked on mobile
- Left mockup: **Mass Deletion animation** (same as hero)
- Right mockup: **Mass Unsubscribe & Delete animation**

**Mass Unsubscribe & Delete Animation (looping):**
1. Sender list appears — each row shows sender name + email count (e.g. `Medium Daily — 47 emails`, `LinkedIn — 112 emails`, `Groupon — 23 emails`)
2. `Unsubscribe & Delete All` button pulses and is "tapped"
3. Each sender row gets a red strikethrough on the name, then the row dissolves/sweeps out
4. Counter ticks up: `Deleted 182 emails · Unsubscribed from 8 senders`
5. Clean empty state appears
6. Loop

---

### 4. Pricing (light purple background `#F5F3FF`)

- **Headline:** "Simple pricing. No surprises."
- **Layout:** 2–3 cards centred, side by side on desktop

| Card | Label | Price | CTA |
|------|-------|-------|-----|
| Free Trial | "Start here" badge | Free | `Download Free →` (green) |
| Monthly | "Most Popular" badge | `£X / month` | `Start Monthly →` (purple) |
| Annual | "Best value" | `£X / year — save X%` | `Go Annual →` (outlined) |

- Below cards: `🌱 1% of every subscription goes to carbon removal via Stripe Climate.`

---

### 5. Social Proof (dark background `#0F0A1E`)

- **Headline:** "People are clearing the clutter."
- **Layout:** Auto-scrolling horizontal marquee of testimonial cards (pauses on hover)
- 3–4 placeholder testimonials (replace with real reviews post-launch)

---

### 6. Footer CTA Banner (green gradient)

- **Copy:** "Your inbox won't clean itself."
- **CTA:** `Get Started Free →`

---

### 7. Footer

- Left: `⚡ INBOX BUSTER` wordmark
- Centre: `Features · Pricing · Privacy Policy · Terms`
- Right: "Available on Android" + "iOS & Web coming soon"
- Bottom bar: `🌱 Stripe Climate member` + copyright

---

## Animations

All animations are pure CSS + JavaScript (no video/GIF). They loop continuously and are built to be crisp at any resolution.

- **Deletion animation:** Checkbox cascade → button click → row dissolve → empty state
- **Unsubscribe animation:** Sender list → tap action → strikethrough + dissolve → combined counter

---

## Implementation Notes

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Fonts:** Consider `Inter` or `Geist` for body, a heavier weight for headlines
- **No assets needed** — all visuals built in code
- **Prices:** Placeholder — fill before launch
- **Testimonials:** Placeholder — replace with real reviews post-launch
- **Stripe Climate badge:** Use official badge/copy from stripe.com/climate

---

## Implementation Skill

When implementing, invoke the **frontend-design** skill to ensure production-grade quality and distinctive visual design.
