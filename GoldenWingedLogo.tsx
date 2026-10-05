import React from 'react';

interface GoldenWingedLogoProps {
  className?: string;
}

export const GoldenWingedLogo: React.FC<GoldenWingedLogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <div className={`relative flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-b from-[#1e1708] via-[#0f0b04] to-[#000000] p-1 border border-amber-400/50 shadow-[0_0_15px_rgba(234,179,8,0.5)] ${className}`}>
      {/* Warm Gold Outer Glow Halo Ring */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-yellow-400/30 to-amber-300/10 animate-pulse pointer-events-none" />

      {/* SVG Golden Winged Emblem with Halo & Wings */}
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_2px_8px_rgba(251,191,36,0.8)]"
      >
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#f59e0b" />
            <stop offset="70%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#b45309" />
          </linearGradient>

          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Laurel / Ring Details */}
        <circle cx="50" cy="50" r="38" stroke="url(#goldGradient)" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.6" />
        <circle cx="50" cy="50" r="34" stroke="url(#goldGradient)" strokeWidth="1" opacity="0.8" />

        {/* Top Halo */}
        <ellipse cx="50" cy="22" rx="14" ry="4" stroke="url(#goldGradient)" strokeWidth="2" fill="none" filter="url(#goldGlow)" />

        {/* Left Wing */}
        <path
          d="M 46 48 C 36 38, 22 30, 10 32 C 18 42, 28 46, 38 52 C 26 52, 16 50, 12 54 C 22 58, 32 60, 42 62 Z"
          fill="url(#goldGradient)"
          filter="url(#goldGlow)"
        />

        {/* Right Wing */}
        <path
          d="M 54 48 C 64 38, 78 30, 90 32 C 82 42, 72 46, 62 52 C 74 52, 84 50, 88 54 C 78 58, 68 60, 58 62 Z"
          fill="url(#goldGradient)"
          filter="url(#goldGlow)"
        />

        {/* Center Star & Phoenix Crest */}
        <path
          d="M 50 16 L 54 36 L 72 38 L 56 50 L 62 68 L 50 56 L 38 68 L 44 50 L 28 38 L 46 36 Z"
          fill="url(#goldGradient)"
          filter="url(#goldGlow)"
        />

        {/* Downward Sharp Crest Tail */}
        <path
          d="M 50 56 L 46 88 L 50 96 L 54 88 Z"
          fill="url(#goldGradient)"
          filter="url(#goldGlow)"
        />
      </svg>
    </div>
  );
};
