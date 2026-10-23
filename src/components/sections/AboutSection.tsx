"use client";

import React from "react";
import { GraduationCap, FileText, Terminal } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
import { SceneContainer } from "@/components/3d/SceneContainer";
import { HolographicOrb } from "@/components/3d/HolographicOrb";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function AboutSection() {
  const setIsResumeOpen = usePortfolioStore((state) => state.setIsResumeOpen);
  const { playClick, playHover } = useSoundEffects();

  return (
    <section
      id="about"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="About Hiramani Chauhan"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">06 //</span> BIOGRAPHICAL NOTES
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Personal narrative.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
              Academic foundation & engineering ethics.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#828795] max-w-2xl font-mono">
            Engineering philosophy, academic foundation (MCA & B.Sc.), and technical pursuit of high-performance intelligent software.
          </p>
        </div>

        {/* 2-Column: 3D Holographic Visualizer + Personal Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: 3D Holographic Orb (5 Cols) */}
          <div className="lg:col-span-5 relative w-full h-80 sm:h-[420px] rounded-2xl border border-white/10 bg-[#0c0d10] overflow-hidden shadow-2xl flex flex-col items-center justify-center">
            <div className="absolute top-3 left-3 z-10">
              <span className="px-2.5 py-0.5 rounded-full bg-[#131418]/90 border border-white/10 text-[10px] font-mono text-[#b9c7a5]">
                HOLOGRAPHIC CORE AVATAR
              </span>
            </div>

            <SceneContainer className="w-full h-full" cameraPosition={[0, 0, 5]} fov={40}>
              <HolographicOrb />
            </SceneContainer>

            {/* Bottom HUD Overlay */}
            <div className="absolute bottom-3 left-3 right-3 z-10 p-2.5 rounded-xl bg-[#131418]/90 border border-white/10 backdrop-blur-md flex items-center justify-between text-xs font-mono text-[#828795]">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-[#b9c7a5]" />
                HC-01 // COGNITIVE ARCHITECT
              </span>
              <span className="text-[#b9c7a5] font-semibold">STABLE</span>
            </div>
          </div>

          {/* Right Column: Personal Story & Philosophy (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-5 text-[#9da2af] leading-relaxed font-sans text-sm sm:text-base">
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-[#b9c7a5]">
              <strong className="text-white">MISSION PHILOSOPHY:</strong> {PROFILE_DATA.tagline}
            </div>

            <p>{PROFILE_DATA.aboutStory.paragraph1}</p>
            <p>{PROFILE_DATA.aboutStory.paragraph2}</p>
            <p>{PROFILE_DATA.aboutStory.paragraph3}</p>

            {/* Quick Action to open Resume Modal */}
            <div className="pt-2">
              <button
                onClick={() => {
                  playClick();
                  setIsResumeOpen(true);
                }}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#b9c7a5] text-[#0c0d10] text-xs font-mono font-semibold hover:bg-[#c8d6b4] transition-all shadow-md shadow-[#b9c7a5]/20"
              >
                <FileText className="w-3.5 h-3.5" />
                VIEW FULL CURRICULUM VITAE
              </button>
            </div>
          </div>
        </div>

        {/* Education Timeline: MCA & B.Sc. Details */}
        <div className="flex flex-col gap-4 mt-4">
          <h3 className="text-2xl font-serif text-[#f2f4ec] flex items-center gap-2 font-normal">
            <GraduationCap className="w-5 h-5 text-[#b9c7a5]" />
            Academic Foundations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROFILE_DATA.education.map((edu, idx) => (
              <div
                key={idx}
                onMouseEnter={playHover}
                className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-4 border border-white/10 hover:border-[#b9c7a5]/40 transition-all"
              >
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#b9c7a5]/10 text-[#b9c7a5] border border-[#b9c7a5]/30 font-semibold">
                      {edu.status}
                    </span>
                    <span className="text-xs font-mono text-[#828795]">{edu.duration}</span>
                  </div>

                  <h4 className="text-2xl font-serif text-[#f2f4ec] font-normal mt-1">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-[#c2b9d0]">
                    {edu.field}
                  </span>
                  <span className="text-xs text-[#828795]">
                    {edu.institution}
                  </span>

                  {edu.grade && (
                    <div className="text-xs font-mono text-[#b9c7a5] mt-1">
                      Academic Standing: {edu.grade}
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/5 flex flex-col gap-1.5">
                  <span className="text-[11px] font-mono text-[#828795] font-semibold uppercase tracking-wider">
                    Core Coursework & Research:
                  </span>
                  <ul className="space-y-1 text-xs text-[#9da2af] font-sans">
                    {edu.highlights.map((h, hIdx) => (
                      <li key={hIdx} className="flex items-center gap-2">
                        <span className="text-[#b9c7a5]">•</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
