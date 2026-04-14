# Animation Restyle + Glow Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the landing page phone animations to match real app screenshots and remove the gradient blobs that make the page look AI-generated.

**Architecture:** Six focused file edits — one new static component, four restyles of existing animation/layout components, two section-level glow cleanups. No animation logic changes. No layout changes outside the six listed files.

**Tech Stack:** Next.js (App Router), React, TypeScript, Tailwind CSS v4, Lucide icons (`lucide-react`)

**Spec:** `docs/superpowers/specs/2026-04-14-animation-restyle-design.md`
**Reference images:** `docs/ref-images/` (three Android screenshots of the real app)

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/components/PhoneShell.tsx` | Modify | Phone frame — bg colour, shadow |
| `src/components/InboxHealthAnimation.tsx` | **Create** | Static summary screen for Hero |
| `src/components/DeletionAnimation.tsx` | Modify | Sender list animation — DELETE focus |
| `src/components/UnsubscribeAnimation.tsx` | Modify | Sender list animation — UNSUB focus |
| `src/components/Hero.tsx` | Modify | Swap component, remove gradient blobs |
| `src/components/InAction.tsx` | Modify | Remove glow divs + dead code |

---

## Task 1: Update PhoneShell

**Files:**
- Modify: `src/components/PhoneShell.tsx`

This is the frame that wraps every animation. Fix it first so all subsequent work is built on the correct shell.

- [ ] **Step 1.1: Update background and shadow**

Open `src/components/PhoneShell.tsx`. Replace the `style` object on the outer div:

```tsx
// BEFORE
style={{
  width: 260,
  height: 480,
  background: "#1a1a2e",
  borderRadius: 32,
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow:
    "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
}}

// AFTER
style={{
  width: 260,
  height: 480,
  background: "#16161f",
  borderRadius: 32,
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow:
    "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
}}
```

Note: the `inset` top-edge highlight is intentionally removed.

- [ ] **Step 1.2: Verify**

Run `npm run dev`, open `http://localhost:3000`. The phone shell background should be a neutral deep dark (not purple-tinted). Both phones in the InAction section and the hero phone should reflect this.

- [ ] **Step 1.3: Commit**

```bash
git add src/components/PhoneShell.tsx
git commit -m "style: update PhoneShell to neutral dark bg and clean shadow"
```

---

## Task 2: Create InboxHealthAnimation (static)

**Files:**
- Create: `src/components/InboxHealthAnimation.tsx`

New static component for the Hero. No state, no useEffect. Pure display of the Summary of Inbox screen (matching Screenshot 1 in `docs/ref-images/`).

- [ ] **Step 2.1: Create the component**

Create `src/components/InboxHealthAnimation.tsx`:

```tsx
import PhoneShell, { HomeIndicator } from "@/components/PhoneShell";

const CATEGORIES = [
  { name: "Newsletter",  color: "#3B82F6", count: "13,476" },
  { name: "Personal",    color: "#4ADE80", count: "5,427"  },
  { name: "Promotions",  color: "#F97316", count: "738"    },
  { name: "Receipts",    color: "#EAB308", count: "224"    },
  { name: "Social",      color: "#06B6D4", count: "81"     },
];

export default function InboxHealthAnimation() {
  return (
    <PhoneShell>
      {/* Status bar */}
      <div className="flex items-center justify-between px-4 pt-2 pb-1">
        <span className="text-[9px] font-semibold text-white/55">3:01</span>
        <span className="text-[9px] text-white/40">🔔 📶 🔋</span>
      </div>

      {/* App header */}
      <div className="flex items-center justify-between px-4 pb-2">
        <div className="flex items-center gap-2">
          <span className="text-[13px] text-white/50 leading-none">≡</span>
          <span className="text-[9px] font-black tracking-[0.12em] uppercase text-white/70">
            Summary of Inbox
          </span>
        </div>
        <span className="text-[9px] font-medium text-white/35">20,000 emails</span>
      </div>

      {/* Cleaned this account bar */}
      <div className="mx-3 mb-2 rounded-lg px-3 py-2"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)" }}
      >
        <p className="text-[7px] font-black uppercase tracking-[0.10em] text-white/25 mb-0.5">
          Cleaned This Account
        </p>
        <p className="text-[8px] text-white/35">0 deleted · 0 unsubscribed</p>
      </div>

      {/* Category list */}
      <div className="flex-1 overflow-hidden px-3 flex flex-col gap-1">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-2 rounded-[10px] px-2.5 py-[7px]"
            style={{ background: "#1e1e2a", border: "1px solid rgba(255,255,255,0.04)" }}
          >
            <div
              className="shrink-0 rounded-full"
              style={{ width: 7, height: 7, background: cat.color }}
            />
            <span className="flex-1 text-[10px] font-semibold text-white/82">{cat.name}</span>
            <span
              className="rounded-full px-2 py-0.5 text-[8px] font-semibold"
              style={{ background: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.40)" }}
            >
              {cat.count}
            </span>
            <span className="text-[9px] text-white/20 ml-0.5">›</span>
          </div>
        ))}
      </div>

      {/* Inbox health card */}
      <div
        className="mx-3 mt-2 rounded-[10px] px-3 py-2.5"
        style={{ background: "#1e1e2a", border: "1px solid rgba(255,255,255,0.06)" }}
      >
        <p className="text-[7px] font-black uppercase tracking-[0.12em] text-white/25 mb-2">
          Inbox Health
        </p>
        <div className="text-center mb-1">
          <span className="text-xl leading-none">☢️</span>
        </div>
        <p className="text-center text-[10px] font-bold mb-0.5" style={{ color: "#F87171" }}>
          Nuclear meltdown
        </p>
        <p className="text-center text-[15px] font-black text-white mb-0.5">
          50,757 emails
        </p>
        <p className="text-center text-[8px] italic mb-2" style={{ color: "rgba(255,255,255,0.30)" }}>
          This is a disaster. We&apos;re on it.
        </p>
        <div className="w-full h-1 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
          <div className="h-full w-full rounded-full" style={{ background: "#EF4444" }} />
        </div>
      </div>

      <HomeIndicator />
    </PhoneShell>
  );
}
```

- [ ] **Step 2.2: Verify the component renders**

Temporarily import it into `src/app/page.tsx` or the Hero to eyeball it before wiring it in properly. Compare to Screenshot 1 in `docs/ref-images/`. Check:
- Five category rows with correct colours and counts
- Inbox Health card visible with nuclear meltdown text and red bar
- No TypeScript errors (`npm run dev` should compile clean)

- [ ] **Step 2.3: Commit**

```bash
git add src/components/InboxHealthAnimation.tsx
git commit -m "feat: add static InboxHealthAnimation component"
```

---

## Task 3: Restyle DeletionAnimation

**Files:**
- Modify: `src/components/DeletionAnimation.tsx`

Replace CATEGORIES data with SENDERS, change row layout to match real app sender list (checkbox + letter avatar + stacked name/count), replace single button with two-button layout (DELETE active, UNSUB & DELETE always disabled).

- [ ] **Step 3.1: Replace data and types**

At the top of `src/components/DeletionAnimation.tsx`, replace the `CATEGORIES` const and `TOTAL_EMAILS` with:

```tsx
const SENDERS = [
  { id: 1, name: "Credit Karma",     count: 2345 },
  { id: 2, name: "LinkedIn Alerts",  count: 1392 },
  { id: 3, name: "Twitch",           count: 535  },
  { id: 4, name: "eBay Auctions",    count: 463  },
  { id: 5, name: "PlayStation",      count: 388  },
];

const TOTAL_EMAILS = SENDERS.reduce((sum, s) => sum + s.count, 0);
```

- [ ] **Step 3.2: Update state variable names**

The component uses `checkedIds` and `deletedIds` — these names still work fine. Update the `useEffect` references from `CATEGORIES` to `SENDERS`:

```tsx
// Replace every reference to CATEGORIES with SENDERS
// e.g. CATEGORIES.forEach → SENDERS.forEach
// e.g. CATEGORIES.filter → SENDERS.filter
// e.g. CATEGORIES.length → SENDERS.length

const checkedCount = SENDERS.filter(s => checkedIds.has(s.id)).reduce((sum, s) => sum + s.count, 0);
```

Update the header count display to preserve both states — the right-side span currently shows `${TOTAL_EMAILS} emails` (idle) and `${checkedCount} selected` (when checkedCount > 0). Update so both still work but idle text reads "N senders":

```tsx
// The existing conditional in the header span:
{checkedCount > 0 ? `${checkedCount} selected` : `${SENDERS.length} senders`}
```

- [ ] **Step 3.3: Restyle the row layout**

Replace the entire `CATEGORIES.map(...)` block (the `flex-1 overflow-hidden` div) with:

```tsx
<div className="flex-1 overflow-hidden px-3 pt-2 pb-1 flex flex-col gap-1.5">
  {SENDERS.map((sender) => {
    const isChecked = checkedIds.has(sender.id);
    const isDeleted = deletedIds.has(sender.id);

    return (
      <div
        key={sender.id}
        className="flex items-center gap-2 rounded-[10px] px-2.5 py-2"
        style={{
          background: isChecked ? "rgba(74,222,128,0.08)" : "#1e1e2a",
          border: isChecked
            ? "1px solid rgba(74,222,128,0.18)"
            : "1px solid rgba(255,255,255,0.04)",
          opacity: isDeleted ? 0 : 1,
          transform: isDeleted ? "translateX(32px) scale(0.95)" : "translateX(0) scale(1)",
          transitionProperty: "opacity, transform, background, border",
          transitionDuration: isDeleted ? "280ms" : "200ms",
          transitionTimingFunction: isDeleted ? "cubic-bezier(0.4, 0, 1, 1)" : "ease",
        }}
      >
        {/* Circular checkbox */}
        <div
          className="shrink-0 flex items-center justify-center rounded-full transition-all duration-200"
          style={{
            width: 16,
            height: 16,
            border: isChecked ? "none" : "1.5px solid rgba(255,255,255,0.22)",
            background: isChecked ? "#4ADE80" : "transparent",
          }}
        >
          {isChecked && (
            <span style={{ fontSize: 8, color: "#000", fontWeight: 900 }}>✓</span>
          )}
        </div>

        {/* Letter avatar */}
        <div
          className="shrink-0 flex items-center justify-center rounded-[6px] text-[9px] font-bold transition-all duration-200"
          style={{
            width: 22,
            height: 22,
            background: isChecked ? "rgba(74,222,128,0.12)" : "#2a2a38",
            color: isChecked ? "rgba(74,222,128,0.8)" : "rgba(255,255,255,0.55)",
          }}
        >
          {sender.name.charAt(0)}
        </div>

        {/* Stacked name + count */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[11px] font-semibold leading-tight transition-colors duration-200"
            style={{ color: isChecked ? "rgba(74,222,128,0.9)" : "rgba(255,255,255,0.85)" }}
          >
            {sender.name}
          </p>
          <p
            className="text-[9px] transition-colors duration-200"
            style={{ color: isChecked ? "rgba(74,222,128,0.45)" : "rgba(255,255,255,0.30)" }}
          >
            {sender.count.toLocaleString()} emails
          </p>
        </div>
      </div>
    );
  })}
</div>
```

- [ ] **Step 3.4: Replace the single button with two-button layout**

Replace the existing button/done area at the bottom. Keep the `isDone` confirmation card unchanged in content, but replace everything around the single button:

```tsx
<div className="px-3 pb-5 pt-2">
  {isDone ? (
    <div
      className="flex items-center justify-center gap-2 rounded-xl py-3 transition-all duration-500"
      style={{
        border: "1px solid rgba(74,222,128,0.4)",
        background: "rgba(74,222,128,0.08)",
        boxShadow: "0 0 20px rgba(74,222,128,0.12)",
      }}
    >
      <div
        className="flex items-center justify-center rounded-full"
        style={{ width: 20, height: 20, background: "#4ADE80", boxShadow: "0 0 10px rgba(74,222,128,0.5)" }}
      >
        <span style={{ fontSize: 9, color: "#000", fontWeight: 900 }}>✓</span>
      </div>
      <span className="text-xs font-bold tracking-wide" style={{ color: "#4ADE80" }}>
        Inbox cleared
      </span>
    </div>
  ) : (
    <div className="flex gap-2">
      {/* DELETE — active */}
      <button
        disabled
        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase transition-all duration-300"
        style={
          isDeleting
            ? { background: "rgba(74,222,128,0.35)", color: "rgba(255,255,255,0.60)", border: "1px solid rgba(74,222,128,0.20)" }
            : isConfirming
            ? { background: "#4ADE80", color: "#0a0a12", border: "none" }
            : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.08)" }
        }
      >
        🗑 {isDeleting ? "Deleting..." : "Delete"}
      </button>

      {/* UNSUB & DELETE — always disabled */}
      <button
        disabled
        aria-disabled
        className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase"
        style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }}
      >
        🔕 Unsub &amp; Delete
      </button>
    </div>
  )}

  <HomeIndicator />
</div>
```

Remove the now-unused `buttonBg` and `buttonLabel` variables.

**HomeIndicator placement:** `<HomeIndicator />` should remain a direct child of `<PhoneShell>`, as a sibling of the button-bar wrapper div — not nested inside it. The code snippet above already shows this correctly: `<HomeIndicator />` appears after the closing `</div>` of the `px-3 pb-5 pt-2` wrapper.

- [ ] **Step 3.5: Remove unused imports**

`Trash2` and `Check` from lucide-react are both now unused (the new row uses an inline `<span>✓</span>` and the button no longer uses Trash2). Remove both from the import line:

```tsx
// BEFORE
import { Check, Trash2 } from "lucide-react";

// AFTER  — remove this import line entirely, or if other imports remain, remove just these two named imports
```

- [ ] **Step 3.6: Verify**

`npm run dev` — check the InAction section. The left phone (Mass Deletion) should show:
- Five sender rows with circular checkboxes and letter avatars
- Rows animate in one by one with green tint + checkbox fill
- Two buttons at bottom; DELETE lights up green, UNSUB & DELETE stays gray
- Rows slide off, then "Inbox cleared" confirmation

- [ ] **Step 3.7: Commit**

```bash
git add src/components/DeletionAnimation.tsx
git commit -m "style: restyle DeletionAnimation to match real app sender list UI"
```

---

## Task 4: Restyle UnsubscribeAnimation

**Files:**
- Modify: `src/components/UnsubscribeAnimation.tsx`

Same row layout as Task 3 (avatar + stacked text), but: no checkboxes, orange tint for struck state (replaces red), `struckIds` and strikethrough preserved, `BellOff` icon removed, two-button layout with UNSUB & DELETE as the active button.

- [ ] **Step 4.1: Restyle the row layout**

Replace the `SENDERS.map(...)` block with the new layout. Key differences from Task 3: no checkbox div, struck state uses orange not green, strikethrough is retained on the name:

```tsx
<div className="flex-1 overflow-hidden px-3 pt-2 pb-1 flex flex-col gap-1.5">
  {SENDERS.map((sender) => {
    const isStruck = struckIds.has(sender.id);
    const isDissolved = dissolvedIds.has(sender.id);

    return (
      <div
        key={sender.id}
        className="flex items-center gap-2 rounded-[10px] px-2.5 py-2"
        style={{
          background: isStruck ? "rgba(249,115,22,0.08)" : "#1e1e2a",
          border: isStruck
            ? "1px solid rgba(249,115,22,0.18)"
            : "1px solid rgba(255,255,255,0.04)",
          opacity: isDissolved ? 0 : 1,
          transform: isDissolved ? "translateX(32px) scale(0.95)" : "translateX(0) scale(1)",
          transitionProperty: "opacity, transform, background, border",
          transitionDuration: isDissolved ? "300ms" : "220ms",
          transitionTimingFunction: isDissolved ? "cubic-bezier(0.4, 0, 1, 1)" : "ease",
        }}
      >
        {/* Letter avatar */}
        <div
          className="shrink-0 flex items-center justify-center rounded-[6px] text-[9px] font-bold transition-all duration-200"
          style={{
            width: 22,
            height: 22,
            background: isStruck ? "rgba(249,115,22,0.12)" : "#2a2a38",
            color: isStruck ? "rgba(249,115,22,0.8)" : "rgba(255,255,255,0.55)",
          }}
        >
          {sender.name.charAt(0)}
        </div>

        {/* Stacked name + count — name retains strikethrough when struck */}
        <div className="flex-1 min-w-0">
          <p
            className="text-[11px] font-semibold leading-tight transition-all duration-200"
            style={{
              color: isStruck ? "rgba(249,115,22,0.9)" : "rgba(255,255,255,0.85)",
              textDecorationLine: isStruck ? "line-through" : "none",
              textDecorationColor: "rgba(249,115,22,0.7)",
              textDecorationThickness: "1.5px",
            }}
          >
            {sender.name}
          </p>
          <p
            className="text-[9px] transition-colors duration-200"
            style={{ color: isStruck ? "rgba(249,115,22,0.45)" : "rgba(255,255,255,0.30)" }}
          >
            {sender.count.toLocaleString()} emails
          </p>
        </div>
      </div>
    );
  })}
</div>
```

- [ ] **Step 4.2: Update the live counter colours**

Find the counter div above the button (the `showCounter` div). Update text colours from red to orange:

```tsx
// rgba(248,113,113,0.7) → rgba(249,115,22,0.7)
// rgba(248,113,113,0.5) → rgba(249,115,22,0.5)
```

- [ ] **Step 4.3: Replace the button with two-button layout**

Replace the existing single button with:

```tsx
{isDone ? (
  <div
    className="rounded-xl py-3 px-3 flex flex-col items-center gap-1 transition-all duration-500"
    style={{
      border: "1px solid rgba(74,222,128,0.35)",
      background: "rgba(74,222,128,0.07)",
      boxShadow: "0 0 20px rgba(74,222,128,0.10)",
    }}
  >
    <div className="flex items-center gap-1.5 mb-0.5">
      <div
        className="flex items-center justify-center rounded-full shrink-0"
        style={{ width: 16, height: 16, background: "#4ADE80", boxShadow: "0 0 8px rgba(74,222,128,0.5)" }}
      >
        <span style={{ fontSize: 9, color: "#000", fontWeight: 900 }}>✓</span>
      </div>
      <span className="text-[11px] font-bold tracking-wide" style={{ color: "#4ADE80" }}>Done</span>
    </div>
    <span className="text-[10px] font-semibold" style={{ color: "rgba(74,222,128,0.85)" }}>
      Deleted {TOTAL_EMAILS} emails
    </span>
    <span className="text-[9px]" style={{ color: "rgba(74,222,128,0.55)" }}>
      Unsubscribed from {TOTAL_SENDERS} senders
    </span>
  </div>
) : (
  <div className="flex gap-2">
    {/* DELETE — always disabled */}
    <button
      disabled
      aria-disabled
      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase"
      style={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.20)", border: "1px solid rgba(255,255,255,0.07)", pointerEvents: "none" }}
    >
      🗑 Delete
    </button>

    {/* UNSUB & DELETE — active */}
    <button
      disabled
      className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase transition-all duration-300"
      style={
        isRemoving
          ? { background: "rgba(249,115,22,0.35)", color: "rgba(255,255,255,0.60)", border: "1px solid rgba(249,115,22,0.20)" }
          : isConfirming
          ? { background: "#F97316", color: "#fff", border: "none" }
          : { background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.25)", border: "1px solid rgba(255,255,255,0.08)" }
      }
    >
      🔕 {isRemoving ? "Removing..." : "Unsub & Delete"}
    </button>
  </div>
)}
```

- [ ] **Step 4.4: Remove unused imports**

`BellOff` from lucide-react is no longer used. Remove it from the import line. `Check` is also now unused (replaced with inline span). Remove it too.

- [ ] **Step 4.5: Verify**

Check the right phone in InAction:
- Five sender rows with letter avatars, no checkboxes
- Rows turn orange with strikethrough as they're struck
- Two buttons at bottom; UNSUB & DELETE lights up orange, DELETE stays gray
- Rows dissolve, live counter updates, green done card appears

- [ ] **Step 4.6: Commit**

```bash
git add src/components/UnsubscribeAnimation.tsx
git commit -m "style: restyle UnsubscribeAnimation to match real app sender list UI"
```

---

## Task 5: Update Hero.tsx

**Files:**
- Modify: `src/components/Hero.tsx`

Swap `UnsubscribeAnimation` for the new `InboxHealthAnimation`. Remove the two large radial gradient blobs. Reduce the surviving glow discs behind the phone. Update the phone wrapper drop shadow.

- [ ] **Step 5.1: Swap the import**

```tsx
// Remove:
import UnsubscribeAnimation from "@/components/UnsubscribeAnimation";

// Add:
import InboxHealthAnimation from "@/components/InboxHealthAnimation";
```

- [ ] **Step 5.2: Swap the component usage**

Find `<UnsubscribeAnimation />` in the JSX and replace with `<InboxHealthAnimation />`.

- [ ] **Step 5.3: Remove the two large gradient blobs**

The two blobs to remove are the first two `aria-hidden` divs after the `<section>` opening tag. Identify them by these unique style values and delete each div in its entirety (from `<div` to the closing `/>` of the self-closing tag):

1. **Purple blob** — has `style={{ top: "-10%", left: "-15%", width: "70vw" ... }}`. Delete from `<div` through `/>`.
2. **Green blob** — has `style={{ bottom: "-5%", right: "-10%", width: "40vw" ... }}`. Delete from `<div` through `/>`.

These are both self-closing (`/>`) divs so there is no nesting to worry about. The third `aria-hidden` div (the grid/noise texture with `backgroundImage: "linear-gradient(..."`) is **not** a blob — leave it alone.

- [ ] **Step 5.4: Reduce the two surviving glow discs**

These are the smaller glow divs directly inside the phone column div (not the section-level blobs). Reduce their opacity:

There are two `aria-hidden` glow divs inside the phone column — identified by their `width` values (380px and 280px). Update their `background` radial-gradient colour stop opacities as follows:

**380px disc** (has `width: 380` in its style): The `background` property has two opacity values in the gradient — change `0.35` → `0.12` and `0.12` → `0.05`:
```tsx
// BEFORE:
background: "radial-gradient(ellipse at center, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.12) 40%, transparent 72%)"
// AFTER:
background: "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.05) 40%, transparent 72%)"
```

**280px disc** (has `width: 280`): Change `0.15` → `0.07`:
```tsx
// BEFORE:
background: "radial-gradient(ellipse at 60% 70%, rgba(74,222,128,0.15) 0%, transparent 65%)"
// AFTER:
background: "radial-gradient(ellipse at 60% 70%, rgba(74,222,128,0.07) 0%, transparent 65%)"
```

- [ ] **Step 5.5: Update the phone wrapper drop shadow**

Find the `relative z-10` div wrapping the animation component and update its `filter`:

```tsx
// BEFORE
filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(139,92,246,0.25))"

// AFTER
filter: "drop-shadow(0 40px 80px rgba(0,0,0,0.75))"
```

- [ ] **Step 5.6: Verify**

Hero section should show:
- The Summary of Inbox screen in the phone (category list + inbox health card)
- No large purple/green fog around the phone
- Subtle ambient halo at most — device feels grounded

- [ ] **Step 5.7: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "style: swap Hero animation to InboxHealthAnimation, remove gradient blobs"
```

---

## Task 6: Clean up InAction.tsx

**Files:**
- Modify: `src/components/InAction.tsx`

Remove the `glowClass` glow divs, strip the dead `glowClass` field from the interface and data, add a grounding drop shadow to each phone wrapper.

- [ ] **Step 6.1: Remove glowClass from the interface**

```tsx
// BEFORE
interface MockupColumn {
  animation: React.ReactNode;
  glowClass: string;
  title: string;
  subtitle: string;
}

// AFTER
interface MockupColumn {
  animation: React.ReactNode;
  title: string;
  subtitle: string;
}
```

- [ ] **Step 6.2: Remove glowClass from MOCKUPS array**

```tsx
// Remove the glowClass field from both entries:
const MOCKUPS: MockupColumn[] = [
  {
    animation: <DeletionAnimation />,
    title: "Mass Deletion",
    subtitle: "Select a category. One tap. Done.",
  },
  {
    animation: <UnsubscribeAnimation />,
    title: "Unsubscribe & Delete",
    subtitle: "Cuts the sender off and cleans up after them.",
  },
];
```

- [ ] **Step 6.3: Remove the glow div and add drop shadow**

Find the `relative` div that wraps each `{col.animation}` and update it:

```tsx
// BEFORE
<div className="relative">
  <div
    aria-hidden="true"
    className={`absolute inset-0 -z-10 rounded-full blur-3xl ${col.glowClass}`}
    style={{ transform: "scale(1.35) translateY(8%)" }}
  />
  {col.animation}
</div>

// AFTER
<div
  className="relative"
  style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.6))" }}
>
  {col.animation}
</div>
```

- [ ] **Step 6.4: Verify**

InAction section should show both phones side by side with no purple/red glow halos. Phones look grounded with a clean dark shadow beneath them.

- [ ] **Step 6.5: Commit**

```bash
git add src/components/InAction.tsx
git commit -m "style: remove glow divs from InAction, clean up dead glowClass code"
```

---

## Final Check

- [ ] `npm run build` — no TypeScript errors, no missing imports
- [ ] Check all three sections visually: Hero, InAction
- [ ] Compare InAction phones against `docs/ref-images/` screenshots — rows, avatars, buttons should be recognisably the same UI
- [ ] Commit any final fixes, then push

```bash
git push origin master
```
