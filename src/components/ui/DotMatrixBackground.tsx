"use client";

import React, { useMemo } from "react";

interface DotMatrixBackgroundProps {
  text?: string;
  className?: string;
}

// 5x7 dot-matrix font definition extracted directly from reference design
const DOT_PATTERNS: Record<string, string[]> = {
  S: [
    ".###.",
    "#...#",
    "#....",
    ".###.",
    "....#",
    "#...#",
    ".###.",
  ],
  A: [
    ".###.",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  "2": [
    ".###.",
    "#...#",
    "....#",
    "..##.",
    ".#...",
    "#....",
    "#####",
  ],
  "0": [
    ".###.",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  K: [
    "#...#",
    "#..#.",
    "#.##.",
    "##...",
    "#.##.",
    "#..#.",
    "#...#",
  ],
  "6": [
    ".###.",
    "#....",
    "#....",
    "####.",
    "#...#",
    "#...#",
    ".###.",
  ],
  T: [
    "#####",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
  ],
  E: [
    "#####",
    "#....",
    "#....",
    "####.",
    "#....",
    "#....",
    "#####",
  ],
  C: [
    ".###.",
    "#...#",
    "#....",
    "#....",
    "#....",
    "#...#",
    ".###.",
  ],
  H: [
    "#...#",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  I: [
    ".###.",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".###.",
  ],
  L: [
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#####",
  ],
};

export function DotMatrixBackground({
  text = "SA20",
  className = "",
}: DotMatrixBackgroundProps) {
  const dots = useMemo(() => {
    const chars = text.toUpperCase().split("");
    const result: Array<{ x: number; y: number; key: string }> = [];

    const dotSpacing = 44; // pixel spacing between dot centers
    const charSpacing = 58; // gap between characters
    const charWidth = 4 * dotSpacing; // 5 columns (0 to 4) = 4 intervals

    const totalWidth =
      chars.length * charWidth + (chars.length - 1) * charSpacing;
    const startX = -totalWidth / 2;
    const startY = -(6 * dotSpacing) / 2;

    chars.forEach((char, charIdx) => {
      const pattern = DOT_PATTERNS[char] || DOT_PATTERNS["S"];
      const charOriginX = startX + charIdx * (charWidth + charSpacing);

      pattern.forEach((rowStr, rowIdx) => {
        for (let colIdx = 0; colIdx < rowStr.length; colIdx++) {
          if (rowStr[colIdx] === "#") {
            result.push({
              x: charOriginX + colIdx * dotSpacing,
              y: startY + rowIdx * dotSpacing,
              key: `${charIdx}-${rowIdx}-${colIdx}`,
            });
          }
        }
      });
    });

    return result;
  }, [text]);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <svg
        className="w-full max-w-[1100px] h-auto opacity-[0.08] sm:opacity-[0.11] transition-opacity duration-700"
        viewBox="-550 -180 1100 360"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map((dot) => (
          <circle
            key={dot.key}
            cx={dot.x}
            cy={dot.y}
            r="16"
            className="fill-white transition-all duration-300"
          />
        ))}
      </svg>
    </div>
  );
}
