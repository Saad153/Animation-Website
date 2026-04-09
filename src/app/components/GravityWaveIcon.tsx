// Gravity Architecture wave icon (simplified white version)
export function GravityWaveIcon({ className, size = 120 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      {/* Simplified wave/lines architectural icon */}
      <g opacity="1">
        <path
          d="M20 30 Q35 25 50 30 T80 30 T110 30"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 45 Q35 40 50 45 T80 45 T110 45"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 60 Q35 55 50 60 T80 60 T110 60"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 75 Q35 70 50 75 T80 75 T110 75"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M20 90 Q35 85 50 90 T80 90 T110 90"
          stroke="white"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
