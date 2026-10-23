"use client";

import React, { useEffect } from "react";
import { X, Download, FileText, CheckCircle2, GraduationCap, Briefcase } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { PROFILE_DATA } from "@/data/profile";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function ResumeModal() {
  const isResumeOpen = usePortfolioStore((state) => state.isResumeOpen);
  const setIsResumeOpen = usePortfolioStore((state) => state.setIsResumeOpen);
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isResumeOpen) {
        setIsResumeOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isResumeOpen, setIsResumeOpen]);

  if (!isResumeOpen) return null;

  const handleClose = () => {
    playClick();
    setIsResumeOpen(false);
  };

  const handlePrint = () => {
    playClick();
    window.print();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="resume-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#111217] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6 text-[#edece8]"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-[#b9c7a5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#828795]">
                Curriculum Vitae
              </span>
              <h3 id="resume-modal-title" className="text-2xl sm:text-3xl font-serif text-[#f2f4ec] font-normal">
                {PROFILE_DATA.name}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={playHover}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-[#b9c7a5]/20 hover:border-[#b9c7a5] text-slate-300 hover:text-white transition-colors"
            aria-label="Close Resume Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Summary */}
        <div className="flex flex-col gap-1">
          <span className="text-xs font-mono text-[#b9c7a5] font-semibold">{PROFILE_DATA.headline}</span>
          <p className="text-xs sm:text-sm text-[#9da2af] font-sans leading-relaxed mt-1">
            {PROFILE_DATA.shortBio}
          </p>
        </div>

        {/* Verified Education */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#c2b9d0]">
            <GraduationCap className="w-4 h-4 text-[#c2b9d0]" />
            Academic Foundations
          </div>
          <div className="space-y-3">
            {PROFILE_DATA.education.map((edu, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex flex-col gap-1">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <span className="text-base font-serif text-[#f2f4ec] font-normal">{edu.degree}</span>
                  <span className="text-xs font-mono text-[#828795]">{edu.duration}</span>
                </div>
                <span className="text-xs text-[#c2b9d0] font-mono">{edu.field} • {edu.institution}</span>
                <ul className="mt-1 space-y-0.5 text-xs text-[#9da2af] font-sans">
                  {edu.highlights.map((h, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-1.5">
                      <span className="text-[#b9c7a5]">›</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Competencies */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-[#b9c7a5]">
            <Briefcase className="w-4 h-4 text-[#b9c7a5]" />
            Core Competencies
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              "GenAI & LLM Orchestration",
              "FastAPI & Asynchronous APIs",
              "PyTorch & YOLO Computer Vision",
              "Full-Stack Next.js & React 19",
              "PostgreSQL & Vector Databases",
              "Docker & CI/CD Workflows",
              "Three.js & 3D WebGL",
              "Distributed Systems",
            ].map((skill, idx) => (
              <div
                key={idx}
                className="p-2 rounded-lg bg-white/[0.02] border border-white/5 text-[11px] font-mono text-slate-300 flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-[#b9c7a5] shrink-0" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-3">
          <span className="text-xs font-mono text-[#828795]">
            Curriculum Vitae ready for recruitment & technical review
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              onMouseEnter={playHover}
              className="px-4 py-2 rounded-xl bg-[#b9c7a5] hover:bg-[#c8d6b4] text-[#0c0d10] text-xs font-mono font-bold flex items-center gap-2 transition-all shadow-md shadow-[#b9c7a5]/20"
            >
              <Download className="w-4 h-4 text-[#0c0d10]" />
              Print / Save as PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
