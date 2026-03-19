import React from "react";

export function OtpIllustration(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 500 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-auto drop-shadow-2xl"
      {...props}
    >
      <defs>
        <filter id="shadow-main" x="-20" y="0" width="340" height="240" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="16" stdDeviation="24" floodOpacity="0.15" />
        </filter>
        <filter id="shadow-small" x="-20" y="0" width="220" height="150" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodOpacity="0.2" />
        </filter>
      </defs>

      {/* Main Window */}
      <g transform="translate(40, 110)" filter="url(#shadow-main)">
        {/* Base */}
        <rect x="0" y="0" width="320" height="210" rx="16" fill="#a5c4ff" />

        {/* Bottom wave detail */}
        <path
          d="M 0 160 Q 160 210 320 160 L 320 194 Q 320 210 304 210 L 16 210 Q 0 210 0 194 Z"
          fill="#84abef"
        />

        {/* Title bar */}
        <path d="M 0 16 Q 0 0 16 0 L 304 0 Q 320 0 320 16 L 320 32 L 0 32 Z" fill="#3f4b63" />

        {/* Window dots */}
        <circle cx="28" cy="16" r="6" fill="#f97316" />
        <circle cx="48" cy="16" r="6" fill="#ef4444" />
        <circle cx="68" cy="16" r="6" fill="#ffffff" />

        {/* Profile Circle Area */}
        <circle cx="160" cy="95" r="38" fill="white" />
        <circle cx="160" cy="95" r="31" fill="none" stroke="#fcd34d" strokeWidth="2" />
        
        {/* Avatar Head */}
        <circle cx="160" cy="81" r="11" fill="#f97316" />
        
        {/* Avatar Body */}
        <path d="M 134 113 C 134 100 144 91 160 91 C 176 91 186 100 186 113 Z" fill="#f97316" />

        {/* Password Pill */}
        <rect x="105" y="150" width="110" height="32" rx="16" fill="white" />
        {/* Asterisks */}
        <g fill="#059669">
          <path d="M 125 168 l -3 -3 l -3 3 l -1 -1 l 3 -3 l -3 -3 l 1 -1 l 3 3 l 3 -3 l 1 1 l -3 3 l 3 3 z" />
          <path d="M 142 168 l -3 -3 l -3 3 l -1 -1 l 3 -3 l -3 -3 l 1 -1 l 3 3 l 3 -3 l 1 1 l -3 3 l 3 3 z" />
          <path d="M 159 168 l -3 -3 l -3 3 l -1 -1 l 3 -3 l -3 -3 l 1 -1 l 3 3 l 3 -3 l 1 1 l -3 3 l 3 3 z" />
          <path d="M 176 168 l -3 -3 l -3 3 l -1 -1 l 3 -3 l -3 -3 l 1 -1 l 3 3 l 3 -3 l 1 1 l -3 3 l 3 3 z" />
        </g>
      </g>

      {/* Small OTP Window */}
      <g transform="translate(290, 80)" filter="url(#shadow-small)">
        {/* Base */}
        <rect x="0" y="0" width="180" height="110" rx="12" fill="#dbeafe" />

        {/* Title bar */}
        <path d="M 0 12 Q 0 0 12 0 L 168 0 Q 180 0 180 12 L 180 24 L 0 24 Z" fill="#3f4b63" />

        {/* Window dots */}
        <circle cx="18" cy="12" r="4" fill="#f97316" />
        <circle cx="32" cy="12" r="4" fill="#ef4444" />
        <circle cx="46" cy="12" r="4" fill="#ffffff" />

        {/* OTP Code Pill */}
        <rect x="25" y="45" width="130" height="46" rx="23" fill="white" />
        <text
          x="90"
          y="76"
          fill="#059669"
          fontSize="30"
          fontWeight="900"
          fontFamily="system-ui, -apple-system, sans-serif"
          letterSpacing="2"
          textAnchor="middle"
        >
          8056
        </text>
      </g>
    </svg>
  );
}
