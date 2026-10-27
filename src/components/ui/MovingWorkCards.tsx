"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ChevronRight, Video } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { PROJECTS_DATA, Project } from "@/data/projects";
import { useSoundEffects } from "@/hooks/useSoundEffects";

export type ViewMode = "spiral" | "grid" | "orbit";

interface MovingWorkCardsProps {
  onSelectProject: (project: Project) => void;
}

export function MovingWorkCards({ onSelectProject }: MovingWorkCardsProps) {
  const [mode, setMode] = useState<ViewMode>("spiral");
  const { playHover, playClick } = useSoundEffects();

  // Create an expanded list of 12 items (repeating the 4 core projects 3 times)
  // so the 3D cylinder and orbit have a rich, continuous visual presence
  const items = React.useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      ...PROJECTS_DATA[i % PROJECTS_DATA.length],
      instanceId: `instance-${i}`,
      instanceIndex: i,
    }));
  }, []);

  // Motion physics state
  const containerRef = useRef<HTMLDivElement>(null);
  const rotYRef = useRef(0);
  const rotXRef = useRef(0);
  const scrollOffsetRef = useRef(0);
  const velYRef = useRef(0.25); // initial gentle auto-rotation
  const velXRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastMousePosRef = useRef({ x: 0, y: 0 });
  const touchStartPosRef = useRef({ x: 0, y: 0 });
  const touchLockAxisRef = useRef<"horizontal" | "vertical" | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };
    velYRef.current = 0;
    velXRef.current = 0;
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - lastMousePosRef.current.x;
    const dy = e.clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: e.clientX, y: e.clientY };

    velYRef.current = dx * 0.45;
    velXRef.current = -dy * 0.35;
    rotYRef.current += dx * 0.45;
    rotXRef.current += -dy * 0.35;
    scrollOffsetRef.current -= dy * 0.8;
  }, []);

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
    touchLockAxisRef.current = null;
  }, []);

  // Touch handlers with axis-locking so vertical page scroll is never blocked
  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isDraggingRef.current = true;
      lastMousePosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchStartPosRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      touchLockAxisRef.current = null;
      velYRef.current = 0;
      velXRef.current = 0;
    }
  };

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDraggingRef.current || e.touches.length === 0) return;
    const clientX = e.touches[0].clientX;
    const clientY = e.touches[0].clientY;

    const totalDx = Math.abs(clientX - touchStartPosRef.current.x);
    const totalDy = Math.abs(clientY - touchStartPosRef.current.y);

    if (!touchLockAxisRef.current && (totalDx > 8 || totalDy > 8)) {
      touchLockAxisRef.current = totalDx >= totalDy ? "horizontal" : "vertical";
    }

    if (touchLockAxisRef.current === "vertical") {
      // User is scrolling the page vertically — don't rotate cards
      return;
    }

    const dx = clientX - lastMousePosRef.current.x;
    const dy = clientY - lastMousePosRef.current.y;
    lastMousePosRef.current = { x: clientX, y: clientY };

    velYRef.current = dx * 0.5;
    velXRef.current = -dy * 0.25;
    rotYRef.current += dx * 0.5;
    rotXRef.current += -dy * 0.25;
    scrollOffsetRef.current -= dy * 0.6;
  }, []);

  // Wheel interaction
  const handleWheel = useCallback((e: WheelEvent) => {
    if (mode === "grid") return;
    e.preventDefault();
    rotYRef.current += e.deltaX * 0.25;
    rotXRef.current -= e.deltaY * 0.15;
    scrollOffsetRef.current += e.deltaY * 0.5;
    velYRef.current += e.deltaX * 0.05;
  }, [mode]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleMouseUp);

    const onWheel = (e: WheelEvent) => handleWheel(e);
    container.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
      container.removeEventListener("wheel", onWheel);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleWheel]);

  // 60 FPS Render loop applying 3D transformations to each card
  const cardElementsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (mode === "grid") return;

    const total = items.length;

    const render = () => {
      const winW = typeof window !== "undefined" ? window.innerWidth : 1200;
      const isMobile = winW < 640;
      const isTablet = winW < 1024;
      const radius = isMobile ? Math.min(winW * 0.38, 160) : isTablet ? 280 : 420;
      const yStep = isMobile ? 48 : 62;

      if (!isDraggingRef.current) {
        // Friction damping
        velYRef.current *= 0.94;
        velXRef.current *= 0.94;

        // Subtle continuous idle rotation like the video
        const idleSpeed = mode === "orbit" ? 0.35 : 0.22;
        rotYRef.current += velYRef.current + idleSpeed;
        rotXRef.current += velXRef.current;

        // Clamp vertical tilt to comfortable angle
        rotXRef.current = Math.max(-28, Math.min(28, rotXRef.current));
      }

      const currentRotY = rotYRef.current;
      const currentRotX = rotXRef.current;

      cardElementsRef.current.forEach((el, i) => {
        if (!el) return;

        if (mode === "spiral") {
          // Vertical Cylindrical Spiral (like 'S' mode in reference video)
          const angleStep = (Math.PI * 2) / (total * 0.55);
          const angle = i * angleStep + (currentRotY * Math.PI) / 180;
          const baseY = (i - (total - 1) / 2) * yStep;
          const y = baseY + (scrollOffsetRef.current % (total * yStep * 0.5));

          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - radius;
          const deg = (angle * 180) / Math.PI;

          // Depth falloff: cards facing camera are bright, cards in back fade subtly
          const normZ = (z + radius * 2) / (radius * 2); // 0 to 1
          const opacity = Math.max(0.35, Math.min(1, 0.4 + normZ * 0.6));
          const brightness = Math.max(0.45, Math.min(1, 0.5 + normZ * 0.5));

          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
            1
          )}px, ${z.toFixed(1)}px) rotateY(${deg.toFixed(1)}deg) rotateX(${currentRotX.toFixed(
            1
          )}deg)`;
          el.style.opacity = `${opacity.toFixed(2)}`;
          el.style.filter = `brightness(${brightness.toFixed(2)})`;
          el.style.zIndex = `${Math.round(z + 1000)}`;
        } else if (mode === "orbit") {
          // Horizontal Orbit Ring (like 'O' mode in reference video)
          const angle = ((i / total) * Math.PI * 2) + (currentRotY * Math.PI) / 180;
          const x = Math.sin(angle) * (radius * 1.05);
          const z = Math.cos(angle) * (radius * 1.05) - (radius * 0.85);
          const y = Math.sin(angle * 2) * (isMobile ? 12 : 20); // gentle undulating wave
          const deg = (angle * 180) / Math.PI;

          const normZ = (z + radius * 2) / (radius * 2);
          const opacity = Math.max(0.35, Math.min(1, 0.35 + normZ * 0.65));
          const brightness = Math.max(0.45, Math.min(1, 0.5 + normZ * 0.5));

          el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(
            1
          )}px, ${z.toFixed(1)}px) rotateY(${deg.toFixed(1)}deg) rotateX(${currentRotX.toFixed(
            1
          )}deg)`;
          el.style.opacity = `${opacity.toFixed(2)}`;
          el.style.filter = `brightness(${brightness.toFixed(2)})`;
          el.style.zIndex = `${Math.round(z + 1000)}`;
        }
      });

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [mode, items.length]);

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* Top Center Mode Switcher (S = Spiral / G = Grid / O = Orbit) matching reference video */}
      <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#131418]/90 border border-white/10 backdrop-blur-md mb-6 sm:mb-8 z-30 shadow-lg shadow-black/40">
        <button
          onClick={() => {
            playClick();
            setMode("spiral");
          }}
          onMouseEnter={playHover}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all active:scale-95 ${mode === "spiral"
            ? "bg-[#b9c7a5] text-[#0c0d10] font-bold shadow-md shadow-[#b9c7a5]/30 scale-105"
            : "text-[#8e94a0] hover:text-white"
            }`}
          title="Spiral 3D Cylinder View"
          aria-label="Spiral View"
        >
          S
        </button>
        <button
          onClick={() => {
            playClick();
            setMode("grid");
          }}
          onMouseEnter={playHover}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all active:scale-95 ${mode === "grid"
            ? "bg-[#b9c7a5] text-[#0c0d10] font-bold shadow-md shadow-[#b9c7a5]/30 scale-105"
            : "text-[#8e94a0] hover:text-white"
            }`}
          title="Grid View"
          aria-label="Grid View"
        >
          G
        </button>
        <button
          onClick={() => {
            playClick();
            setMode("orbit");
          }}
          onMouseEnter={playHover}
          className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs transition-all active:scale-95 ${mode === "orbit"
            ? "bg-[#b9c7a5] text-[#0c0d10] font-bold shadow-md shadow-[#b9c7a5]/30 scale-105"
            : "text-[#8e94a0] hover:text-white"
            }`}
          title="Orbit Ring View"
          aria-label="Orbit View"
        >
          O
        </button>
      </div>

      {/* 3D Motion Stage (Spiral & Orbit Modes) */}
      {mode !== "grid" && (
        <div
          ref={containerRef}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
          className="relative w-full h-[460px] sm:h-[540px] md:h-[600px] flex items-center justify-center overflow-hidden cursor-grab active:cursor-grabbing border border-white/[0.06] rounded-2xl bg-[#0a0b0e]"
          style={{ perspective: "1100px", perspectiveOrigin: "50% 50%" }}
        >

          {/* 3D Preserved Space Container */}
          <div
            className="relative w-0 h-0 flex items-center justify-center pointer-events-none"
            style={{ transformStyle: "preserve-3d" }}
          >
            {items.map((proj, i) => (
              <div
                key={proj.instanceId}
                ref={(el) => {
                  cardElementsRef.current[i] = el;
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  onSelectProject(proj);
                }}
                onMouseEnter={playHover}
                className="absolute top-[-98px] left-[-96px] sm:top-[-110px] sm:left-[-112px] md:left-[-128px] w-48 sm:w-56 md:w-64 h-[195px] sm:h-[220px] pointer-events-auto rounded-2xl p-3.5 sm:p-4 bg-gradient-to-b from-[#15161c]/95 via-[#111217]/95 to-[#0c0d12]/95 border border-white/15 hover:border-[#b9c7a5] transition-[border-color,box-shadow] duration-200 cursor-pointer shadow-2xl hover:shadow-[#b9c7a5]/20 group flex flex-col justify-between"
                style={{ willChange: "transform, opacity" }}
              >
                {/* Card Header: Category & Index */}
                <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                  <div className="flex items-center gap-1.5">
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: proj.planetColor }}
                    />
                    <span
                      style={{ color: proj.planetColor }}
                      className="text-[9.5px] font-mono font-semibold uppercase tracking-wider"
                    >
                      {proj.category}
                    </span>
                  </div>
                  <span className="text-[9.5px] font-mono text-[#828795] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10">
                    0{(proj.instanceIndex % 4) + 1}
                  </span>
                </div>

                {/* Card Body: Title, Tagline & Tech Stack */}
                <div className="flex flex-col gap-1.5 flex-1 justify-center py-2">
                  <h3 className="text-xs sm:text-[13.5px] font-serif text-[#f2f4ec] font-normal group-hover:text-[#b9c7a5] transition-colors leading-snug line-clamp-2">
                    {proj.title}
                  </h3>
                  <p className="text-[10px] sm:text-[10.5px] text-[#9da2af] font-mono leading-relaxed line-clamp-2">
                    {proj.tagline}
                  </p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {proj.techStack.slice(0, 3).map((tech, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[8.5px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Inspect & Actions (GitHub + Video Demo) */}
                <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[9.5px] font-mono">
                  <span className="flex items-center gap-1 text-[#b9c7a5] group-hover:underline">
                    Inspect
                    <ChevronRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    {proj.githubUrl && (
                      <a
                        href={proj.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded bg-white/5 hover:bg-white/10 text-[#828795] hover:text-[#b9c7a5] transition-colors"
                        title="GitHub Repository"
                      >
                        <GithubIcon className="w-3 h-3" />
                      </a>
                    )}
                    <a
                      href={proj.videoUrl || "#"}
                      target={proj.videoUrl && proj.videoUrl !== "#" ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      onClick={(e) => {
                        if (!proj.videoUrl || proj.videoUrl === "#") {
                          e.preventDefault();
                          alert("Video demo Drive link will open once you paste your Google Drive URL in data/projects.ts!");
                        }
                      }}
                      className="px-1.5 py-0.5 rounded bg-purple-500/15 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 transition-colors flex items-center gap-1 text-[8.5px]"
                      title="Watch Video Demo on Google Drive"
                    >
                      <Video className="w-2.5 h-2.5 text-purple-400" />
                      <span>Video</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid Mode ('G' from reference video) */}
      {mode === "grid" && (
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-4 animate-in fade-in duration-300">
          {PROJECTS_DATA.map((proj, idx) => (
            <div
              key={proj.id}
              className="rounded-2xl p-4 bg-gradient-to-b from-[#15161c]/95 via-[#111217]/95 to-[#0c0d12]/95 hover:bg-[#181a22] border border-white/[0.08] hover:border-[#b9c7a5]/40 transition-all duration-300 flex flex-col justify-between min-h-[220px] group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-0.5"
              onClick={() => onSelectProject(proj)}
              onMouseEnter={playHover}
            >
              {/* Header: Category & Index */}
              <div className="flex items-center justify-between pb-2.5 border-b border-white/[0.06]">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: proj.planetColor }}
                  />
                  <span
                    style={{ color: proj.planetColor }}
                    className="text-[10px] font-mono font-semibold uppercase tracking-wider"
                  >
                    {proj.category}
                  </span>
                </div>
                <span className="text-[9.5px] font-mono text-[#828795] px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10">
                  0{idx + 1}
                </span>
              </div>

              {/* Title & Tagline & Tech Stack */}
              <div className="flex flex-col gap-1.5 flex-1 justify-center py-2.5">
                <h3 className="text-xs sm:text-[13.5px] font-serif text-[#f2f4ec] font-normal group-hover:text-[#b9c7a5] transition-colors leading-snug line-clamp-2">
                  {proj.title}
                </h3>
                <p className="text-[10.5px] text-[#9da2af] font-mono leading-relaxed line-clamp-2">
                  {proj.tagline}
                </p>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {proj.techStack.slice(0, 3).map((tech, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/[0.03] border border-white/[0.08] text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Trigger Row */}
              <div className="flex items-center justify-between pt-2.5 border-t border-white/[0.06] text-[10px] font-mono">
                <span className="flex items-center gap-1 text-[#b9c7a5] group-hover:underline">
                  Inspect
                  <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </span>
                <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                  {proj.githubUrl && (
                    <a
                      href={proj.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/5 hover:bg-white/10 text-white transition-colors text-[9.5px]"
                      title="GitHub Repository"
                    >
                      <GithubIcon className="w-3 h-3 text-[#b9c7a5]" />
                      <span>Code</span>
                    </a>
                  )}
                  <a
                    href={proj.videoUrl || "#"}
                    target={proj.videoUrl && proj.videoUrl !== "#" ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    onClick={(e) => {
                      if (!proj.videoUrl || proj.videoUrl === "#") {
                        e.preventDefault();
                        alert("Video demo Drive link will open once you paste your Google Drive URL in data/projects.ts!");
                      }
                    }}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-purple-500/15 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 transition-colors text-[9.5px]"
                    title="Watch Video Demo on Google Drive"
                  >
                    <Video className="w-3 h-3 text-purple-400" />
                    <span>Video Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovingWorkCards;
