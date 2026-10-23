export interface Certificate {
  id: string;
  title: string;
  category: string;
  issuer: string;
  issueDate: string;
  credentialId?: string;
  imagePlaceholderText: string;
  description: string;
  skillsCovered: string[];
  isVerifiedPlaceholder?: boolean;
  verificationUrl?: string;
}

export const CERTIFICATE_CATEGORIES = [
  "All",
  "AI & Machine Learning",
  "Cloud & DevOps",
  "Software Engineering",
  "Data Structures",
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert-deep-learning",
    title: "Deep Learning Specialization",
    category: "AI & Machine Learning",
    issuer: "DeepLearning.AI / Coursera",
    issueDate: "2024",
    credentialId: "DL-AI-84920",
    imagePlaceholderText: "DEEP LEARNING SPECIALIZATION // CERTIFICATE",
    description:
      "Comprehensive mastery of Neural Networks, CNNs, Sequence Models, and Deep Learning system optimization under Andrew Ng.",
    skillsCovered: ["PyTorch", "Convolutional Neural Networks", "Transformers", "Model Optimization"],
    isVerifiedPlaceholder: false,
    verificationUrl: "https://coursera.org/verify/specialization/deep-learning",
  },
  {
    id: "cert-aws-cloud",
    title: "AWS Certified Solutions Architect",
    category: "Cloud & DevOps",
    issuer: "Amazon Web Services",
    issueDate: "2024",
    credentialId: "AWS-SAA-90412",
    imagePlaceholderText: "AWS SOLUTIONS ARCHITECT // CERTIFICATE",
    description:
      "Design of highly available, fault-tolerant, resilient, and scalable distributed cloud architectures on AWS infrastructure.",
    skillsCovered: ["AWS ECS", "DynamoDB", "Lambda", "S3", "VPC & Security"],
    isVerifiedPlaceholder: false,
    verificationUrl: "https://aws.amazon.com/verification",
  },
  {
    id: "cert-langchain-agents",
    title: "Building Generative AI & Multi-Agent Systems",
    category: "AI & Machine Learning",
    issuer: "LangChain Academy",
    issueDate: "2024",
    credentialId: "LC-GENAI-1182",
    imagePlaceholderText: "LANGCHAIN & LANGGRAPH // CERTIFICATE",
    description:
      "Production-grade architectures for autonomous agents, cyclic LangGraph workflows, RAG systems, and semantic vector indexing.",
    skillsCovered: ["LangGraph", "LangChain", "RAG", "FAISS", "Prompt Engineering"],
    isVerifiedPlaceholder: false,
    verificationUrl: "https://academy.langchain.com",
  },
  {
    id: "cert-dsa-expert",
    title: "Algorithmic Problem Solving & System Design",
    category: "Data Structures",
    issuer: "LeetCode & Competitive Platforms",
    issueDate: "2023",
    credentialId: "LC-DSA-7719",
    imagePlaceholderText: "DATA STRUCTURES & ALGORITHMS // ADVANCED",
    description:
      "Demonstrated proficiency in Advanced Dynamic Programming, Graph Algorithms, Binary Trees, and asymptotic optimization.",
    skillsCovered: ["DSA", "Dynamic Programming", "Graph Theory", "Time Complexity Analysis"],
    isVerifiedPlaceholder: false,
    verificationUrl: "https://leetcode.com/hiramanichauhan",
  },
  {
    id: "cert-fullstack-dev",
    title: "Full-Stack Web Engineering & Distributed APIs",
    category: "Software Engineering",
    issuer: "Meta / Coursera",
    issueDate: "2023",
    credentialId: "META-FS-44910",
    imagePlaceholderText: "FULL-STACK WEB ARCHITECTURE // CERTIFICATE",
    description:
      "End-to-end full stack web development using modern TypeScript, React, RESTful architectures, and database design.",
    skillsCovered: ["React.js", "TypeScript", "REST APIs", "PostgreSQL", "Node.js"],
    isVerifiedPlaceholder: false,
    verificationUrl: "https://coursera.org",
  },
];
