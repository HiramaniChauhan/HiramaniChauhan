"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Volume2, VolumeX, Menu, X } from "lucide-react";
import { SectionId, usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";
import { HLogoGlyph } from "@/components/ui/HLogoGlyph";

interface NavItem {
  id: SectionId;
  index: string;
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", index: "00", label: "Home", href: "#home" },
  { id: "work", index: "01", label: "Work", href: "#work" },
  { id: "skills", index: "02", label: "Skills", href: "#skills" },
  { id: "coding", index: "03", label: "Coding", href: "#coding" },
  { id: "experience", index: "04", label: "Experience", href: "#experience" },
  { id: "certificates", index: "05", label: "Certificates", href: "#certificates" },
  { id: "about", index: "06", label: "About", href: "#about" },
  { id: "contact", index: "07", label: "Contact", href: "#contact" },
];

export function Navbar() {
  const activeSection = usePortfolioStore((state) => state.activeSection);
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);
  const isSoundEnabled = usePortfolioStore((state) => state.isSoundEnabled);
  const toggleSound = usePortfolioStore((state) => state.toggleSound);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { playHover, playClick } = useSoundEffects();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (id: SectionId) => {
    playClick();
    setActiveSection(id);
    setIsMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled
            ? "py-2.5 bg-[#0c0d10]/95 backdrop-blur-md border-white/[0.08] shadow-md shadow-black/50"
            : "py-3.5 bg-[#0c0d10]/75 backdrop-blur-sm border-white/[0.06]"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          {/* Left Brand Identity: Monogram + Stacked Name (inspired by Aniket Mani) */}
          <Link
            href="#home"
            onClick={() => handleNavClick("home")}
            onMouseEnter={playHover}
            className="group flex items-center gap-3 focus:outline-none select-none"
            aria-label="Hiramani Chauhan Home"
          >
            {/* Serif Monogram with Sage 8-Point Asterisk */}
            <div className="relative flex items-start">
              <span className="font-serif text-2xl sm:text-[1.7rem] font-normal tracking-tight text-[#f2f4ec] leading-none group-hover:text-[#b9c7a5] transition-colors">
                am
              </span>
              {/* Sage 8-spoke asterisk */}
              <svg
                viewBox="0 0 16 16"
                className="w-2.5 h-2.5 text-[#b9c7a5] -mt-1 -ml-0.5 flex-shrink-0 transition-transform group-hover:rotate-45 duration-300"
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
              <span className="font-mono text-[11px] sm:text-[11.5px] font-medium tracking-[0.14em] text-[#f2f4ec] uppercase group-hover:text-white transition-colors">
                HIRAMANI CHAUHAN
              </span>
              <span className="font-mono text-[9px] sm:text-[9.5px] tracking-[0.16em] text-[#8e94a0] uppercase">
                SOFTWARE & SYSTEMS
              </span>
            </div>
          </Link>

          {/* Desktop Right Navigation (Small, Refined, Minimalist) */}
          <div className="hidden lg:flex items-center gap-5 xl:gap-7">
            <nav className="flex items-center gap-5 xl:gap-7" aria-label="Main Navigation">
              {NAV_ITEMS.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={() => handleNavClick(item.id)}
                    onMouseEnter={playHover}
                    className={`relative group inline-flex items-baseline py-1 transition-colors duration-200 ${isActive ? "text-[#f2f4ec]" : "text-[#8e94a0] hover:text-[#f2f4ec]"
                      }`}
                  >
                    {/* Small Muted Index Number */}
                    <span className="text-[9.5px] font-mono text-[#626773] mr-1 select-none transition-colors group-hover:text-[#8e94a0]">
                      {item.index}
                    </span>

                    {/* Small Clean Nav Label */}
                    <span className="text-xs font-sans font-normal tracking-normal transition-colors">
                      {item.label}
                    </span>

                    {/* Active Pale Sage Dot */}
                    {isActive && (
                      <span
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#b9c7a5] shadow-[0_0_6px_rgba(185,199,165,0.8)] animate-in fade-in zoom-in duration-300"
                        aria-hidden="true"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Small Audio Mute/Unmute Toggle Button */}
            <button
              onClick={() => {
                playClick();
                toggleSound();
              }}
              onMouseEnter={playHover}
              className={`w-6 h-6 rounded-full border transition-all duration-200 flex items-center justify-center ${isSoundEnabled
                  ? "bg-[#b9c7a5]/15 border-[#b9c7a5]/40 text-[#b9c7a5]"
                  : "bg-white/5 border-white/10 text-[#6d7280] hover:text-white"
                }`}
              title={isSoundEnabled ? "Mute Ambient Audio" : "Unmute Ambient Audio"}
              aria-label="Toggle Audio"
            >
              {isSoundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </button>
          </div>

          {/* Mobile / Tablet Controls */}
          <div className="lg:hidden flex items-center gap-1.5">
            <button
              onClick={() => {
                playClick();
                toggleSound();
              }}
              className={`w-6 h-6 rounded-full border transition-all duration-200 flex items-center justify-center ${isSoundEnabled
                  ? "bg-[#b9c7a5]/15 border-[#b9c7a5]/40 text-[#b9c7a5]"
                  : "bg-white/5 border-white/10 text-[#6d7280]"
                }`}
              aria-label="Toggle Audio"
            >
              {isSoundEnabled ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3" />}
            </button>

            <button
              onClick={() => {
                playClick();
                setIsMobileOpen(!isMobileOpen);
              }}
              className="p-1.5 rounded bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {isMobileOpen ? <X className="w-3.5 h-3.5 text-[#b9c7a5]" /> : <Menu className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-down Drawer */}
      {isMobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          className="lg:hidden fixed inset-0 z-40 bg-[#0c0d10]/95 backdrop-blur-xl pt-20 px-6 pb-8 flex flex-col justify-between animate-in fade-in duration-200 border-b border-white/10"
        >
          <div className="flex flex-col gap-2">
            <div className="text-[10px] font-mono text-[#626773] uppercase tracking-widest mb-1 px-3">
              Section Index
            </div>
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={() => handleNavClick(item.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded font-mono text-xs transition-all ${isActive
                      ? "bg-white/5 text-[#f2f4ec] font-medium"
                      : "text-[#8e94a0] hover:text-[#f2f4ec]"
                    }`}
                >
                  <span className="flex items-center gap-2.5">
                    <span className="text-[10px] text-[#626773] font-mono">{item.index}</span>
                    <span className="font-sans text-xs">{item.label}</span>
                  </span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#b9c7a5] shadow-[0_0_6px_rgba(185,199,165,0.8)]" />
                  )}
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-[#6d7280]">
            <span>CODEVERSE // HIRAMANI CHAUHAN</span>
            <span className="text-[#b9c7a5] flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-[#b9c7a5]" />
              ONLINE
            </span>
          </div>
        </div>
      )}
    </>
  );
}
