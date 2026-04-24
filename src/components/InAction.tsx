"use client";

import DeletionAnimation from "@/components/DeletionAnimation";
import UnsubscribeAnimation from "@/components/UnsubscribeAnimation";

interface MockupColumn {
  animation: React.ReactNode;
  title: string;
  subtitle: string;
}

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

export default function InAction() {
  return (
    <section
      id="action"
      className="relative overflow-hidden py-28 lg:py-36 bg-brand-dark"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.30) 35%, rgba(74,222,128,0.20) 65%, transparent 100%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 55% at 50% 0%, rgba(139,92,246,0.08) 0%, transparent 70%)",
        }}
      />

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <div className="mb-20 text-center inaction-header">
          <p className="mb-4 text-[11px] font-black uppercase tracking-[0.22em] text-brand-green/70">
            See it in action
          </p>

          <h2
            className="mb-4 font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Watch the clutter{" "}
            <span
              className="text-gradient-purple-green"
              style={{ animation: "wordDisappear 4s linear infinite" }}
            >
              disappear.
            </span>
          </h2>

          <p
            className="mx-auto max-w-sm text-base font-medium leading-relaxed"
            style={{ color: "rgba(255,255,255,0.42)" }}
          >
            Two taps. Hundreds of emails. Gone.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          {MOCKUPS.map((col, i) => (
            <div
              key={col.title}
              className="flex flex-col items-center inaction-mockup"
              style={{ animationDelay: `${i * 120}ms` }}
            >
              <div
                className="relative"
                style={{ filter: "drop-shadow(0 32px 64px rgba(0,0,0,0.6))" }}
              >
                {col.animation}
              </div>

              <div className="mt-8 text-center">
                <p className="mb-1 text-[15px] font-black tracking-tight text-white">
                  {col.title}
                </p>
                <p
                  className="text-sm font-medium leading-relaxed"
                  style={{ color: "rgba(255,255,255,0.38)" }}
                >
                  {col.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @keyframes wordDisappear {
          0%, 30%       { opacity: 1; }
          58%, 82%      { opacity: 0; }
          88%, 100%     { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
