# Animation Restyle + Glow Cleanup — Design Spec

**Date:** 2026-04-14
**Scope:** Option B — Restyle phone animations to match real app screenshots + remove gradient blobs
**Status:** Approved

---

## Problem

The current landing page phone animations look AI-generated. The phones use a purple-tinted dark background, tiny illegible fonts, glowing count badges, and radial gradient blobs floating behind them. The real app (reference screenshots in `docs/ref-images/`) has a neutral deep dark UI with proper row weight, letter avatars, circular checkboxes, and solid-fill action buttons.

The mismatch makes the landing page feel fake. The fix is to restyle the animations to match the actual app and remove the gradient blobs that scream "mock-up".

---

## What Is NOT Changing

- Animation logic and timing (phases, useEffect, setTimeout sequences)
- Page layout (Hero, InAction, all other sections)
- Copy, fonts, colour tokens (`brand-purple`, `brand-green`, `brand-dark`)
- All other components (Features, Pricing, SocialProof, Navbar, Footer)

---

## Changes

### 1. `PhoneShell.tsx`

**Background:** `#1a1a2e` → `#16161f` (neutral deep dark, matches real app)
**Box shadow:** Remove purple/white tint from shadow layers. Use clean dark shadow only:

```
0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)
```

Note: the `inset 0 1px 0 rgba(255,255,255,0.08)` top-edge highlight from the current shadow is intentionally removed.
**Border:** Keep at `1px solid rgba(255,255,255,0.10)` — no change needed.

---

### 2. New `InboxHealthAnimation.tsx` (create)

**Used in:** `Hero.tsx` — replaces `<UnsubscribeAnimation />`
**Type:** Static display, no state or useEffect.

**Screen layout (matches Screenshot 1):**

```
┌─────────────────────────────┐
│ 3:01  [status icons]        │  ← status bar
├─────────────────────────────┤
│ ≡   SUMMARY OF INBOX  20k  │  ← app header
├─────────────────────────────┤
│ CLEANED THIS ACCOUNT        │
│ 0 deleted · 0 unsubscribed  │  ← cleaned bar
├─────────────────────────────┤
│ ● Newsletter        13,476 ›│
│ ● Personal           5,427 ›│
│ ● Promotions           738 ›│  ← category rows
│ ● Receipts             224 ›│
│ ● Social                81 ›│
├─────────────────────────────┤
│ INBOX HEALTH                │
│        ☢️                   │
│   Nuclear meltdown          │
│   50,757 emails             │
│   This is a disaster.       │
│   [████████████████] ← red  │  ← health card
└─────────────────────────────┘
```

**Category row colours:**

- Newsletter: `#3B82F6` (blue)
- Personal: `#4ADE80` (green)
- Promotions: `#F97316` (orange)
- Receipts: `#EAB308` (yellow)
- Social: `#06B6D4` (cyan)

**Inbox Health card colours:**

- Label: `rgba(255,255,255,0.25)` uppercase tiny
- Status text "Nuclear meltdown": `#F87171` (red-400)
- Count "50,757 emails": white, large, heavy weight
- Subtitle: `rgba(255,255,255,0.30)` italic
- Progress bar fill: `#EF4444` at 100% width

**Row styling (category rows):**

- Background: `#1e1e2a`
- Border: `1px solid rgba(255,255,255,0.04)`
- Border radius: `10px`
- Padding: `8px 10px`
- Dot: 7px circle
- Name: `font-semibold`, `rgba(255,255,255,0.82)`
- Count badge: gray rounded pill `rgba(255,255,255,0.07)` bg, `rgba(255,255,255,0.40)` text
- Chevron `›`: `rgba(255,255,255,0.20)`

---

### 3. Restyle `DeletionAnimation.tsx`

**Animation logic:** Unchanged (phases: `idle → selecting → confirming → deleting → done`).
**Data:** Change from CATEGORIES list to SENDERS list — both animations now show the sender list screen.

**New sender data:**

```ts
const SENDERS = [
  { id: 1, name: "Credit Karma", count: 2345 },
  { id: 2, name: "LinkedIn Alerts", count: 1392 },
  { id: 3, name: "Twitch", count: 535 },
  { id: 4, name: "eBay Auctions", count: 463 },
  { id: 5, name: "PlayStation", count: 388 },
];
```

**Row layout change:**

```
OLD: [○ checkbox] [● dot] [Category name] [count badge]
NEW: [○ checkbox] [C avatar] [Sender name / N emails stacked]
```

**Row styling:**

- Idle: `#1e1e2a` bg, `1px solid rgba(255,255,255,0.04)` border
- Selected: `rgba(74,222,128,0.08)` bg, `1px solid rgba(74,222,128,0.18)` border
- Checkbox idle: `16px` circle, `1.5px solid rgba(255,255,255,0.22)` border, transparent fill
- Checkbox selected: `#4ADE80` fill, white `✓` icon
- Avatar: `22px` rounded square (`6px` radius), `#2a2a38` bg, sender initial, `rgba(255,255,255,0.55)` text
- Avatar selected: `rgba(74,222,128,0.12)` bg, `rgba(74,222,128,0.8)` text
- Sender name: `11px`, `font-semibold`, `rgba(255,255,255,0.85)` idle / `rgba(74,222,128,0.9)` selected
- Email count below name: `9px`, `rgba(255,255,255,0.30)` idle / `rgba(74,222,128,0.45)` selected

**Header:**

- Left: `← Newsletter` (back arrow + category name)
- Right: `N selected` when selecting, else `N senders`

**Button bar (bottom — new two-button layout, replaces the existing single button):**
The current single-button layout is replaced with two buttons rendered side by side (`flex gap-2`). Both buttons are always rendered. Only DELETE is ever active in this component — UNSUB & DELETE is always visually disabled (`pointer-events: none`, gray).

- Idle: both buttons `rgba(255,255,255,0.05)` bg, `rgba(255,255,255,0.25)` text
- Confirming: DELETE → solid `#4ADE80` bg, `#0a0a12` text. UNSUB & DELETE stays gray.
- Deleting: DELETE fades to `rgba(74,222,128,0.35)`, label changes to "Deleting..."
- Done: replace entire button bar div with green confirmation card (`✓ Inbox cleared`)

**Slide-off transition:** Unchanged — `translateX(32px) scale(0.95)` + `opacity: 0` on deletion.

---

### 4. Restyle `UnsubscribeAnimation.tsx`

**Animation logic:** Unchanged (phases: `idle → confirming → removing → done`). No `selecting` phase is added — do not add checkboxes.

**Row layout:** Rows use the same avatar + stacked text model as DeletionAnimation. The existing `struckIds` mechanic is preserved — rows turn orange and dissolve. The orange/struck colour replaces the current red.

Row struck-state changes (orange tint, not red):

- Row bg: `rgba(249,115,22,0.08)`, border: `1px solid rgba(249,115,22,0.18)`
- Avatar bg: `rgba(249,115,22,0.12)`, text: `rgba(249,115,22,0.8)`
- Sender name: `rgba(249,115,22,0.9)`, **retain strikethrough** (`textDecorationLine: line-through`, `textDecorationColor: rgba(249,115,22,0.7)`)
- The `BellOff` icon per row is removed — the orange tint makes the struck state clear without it
- Live counter during `removing` phase is retained, colours updated: `rgba(249,115,22,0.7)` and `rgba(249,115,22,0.5)`

**Button bar (two-button layout, same structure as DeletionAnimation):**

- Idle: both buttons gray/disabled
- Confirming: UNSUB & DELETE → solid `#F97316` bg, white text. DELETE stays gray.
- Removing: UNSUB & DELETE fades to `rgba(249,115,22,0.35)`, label "Removing..."
- Done: green confirmation card with `Deleted N emails` + `Unsubscribed from N senders` where both N values are computed from the SENDERS data array (e.g. total email count across all senders, and count of senders), matching the existing `TOTAL_EMAILS` and `TOTAL_SENDERS` constants already in the file.

---

### 5. `Hero.tsx` — Glow cleanup

**Remove:** Both large `aria-hidden` radial gradient blob divs (the `width: "70vw"` purple blob and the `width: "40vw"` green blob).
**Remove:** The `drop-shadow(0 0 40px rgba(139,92,246,0.25))` purple glow on the phone wrapper div.
**Keep:** The grid/noise background texture — it's subtle and structural.
**Keep:** The two smaller `aria-hidden` glow discs directly behind the phone (the `380px` and `280px` ones) — reduce opacity from `0.35`/`0.15` to `0.12`/`0.07` so they read as a soft ambient halo rather than a glowing orb.
**Phone drop shadow:** Replace purple-tinted drop-shadow with `drop-shadow(0 40px 80px rgba(0,0,0,0.75))`. This is a CSS `filter` on the phone wrapper div in Hero — it coexists with the `box-shadow` on the PhoneShell component itself. Both apply simultaneously.

---

### 6. `InAction.tsx` — Glow cleanup

**Remove:** The `glow-purple` and `glow-red` blur divs (`.absolute.inset-0.-z-10.rounded-full.blur-3xl`) behind each phone column.
**Remove:** The `glowClass` field from the `MockupColumn` interface and from both entries in the `MOCKUPS` array — it becomes dead code once the divs are gone.
**Keep:** The section's top-edge gradient line and the radial background gradient — these are structural, not blob-like.
**Phone wrapper:** Add `filter: drop-shadow(0 32px 64px rgba(0,0,0,0.6))` to each phone column's phone wrapper for grounding.

---

## Files Changed Summary

| File                                      | Action                                |
| ----------------------------------------- | ------------------------------------- |
| `src/components/PhoneShell.tsx`           | Modify — bg colour + shadow           |
| `src/components/InboxHealthAnimation.tsx` | **Create** — static summary screen    |
| `src/components/DeletionAnimation.tsx`    | Modify — row layout, data, buttons    |
| `src/components/UnsubscribeAnimation.tsx` | Modify — row layout, buttons          |
| `src/app/page.tsx` or `Hero.tsx`          | Modify — swap component, remove blobs |
| `src/components/InAction.tsx`             | Modify — remove glow divs             |

---

## Out of Scope (Next Session)

- Full landing page restyle (typography, section backgrounds, spacing)
- Pricing section redesign
- Any new sections

All set. Here's what to say at the start of next session:

▎ "Let's implement the animation restyle plan using subagent-driven development."

That's all I need — I'll pick up the context from memory, load the plan, and dispatch tasks one at a time with review between each. Pricing and full restyle follow after that.
