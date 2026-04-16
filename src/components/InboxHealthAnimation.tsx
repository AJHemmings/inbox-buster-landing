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
