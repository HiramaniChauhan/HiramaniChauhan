"use client";

import React from "react";
import { ArrowDown, FileText, Compass } from "lucide-react";
import { SceneContainer } from "@/components/3d/SceneContainer";
import { Hero3DCore } from "@/components/3d/Hero3DCore";
import { HLogoGlyph } from "@/components/ui/HLogoGlyph";
import { CentralSauronEye } from "@/components/ui/CentralSauronEye";
import { PROFILE_DATA } from "@/data/profile";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function HeroSection() {
  const { playClick, playHover } = useSoundEffects();

  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden pt-24 pb-8 px-4 sm:px-8 lg:px-12 bg-[#0c0d12]"
      aria-label="Home / Hero"
    >
      {/* 3D WebGL Background Canvas - Atmospheric architectural corridor */}
      <div className="absolute inset-0 z-0">
        <SceneContainer className="w-full h-full" cameraPosition={[0, 0.5, 6]} fov={48}>
          <Hero3DCore />
        </SceneContainer>
      </div>

      {/* Atmospheric Soft Vignette Scrim */}
      <div className="absolute inset-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_25%,rgba(12,13,18,0.5)_70%,#0c0d12_100%)]" />
      <div className="absolute inset-0 z-[1] pointer-events-none bg-gradient-to-b from-[#0c0d12]/50 via-transparent to-[#0c0d12]" />

      {/* Top Telemetry Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-start justify-between text-xs font-mono text-[#828795]">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded border border-white/10 bg-[#121317]/80 flex items-center justify-center text-[#b9c7a5]">
            <HLogoGlyph className="w-3.5 h-3.5 text-[#b9c7a5]" />
          </div>
          <span className="text-[#b9c7a5] font-bold">01 //</span>
          <span className="tracking-widest uppercase text-slate-300">CODEVERSE • ARCHIVE</span>
        </div>

      </div>

      {/* Central Hero Section: Monumental Name + Central Sauron Eye focusing yellow light on mouse */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8 sm:py-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12">
        {/* Left Column: Hero Name & CTAs */}
        <div className="flex flex-col items-start max-w-2xl z-20">
          {/* Subtle horizontal blueprint alignment guide (inspired by Veyronix banner texture) */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-[#b9c7a5]/40 via-white/10 to-transparent mb-5 pointer-events-none" />

          <div className="flex flex-col select-none font-veyronix tracking-[-0.02em]">
            {/* HIRAMANI with custom architectural "H" glyph */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] text-[#f2f4ec] font-black leading-[0.92] flex items-center flex-wrap">
              <span className="inline-flex items-center">
                <HLogoGlyph className="h-[0.74em] w-auto inline-block text-[#f2f4ec] mr-[0.06em] flex-shrink-0 align-middle drop-shadow-[0_4px_16px_rgba(255,255,255,0.12)]" />
                <span>IRAMANI</span>
              </span>
            </h1>

            {/* CHAUHAN with custom architectural "H" glyphs */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[6.25rem] text-[#f2f4ec] font-black leading-[0.92] flex items-center flex-wrap mt-1">
              <span className="inline-flex items-center text-[#c2b9d0]">
                <span>C</span>
                <HLogoGlyph className="h-[0.74em] w-auto inline-block text-[#c2b9d0] mx-[0.03em] flex-shrink-0 align-middle drop-shadow-[0_4px_16px_rgba(194,185,208,0.12)]" />
                <span>AU</span>
                <HLogoGlyph className="h-[0.74em] w-auto inline-block text-[#c2b9d0] mx-[0.03em] flex-shrink-0 align-middle drop-shadow-[0_4px_16px_rgba(194,185,208,0.12)]" />
                <span>AN</span>
              </span>
              <span className="inline-block w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-[#b9c7a5] ml-2 mb-2 shadow-sm shadow-[#b9c7a5]/40" />
            </h1>
          </div>

          {/* Left Side Academic & Philosophy Note */}
          <div className="mt-7 flex items-start gap-3 max-w-lg text-xs sm:text-sm font-mono text-[#9da2af] leading-relaxed">
            <span className="text-[#b9c7a5] font-bold text-base leading-none select-none">+</span>
            <p>
              MCA in Computer Science & Applications.
              <br />
              Building intelligent software. Understanding distributed systems.
              <br />
              Exploring what comes next.
            </p>
          </div>

          {/* Action CTAs - Extra Small / Minimalist */}
          <div className="mt-6 flex items-center gap-2.5 flex-wrap">
            <a
              href="#work"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#b9c7a5] text-[#0c0d10] font-mono text-[10px] font-semibold tracking-wider hover:bg-[#c8d6b4] transition-all duration-300 shadow-sm shadow-[#b9c7a5]/20 hover:scale-105"
            >
              <Compass className="w-3 h-3 text-[#0c0d10]" />
              ENTER THE ARCHIVE
            </a>

            <a
              href={PROFILE_DATA.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#16171d]/80 hover:bg-[#1f2127] border border-white/10 text-[#f2f4ec] font-mono text-[10px] tracking-wider transition-all duration-300 hover:border-[#b9c7a5]/50"
            >
              <FileText className="w-3 h-3 text-[#b9c7a5]" />
              CURRICULUM VITAE
            </a>
          </div>
        </div>

        {/* Center Focal Eye: The Eye of Sauron focused on the mouse cursor */}
        <div className="w-full lg:w-auto flex-1 flex items-center justify-center z-10 py-6 lg:py-0">
          <CentralSauronEye />
        </div>
      </div>

      {/* Bottom Architectural Metadata Bar */}
      <div className="relative z-10 w-full max-w-7xl mx-auto pt-6 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[11px] font-mono text-[#828795]">
        {/* Scroll Indicator */}
        <a
          href="#work"
          onClick={playClick}
          className="flex items-center gap-2 text-slate-300 hover:text-[#b9c7a5] transition-colors group"
        >
          <span className="tracking-widest uppercase">SCROLL TO EXPLORE</span>
          <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center group-hover:border-[#b9c7a5] transition-colors">
            <ArrowDown className="w-3 h-3 text-[#b9c7a5] transition-transform group-hover:translate-y-0.5" />
          </div>
        </a>

        {/* Center Pillars */}
        <div className="tracking-widest uppercase text-slate-400 hidden md:block">
          CODE • SYSTEMS • AI ARCHITECTURE
        </div>

        {/* Right Location Stamp */}
        <div className="tracking-widest uppercase text-slate-400">
          INDIA // REMOTE READY
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
