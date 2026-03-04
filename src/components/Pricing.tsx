"use client";

import Link from "next/link";
import { Check } from "lucide-react";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Plan {
  id: string;
  badge: string;
  badgeStyle: "gray" | "purple" | "green";
  price: string;
  period: string | null;
  description: string;
  features: string[];
  cta: string;
  ctaStyle: "green" | "purple" | "outline";
  hero: boolean;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const PLANS: Plan[] = [
  {
    id: "free",
    badge: "Start here",
    badgeStyle: "gray",
    price: "Free",
    period: null,
    description: "Clear your first 500 emails. No card required.",
    features: [
      "500 email clean-up",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
    ],
    cta: "Join the Waitlist →",
    ctaStyle: "green",
    hero: false,
  },
  {
    id: "monthly",
    badge: "Most Popular",
    badgeStyle: "purple",
    price: "£X",
    period: "/ month",
    description: "Full access. Cancel anytime.",
    features: [
      "Unlimited emails",
      "All features included",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Join the Waitlist →",
    ctaStyle: "purple",
    hero: true,
  },
  {
    id: "annual",
    badge: "Best value",
    badgeStyle: "green",
    price: "£XX",
    period: "/ year",
    description: "Save compared to monthly.",
    features: [
      "Unlimited emails",
      "All features included",
      "Priority support",
      "Early access to new features",
    ],
    cta: "Join the Waitlist →",
    ctaStyle: "outline",
    hero: false,
  },
];

/* ─── Badge ──────────────────────────────────────────────────────────────── */

function Badge({ style, label }: { style: Plan["badgeStyle"]; label: string }) {
  const classes: Record<Plan["badgeStyle"], string> = {
    gray: "bg-white/10 text-white/60",
    purple: "bg-brand-purple text-white",
    green: "bg-brand-green/15 text-brand-green",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${classes[style]}`}
    >
      {label}
    </span>
  );
}

/* ─── CTA Button ─────────────────────────────────────────────────────────── */

function CtaButton({
  style,
  label,
}: {
  style: Plan["ctaStyle"];
  label: string;
}) {
  const base =
    "block w-full rounded-xl py-3.5 text-center text-sm font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2";

  if (style === "green") {
    return (
      <Link
        href="/waitlist"
        className={`${base} bg-brand-green text-brand-dark hover:brightness-110 hover:scale-[1.02] active:scale-100`}
        style={{ boxShadow: "0 4px 18px rgba(74,222,128,0.25)" }}
      >
        {label}
      </Link>
    );
  }

  if (style === "purple") {
    return (
      <Link
        href="/waitlist"
        className={`${base} bg-brand-purple text-white hover:brightness-110 hover:scale-[1.02] active:scale-100`}
        style={{ boxShadow: "0 4px 18px rgba(139,92,246,0.30)" }}
      >
        {label}
      </Link>
    );
  }

  // outline
  return (
    <Link
      href="/waitlist"
      className={`${base} border-2 border-brand-purple bg-transparent text-brand-purple hover:bg-brand-purple/8 hover:scale-[1.02] active:scale-100`}
    >
      {label}
    </Link>
  );
}

/* ─── Pricing Card ───────────────────────────────────────────────────────── */

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <div
      className={[
        "pricing-card relative flex flex-col rounded-2xl p-7",
        plan.hero
          ? "md:-mt-4 md:mb-4 border-2 border-brand-purple"
          : "border border-white/8",
      ].join(" ")}
      style={{
        background: plan.hero ? "rgba(139,92,246,0.10)" : "rgba(255,255,255,0.04)",
        animationDelay: `${index * 100}ms`,
        boxShadow: plan.hero
          ? "0 20px 60px rgba(139,92,246,0.20), 0 0 0 1px rgba(139,92,246,0.15)"
          : "none",
      }}
    >
      {/* Badge */}
      <div className="mb-5">
        <Badge style={plan.badgeStyle} label={plan.badge} />
      </div>

      {/* Price row */}
      <div className="mb-2 flex items-baseline gap-1">
        <span
          className="font-black tracking-tight text-white"
          style={{ fontSize: "clamp(2rem, 4vw, 2.75rem)", lineHeight: 1 }}
        >
          {plan.price}
        </span>
        {plan.period && (
          <span className="text-sm font-medium text-white/40">{plan.period}</span>
        )}
      </div>

      {/* Description */}
      <p className="mb-6 text-sm leading-relaxed text-white/55">
        {plan.description}
      </p>

      {/* Divider */}
      <div
        className="mb-6 h-px w-full"
        style={{
          background: plan.hero
            ? "linear-gradient(90deg, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.04) 100%)"
            : "rgba(0,0,0,0.06)",
        }}
      />

      {/* Feature list */}
      <ul className="mb-8 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-green/12">
              <Check
                size={11}
                strokeWidth={3}
                className="text-brand-green"
                aria-hidden="true"
              />
            </span>
            <span className="text-sm font-medium text-white/75">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA — pinned to bottom */}
      <div className="mt-auto">
        <CtaButton style={plan.ctaStyle} label={plan.cta} />
      </div>
    </div>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "#1A1035" }}
    >
      {/* ── Top edge — gradient bridge from the dark InAction section above ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.30) 35%, rgba(74,222,128,0.15) 65%, transparent 100%)",
        }}
      />

      {/* ── Ambient purple radial bloom — top centre ──────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0"
        style={{
          height: "50%",
          background:
            "radial-gradient(ellipse 70% 55% at 50% 0%, rgba(139,92,246,0.07) 0%, transparent 70%)",
        }}
      />

      {/* ── Very faint dot-grid texture ──────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(139,92,246,0.09) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 40%, black 0%, transparent 80%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <div
          className="pricing-header mx-auto mb-14 max-w-xl text-center"
          style={{ animationDelay: "0ms" }}
        >
          {/* Eyebrow */}
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-purple">
            Pricing
          </p>

          {/* Headline */}
          <h2
            className="mb-4 font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}
          >
            Simple pricing.{" "}
            <span className="text-brand-purple">No surprises.</span>
          </h2>

          {/* Subheadline */}
          <p className="text-base leading-relaxed text-white/50">
            Start free. Upgrade when you&rsquo;re ready.
          </p>
        </div>

        {/* ── Cards grid ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        {/* ── Stripe Climate callout ────────────────────────────────────── */}
        <p
          className="pricing-callout mx-auto mt-12 max-w-md text-center text-sm leading-relaxed text-white/40"
          style={{ animationDelay: "350ms" }}
        >
          🌱 1% of every subscription goes to carbon removal via{" "}
          <a
            href="https://stripe.com/climate"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-white/55 underline underline-offset-2 decoration-white/20 transition-colors hover:text-brand-purple hover:decoration-brand-purple/40"
          >
            Stripe Climate
          </a>
          .
        </p>
      </div>

      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes pricingFadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .pricing-header {
          animation: pricingFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .pricing-card {
          animation: pricingFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .pricing-callout {
          animation: pricingFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        /* Standard card hover — subtle lift + purple border hint */
        .pricing-card:hover {
          transform: translateY(-3px);
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.2s ease;
        }
      `}</style>
    </section>
  );
}
