import type { ReactNode } from "react";

/**
 * Per-preset SVG illustration overlays for the completed constellation.
 * Each returns an SVG fragment (paths/circles/lines) in the same
 * normalized 100×60 coordinate space as the star slots in
 * `constellations.ts`. The parent SVG provides stroke/fill defaults.
 *
 * The illustrations are rendered with a thin translucent blue stroke
 * to evoke "constellation art" where the figure silhouette emerges
 * from the line graph. No fills — outlines only.
 */
export const CONSTELLATION_ILLUSTRATIONS: Readonly<Record<string, ReactNode>> = {
  cat: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Head outline */}
      <path d="M 28 22 Q 20 32, 24 44 Q 30 55, 50 58 Q 70 55, 76 44 Q 80 32, 72 22" />
      {/* Left ear */}
      <path d="M 28 22 L 30 9 L 40 20" />
      {/* Right ear */}
      <path d="M 72 22 L 70 9 L 60 20" />
      {/* Inner ears */}
      <path d="M 32 14 L 35 21" />
      <path d="M 68 14 L 65 21" />
      {/* Eyes */}
      <circle cx="40" cy="30" r="0.9" />
      <circle cx="60" cy="30" r="0.9" />
      {/* Nose */}
      <path d="M 48 38 L 52 38 L 50 40 Z" />
      {/* Mouth */}
      <path d="M 50 40 Q 48 43, 45 42" />
      <path d="M 50 40 Q 52 43, 55 42" />
      {/* Whiskers */}
      <path d="M 28 43 L 18 41" />
      <path d="M 28 46 L 18 48" />
      <path d="M 72 43 L 82 41" />
      <path d="M 72 46 L 82 48" />
    </g>
  ),

  rocket: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Body outline (with pointed nose) */}
      <path d="M 50 4 Q 58 10, 58 18 L 58 46 L 42 46 L 42 18 Q 42 10, 50 4 Z" />
      {/* Window */}
      <circle cx="50" cy="20" r="3" />
      {/* Left wing */}
      <path d="M 42 28 L 28 42 L 42 42 Z" />
      {/* Right wing */}
      <path d="M 58 28 L 72 42 L 58 42 Z" />
      {/* Thruster caps */}
      <path d="M 42 46 L 42 49 L 46 49 L 46 46" />
      <path d="M 58 46 L 58 49 L 54 49 L 54 46" />
      {/* Flame zig-zag */}
      <path d="M 44 49 L 46 55 L 48 51 L 50 58 L 52 51 L 54 55 L 56 49" />
    </g>
  ),

  fish: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Body outline */}
      <path d="M 20 28 Q 22 18, 30 19 Q 40 13, 55 14 Q 65 15, 72 11 L 86 28 L 72 45 Q 65 42, 55 42 Q 40 43, 30 37 Q 22 38, 20 28 Z" />
      {/* Tail */}
      <path d="M 72 11 L 86 28 L 72 45" />
      {/* Gill */}
      <path d="M 33 20 Q 31 28, 33 36" />
      {/* Eye */}
      <circle cx="45" cy="26" r="1.3" />
      <circle cx="45" cy="26" r="0.4" />
      {/* Lower fin */}
      <path d="M 48 40 L 55 50 L 60 40" />
      {/* Body stripes */}
      <path d="M 50 20 L 54 20" />
      <path d="M 58 22 L 62 22" />
    </g>
  ),

  flower: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* 6 petals (ellipses around center) */}
      <ellipse cx="50" cy="11" rx="4.5" ry="6" />
      <ellipse cx="62" cy="16" rx="4.5" ry="6" transform="rotate(60 62 16)" />
      <ellipse cx="62" cy="28" rx="4.5" ry="6" transform="rotate(120 62 28)" />
      <ellipse cx="50" cy="33" rx="4.5" ry="6" />
      <ellipse cx="38" cy="28" rx="4.5" ry="6" transform="rotate(60 38 28)" />
      <ellipse cx="38" cy="16" rx="4.5" ry="6" transform="rotate(120 38 16)" />
      {/* Center */}
      <circle cx="50" cy="22" r="3" />
      {/* Stem */}
      <path d="M 50 25 L 50 58" />
      {/* Leaves */}
      <path d="M 50 40 Q 58 37, 60 43 Q 54 44, 50 42" />
      <path d="M 50 48 Q 42 45, 40 51 Q 46 52, 50 50" />
    </g>
  ),

  sword: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Blade */}
      <path d="M 50 4 L 55 15 L 55 35 L 45 35 L 45 15 Z" />
      {/* Blade ridge */}
      <path d="M 50 4 L 50 35" />
      {/* Crossguard */}
      <path d="M 28 35 L 72 35 L 72 40 L 28 40 Z" />
      {/* Handle */}
      <path d="M 45 40 L 55 40 L 55 53 L 45 53 Z" />
      <path d="M 45 44 L 55 44" />
      <path d="M 45 48 L 55 48" />
      {/* Pommel */}
      <circle cx="50" cy="57" r="3" />
    </g>
  ),

  heart: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d="M 50 56 Q 18 34, 15 20 Q 16 8, 28 8 Q 42 8, 50 22 Q 58 8, 72 8 Q 84 8, 85 20 Q 82 34, 50 56 Z" />
    </g>
  ),

  crown: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Points and valleys */}
      <path d="M 14 48 L 20 15 L 35 28 L 50 5 L 65 28 L 80 15 L 86 48" />
      {/* Base band */}
      <path d="M 14 48 L 86 48 L 86 54 L 14 54 Z" />
      {/* Jewels on points */}
      <circle cx="20" cy="18" r="1.8" />
      <circle cx="50" cy="10" r="2.2" />
      <circle cx="80" cy="18" r="1.8" />
      {/* Base decoration */}
      <circle cx="30" cy="51" r="0.9" />
      <circle cx="50" cy="51" r="0.9" />
      <circle cx="70" cy="51" r="0.9" />
    </g>
  ),

  star: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* 5-point star outline */}
      <path d="M 50 6 L 58 22 L 78 24 L 64 36 L 72 55 L 50 42 L 28 55 L 36 36 L 22 24 L 42 22 Z" />
    </g>
  ),

  butterfly: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Antennae */}
      <path d="M 40 6 Q 45 13, 48 18" />
      <path d="M 60 6 Q 55 13, 52 18" />
      {/* Head */}
      <circle cx="50" cy="18" r="2" />
      {/* Body */}
      <path d="M 50 20 L 50 48" />
      {/* Upper-left wing */}
      <path d="M 50 24 Q 18 12, 12 26 Q 12 36, 34 36 Q 46 32, 50 28 Z" />
      {/* Upper-right wing */}
      <path d="M 50 24 Q 82 12, 88 26 Q 88 36, 66 36 Q 54 32, 50 28 Z" />
      {/* Lower-left wing */}
      <path d="M 50 36 Q 26 42, 22 52 Q 32 56, 44 46 Q 48 42, 50 40 Z" />
      {/* Lower-right wing */}
      <path d="M 50 36 Q 74 42, 78 52 Q 68 56, 56 46 Q 52 42, 50 40 Z" />
      {/* Wing spots */}
      <circle cx="28" cy="24" r="1.2" />
      <circle cx="72" cy="24" r="1.2" />
    </g>
  ),

  house: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Roof */}
      <path d="M 18 27 L 50 6 L 82 27" />
      {/* Walls */}
      <path d="M 22 27 L 22 54 L 78 54 L 78 27" />
      {/* Door */}
      <path d="M 45 54 L 45 40 L 55 40 L 55 54" />
      <circle cx="53" cy="47" r="0.6" />
      {/* Window */}
      <path d="M 30 32 L 30 42 L 40 42 L 40 32 Z" />
      <path d="M 30 37 L 40 37" />
      <path d="M 35 32 L 35 42" />
      {/* Chimney */}
      <path d="M 65 13 L 65 22 L 70 22 L 70 19" />
      {/* Smoke */}
      <path d="M 67 11 Q 68 8, 66 6 Q 64 8, 65 10" />
    </g>
  ),

  car: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Roof */}
      <path d="M 25 25 L 32 12 L 68 12 L 75 25" />
      {/* Body */}
      <path d="M 10 32 L 20 25 L 80 25 L 90 32 L 90 46 L 10 46 Z" />
      {/* Windows */}
      <path d="M 33 14 L 33 25" />
      <path d="M 50 14 L 50 25" />
      <path d="M 67 14 L 67 25" />
      {/* Wheels */}
      <circle cx="28" cy="48" r="5.5" />
      <circle cx="28" cy="48" r="2.5" />
      <circle cx="72" cy="48" r="5.5" />
      <circle cx="72" cy="48" r="2.5" />
      {/* Headlights */}
      <circle cx="88" cy="36" r="1.3" />
      <circle cx="12" cy="36" r="1.3" />
    </g>
  ),

  airplane: (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      {/* Fuselage */}
      <path d="M 50 4 Q 56 18, 56 50 L 44 50 Q 44 18, 50 4 Z" />
      {/* Main wings */}
      <path d="M 50 28 L 10 32 L 14 37 L 50 37 Z" />
      <path d="M 50 28 L 90 32 L 86 37 L 50 37 Z" />
      {/* Tail wings */}
      <path d="M 50 48 L 30 56 L 40 58 L 50 55 Z" />
      <path d="M 50 48 L 70 56 L 60 58 L 50 55 Z" />
      {/* Vertical tail fin */}
      <path d="M 50 46 L 47 56 L 53 56 Z" />
      {/* Cockpit window */}
      <path d="M 48 14 L 52 14 L 52 22 L 48 22 Z" />
      {/* Propeller */}
      <path d="M 46 4 L 54 4" />
    </g>
  ),
};
