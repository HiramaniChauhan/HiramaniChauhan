"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import { SkillItem } from "@/data/skills";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SkillsOrbitalRingProps {
  skills: SkillItem[];
  onSelectSkill: (skill: SkillItem) => void;
  hoveredSkillId: string | null;
  setHoveredSkillId: (id: string | null) => void;
  viewMode?: "orbit" | "flow" | "grid";
}

export function SkillsOrbitalRing({
  skills,
  onSelectSkill,
  hoveredSkillId,
  setHoveredSkillId,
  viewMode = "orbit",
}: SkillsOrbitalRingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotationRef = useRef(0);
  const [, setRenderTick] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  const dragStartX = useRef(0);
  const lastX = useRef(0);
  const velocity = useRef(0);
  const animFrameId = useRef<number | null>(null);
  const lastTime = useRef<number>(performance.now());
  const isDraggingRef = useRef(false);
  const isPausedRef = useRef(false);
  const hoveredRef = useRef<string | null>(null);
  const { playHover, playClick } = useSoundEffects();

  // Keep refs in sync with state
  isDraggingRef.current = isDragging;
  isPausedRef.current = isPaused;
  hoveredRef.current = hoveredSkillId;

  // Responsive radii
  const [radii, setRadii] = useState({ rx: 380, ry: 270, rz: 320 });

  useEffect(() => {
    const updateDimensions = () => {
      if (typeof window === "undefined") return;
      const width = window.innerWidth;
      if (width < 640) {
        setRadii({ rx: 170, ry: 130, rz: 160 });
      } else if (width < 1024) {
        setRadii({ rx: 270, ry: 195, rz: 230 });
      } else {
        setRadii({ rx: 380, ry: 265, rz: 320 });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Continuous animation loop with inertia
  useEffect(() => {
    const loop = (now: number) => {
      const dt = Math.min((now - lastTime.current) / 1000, 0.1);
      lastTime.current = now;

      let changed = false;
      if (isDraggingRef.current) {
        // Being dragged manually - rotation updated in pointer handler
      } else if (Math.abs(velocity.current) > 0.0005) {
        // Inertia coasting
        rotationRef.current += velocity.current;
        velocity.current *= 0.94; // friction
        changed = true;
      } else if (!isPausedRef.current && !hoveredRef.current) {
        // Constant orbital rotation speed
        rotationRef.current += 0.12 * dt;
        changed = true;
      }

      if (changed) {
        setRenderTick((t) => t + 1);
      }

      animFrameId.current = requestAnimationFrame(loop);
    };

    lastTime.current = performance.now();
    animFrameId.current = requestAnimationFrame(loop);

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, []);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    // Only drag on primary button
    if (e.button !== 0) return;
    setIsDragging(true);
    dragStartX.current = e.clientX;
    lastX.current = e.clientX;
    velocity.current = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    // Subtle mouse parallax tilt
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const normX = (e.clientX - rect.left) / rect.width - 0.5;
      const normY = (e.clientY - rect.top) / rect.height - 0.5;
      setMouseParallax({
        x: normX * 8, // degrees
        y: normY * 6,
      });
    }

    if (!isDragging) return;
    const deltaX = e.clientX - lastX.current;
    lastX.current = e.clientX;

    // Convert pixel delta to angle radians
    const angleDelta = (deltaX / radii.rx) * 1.2;
    rotationRef.current += angleDelta;
    setRenderTick((t) => t + 1);
    velocity.current = angleDelta * 0.4;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored if already released
    }
  };

  // Short category label helper
  const getShortCat = (cat: string) => {
    switch (cat) {
      case "Programming Languages":
        return "LANG";
      case "AI/ML":
        return "AI/ML";
      case "GenAI/LLMs":
        return "GENAI";
      case "Frontend":
        return "FRONTEND";
      case "Backend":
        return "BACKEND";
      case "Databases":
        return "DATA";
      case "DevOps/Cloud":
        return "CLOUD";
      case "Developer Tools":
        return "TOOLS";
      default:
        return "CORE";
    }
  };

  // If in Grid view mode:
  if (viewMode === "grid") {
    return (
      <div className="w-full max-w-6xl mx-auto py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 px-2">
        {skills.map((skill) => {
          const isHovered = hoveredSkillId === skill.id;
          return (
            <div
              key={skill.id}
              onClick={() => {
                playClick();
                onSelectSkill(skill);
              }}
              onMouseEnter={() => {
                playHover();
                setHoveredSkillId(skill.id);
              }}
              onMouseLeave={() => setHoveredSkillId(null)}
              className={`group cursor-pointer select-none rounded-lg p-3 flex flex-col justify-between h-[84px] transition-all duration-300 border ${
                isHovered
                  ? "bg-[#181a24] border-[#b9c7a5] scale-105 shadow-[0_0_20px_rgba(185,199,165,0.2)]"
                  : "bg-[#111218]/90 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[8px] font-mono tracking-wider text-[#828795] uppercase">
                  {getShortCat(skill.category)}
                </span>
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    boxShadow: `0 0 8px ${skill.color}90`,
                  }}
                />
              </div>
              <div className="text-[12px] font-mono font-medium text-[#f2f4ec] tracking-tight leading-tight truncate">
                {skill.name}
              </div>
              <div className="flex items-center justify-between text-[8px] font-mono text-[#828795]">
                {skill.isCore ? (
                  <span className="text-[#b9c7a5] bg-[#b9c7a5]/15 px-1 py-0.5 rounded border border-[#b9c7a5]/30">
                    CORE
                  </span>
                ) : (
                  <span>ACTIVE</span>
                )}
                <span>
                  {skill.relatedProjects.length > 0
                    ? `${skill.relatedProjects.length} PROJ`
                    : "STABLE"}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // If in Flow view mode (vertical cascading tunnel from sec_06):
  if (viewMode === "flow") {
    return (
      <div className="w-full max-w-4xl mx-auto py-12 flex flex-col items-center gap-6 px-4">
        {skills.map((skill, idx) => {
          const isHovered = hoveredSkillId === skill.id;
          return (
            <div
              key={skill.id}
              onClick={() => {
                playClick();
                onSelectSkill(skill);
              }}
              onMouseEnter={() => {
                playHover();
                setHoveredSkillId(skill.id);
              }}
              onMouseLeave={() => setHoveredSkillId(null)}
              className={`w-full max-w-xl cursor-pointer select-none rounded-xl p-5 flex items-center justify-between transition-all duration-300 border ${
                isHovered
                  ? "bg-[#181a24] border-[#b9c7a5] scale-[1.02] shadow-[0_0_25px_rgba(185,199,165,0.25)]"
                  : "bg-[#111218]/85 border-white/10 hover:border-white/20"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xs font-mono text-[#828795] w-6">
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{
                    backgroundColor: skill.color,
                    boxShadow: `0 0 10px ${skill.color}`,
                  }}
                />
                <div className="flex flex-col">
                  <span className="text-base font-serif text-[#f2f4ec] font-normal">
                    {skill.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#828795] uppercase tracking-wider">
                    {skill.category}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {skill.isCore && (
                  <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-[#b9c7a5]/15 text-[#b9c7a5] border border-[#b9c7a5]/30">
                    CORE SYSTEM
                  </span>
                )}
                <span className="text-[10px] font-mono text-[#828795]">
                  {skill.relatedProjects.length} PROJECTS
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  // 3D ORBIT MODE (EXACT VIDEO MATCH)
  const count = skills.length;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative w-full h-[620px] sm:h-[720px] md:h-[780px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing overflow-visible"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "50% 50%",
      }}
    >
      {/* 3D Tilted Ring Plane */}
      <div
        className="relative w-0 h-0 transition-transform duration-75 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateX(${52 + mouseParallax.y}deg) rotateZ(${
            -22 + mouseParallax.x
          }deg)`,
        }}
      >
        {/* Subtle elliptical orbit guide ring */}
        <div
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.04] pointer-events-none"
          style={{
            width: `${radii.rx * 2}px`,
            height: `${radii.ry * 2}px`,
          }}
        />

        {/* Small Size Skill Boxes distributed along the 3D Orbit */}
        {skills.map((skill, index) => {
          const angle = (rotationRef.current + (index * 2 * Math.PI) / count) % (2 * Math.PI);
          const x = radii.rx * Math.cos(angle);
          const y = radii.ry * Math.sin(angle);

          // Calculate depth: larger y is closer to viewer in tilted plane
          const sinA = Math.sin(angle);
          // Scale from ~0.82 in the back to ~1.04 in the front
          const depthScale = 0.82 + (sinA + 1) * 0.11;
          const depthOpacity = 0.55 + (sinA + 1) * 0.225;
          const zIndex = Math.round((sinA + 1) * 50);

          // Tangent angle in degrees to tilt the card along the ellipse curve
          const tangentRad = Math.atan2(
            radii.ry * Math.cos(angle),
            -radii.rx * Math.sin(angle)
          );
          const tangentDeg = (tangentRad * 180) / Math.PI;

          const isHovered = hoveredSkillId === skill.id;

          return (
            <div
              key={skill.id}
              onClick={(e) => {
                e.stopPropagation();
                playClick();
                onSelectSkill(skill);
              }}
              onMouseEnter={() => {
                playHover();
                setHoveredSkillId(skill.id);
                setIsPaused(true);
              }}
              onMouseLeave={() => {
                setHoveredSkillId(null);
                setIsPaused(false);
              }}
              className="absolute left-0 top-0 cursor-pointer pointer-events-auto group"
              style={{
                width: "124px",
                height: "82px",
                marginLeft: "-62px",
                marginTop: "-41px",
                zIndex: isHovered ? 999 : zIndex,
                transformStyle: "preserve-3d",
                transform: `translate3d(${x}px, ${y}px, ${
                  isHovered ? 50 : 0
                }px) rotateZ(${tangentDeg * 0.5}deg) rotateX(-52deg) scale(${
                  isHovered ? depthScale * 1.18 : depthScale
                })`,
                opacity: isHovered ? 1 : depthOpacity,
                transition: isDragging
                  ? "none"
                  : "transform 0.15s ease-out, opacity 0.15s ease-out",
              }}
            >
              {/* The Small Size Box UI */}
              <div
                className={`w-full h-full rounded-lg p-2.5 flex flex-col justify-between transition-all duration-300 border backdrop-blur-md ${
                  isHovered
                    ? "bg-[#181a24] border-[#b9c7a5] shadow-[0_0_24px_rgba(185,199,165,0.35)]"
                    : "bg-[#121319]/95 border-white/10 group-hover:border-white/30"
                }`}
              >
                {/* Top: Category Tag + Skill Color Dot */}
                <div className="flex items-center justify-between">
                  <span className="text-[8px] font-mono tracking-wider text-[#828795] uppercase truncate max-w-[80px]">
                    {getShortCat(skill.category)}
                  </span>
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{
                      backgroundColor: skill.color,
                      boxShadow: `0 0 6px ${skill.color}`,
                    }}
                  />
                </div>

                {/* Center: Skill Name in sharp micro-typography */}
                <div className="my-auto">
                  <div className="text-[12px] font-mono font-medium text-[#f2f4ec] tracking-tight leading-tight truncate">
                    {skill.name}
                  </div>
                </div>

                {/* Bottom: CORE badge & project indicator */}
                <div className="flex items-center justify-between text-[7.5px] font-mono">
                  {skill.isCore ? (
                    <span className="px-1.5 py-0.2 rounded bg-[#b9c7a5]/15 text-[#b9c7a5] border border-[#b9c7a5]/30 font-semibold tracking-wider">
                      CORE
                    </span>
                  ) : (
                    <span className="text-[#828795] tracking-wider">SYSTEM</span>
                  )}
                  <span className="text-[#828795]">
                    {skill.relatedProjects.length > 0
                      ? `${skill.relatedProjects.length}P`
                      : "SPEC"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Orbit Drag / Interaction Helper Hint at bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-[10px] font-mono text-[#828795] tracking-wider uppercase pointer-events-none bg-black/40 px-3 py-1 rounded-full border border-white/5 backdrop-blur-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-[#b9c7a5] animate-pulse" />
        <span>Drag to rotate 360° // Click small box to inspect</span>
      </div>
    </div>
  );
}
