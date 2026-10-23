"use client";

import React, { useState } from "react";
import { Award, Calendar, ShieldCheck } from "lucide-react";
import { CERTIFICATES_DATA, CERTIFICATE_CATEGORIES, Certificate } from "@/data/certificates";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function CertificatesSection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const setSelectedCertificate = usePortfolioStore((state) => state.setSelectedCertificate);
  const { playClick, playHover, playChime } = useSoundEffects();

  const filteredCerts = CERTIFICATES_DATA.filter(
    (c) => selectedCategory === "All" || c.category === selectedCategory
  );

  const handleOpenCert = (cert: Certificate) => {
    playChime(700, 0.3);
    setSelectedCertificate(cert);
  };

  return (
    <section
      id="certificates"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Certificates"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">05 //</span> VERIFIED CREDENTIALS
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Formal accreditations.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
              Specializations & technical proofs.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#828795] max-w-2xl font-mono">
            Structured course certifications, specialization programs, and hands-on skill validations.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CERTIFICATE_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                playClick();
                setSelectedCategory(cat);
              }}
              onMouseEnter={playHover}
              className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#b9c7a5] text-[#0c0d10] font-semibold"
                  : "bg-white/5 text-[#828795] hover:bg-white/10 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Certificate Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCerts.map((cert) => (
            <div
              key={cert.id}
              onClick={() => handleOpenCert(cert)}
              onMouseEnter={playHover}
              className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col justify-between gap-5 cursor-pointer hover:border-[#b9c7a5]/40 transition-all group"
            >
              <div className="flex flex-col gap-3">
                {/* Visual Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Award className="w-5 h-5 text-[#b9c7a5]" />
                  </div>
                  <div className="flex flex-col items-end text-xs font-mono">
                    <span className="text-[#b9c7a5] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {cert.issueDate}
                    </span>
                    <span className="text-[10px] text-[#828795] uppercase tracking-wider mt-0.5">
                      {cert.category}
                    </span>
                  </div>
                </div>

                {/* Title & Issuer */}
                <div>
                  <h3 className="text-2xl font-serif text-[#f2f4ec] font-normal group-hover:text-[#b9c7a5] transition-colors">
                    {cert.title}
                  </h3>
                  <span className="text-xs font-mono text-[#c2b9d0] mt-1 block">
                    {cert.issuer}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-[#828795] font-sans leading-relaxed">
                  {cert.description}
                </p>

                {/* Skill Chips */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {cert.skillsCovered.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 border border-white/5 text-[11px] font-mono text-[#828795]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="flex items-center justify-between pt-4 border-t border-white/5 text-xs font-mono text-[#b9c7a5] group-hover:underline">
                <span className="flex items-center gap-1.5 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Inspect Credential Details
                </span>
                <span className="text-[10px] text-slate-600 font-mono">
                  {cert.isVerifiedPlaceholder ? "PLACEHOLDER LINK" : "VERIFIED"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
