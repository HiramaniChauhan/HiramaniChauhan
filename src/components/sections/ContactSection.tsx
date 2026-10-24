"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Radio,
  MessageSquare,
  X,
} from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { PROFILE_DATA } from "@/data/profile";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export function ContactSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [letterVisible, setLetterVisible] = useState(false);
  const envelopeRef = useRef<HTMLDivElement>(null);
  const [envRect, setEnvRect] = useState({ x: 0, y: 0, w: 0, h: 0 });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
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
    if (
      !formState.name.trim() ||
      !formState.email.trim() ||
      !formState.message.trim()
    ) {
      setStatus("error");
      setErrorMessage("Please complete all required fields.");
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
      const mailtoUrl = `mailto:${PROFILE_DATA.socials.email
        }?subject=${encodeURIComponent(
          formState.subject || "Message via Portfolio"
        )}&body=${encodeURIComponent(
          `From: ${formState.name} (${formState.email})\n\n${formState.message}`
        )}`;
      window.location.href = mailtoUrl;
      playChime(784, 0.4);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMessage("Failed. Please email directly.");
    }
  };

  const openEnvelope = () => {
    if (isOpen) return;
    playClick();
    // Capture envelope position for the letter animation origin
    if (envelopeRef.current) {
      const rect = envelopeRef.current.getBoundingClientRect();
      setEnvRect({ x: rect.left, y: rect.top, w: rect.width, h: rect.height });
    }
    setIsOpen(true);
    // Delay the letter emergence so the flap opens first
    setTimeout(() => setLetterVisible(true), 400);
  };

  const closeEnvelope = () => {
    setLetterVisible(false);
    // Wait for letter to slide back before closing flap
    setTimeout(() => setIsOpen(false), 500);
  };

  // Lock body scroll when letter is visible
  useEffect(() => {
    if (letterVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [letterVisible]);

  return (
    <section
      id="contact"
      className="relative min-h-screen w-full py-24 px-4 sm:px-8 lg:px-12 flex flex-col justify-center overflow-visible border-t border-white/5 bg-[#0a0a0f]"
      aria-label="Contact"
    >
      <style>{`
        /* ═══════════════════════════════════════════
           3D ENVELOPE + LETTER TO CENTER
           ═══════════════════════════════════════════ */

        .env-scene {
          perspective: 1400px;
          perspective-origin: 50% 60%;
        }

        .env-root {
          position: relative;
          width: 100%;
          max-width: 540px;
          margin: 0 auto;
          transform-style: preserve-3d;
          transition: transform 0.9s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .env-root.closed {
          transform: rotateX(12deg) rotateY(-3deg);
        }

        .env-root.open {
          transform: rotateX(2deg) rotateY(0deg);
        }

        /* Envelope body */
        .env-pouch {
          position: relative;
          width: 100%;
          padding-bottom: 65%;
          transform-style: preserve-3d;
          z-index: 5;
        }

        .env-face {
          position: absolute;
          inset: 0;
          background: linear-gradient(165deg, #1c1c30 0%, #141428 50%, #0e0e1e 100%);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 14px;
          box-shadow:
            0 25px 70px rgba(0,0,0,0.65),
            0 0 50px rgba(185,199,165,0.03),
            inset 0 1px 0 rgba(255,255,255,0.05);
          overflow: hidden;
          z-index: 5;
        }

        .env-face::before {
          content: '';
          position: absolute;
          inset: 0;
          clip-path: polygon(0 0, 50% 55%, 100% 0, 100% 100%, 0 100%);
          background: linear-gradient(180deg, rgba(255,255,255,0.015) 0%, transparent 60%);
          pointer-events: none;
        }

        .env-fold-l, .env-fold-r {
          position: absolute;
          bottom: 0; width: 50%; height: 100%;
          pointer-events: none; z-index: 6;
        }
        .env-fold-l {
          left: 0;
          clip-path: polygon(0 50%, 100% 100%, 0 100%);
          background: linear-gradient(120deg, rgba(255,255,255,0.02), transparent);
          border-right: 1px solid rgba(255,255,255,0.025);
        }
        .env-fold-r {
          right: 0;
          clip-path: polygon(100% 50%, 0 100%, 100% 100%);
          background: linear-gradient(-120deg, rgba(255,255,255,0.015), transparent);
          border-left: 1px solid rgba(255,255,255,0.025);
        }

        /* Top Flap */
        .env-flap {
          position: absolute;
          top: 0; left: 0; right: 0;
          height: 52%;
          transform-origin: top center;
          transform-style: preserve-3d;
          transition: transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
          z-index: 10;
        }
        .env-flap.shut   { transform: rotateX(0deg); }
        .env-flap.lifted  { transform: rotateX(-180deg); }

        .env-flap-skin {
          position: absolute; inset: 0;
          clip-path: polygon(0 0, 100% 0, 50% 100%);
          backface-visibility: hidden;
        }
        .env-flap-outer {
          background: linear-gradient(180deg, #1a1a2e, #15152a 60%, #121226);
          border-top: 1px solid rgba(255,255,255,0.07);
          box-shadow: 0 6px 25px rgba(0,0,0,0.35);
          z-index: 11;
        }
        .env-flap-inner {
          background: linear-gradient(180deg, #0c0c1a, #101022);
          transform: rotateX(180deg);
          border-top: 1px solid rgba(255,255,255,0.03);
        }

        /* Wax seal */
        .env-seal {
          position: absolute;
          bottom: 16%; left: 50%;
          transform: translateX(-50%);
          width: 48px; height: 48px;
          border-radius: 50%;
          background: radial-gradient(circle, #b9c7a5 0%, #8fa97a 55%, #6b8a55 100%);
          box-shadow:
            0 0 24px rgba(185,199,165,0.35),
            0 0 48px rgba(185,199,165,0.12),
            inset 0 -2px 5px rgba(0,0,0,0.3),
            inset 0 2px 5px rgba(255,255,255,0.2);
          display: flex; align-items: center; justify-content: center;
          z-index: 12;
          transition: opacity 0.4s ease 0.1s, transform 0.5s ease;
          animation: sealBreath 3s ease-in-out infinite;
        }
        .env-flap.lifted .env-seal {
          opacity: 0;
          transform: translateX(-50%) scale(0.4);
        }
        @keyframes sealBreath {
          0%, 100% { box-shadow: 0 0 24px rgba(185,199,165,0.35), 0 0 48px rgba(185,199,165,0.12); }
          50%      { box-shadow: 0 0 32px rgba(185,199,165,0.5),  0 0 64px rgba(185,199,165,0.2); }
        }

        .env-hint { animation: hintBob 2.2s ease-in-out infinite; }
        @keyframes hintBob {
          0%, 100% { opacity: 0.55; transform: translateY(0); }
          50%      { opacity: 1;    transform: translateY(-4px); }
        }

        /* ═══════════════════════════════════════════
           LETTER — Fixed overlay, flies to center
           ═══════════════════════════════════════════ */

        .letter-overlay {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .letter-overlay.active {
          pointer-events: auto;
        }

        .letter-backdrop {
          position: absolute;
          inset: 0;
          background: rgba(5, 5, 12, 0);
          backdrop-filter: blur(0px);
          transition: background 0.6s ease, backdrop-filter 0.6s ease;
        }

        .letter-overlay.active .letter-backdrop {
          background: rgba(5, 5, 12, 0.88);
          backdrop-filter: blur(16px);
        }

        .letter-card {
          position: relative;
          z-index: 101;
          width: 92%;
          max-width: 560px;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1),
                      opacity 0.5s ease;
        }

        /* Start state: at the envelope position, small */
        .letter-card.at-envelope {
          opacity: 0;
          transform: scale(0.3) translateY(100px);
        }

        /* End state: centered, full size */
        .letter-card.at-center {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        /* Closing: shrink back */
        .letter-card.returning {
          opacity: 0;
          transform: scale(0.3) translateY(100px);
        }

        .letter-paper {
          background: linear-gradient(180deg, #1a1a30 0%, #151528 40%, #111124 100%);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 16px;
          box-shadow:
            0 30px 80px rgba(0,0,0,0.6),
            0 0 60px rgba(185,199,165,0.05),
            0 0 1px rgba(255,255,255,0.1);
          padding: 32px 28px 28px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          max-height: 85vh;
        }

        .letter-paper::-webkit-scrollbar { width: 4px; }
        .letter-paper::-webkit-scrollbar-track { background: transparent; }
        .letter-paper::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 2px; }

        /* Close button */
        .letter-close {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1a1a2e;
          border: 1px solid rgba(255,255,255,0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 102;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          box-shadow: 0 4px 16px rgba(0,0,0,0.5);
        }
        .letter-close:hover {
          background: #252540;
          border-color: rgba(185,199,165,0.3);
          transform: scale(1.1);
        }

        /* Ambient glow behind envelope */
        .env-glow {
          position: absolute;
          top: 50%; left: 50%;
          width: 420px; height: 420px;
          transform: translate(-50%, -50%);
          background: radial-gradient(circle, rgba(185,199,165,0.06), transparent 70%);
          pointer-events: none; z-index: 0;
          transition: opacity 0.8s;
        }
      `}</style>

      <div className="max-w-7xl mx-auto w-full flex flex-col gap-10 relative z-10">
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-2 text-xs font-mono text-[#828795] uppercase tracking-widest">
            <span className="text-[#b9c7a5] font-bold">07 -</span> DIRECT
            COMMUNICATIONS
          </div>
          <div className="flex flex-col">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif text-[#f2f4ec] font-normal tracking-tight">
              Initiate contact.
            </h2>

          </div>

        </div>

        {/* 2 Column: Envelope + Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* ── Left: 3D Envelope ── */}
          <div className="lg:col-span-7 flex flex-col items-center relative">
            <div className="env-glow" />

            <div className="env-scene w-full max-w-[540px] relative" ref={envelopeRef}>
              <div className={`env-root ${isOpen ? "open" : "closed"}`}>
                <div className="env-pouch">
                  {/* Front face */}
                  <div
                    className="env-face cursor-pointer"
                    onClick={openEnvelope}
                    role="button"
                    tabIndex={0}
                    aria-label="Open envelope to send a message"
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") openEnvelope();
                    }}
                  >
                    {/* Stamp */}
                    <div className="absolute top-4 right-4 w-12 h-14 border border-white/[0.05] rounded-sm flex flex-col items-center justify-center gap-0.5 bg-white/[0.015]">
                      <Mail className="w-4 h-4 text-[#b9c7a5]/30" />
                      <div className="w-7 h-[1px] bg-white/[0.05]" />
                      <span className="text-[6px] font-mono text-white/15 tracking-widest">
                        PRIORITY
                      </span>
                    </div>

                    {/* Address */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-6 right-20 flex flex-col gap-2.5">
                      <span className="text-[9px] font-mono text-white/12 tracking-[0.25em] uppercase">
                        To: Hiramani Chauhan
                      </span>
                      <div className="h-[1px] w-4/5 bg-white/[0.04]" />
                      <div className="h-[1px] w-3/5 bg-white/[0.03]" />
                      <div className="h-[1px] w-2/5 bg-white/[0.025]" />
                    </div>
                  </div>

                  {/* Folds */}
                  <div className="env-fold-l" />
                  <div className="env-fold-r" />

                  {/* Top flap */}
                  <div
                    className={`env-flap ${isOpen ? "lifted" : "shut"}`}
                    onClick={openEnvelope}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="env-flap-skin env-flap-outer">
                      <div className="env-seal">
                        <Mail className="w-5 h-5 text-[#0a0a0f]" />
                      </div>
                    </div>
                    <div className="env-flap-skin env-flap-inner" />
                  </div>
                </div>
              </div>

              {/* Hint */}
              {!isOpen && (
                <p className="env-hint text-center mt-8 text-xs font-mono text-[#828795]">
                  <span className="text-[#b9c7a5]">↑</span> Click to open
                  envelope <span className="text-[#b9c7a5]">↑</span>
                </p>
              )}
            </div>
          </div>

          {/* ── Right: Relay Station ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="backdrop-blur-xl bg-white/[0.04] p-6 sm:p-7 rounded-2xl flex flex-col gap-5 border border-white/[0.08] shadow-2xl shadow-black/30">
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

              {/* Email */}
              <div className="flex flex-col gap-2">
                <span className="text-xs font-mono text-[#828795] uppercase tracking-wider">
                  Primary Channel:
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
                    aria-label="Copy Email"
                  >
                    <Copy className="w-3.5 h-3.5" />
                  </button>
                </div>
                {copied && (
                  <span className="text-[11px] font-mono text-[#b9c7a5] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Copied to clipboard.
                  </span>
                )}
              </div>

              {/* Socials */}
              <div className="flex flex-col gap-2 pt-2 border-t border-white/5">
                <span className="text-xs font-mono text-[#828795] uppercase tracking-wider">
                  Networks:
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
                <span className="text-[#b9c7a5] font-semibold">STATUS: </span>
                Open to engineering roles, AI initiatives, and collaborative
                systems development.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          LETTER OVERLAY — Fixed on top of everything,
          flies from envelope position to page center
          ══════════════════════════════════════════════ */}
      <div className={`letter-overlay ${letterVisible ? "active" : ""}`}>
        {/* Blurred backdrop */}
        <div
          className="letter-backdrop"
          onClick={closeEnvelope}
        />

        {/* Letter card */}
        <div
          className={`letter-card ${letterVisible ? "at-center" : isOpen ? "at-envelope" : "at-envelope"
            }`}
        >
          {/* Close button */}
          {letterVisible && (
            <button
              className="letter-close"
              onClick={closeEnvelope}
              aria-label="Close"
            >
              <X className="w-4 h-4 text-slate-400" />
            </button>
          )}

          <div className="letter-paper">
            {/* Letter header */}
            <div className="flex items-center gap-2 mb-5 pb-3 border-b border-white/[0.06]">
              <div className="w-8 h-8 rounded-full bg-[#b9c7a5]/10 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-[#b9c7a5]" />
              </div>
              <div>
                <span className="text-xs font-mono text-[#b9c7a5] font-semibold tracking-wider uppercase block">
                  Compose Message
                </span>
                <span className="text-[10px] font-mono text-[#828795]">
                  to {PROFILE_DATA.socials.email}
                </span>
              </div>
            </div>

            {/* The form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 flex-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-[#828795] uppercase tracking-wider">
                    Name <span className="text-[#b9c7a5]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder:text-white/15 focus:outline-none focus:border-[#b9c7a5]/40 focus:ring-1 focus:ring-[#b9c7a5]/15 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-[#828795] uppercase tracking-wider">
                    Email <span className="text-[#b9c7a5]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="your@email.com"
                    className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder:text-white/15 focus:outline-none focus:border-[#b9c7a5]/40 focus:ring-1 focus:ring-[#b9c7a5]/15 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[10px] font-mono text-[#828795] uppercase tracking-wider">
                  Subject
                </label>
                <input
                  type="text"
                  value={formState.subject}
                  onChange={(e) =>
                    setFormState({ ...formState, subject: e.target.value })
                  }
                  placeholder="What's this about?"
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder:text-white/15 focus:outline-none focus:border-[#b9c7a5]/40 focus:ring-1 focus:ring-[#b9c7a5]/15 transition-all"
                />
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-[10px] font-mono text-[#828795] uppercase tracking-wider">
                  Message <span className="text-[#b9c7a5]">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  placeholder="Write your message here..."
                  className="px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-xs font-mono text-white placeholder:text-white/15 focus:outline-none focus:border-[#b9c7a5]/40 focus:ring-1 focus:ring-[#b9c7a5]/15 transition-all resize-none"
                />
              </div>

              {/* Alerts */}
              {status === "error" && (
                <div className="p-2.5 rounded-lg bg-red-950/40 border border-red-500/30 text-red-300 text-[11px] font-mono flex items-center gap-2">
                  <AlertCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}
              {status === "success" && (
                <div className="p-2.5 rounded-lg bg-[#b9c7a5]/10 border border-[#b9c7a5]/30 text-[#b9c7a5] text-[11px] font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Message dispatched to {PROFILE_DATA.socials.email}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "sending"}
                onMouseEnter={playHover}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#b9c7a5] hover:bg-[#c8d6b4] text-[#0a0a0f] font-mono text-xs sm:text-sm font-semibold tracking-wider transition-all duration-300 shadow-lg shadow-[#b9c7a5]/20 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                {status === "sending" ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>

            {/* Letter footer */}
            <div className="mt-5 pt-3 border-t border-white/[0.04] flex items-center justify-between">
              <span className="text-[9px] font-mono text-white/15 tracking-widest uppercase">
                Hiramani Chauhan • Portfolio
              </span>
              <Mail className="w-3.5 h-3.5 text-[#b9c7a5]/20" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
