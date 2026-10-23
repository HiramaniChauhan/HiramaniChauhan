export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "AI / GenAI" | "Computer Vision" | "Enterprise AI" | "Full Stack";
  status: "Production Ready" | "Active Research" | "Deployed Prototype";
  planetColor: string;
  glowColor: string;
  orbitalRadius: number;
  orbitalSpeed: number;
  problem: string;
  solution: string;
  architecture: string[];
  techStack: string[];
  mainFeatures: string[];
  challenges: string[];
  videoUrl?: string;
  posterUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  isPlaceholderDemo?: boolean;
  isPlaceholderGithub?: boolean;
  featured: boolean;
}

export const PROJECTS_DATA: Project[] = [
  {
    id: "proj-1",
    slug: "ai-financial-decision-support",
    title: "AI-Powered Financial Decision Support Platform",
    tagline:
      "Enterprise-grade financial intelligence engine synthesizing multi-source market telemetry, predictive analytics, and conversational reasoning.",
    category: "AI / GenAI",
    status: "Deployed Prototype",
    planetColor: "#c2b9d0", // Soft Lavender
    glowColor: "rgba(194, 185, 208, 0.4)",
    orbitalRadius: 3.2,
    orbitalSpeed: 0.25,
    problem:
      "Modern financial analysts and institutional investors grapple with fragmented market intelligence, opaque SEC filings, and high latency when synthesizing macroeconomic trends into actionable capital allocation strategies.",
    solution:
      "Engineered an autonomous financial copilot that integrates Retrieval-Augmented Generation (RAG) over structured fiscal data and real-time news feeds, delivering quantitative scenario modeling, risk assessment, and executive summary generation.",
    architecture: [
      "Hybrid Vector Database (Milvus/Qdrant) indexing earnings transcripts, 10-K filings, and live market sentiments",
      "Multi-agent reasoning loop orchestrating quantitative verification, macro correlation, and anomaly detection",
      "High-throughput FastAPI backend with asynchronous event streaming and caching layer via Redis",
      "Next.js financial visualization dashboard with dynamic chart telemetry and reactive query interface",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "LangChain",
      "OpenAI / Claude LLMs",
      "Qdrant Vector DB",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Tailwind CSS",
      "Docker",
    ],
    mainFeatures: [
      "Dynamic Multi-Document Synthesis: Semantic querying across 10-K, 10-Q filings and real-time market news",
      "Explainable Quantitative Insights: Mathematical calculation checks with citation anchors back to source data",
      "Portfolio Risk Stress-Testing: Generative scenario simulators for interest rate and macro shocks",
      "Real-Time Telemetry Streaming: Server-Sent Events (SSE) token generation with under 400ms TTFT",
    ],
    challenges: [
      "Eliminating financial hallucination through strict citation verification and programmatic numeric validation",
      "Optimizing embedding chunk boundaries to handle multi-column tabular data inside financial reports",
      "Maintaining sub-second response times across complex multi-step reasoning chains",
    ],
    videoUrl: "/videos/project-1.mp4",
    posterUrl: "/videos/project-1.jpg",
    demoUrl: "https://demo.codeverse.dev/financial-ai",
    githubUrl: "https://github.com/hiramanichauhan/ai-financial-decision-platform",
    isPlaceholderDemo: true,
    isPlaceholderGithub: true,
    featured: true,
  },
  {
    id: "proj-2",
    slug: "visionguard-ai-video-blurring",
    title: "VisionGuard — AI Video Content Detection and Blurring",
    tagline:
      "Real-time edge and server-side computer vision system automatically identifying sensitive visual objects, PII, and policy violations.",
    category: "Computer Vision",
    status: "Production Ready",
    planetColor: "#b9c7a5", // Soft Sage
    glowColor: "rgba(185, 199, 165, 0.4)",
    orbitalRadius: 4.8,
    orbitalSpeed: 0.18,
    problem:
      "Manual content moderation of video streams is computationally costly, slow, and exposes human reviewers to sensitive or traumatic imagery while failing to guarantee immediate compliance with data privacy mandates (GDPR/HIPAA).",
    solution:
      "Constructed VisionGuard, a high-performance computer vision pipeline utilizing optimized YOLO/Transformer object detection with dynamic temporal tracking and adaptive Gaussian/pixelation filters for instant video obfuscation.",
    architecture: [
      "YOLOv8 & custom fine-tuned object detection models for PII, face, license plate, and restricted item recognition",
      "Kalman filter & DeepSORT temporal tracking to prevent frame-to-frame bounding box flicker",
      "FFmpeg hardware-accelerated transcoding pipeline with GPU CUDA acceleration for batch processing",
      "WebSocket real-time video stream inspection gateway with sub-50ms inference latency per frame",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "DeepSORT",
      "FFmpeg",
      "CUDA",
      "FastAPI",
      "WebSockets",
      "React",
    ],
    mainFeatures: [
      "Automated PII & Sensitive Item Blurring: Real-time dynamic masking of faces, badges, screens, and credentials",
      "Temporal Frame Coherence: Robust object tracking preventing boundary bleeding during rapid camera pan",
      "Customizable Privacy Policies: Granular redaction profiles based on role, compliance tiers, and sensitivity levels",
      "Batch & Live Stream Support: Seamless processing of recorded video archives and live WebRTC feeds",
    ],
    challenges: [
      "Preserving 30+ FPS throughput while running concurrent neural inference and video rendering pipelines",
      "Mitigating false negatives under extreme lighting conditions and motion blur via temporal interpolation",
      "Managing memory footprint during 4K video transcoding on distributed edge nodes",
    ],
    videoUrl: "/videos/project-2.mp4",
    posterUrl: "/videos/project-2.jpg",
    demoUrl: "https://demo.codeverse.dev/visionguard",
    githubUrl: "https://github.com/hiramanichauhan/visionguard-video-detection",
    isPlaceholderDemo: true,
    isPlaceholderGithub: true,
    featured: true,
  },
  {
    id: "proj-3",
    slug: "ai-quality-engineering-automation",
    title: "AI-Powered Quality Engineering & Intelligent Test Automation Platform",
    tagline:
      "Autonomous QA engine that analyzes software codebases, generates self-healing test suites, and predicts defect hotspots before deployment.",
    category: "Enterprise AI",
    status: "Active Research",
    planetColor: "#dfcaa5", // Warm Sand
    glowColor: "rgba(223, 202, 165, 0.4)",
    orbitalRadius: 6.4,
    orbitalSpeed: 0.12,
    problem:
      "Software test automation suites suffer from high maintenance overhead, test brittleness, and slow reaction to changing UI/API contracts, resulting in flaky CI/CD pipelines and delayed release velocity.",
    solution:
      "Designed an autonomous quality engineering platform that parses Abstract Syntax Trees (AST) and DOM mutations, autonomously synthesizing unit, integration, and end-to-end tests with auto-healing selector logic.",
    architecture: [
      "AST code parser & git diff analyzer pinpointing regression risk vectors and coverage gaps",
      "LLM agent orchestrator with test generation guardrails and deterministic validation sandboxes",
      "Self-healing execution runner resolving broken Playwright/Cypress selectors via DOM semantic embeddings",
      "CI/CD webhook receiver integrating seamlessly with GitHub Actions and GitLab CI",
    ],
    techStack: [
      "TypeScript",
      "Node.js",
      "Python",
      "LangChain",
      "Playwright",
      "Docker",
      "AST / Babel",
      "Redis",
      "Next.js",
      "GraphQL",
    ],
    mainFeatures: [
      "Self-Healing Selectors: Dynamically updates fragile CSS/XPath locators when UI components mutate",
      "Autonomous Test Synthesis: Generates complete Playwright and Jest test specs directly from pull requests",
      "Predictive Flakiness Scoring: Machine learning model trained on historical test telemetry to flag flaky tests",
      "Enterprise CI/CD Integration: Instant feedback loop with actionable test execution reports and failure traces",
    ],
    challenges: [
      "Ensuring generated assertions verify business logic intent rather than trivial code paths",
      "Minimizing execution overhead of self-healing resolution during time-sensitive CI test runs",
      "Handling stateful user workflows with complex mocking and authentication fixtures",
    ],
    videoUrl: "/videos/project-3.mp4",
    posterUrl: "/videos/project-3.jpg",
    demoUrl: "https://demo.codeverse.dev/ai-test-platform",
    githubUrl: "https://github.com/hiramanichauhan/ai-quality-engineering-platform",
    isPlaceholderDemo: true,
    isPlaceholderGithub: true,
    featured: true,
  },
  {
    id: "proj-4",
    slug: "digital-learning-platform",
    title: "Digital Learning Platform",
    tagline:
      "Scalable modern learning management ecosystem with adaptive pedagogical paths, interactive code sandboxes, and collaborative workspaces.",
    category: "Full Stack",
    status: "Production Ready",
    planetColor: "#9ab59f", // Mineral Celadon
    glowColor: "rgba(154, 181, 159, 0.4)",
    orbitalRadius: 7.9,
    orbitalSpeed: 0.09,
    problem:
      "Traditional online learning platforms lack engagement, offer rigid one-size-fits-all curricula, and force students to leave the environment to execute coding assignments, fracturing learner focus.",
    solution:
      "Built a unified full-stack learning platform featuring browser-based isolated code execution, intelligent skill mastery tracking, real-time peer collaboration, and personalized knowledge reinforcement modules.",
    architecture: [
      "Distributed microservices architecture utilizing Node.js/Go for high-concurrency student sessions",
      "Isolated Docker container execution runtime running user-submitted code securely in sub-seconds",
      "Next.js App Router frontend with server-side rendering and responsive interactive course canvas",
      "PostgreSQL and Redis caching layer with WebSocket-powered collaborative coding sessions",
    ],
    techStack: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Go",
      "Docker Sandbox",
      "PostgreSQL",
      "Redis",
      "Tailwind CSS",
      "WebSockets",
    ],
    mainFeatures: [
      "In-Browser Multi-Language Sandbox: Execute Python, JavaScript, and C++ in secure micro-containers",
      "Adaptive Learning Paths: Dynamically adjusts problem difficulty based on learner mastery metrics",
      "Live Collaborative Editor: Real-time pair-programming with operational transformation / CRDT sync",
      "Comprehensive Analytics Dashboard: Granular progress telemetry for students, mentors, and administrators",
    ],
    challenges: [
      "Securing the multi-tenant code execution sandbox against fork bombs, network abuse, and memory leaks",
      "Optimizing WebSocket message broadcast rates during concurrent live coding rooms",
      "Designing an intuitive responsive UI that handles both documentation and interactive split-pane IDEs",
    ],
    videoUrl: "/videos/project-4.mp4",
    posterUrl: "/videos/project-4.jpg",
    demoUrl: "https://demo.codeverse.dev/digital-learning",
    githubUrl: "https://github.com/hiramanichauhan/digital-learning-platform",
    isPlaceholderDemo: true,
    isPlaceholderGithub: true,
    featured: true,
  },
];
