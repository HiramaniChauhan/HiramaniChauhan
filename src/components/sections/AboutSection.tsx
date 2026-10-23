"use client";

import React from "react";
import { GraduationCap, FileText } from "lucide-react";
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
          {/* Left Column: AIR-06 in NIMCET 2024 (Simple, No Background Card) */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-4 py-4">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#b9c7a5] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#b9c7a5]" />
              <span>NIMCET 2024 • ALL INDIA RANK</span>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="text-6xl sm:text-7xl lg:text-8xl font-serif text-[#f2f4ec] font-normal tracking-tight leading-none">
                AIR-06
              </div>
              <div className="text-2xl sm:text-3xl lg:text-4xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
                in NIMCET 2024
              </div>
            </div>

            <p className="text-xs sm:text-sm font-mono text-[#828795]">
              Ranked 6th nationwide in the National Institute of Technology MCA Common Entrance Test.
            </p>
          </div>

          {/* Right Column: Personal Narrative (Inspired by Reference) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-[#9da2af] leading-relaxed font-sans">
            {/* Top Intro Block */}
            <div className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-widest text-[#828795]">
                ABOUT ME
              </span>
              <h3 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight leading-[1.08]">
                Hi, I&apos;m <span className="italic text-[#c2b9d0]">Hiramani.</span>
              </h3>
              <p className="text-base sm:text-lg text-[#b8bcc8] font-sans leading-relaxed pt-1">
                I&apos;m studying computer applications at NIT Tiruchirappalli, and building projects to understand software from the inside out.
              </p>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-white/10" />

            {/* What Interests Me Section */}
            <div className="flex flex-col gap-3">
              <h4 className="text-2xl sm:text-3xl font-serif text-[#f2f4ec] font-normal">
                What interests me
              </h4>
              <div className="space-y-4 text-sm sm:text-base text-[#9da2af] leading-relaxed font-sans">
                <p>
                  I like working on problems that cross layers: a network protocol underneath a downloader, a queue behind an application, or a retrieval pipeline behind an AI response.
                </p>
                <p>
                  That&apos;s why my projects look quite different from one another. Some involve user-facing products. Others go deeper into networking, distributed services, or information retrieval.
                </p>
              </div>
            </div>

            {/* Quick Action to open Resume Modal */}
            <div className="pt-1">
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

        {/* Academic Foundations: Simple (No Background Cards) */}
        <div className="flex flex-col gap-6 mt-6 pt-6 border-t border-white/10">
          <h3 className="text-xl sm:text-2xl font-serif text-[#f2f4ec] flex items-center gap-2 font-normal">
            <GraduationCap className="w-5 h-5 text-[#b9c7a5]" />
            Academic Foundations
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-14">
            {PROFILE_DATA.education.map((edu, idx) => (
              <div key={idx} className="flex flex-col gap-1.5">
                <div className="flex items-baseline justify-between gap-4">
                  <h4 className="text-xl sm:text-2xl font-serif text-[#f2f4ec] font-normal">
                    {edu.degree}
                  </h4>
                  <span className="text-xs font-mono text-[#b9c7a5] shrink-0">
                    {edu.duration}
                  </span>
                </div>
                <span className="text-xs sm:text-sm font-mono text-[#828795]">
                  {edu.institution}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
