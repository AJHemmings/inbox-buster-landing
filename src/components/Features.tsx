"use client";

import {
  BarChart2,
  LayoutGrid,
  Trash2,
  BellOff,
  FolderInput,
  Globe,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  comingSoon?: true;
}

const FEATURES: Feature[] = [
  {
    icon: BarChart2,
    title: "Inbox Summary",
    description:
      "A clear breakdown of who's filling your inbox and exactly how bad it's got.",
  },
  {
    icon: LayoutGrid,
    title: "Smart Categorisation",
    description:
      "Automatically groups emails by type: newsletters, receipts, social, promotions.",
  },
  {
    icon: Trash2,
    title: "Mass Deletion",
    description:
      "Select a category and wipe hundreds of emails in one tap. Gone.",
  },
  {
    icon: BellOff,
    title: "Bulk Unsubscribe",
    description:
      "Unsubscribe from entire sender lists and delete their emails in one action.",
  },
  {
    icon: FolderInput,
    title: "Move & Archive",
    description:
      "Send emails to folders or archive in bulk. Your structure, your rules.",
  },
  {
    icon: Globe,
    title: "Coming Soon: Web & iOS",
    description:
      "Already on Android. Browser and iPhone support is on the way.",
    comingSoon: true,
  },
];

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  return (
    <div
      className="group relative flex flex-col gap-5 rounded-2xl p-6 transition-all duration-300 ease-out feature-card"
      style={
        feature.comingSoon
          ? {
              border: "1.5px dashed rgba(139,92,246,0.35)",
              background: "rgba(139,92,246,0.06)",
              animationDelay: `${index * 80}ms`,
            }
          : {
              border: "1.5px solid rgba(255,255,255,0.07)",
              background: "rgba(255,255,255,0.04)",
              animationDelay: `${index * 80}ms`,
            }
      }
    >
      {feature.comingSoon && (
        <span
          aria-label="Coming Soon"
          className="absolute right-4 top-4 rounded-full bg-brand-purple/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-brand-purple"
        >
          Coming Soon
        </span>
      )}

      <div className="inline-flex w-fit items-center justify-center rounded-xl bg-brand-green/10 p-3">
        <Icon size={22} strokeWidth={2} className="text-brand-green" aria-hidden="true" />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-black tracking-tight text-white">{feature.title}</h3>
        <p className="text-sm leading-relaxed text-white/55">{feature.description}</p>
      </div>
    </div>
  );
}

export default function Features() {
  return (
    <section
      id="features"
      className="relative overflow-hidden py-24 lg:py-32 bg-brand-mid"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.25) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div
          className="mx-auto mb-16 max-w-2xl text-center features-header"
          style={{ animationDelay: "0ms" }}
        >
          <p className="mb-4 text-xs font-black uppercase tracking-[0.2em] text-brand-green">
            What&rsquo;s inside
          </p>

          <h2
            className="mb-5 font-black leading-[1.05] tracking-tight text-white"
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.25rem)" }}
          >
            Everything your inbox needs.{" "}
            <span className="text-brand-purple">Nothing it doesn&rsquo;t.</span>
          </h2>

          <p className="mx-auto max-w-xl text-base leading-relaxed text-white/50">
            Built for the people who&rsquo;ve been putting off inbox cleanup for
            months. Or years.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
