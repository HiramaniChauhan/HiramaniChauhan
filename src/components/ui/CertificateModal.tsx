"use client";

import React, { useEffect } from "react";
import { X, Award, ExternalLink, Calendar, CheckCircle, ShieldCheck } from "lucide-react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function CertificateModal() {
  const selectedCertificate = usePortfolioStore((state) => state.selectedCertificate);
  const setSelectedCertificate = usePortfolioStore((state) => state.setSelectedCertificate);
  const { playClick, playHover } = useSoundEffects();

  useEffect(() => {
    if (!selectedCertificate) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedCertificate(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [selectedCertificate, setSelectedCertificate]);

  if (!selectedCertificate) return null;

  const handleClose = () => {
    playClick();
    setSelectedCertificate(null);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
      data-lenis-prevent
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200"
      onClick={handleClose}
      onWheel={(e) => e.stopPropagation()}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        onWheel={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto overscroll-contain bg-[#111217] border border-white/10 rounded-2xl shadow-2xl p-6 sm:p-8 flex flex-col gap-6"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <Award className="w-6 h-6 text-[#b9c7a5]" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#828795]">
                {selectedCertificate.category}
              </span>
              <h3 id="cert-modal-title" className="text-2xl font-serif text-[#f2f4ec] font-normal">
                {selectedCertificate.title}
              </h3>
            </div>
          </div>

          <button
            onClick={handleClose}
            onMouseEnter={playHover}
            className="p-1.5 rounded-lg bg-white/5 border border-white/10 hover:bg-[#b9c7a5]/20 hover:border-[#b9c7a5] text-slate-300 hover:text-white transition-colors"
            aria-label="Close Certificate Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Certificate Visual Box */}
        <div className="relative rounded-xl border border-white/10 bg-gradient-to-b from-[#181920] to-[#0c0d10] p-6 text-center flex flex-col items-center justify-center gap-3">
          <ShieldCheck className="w-10 h-10 text-[#b9c7a5]" />
          <div className="font-mono text-sm tracking-wider font-semibold text-[#f2f4ec]">
            {selectedCertificate.imagePlaceholderText}
          </div>
          <p className="text-xs text-[#828795] max-w-md">
            Issued by <strong className="text-[#f2f4ec]">{selectedCertificate.issuer}</strong>
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-[#828795] mt-2">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#b9c7a5]" />
              {selectedCertificate.issueDate}
            </span>
            {selectedCertificate.credentialId && (
              <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px]">
                ID: {selectedCertificate.credentialId}
              </span>
            )}
          </div>
        </div>

        {/* Description & Competencies */}
        <div className="flex flex-col gap-3">
          <p className="text-xs sm:text-sm text-[#9da2af] leading-relaxed font-sans">
            {selectedCertificate.description}
          </p>

          <div>
            <span className="text-[11px] font-mono uppercase text-[#828795] font-semibold tracking-wider">
              Skills Validated:
            </span>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {selectedCertificate.skillsCovered.map((skill, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-slate-300 flex items-center gap-1"
                >
                  <CheckCircle className="w-3 h-3 text-[#b9c7a5]" />
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Verification Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-2">
          <span className="text-[11px] font-mono text-[#828795]">
            Verification status:{" "}
            <span className="text-[#dfcaa5]">
              {selectedCertificate.isVerifiedPlaceholder ? "Placeholder URL (Ready to link)" : "Verified"}
            </span>
          </span>

          {selectedCertificate.verificationUrl && (
            <a
              href={selectedCertificate.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={playClick}
              onMouseEnter={playHover}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#b9c7a5] text-[#0c0d10] text-xs font-mono font-bold hover:bg-[#c8d6b4] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Verify Credential
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
