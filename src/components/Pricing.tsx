"use client";

import React from "react";
import Link from "next/link";
import { Check } from "lucide-react";

type BadgeStyle = "gray" | "purple" | "green" | "amber";
type CtaStyle = "green" | "purple" | "outline" | "amber";
type CardVariant = "standard" | "pwyw" | "bmc";

interface Plan {
  id: string;
  badge: string;
  badgeStyle: BadgeStyle;
  price: string;
  period: string | null;
  description: string;
  features: string[];
  cta: string;
  ctaHref: string;
  ctaStyle: CtaStyle;
  hero: boolean;
  variant: CardVariant;
}

const PLANS: Plan[] = [
  {
    id: "free",
    badge: "Start here",
    badgeStyle: "gray",
    price: "Free",
    period: null,
    description: "Clean your first 1,000 emails every month. No card required.",
    features: [
      "1,000 emails per month",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
    ],
    cta: "Join the Waiting List",
    ctaHref: "/waitlist",
    ctaStyle: "green",
    hero: false,
    variant: "standard",
  },
  {
    id: "premium",
    badge: "Own it forever",
    badgeStyle: "purple",
    price: "",
    period: "one-off",
    description:
      "Pay what you feel is fair. Unlock unlimited emails forever. One payment, no renewals, no expiry.",
    features: [
      "Unlimited emails",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
      "Your price. Your call.",
    ],
    cta: "Join the Waiting List",
    // At launch: swap to "https://app.inboxbuster.com/upgrade?amount={amount}" - see backend handover doc
    ctaHref: "/waitlist",
    ctaStyle: "purple",
    hero: true,
    variant: "pwyw",
  },
  {
    id: "premium-support",
    badge: "Premium + Support",
    badgeStyle: "green",
    price: "£2.50",
    period: "/mo",
    description:
      "Get Premium first, then add support ticket access for £2.50/mo. Cancel anytime. Your premium status stays.",
    features: [
      "Unlimited emails",
      "Smart categorisation",
      "Mass deletion",
      "Bulk unsubscribe",
      "Support ticket access",
    ],
    cta: "Join the Waiting List",
    // At launch: swap to "https://app.inboxbuster.com/upgrade?plan=subscription"
    ctaHref: "/waitlist",
    ctaStyle: "outline",
    hero: false,
    variant: "standard",
  },
  {
    id: "bmc",
    badge: "Buy me a coffee",
    badgeStyle: "amber",
    price: "☕",
    period: null,
    description:
      "No account needed. No app changes. Just a thank you if Inbox Buster saves you time.",
    features: [
      "Any amount, any time",
      "No strings attached",
      "Means a lot to an indie dev",
    ],
    cta: "Buy me a coffee",
    ctaHref: "https://buymeacoffee.com/tonextlevel",
    ctaStyle: "amber",
    hero: false,
    variant: "bmc",
  },
];

function Badge({ style, label }: { style: BadgeStyle; label: string }) {
  const classes: Record<BadgeStyle, string> = {
    gray: "bg-white/10 text-white/60",
    purple: "bg-brand-purple text-white",
    green: "bg-brand-green/15 text-brand-green",
    amber: "bg-amber-500/15 text-amber-400",
  };

  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-[0.15em] ${classes[style]}`}
    >
      {label}
    </span>
  );
}

function CtaButton({
  style,
  label,
  href,
}: {
  style: CtaStyle;
  label: string;
  href: string;
}) {
  const base =
    "block w-full rounded-xl py-3.5 text-center text-sm font-black uppercase tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-purple focus-visible:ring-offset-2";
  const isExternal = href.startsWith("http");
  const externalProps = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  const Wrapper = ({
    className,
    style: inlineStyle,
    children,
  }: {
    className: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
  }) =>
    isExternal ? (
      <a href={href} {...externalProps} className={className} style={inlineStyle}>
        {children}
      </a>
    ) : (
      <Link href={href} className={className} style={inlineStyle}>
        {children}
      </Link>
    );

  if (style === "green") {
    return (
      <Wrapper
        className={`${base} bg-brand-green text-brand-dark hover:brightness-110 hover:scale-[1.02] active:scale-100`}
        style={{ boxShadow: "0 4px 18px rgba(74,222,128,0.25)" }}
      >
        {label}
      </Wrapper>
    );
  }

  if (style === "purple") {
    return (
      <Wrapper
        className={`${base} bg-brand-purple text-white hover:brightness-110 hover:scale-[1.02] active:scale-100`}
        style={{ boxShadow: "0 4px 18px rgba(139,92,246,0.30)" }}
      >
        {label}
      </Wrapper>
    );
  }

  if (style === "amber") {
    return (
      <Wrapper
        className={`${base} bg-amber-500 text-white hover:brightness-110 hover:scale-[1.02] active:scale-100`}
        style={{ boxShadow: "0 4px 18px rgba(245,158,11,0.25)" }}
      >
        {label}
      </Wrapper>
    );
  }

  return (
    <Wrapper
      className={`${base} border-2 border-brand-purple bg-transparent text-brand-purple hover:bg-brand-purple/8 hover:scale-[1.02] active:scale-100`}
    >
      {label}
    </Wrapper>
  );
}

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <div
      className={[
        "pricing-card relative flex flex-col rounded-2xl p-7",
        plan.hero
          ? "lg:-mt-4 lg:mb-4 border-2 border-brand-purple"
          : "border border-white/8",
      ].join(" ")}
      style={{
        background: plan.hero
          ? "rgba(139,92,246,0.10)"
          : "rgba(255,255,255,0.04)",
        animationDelay: `${index * 100}ms`,
        boxShadow: plan.hero
          ? "0 20px 60px rgba(139,92,246,0.20), 0 0 0 1px rgba(139,92,246,0.15)"
          : "none",
      }}
    >
      <div className="mb-5">
        <Badge style={plan.badgeStyle} label={plan.badge} />
      </div>

      {plan.variant === "pwyw" ? (
        // Pre-launch: show static copy. At launch, restore the amount input here -
        // see docs/plans/pwyw-backend-handover.md for the full launch checklist.
        <div className="mb-2 flex flex-col gap-1">
          <span
            className="font-black tracking-tight text-white"
            style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)", lineHeight: 1.15 }}
          >
            You choose
          </span>
          <span className="text-sm font-medium text-white/40">one-off</span>
        </div>
      ) : (
        <div className="mb-2 flex items-baseline gap-1">
          <span
            className="font-black tracking-tight text-white"
            style={{
              fontSize: "clamp(2rem, 4vw, 2.75rem)",
              lineHeight: 1,
              whiteSpace: "pre-line",
            }}
          >
            {plan.price}
          </span>
          {plan.period && (
            <span className="text-sm font-medium text-white/40">{plan.period}</span>
          )}
        </div>
      )}

      <p className="mb-6 text-sm leading-relaxed text-white/55">{plan.description}</p>

      <div
        className="mb-6 h-px w-full"
        style={{
          background: plan.hero
            ? "linear-gradient(90deg, rgba(139,92,246,0.18) 0%, rgba(139,92,246,0.04) 100%)"
            : "rgba(255,255,255,0.06)",
        }}
      />

      <ul className="mb-8 flex flex-col gap-3">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-center gap-3">
            <span
              className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                plan.badgeStyle === "amber"
                  ? "bg-amber-500/12"
                  : "bg-brand-green/12"
              }`}
            >
              <Check
                size={11}
                strokeWidth={3}
                className={
                  plan.badgeStyle === "amber" ? "text-amber-400" : "text-brand-green"
                }
                aria-hidden="true"
              />
            </span>
            <span className="text-sm font-medium text-white/75">{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto">
        <CtaButton style={plan.ctaStyle} label={plan.cta} href={plan.ctaHref} />
      </div>
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden py-24 lg:py-32 bg-brand-dark"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="pricing-header mx-auto mb-14 max-w-xl text-center"
          style={{ animationDelay: "0ms" }}
        >
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-purple">
            Pricing
          </p>

          <h2
            className="mb-4 font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}
          >
            Simple pricing.{" "}
            <span className="text-brand-purple">No surprises.</span>
          </h2>

          <p className="text-base leading-relaxed text-white/50">
            Start free. Upgrade when you&rsquo;re ready.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4 md:items-start">
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} />
          ))}
        </div>

        <div
          className="pricing-callout mx-auto mt-14 max-w-2xl rounded-2xl border border-brand-green/12 px-4 sm:px-8 py-7"
          style={{
            background: "rgba(74,222,128,0.04)",
            borderLeft: "4px solid rgba(74,222,128,0.5)",
            animationDelay: "400ms",
          }}
        >
          <p className="mb-1 text-base font-bold leading-relaxed text-white">
            Honest pricing. No surprises.
          </p>
          <p className="text-sm leading-relaxed text-white/70">
            Pay what you feel is fair to unlock unlimited emails, permanently. One payment,
            no renewals, no expiry. The £2.50/month add-on gives you support ticket access.
            Cancel anytime. Your premium status stays.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/55">
            No investor pressure. No upsell traps. We&rsquo;ll always be transparent about
            how your money is used.
          </p>

          <p className="mt-4 text-sm leading-relaxed text-white/55">
            🌱 1% of every payment goes to carbon removal via{" "}
            <a
              href="https://stripe.com/climate"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-white/70 underline underline-offset-2 decoration-white/20 transition-colors hover:text-brand-purple hover:decoration-brand-purple/40"
            >
              Stripe Climate
            </a>
            . As we grow, that percentage goes up, and we&rsquo;ll announce every increase
            publicly.
          </p>
        </div>
      </div>
    </section>
  );
}
