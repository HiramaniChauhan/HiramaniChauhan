"use client";

import { useEffect } from "react";
import { SectionId, usePortfolioStore } from "@/store/usePortfolioStore";

const SECTION_IDS: SectionId[] = [
  "home",
  "work",
  "skills",
  "coding",
  "experience",
  "certificates",
  "about",
  "contact",
];

export function useActiveSection() {
  const setActiveSection = usePortfolioStore((state) => state.setActiveSection);

  useEffect(() => {
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id as SectionId;
          if (SECTION_IDS.includes(id)) {
            setActiveSection(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: "-40% 0px -40% 0px",
      threshold: 0,
    });

    SECTION_IDS.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [setActiveSection]);
}
