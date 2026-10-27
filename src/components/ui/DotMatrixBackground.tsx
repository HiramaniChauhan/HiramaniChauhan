"use client";

import React, { useMemo } from "react";

interface DotMatrixBackgroundProps {
  text?: string;
  className?: string;
}

// 5x7 dot-matrix font definitions
const DOT_PATTERNS: Record<string, string[]> = {
  A: [
    ".###.",
    "#...#",
    "#...#",
    "#####",
    "#...#",
    "#...#",
    "#...#",
  ],
  B: [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#...#",
    "#...#",
    "####.",
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
  D: [
    "####.",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "####.",
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
  F: [
    "#####",
    "#....",
    "#....",
    "####.",
    "#....",
    "#....",
    "#....",
  ],
  G: [
    ".###.",
    "#...#",
    "#....",
    "#..##",
    "#...#",
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
  J: [
    "..###",
    "....#",
    "....#",
    "....#",
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
  L: [
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#....",
    "#####",
  ],
  M: [
    "#...#",
    "##.##",
    "#.#.#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
  ],
  N: [
    "#...#",
    "##..#",
    "#.#.#",
    "#..##",
    "#...#",
    "#...#",
    "#...#",
  ],
  O: [
    ".###.",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  P: [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#....",
    "#....",
    "#....",
  ],
  Q: [
    ".###.",
    "#...#",
    "#...#",
    "#...#",
    "#.#.#",
    "#..##",
    ".####",
  ],
  R: [
    "####.",
    "#...#",
    "#...#",
    "####.",
    "#.##.",
    "#..#.",
    "#...#",
  ],
  S: [
    ".###.",
    "#...#",
    "#....",
    ".###.",
    "....#",
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
  U: [
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".###.",
  ],
  V: [
    "#...#",
    "#...#",
    "#...#",
    "#...#",
    ".#.#.",
    ".#.#.",
    "..#..",
  ],
  W: [
    "#...#",
    "#...#",
    "#...#",
    "#.#.#",
    "#.#.#",
    "##.##",
    "#...#",
  ],
  X: [
    "#...#",
    "#...#",
    ".#.#.",
    "..#..",
    ".#.#.",
    "#...#",
    "#...#",
  ],
  Y: [
    "#...#",
    "#...#",
    ".#.#.",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
  ],
  Z: [
    "#####",
    "....#",
    "...#.",
    "..#..",
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
  "1": [
    "..#..",
    ".##..",
    "..#..",
    "..#..",
    "..#..",
    "..#..",
    ".###.",
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
  "3": [
    "####.",
    "....#",
    "....#",
    ".###.",
    "....#",
    "....#",
    "####.",
  ],
  "4": [
    "#...#",
    "#...#",
    "#...#",
    "#####",
    "....#",
    "....#",
    "....#",
  ],
  "5": [
    "#####",
    "#....",
    "#....",
    "####.",
    "....#",
    "#...#",
    ".###.",
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
  "7": [
    "#####",
    "....#",
    "...#.",
    "..#..",
    ".#...",
    ".#...",
    ".#...",
  ],
  "8": [
    ".###.",
    "#...#",
    "#...#",
    ".###.",
    "#...#",
    "#...#",
    ".###.",
  ],
  "9": [
    ".###.",
    "#...#",
    "#...#",
    ".####",
    "....#",
    "....#",
    ".###.",
  ],
  "-": [
    ".....",
    ".....",
    ".....",
    "#####",
    ".....",
    ".....",
    ".....",
  ],
  "+": [
    ".....",
    "..#..",
    "..#..",
    "#####",
    "..#..",
    "..#..",
    ".....",
  ],
};

export function DotMatrixBackground({
  text = "AI+SDE",
  className = "",
}: DotMatrixBackgroundProps) {
  const dots = useMemo(() => {
    const chars = text.toUpperCase().split("");

    const dotSpacing = 30; // balanced pixel spacing between dot centers
    const charSpacing = 30; // spacing between letters within a word
    const wordSpacing = 50; // spacing between words

    let currentX = 0;
    const charPositions: Array<{ char: string; startX: number }> = [];

    chars.forEach((char, i) => {
      if (char === " ") {
        currentX += wordSpacing;
      } else {
        charPositions.push({ char, startX: currentX });
        const pattern = DOT_PATTERNS[char] || DOT_PATTERNS["S"];
        const charCols = pattern[0]?.length || 5;
        const charW = (charCols - 1) * dotSpacing;
        currentX += charW;

        if (i < chars.length - 1 && chars[i + 1] !== " ") {
          currentX += charSpacing;
        }
      }
    });

    const totalWidth = currentX;
    const offsetX = -totalWidth / 2;
    const startY = -(6 * dotSpacing) / 2;

    const result: Array<{ x: number; y: number; key: string }> = [];

    charPositions.forEach(({ char, startX }, charIdx) => {
      const pattern = DOT_PATTERNS[char] || DOT_PATTERNS["S"];
      pattern.forEach((rowStr, rowIdx) => {
        for (let colIdx = 0; colIdx < rowStr.length; colIdx++) {
          if (rowStr[colIdx] === "#") {
            result.push({
              x: offsetX + startX + colIdx * dotSpacing,
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
        className="w-full max-w-[840px] h-auto opacity-[0.09] sm:opacity-[0.13] transition-opacity duration-700"
        viewBox="-480 -120 960 240"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {dots.map((dot) => (
          <circle
            key={dot.key}
            cx={dot.x}
            cy={dot.y}
            r="10"
            className="fill-white transition-all duration-300"
          />
        ))}
      </svg>
    </div>
  );
}
