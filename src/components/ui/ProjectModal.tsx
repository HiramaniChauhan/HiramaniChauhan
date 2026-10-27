"use client";

import React, { useEffect } from "react";
import { X, ExternalLink, AlertCircle, CheckCircle2, Cpu, Layers, Sparkles, ShieldAlert, Video } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function ProjectModal() {
  const selectedProject = usePortfolioStore((state) => state.selectedProject);
  const setSelectedProject = usePortfolioStore((state) => state.setSelectedProject);
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    if (!selectedProject) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Lock background webpage scroll while modal is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedProject, setSelectedProject]);

  if (!selectedProject) return null;

  const handleClose = () => {
    playClick();
    setSelectedProject(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-4xl max-h-[90vh] sm:max-h-[88vh] overflow-y-auto overscroll-contain bg-[#111217] border border-white/10 rounded-2xl shadow-2xl text-[#edece8] p-4 sm:p-6 md:p-8 flex flex-col gap-5 sm:gap-6 custom-modal-scroll"
        style={{
          WebkitOverflowScrolling: "touch",
        }}
      >
        <style>{`
          .custom-modal-scroll::-webkit-scrollbar {
            width: 6px;
          }
          .custom-modal-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.04);
            border-radius: 9999px;
          }
          .custom-modal-scroll::-webkit-scrollbar-thumb {
            background: rgba(185, 199, 165, 0.35);
            border-radius: 9999px;
          }
          .custom-modal-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(185, 199, 165, 0.65);
          }
        `}</style>

        {/* Sticky Header Bar */}
        <div className="sticky -top-4 sm:-top-6 md:-top-8 -mt-4 sm:-mt-6 md:-mt-8 -mx-4 sm:-mx-6 md:-mx-8 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6 md:pt-8 pb-3.5 sm:pb-4 bg-[#111217]/95 backdrop-blur-md z-20 flex items-start justify-between gap-3 sm:gap-4 border-b border-white/10 rounded-t-2xl">
          <div className="flex flex-col gap-1 sm:gap-1.5">
            <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
              <span
                className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono font-medium border"
                style={{
                  color: selectedProject.planetColor,
                  borderColor: `${selectedProject.planetColor}50`,
                  backgroundColor: `${selectedProject.planetColor}15`,
                }}
              >
                {selectedProject.category}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-mono bg-white/5 border border-white/10 text-slate-300">
                STATUS: {selectedProject.status}
              </span>
            </div>
            <h2 id="project-modal-title" className="text-xl sm:text-2xl md:text-3xl font-serif text-[#f2f4ec] font-normal tracking-tight mt-0.5 sm:mt-1">
              {selectedProject.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#c2b9d0] font-mono">
              {selectedProject.tagline}
            </p>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={playHover}
            className="p-1.5 sm:p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-[#b9c7a5]/20 hover:border-[#b9c7a5] text-slate-300 hover:text-white transition-colors shrink-0"
            aria-label="Close Project Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Action CTAs */}
        <div className="flex items-center gap-2.5 sm:gap-3 flex-wrap">
          {selectedProject.demoUrl && (
            <a
              href={selectedProject.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex-1 min-[420px]:flex-initial justify-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#b9c7a5] text-[#0c0d10] text-xs font-mono font-bold hover:bg-[#c8d6b4] transition-all shadow-md shadow-[#b9c7a5]/20"
            >
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              Live Demo
              {selectedProject.isPlaceholderDemo && (
                <span className="text-[10px] opacity-75 font-normal">(Preview URL)</span>
              )}
            </a>
          )}

          {selectedProject.githubUrl && (
            <a
              href={selectedProject.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex-1 min-[420px]:flex-initial justify-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-white text-xs font-mono hover:bg-white/10 transition-all"
            >
              <GithubIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#b9c7a5]" />
              Source Code
              {selectedProject.isPlaceholderGithub && (
                <span className="text-[10px] text-slate-400">(Configurable)</span>
              )}
            </a>
          )}

          {/* Video Demo Button beside GitHub button */}
          <a
            href={selectedProject.videoUrl || "#"}
            target={selectedProject.videoUrl && selectedProject.videoUrl !== "#" ? "_blank" : undefined}
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={(e) => {
              playClick();
              if (!selectedProject.videoUrl || selectedProject.videoUrl === "#") {
                e.preventDefault();
                alert("Please paste your Google Drive video demo link in src/data/projects.ts for this project!");
              }
            }}
            className="flex-1 min-[420px]:flex-initial justify-center inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono hover:bg-purple-500/20 hover:border-purple-400 transition-all shadow-sm"
            title="Watch Video Demo on Google Drive"
          >
            <Video className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
            <span>Video Demo</span>
            {(!selectedProject.videoUrl || selectedProject.videoUrl === "#") && (
              <span className="text-[10px] text-purple-400/70 font-normal">(Drive Link)</span>
            )}
          </a>
        </div>

        {/* Core Narrative: Problem & Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/20 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-red-300 font-mono text-xs font-semibold uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              The Problem Space
            </div>
            <p className="text-xs sm:text-sm text-[#9da2af] leading-relaxed font-mono">
              {selectedProject.problem}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-[#b9c7a5]/10 border border-[#b9c7a5]/30 flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[#b9c7a5] font-mono text-xs font-semibold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              The Architectural Solution
            </div>
            <p className="text-xs sm:text-sm text-[#9da2af] leading-relaxed font-mono">
              {selectedProject.solution}
            </p>
          </div>
        </div>

        {/* System Architecture */}
        <div className="flex flex-col gap-2.5">
          <h3 className="text-xs font-mono font-bold tracking-wider text-[#b9c7a5] uppercase flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#b9c7a5]" />
            System Architecture & Pipeline Flow
          </h3>
          <ul className="grid grid-cols-1 gap-2">
            {selectedProject.architecture.map((item, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#9da2af] p-2.5 rounded-lg bg-white/[0.02] border border-white/5 font-mono leading-relaxed"
              >
                <span className="text-[#b9c7a5] font-mono font-bold">0{idx + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-col gap-2">
          <h3 className="text-xs font-mono font-bold tracking-wider text-[#c2b9d0] uppercase flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#c2b9d0]" />
            Technologies & Tools Employed
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedProject.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#181920] border border-white/10 text-xs font-mono text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Key Features & Engineering Challenges */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-mono font-bold tracking-wider text-[#dfcaa5] uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#dfcaa5]" />
              Key Features
            </h3>
            <ul className="space-y-1.5 text-xs text-[#9da2af] font-mono leading-relaxed">
              {selectedProject.mainFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-[#dfcaa5] font-bold">•</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="text-xs font-mono font-bold tracking-wider text-rose-300 uppercase flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-300" />
              Engineering Challenges Solved
            </h3>
            <ul className="space-y-1.5 text-xs text-[#9da2af] font-mono leading-relaxed">
              {selectedProject.challenges.map((challenge, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-rose-300 font-bold">•</span>
                  <span>{challenge}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
