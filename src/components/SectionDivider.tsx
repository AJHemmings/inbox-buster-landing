export default function SectionDivider() {
  return (
    <div
      aria-hidden="true"
      className="relative w-full overflow-hidden"
      style={{ height: "1px", background: "rgba(255,255,255,0.12)" }}
    >
      <div className="section-divider-shine" />
    </div>
  );
}
