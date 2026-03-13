"use client";

import UnsubscribeAnimation from "@/components/UnsubscribeAnimation";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-brand-dark pt-20"
      aria-label="Hero"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          top: "-10%",
          left: "-15%",
          width: "70vw",
          height: "70vw",
          background:
            "radial-gradient(ellipse at center, rgba(139,92,246,0.22) 0%, rgba(139,92,246,0.06) 45%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute"
        style={{
          bottom: "-5%",
          right: "-10%",
          width: "40vw",
          height: "40vw",
          background:
            "radial-gradient(ellipse at center, rgba(74,222,128,0.10) 0%, transparent 65%)",
          filter: "blur(1px)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
          maskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 0%, black 0%, transparent 75%)",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl flex-col items-center px-6 pb-16 lg:flex-row lg:items-center lg:gap-12 lg:px-8">
        <div className="flex flex-col items-start pt-12 lg:pt-0 lg:w-[55%]">
          <div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-green/25 bg-brand-green/10 px-4 py-1.5"
            style={{
              animation: "fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "0ms",
            }}
          >
            <span className="relative flex h-2 w-2 shrink-0">
              <span
                className="absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"
                style={{ animation: "ping 1.4s cubic-bezier(0,0,0.2,1) infinite" }}
              />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            <span className="text-xs font-bold uppercase tracking-widest text-brand-green">
              Available on Android, iOS & Web soon
            </span>
          </div>

          <h1
            className="mb-6 font-black leading-[1.0] tracking-tight"
            style={{
              fontSize: "clamp(2.75rem, 6.5vw, 5.25rem)",
              animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "80ms",
            }}
          >
            <span className="block text-white">Your inbox is</span>
            <span
              className="block"
              style={{
                background: "linear-gradient(110deg, #8B5CF6 10%, #4ADE80 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              a disaster.
            </span>
            <span className="block text-white">Let&apos;s fix that.</span>
          </h1>

          <p
            className="mb-10 max-w-[520px] text-base leading-relaxed text-white/60 lg:text-lg"
            style={{
              animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "160ms",
            }}
          >
            Mass delete. Unsubscribe in bulk. Sort the chaos. Inbox Buster takes
            the job you&apos;ve been putting off and finishes it in minutes.
          </p>

          <div
            className="mb-8 flex flex-wrap items-center gap-4"
            style={{
              animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "240ms",
            }}
          >
            <a
              href="/waitlist"
              className="inline-flex items-center rounded-full bg-brand-green px-7 py-3.5 text-sm font-black uppercase tracking-wider text-brand-dark transition-all duration-200 hover:brightness-110 hover:scale-105 active:scale-100"
              style={{
                boxShadow:
                  "0 0 0 1px rgba(74,222,128,0.3), 0 8px 32px rgba(74,222,128,0.30)",
              }}
            >
              Join the Waiting List&nbsp;&rarr;
            </a>

            <a
              href="#action"
              className="inline-flex items-center rounded-full border border-brand-purple/60 px-7 py-3.5 text-sm font-bold uppercase tracking-wider text-white/80 transition-all duration-200 hover:border-brand-purple hover:text-white hover:bg-brand-purple/10"
            >
              See how it works
            </a>
          </div>

          <div
            className="mb-6 flex flex-col gap-3"
            style={{
              animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "320ms",
            }}
          >
            <p className="text-sm text-white/50">
              ✉️ Free trial includes{" "}
              <span className="font-semibold text-white/75">500 emails</span>.
              No card required.
            </p>

            <div
              className="inline-flex items-center gap-2 self-start rounded-full border px-4 py-2"
              style={{
                background: "rgba(139,92,246,0.12)",
                borderColor: "rgba(139,92,246,0.35)",
              }}
            >
              <span>🎁</span>
              <span className="text-xs font-bold text-brand-purple">
                First 100 sign-ups get their first year free
              </span>
            </div>
          </div>

          <p
            className="text-xs text-white/30"
            style={{
              animation: "fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) both",
              animationDelay: "400ms",
            }}
          >
            🌱 We contribute 1% of revenue to carbon removal via{" "}
            <span className="text-white/45">Stripe Climate</span>
          </p>
        </div>

        <div
          className="relative mt-16 flex w-full items-center justify-center lg:mt-0 lg:w-[45%]"
          style={{
            animation: "fadeUp 0.9s cubic-bezier(0.16,1,0.3,1) both",
            animationDelay: "200ms",
          }}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              width: 380,
              height: 380,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at center, rgba(139,92,246,0.35) 0%, rgba(139,92,246,0.12) 40%, transparent 72%)",
              filter: "blur(24px)",
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute"
            style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              background:
                "radial-gradient(ellipse at 60% 70%, rgba(74,222,128,0.15) 0%, transparent 65%)",
              filter: "blur(16px)",
            }}
          />

          <div
            className="relative z-10"
            style={{
              filter:
                "drop-shadow(0 40px 80px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(139,92,246,0.25))",
            }}
          >
            <UnsubscribeAnimation />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
