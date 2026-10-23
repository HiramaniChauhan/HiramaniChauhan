import { create } from "zustand";
import type { Project } from "@/data/projects";
import type { Certificate } from "@/data/certificates";

export type SectionId =
  | "home"
  | "work"
  | "skills"
  | "coding"
  | "experience"
  | "certificates"
  | "about"
  | "contact";

interface PortfolioState {
  isSoundEnabled: boolean;
  toggleSound: () => void;
  setSoundEnabled: (enabled: boolean) => void;

  activeSection: SectionId;
  setActiveSection: (id: SectionId) => void;

  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;

  selectedCertificate: Certificate | null;
  setSelectedCertificate: (cert: Certificate | null) => void;

  activeSkillFilter: string;
  setActiveSkillFilter: (filter: string) => void;

  hoveredSkillId: string | null;
  setHoveredSkillId: (id: string | null) => void;

  qualityLevel: "high" | "medium" | "low";
  setQualityLevel: (quality: "high" | "medium" | "low") => void;

  isReducedMotion: boolean;
  setIsReducedMotion: (reduced: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>((set) => ({
  isSoundEnabled: true,
  toggleSound: () => set((state) => ({ isSoundEnabled: !state.isSoundEnabled })),
  setSoundEnabled: (enabled) => set({ isSoundEnabled: enabled }),

  activeSection: "home",
  setActiveSection: (id) => set({ activeSection: id }),

  selectedProject: null,
  setSelectedProject: (project) => set({ selectedProject: project }),

  selectedCertificate: null,
  setSelectedCertificate: (cert) => set({ selectedCertificate: cert }),

  activeSkillFilter: "All",
  setActiveSkillFilter: (filter) => set({ activeSkillFilter: filter }),

  hoveredSkillId: null,
  setHoveredSkillId: (id) => set({ hoveredSkillId: id }),

  qualityLevel: "high",
  setQualityLevel: (quality) => set({ qualityLevel: quality }),

  isReducedMotion: false,
  setIsReducedMotion: (reduced) => set({ isReducedMotion: reduced }),
}));
