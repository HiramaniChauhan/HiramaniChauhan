"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useSoundEffects } from "@/hooks/useSoundEffects";

interface CentralSauronEyeProps {
  className?: string;
}

export function CentralSauronEye({ className = "" }: CentralSauronEyeProps) {
  const eyeCenterRef = useRef<HTMLDivElement>(null);
  const eyeVisualRef = useRef<HTMLDivElement>(null);
  const beamCanvasRef = useRef<HTMLCanvasElement>(null);

  // Mouse & Eye coordinates
  const mousePosRef = useRef({ x: 0, y: 0 });
  const smoothMouseRef = useRef({ x: 0, y: 0 });
  const eyeCoordsRef = useRef({ x: 0, y: 0 });
  const animFrameIdRef = useRef<number | null>(null);

  const [isFlared, setIsFlared] = useState(false);
  const { playClick, playHover, playSauronIgnite } = useSoundEffects();

  // Initialize mouse position to default center-left if not moved yet
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isMobile = window.innerWidth < 768;
      mousePosRef.current = {
        x: isMobile ? window.innerWidth * 0.5 : window.innerWidth * 0.28,
        y: isMobile ? window.innerHeight * 0.28 : window.innerHeight * 0.46,
      };
      smoothMouseRef.current = { ...mousePosRef.current };
    }

    const handleMouseMove = (e: MouseEvent) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mousePosRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchstart", handleTouch, { passive: true });
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchstart", handleTouch);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  // Update eye position in viewport
  const updateEyeCoords = useCallback(() => {
    if (eyeCenterRef.current) {
      const rect = eyeCenterRef.current.getBoundingClientRect();
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

  // Floating dust motes inside the volumetric beam
  const motesRef = useRef<
    Array<{ x: number; y: number; speed: number; size: number; phase: number }>
  >([]);

  useEffect(() => {
    if (motesRef.current.length === 0) {
      motesRef.current = Array.from({ length: 32 }, () => ({
        x: Math.random(),
        y: Math.random(),
        speed: 0.0006 + Math.random() * 0.0016,
        size: 0.8 + Math.random() * 2.0,
        phase: Math.random() * Math.PI * 2,
      }));
    }
  }, []);

  // Main 60 FPS Render Loop: Unified Volumetric Spotlight Beam + 3D Gaze Tracking
  useEffect(() => {
    const startTime = performance.now();

    const render = (time: number) => {
      const t = (time - startTime) * 0.001;
      updateEyeCoords();

      // Smooth mouse tracking with cinematic inertia (lerp)
      smoothMouseRef.current.x += (mousePosRef.current.x - smoothMouseRef.current.x) * 0.15;
      smoothMouseRef.current.y += (mousePosRef.current.y - smoothMouseRef.current.y) * 0.15;

      const eyeX = eyeCoordsRef.current.x;
      const eyeY = eyeCoordsRef.current.y;
      const targetX = smoothMouseRef.current.x;
      const targetY = smoothMouseRef.current.y;

      const dx = targetX - eyeX;
      const dy = targetY - eyeY;
      const angle = Math.atan2(dy, dx);
      const dist = Math.hypot(dx, dy);

      // 1. UPDATE REALISTIC EYE 3D PERSPECTIVE TILT
      if (eyeVisualRef.current && typeof window !== "undefined") {
        const normDx = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.5)));
        const normDy = Math.max(-1, Math.min(1, dy / (window.innerHeight * 0.5)));
        const rotY = normDx * 18; // smooth horizontal turn toward mouse
        const rotX = -normDy * 14; // smooth vertical tilt toward mouse
        const rotZ = normDx * normDy * 4; // subtle organic roll

        // Subtle solar breathing scale
        const pulse = Math.sin(t * 2.2) * 0.015;

        eyeVisualRef.current.style.transform = `perspective(900px) rotateX(${rotX.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) rotateZ(${rotZ.toFixed(2)}deg) scale(${
          1 + pulse
        })`;
      }

      // 2. RENDER FULLSCREEN VOLUMETRIC SPOTLIGHT BEAM CANVAS
      // Single unified ray with consistent outer ray color terminating strictly at cursor
      const beamCanvas = beamCanvasRef.current;
      if (beamCanvas) {
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

          // Unit direction vector and perpendicular vector
          const len = Math.max(dist, 1);
          const ux = dx / len;
          const uy = dy / len;
          const perpX = -uy;
          const perpY = ux;

          // Controlled ray spread - starts at eye center slit, ends cleanly at mouse cursor
          const isMobileViewport = typeof window !== "undefined" && window.innerWidth < 640;
          const r0 = isMobileViewport ? 3.0 : 4.0; // Half-width at eye aperture
          // Spotlight beam spread scaled gracefully for mobile and desktop
          const r1 = Math.min(14 + len * 0.07, isMobileViewport ? 32 : 48);

          ctx.save();

          // UNIFIED VOLUMETRIC RAY: Single beam with consistent soft misty white & pale warm yellow color
          ctx.beginPath();
          ctx.moveTo(eyeX - perpX * r0, eyeY - perpY * r0);
          ctx.lineTo(targetX - perpX * r1, targetY - perpY * r1);
          // Soft rounded dome cap terminating strictly at the cursor
          ctx.arc(targetX, targetY, r1, angle - Math.PI / 2, angle + Math.PI / 2, false);
          ctx.lineTo(eyeX + perpX * r0, eyeY + perpY * r0);
          ctx.closePath();

          // Single uniform gradient along the beam (no harsh inner stripe!)
          const rayGrad = ctx.createLinearGradient(eyeX, eyeY, targetX, targetY);
          rayGrad.addColorStop(0, "rgba(255, 252, 240, 0.36)");
          rayGrad.addColorStop(0.18, "rgba(254, 250, 236, 0.28)");
          rayGrad.addColorStop(0.5, "rgba(250, 244, 226, 0.18)");
          rayGrad.addColorStop(0.8, "rgba(246, 238, 214, 0.10)");
          rayGrad.addColorStop(0.96, "rgba(242, 232, 200, 0.04)");
          rayGrad.addColorStop(1, "rgba(240, 228, 190, 0.0)");

          ctx.fillStyle = rayGrad;
          // Soft feathered glow along the beam edges
          ctx.shadowColor = "rgba(255, 248, 225, 0.22)";
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;

          // Soft Spotlight Pool Hotspot Focused Exactly at the Mouse Cursor
          const poolRadius = r1 * 1.15;
          const poolGrad = ctx.createRadialGradient(
            targetX,
            targetY,
            0,
            targetX,
            targetY,
            poolRadius
          );
          poolGrad.addColorStop(0, "rgba(255, 252, 240, 0.30)");
          poolGrad.addColorStop(0.35, "rgba(250, 244, 226, 0.16)");
          poolGrad.addColorStop(0.75, "rgba(245, 236, 210, 0.05)");
          poolGrad.addColorStop(1, "rgba(240, 228, 190, 0.0)");

          ctx.fillStyle = poolGrad;
          ctx.beginPath();
          ctx.arc(targetX, targetY, poolRadius, 0, Math.PI * 2);
          ctx.fill();

          // Ambient dust motes floating within the beam between eye and cursor
          motesRef.current.forEach((mote) => {
            mote.y -= mote.speed * 42;
            if (mote.y < 0) mote.y = 1;

            const s = mote.y * len;
            const spread = (r0 + (r1 - r0) * (s / len)) * 0.75;
            const offset = (mote.x - 0.5) * spread * 2;

            const px = eyeX + ux * s + perpX * offset;
            const py = eyeY + uy * s + perpY * offset;

            const alpha = Math.sin(t * 3.0 + mote.phase) * 0.2 + 0.26;
            ctx.fillStyle = `rgba(255, 250, 232, ${Math.max(alpha, 0)})`;
            ctx.beginPath();
            ctx.arc(px, py, mote.size * 0.75, 0, Math.PI * 2);
            ctx.fill();
          });

          ctx.restore();
        }
      }

      animFrameIdRef.current = requestAnimationFrame(render);
    };

    animFrameIdRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [updateEyeCoords]);

  // Handle click on the eye for ignition burst
  const handleEyeClick = () => {
    playClick();
    playSauronIgnite();
    setIsFlared(true);
    setTimeout(() => setIsFlared(false), 900);
  };

  return (
    <>
      {/* Fullscreen Fixed Volumetric Spotlight Beam Canvas */}
      <canvas
        ref={beamCanvasRef}
        className="fixed inset-0 pointer-events-none z-30 opacity-100"
        aria-hidden="true"
      />

      {/* Floating Photorealistic Eye of Sauron (No Stand, Pure Celestial Entity) */}
      <div
        className={`relative z-20 flex flex-col items-center justify-center select-none ${className}`}
      >
        <div
          ref={eyeCenterRef}
          onClick={handleEyeClick}
          onMouseEnter={playHover}
          className="relative cursor-pointer group flex flex-col items-center"
          title="The Eye of Sauron // Gaze focused on your cursor"
        >
          {/* Ambient solar corona halo behind the eye */}
          <div
            className={`absolute -inset-2.5 sm:-inset-4 rounded-full transition-all duration-700 pointer-events-none blur-xl ${
              isFlared
                ? "bg-gradient-to-r from-[#ffea00]/45 via-[#ff9900]/40 to-[#ff3300]/35 scale-150"
                : "bg-gradient-to-r from-[#ffea00]/22 via-[#ff9900]/18 to-[#ff3300]/12 group-hover:scale-120"
            }`}
          />

          {/* 3D Gaze Tracking Container for the Photorealistic Eye - Compact Mini Scale */}
          <div
            ref={eyeVisualRef}
            style={{ transformStyle: "preserve-3d", willChange: "transform" }}
            className={`relative w-14 sm:w-16 md:w-20 max-w-full flex items-center justify-center transition-all duration-300 ${
              isFlared ? "scale-110" : ""
            }`}
          >
            {/* Photorealistic Burning Eye of Sauron (Retina WebP with PNG fallback) */}
            <picture className="w-full h-auto block select-none pointer-events-none">
              <source srcSet="/images/sauron-eye-real.webp" type="image/webp" />
              <img
                src="/images/sauron-eye-real.png"
                alt="Eye of Sauron"
                width={640}
                height={375}
                draggable={false}
                className="w-full h-auto object-contain filter drop-shadow-[0_0_14px_rgba(255,140,0,0.55)] drop-shadow-[0_0_7px_rgba(255,210,60,0.7)] group-hover:drop-shadow-[0_0_18px_rgba(255,160,0,0.75)] transition-all duration-300"
              />
            </picture>

            {/* Subtle center pupil incandescent core spark */}
            <div className="absolute w-0.5 h-2 sm:w-1 sm:h-2.5 rounded-full bg-gradient-to-b from-[#fff7c2]/80 via-[#ffd000]/60 to-[#ff5500]/40 blur-[0.5px] pointer-events-none mix-blend-screen opacity-70 group-hover:opacity-95 transition-opacity" />
          </div>
        </div>
      </div>
    </>
  );
}

export default CentralSauronEye;

