"use client";

import React, { useRef } from "react";
import { ExternalLink, CheckCircle2 } from "lucide-react";
import { CODING_PROFILES } from "@/data/coding";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function CodingSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { playClick, playHover } = useSoundEffects();

  return (
    <section
      id="coding"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Coding & Verified Platforms"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">03 //</span> CODING ARSENAL
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Engineering craft.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
              Live showcase & verified handles.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#828795] max-w-2xl font-mono">
            Showcase demonstration and verified competitive coding profiles. No fabricated contribution graphs.
          </p>
        </div>

        {/* 2-Column: Clean Video + Minimalist Coding Tools (Name & Link) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Video Showcase without any window case/border */}
          <div className="lg:col-span-7 flex justify-center lg:justify-start w-full">
            <div className="relative w-full max-w-[520px] aspect-[720/960] rounded-2xl overflow-hidden bg-black/60 shadow-2xl">
              <video
                ref={videoRef}
                src="https://cdn.recent.design/items/4m1bbar/0/720x960.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/videos/coding-terminal.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>

          {/* Right: Coding Tools — Just Name and Link */}
          <div className="lg:col-span-5 flex flex-col justify-center gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest font-semibold pb-2 border-b border-white/10">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#b9c7a5]" />
              <span>Verified Platforms & Tools</span>
            </div>

            <nav aria-label="Coding Profiles" className="flex flex-col divide-y divide-white/10">
              {CODING_PROFILES.map((profile, idx) => (
                <a
                  key={profile.platform}
                  href={profile.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClick}
                  onMouseEnter={playHover}
                  className="group py-5 flex items-center justify-between text-[#f2f4ec] hover:text-[#b9c7a5] transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-mono text-white/20 group-hover:text-[#b9c7a5] transition-colors">
                      0{idx + 1}
                    </span>
                    <span className="text-2xl sm:text-3xl font-serif tracking-tight group-hover:translate-x-2 transition-transform duration-200">
                      {profile.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-[#828795] group-hover:text-[#b9c7a5] transition-colors">
                    <span className="text-xs uppercase tracking-wider hidden sm:inline opacity-60 group-hover:opacity-100 transition-opacity">
                      Open
                    </span>
                    <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
