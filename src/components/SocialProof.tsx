"use client";

/* ─── Types ──────────────────────────────────────────────────────────────── */

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
}

/* ─── Data ───────────────────────────────────────────────────────────────── */

const TESTIMONIALS: Testimonial[] = [
  {
    id: "alex",
    quote:
      "I had 12,000 unread emails. Inbox Buster cleared 9,000 of them in under 10 minutes.",
    author: "Alex T.",
    role: "Android user",
  },
  {
    id: "sarah",
    quote:
      "The bulk unsubscribe alone is worth it. I don't know why every email client doesn't do this.",
    author: "Sarah M.",
    role: "Verified user",
  },
  {
    id: "james",
    quote:
      "Finally deleted every Groupon email from 2019. I feel free.",
    author: "James R.",
    role: "Android user",
  },
  {
    id: "priya",
    quote:
      "My inbox went from 4,200 unread to zero. Inbox Buster did in 5 minutes what I'd been avoiding for 3 years.",
    author: "Priya K.",
    role: "Early access user",
  },
];

/* Double the array for a seamless loop */
const LOOP_ITEMS = [...TESTIMONIALS, ...TESTIMONIALS];

/* ─── Stars ──────────────────────────────────────────────────────────────── */

function Stars() {
  return (
    <div className="mb-4 flex items-center gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M7 1L8.545 5.09H13L9.59 7.545L10.91 12L7 9.36L3.09 12L4.41 7.545L1 5.09H5.455L7 1Z"
            fill="#4ADE80"
            stroke="#4ADE80"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      ))}
    </div>
  );
}

/* ─── Card ───────────────────────────────────────────────────────────────── */

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <article
      className="testimonial-card relative flex min-w-80 w-80 flex-col rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
      style={{
        boxShadow:
          "0 4px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.06)",
      }}
    >
      {/* Subtle inner glow — top edge */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-2xl"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(74,222,128,0.20) 40%, rgba(139,92,246,0.20) 70%, transparent 100%)",
        }}
      />

      <Stars />

      <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-white/75">
        &ldquo;{item.quote}&rdquo;
      </blockquote>

      <footer className="mt-auto">
        <p className="text-sm font-black text-white">{item.author}</p>
        <p className="mt-0.5 text-xs text-white/40">{item.role}</p>
      </footer>
    </article>
  );
}

/* ─── Section ────────────────────────────────────────────────────────────── */

export default function SocialProof() {
  return (
    <section
      id="social-proof"
      className="relative overflow-hidden py-24 lg:py-32"
      style={{ background: "#0F0A1E" }}
    >
      {/* ── Top edge — gradient bridge from the light Pricing section above ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.35) 35%, rgba(74,222,128,0.15) 65%, transparent 100%)",
        }}
      />

      {/* ── Ambient purple bloom — upper-left ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "-20%",
          left: "-10%",
          width: "55vw",
          height: "55vw",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.14) 0%, rgba(139,92,246,0.04) 50%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* ── Green accent bloom — lower-right ──────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-15%",
          right: "-5%",
          width: "35vw",
          height: "35vw",
          background:
            "radial-gradient(ellipse at center, rgba(74,222,128,0.08) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      {/* ── Subtle grid texture ───────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 80%)",
        }}
      />

      {/* ── Header ────────────────────────────────────────────────────────── */}
      <div className="sp-header relative mx-auto mb-14 max-w-xl px-6 text-center">
        {/* Eyebrow */}
        <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-purple">
          Social Proof
        </p>

        {/* Headline */}
        <h2
          className="font-black leading-[1.05] tracking-tight text-white"
          style={{ fontSize: "clamp(1.9rem, 4.5vw, 3rem)" }}
        >
          People are clearing{" "}
          <span className="text-brand-green">the clutter.</span>
        </h2>
      </div>

      {/* ── Marquee ───────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden">
        {/* Fade — left edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32"
          style={{
            background:
              "linear-gradient(to right, #0F0A1E 0%, transparent 100%)",
          }}
        />

        {/* Fade — right edge */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32"
          style={{
            background:
              "linear-gradient(to left, #0F0A1E 0%, transparent 100%)",
          }}
        />

        {/* Scrolling strip */}
        <div
          className="marquee-strip flex gap-6 py-4"
          style={{ width: "max-content" }}
        >
          {LOOP_ITEMS.map((item, index) => (
            <TestimonialCard key={`${item.id}-${index}`} item={item} />
          ))}
        </div>
      </div>

      {/* ── Keyframes ─────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        @keyframes spFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .sp-header {
          animation: spFadeUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .marquee-strip {
          animation: marquee 30s linear infinite;
        }

        .marquee-strip:hover {
          animation-play-state: paused;
        }

        /* Card hover — lift + sharper border glow */
        .testimonial-card {
          transition: transform 0.2s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.2s ease,
                      border-color 0.2s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-4px);
          border-color: rgba(74, 222, 128, 0.25);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35),
                      0 0 0 1px rgba(74, 222, 128, 0.12),
                      inset 0 1px 0 rgba(255, 255, 255, 0.08);
        }
      `}</style>
    </section>
  );
}
