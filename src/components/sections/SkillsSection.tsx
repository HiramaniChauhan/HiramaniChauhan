"use client";

import React, { useState } from "react";
import { Search, Orbit, Rows3, Grid3X3 } from "lucide-react";
import { SKILL_CATEGORIES, SKILLS_DATA, SkillItem } from "@/data/skills";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { DotMatrixBackground } from "@/components/ui/DotMatrixBackground";
import { SkillsOrbitalRing } from "@/components/ui/SkillsOrbitalRing";
import { SkillSpotlightModal } from "@/components/ui/SkillSpotlightModal";

export function SkillsSection() {
  const activeSkillFilter = usePortfolioStore((state) => state.activeSkillFilter);
  const setActiveSkillFilter = usePortfolioStore((state) => state.setActiveSkillFilter);
  const hoveredSkillId = usePortfolioStore((state) => state.hoveredSkillId);
  const setHoveredSkillId = usePortfolioStore((state) => state.setHoveredSkillId);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSkill, setSelectedSkill] = useState<SkillItem | null>(null);
  const [viewMode, setViewMode] = useState<"orbit" | "flow" | "grid">("orbit");
  const { playClick, playHover } = useSoundEffects();

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory =
      activeSkillFilter === "All" || skill.category === activeSkillFilter;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section
      id="skills"
      className="relative min-h-screen w-full py-16 sm:py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0a0b0e]"
      aria-label="Skills Matrix"
    >
      {/* Authentic Reference Dot-Matrix Background (exact dot typography from reference video) */}
      <DotMatrixBackground text="SA20" />

      {/* MAIN CONTAINER */}
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-8 relative z-10 my-auto py-6">
        {/* Section Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
              <span className="text-[#b9c7a5] font-bold">02 //</span> TECHNICAL CAPABILITIES
            </div>
            <div className="flex flex-col">
              <h2 className="text-3xl sm:text-5xl font-serif text-[#f2f4ec] font-normal tracking-tight">
                System foundations.
              </h2>
            </div>
          </div>

          {/* View Mode Switcher: Orbit 3D, Stream Flow, Grid Matrix */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => {
                playClick();
                setViewMode("orbit");
              }}
              onMouseEnter={playHover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === "orbit"
                  ? "bg-[#b9c7a5] text-[#0c0d10] font-semibold shadow-sm"
                  : "text-[#828795] hover:text-white"
              }`}
              title="3D Orbital Ring"
            >
              <Orbit className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">3D ORBIT</span>
            </button>
            <button
              onClick={() => {
                playClick();
                setViewMode("flow");
              }}
              onMouseEnter={playHover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === "flow"
                  ? "bg-[#b9c7a5] text-[#0c0d10] font-semibold shadow-sm"
                  : "text-[#828795] hover:text-white"
              }`}
              title="Cascade Stream"
            >
              <Rows3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">FLOW</span>
            </button>
            <button
              onClick={() => {
                playClick();
                setViewMode("grid");
              }}
              onMouseEnter={playHover}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === "grid"
                  ? "bg-[#b9c7a5] text-[#0c0d10] font-semibold shadow-sm"
                  : "text-[#828795] hover:text-white"
              }`}
              title="Matrix Grid"
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">GRID</span>
            </button>
          </div>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            <button
              onClick={() => {
                playClick();
                setActiveSkillFilter("All");
              }}
              onMouseEnter={playHover}
              className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                activeSkillFilter === "All"
                  ? "bg-[#b9c7a5] text-[#0c0d10] font-semibold"
                  : "bg-white/5 text-[#828795] hover:bg-white/10 hover:text-white"
              }`}
            >
              All ({SKILLS_DATA.length})
            </button>
            {SKILL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  playClick();
                  setActiveSkillFilter(cat);
                }}
                onMouseEnter={playHover}
                className={`px-3 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                  activeSkillFilter === cat
                    ? "bg-[#b9c7a5] text-[#0c0d10] font-semibold"
                    : "bg-white/5 text-[#828795] hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[220px]">
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search skill (e.g. PyTorch, Next.js)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl glass-input text-xs font-mono"
            />
          </div>
        </div>

        {/* 3D ORBITAL RING OF SMALL SIZE BOXES */}
        <div className="relative w-full flex items-center justify-center">
          <SkillsOrbitalRing
            skills={filteredSkills}
            onSelectSkill={(skill) => setSelectedSkill(skill)}
            hoveredSkillId={hoveredSkillId}
            setHoveredSkillId={setHoveredSkillId}
            viewMode={viewMode}
          />
        </div>
      </div>

      {/* Detail Modal when any small box is clicked */}
      <SkillSpotlightModal
        skill={selectedSkill}
        onClose={() => setSelectedSkill(null)}
      />
    </section>
  );
}
