"use client";

import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import { usePortfolioStore } from "@/store/usePortfolioStore";

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const selectedProject = usePortfolioStore((state) => state.selectedProject);
  const selectedCertificate = usePortfolioStore((state) => state.selectedCertificate);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });
    lenisRef.current = lenis;

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }
    animId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Pause Lenis virtual-scroll when a modal is active so mouse-wheel scrolls the modal content directly
  useEffect(() => {
    if (!lenisRef.current) return;
    if (selectedProject || selectedCertificate) {
      lenisRef.current.stop();
    } else {
      lenisRef.current.start();
    }
  }, [selectedProject, selectedCertificate]);

  return <>{children}</>;
}
