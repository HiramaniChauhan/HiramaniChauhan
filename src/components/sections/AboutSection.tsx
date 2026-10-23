"use client";

import React from "react";
import { GraduationCap, FileText, Terminal, Award, Sparkles } from "lucide-react";
import { PROFILE_DATA } from "@/data/profile";
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
          {/* Left Column: AIR-06 in NIMCET 2024 (Big Size) */}
          <div className="lg:col-span-5 relative w-full h-[360px] sm:h-[420px] rounded-2xl border border-white/10 bg-[#0c0d10] overflow-hidden shadow-2xl p-7 sm:p-9 flex flex-col justify-between group">
            {/* Ambient Radial Highlights */}
            <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#b9c7a5]/10 rounded-full blur-3xl pointer-events-none group-hover:bg-[#b9c7a5]/15 transition-colors" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#c2b9d0]/10 rounded-full blur-3xl pointer-events-none" />

            {/* Top Label */}
            <div className="flex items-center justify-between z-10">
              <span className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b9c7a5] font-semibold">
                <Award className="w-4 h-4 text-[#b9c7a5]" />
                NATIONAL DISTINCTION
              </span>
              <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#dfcaa5]">
                TOP 0.01%
              </span>
            </div>

            {/* Center: Big Size Typography for AIR-06 in NIMCET 2024 */}
            <div className="my-auto py-4 flex flex-col gap-2 z-10">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-serif text-[#f2f4ec] font-normal tracking-tight leading-none drop-shadow-[0_4px_24px_rgba(255,255,255,0.08)]">
                AIR-06
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
                in NIMCET 2024
              </div>
              <p className="text-xs font-mono text-[#828795] mt-1">
                All India Rank 6 • National Institute of Technology
              </p>
            </div>

            {/* Bottom Telemetry Bar */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono text-[#828795] z-10">
              <span className="flex items-center gap-1.5 text-slate-300">
                <Sparkles className="w-3.5 h-3.5 text-[#b9c7a5]" />
                MCA ENTRANCE EXAMINATION
              </span>
              <span className="text-[#b9c7a5] font-semibold">VERIFIED</span>
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
