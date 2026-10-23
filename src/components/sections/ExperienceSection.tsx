"use client";

import React from "react";
import { Calendar, MapPin, CheckCircle2, Cpu } from "lucide-react";
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
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">04 //</span> CAREER TRAJECTORY
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Past milestones.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
              Engineering internships & research labs.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#828795] max-w-2xl font-mono">
            A chronological timeline of engineering roles, research undertakings, and hands-on software development milestones.
          </p>
        </div>

        {/* 2-Column Split: Experience Boxes (Left) + Motion Showcase Video (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ── LEFT: Experience Timeline Boxes (7 Cols) ── */}
          <div className="lg:col-span-7">
            <div className="relative pl-6 sm:pl-10 border-l border-white/10 space-y-10 my-2">
              {EXPERIENCES_DATA.map((exp) => (
                <div
                  key={exp.id}
                  onMouseEnter={playHover}
                  className="relative group flex flex-col gap-4"
                >
                  {/* Timeline Nexus Node */}
                  <div className="absolute -left-[31px] sm:-left-[47px] top-2 w-5 h-5 rounded-full bg-[#0c0d10] border border-[#b9c7a5] flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#b9c7a5]" />
                  </div>

                  {/* Card Container */}
                  <div className="glass-card p-6 sm:p-8 rounded-2xl flex flex-col gap-5 border border-white/10 group-hover:border-[#b9c7a5]/40 transition-all">
                    {/* Meta details */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
                      <div>
                        <div className="flex items-center gap-2.5 flex-wrap">
                          <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-[#b9c7a5]/10 text-[#b9c7a5] border border-[#b9c7a5]/30 font-medium">
                            {exp.type}
                          </span>
                          {exp.isCustomizablePlaceholder && (
                            <span className="text-[10px] font-mono text-[#dfcaa5] px-2 py-0.5 rounded bg-white/5">
                              (Configurable in data/experience.ts)
                            </span>
                          )}
                        </div>
                        <h3 className="text-2xl font-serif text-[#f2f4ec] font-normal mt-1 group-hover:text-[#b9c7a5] transition-colors">
                          {exp.role}
                        </h3>
                        <span className="text-xs font-mono text-[#c2b9d0]">
                          {exp.companyOrOrg}
                        </span>
                      </div>

                      <div className="flex flex-col sm:items-end text-xs font-mono text-[#828795] gap-1">
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

                    {/* Responsibilities list */}
                    <div className="flex flex-col gap-2">
                      <span className="text-xs font-mono text-[#828795] font-semibold uppercase tracking-wider">
                        Key Engineering Contributions:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#9da2af] leading-relaxed font-sans">
                        {exp.responsibilities.map((resp, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2.5">
                            <span className="text-[#b9c7a5] font-bold shrink-0 mt-0.5">›</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Outcomes */}
                    {exp.outcomes.length > 0 && (
                      <div className="p-3.5 rounded-xl bg-[#b9c7a5]/5 border border-[#b9c7a5]/20 flex flex-col gap-1.5">
                        <span className="text-[11px] font-mono text-[#b9c7a5] font-bold uppercase tracking-wider flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          Measurable Outcomes & Deliverables
                        </span>
                        <ul className="space-y-1 text-xs text-slate-300 font-sans">
                          {exp.outcomes.map((out, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-2">
                              <span className="text-[#b9c7a5]">•</span>
                              <span>{out}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Tech Stack Employed */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-2">
                      <span className="text-[11px] font-mono text-[#828795] mr-2 flex items-center gap-1">
                        <Cpu className="w-3.5 h-3.5 text-[#b9c7a5]" />
                        Stack:
                      </span>
                      {exp.techStack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md bg-[#181920] border border-white/5 text-[11px] font-mono text-[#828795]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT: Design Motion Video Showcase (5 Cols, Sticky) ── */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-4 w-full">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-black/60 shadow-2xl">
              <video
                src="https://cdn.recent.design/items/shwd3gy/0/960x720.mp4"
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/videos/experience-showcase.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>

              {/* Ambient gradient overlay */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-black/20" />
            </div>

            {/* Sub-label telemetry */}
            <div className="flex items-center justify-between text-xs font-mono text-[#828795] px-1">
              <span className="flex items-center gap-2 text-[#b9c7a5]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#b9c7a5] animate-pulse" />
                TIMELINE TELEMETRY
              </span>
              <span className="text-[11px] text-[#828795] uppercase">
                RESEARCH & PRODUCTION
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
