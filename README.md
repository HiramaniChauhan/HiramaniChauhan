# CODEVERSE — 3D Cinematic Developer Portfolio

**Portfolio Owner:** Hiramani Chauhan  
**Callsign:** CODEVERSE // HC-01  
**Headline:** AI / GenAI Engineer | Full Stack Developer | Software Engineer  

---

## 🌌 Overview

**CODEVERSE** is an immersive, production-grade 3D personal universe portfolio built from scratch. It showcases artificial intelligence systems, computer vision, distributed backend architectures, and high-performance interactive full-stack web applications.

---

## 🛠️ Tech Stack

- **Framework:** Next.js App Router (v16 with Turbopack, Cache Components & Partial Prefetching)
- **Language:** React 19 + TypeScript
- **Styling:** Vanilla CSS + Tailwind CSS v4 design tokens
- **3D Graphics:** Three.js + React Three Fiber (`@react-three/fiber`) + React Three Drei (`@react-three/drei`)
- **State Management:** Zustand (`usePortfolioStore`)
- **Smooth Scrolling:** Lenis (`lenis`) with prefers-reduced-motion fallback
- **Icons:** Lucide React + custom SVG brand icons
- **Audio:** Web Audio API Procedural Synthesizer (Zero external audio asset dependencies)

---

## 🪐 Section Directory

The portfolio implements all 8 requested navigation sections in exact order:

1. **Home (`#home`):** Full-screen cinematic 3D landing page with procedural sci-fi quantum core, mouse parallax, and CTAs.
2. **Work (`#work`):** Interactive 3D project universe with distinct planetary bodies and a tactical 2D grid fallback.
   - *AI-Powered Financial Decision Support Platform*
   - *VisionGuard — AI Video Content Detection and Blurring*
   - *AI-Powered Quality Engineering & Intelligent Test Automation Platform*
   - *Digital Learning Platform*
3. **Skills (`#skills`):** 3D celestial constellation network across 8 categories with real-time search and project cross-links.
4. **Coding (`#coding`):** Interactive VT100 terminal simulator with executable commands (`help`, `whoami`, `skills`, `projects`, `profiles`, `matrix`) and verified coding handles.
5. **Experience / Internship (`#experience`):** Futuristic career trajectory timeline with glowing nexus nodes and outcomes.
6. **Certificates (`#certificates`):** Category-filtered certificate showcase with credential inspection modal.
7. **About (`#about`):** Personal engineering mission log, 3D holographic orb visualizer, and verified education (MCA & B.Sc.).
8. **Contact (`#contact`):** Mission Control communications center with form validation, one-click email copying, and direct dispatch.

---

## 🚀 Getting Started

### Prerequisites

- Node.js `v20+` or `v22+` / `v23+`
- npm `v10+`

### Installation

```bash
# Clone the repository
git clone https://github.com/hiramanichauhan/myportfolio.git
cd myportfolio

# Install dependencies
npm install
```

### Running Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Typecheck

```bash
npm run build
npm run start
```

### Linting

```bash
npm run lint
```

---

## 📂 Configuration & Data Editing

All personal data, projects, certificates, and coding links are strictly decoupled from UI components in typed data files:

- **Personal Profile & Bio:** [`src/data/profile.ts`](file:///Users/hiramanichauhan/myportfolio/src/data/profile.ts)
- **Projects & Architectures:** [`src/data/projects.ts`](file:///Users/hiramanichauhan/myportfolio/src/data/projects.ts)
- **Skill Matrix:** [`src/data/skills.ts`](file:///Users/hiramanichauhan/myportfolio/src/data/skills.ts)
- **Coding Profiles & Terminal:** [`src/data/coding.ts`](file:///Users/hiramanichauhan/myportfolio/src/data/coding.ts)
- **Career Timeline:** [`src/data/experience.ts`](file:///Users/hiramanichauhan/myportfolio/src/data/experience.ts)
- **Certificates:** [`src/data/certificates.ts`](file:///Users/hiramanichauhan/myportfolio/src/data/certificates.ts)

---

## 🎬 Reference Video Workflow

When integrating reference videos or links:
1. Provide the video file or link.
2. Specify the target section (e.g. Hero warp, Project planet interaction, or Constellation transition).
3. The modular 3D components in `src/components/3d/` can be swapped or enhanced with customized shader passes or Blender GLB models without affecting the core page architecture.
