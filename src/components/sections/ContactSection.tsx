"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle2, AlertCircle, Copy, Radio, MessageSquare } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { PROFILE_DATA } from "@/data/profile";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { playClick, playHover, playChime } = useSoundEffects();

  const handleCopyEmail = () => {
    playClick();
    navigator.clipboard.writeText(PROFILE_DATA.socials.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();

    if (!formState.name.trim() || !formState.email.trim() || !formState.message.trim()) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Message).");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formState.email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email address.");
      return;
    }

    setStatus("sending");
    setErrorMessage("");

    try {
      await new Promise((res) => setTimeout(res, 800));
      const mailtoUrl = `mailto:${PROFILE_DATA.socials.email}?subject=${encodeURIComponent(
        formState.subject || "Mission Ingestion via CODEVERSE"
      )}&body=${encodeURIComponent(
        `From: ${formState.name} (${formState.email})\n\n${formState.message}`
      )}`;
      
      window.location.href = mailtoUrl;
      playChime(784, 0.4);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Transmission dispatch failed. Please use direct email comms link below.");
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-hidden border-t border-white/5 bg-[#0c0d10]"
      aria-label="Mission Control & Contact"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">07 //</span> DIRECT COMMUNICATIONS
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Initiate contact.
            </h2>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif italic text-[#c2b9d0] font-normal tracking-tight">
              Collaborations, opportunities & questions.
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#828795] max-w-2xl font-mono">
            Have an engineering role, collaborative AI initiative, or system architecture challenge? Establish transmission below.
          </p>
        </div>

        {/* 2-Column Grid: Station HUD + Contact Terminal Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-card p-6 sm:p-7 rounded-2xl flex flex-col gap-5 border border-white/10">
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2.5">
                  <Radio className="w-4 h-4 text-[#b9c7a5] animate-pulse" />
                  <span className="font-mono text-xs font-bold text-white tracking-wider">
                    PRIMARY RELAY // HC-01
                  </span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#b9c7a5]/10 text-[#b9c7a5] border border-[#b9c7a5]/30">
                  ONLINE
                </span>
              </div>

              {/* Direct Email Box with 1-Click Copy */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-[#828795] uppercase tracking-wider">
                  Primary Transmission Channel:
                </span>
                <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <Mail className="w-4 h-4 text-[#b9c7a5] shrink-0" />
                    <span className="font-mono text-xs sm:text-sm text-[#f2f4ec] truncate">
                      {PROFILE_DATA.socials.email}
                    </span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    onMouseEnter={playHover}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-[#b9c7a5]/20 text-slate-300 hover:text-white transition-colors shrink-0 ml-2"
                    title="Copy email to clipboard"
                    aria-label="Copy Email"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copied && (
                  <span className="text-[11px] font-mono text-[#b9c7a5] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Coordinates copied to clipboard.
                  </span>
                )}
              </div>

              {/* Verified External Channels */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-[#828795] uppercase tracking-wider">
                  Verified Networks:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={PROFILE_DATA.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#b9c7a5]/40 hover:bg-[#b9c7a5]/10 transition-all flex items-center gap-2.5 group"
                  >
                    <GithubIcon className="w-4 h-4 text-slate-400 group-hover:text-[#b9c7a5]" />
                    <span className="text-xs font-mono text-slate-300 group-hover:text-white font-medium">
                      GitHub
                    </span>
                  </a>

                  <a
                    href={PROFILE_DATA.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={playClick}
                    onMouseEnter={playHover}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/10 hover:border-[#b9c7a5]/40 hover:bg-[#b9c7a5]/10 transition-all flex items-center gap-2.5 group"
                  >
                    <LinkedinIcon className="w-4 h-4 text-slate-400 group-hover:text-[#b9c7a5]" />
                    <span className="text-xs font-mono text-slate-300 group-hover:text-white font-medium">
                      LinkedIn
                    </span>
                  </a>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-xs font-mono text-[#828795] leading-relaxed">
                <span className="text-[#b9c7a5] font-semibold">STATUS NOTE: </span>
                Currently open to engineering roles, high-impact AI architecture initiatives, and collaborative systems development.
              </div>
            </div>
          </div>

          {/* Right Column: Form (7 Cols) */}
          <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl border border-white/10 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-mono text-[#b9c7a5] uppercase tracking-wider font-semibold">
              <MessageSquare className="w-4 h-4 text-[#b9c7a5]" />
              Direct Comms Dispatch Interface
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Sender Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-mono text-[#828795]">
                    Your Name <span className="text-[#b9c7a5]">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Elena Rostova"
                    className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                  />
                </div>

                {/* Sender Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-mono text-[#828795]">
                    Return Email <span className="text-[#b9c7a5]">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. elena@quantum-tech.io"
                    className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-mono text-[#828795]">
                  Transmission Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  value={formState.subject}
                  onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                  placeholder="e.g. Engineering Role / System Architecture Inquiry"
                  className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono"
                />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-xs font-mono text-[#828795]">
                  Message Payload <span className="text-[#b9c7a5]">*</span>
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Describe your inquiry, tech stack requirements, or collaboration goals..."
                  className="px-3.5 py-2.5 rounded-xl glass-input text-xs font-mono resize-none"
                />
              </div>

              {/* Alerts */}
              {status === "error" && (
                <div className="p-3 rounded-xl bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {status === "success" && (
                <div className="p-3 rounded-xl bg-[#b9c7a5]/10 border border-[#b9c7a5]/40 text-[#b9c7a5] text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#b9c7a5] shrink-0" />
                  <span>
                    Transmission dispatched via email client. You can also write directly to {PROFILE_DATA.socials.email}.
                  </span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={status === "sending"}
                onMouseEnter={playHover}
                className="mt-2 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#b9c7a5] hover:bg-[#c8d6b4] text-[#0c0d10] font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 shadow-md shadow-[#b9c7a5]/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {status === "sending" ? "ROUTING TELEMETRY..." : "DISPATCH TRANSMISSION"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
