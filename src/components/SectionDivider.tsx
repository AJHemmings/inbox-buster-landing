const DOTS = Array.from({ length: 200 }, (_, i) => ({
  key: i,
  color: i % 2 === 0 ? "#8B5CF6" : "#4ADE80",
  delay: `${(i % 25) * 80}ms`,
}));

export default function SectionDivider() {
  return (
    <div
      className="w-full overflow-hidden bg-brand-dark py-1 flex justify-center gap-1.5 flex-nowrap"
      aria-hidden="true"
    >
      {DOTS.map(({ key, color, delay }) => (
        <span
          key={key}
          className="w-[3px] h-[3px] rounded-full flex-shrink-0"
          style={{
            background: color,
            animation: "dotWave 2s ease-in-out infinite",
            animationDelay: delay,
          }}
        />
      ))}
    </div>
  );
}
