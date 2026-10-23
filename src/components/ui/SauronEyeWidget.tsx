"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface SauronEyeWidgetProps {
  className?: string;
  onActiveChange?: (active: boolean) => void;
}

export function SauronEyeWidget({ className = "", onActiveChange }: SauronEyeWidgetProps) {
  const [isActive, setIsActive] = useState(false);
  const [passwordValue, setPasswordValue] = useState("you-shall-not-pass");
  const [isHovered, setIsHovered] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const eyeContainerRef = useRef<HTMLDivElement>(null);
  const eyeCanvasRef = useRef<HTMLCanvasElement>(null);
  const beamCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse & Eye coordinates
  const mousePosRef = useRef({ x: 300, y: 300 });
  const smoothMouseRef = useRef({ x: 300, y: 300 });
  const eyeCoordsRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  const { playClick, playHover, playSauronIgnite, playSauronExtinguish } = useSoundEffects();

  // Track viewport mouse movement
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  // Update eye position in viewport
  const updateEyeCoords = useCallback(() => {
    if (eyeContainerRef.current) {
      const rect = eyeContainerRef.current.getBoundingClientRect();
      eyeCoordsRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
  }, []);

  useEffect(() => {
    updateEyeCoords();
    window.addEventListener("resize", updateEyeCoords);
    window.addEventListener("scroll", updateEyeCoords, { passive: true });
    return () => {
      window.removeEventListener("resize", updateEyeCoords);
      window.removeEventListener("scroll", updateEyeCoords);
    };
  }, [updateEyeCoords]);

  // Toggle active Sauron gaze
  const toggleEye = () => {
    playClick();
    if (!isActive) {
      playSauronIgnite();
      setIsActive(true);
      onActiveChange?.(true);
    } else {
      playSauronExtinguish();
      setIsActive(false);
      onActiveChange?.(false);
    }
  };

  // Dust motes for the volumetric beam
  const motesRef = useRef<
    Array<{ x: number; y: number; speed: number; size: number; phase: number }>
  >([]);

  useEffect(() => {
    if (motesRef.current.length === 0) {
      motesRef.current = Array.from({ length: 30 }, () => ({
        x: Math.random(),
        y: Math.random(),
        speed: 0.0008 + Math.random() * 0.0016,
        size: 0.8 + Math.random() * 1.8,
        phase: Math.random() * Math.PI * 2,
      }));
    }
  }, []);

  // Main Render Loop (Eye canvas + Volumetric Beam canvas)
  useEffect(() => {
    const startTime = performance.now();

    const render = (time: number) => {
      const t = (time - startTime) * 0.001;
      updateEyeCoords();

      // Smooth mouse tracking (lerp)
      smoothMouseRef.current.x += (mousePosRef.current.x - smoothMouseRef.current.x) * 0.18;
      smoothMouseRef.current.y += (mousePosRef.current.y - smoothMouseRef.current.y) * 0.18;

      const eyeX = eyeCoordsRef.current.x;
      const eyeY = eyeCoordsRef.current.y;
      const targetX = smoothMouseRef.current.x;
      const targetY = smoothMouseRef.current.y;

      const dx = targetX - eyeX;
      const dy = targetY - eyeY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);
      const lookDist = Math.min(dist / 400, 1);

      // 1. RENDER EYE OF SAURON CANVAS
      const eyeCanvas = eyeCanvasRef.current;
      if (eyeCanvas && isActive) {
        const ctx = eyeCanvas.getContext("2d");
        if (ctx) {
          const w = eyeCanvas.width;
          const h = eyeCanvas.height;
          ctx.clearRect(0, 0, w, h);

          const cx = w / 2;
          const cy = h / 2;

          // Save state for glowing fire layers
          ctx.save();

          // Outer fiery corona / solar flares
          const flareCount = 44;
          ctx.globalCompositeOperation = "screen";

          for (let i = 0; i < flareCount; i++) {
            const flareAngle = (i / flareCount) * Math.PI * 2;
            const noise =
              Math.sin(flareAngle * 6 + t * 4) * 5 +
              Math.cos(flareAngle * 11 - t * 6) * 3 +
              Math.sin(flareAngle * 21 + t * 8) * 2;

            const radiusX = 26 + noise + (Math.abs(Math.cos(flareAngle)) * 14);
            const radiusY = 14 + noise * 0.6 + (Math.abs(Math.sin(flareAngle)) * 4);

            const fx = cx + Math.cos(flareAngle) * radiusX;
            const fy = cy + Math.sin(flareAngle) * radiusY;

            const flareGrad = ctx.createRadialGradient(cx, cy, 4, fx, fy, 22);
            flareGrad.addColorStop(0, "rgba(255, 230, 140, 0.85)");
            flareGrad.addColorStop(0.35, "rgba(255, 130, 20, 0.75)");
            flareGrad.addColorStop(0.7, "rgba(220, 45, 0, 0.4)");
            flareGrad.addColorStop(1, "rgba(140, 10, 0, 0)");

            ctx.fillStyle = flareGrad;
            ctx.beginPath();
            ctx.arc(fx, fy, 10 + noise * 0.8, 0, Math.PI * 2);
            ctx.fill();
          }

          // Fiery horizontal almond iris
          ctx.save();
          ctx.translate(cx, cy);
          ctx.scale(1.4, 0.82);

          const irisGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 20);
          irisGrad.addColorStop(0, "#ffffff");
          irisGrad.addColorStop(0.2, "#ffe066");
          irisGrad.addColorStop(0.5, "#ff7700");
          irisGrad.addColorStop(0.85, "#cc2200");
          irisGrad.addColorStop(1, "rgba(120, 10, 0, 0)");

          ctx.fillStyle = irisGrad;
          ctx.beginPath();
          ctx.arc(0, 0, 20, 0, Math.PI * 2);
          ctx.fill();

          // Radiant flame filament strokes
          ctx.strokeStyle = "rgba(255, 240, 180, 0.65)";
          ctx.lineWidth = 0.75;
          for (let f = 0; f < 28; f++) {
            const a = (f / 28) * Math.PI * 2 + Math.sin(t * 3 + f) * 0.1;
            const rInner = 6;
            const rOuter = 16 + Math.sin(t * 5 + f * 2) * 3;
            ctx.beginPath();
            ctx.moveTo(Math.cos(a) * rInner, Math.sin(a) * rInner);
            ctx.lineTo(Math.cos(a) * rOuter, Math.sin(a) * rOuter);
            ctx.stroke();
          }

          ctx.restore();

          // Vertical Slit Pupil with dynamic tracking
          // Pupil shifts towards cursor
          const pupilOffsetX = Math.cos(angle) * 7.5 * lookDist;
          const pupilOffsetY = Math.sin(angle) * 3.5 * lookDist;

          ctx.save();
          ctx.translate(cx + pupilOffsetX, cy + pupilOffsetY);
          ctx.rotate(angle * 0.22); // subtle tilt towards target

          // Outer fiery rim around the pupil
          ctx.shadowColor = "#ffaa00";
          ctx.shadowBlur = 8;
          ctx.strokeStyle = "rgba(255, 210, 100, 0.85)";
          ctx.lineWidth = 1.2;

          // Black slit geometry (narrow pointed ellipse)
          ctx.fillStyle = "#020101";
          ctx.beginPath();
          ctx.ellipse(0, 0, 3.2, 11.5, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();

          // Inner void of the pupil
          ctx.shadowBlur = 0;
          ctx.fillStyle = "#000000";
          ctx.beginPath();
          ctx.ellipse(0, 0, 2.4, 10, 0, 0, Math.PI * 2);
          ctx.fill();

          ctx.restore();
          ctx.restore();
        }
      }

      // 2. RENDER FULLSCREEN VOLUMETRIC SPOTLIGHT BEAM CANVAS
      const beamCanvas = beamCanvasRef.current;
      if (beamCanvas) {
        if (!isActive) {
          const ctx = beamCanvas.getContext("2d");
          if (ctx) ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);
        } else {
          // Resize beam canvas to match window
          if (
            beamCanvas.width !== window.innerWidth ||
            beamCanvas.height !== window.innerHeight
          ) {
            beamCanvas.width = window.innerWidth;
            beamCanvas.height = window.innerHeight;
          }

          const ctx = beamCanvas.getContext("2d");
          if (ctx) {
            ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height);

            // Unit direction and perpendicular vector
            const len = Math.max(dist, 1);
            const ux = dx / len;
            const uy = dy / len;
            const perpX = -uy;
            const perpY = ux;

            // Controlled ray spread - terminates strictly at the mouse cursor
            const r0 = 6;
            const r1 = Math.min(20 + len * 0.12, 54);

            ctx.save();

            // 1. Primary Volumetric Ray (Misty white with subtle pale warm yellow tint)
            ctx.beginPath();
            ctx.moveTo(eyeX - perpX * r0, eyeY - perpY * r0);
            ctx.lineTo(targetX - perpX * r1, targetY - perpY * r1);
            ctx.arc(targetX, targetY, r1, angle - Math.PI / 2, angle + Math.PI / 2, false);
            ctx.lineTo(eyeX + perpX * r0, eyeY + perpY * r0);
            ctx.closePath();

            const whiteRayGrad = ctx.createLinearGradient(
              eyeX,
              eyeY,
              targetX + ux * (r1 * 0.4),
              targetY + uy * (r1 * 0.4)
            );
            whiteRayGrad.addColorStop(0, "rgba(255, 255, 255, 0.50)");
            whiteRayGrad.addColorStop(0.12, "rgba(255, 253, 242, 0.38)");
            whiteRayGrad.addColorStop(0.45, "rgba(252, 248, 232, 0.24)");
            whiteRayGrad.addColorStop(0.75, "rgba(248, 242, 218, 0.14)");
            whiteRayGrad.addColorStop(0.92, "rgba(244, 236, 204, 0.06)");
            whiteRayGrad.addColorStop(1, "rgba(240, 230, 190, 0.0)");

            ctx.fillStyle = whiteRayGrad;
            ctx.fill();

            // 2. High-Intensity White Core Beam
            const r0Core = 3;
            const r1Core = r1 * 0.42;

            ctx.beginPath();
            ctx.moveTo(eyeX - perpX * r0Core, eyeY - perpY * r0Core);
            ctx.lineTo(targetX - perpX * r1Core, targetY - perpY * r1Core);
            ctx.arc(targetX, targetY, r1Core, angle - Math.PI / 2, angle + Math.PI / 2, false);
            ctx.lineTo(eyeX + perpX * r0Core, eyeY + perpY * r0Core);
            ctx.closePath();

            const coreWhiteGrad = ctx.createLinearGradient(
              eyeX,
              eyeY,
              targetX,
              targetY
            );
            coreWhiteGrad.addColorStop(0, "rgba(255, 255, 255, 0.72)");
            coreWhiteGrad.addColorStop(0.2, "rgba(255, 255, 250, 0.46)");
            coreWhiteGrad.addColorStop(0.65, "rgba(254, 252, 240, 0.20)");
            coreWhiteGrad.addColorStop(1, "rgba(250, 246, 225, 0.0)");

            ctx.fillStyle = coreWhiteGrad;
            ctx.fill();

            // 3. Spotlight Pool Hotspot Focused Exactly at the Mouse Cursor
            const poolRadius = r1 * 1.05;
            const poolGrad = ctx.createRadialGradient(
              targetX,
              targetY,
              0,
              targetX,
              targetY,
              poolRadius
            );
            poolGrad.addColorStop(0, "rgba(255, 255, 255, 0.42)");
            poolGrad.addColorStop(0.28, "rgba(255, 252, 238, 0.24)");
            poolGrad.addColorStop(0.65, "rgba(248, 242, 216, 0.08)");
            poolGrad.addColorStop(1, "rgba(240, 230, 190, 0.0)");

            ctx.fillStyle = poolGrad;
            ctx.beginPath();
            ctx.arc(targetX, targetY, poolRadius, 0, Math.PI * 2);
            ctx.fill();

            // 4. Subtle Ambient Dust Motes
            motesRef.current.forEach((mote) => {
              mote.y -= mote.speed * 45;
              if (mote.y < 0) mote.y = 1;

              const s = mote.y * len;
              const spread = (r0 + (r1 - r0) * (s / len)) * 0.75;
              const offset = (mote.x - 0.5) * spread * 2;

              const px = eyeX + ux * s + perpX * offset;
              const py = eyeY + uy * s + perpY * offset;

              const alpha = Math.sin(t * 3 + mote.phase) * 0.25 + 0.35;
              ctx.fillStyle = `rgba(255, 252, 235, ${Math.max(alpha, 0)})`;
              ctx.beginPath();
              ctx.arc(px, py, mote.size * 0.85, 0, Math.PI * 2);
              ctx.fill();
            });

            ctx.restore();
          }
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [isActive, updateEyeCoords]);

  return (
    <>
      {/* Fullscreen Fixed Volumetric Spotlight Beam Canvas */}
      <canvas
        ref={beamCanvasRef}
        className={`fixed inset-0 pointer-events-none z-40 transition-opacity duration-300 ${
          isActive ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Main Password & Eye Gateway Card (Matches Reference Video Layout) */}
      <div
        ref={containerRef}
        className={`relative z-20 flex flex-col items-start w-full max-w-md ${className}`}
      >
        {/* Title from reference video: "Reset password." with subtle telemetry */}
        <div className="flex items-baseline justify-between w-full mb-3">
          <h2
            className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#f2f4ec] transition-all duration-300 select-none"
            style={{
              textShadow: isActive
                ? "-8px 2px 14px rgba(0, 0, 0, 0.85), 0 0 24px rgba(255, 170, 0, 0.15)"
                : "none",
            }}
          >
            Reset password.
          </h2>

          <span className="text-[10px] font-mono tracking-widest uppercase text-[#828795]">
            GATEWAY // 01
          </span>
        </div>

        {/* Label: "Password" */}
        <label
          htmlFor="sauron-password-input"
          className="text-xs sm:text-sm font-normal text-[#8e94a0] mb-2 select-none"
        >
          Password
        </label>

        {/* Input Container */}
        <div
          className={`relative w-full h-14 rounded-2xl bg-[#111216]/90 backdrop-blur-md border transition-all duration-300 flex items-center px-4 overflow-visible ${
            isActive
              ? "border-[#ff8800]/50 shadow-[0_0_30px_rgba(255,100,0,0.22)]"
              : "border-white/10 hover:border-white/20"
          }`}
        >
          {/* Password text representation */}
          <div className="flex-1 overflow-hidden pr-12">
            {!isActive ? (
              // Masked password dots (Exact bullet representation from reference video)
              <div className="flex items-center gap-1.5 text-[#e5e7eb] select-none text-base tracking-widest">
                <span className="inline-block text-xl leading-none">●●●●●●●●●●●●●●●●</span>
              </div>
            ) : (
              // Revealed password: "you-shall-not-pass" (from reference video)
              <input
                id="sauron-password-input"
                type="text"
                value={passwordValue}
                onChange={(e) => setPasswordValue(e.target.value)}
                className="w-full bg-transparent font-mono text-sm sm:text-base text-[#f5ebd7] tracking-wider focus:outline-none select-all"
                style={{
                  textShadow: "0 0 10px rgba(255, 180, 50, 0.45)",
                }}
              />
            )}
          </div>

          {/* Right Action Container: Dark Tower + Eye of Sauron / Closed Eyelid */}
          <div
            ref={eyeContainerRef}
            className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center cursor-pointer select-none"
            onClick={toggleEye}
            onMouseEnter={() => {
              setIsHovered(true);
              playHover();
            }}
            onMouseLeave={() => setIsHovered(false)}
            title={isActive ? "Deactivate Sauron Spotlight" : "Activate Sauron Eye & Reveal Password"}
            aria-label="Toggle Password Visibility / Eye of Sauron"
          >
            {/* 1. Closed Eyelid Icon (When Inactive - Matches Reference Video) */}
            <div
              className={`transition-all duration-300 transform ${
                isActive
                  ? "opacity-0 scale-50 pointer-events-none"
                  : "opacity-100 scale-100"
              }`}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-colors duration-200 ${
                  isHovered ? "text-[#b9c7a5]" : "text-[#8e94a0]"
                }`}
              >
                {/* Curved closed eyelid */}
                <path d="M 3 10 C 8 16, 16 16, 21 10" />
                {/* Eyelashes radiating downward */}
                <line x1="6.5" y1="13.5" x2="4.5" y2="16.5" />
                <line x1="12" y1="14.8" x2="12" y2="18.5" />
                <line x1="17.5" y1="13.5" x2="19.5" y2="16.5" />
              </svg>
            </div>

            {/* 2. Dark Tower of Barad-dûr + Blazing Eye of Sauron (When Active) */}
            <div
              className={`absolute -top-7 right-[-2px] flex flex-col items-center pointer-events-none transition-all duration-500 ease-out transform ${
                isActive
                  ? "opacity-100 scale-100 translate-y-0"
                  : "opacity-0 scale-75 translate-y-4"
              }`}
              style={{ width: "96px", height: "90px" }}
            >
              {/* Eye of Sauron Procedural Canvas */}
              <div className="relative w-24 h-12 flex items-center justify-center z-10">
                <canvas
                  ref={eyeCanvasRef}
                  width={140}
                  height={80}
                  className="w-24 h-14 object-contain filter drop-shadow-[0_0_16px_rgba(255,120,0,0.85)]"
                />
              </div>

              {/* Dark Tower of Barad-dûr Spire (Cradles the eye with 2 upward horns) */}
              <div className="relative -mt-3.5 z-0 flex flex-col items-center">
                <svg
                  width="44"
                  height="48"
                  viewBox="0 0 44 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)]"
                >
                  {/* Left Horn */}
                  <path
                    d="M 5 0 C 8 10, 14 18, 19 22 L 18 48 L 12 48 L 9 24 C 6 18, 4 10, 5 0 Z"
                    fill="#18191e"
                    stroke="#2a2c35"
                    strokeWidth="0.8"
                  />
                  {/* Right Horn */}
                  <path
                    d="M 39 0 C 36 10, 30 18, 25 22 L 26 48 L 32 48 L 35 24 C 38 18, 40 10, 39 0 Z"
                    fill="#121316"
                    stroke="#22242b"
                    strokeWidth="0.8"
                  />
                  {/* Center Spire Body & Fluting */}
                  <polygon
                    points="19,22 25,22 27,48 17,48"
                    fill="#1e1f25"
                    stroke="#323440"
                    strokeWidth="0.8"
                  />
                  {/* Center V-cradle highlight */}
                  <line x1="22" y1="22" x2="22" y2="48" stroke="#3d404d" strokeWidth="0.8" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Small Hint Bar Under Input */}
        <div className="flex items-center justify-between w-full mt-2.5 px-1 text-[11px] font-mono text-[#787d8a]">
          <span className="flex items-center gap-1.5">
            <span
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                isActive ? "bg-[#ff8800] animate-pulse" : "bg-[#828795]"
              }`}
            />
            {isActive ? "EYE OF SAURON // TRACKING CURSOR" : "Click eye icon to reveal password"}
          </span>

          {isActive && (
            <span className="text-[#ffaa33] tracking-wider text-[10px] animate-pulse">
              [BEAM ACTIVE]
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default SauronEyeWidget;
