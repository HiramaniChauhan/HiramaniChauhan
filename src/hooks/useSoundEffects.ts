"use client";

import { useEffect } from "react";
import { usePortfolioStore } from "@/store/usePortfolioStore";
import { cosmicAudio } from "@/lib/audio";

export function useSoundEffects() {
  const isSoundEnabled = usePortfolioStore((state) => state.isSoundEnabled);

  useEffect(() => {
    cosmicAudio.setMuted(!isSoundEnabled);
  }, [isSoundEnabled]);

  return {
    isSoundEnabled,
    playHover: () => cosmicAudio.playHover(),
    playClick: () => cosmicAudio.playClick(),
    playChime: (freq?: number, duration?: number) => cosmicAudio.playChime(freq, duration),
    playTerminalKey: () => cosmicAudio.playTerminalKey(),
    playSauronIgnite: () => cosmicAudio.playSauronIgnite(),
    playSauronExtinguish: () => cosmicAudio.playSauronExtinguish(),
  };
}
