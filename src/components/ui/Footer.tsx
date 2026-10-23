"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "@/components/ui/BrandIcons";
import { HLogoGlyph } from "@/components/ui/HLogoGlyph";
import { PROFILE_DATA } from "@/data/profile";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function Footer() {
  const { playClick, playHover } = useSoundEffects();

  const scrollToTop = () => {
    playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#090a0d] text-[#828795] py-12 px-4 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-8 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          {/* Brand Info */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2">
              <HLogoGlyph className="w-4 h-4 text-[#b9c7a5]" />
              <span className="font-veyronix font-bold text-[#f2f4ec] tracking-wider text-sm">
                HIRAMANI CHAUHAN <span className="text-[#828795]">/</span> CODEVERSE
              </span>
            </div>
            <p className="text-xs font-mono text-[#828795] text-center md:text-left">
              {PROFILE_DATA.headline}
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href={PROFILE_DATA.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b9c7a5]/40 hover:bg-[#b9c7a5]/10 text-slate-300 hover:text-[#b9c7a5] transition-all"
              aria-label="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PROFILE_DATA.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b9c7a5]/40 hover:bg-[#b9c7a5]/10 text-slate-300 hover:text-[#b9c7a5] transition-all"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={`mailto:${PROFILE_DATA.socials.email}`}
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b9c7a5]/40 hover:bg-[#b9c7a5]/10 text-slate-300 hover:text-[#b9c7a5] transition-all"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            {PROFILE_DATA.socials.twitter && (
              <a
                href={PROFILE_DATA.socials.twitter}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={playClick}
                className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#b9c7a5]/40 hover:bg-[#b9c7a5]/10 text-slate-300 hover:text-[#b9c7a5] transition-all"
                aria-label="X (Twitter)"
              >
                <TwitterIcon className="w-4 h-4" />
              </a>
            )}

            {/* Back to top button */}
            <button
              onClick={scrollToTop}
              onMouseEnter={playHover}
              className="ml-2 p-2.5 rounded-xl bg-white/5 border border-white/10 hover:bg-[#b9c7a5] hover:text-[#0c0d10] text-[#f2f4ec] transition-all flex items-center gap-1.5 text-xs font-mono"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">TOP</span>
            </button>
          </div>
        </div>

        {/* Sub-footer details */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#828795]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#b9c7a5] animate-pulse" />
            <span>TELEMETRY NOMINAL // SECTOR 01</span>
          </div>
          <div>
            © 2026 Hiramani Chauhan. Built with Next.js, Three.js, R3F & Tailwind.
          </div>
        </div>
      </div>
    </footer>
  );
}
