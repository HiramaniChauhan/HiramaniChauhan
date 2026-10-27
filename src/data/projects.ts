export interface Project {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: "AI / GenAI" | "Computer Vision" | "Enterprise AI" | "Full Stack" | "Machine Learning";
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
      "Autonomous multi-agent financial intelligence engine synthesizing live market data, SEC filings, and predictive analytics.",
    category: "AI / GenAI",
    status: "Active Research",
    planetColor: "#c2b9d0", // Soft Lavender
    glowColor: "rgba(194, 185, 208, 0.4)",
    orbitalRadius: 3.5,
    orbitalSpeed: 0.22,
    problem:
      "Modern financial analysts and institutional investors grapple with fragmented market intelligence, high latency, and opaque disclosures when synthesizing macroeconomic trends into actionable capital allocation strategies.",
    solution:
      "Engineered an autonomous financial decision platform using LangChain, LangGraph, and FastAPI that orchestrates specialized multi-agent systems (News, Technical, Fundamental, Risk, Reflection, and Portfolio Analysis) with RAG over vector embeddings to generate intelligent BUY, HOLD, and SELL recommendations with confidence scores.",
    architecture: [
      "Multi-agent architecture orchestrating News, Technical, Fundamental, Risk, Reflection, and Portfolio agents",
      "Retrieval-Augmented Generation (RAG) using FAISS and vector embeddings for contextual financial information retrieval",
      "High-performance backend APIs using FastAPI and PostgreSQL for robust data processing and integration",
      "AI decision engine generating BUY, HOLD, and SELL recommendations with calibrated confidence scores and explanations",
    ],
    techStack: [
      "Python",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "PostgreSQL",
      "FAISS",
      "LLMs",
      "RAG",
      "Multi-Agent Systems",
      "Ollama",
      "REST APIs",
      "Generative AI",
    ],
    mainFeatures: [
      "Specialized Multi-Agent Swarm: Autonomous collaboration among News, Technical, Fundamental, and Risk analysis agents",
      "Explainable Investment Signals: Automated BUY, HOLD, and SELL recommendations backed by confidence scores and rationales",
      "High-Speed Semantic Search: Sub-second RAG retrieval over earnings reports and market news using FAISS",
      "Low-Latency REST APIs: Scalable asynchronous endpoints powered by FastAPI and PostgreSQL",
    ],
    challenges: [
      "Eliminating financial hallucination through strict agent cross-verification and structured citation anchors",
      "Orchestrating stateful multi-agent reflection loops while preserving sub-second reasoning response times",
      "Ingesting and synchronizing heterogeneous real-time financial market data streams",
    ],
    videoUrl: "",
    posterUrl: "",
    demoUrl: "",
    githubUrl: "https://github.com/HiramaniChauhan/AI--Powered-Financial-Decision-Support-Platform",
    isPlaceholderDemo: true,
    isPlaceholderGithub: false,
    featured: true,
  },
  {
    id: "proj-2",
    slug: "visionguard-ai-video-blurring",
    title: "VisionGuard — AI Video Content Detection and Blurring",
    tagline:
      "Deep learning computer vision pipeline automatically detecting and blurring sensitive visual content in video streams.",
    category: "Computer Vision",
    status: "Production Ready",
    planetColor: "#b9c7a5", // Soft Sage
    glowColor: "rgba(185, 199, 165, 0.4)",
    orbitalRadius: 5.2,
    orbitalSpeed: 0.16,
    problem:
      "Manual review and redaction of sensitive visual elements in video archives is computationally expensive, slow, and exposes human reviewers to sensitive imagery while failing to ensure immediate privacy compliance.",
    solution:
      "Constructed an automated sensitive visual content detection and blurring pipeline utilizing fine-tuned YOLOv8, PyTorch, and OpenCV, trained on a curated 7+ GB custom dataset with GPU acceleration and integrated with FFmpeg for automated video processing.",
    architecture: [
      "YOLOv8 deep learning detection models optimized and trained on a custom 7+ GB augmented visual dataset",
      "GPU-based training and inference pipeline developed in PyTorch for high-throughput frame processing",
      "Automated dynamic obfuscation combining OpenCV Gaussian/pixelation filters with bounding box tracking",
      "FFmpeg hardware-accelerated transcoding and video frame demuxing/muxing pipeline",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "FFmpeg",
      "CUDA",
      "Computer Vision",
      "Deep Learning",
      "FastAPI",
      "Linux",
    ],
    mainFeatures: [
      "Automated Sensitive Content Blurring: Instant detection and adaptive blurring of sensitive objects and visual areas",
      "7+ GB Custom Dataset Training: Custom-trained on diverse augmented imagery with GPU acceleration",
      "Sub-Frame Temporal Consistency: Smooth frame-to-frame tracking minimizing flicker during video playback",
      "High-Performance Video Pipeline: Seamless end-to-end video processing leveraging FFmpeg and OpenCV",
    ],
    challenges: [
      "Preserving high frame rates during concurrent deep learning inference and dynamic frame rendering",
      "Curating, cleaning, and augmenting a 7+ GB custom dataset to prevent false negatives across diverse lighting conditions",
      "Maintaining temporal coherence and eliminating boundary artifacts during rapid scene changes",
    ],
    videoUrl: "",
    posterUrl: "",
    demoUrl: "",
    githubUrl: "https://github.com/HiramaniChauhan/vision-guard",
    isPlaceholderDemo: true,
    isPlaceholderGithub: false,
    featured: true,
  },
  {
    id: "proj-3",
    slug: "hcl-institute-learning-platform",
    title: "HCL Institute — Educational Web & Learning Platform",
    tagline:
      "Full-stack educational platform delivering online courses, practice tests, student authentication, and payment workflows in production.",
    category: "Full Stack",
    status: "Production Ready",
    planetColor: "#dfcaa5", // Warm Sand
    glowColor: "rgba(223, 202, 165, 0.4)",
    orbitalRadius: 7.0,
    orbitalSpeed: 0.11,
    problem:
      "Students and educational institutions require an accessible, reliable, and responsive learning portal that seamlessly manages course materials, practice assessments, student access control, and secure transactions without downtime.",
    solution:
      "Architected, developed, and deployed a production learning platform at hclinstitute.online using React.js, Node.js, and Express.js, hosted on an Ubuntu DigitalOcean cloud server configured with Nginx reverse proxy, SSL/HTTPS, and GitHub-based updates.",
    architecture: [
      "React.js responsive single-page client with modular course discovery and interactive test player",
      "Node.js and Express.js RESTful API microservices managing authentication, course state, and payments",
      "DigitalOcean Ubuntu production cloud server with Nginx reverse proxy and SSL certificate management",
      "GitHub automated deployment pipeline with server monitoring, log rotation, and zero-downtime reloads",
    ],
    techStack: [
      "React.js",
      "JavaScript",
      "Node.js",
      "Express.js",
      "REST APIs",
      "Nginx",
      "DigitalOcean",
      "Linux",
      "Git",
      "GitHub",
      "SSL/HTTPS",
    ],
    mainFeatures: [
      "Online Course Catalog: Comprehensive curriculum management and interactive learning modules",
      "Practice Testing Engine: Timed student mock exams, instant scoring, and performance analytics",
      "Student Authentication & Security: Role-based access control and secure session handling",
      "Live Production Deployment: Configured with Nginx, custom domain (hclinstitute.online), and HTTPS",
    ],
    challenges: [
      "Configuring secure Nginx reverse proxy routing, SSL certificates, and custom domain DNS records",
      "Designing responsive test-taking interfaces that remain fluid across mobile, tablet, and desktop viewports",
      "Managing reliable state persistence during multi-section student practice tests",
    ],
    videoUrl: "",
    posterUrl: "",
    demoUrl: "https://hclinstitute.online",
    githubUrl: "https://github.com/HiramaniChauhan/hclinstitute",
    isPlaceholderDemo: false,
    isPlaceholderGithub: false,
    featured: true,
  },
  {
    id: "proj-4",
    slug: "movie-recommendation-system",
    title: "Movie Recommendation System",
    tagline:
      "Machine Learning-based recommendation system suggesting relevant movies via content similarity and NLP.",
    category: "Machine Learning",
    status: "Production Ready",
    planetColor: "#9ec5d6", // Cool Ice Blue
    glowColor: "rgba(158, 197, 214, 0.4)",
    orbitalRadius: 8.8,
    orbitalSpeed: 0.09,
    problem:
      "Users often struggle to discover relevant films tailored to their taste across extensive movie catalogs without intelligent content-based discovery mechanisms.",
    solution:
      "Developed a Machine Learning-based movie recommendation system that suggests relevant movies based on their content and similarity. The system analyzes movie features, extracts textual semantics with NLP, computes Cosine Similarity matrices, and delivers Top-N recommendations tailored to user interests.",
    architecture: [
      "Built a content-based movie recommendation system using Machine Learning techniques",
      "Performed data preprocessing and feature extraction on movie datasets using Pandas and NumPy",
      "Implemented similarity-based recommendation logic to identify and suggest related movies",
      "Applied Natural Language Processing (NLP) techniques to analyze movie information and descriptions",
      "Developed an end-to-end recommendation pipeline to generate Top-N movie suggestions based on a selected movie",
    ],
    techStack: [
      "Python",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "NLP",
      "Cosine Similarity",
      "Data Science",
      "Feature Extraction",
    ],
    mainFeatures: [
      "Content-Based Recommendation Engine: Intelligently suggests relevant movies matching user preferences by analyzing multi-dimensional content similarities",
      "Feature Extraction & Preprocessing: Cleans, structures, and merges movie metadata, genres, cast, and overview descriptions",
      "NLP & Vector Analysis: Applies natural language processing techniques to evaluate textual descriptions and feature relevance",
      "Cosine Similarity Engine: Computes pairwise similarity scores across high-dimensional feature vectors for instant nearest-neighbor queries",
      "Top-N Recommendation Pipeline: Generates ranked recommendations with similarity scores for any selected movie in the catalog",
    ],
    challenges: [
      "Processing high-dimensional text vectors and sparse feature spaces efficiently during similarity computation",
      "Balancing diverse content signals (genres vs. storyline vs. keywords) to prevent recommendation homogenization",
      "Optimizing data extraction and matrix operations with NumPy and Pandas for rapid sub-second query evaluation",
    ],
    videoUrl: "",
    posterUrl: "",
    demoUrl: "",
    githubUrl: "https://github.com/HiramaniChauhan/movielover",
    isPlaceholderDemo: true,
    isPlaceholderGithub: false,
    featured: true,
  },
];
