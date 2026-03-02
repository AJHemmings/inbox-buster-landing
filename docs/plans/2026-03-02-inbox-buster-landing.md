# Inbox Buster Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.
> **IMPORTANT:** Before implementing any UI task, invoke the **frontend-design** skill to ensure production-grade, distinctive visual quality.

**Goal:** Build a bold, energetic Next.js landing page for Inbox Buster — an Android inbox-cleaning app — with animated phone mockups, a feature grid, pricing cards, and a social proof marquee.

**Architecture:** Single Next.js App Router page (`app/page.tsx`) composed of self-contained section components. All animations are pure CSS keyframes + JS sequencing (no video or external assets). Global design tokens live in `tailwind.config.ts`.

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Lucide React, TypeScript

**Design reference:** `docs/plans/2026-03-02-inbox-buster-landing-design.md`

---

## Task 1: Scaffold the Next.js project

**Files:**
- Create: project root (scaffolded via CLI)

**Step 1: Initialise the project**

```bash
cd F:/Projects/e-cleaner-landing-page
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm
```

Accept all defaults when prompted.

**Step 2: Install Lucide React**

```bash
npm install lucide-react
```

**Step 3: Verify dev server starts**

```bash
npm run dev
```

Expected: Server running at `http://localhost:3000` with the default Next.js page.

**Step 4: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Next.js project with Tailwind and Lucide"
```

---

## Task 2: Configure design tokens in Tailwind

**Files:**
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Step 1: Extend Tailwind with brand colors and font**

Replace the contents of `tailwind.config.ts` with:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: "#8B5CF6",
          green: "#4ADE80",
          dark: "#0F0A1E",
          light: "#F5F3FF",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-out": "slideOut 0.4s ease forwards",
        "check": "check 0.2s ease forwards",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideOut: {
          from: { opacity: "1", transform: "translateX(0)" },
          to: { opacity: "0", transform: "translateX(60px)" },
        },
        check: {
          from: { transform: "scale(0)" },
          to: { transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 2: Update globals.css with base styles and Inter font**

Replace `src/app/globals.css` with:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-white text-gray-900 font-sans antialiased;
  }
}

@layer utilities {
  .text-gradient-purple-green {
    background: linear-gradient(135deg, #8B5CF6, #4ADE80);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .bg-hero-glow {
    background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(139,92,246,0.25) 0%, transparent 70%);
  }
}
```

**Step 3: Verify build**

```bash
npm run build
```

Expected: Build completes with no errors.

**Step 4: Commit**

```bash
git add tailwind.config.ts src/app/globals.css
git commit -m "feat: configure brand design tokens and global styles"
```

---

## Task 3: Build the Navbar

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/Navbar.tsx`
- Modify: `src/app/layout.tsx`

**Step 1: Create the Navbar component**

```tsx
// src/components/Navbar.tsx
"use client";
import { Zap } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-brand-dark/80 backdrop-blur-md border-b border-white/5">
      {/* Wordmark */}
      <div className="flex items-center gap-2">
        <Zap className="text-brand-green w-5 h-5" fill="currentColor" />
        <span className="font-black text-lg tracking-tight">
          <span className="text-white">INBOX</span>
          <span className="text-brand-green">BUSTER</span>
        </span>
      </div>

      {/* Nav links */}
      <div className="hidden md:flex items-center gap-8 text-sm text-white/60 font-medium">
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#action" className="hover:text-white transition-colors">See It In Action</a>
        <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
      </div>

      {/* CTA */}
      <a
        href="#pricing"
        className="bg-brand-green text-gray-900 font-bold text-sm px-4 py-2 rounded-full hover:brightness-110 transition-all"
      >
        Get Started Free
      </a>
    </nav>
  );
}
```

**Step 2: Add Navbar to layout**

In `src/app/layout.tsx`, import and render `<Navbar />` above `{children}`:

```tsx
import Navbar from "@/components/Navbar";

// Inside <body>:
<Navbar />
{children}
```

**Step 3: Verify visually**

Run `npm run dev` and check:
- Navbar is fixed at top
- Wordmark shows "INBOX" white + "BUSTER" green
- Links visible on desktop, CTA button present

**Step 4: Commit**

```bash
git add src/components/Navbar.tsx src/app/layout.tsx
git commit -m "feat: add fixed navbar with wordmark and nav links"
```

---

## Task 4: Build the mass deletion animation component

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/DeletionAnimation.tsx`

**Step 1: Create the component**

```tsx
// src/components/DeletionAnimation.tsx
"use client";
import { useEffect, useState } from "react";

const EMAILS = [
  { id: 1, tag: "Promotions", sender: "Groupon", subject: "50% off today only!", tagColor: "bg-orange-500" },
  { id: 2, tag: "Newsletter", sender: "Medium Daily", subject: "Top stories for you", tagColor: "bg-blue-500" },
  { id: 3, tag: "Receipts", sender: "Amazon", subject: "Your order has shipped", tagColor: "bg-yellow-500" },
  { id: 4, tag: "Promotions", sender: "LinkedIn", subject: "You have 14 new notifications", tagColor: "bg-sky-500" },
  { id: 5, tag: "Newsletter", sender: "Substack", subject: "Weekend reads", tagColor: "bg-purple-500" },
];

type Phase = "idle" | "selecting" | "confirming" | "deleting" | "done";

export default function DeletionAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [deleted, setDeleted] = useState<Set<number>>(new Set());

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    const run = () => {
      // Reset
      setPhase("idle");
      setChecked(new Set());
      setDeleted(new Set());

      // Start selecting after brief pause
      t = setTimeout(() => setPhase("selecting"), 800);

      // Tick checkboxes one by one
      EMAILS.forEach((email, i) => {
        t = setTimeout(() => {
          setChecked(prev => new Set([...prev, email.id]));
        }, 1200 + i * 250);
      });

      // Show confirm button
      t = setTimeout(() => setPhase("confirming"), 1200 + EMAILS.length * 250 + 200);

      // Delete rows
      t = setTimeout(() => {
        setPhase("deleting");
        EMAILS.forEach((email, i) => {
          setTimeout(() => {
            setDeleted(prev => new Set([...prev, email.id]));
          }, i * 120);
        });
      }, 1200 + EMAILS.length * 250 + 900);

      // Done state
      t = setTimeout(() => setPhase("done"), 1200 + EMAILS.length * 250 + 900 + EMAILS.length * 120 + 300);

      // Loop
      t = setTimeout(run, 1200 + EMAILS.length * 250 + 900 + EMAILS.length * 120 + 2500);
    };

    run();
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="w-[260px] h-[480px] bg-[#1a1a2e] rounded-[32px] border border-white/10 overflow-hidden shadow-2xl shadow-brand-purple/20 flex flex-col">
      {/* Phone status bar */}
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <span className="text-white/40 text-[10px]">9:41</span>
        <div className="w-20 h-4 bg-black rounded-full" />
        <span className="text-white/40 text-[10px]">●●●</span>
      </div>

      {/* App header */}
      <div className="px-4 pb-3 border-b border-white/5">
        <p className="text-white font-bold text-sm">Inbox</p>
        <p className="text-white/40 text-[10px]">47 emails</p>
      </div>

      {/* Email rows */}
      <div className="flex-1 overflow-hidden px-3 pt-2 space-y-1">
        {EMAILS.map(email => (
          <div
            key={email.id}
            className={`flex items-center gap-2 bg-white/5 rounded-lg px-2 py-2 transition-all duration-300 ${
              deleted.has(email.id) ? "opacity-0 translate-x-8 scale-95" : "opacity-100"
            }`}
          >
            {/* Checkbox */}
            <div className={`w-4 h-4 rounded border flex items-center justify-center transition-all duration-150 flex-shrink-0 ${
              checked.has(email.id)
                ? "bg-brand-green border-brand-green"
                : "border-white/20 bg-transparent"
            }`}>
              {checked.has(email.id) && (
                <svg className="w-2.5 h-2.5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1 mb-0.5">
                <span className={`text-[8px] px-1.5 py-0.5 rounded-full text-white font-medium ${email.tagColor}`}>
                  {email.tag}
                </span>
              </div>
              <p className="text-white text-[10px] font-medium truncate">{email.sender}</p>
              <p className="text-white/40 text-[9px] truncate">{email.subject}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action button / done state */}
      <div className="px-4 pb-6 pt-3">
        {phase === "done" ? (
          <div className="flex items-center justify-center gap-2 bg-brand-green/10 border border-brand-green/30 rounded-xl py-3">
            <svg className="w-4 h-4 text-brand-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span className="text-brand-green text-xs font-bold">Inbox cleared</span>
          </div>
        ) : (
          <button
            className={`w-full py-3 rounded-xl text-xs font-bold transition-all duration-300 ${
              phase === "confirming" || phase === "deleting"
                ? "bg-brand-green text-gray-900 scale-105 shadow-lg shadow-brand-green/30"
                : "bg-white/5 text-white/30 cursor-default"
            }`}
          >
            {phase === "deleting" ? "Deleting..." : `Delete ${checked.size > 0 ? checked.size : ""} emails`}
          </button>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify animation works**

Import temporarily into `src/app/page.tsx` and run `npm run dev`. Check:
- Checkboxes tick down the list sequentially
- Button activates after all are checked
- Rows slide out on delete
- Green "Inbox cleared" confirmation appears
- Loop restarts

**Step 3: Commit**

```bash
git add src/components/DeletionAnimation.tsx
git commit -m "feat: add mass deletion animation component"
```

---

## Task 5: Build the mass unsubscribe & delete animation component

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/UnsubscribeAnimation.tsx`

**Step 1: Create the component**

```tsx
// src/components/UnsubscribeAnimation.tsx
"use client";
import { useEffect, useState } from "react";

const SENDERS = [
  { id: 1, name: "Medium Daily", count: 47 },
  { id: 2, name: "LinkedIn", count: 112 },
  { id: 3, name: "Groupon", count: 23 },
  { id: 4, name: "Twitter/X", count: 89 },
  { id: 5, name: "Substack", count: 34 },
];

type Phase = "idle" | "confirming" | "removing" | "done";

export default function UnsubscribeAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [removed, setRemoved] = useState<Set<number>>(new Set());
  const [counter, setCounter] = useState({ emails: 0, senders: 0 });

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const totalEmails = SENDERS.reduce((sum, s) => sum + s.count, 0);

    const run = () => {
      setPhase("idle");
      setRemoved(new Set());
      setCounter({ emails: 0, senders: 0 });

      t = setTimeout(() => setPhase("confirming"), 800);

      t = setTimeout(() => {
        setPhase("removing");
        SENDERS.forEach((sender, i) => {
          t = setTimeout(() => {
            setRemoved(prev => new Set([...prev, sender.id]));
            setCounter(prev => ({
              emails: prev.emails + sender.count,
              senders: prev.senders + 1,
            }));
          }, i * 350);
        });
      }, 1400);

      t = setTimeout(() => setPhase("done"), 1400 + SENDERS.length * 350 + 400);
      t = setTimeout(run, 1400 + SENDERS.length * 350 + 3000);
    };

    run();
    return () => clearTimeout(t);
  }, []);

  const totalEmails = SENDERS.reduce((sum, s) => sum + s.count, 0);

  return (
    <div className="w-[260px] h-[480px] bg-[#1a1a2e] rounded-[32px] border border-white/10 overflow-hidden shadow-2xl shadow-brand-purple/20 flex flex-col">
      {/* Phone status bar */}
      <div className="flex justify-between items-center px-5 pt-4 pb-2">
        <span className="text-white/40 text-[10px]">9:41</span>
        <div className="w-20 h-4 bg-black rounded-full" />
        <span className="text-white/40 text-[10px]">●●●</span>
      </div>

      {/* App header */}
      <div className="px-4 pb-3 border-b border-white/5">
        <p className="text-white font-bold text-sm">Senders</p>
        <p className="text-white/40 text-[10px]">305 emails from 5 senders</p>
      </div>

      {/* Sender rows */}
      <div className="flex-1 overflow-hidden px-3 pt-2 space-y-1">
        {SENDERS.map(sender => (
          <div
            key={sender.id}
            className={`flex items-center justify-between bg-white/5 rounded-lg px-3 py-2.5 transition-all duration-400 ${
              removed.has(sender.id) ? "opacity-0 translate-x-8 scale-95" : "opacity-100"
            }`}
          >
            <div>
              <p className={`text-[10px] font-semibold transition-all duration-200 ${
                removed.has(sender.id) ? "line-through text-red-400" : "text-white"
              }`}>
                {sender.name}
              </p>
              <p className="text-white/40 text-[9px]">{sender.count} emails</p>
            </div>
            {removed.has(sender.id) && (
              <span className="text-[8px] text-red-400 font-medium">Removed</span>
            )}
          </div>
        ))}
      </div>

      {/* Action / counter / done */}
      <div className="px-4 pb-6 pt-3 space-y-2">
        {phase === "done" ? (
          <div className="bg-brand-green/10 border border-brand-green/30 rounded-xl py-3 px-3">
            <p className="text-brand-green text-[10px] font-bold text-center">
              Deleted {counter.emails} emails
            </p>
            <p className="text-brand-green/70 text-[9px] text-center">
              Unsubscribed from {counter.senders} senders
            </p>
          </div>
        ) : (
          <>
            {phase === "removing" && (
              <div className="text-center">
                <p className="text-brand-green text-[10px] font-bold">
                  Deleted {counter.emails} emails
                </p>
                <p className="text-white/40 text-[9px]">
                  {counter.senders} of {SENDERS.length} senders removed
                </p>
              </div>
            )}
            <button
              className={`w-full py-3 rounded-xl text-[10px] font-bold transition-all duration-300 ${
                phase === "confirming"
                  ? "bg-red-500 text-white scale-105 shadow-lg shadow-red-500/30"
                  : phase === "removing"
                  ? "bg-red-500/50 text-white/70"
                  : "bg-white/5 text-white/30 cursor-default"
              }`}
            >
              Unsubscribe & Delete All
            </button>
          </>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Verify animation works**

Import temporarily into `src/app/page.tsx` and run `npm run dev`. Check:
- Sender list appears cleanly
- Button activates and turns red
- Rows slide out with strikethrough
- Counter increments as each sender is removed
- Done state shows total count
- Loop restarts

**Step 3: Commit**

```bash
git add src/components/UnsubscribeAnimation.tsx
git commit -m "feat: add mass unsubscribe and delete animation component"
```

---

## Task 6: Build the Hero section

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Create the Hero component**

```tsx
// src/components/Hero.tsx
import { Zap, ArrowRight } from "lucide-react";
import DeletionAnimation from "./DeletionAnimation";

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-brand-dark flex items-center overflow-hidden pt-20">
      {/* Glow background */}
      <div className="absolute inset-0 bg-hero-glow pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-purple/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text content */}
        <div>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/20 rounded-full px-4 py-1.5 mb-8">
            <span className="w-2 h-2 rounded-full bg-brand-green animate-pulse" />
            <span className="text-brand-green text-sm font-medium">Now available on Android</span>
          </div>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-white mb-6">
            Your inbox is<br />
            <span className="text-gradient-purple-green">a disaster.</span><br />
            Let&apos;s fix that.
          </h1>

          {/* Subhead */}
          <p className="text-lg text-white/60 max-w-md mb-10 leading-relaxed">
            Mass delete. Unsubscribe in bulk. Sort the chaos.
            Inbox Buster takes the job you&apos;ve been putting off
            and finishes it in minutes.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4">
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-brand-green text-gray-900 font-bold text-base px-6 py-3.5 rounded-full hover:brightness-110 transition-all shadow-lg shadow-brand-green/25"
            >
              Get 500 Emails Free
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#action"
              className="inline-flex items-center gap-2 border border-brand-purple/50 text-white font-semibold text-base px-6 py-3.5 rounded-full hover:bg-brand-purple/10 transition-all"
            >
              See how it works
            </a>
          </div>

          {/* Stripe Climate */}
          <div className="mt-10 flex items-center gap-2 text-white/30 text-sm">
            <span>🌱</span>
            <span>We contribute 1% of revenue to carbon removal via Stripe Climate</span>
          </div>
        </div>

        {/* Animation */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow behind phone */}
            <div className="absolute inset-0 bg-brand-purple/30 blur-3xl scale-75 rounded-full" />
            <div className="relative">
              <DeletionAnimation />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

Replace `src/app/page.tsx` with:

```tsx
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <main>
      <Hero />
    </main>
  );
}
```

**Step 3: Verify visually**

Run `npm run dev`. Check:
- Dark hero background with purple glow
- Gradient headline renders
- Both CTA buttons present
- Phone mockup with deletion animation visible on right (stacked on mobile)
- Stripe Climate note at bottom

**Step 4: Commit**

```bash
git add src/components/Hero.tsx src/app/page.tsx
git commit -m "feat: add hero section with deletion animation"
```

---

## Task 7: Build the Features Grid section

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/Features.tsx`

**Step 1: Create the Features component**

```tsx
// src/components/Features.tsx
import { LayoutGrid, Trash2, BellOff, FolderInput, BarChart2, Globe } from "lucide-react";

const features = [
  {
    icon: BarChart2,
    title: "Inbox Summary",
    description: "A clear breakdown of who's filling your inbox and exactly how bad it's got.",
  },
  {
    icon: LayoutGrid,
    title: "Smart Categorisation",
    description: "Automatically groups emails by type — newsletters, receipts, social, promotions.",
  },
  {
    icon: Trash2,
    title: "Mass Deletion",
    description: "Select a category and wipe hundreds of emails in one tap. Gone.",
  },
  {
    icon: BellOff,
    title: "Bulk Unsubscribe",
    description: "Unsubscribe from entire sender lists and delete their emails in one action.",
  },
  {
    icon: FolderInput,
    title: "Move & Archive",
    description: "Send emails to folders or archive in bulk — your structure, your rules.",
  },
  {
    icon: Globe,
    title: "Coming Soon: Web & iOS",
    description: "Already on Android. Browser and iPhone support is on the way.",
    comingSoon: true,
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Everything your inbox needs.{" "}
            <span className="text-brand-purple">Nothing it doesn&apos;t.</span>
          </h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Built for the people who&apos;ve been putting off inbox cleanup for months. Or years.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group relative p-6 rounded-2xl border transition-all duration-200 hover:border-brand-purple/40 hover:shadow-lg hover:shadow-brand-purple/5 ${
                  feature.comingSoon
                    ? "border-dashed border-gray-200 bg-gray-50"
                    : "border-gray-100 bg-white"
                }`}
              >
                {feature.comingSoon && (
                  <span className="absolute top-4 right-4 text-[10px] font-bold text-brand-purple bg-brand-light px-2 py-0.5 rounded-full">
                    Coming Soon
                  </span>
                )}
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center mb-4 group-hover:bg-brand-green/20 transition-colors">
                  <Icon className="w-5 h-5 text-brand-green" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

```tsx
import Features from "@/components/Features";

// Inside <main>:
<Hero />
<Features />
```

**Step 3: Verify visually**

Run `npm run dev`. Check:
- White background section with purple accent in headline
- 3-column grid (desktop), 1-column (mobile)
- Green icon containers
- "Coming Soon" card has dashed border and badge
- Hover state adds purple border glow

**Step 4: Commit**

```bash
git add src/components/Features.tsx src/app/page.tsx
git commit -m "feat: add features grid section"
```

---

## Task 8: Build the "See It In Action" section

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/InAction.tsx`

**Step 1: Create the InAction component**

```tsx
// src/components/InAction.tsx
import DeletionAnimation from "./DeletionAnimation";
import UnsubscribeAnimation from "./UnsubscribeAnimation";

export default function InAction() {
  return (
    <section id="action" className="bg-brand-dark py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            Watch the clutter{" "}
            <span className="text-brand-green">disappear.</span>
          </h2>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Two taps. Hundreds of emails. Gone.
          </p>
        </div>

        {/* Two phone mockups */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center justify-items-center">
          {/* Deletion */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-brand-purple/20 blur-3xl scale-75 rounded-full" />
              <div className="relative">
                <DeletionAnimation />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">Mass Deletion</p>
              <p className="text-white/40 text-sm mt-1">Select a category. One tap. Done.</p>
            </div>
          </div>

          {/* Unsubscribe */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-red-500/20 blur-3xl scale-75 rounded-full" />
              <div className="relative">
                <UnsubscribeAnimation />
              </div>
            </div>
            <div className="text-center">
              <p className="text-white font-bold text-lg">Unsubscribe & Delete</p>
              <p className="text-white/40 text-sm mt-1">Cuts the sender off and cleans up after them.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

```tsx
import InAction from "@/components/InAction";

<Hero />
<Features />
<InAction />
```

**Step 3: Verify visually**

Run `npm run dev`. Check:
- Dark section with two phone mockups side by side (desktop), stacked (mobile)
- Both animations running independently
- Labels below each mockup
- Glow effects behind each phone (purple/red)

**Step 4: Commit**

```bash
git add src/components/InAction.tsx src/app/page.tsx
git commit -m "feat: add see it in action section with dual animations"
```

---

## Task 9: Build the Pricing section

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/Pricing.tsx`

**Step 1: Create the Pricing component**

```tsx
// src/components/Pricing.tsx
import { Check, ArrowRight } from "lucide-react";

const plans = [
  {
    name: "Free Trial",
    badge: "Start here",
    badgeColor: "bg-gray-100 text-gray-600",
    price: "Free",
    period: null,
    description: "Clear your first 500 emails. No card required.",
    features: [
      "500 email clean-up",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
    ],
    cta: "Download Free",
    ctaStyle: "bg-brand-green text-gray-900",
    cardStyle: "border-gray-200 bg-white",
    highlight: false,
  },
  {
    name: "Monthly",
    badge: "Most Popular",
    badgeColor: "bg-brand-purple text-white",
    price: "£X",
    period: "/ month",
    description: "Full access. Cancel anytime.",
    features: [
      "Unlimited emails",
      "All features included",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Start Monthly",
    ctaStyle: "bg-brand-purple text-white",
    cardStyle: "border-brand-purple bg-white shadow-xl shadow-brand-purple/10",
    highlight: true,
  },
  {
    name: "Annual",
    badge: "Best value",
    badgeColor: "bg-brand-green/10 text-brand-green",
    price: "£X",
    period: "/ year",
    description: "Save X% compared to monthly.",
    features: [
      "Unlimited emails",
      "All features included",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Go Annual",
    ctaStyle: "border-2 border-brand-purple text-brand-purple bg-transparent",
    cardStyle: "border-gray-200 bg-white",
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-brand-light py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Simple pricing.{" "}
            <span className="text-brand-purple">No surprises.</span>
          </h2>
          <p className="text-gray-500 text-lg">Start free. Upgrade when you&apos;re ready.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-2xl border p-6 flex flex-col gap-6 ${plan.cardStyle} ${
                plan.highlight ? "md:-mt-4 md:mb-4" : ""
              }`}
            >
              {/* Badge */}
              <span className={`self-start text-xs font-bold px-3 py-1 rounded-full ${plan.badgeColor}`}>
                {plan.badge}
              </span>

              {/* Price */}
              <div>
                <p className="text-gray-500 text-sm font-medium mb-1">{plan.name}</p>
                <div className="flex items-end gap-1">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  {plan.period && (
                    <span className="text-gray-400 text-sm mb-1">{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mt-2">{plan.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-brand-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#"
                className={`inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-sm transition-all hover:brightness-110 ${plan.ctaStyle}`}
              >
                {plan.cta}
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>

        {/* Stripe Climate */}
        <div className="mt-12 flex items-center justify-center gap-2 text-gray-400 text-sm">
          <span>🌱</span>
          <span>1% of every subscription goes to carbon removal via{" "}
            <a href="https://stripe.com/climate" className="text-brand-purple underline underline-offset-2 hover:text-brand-purple/80">
              Stripe Climate
            </a>
          </span>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

```tsx
import Pricing from "@/components/Pricing";
<InAction />
<Pricing />
```

**Step 3: Verify visually**

Run `npm run dev`. Check:
- Three cards side by side (desktop), stacked (mobile)
- Monthly card slightly elevated and highlighted
- All checkmarks in green
- Stripe Climate callout present
- Purple pricing section background

**Step 4: Commit**

```bash
git add src/components/Pricing.tsx src/app/page.tsx
git commit -m "feat: add pricing section with three-tier plans"
```

---

## Task 10: Build the Social Proof (Testimonials Marquee) section

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/SocialProof.tsx`

**Step 1: Create the component**

```tsx
// src/components/SocialProof.tsx
const testimonials = [
  {
    quote: "I had 12,000 unread emails. Inbox Buster cleared 9,000 of them in under 10 minutes.",
    author: "Alex T.",
    role: "Android user",
  },
  {
    quote: "The bulk unsubscribe alone is worth it. I don't know why every email client doesn't do this.",
    author: "Sarah M.",
    role: "Verified user",
  },
  {
    quote: "Finally deleted every Groupon email from 2019. I feel free.",
    author: "James R.",
    role: "Android user",
  },
  {
    quote: "My inbox went from 4,200 unread to zero. Inbox Buster did in 5 minutes what I'd been avoiding for 3 years.",
    author: "Priya K.",
    role: "Early access user",
  },
];

// Double for seamless loop
const all = [...testimonials, ...testimonials];

export default function SocialProof() {
  return (
    <section className="bg-brand-dark py-24 overflow-hidden">
      <div className="text-center mb-12 px-6">
        <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
          People are clearing{" "}
          <span className="text-brand-green">the clutter.</span>
        </h2>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-brand-dark to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-brand-dark to-transparent z-10 pointer-events-none" />

        <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]" style={{ width: "max-content" }}>
          {all.map((t, i) => (
            <div
              key={i}
              className="w-72 flex-shrink-0 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-1">
                {[...Array(5)].map((_, si) => (
                  <span key={si} className="text-brand-green text-sm">★</span>
                ))}
              </div>
              <p className="text-white/80 text-sm leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-white font-semibold text-sm">{t.author}</p>
                <p className="text-white/40 text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Add to page.tsx**

```tsx
import SocialProof from "@/components/SocialProof";
<Pricing />
<SocialProof />
```

**Step 3: Verify visually**

Run `npm run dev`. Check:
- Marquee scrolls left continuously
- Pauses on hover
- Fade-out edges on left and right
- Cards show stars, quote, author

**Step 4: Commit**

```bash
git add src/components/SocialProof.tsx src/app/page.tsx
git commit -m "feat: add social proof marquee section"
```

---

## Task 11: Build the Footer CTA and Footer

> **REQUIRED:** Invoke the **frontend-design** skill before writing any component code in this task.

**Files:**
- Create: `src/components/FooterCTA.tsx`
- Create: `src/components/Footer.tsx`

**Step 1: Create FooterCTA**

```tsx
// src/components/FooterCTA.tsx
import { ArrowRight } from "lucide-react";

export default function FooterCTA() {
  return (
    <section className="bg-white py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <div className="bg-gradient-to-br from-brand-purple to-brand-green p-px rounded-3xl">
          <div className="bg-white rounded-3xl px-8 py-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">
              Your inbox won&apos;t{" "}
              <span className="text-gradient-purple-green">clean itself.</span>
            </h2>
            <p className="text-gray-500 text-lg mb-8">
              Start with 500 emails free. No card required.
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2 bg-brand-green text-gray-900 font-bold text-lg px-8 py-4 rounded-full hover:brightness-110 transition-all shadow-lg shadow-brand-green/25"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Create Footer**

```tsx
// src/components/Footer.tsx
import { Zap } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-brand-dark border-t border-white/5 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Top row */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-8 border-b border-white/5">
          {/* Wordmark */}
          <div className="flex items-center gap-2">
            <Zap className="text-brand-green w-5 h-5" fill="currentColor" />
            <span className="font-black text-lg tracking-tight">
              <span className="text-white">INBOX</span>
              <span className="text-brand-green">BUSTER</span>
            </span>
          </div>

          {/* Nav links */}
          <div className="flex flex-wrap gap-6 text-sm text-white/40">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
          </div>

          {/* Platform */}
          <div className="text-right">
            <p className="text-white/60 text-sm font-medium">Available on Android</p>
            <p className="text-white/30 text-xs mt-0.5">iOS & Web coming soon</p>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">
          <div className="flex items-center gap-2 text-white/30 text-sm">
            <span>🌱</span>
            <span>Stripe Climate member — 1% to carbon removal</span>
          </div>
          <p className="text-white/20 text-sm">
            © {new Date().getFullYear()} Inbox Buster. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Step 3: Add to page.tsx**

```tsx
import FooterCTA from "@/components/FooterCTA";
import Footer from "@/components/Footer";

<SocialProof />
<FooterCTA />
<Footer />
```

**Step 4: Verify visually**

Run `npm run dev`. Check:
- Gradient-bordered CTA card with green CTA button
- Footer shows wordmark, nav links, platform info
- Stripe Climate note and copyright at bottom

**Step 5: Commit**

```bash
git add src/components/FooterCTA.tsx src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: add footer CTA section and footer"
```

---

## Task 12: Final polish and responsive check

**Files:**
- Modify: `src/app/layout.tsx` (meta tags)
- Review: all components for mobile layout

**Step 1: Update metadata in layout.tsx**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inbox Buster — Clean Your Inbox in Minutes",
  description:
    "Mass delete emails, bulk unsubscribe, and sort your inbox chaos. Inbox Buster for Android. Start free — clear 500 emails with no card required.",
};
```

**Step 2: Test mobile responsiveness**

In browser DevTools, test at:
- 375px (iPhone SE)
- 390px (iPhone 14)
- 768px (tablet)
- 1280px (desktop)

Check each section stacks correctly and no overflow occurs.

**Step 3: Verify build is clean**

```bash
npm run build
```

Expected: Zero errors, zero warnings.

**Step 4: Final commit**

```bash
git add -A
git commit -m "feat: add meta tags and confirm responsive layout"
```

---

## Completion Checklist

- [ ] Next.js project scaffolded and running
- [ ] Design tokens in Tailwind config
- [ ] Navbar fixed and working
- [ ] Hero with deletion animation
- [ ] Features grid (6 cards)
- [ ] See It In Action section (2 animated mockups)
- [ ] Pricing section (3 tiers + Stripe Climate)
- [ ] Social proof marquee
- [ ] Footer CTA + Footer
- [ ] Metadata set
- [ ] Mobile responsive
- [ ] `npm run build` passing clean
