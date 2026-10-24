"use client";

import React, { useEffect } from "react";
import { SkillItem } from "@/data/skills";
import { PROJECTS_DATA } from "@/data/projects";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { X, ExternalLink, Sparkles, Layers, Terminal } from "lucide-react";

interface SkillSpotlightModalProps {
  skill: SkillItem | null;
  onClose: () => void;
}

export function SkillSpotlightModal({ skill, onClose }: SkillSpotlightModalProps) {
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const { playClick } = useSoundEffects();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (skill) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [skill, onClose]);

  if (!skill) return null;

  // Find linked projects from PROJECTS_DATA
  const linkedProjects = PROJECTS_DATA.filter((proj) =>
    skill.relatedProjects.includes(proj.id)
  );

  return (
    <div
      onClick={onClose}
      onWheel={(e) => e.stopPropagation()}
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-opacity duration-300"
      aria-modal="true"
      role="dialog"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-xl max-h-[85vh] overflow-y-auto overscroll-contain bg-[#111218] border border-white/15 rounded-2xl p-6 sm:p-8 flex flex-col gap-6 shadow-[0_0_50px_rgba(0,0,0,0.8)]"
      >
        {/* Subtle ambient light glow */}
        <div
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-20"
          style={{ backgroundColor: skill.color }}
        />

        {/* Top Header Row */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: skill.color,
                  boxShadow: `0 0 10px ${skill.color}`,
                }}
              />
              <span className="text-[11px] font-mono tracking-wider text-[#828795] uppercase">
                {skill.category}
              </span>
              {skill.isCore && (
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#b9c7a5]/15 text-[#b9c7a5] border border-[#b9c7a5]/30">
                  CORE EXPERTISE
                </span>
              )}
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              {skill.name}
            </h3>
          </div>

          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-[#828795] hover:text-white transition-colors"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-mono uppercase text-[#828795] tracking-widest flex items-center gap-1.5">
            <Terminal className="w-3 h-3 text-[#b9c7a5]" /> ARCHITECTURAL ROLE
          </span>
          <p className="text-sm sm:text-base text-[#f2f4ec]/90 font-sans leading-relaxed">
            {skill.description}
          </p>
        </div>

        {/* Applied In Projects */}
        {linkedProjects.length > 0 && (
          <div className="flex flex-col gap-3 pt-2 border-t border-white/10">
            <span className="text-[10px] font-mono uppercase text-[#828795] tracking-widest flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-[#b9c7a5]" /> PRODUCTION IMPLEMENTATION
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {linkedProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => {
                    playClick();
                    onClose();
                    setSelectedProject(proj);
                  }}
                  className="group cursor-pointer p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#b9c7a5]/40 transition-all flex items-center justify-between"
                >
                  <div className="flex flex-col">
                    <span className="text-xs font-mono font-medium text-[#f2f4ec] group-hover:text-[#b9c7a5] transition-colors">
                      {proj.title}
                    </span>
                    <span className="text-[9px] font-mono text-[#828795]">
                      {proj.category}
                    </span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-[#828795] group-hover:text-[#b9c7a5] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Footer Actions */}
        <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#828795]">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3 h-3 text-[#b9c7a5]" /> VERIFIED COMPETENCY
          </span>
          <button
            onClick={() => {
              playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-full text-xs font-mono bg-white/10 hover:bg-[#b9c7a5] hover:text-[#0c0d10] text-[#f2f4ec] transition-all font-semibold"
          >
            Close [ESC]
          </button>
        </div>
      </div>
    </div>
  );
}
