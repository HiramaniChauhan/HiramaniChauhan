"use client";

import React from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
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
          {/* Brand Info - Exact same as left top */}
          <div className="flex items-center gap-3 select-none">
            {/* Serif Monogram with Sage 8-Point Asterisk */}
            <div className="relative flex items-start">
              <span className="font-serif text-2xl sm:text-[1.7rem] font-normal tracking-tight text-[#f2f4ec] leading-none">
                hc
              </span>
              {/* Sage 8-spoke asterisk */}
              <svg
                viewBox="0 0 16 16"
                className="w-2.5 h-2.5 text-[#b9c7a5] -mt-1 -ml-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <line x1="8" y1="1.5" x2="8" y2="14.5" />
                <line x1="1.5" y1="8" x2="14.5" y2="8" />
                <line x1="3.4" y1="3.4" x2="12.6" y2="12.6" />
                <line x1="12.6" y1="3.4" x2="3.4" y2="12.6" />
              </svg>
            </div>

            {/* Stacked Name & Subtitle in Mono */}
            <div className="flex flex-col justify-center leading-tight">
              <span className="font-mono text-[11px] sm:text-[11.5px] font-medium tracking-[0.14em] text-[#f2f4ec] uppercase">
                HIRAMANI CHAUHAN
              </span>
              <span className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.16em] text-[#8e94a0] uppercase">
                SOFTWARE & SYSTEMS
              </span>
            </div>
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
              href={
                PROFILE_DATA.socials.whatsapp
                  ? PROFILE_DATA.socials.whatsapp.startsWith("http")
                    ? PROFILE_DATA.socials.whatsapp
                    : `https://wa.me/${PROFILE_DATA.socials.whatsapp.replace(/[\s\-\+]/g, "")}`
                  : "#"
              }
              target={PROFILE_DATA.socials.whatsapp ? "_blank" : undefined}
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="p-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#25D366]/50 hover:bg-[#25D366]/10 text-slate-300 hover:text-[#25D366] transition-all"
              aria-label="WhatsApp"
              title="Chat on WhatsApp"
            >
              <WhatsappIcon className="w-4 h-4" />
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
          <div>
            © 2026 Hiramani Chauhan.
          </div>
        </div>
      </div>
    </footer>
  );
}
