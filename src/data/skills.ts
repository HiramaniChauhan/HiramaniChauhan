export type SkillCategory =
  | "Programming Languages"
  | "DSA & Problem Solving"
  | "AI & Machine Learning"
  | "Generative AI & LLMs"
  | "Backend Development"
  | "Frontend Development"
  | "Databases & Cloud"
  | "Core CS & System Design";

export interface SkillItem {
  id: string;
  name: string;
  category: SkillCategory;
  description: string;
  relatedProjects: string[];
  isCore: boolean;
  color: string;
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  "Programming Languages",
  "DSA & Problem Solving",
  "AI & Machine Learning",
  "Generative AI & LLMs",
  "Backend Development",
  "Frontend Development",
  "Databases & Cloud",
  "Core CS & System Design",
];

export const SKILLS_DATA: SkillItem[] = [
  // ── Programming Languages ──
  {
    id: "lang-cpp",
    name: "C++",
    category: "Programming Languages",
    description: "Systems programming, competitive coding, and performance-critical applications.",
    relatedProjects: [],
    isCore: true,
    color: "#00599C",
  },
  {
    id: "lang-python",
    name: "Python",
    category: "Programming Languages",
    description: "ML pipelines, backend services, automation scripts, and data processing.",
    relatedProjects: ["proj-1", "proj-2", "proj-3"],
    isCore: true,
    color: "#3776AB",
  },
  {
    id: "lang-js",
    name: "JavaScript",
    category: "Programming Languages",
    description: "Dynamic web applications, DOM manipulation, and async event-driven logic.",
    relatedProjects: ["proj-1", "proj-4"],
    isCore: true,
    color: "#F7DF1E",
  },
  {
    id: "lang-ts",
    name: "TypeScript",
    category: "Programming Languages",
    description: "Type-safe full-stack development across React, Node.js, and API layers.",
    relatedProjects: ["proj-1", "proj-3", "proj-4"],
    isCore: true,
    color: "#3178C6",
  },

  // ── DSA & Problem Solving ──
  {
    id: "dsa-core",
    name: "DSA",
    category: "DSA & Problem Solving",
    description: "Arrays, trees, graphs, dynamic programming, and advanced data structures.",
    relatedProjects: [],
    isCore: true,
    color: "#E74C3C",
  },
  {
    id: "dsa-ps",
    name: "Problem Solving",
    category: "DSA & Problem Solving",
    description: "Systematic approach to breaking down complex algorithmic challenges.",
    relatedProjects: [],
    isCore: true,
    color: "#E67E22",
  },
  {
    id: "dsa-algo",
    name: "Algorithms",
    category: "DSA & Problem Solving",
    description: "Sorting, searching, graph traversal, greedy, backtracking, and optimization.",
    relatedProjects: [],
    isCore: false,
    color: "#F39C12",
  },
  {
    id: "dsa-oop",
    name: "OOP",
    category: "DSA & Problem Solving",
    description: "Object-oriented design patterns, SOLID principles, and clean architecture.",
    relatedProjects: [],
    isCore: false,
    color: "#D35400",
  },

  // ── AI & Machine Learning ──
  {
    id: "ai-ml",
    name: "Machine Learning",
    category: "AI & Machine Learning",
    description: "Supervised/unsupervised learning, feature engineering, and model evaluation.",
    relatedProjects: ["proj-1", "proj-2"],
    isCore: true,
    color: "#9B59B6",
  },
  {
    id: "ai-dl",
    name: "Deep Learning",
    category: "AI & Machine Learning",
    description: "Neural networks, CNNs, RNNs, transformers, and transfer learning.",
    relatedProjects: ["proj-2"],
    isCore: true,
    color: "#8E44AD",
  },
  {
    id: "ai-pytorch",
    name: "PyTorch",
    category: "AI & Machine Learning",
    description: "Model training, fine-tuning, tensor operations, and GPU-accelerated inference.",
    relatedProjects: ["proj-2"],
    isCore: true,
    color: "#EE4C2C",
  },
  {
    id: "ai-yolo",
    name: "YOLOv8",
    category: "AI & Machine Learning",
    description: "Real-time object detection, instance segmentation, and pose estimation.",
    relatedProjects: ["proj-2"],
    isCore: false,
    color: "#00D4AA",
  },
  {
    id: "ai-opencv",
    name: "OpenCV",
    category: "AI & Machine Learning",
    description: "Computer vision, image processing, video analysis, and feature extraction.",
    relatedProjects: ["proj-2"],
    isCore: false,
    color: "#5C3EE8",
  },

  // ── Generative AI & LLMs ──
  {
    id: "genai-llms",
    name: "LLMs",
    category: "Generative AI & LLMs",
    description: "Large language model integration, prompt engineering, and output structuring.",
    relatedProjects: ["proj-1", "proj-3"],
    isCore: true,
    color: "#00D4FF",
  },
  {
    id: "genai-rag",
    name: "RAG",
    category: "Generative AI & LLMs",
    description: "Retrieval-Augmented Generation with semantic search and context injection.",
    relatedProjects: ["proj-1"],
    isCore: true,
    color: "#00B4D8",
  },
  {
    id: "genai-langchain",
    name: "LangChain",
    category: "Generative AI & LLMs",
    description: "Orchestrating LLM chains, memory, tools, and retrieval-augmented pipelines.",
    relatedProjects: ["proj-1", "proj-3"],
    isCore: true,
    color: "#1C3C3C",
  },
  {
    id: "genai-langgraph",
    name: "LangGraph",
    category: "Generative AI & LLMs",
    description: "Stateful multi-step agent graphs with conditional routing and cycles.",
    relatedProjects: ["proj-3"],
    isCore: false,
    color: "#2D6A4F",
  },
  {
    id: "genai-multiagent",
    name: "Multi-Agent Systems",
    category: "Generative AI & LLMs",
    description: "Coordinated AI agents with role delegation, planning, and tool invocation.",
    relatedProjects: ["proj-3"],
    isCore: false,
    color: "#40916C",
  },
  {
    id: "genai-faiss",
    name: "FAISS",
    category: "Generative AI & LLMs",
    description: "High-performance vector similarity search and dense embedding indexing.",
    relatedProjects: ["proj-1"],
    isCore: false,
    color: "#0077B6",
  },

  // ── Backend Development ──
  {
    id: "be-fastapi",
    name: "FastAPI",
    category: "Backend Development",
    description: "High-performance async Python APIs with auto-generated OpenAPI docs.",
    relatedProjects: ["proj-1", "proj-2"],
    isCore: true,
    color: "#009688",
  },
  {
    id: "be-node",
    name: "Node.js",
    category: "Backend Development",
    description: "Server-side JavaScript runtime for scalable, event-driven applications.",
    relatedProjects: ["proj-4"],
    isCore: true,
    color: "#339933",
  },
  {
    id: "be-express",
    name: "Express.js",
    category: "Backend Development",
    description: "Minimal web framework for REST APIs, middleware, and routing.",
    relatedProjects: ["proj-4"],
    isCore: false,
    color: "#000000",
  },
  {
    id: "be-rest",
    name: "REST APIs",
    category: "Backend Development",
    description: "RESTful architecture design, versioning, pagination, and error handling.",
    relatedProjects: ["proj-1", "proj-4"],
    isCore: false,
    color: "#FF6F00",
  },
  {
    id: "be-jwt",
    name: "JWT",
    category: "Backend Development",
    description: "Token-based authentication, refresh flows, and secure session management.",
    relatedProjects: ["proj-4"],
    isCore: false,
    color: "#D63AFF",
  },

  // ── Frontend Development ──
  {
    id: "fe-react",
    name: "React.js",
    category: "Frontend Development",
    description: "Component-driven UIs with hooks, context, state management, and SSR.",
    relatedProjects: ["proj-1", "proj-3", "proj-4"],
    isCore: true,
    color: "#61DAFB",
  },
  {
    id: "fe-ts",
    name: "TypeScript",
    category: "Frontend Development",
    description: "Strictly typed React components, interfaces, generics, and type guards.",
    relatedProjects: ["proj-1", "proj-4"],
    isCore: true,
    color: "#3178C6",
  },
  {
    id: "fe-vite",
    name: "Vite",
    category: "Frontend Development",
    description: "Lightning-fast build tool with HMR, tree-shaking, and optimized bundling.",
    relatedProjects: ["proj-4"],
    isCore: false,
    color: "#646CFF",
  },

  // ── Databases & Cloud ──
  {
    id: "db-postgres",
    name: "PostgreSQL",
    category: "Databases & Cloud",
    description: "Advanced relational queries, indexing, CTEs, and schema migrations.",
    relatedProjects: ["proj-1"],
    isCore: true,
    color: "#336791",
  },
  {
    id: "db-mysql",
    name: "MySQL",
    category: "Databases & Cloud",
    description: "Relational database design, joins, transactions, and stored procedures.",
    relatedProjects: ["proj-4"],
    isCore: false,
    color: "#4479A1",
  },
  {
    id: "db-dynamo",
    name: "DynamoDB",
    category: "Databases & Cloud",
    description: "NoSQL key-value store with single-table design and global secondary indexes.",
    relatedProjects: [],
    isCore: false,
    color: "#4053D6",
  },
  {
    id: "cloud-aws",
    name: "AWS",
    category: "Databases & Cloud",
    description: "EC2, S3, Lambda, API Gateway, and cloud infrastructure deployment.",
    relatedProjects: ["proj-1"],
    isCore: true,
    color: "#FF9900",
  },

  // ── Core CS & System Design ──
  {
    id: "cs-dbms",
    name: "DBMS",
    category: "Core CS & System Design",
    description: "Normalization, ACID properties, transactions, and query optimization.",
    relatedProjects: [],
    isCore: true,
    color: "#2ECC71",
  },
  {
    id: "cs-os",
    name: "Operating Systems",
    category: "Core CS & System Design",
    description: "Process scheduling, memory management, concurrency, and file systems.",
    relatedProjects: [],
    isCore: true,
    color: "#1ABC9C",
  },
  {
    id: "cs-cn",
    name: "Computer Networks",
    category: "Core CS & System Design",
    description: "TCP/IP, HTTP, DNS, load balancing, and network security fundamentals.",
    relatedProjects: [],
    isCore: false,
    color: "#16A085",
  },
  {
    id: "cs-sysdesign",
    name: "System Design",
    category: "Core CS & System Design",
    description: "Scalable architecture, microservices, caching, message queues, and CAP theorem.",
    relatedProjects: [],
    isCore: true,
    color: "#27AE60",
  },
];
