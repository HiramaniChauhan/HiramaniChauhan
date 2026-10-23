"use client";

import React, { useRef, useState } from "react";
import { Code, ExternalLink, CheckCircle2, Play, Pause, Volume2, VolumeX, Maximize2 } from "lucide-react";
import { CODING_PROFILES } from "@/data/coding";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function CodingSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const { playClick, playHover } = useSoundEffects();

  const togglePlay = () => {
    playClick();
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    playClick();
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleFullscreen = () => {
    playClick();
    if (!videoRef.current) return;
    if (videoRef.current.requestFullscreen) {
      videoRef.current.requestFullscreen();
    }
  };

  return (
    <section
      id="coding"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Coding & Verified Platforms"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
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

        {/* 2-Column: Showcase Video + Verified Profiles */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Video Showcase (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-white/10 bg-[#090a0d] shadow-2xl overflow-hidden flex flex-col group relative">
            {/* Top Window Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-[#131418] border-b border-white/5 z-20">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/70 inline-block" />
                <span className="ml-2 font-mono text-xs text-slate-300 flex items-center gap-2 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  showcase: computational_matrix.mp4
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[#b9c7a5]">
                  720 × 960 HD
                </span>
                <span className="text-[10px] font-mono text-[#828795]">LIVE RUNTIME</span>
              </div>
            </div>

            {/* Video Player Container */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] lg:h-[480px] bg-black overflow-hidden flex items-center justify-center">
              <video
                ref={videoRef}
                src="https://cdn.recent.design/items/4m1bbar/0/720x960.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              >
                <source src="/videos/coding-terminal.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Subtle Ambient Vignette & Scanline overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Hover Floating Controls */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-md bg-[#0c0d10]/80 border border-white/10 rounded-xl px-4 py-2 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <button
                    onClick={togglePlay}
                    onMouseEnter={playHover}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    onMouseEnter={playHover}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  <span className="text-[#828795] text-[11px]">
                    {isPlaying ? "PLAYING" : "PAUSED"}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleFullscreen}
                    onMouseEnter={playHover}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-white transition-colors"
                    aria-label="Full screen"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Profiles (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-xs font-mono text-[#828795] uppercase tracking-widest font-semibold flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#b9c7a5]" />
              Verified Coding Platforms
            </span>

            {CODING_PROFILES.map((profile) => (
              <a
                key={profile.platform}
                href={profile.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={playClick}
                onMouseEnter={playHover}
                className="glass-card p-4 rounded-xl flex items-center justify-between group hover:border-[#b9c7a5]/40 transition-all"
              >
                <div className="flex items-center gap-3.5">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center border font-mono text-sm font-bold"
                    style={{
                      borderColor: "rgba(255, 255, 255, 0.08)",
                      backgroundColor: "rgba(255, 255, 255, 0.02)",
                      color: profile.color,
                    }}
                  >
                    <Code className="w-4 h-4" />
                  </div>

                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-base text-[#f2f4ec] group-hover:text-[#b9c7a5] transition-colors">
                        {profile.name}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#828795]">
                        @{profile.handle}
                      </span>
                    </div>
                    <span className="text-xs text-[#828795] font-sans mt-0.5">
                      {profile.description}
                    </span>
                  </div>
                </div>

                <ExternalLink className="w-4 h-4 text-slate-600 group-hover:text-[#b9c7a5] transition-colors shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
