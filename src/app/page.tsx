"use client";

import React from "react";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { ProjectModal } from "@/components/ui/ProjectModal";
import { CertificateModal } from "@/components/ui/CertificateModal";
import { HeroSection } from "@/components/sections/HeroSection";
import { WorkSection } from "@/components/sections/WorkSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CodingSection } from "@/components/sections/CodingSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { CertificatesSection } from "@/components/sections/CertificatesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { useActiveSection } from "@/hooks/useActiveSection";

export default function Home() {
  // Activate scroll spy to detect active section across Lenis/native scroll
  useActiveSection();

  return (
    <div className="relative min-h-screen bg-[#060916] text-[#e2e8f0] selection:bg-cyan-500/30 selection:text-cyan-200">
      {/* Background Cosmic Star Grid */}
      <div className="fixed inset-0 cosmic-grid pointer-events-none z-0 opacity-25" />

      {/* Floating Glassmorphism Navigation Bar */}
      <Navbar />

      {/* Main Content Sections (All 8 Sections in exact requested order) */}
      <main id="main-content" className="relative z-10 flex flex-col w-full">
        {/* Section 1: HOME */}
        <HeroSection />

        {/* Section 2: WORK (PROJECTS) */}
        <WorkSection />

        {/* Section 3: SKILLS */}
        <SkillsSection />

        {/* Section 4: CODING */}
        <CodingSection />

        {/* Section 5: EXPERIENCE / INTERNSHIP */}
        <ExperienceSection />

        {/* Section 6: CERTIFICATES */}
        <CertificatesSection />

        {/* Section 7: ABOUT */}
        <AboutSection />

        {/* Section 8: CONTACT */}
        <ContactSection />
      </main>

      {/* Cosmic Mission Footer */}
      <Footer />

      {/* Interactive Global Modals */}
      <ProjectModal />
      <CertificateModal />
    </div>
  );
}
