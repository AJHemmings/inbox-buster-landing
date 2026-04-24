export default function BrandIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M25 35H75V65H25V35Z"
        stroke="#22C55E"
        strokeWidth="8"
        strokeLinejoin="round"
      />
      <path
        d="M25 35L50 52L75 35"
        stroke="#22C55E"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M85 15L70 35H85L70 55" fill="#F59E0B" />
    </svg>
  );
}
