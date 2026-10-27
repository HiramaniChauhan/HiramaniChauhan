"use client";

import React from "react";
import { Calendar, MapPin, CheckCircle2, Cpu, ExternalLink } from "lucide-react";
import { EXPERIENCES_DATA } from "@/data/experience";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function ExperienceSection() {
  const { playHover } = useSoundEffects();

  return (
    <section
      id="experience"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Experience and Internships"
    >
      {/* ── 3D Animation Video across whole Experience section ── */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <video
          src="https://cdn.recent.design/items/shwd3gy/0/960x720.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{ mixBlendMode: "screen" }}
          className="w-full h-full object-cover opacity-60"
        >
          <source src="/videos/experience-showcase.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Ambient Vignette & Scrim for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c0d10] via-transparent to-[#0c0d10] opacity-75" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#0c0d10_100%)] opacity-70" />
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Header */}
        {/* Header */}
        <div className="flex flex-col gap-3 sm:gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">04 -</span> CAREER TRAJECTORY
          </div>
          <div className="flex flex-col">
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Past milestones.
            </h2>
          </div>
        </div>

        {/* ── Timeline: Full Width, Wide Cards ── */}
        <div className="relative pl-5 sm:pl-8 lg:pl-10 border-l border-white/15 space-y-6 sm:space-y-8 my-2">
          {EXPERIENCES_DATA.map((exp) => (
            <div
              key={exp.id}
              onMouseEnter={playHover}
              className="relative group flex flex-col"
            >
              {/* Timeline Nexus Node — Centered accurately on the border */}
              <div className="absolute -left-[30px] sm:-left-[42px] lg:-left-[50px] top-4 w-5 h-5 rounded-full bg-[#0c0d10] border border-[#b9c7a5] flex items-center justify-center group-hover:scale-125 transition-transform duration-300 z-10">
                <div className="w-1.5 h-1.5 rounded-full bg-[#b9c7a5]" />
              </div>

              {/* Experience Card — Wide horizontal layout */}
              <div className="w-full bg-transparent border border-white/10 rounded-2xl p-4 sm:p-6 lg:p-7 flex flex-col gap-4 group-hover:border-[#b9c7a5]/50 transition-all duration-300">
                {/* Top Bar: Role & Company (Left) + Duration & Location (Right) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3.5">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
                      <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#b9c7a5]/10 text-[#b9c7a5] border border-[#b9c7a5]/30 font-medium">
                        {exp.type}
                      </span>
                      <span className="text-xs font-mono text-[#c2b9d0]">
                        {exp.companyOrOrg}
                      </span>
                      {exp.website && (
                        <a
                          href={exp.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-mono text-[#b9c7a5] hover:text-[#d7e5c4] bg-[#b9c7a5]/10 px-2 py-0.5 rounded border border-[#b9c7a5]/25 hover:border-[#b9c7a5]/50 transition-colors ml-1"
                        >
                          <span>{exp.website.replace(/^https?:\/\//, "")}</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                      {exp.isCustomizablePlaceholder && (
                        <span className="text-[10px] font-mono text-[#dfcaa5] px-2 py-0.5 rounded bg-white/5">
                          (Configurable in data/experience.ts)
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-[#f2f4ec] font-normal group-hover:text-[#b9c7a5] transition-colors">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-mono text-[#828795] shrink-0">
                    <span className="flex items-center gap-1.5 text-[#b9c7a5]">
                      <Calendar className="w-3.5 h-3.5" />
                      {exp.duration}
                    </span>
                    <span className="flex items-center gap-1.5 text-[#828795]">
                      <MapPin className="w-3.5 h-3.5" />
                      {exp.location}
                    </span>
                  </div>
                </div>

                {/* Optional Project / Role Description */}
                {exp.description && (
                  <p className="text-xs sm:text-sm text-[#b2b7c4] leading-relaxed font-sans border-b border-white/5 pb-3">
                    {exp.description}
                  </p>
                )}

                {/* Horizontal Content Split: Contributions (Left 7 cols) + Outcomes & Stack (Right 5 cols) */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-1 items-start">
                  {/* Left: Contributions */}
                  <div className="lg:col-span-7 flex flex-col gap-2">
                    <span className="text-xs font-mono text-[#828795] font-semibold uppercase tracking-wider">
                      Key Contributions:
                    </span>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#9da2af] leading-relaxed font-mono">
                      {exp.responsibilities.map((resp, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <span className="text-[#b9c7a5] font-bold shrink-0 mt-0.5">›</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Right: Outcomes & Tech Stack */}
                  <div className="lg:col-span-5 flex flex-col gap-3">
                    {exp.outcomes.length > 0 && (
                      <div className="p-3 rounded-xl border border-white/10 bg-white/[0.01] flex flex-col gap-1.5">
                        <span className="text-[11px] font-mono text-[#b9c7a5] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Measurable Outcomes
                        </span>
                        <ul className="space-y-1 text-xs text-[#9da2af] leading-relaxed font-mono">
                          {exp.outcomes.map((out, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-1.5">
                              <span className="text-[#b9c7a5]">•</span>
                              <span>{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[11px] font-mono text-[#828795] mr-1 flex items-center gap-1">
                        <Cpu className="w-3 h-3 text-[#b9c7a5]" />
                        Stack:
                      </span>
                      {exp.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.02] border border-white/10 text-[11px] font-mono text-[#828795]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
