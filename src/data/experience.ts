export interface Experience {
  id: string;
  type: string;
  role: string;
  companyOrOrg: string;
  duration: string;
  location: string;
  description?: string;
  website?: string;
  responsibilities: string[];
  outcomes: string[];
  techStack: string[];
  isCustomizablePlaceholder?: boolean;
}

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp-nit-tiruchirappalli",
    type: "Academic Research",
    role: "AI/ML Research Project Contributor",
    companyOrOrg: "NIT Tiruchirappalli (Professor-Supervised Academic Research)",
    duration: "Jul 2026 — Present",
    location: "Tiruchirappalli, Tamil Nadu, India",
    description:
      "Worked on an AI-powered financial decision support system focused on analyzing stock market data using Large Language Models (LLMs), Multi-Agent Systems, and Retrieval-Augmented Generation (RAG) to generate intelligent investment recommendations.",
    responsibilities: [
      "Developed an AI-powered stock analysis system using Python, LangChain, LangGraph, and FastAPI.",
      "Designed a multi-agent architecture consisting of News, Technical, Fundamental, Risk, Reflection, and Portfolio Analysis agents.",
      "Implemented Retrieval-Augmented Generation (RAG) using FAISS and vector embeddings to retrieve relevant financial information.",
      "Integrated financial market data and news sources to support comprehensive stock analysis.",
      "Built an AI-driven decision engine to generate BUY, HOLD, and SELL recommendations with confidence scores and explanations.",
      "Worked with LLMs, hierarchical memory, and agent orchestration to improve contextual reasoning and decision-making.",
      "Developed backend APIs using FastAPI and PostgreSQL for data processing and integration.",
    ],
    outcomes: [
      "Architected multi-agent reasoning pipelines delivering automated BUY, HOLD, and SELL recommendations with confidence scores.",
      "Integrated FAISS vector embeddings and financial market data feeds for intelligent context-driven decision support.",
    ],
    techStack: [
      "Python",
      "LangChain",
      "LangGraph",
      "LLMs",
      "RAG",
      "Multi-Agent Systems",
      "FAISS",
      "FastAPI",
      "PostgreSQL",
      "Ollama",
      "REST APIs",
      "Generative AI",
    ],
    isCustomizablePlaceholder: false,
  },
  {
    id: "exp-nit-research-intern",
    type: "Academic Research",
    role: "AI/ML Research Intern",
    companyOrOrg: "NIT Tiruchirappalli (Professor-Supervised Academic Research)",
    duration: "May 2026 — Jun 2026",
    location: "Tiruchirappalli, Tamil Nadu, India",
    description:
      "Worked on a computer vision research project focused on automatically detecting and blurring sensitive visual content in videos using deep learning techniques under the supervision of my guide professor.",
    responsibilities: [
      "Developed a video content detection and blurring pipeline using YOLOv8, PyTorch, and OpenCV.",
      "Prepared and processed a custom dataset of over 7 GB, applying data augmentation techniques to support model training.",
      "Used GPU-based training to develop and experiment with object detection models.",
      "Integrated FFmpeg and OpenCV for video frame processing and automated content blurring.",
      "Worked on improving the detection pipeline for practical video-processing applications.",
    ],
    outcomes: [
      "Engineered an automated video detection and blurring pipeline with high frame-rate temporal consistency.",
      "Curated and preprocessed 7+ GB dataset with data augmentation pipelines for GPU-accelerated model training.",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "YOLOv8",
      "OpenCV",
      "FFmpeg",
      "Computer Vision",
      "Deep Learning",
    ],
    isCustomizablePlaceholder: false,
  },
  {
    id: "exp-hcl-institute",
    type: "Independent Software Development",
    role: "Full-Stack Developer",
    companyOrOrg: "HCL Institute",
    duration: "Dec 2025 — Mar 2026",
    location: "Remote / India",
    website: "https://hclinstitute.online",
    description:
      "Developed and deployed a web-based learning platform designed to provide students with access to online courses, practice tests, learning materials, and other educational resources.",
    responsibilities: [
      "Developed a responsive educational website using React.js, JavaScript, Node.js, and Express.js.",
      "Worked on features for online courses, practice tests, student authentication, and payment integration.",
      "Integrated frontend components with backend APIs to support platform functionality.",
      "Deployed and configured the application on a DigitalOcean Ubuntu server using Nginx.",
      "Managed domain configuration, HTTPS setup, GitHub-based updates, and server maintenance.",
      "Worked on troubleshooting deployment issues and maintaining the production website.",
    ],
    outcomes: [
      "Configured and deployed full-stack production platform on DigitalOcean Ubuntu with Nginx, HTTPS, and domain management.",
      "Delivered complete educational portal workflows including courses, mock tests, auth, and payment processing.",
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
    ],
    isCustomizablePlaceholder: false,
  },
];

