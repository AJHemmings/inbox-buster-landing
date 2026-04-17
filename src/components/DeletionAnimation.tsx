"use client";

import { useEffect, useState } from "react";
import PhoneShell, { HomeIndicator } from "@/components/PhoneShell";

const SENDERS = [
  { id: 1, name: "Credit Karma", count: 2345 },
  { id: 2, name: "LinkedIn Alerts", count: 1392 },
  { id: 3, name: "Twitch", count: 535 },
  { id: 4, name: "eBay Auctions", count: 463 },
  { id: 5, name: "PlayStation", count: 388 },
];

type Phase = "idle" | "selecting" | "confirming" | "deleting" | "done";

export default function DeletionAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    let timeouts: ReturnType<typeof setTimeout>[] = [];
    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(() => {
        fn();
        timeouts = timeouts.filter((timeoutId) => timeoutId !== id);
      }, delay);
      timeouts.push(id);
    };

    const runCycle = () => {
      schedule(() => setPhase("selecting"), 800);

      SENDERS.forEach((sender, index) => {
        schedule(
          () => setCheckedIds((prev) => new Set([...prev, sender.id])),
          1200 + index * 250,
        );
      });

      const allCheckedAt = 1200 + (SENDERS.length - 1) * 250;

      schedule(() => setPhase("confirming"), allCheckedAt + 200);

      schedule(() => {
        setPhase("deleting");
        SENDERS.forEach((sender, index) => {
          schedule(
            () => setDeletedIds((prev) => new Set([...prev, sender.id])),
            index * 120,
          );
        });
      }, allCheckedAt + 900);

      const allDeletedAt = allCheckedAt + 900 + (SENDERS.length - 1) * 120;

      schedule(() => setPhase("done"), allDeletedAt + 300);

      schedule(() => {
        setPhase("idle");
        setCheckedIds(new Set());
        setDeletedIds(new Set());
        runCycle();
      }, allDeletedAt + 2300);
    };

    runCycle();

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const checkedCount = SENDERS.filter((s) => checkedIds.has(s.id)).reduce(
    (sum, s) => sum + s.count,
    0,
  );
  const isConfirming = phase === "confirming";
  const isDeleting = phase === "deleting";
  const isDone = phase === "done";

  return (
    <PhoneShell>
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
          Inbox
        </span>
        <span className="text-[10px] font-semibold text-white/30">
          {checkedCount > 0
            ? `${checkedCount} selected`
            : `${SENDERS.length} senders`}
        </span>
      </div>

      <div className="mx-4 h-px bg-white/5" />

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
                transform: isDeleted
                  ? "translateX(32px) scale(0.95)"
                  : "translateX(0) scale(1)",
                transitionProperty: "opacity, transform, background, border",
                transitionDuration: isDeleted ? "280ms" : "200ms",
                transitionTimingFunction: isDeleted
                  ? "cubic-bezier(0.4, 0, 1, 1)"
                  : "ease",
              }}
            >
              {/* Circular checkbox */}
              <div
                className="shrink-0 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 16,
                  height: 16,
                  border: isChecked
                    ? "none"
                    : "1.5px solid rgba(255,255,255,0.22)",
                  background: isChecked ? "#4ADE80" : "transparent",
                }}
              >
                {isChecked && (
                  <span style={{ fontSize: 8, color: "#000", fontWeight: 900 }}>
                    ✓
                  </span>
                )}
              </div>

              {/* Letter avatar */}
              <div
                className="shrink-0 flex items-center justify-center rounded-[6px] text-[9px] font-bold transition-all duration-200"
                style={{
                  width: 22,
                  height: 22,
                  background: isChecked ? "rgba(74,222,128,0.12)" : "#2a2a38",
                  color: isChecked
                    ? "rgba(74,222,128,0.8)"
                    : "rgba(255,255,255,0.55)",
                }}
              >
                {sender.name.charAt(0)}
              </div>

              {/* Stacked name + count */}
              <div className="flex-1 min-w-0">
                <p
                  className="text-[11px] font-semibold leading-tight transition-colors duration-200"
                  style={{
                    color: isChecked
                      ? "rgba(74,222,128,0.9)"
                      : "rgba(255,255,255,0.85)",
                  }}
                >
                  {sender.name}
                </p>
                <p
                  className="text-[9px] transition-colors duration-200"
                  style={{
                    color: isChecked
                      ? "rgba(74,222,128,0.45)"
                      : "rgba(255,255,255,0.30)",
                  }}
                >
                  {sender.count.toLocaleString()} emails
                </p>
              </div>
            </div>
          );
        })}
      </div>

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
              style={{
                width: 20,
                height: 20,
                background: "#4ADE80",
                boxShadow: "0 0 10px rgba(74,222,128,0.5)",
              }}
            >
              <span style={{ fontSize: 9, color: "#000", fontWeight: 900 }}>
                ✓
              </span>
            </div>
            <span
              className="text-xs font-bold tracking-wide"
              style={{ color: "#4ADE80" }}
            >
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
                  ? {
                      background: "rgba(74,222,128,0.35)",
                      color: "rgba(255,255,255,0.60)",
                      border: "1px solid rgba(74,222,128,0.20)",
                    }
                  : isConfirming
                    ? {
                        background: "#4ADE80",
                        color: "#0a0a12",
                        border: "none",
                      }
                    : {
                        background: "rgba(255,255,255,0.05)",
                        color: "rgba(255,255,255,0.25)",
                        border: "1px solid rgba(255,255,255,0.08)",
                      }
              }
            >
              🗑 {isDeleting ? "Deleting..." : "Delete"}
            </button>

            {/* UNSUB & DELETE — always disabled */}
            <button
              disabled
              aria-disabled
              className="flex-1 flex items-center justify-center gap-1.5 rounded-xl py-3 text-[9px] font-bold tracking-wide uppercase"
              style={{
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.20)",
                border: "1px solid rgba(255,255,255,0.07)",
                pointerEvents: "none",
              }}
            >
              🔕 Unsub &amp; Delete
            </button>
          </div>
        )}
      </div>

      <HomeIndicator />
    </PhoneShell>
  );
}
