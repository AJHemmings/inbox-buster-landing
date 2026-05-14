"use client";

import React from "react";
import InboxHealthAnimation from "@/components/InboxHealthAnimation";

const FLAME_CONFIGS = [
  { speed: "0.82s", delay: "0.00s", height: 1.25, rotate: "-3deg" },
  { speed: "1.05s", delay: "0.45s", height: 1.32, rotate:  "2deg" },
  { speed: "0.70s", delay: "1.10s", height: 1.12, rotate: "-1deg" },
  { speed: "0.94s", delay: "0.72s", height: 1.38, rotate:  "4deg" },
  { speed: "0.85s", delay: "1.55s", height: 1.20, rotate: "-2deg" },
  { speed: "1.15s", delay: "0.20s", height: 1.30, rotate:  "1deg" },
  { speed: "0.74s", delay: "0.90s", height: 1.15, rotate: "-4deg" },
  { speed: "0.99s", delay: "1.30s", height: 1.40, rotate:  "3deg" },
  { speed: "0.80s", delay: "0.55s", height: 1.22, rotate: "-1deg" },
  { speed: "1.10s", delay: "1.80s", height: 1.28, rotate:  "2deg" },
  { speed: "0.75s", delay: "0.35s", height: 1.18, rotate: "-3deg" },
  { speed: "1.02s", delay: "1.00s", height: 1.35, rotate:  "4deg" },
];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden bg-brand-dark pt-20"
      aria-label="Hero"
    >
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
              Now live on web &middot; Android &amp; iOS coming soon
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
            <span className="block relative" style={{ isolation: "isolate" }}>
              {/* Flame row - flames.md SVG paths, sits behind the text */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: "38%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  overflow: "visible",
                  zIndex: 0,
                  pointerEvents: "none",
                }}
              >
                {FLAME_CONFIGS.map((cfg, i) => (
                  <div
                    key={i}
                    className="mo-fire"
                    style={{ "--speed": cfg.speed, "--delay": cfg.delay, "--height": cfg.height, "--rotate": cfg.rotate } as React.CSSProperties}
                  >
                    <svg viewBox="0 0 125 189.864" style={{ overflow: "visible" }}>
                      <path className="flame-main" fill="#F36E21" d="M76.553,186.09c0,0-10.178-2.976-15.325-8.226s-9.278-16.82-9.278-16.82s-0.241-6.647-4.136-18.465c0,0,3.357,4.969,5.103,9.938c0,0-5.305-21.086,1.712-30.418c7.017-9.333,0.571-35.654-2.25-37.534c0,0,13.07,5.64,19.875,47.54c6.806,41.899,16.831,45.301,6.088,53.985"/>
                      <path className="flame-main one" fill="#F6891F" d="M61.693,122.257c4.117-15.4,12.097-14.487-11.589-60.872c0,0,32.016,10.223,52.601,63.123c20.585,52.899-19.848,61.045-19.643,61.582c0.206,0.537-19.401-0.269-14.835-18.532S57.576,137.656,61.693,122.257z"/>
                      <path className="flame-main two" fill="#FFD04A" d="M81.657,79.192c0,0,11.549,24.845,3.626,40.02c-7.924,15.175-21.126,41.899-0.425,64.998C84.858,184.21,125.705,150.905,81.657,79.192z"/>
                      <path className="flame" fill="#F36E21" d="M101.011,112.926c0,0,8.973,10.519,4.556,16.543C99.37,129.735,106.752,117.406,101.011,112.926z"/>
                      <path className="flame one" fill="#F36E21" d="M55.592,126.854c0,0-3.819,13.29,2.699,16.945C64.038,141.48,55.907,132.263,55.592,126.854z"/>
                    </svg>
                  </div>
                ))}
              </div>

              {/* Text - sits on top of flames */}
              <span
                style={{
                  background: "linear-gradient(to top, #7F1D1D 0%, #DC2626 28%, #F97316 62%, #FCD34D 100%)",
                  backgroundSize: "100% 180%",
                  backgroundPosition: "50% 100%",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  animation: "fireRise 2.6s ease-in-out infinite, fireFlicker 1s ease-in-out infinite",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                a disaster.
              </span>
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
            Mass delete. Unsubscribe in bulk. Sort the chaos. InboxBuster takes
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
              <span className="font-semibold text-white/75">1,000 emails</span>.
              No card required.
            </p>

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
                "radial-gradient(ellipse at center, rgba(139,92,246,0.12) 0%, rgba(139,92,246,0.05) 40%, transparent 72%)",
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
                "radial-gradient(ellipse at 60% 70%, rgba(74,222,128,0.07) 0%, transparent 65%)",
              filter: "blur(16px)",
            }}
          />

          <div
            className="relative z-10"
            style={{
              filter:
                "drop-shadow(0 40px 80px rgba(0,0,0,0.75))",
            }}
          >
            <InboxHealthAnimation />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
        @keyframes fireRise {
          0%, 100% { background-position: 50% 100%; }
          50%       { background-position: 50% 58%;  }
        }
        @keyframes fireFlicker {
          0%, 100% { opacity: 1;    }
          20%      { opacity: 0.96; }
          45%      { opacity: 1;    }
          65%      { opacity: 0.92; }
          82%      { opacity: 1;    }
        }
        .mo-fire {
          width: clamp(44px, 6.5vw, 85px);
          margin: 0 clamp(-25px, -2vw, -13px);
          filter: drop-shadow(0px -15px 30px rgba(243, 110, 33, 0.8));
          position: relative;
          overflow: visible;
        }
        .mo-fire svg {
          width: 100%;
          height: auto;
          overflow: visible;
        }
        .flame-main {
          animation: flameWobble var(--speed) ease-in-out infinite;
          animation-delay: var(--delay);
          transform-origin: bottom center;
        }
        .flame {
          animation: flamefly 2.2s ease-out infinite;
          animation-delay: var(--delay);
          opacity: 0;
        }
        @keyframes flameWobble {
          0%, 100% { transform: scale(1) rotate(0deg); }
          50%       { transform: scale(1.1, var(--height)) translateY(-5px) rotate(var(--rotate)); }
        }
        @keyframes flamefly {
          0%   { transform: translateY(0) scale(1); opacity: 0; }
          20%  { opacity: 1; }
          100% { transform: translate(15px, -150px) scale(0.3); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
