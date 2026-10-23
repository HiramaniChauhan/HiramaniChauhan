"use client";

import React from "react";
import { Award, Calendar, ShieldCheck, CheckCircle, ExternalLink, Sparkles } from "lucide-react";
import { CERTIFICATES_DATA, Certificate } from "@/data/certificates";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function CertificatesSection() {
  const setSelectedCertificate = usePortfolioStore((state) => state.setSelectedCertificate);
  const { playClick, playHover, playChime } = useSoundEffects();

  const handleOpenCert = (cert: Certificate) => {
    playChime(700, 0.3);
    setSelectedCertificate(cert);
  };

  const cert = CERTIFICATES_DATA[0];

  return (
    <section
      id="certificates"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Certificates and Honors"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">05 //</span> HONORS & ACCREDITATION
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Academic distinction.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
              National physics examination merit.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#828795] max-w-2xl font-mono">
            Recognitions, competitive scientific evaluations, and certified analytical foundations.
          </p>
        </div>

        {/* Featured Certificate Card — Prestigious Showcase Presentation */}
        {cert && (
          <div className="w-full max-w-4xl mx-auto">
            <div
              onClick={() => handleOpenCert(cert)}
              onMouseEnter={playHover}
              className="glass-card p-8 sm:p-10 rounded-3xl border border-white/10 hover:border-[#b9c7a5]/50 transition-all duration-300 cursor-pointer group flex flex-col gap-8 shadow-2xl relative overflow-hidden"
            >
              {/* Subtle Ambient Radial Highlight */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#b9c7a5]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#b9c7a5]/10 transition-colors" />

              {/* Top Banner Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#b9c7a5]/10 border border-[#b9c7a5]/30 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-[#b9c7a5]/20 transition-all">
                    <Award className="w-7 h-7 text-[#b9c7a5]" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono uppercase tracking-widest text-[#b9c7a5] font-bold">
                        {cert.category}
                      </span>
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[#dfcaa5]">
                        <Sparkles className="w-3 h-3 text-[#dfcaa5]" />
                        TOP 10% RANKING
                      </span>
                    </div>
                    <span className="text-xs font-mono text-[#828795] mt-0.5">
                      National Level Competitive Examination
                    </span>
                  </div>
                </div>

                <div className="flex sm:flex-col sm:items-end justify-between text-xs font-mono text-[#828795] gap-1">
                  <span className="flex items-center gap-1.5 text-[#b9c7a5] font-semibold text-sm">
                    <Calendar className="w-4 h-4" />
                    Year: {cert.issueDate}
                  </span>
                  <span className="text-[11px] text-[#828795]">B.Sc. Level Qualification</span>
                </div>
              </div>

              {/* Certificate Title & Detailed Achievement */}
              <div className="flex flex-col gap-3">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#f2f4ec] font-normal leading-snug group-hover:text-[#b9c7a5] transition-colors">
                  {cert.title}
                </h3>
                <span className="text-sm sm:text-base font-mono text-[#c2b9d0]">
                  Conducted by: <strong className="text-white font-medium">{cert.issuer}</strong>
                </span>

                <p className="text-sm sm:text-base text-[#9da2af] font-sans leading-relaxed mt-2">
                  {cert.description}
                </p>
              </div>

              {/* Validated Academic & Problem-Solving Competencies */}
              <div className="flex flex-col gap-3 pt-2">
                <span className="text-xs font-mono uppercase tracking-widest text-[#828795] font-semibold">
                  Competencies & Scientific Domains Validated:
                </span>
                <div className="flex flex-wrap gap-2">
                  {cert.skillsCovered.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-slate-200 flex items-center gap-1.5 group-hover:border-[#b9c7a5]/30 transition-colors"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#b9c7a5]" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action Footer */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10 text-xs font-mono text-[#828795] flex-wrap gap-3">
                <div className="flex items-center gap-2 text-[#b9c7a5] font-semibold group-hover:translate-x-1 transition-transform">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Click to view credential dossier</span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-[#828795] hover:text-[#b9c7a5]">
                  <span>IAPT Official Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
