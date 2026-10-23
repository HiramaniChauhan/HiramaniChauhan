import React from "react";

interface HLogoGlyphProps extends React.SVGProps<SVGSVGElement> {
  className?: string;
  fillColor?: string;
}

/**
 * Architectural "H" Glyph
 * Precision vector recreation of custom monogram featuring:
 * - Dual vertical monolithic pillars
 * - 45° symmetrical outer chevron notches
 * - Elevated 45° central trapezoidal crossbar
 */
export function HLogoGlyph({
  className = "w-6 h-6",
  fillColor = "currentColor",
  ...props
}: HLogoGlyphProps) {
  return (
    <svg
      viewBox="0 0 236 274"
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      {...props}
    >
      {/* Left Pillar with 45° Outer Cut */}
      <path d="M 0 0 L 53 0 L 53 274 L 0 274 L 0 201 L 47 154 L 0 154 Z" />

      {/* Central Elevated Trapezoid Crossbar */}
      <path d="M 53 154 L 97 108 L 139 108 L 183 154 Z" />

      {/* Right Pillar with 45° Outer Cut */}
      <path d="M 183 0 L 236 0 L 236 154 L 189 154 L 236 201 L 236 274 L 183 274 Z" />
    </svg>
  );
}

export default HLogoGlyph;
