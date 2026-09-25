"use client";

import React, { useState } from "react";

interface PillInteractiveButtonProps {
  children: React.ReactNode;
  hoverText?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "green" | "cyan" | "reputation" | "default";
}

export function ShinyButton({
  children,
  hoverText,
  onClick,
  className = "",
  variant = "reputation",
}: PillInteractiveButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Variant configurations
  const isGreen = variant === "green";

  // Base / Idle styling (Before hover)
  // Non-own profil ("reputation"): Gradient Ungu
  let idleBg = "bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-800 border-purple-400/30 text-purple-100 shadow-[0_0_15px_rgba(147,51,234,0.3)]";
  let dotColor = "bg-white";

  // Hover Overlay Capsule (Slide / Morph expansion dari kiri)
  // Non-own profil: Gradient Hijau saat hover
  let hoverOverlayBg = "bg-gradient-to-r from-emerald-400 via-green-400 to-teal-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]";

  if (isGreen) {
    idleBg = "bg-emerald-950/80 border-emerald-500/40 text-emerald-100 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
    dotColor = "bg-emerald-400";
    hoverOverlayBg = "bg-gradient-to-r from-emerald-400 to-green-400 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.5)]";
  } else if (variant === "cyan") {
    idleBg = "bg-slate-900 border-white/20 text-white shadow-[0_0_15px_rgba(255,255,255,0.2)]";
    dotColor = "bg-white";
    hoverOverlayBg = "bg-white text-black shadow-md";
  }

  const activeHoverText = hoverText !== undefined ? hoverText : children;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative flex items-center justify-center w-full h-[44px] rounded-full border transition-all duration-300 overflow-hidden cursor-pointer select-none active:scale-[0.98] ${idleBg} ${className}`}
    >
      {/* 1. Default Static Layout: [Dot] + Label */}
      <div className="relative z-10 flex items-center justify-center gap-2 font-bold text-[14px] tracking-wide">
        {/* White / Colored glowing dot */}
        <span
          className={`w-2 h-2 rounded-full transition-transform duration-300 ease-out shrink-0 ${dotColor} ${
            isHovered ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        />
        <span className="transition-opacity duration-200">
          {children}
        </span>
      </div>

      {/* 2. Morphing & Sliding Pill dari titik kiri ke seluruh button */}
      <div
        style={{
          transition: "width 340ms cubic-bezier(0.34, 1.3, 0.64, 1), height 340ms cubic-bezier(0.34, 1.3, 0.64, 1), left 340ms cubic-bezier(0.34, 1.3, 0.64, 1), border-radius 340ms ease, opacity 200ms ease",
        }}
        className={`absolute top-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center overflow-hidden z-20 ${hoverOverlayBg} ${
          isHovered
            ? "left-0 w-full h-full rounded-full opacity-100"
            : "left-6 w-2.5 h-2.5 rounded-full opacity-0"
        }`}
      >
        <span
          className={`font-bold text-[14px] tracking-wide whitespace-nowrap transition-all duration-200 ${
            isHovered ? "opacity-100 scale-100 delay-100" : "opacity-0 scale-90"
          }`}
        >
          {activeHoverText}
        </span>
      </div>
    </button>
  );
}

export default ShinyButton;
