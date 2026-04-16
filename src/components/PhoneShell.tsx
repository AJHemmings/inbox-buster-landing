export function HomeIndicator() {
  return (
    <div className="mt-3 flex justify-center">
      <div
        className="rounded-full"
        style={{ width: 80, height: 4, background: "rgba(255,255,255,0.12)" }}
      />
    </div>
  );
}

export default function PhoneShell({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto flex flex-col overflow-hidden"
      style={{
        width: 260,
        height: 480,
        background: "#16161f",
        borderRadius: 32,
        border: "1px solid rgba(255,255,255,0.10)",
        boxShadow:
          "0 32px 80px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.06)",
      }}
    >
      {children}
    </div>
  );
}
