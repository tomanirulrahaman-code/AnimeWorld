import React from 'react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#07040a] text-slate-900 flex flex-col items-center justify-start selection:bg-[#e50914] selection:text-white">
      {/* =========================================================================
          BACKGROUND LIGHTING SYSTEM (BEHIND THE ENTIRE ANIMELWORLD APP CONTENT)
          ========================================================================= */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* 1. Primary Radial Neon Red & Hot Pink Ambient Glow Orbs */}
        <div className="absolute -top-32 -left-32 w-[550px] h-[550px] rounded-full bg-gradient-to-br from-[#ff1744]/35 via-[#ff007f]/20 to-transparent blur-[120px] animate-neon-pulse" />
        <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full bg-gradient-to-tl from-[#ff007f]/30 via-[#ff1744]/20 to-transparent blur-[130px] animate-neon-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-gradient-to-r from-[#e50914]/15 via-[#ff007f]/10 to-transparent blur-[140px] opacity-70" />

        {/* 2. Outer Geometric 3D Shapes (Floating in Margins) */}
        {/* Left Outer Diamond 1 */}
        <div className="hidden lg:block absolute top-[15%] left-[5%] w-24 h-24 bg-gradient-to-tr from-[#ff1744]/25 to-[#ff007f]/10 rounded-2xl border border-[#ff1744]/30 backdrop-blur-sm transform rotate-45 animate-float-shape shadow-[0_0_30px_rgba(255,23,68,0.25)]" />

        {/* Left Outer Polygon 2 */}
        <div className="hidden lg:block absolute bottom-[22%] left-[8%] w-16 h-16 bg-gradient-to-br from-black/80 to-[#ff007f]/20 rounded-3xl border border-[#ff007f]/40 backdrop-blur-sm transform -rotate-12 animate-float-reverse shadow-[0_0_20px_rgba(255,0,127,0.2)]" />

        {/* Right Outer Diamond 1 */}
        <div className="hidden lg:block absolute top-[28%] right-[6%] w-28 h-28 bg-gradient-to-br from-[#ff007f]/25 to-[#ff1744]/10 rounded-3xl border border-[#ff007f]/30 backdrop-blur-sm transform -rotate-45 animate-float-reverse shadow-[0_0_35px_rgba(255,0,127,0.25)]" />

        {/* Right Outer Polygon 2 */}
        <div className="hidden lg:block absolute bottom-[18%] right-[7%] w-20 h-20 bg-gradient-to-tr from-black/80 to-[#ff1744]/20 rounded-2xl border border-[#ff1744]/40 backdrop-blur-sm transform rotate-12 animate-float-shape shadow-[0_0_25px_rgba(255,23,68,0.2)]" />

        {/* 3. Outer Laser Glowing Accent Lines */}
        <div className="hidden md:block absolute top-0 bottom-0 left-[12%] w-[1.5px] bg-gradient-to-b from-transparent via-[#ff1744]/40 to-transparent animate-laser-line opacity-60" />
        <div className="hidden md:block absolute top-0 bottom-0 right-[12%] w-[1.5px] bg-gradient-to-b from-transparent via-[#ff007f]/40 to-transparent animate-laser-line opacity-60" />

        {/* 4. Subtle Ambient Floating Micro Particles */}
        <div className="absolute top-[10%] left-[20%] w-2 h-2 rounded-full bg-[#ff1744] shadow-[0_0_10px_#ff1744] animate-ping opacity-75" />
        <div className="absolute top-[75%] left-[15%] w-1.5 h-1.5 rounded-full bg-[#ff007f] shadow-[0_0_8px_#ff007f] animate-pulse opacity-80" />
        <div className="absolute top-[20%] right-[18%] w-2.5 h-2.5 rounded-full bg-[#ff007f] shadow-[0_0_12px_#ff007f] animate-ping opacity-60" />
        <div className="absolute top-[80%] right-[22%] w-1.5 h-1.5 rounded-full bg-[#ff1744] shadow-[0_0_8px_#ff1744] animate-pulse opacity-70" />
      </div>

      {/* =========================================================================
          ANIMELWORLD HOME APP MOBILE SHELL FRAME (LAYER ORDER: 3 & 4)
          ========================================================================= */}
      <div className="w-full max-w-[420px] min-h-screen bg-[#f8f9fa] relative z-10 flex flex-col overflow-x-hidden shadow-[0_0_60px_rgba(255,23,68,0.25)] border-x border-red-500/20">
        {children}
      </div>
    </div>
  );
};
