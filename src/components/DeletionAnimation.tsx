"use client";

import { useEffect, useState } from "react";
import { Check, Trash2 } from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const EMAILS = [
  {
    id: 1,
    tag: "Promotions",
    sender: "Groupon",
    subject: "50% off today only!",
    tagColor: "bg-orange-500",
  },
  {
    id: 2,
    tag: "Newsletter",
    sender: "Medium Daily",
    subject: "Top stories for you",
    tagColor: "bg-blue-500",
  },
  {
    id: 3,
    tag: "Receipts",
    sender: "Amazon",
    subject: "Your order has shipped",
    tagColor: "bg-yellow-500",
  },
  {
    id: 4,
    tag: "Promotions",
    sender: "LinkedIn",
    subject: "You have 14 new notifications",
    tagColor: "bg-sky-500",
  },
  {
    id: 5,
    tag: "Newsletter",
    sender: "Substack",
    subject: "Weekend reads",
    tagColor: "bg-purple-500",
  },
];

// ─── Types ───────────────────────────────────────────────────────────────────

type Phase = "idle" | "selecting" | "confirming" | "deleting" | "done";

// ─── Component ───────────────────────────────────────────────────────────────

export default function DeletionAnimation() {
  const [phase, setPhase] = useState<Phase>("idle");
  const [checkedIds, setCheckedIds] = useState<Set<number>>(new Set());
  const [deletedIds, setDeletedIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const schedule = (fn: () => void, delay: number) => {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
    };

    // Phase 1 — start selecting
    schedule(() => setPhase("selecting"), 800);

    // Phase 2 — tick checkboxes one by one
    EMAILS.forEach((email, index) => {
      schedule(() => {
        setCheckedIds((prev) => new Set([...prev, email.id]));
      }, 1200 + index * 250);
    });

    const allCheckedAt = 1200 + (EMAILS.length - 1) * 250;

    // Phase 3 — confirming (button turns green)
    schedule(() => setPhase("confirming"), allCheckedAt + 200);

    // Phase 4 — deleting (rows slide out)
    schedule(() => {
      setPhase("deleting");
      EMAILS.forEach((email, index) => {
        schedule(() => {
          setDeletedIds((prev) => new Set([...prev, email.id]));
        }, index * 120);
      });
    }, allCheckedAt + 900);

    const allDeletedAt = allCheckedAt + 900 + (EMAILS.length - 1) * 120;

    // Phase 5 — done
    schedule(() => setPhase("done"), allDeletedAt + 300);

    // Phase 6 — loop restart
    schedule(() => {
      setPhase("idle");
      setCheckedIds(new Set());
      setDeletedIds(new Set());
    }, allDeletedAt + 2300);

    return () => timeouts.forEach(clearTimeout);
  }, [phase === "idle" ? "reset" : "running"]);

  // Derived state
  const checkedCount = checkedIds.size;
  const isConfirming = phase === "confirming";
  const isDeleting = phase === "deleting";
  const isDone = phase === "done";

  const buttonBg =
    isDone
      ? "bg-brand-green/30"
      : isDeleting
      ? "bg-brand-green/50 text-white/70"
      : isConfirming
      ? "bg-brand-green text-gray-900 scale-105 shadow-lg shadow-brand-green/30"
      : "bg-white/5 text-white/30";

  const buttonLabel =
    isDeleting
      ? "Deleting..."
      : isConfirming && checkedCount > 0
      ? `Delete ${checkedCount} emails`
      : "Delete emails";

  return (
    // Phone shell
    <div
      className="relative mx-auto flex flex-col overflow-hidden"
      style={{
        width: 260,
        height: 480,
        background: "#1a1a2e",
        borderRadius: 32,
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Status bar */}
      <div className="flex items-center justify-between px-5 pt-4 pb-1">
        <span className="text-[10px] font-bold text-white/40 tracking-widest uppercase">
          Inbox
        </span>
        <span className="text-[10px] font-semibold text-white/30">
          {checkedCount > 0 ? `${checkedCount} selected` : `${EMAILS.length} unread`}
        </span>
      </div>

      {/* Thin divider */}
      <div className="mx-4 h-px bg-white/5" />

      {/* Email list */}
      <div className="flex-1 overflow-hidden px-3 pt-2 pb-1 flex flex-col gap-1">
        {EMAILS.map((email) => {
          const isChecked = checkedIds.has(email.id);
          const isDeleted = deletedIds.has(email.id);

          return (
            <div
              key={email.id}
              className="flex items-center gap-2 rounded-xl px-2 py-2 transition-all duration-300"
              style={{
                background: isChecked
                  ? "rgba(74,222,128,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: isChecked
                  ? "1px solid rgba(74,222,128,0.15)"
                  : "1px solid rgba(255,255,255,0.05)",
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
              {/* Checkbox */}
              <div
                className="shrink-0 flex items-center justify-center rounded-full transition-all duration-200"
                style={{
                  width: 18,
                  height: 18,
                  border: isChecked
                    ? "none"
                    : "1.5px solid rgba(255,255,255,0.20)",
                  background: isChecked ? "#4ADE80" : "transparent",
                  boxShadow: isChecked
                    ? "0 0 8px rgba(74,222,128,0.4)"
                    : "none",
                }}
              >
                {isChecked && (
                  <Check
                    size={10}
                    strokeWidth={3}
                    className="text-gray-900"
                    aria-hidden="true"
                  />
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Tag + sender row */}
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span
                    className={`shrink-0 rounded-full px-1.5 py-px text-[8px] font-bold uppercase tracking-wider text-white ${email.tagColor}`}
                  >
                    {email.tag}
                  </span>
                  <span className="truncate text-[10px] font-semibold text-white/70">
                    {email.sender}
                  </span>
                </div>
                {/* Subject */}
                <p className="truncate text-[9px] text-white/35 leading-none">
                  {email.subject}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom action area */}
      <div className="px-3 pb-5 pt-2">
        {isDone ? (
          // Done state — inbox cleared confirmation
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
              <Check size={11} strokeWidth={3} className="text-gray-900" aria-hidden="true" />
            </div>
            <span
              className="text-xs font-bold tracking-wide"
              style={{ color: "#4ADE80" }}
            >
              Inbox cleared
            </span>
          </div>
        ) : (
          // Delete button
          <button
            disabled
            aria-label={buttonLabel}
            className={`w-full flex items-center justify-center gap-2 rounded-xl py-3 text-xs font-bold tracking-wide uppercase transition-all duration-300 ${buttonBg}`}
          >
            {!isConfirming && !isDeleting && (
              <Trash2 size={12} strokeWidth={2.5} aria-hidden="true" />
            )}
            {buttonLabel}
          </button>
        )}

        {/* Home indicator */}
        <div className="mt-3 flex justify-center">
          <div
            className="rounded-full"
            style={{
              width: 80,
              height: 4,
              background: "rgba(255,255,255,0.12)",
            }}
          />
        </div>
      </div>
    </div>
  );
}
