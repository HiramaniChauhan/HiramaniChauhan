export interface Experience {
  id: string;
  type: string;
  role: string;
  companyOrOrg: string;
  duration: string;
  location: string;
  responsibilities: string[];
  outcomes: string[];
  techStack: string[];
  isCustomizablePlaceholder?: boolean;
}

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: "exp-1",
    type: "AI & SOFTWARE ENGINEERING",
    role: "AI & Full-Stack Developer",
    companyOrOrg: "Independent Engineering / Systems Lab",
    duration: "2023 — Present",
    location: "India",
    responsibilities: [
      "Architected generative AI pipelines, multi-agent reasoning workflows with LangGraph, and RAG architectures using vector embeddings.",
      "Engineered high-performance real-time computer vision inference pipelines utilizing YOLOv8 and OpenCV with sub-30ms latency.",
      "Designed and deployed scalable microservice backend APIs using FastAPI and Node.js with JWT authentication and PostgreSQL.",
      "Built modern, immersive reactive web interfaces with React, Next.js, TypeScript, and Three.js.",
    ],
    outcomes: [
      "Achieved sub-100ms response times for semantic document retrieval and QA using FAISS and LangChain.",
      "Streamlined real-time object detection processing with optimized tensor operations on GPU/CPU.",
    ],
    techStack: [
      "Python",
      "PyTorch",
      "YOLOv8",
      "LangChain",
      "LangGraph",
      "FastAPI",
      "React.js",
      "TypeScript",
      "PostgreSQL",
    ],
    isCustomizablePlaceholder: false,
  },
  {
    id: "exp-2",
    type: "ACADEMIC & RESEARCH",
    role: "Computer Science Scholar & Graduate Researcher",
    companyOrOrg: "Postgraduate Academic Program (MCA)",
    duration: "2022 — 2024",
    location: "India",
    responsibilities: [
      "Conducted in-depth academic research in Advanced Data Structures, Graph Algorithms, and Distributed Operating Systems.",
      "Developed high-throughput relational and NoSQL database schemas with complex SQL transactions and indexing strategies.",
      "Contributed to departmental open-source software tools and led algorithmic problem-solving study cohorts.",
    ],
    outcomes: [
      "Graduated with top academic standing across core CS curricula including DBMS, Computer Networks, and System Design.",
    ],
    techStack: [
      "C++",
      "Python",
      "Data Structures",
      "Algorithms",
      "DBMS",
      "SQL",
      "Linux",
    ],
    isCustomizablePlaceholder: false,
  },
];
