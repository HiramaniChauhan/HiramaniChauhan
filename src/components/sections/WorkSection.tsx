"use client";

import React, { useState } from "react";
import { Project, PROJECTS_DATA } from "@/data/projects";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { MovingWorkCards } from "@/components/ui/MovingWorkCards";
import { ChevronRight } from "lucide-react";

export function WorkSection() {
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const { playChime, playHover, playClick } = useSoundEffects();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOpenProject = (project: Project) => {
    playChime(660, 0.3);
    setSelectedProject(project);
  };

  return (
    <section
      id="work"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Work and Projects"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col gap-8">
          {/* Label */}
          <div className="flex items-center gap-6">
            <span className="text-xs font-mono text-[#828795] tracking-widest uppercase">
              01 — THE WORK
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left: Asterisk + Editorial Headline */}
            <div className="lg:col-span-8 flex items-start gap-5">
              <div className="text-2xl sm:text-3xl text-[#b9c7a5] font-mono leading-none select-none shrink-0 pt-1">
                ✳
              </div>
              <div className="flex flex-col">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight leading-[1.05]">
                  Different paths.
                </h2>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight leading-[1.05]">
                  Built from the same curiosity.
                </h2>
              </div>
            </div>

            {/* Right: Description */}
            <div className="lg:col-span-4 text-xs sm:text-sm font-sans text-[#828795] leading-relaxed">
              From civic applications and asynchronous networking to neural video telemetry and financial decision support. A collection of things I have built to understand how software works, and what it can do.
            </div>
          </div>

          {/* Sub-bar Divider */}
          <div className="pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4 text-xs font-mono text-[#828795]">
            <span className="tracking-widest uppercase text-slate-300">
              SELECTED WORK / {PROJECTS_DATA.length} ENTRIES
            </span>
            <span className="text-[11px] font-mono text-[#828795] uppercase">
              DRAG OR SWITCH VIEW (S / G / O) TO EXPLORE
            </span>
          </div>
        </div>

        {/* ═══ SPLIT LAYOUT: Project List (Left) + 3D Carousel (Right) ═══ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-6 items-stretch">
          {/* ── LEFT: Numbered Project List ── */}
          <div className="lg:col-span-4 flex flex-col justify-center gap-0 py-4 lg:pr-6 lg:border-r lg:border-white/[0.06]">
            {PROJECTS_DATA.map((proj, idx) => {
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={proj.id}
                  onClick={() => handleOpenProject(proj)}
                  onMouseEnter={() => {
                    playHover();
                    setHoveredIndex(idx);
                  }}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className={`group cursor-pointer flex items-start gap-4 py-5 px-3 rounded-xl transition-all duration-300 border border-transparent ${
                    isHovered
                      ? "bg-[#151720] border-white/10 shadow-lg shadow-black/30"
                      : "hover:bg-[#111318]/60"
                  }`}
                >
                  {/* Number Index */}
                  <span
                    className={`text-2xl sm:text-3xl font-mono font-bold leading-none tabular-nums transition-colors duration-300 shrink-0 mt-0.5 ${
                      isHovered ? "text-[#b9c7a5]" : "text-white/15"
                    }`}
                  >
                    {String(idx + 1).padStart(2, "0")}
                  </span>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                    <h3
                      className={`text-base sm:text-lg font-serif font-normal leading-snug transition-colors duration-300 ${
                        isHovered ? "text-[#b9c7a5]" : "text-[#f2f4ec]"
                      }`}
                    >
                      {proj.title}
                    </h3>

                    {/* Category & Status Row */}
                    <div className="flex items-center gap-3 text-[10px] font-mono uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ backgroundColor: proj.planetColor }}
                        />
                        <span style={{ color: proj.planetColor }} className="font-semibold">
                          {proj.category}
                        </span>
                      </span>
                      <span className="text-[#626773]">·</span>
                      <span className="text-[#626773]">{proj.status}</span>
                    </div>

                    {/* Tagline (visible on hover) */}
                    <p
                      className={`text-[11px] text-[#828795] font-sans leading-relaxed line-clamp-2 transition-all duration-300 ${
                        isHovered
                          ? "opacity-100 max-h-20 mt-1"
                          : "opacity-0 max-h-0 mt-0 overflow-hidden"
                      }`}
                    >
                      {proj.tagline}
                    </p>

                    {/* Inspect CTA */}
                    <div
                      className={`flex items-center gap-1 text-[10px] font-mono transition-all duration-300 ${
                        isHovered
                          ? "text-[#b9c7a5] opacity-100 translate-x-0"
                          : "text-[#b9c7a5] opacity-0 -translate-x-2"
                      }`}
                    >
                      <span className="group-hover:underline">Inspect project</span>
                      <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ── RIGHT: 3D Moving Cards ── */}
          <div className="lg:col-span-8 min-h-[500px] sm:min-h-[600px] flex items-center justify-center">
            <MovingWorkCards onSelectProject={handleOpenProject} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
