export interface Education {
  degree: string;
  field: string;
  institution: string;
  duration: string;
  status: string;
  grade?: string;
  highlights: string[];
}

export interface SocialLinks {
  email: string;
  github: string;
  linkedin: string;
  twitter?: string;
}

export interface ProfileData {
  name: string;
  codename: string;
  headline: string;
  shortBio: string;
  tagline: string;
  socials: SocialLinks;
  resumeUrl: string;
  aboutStory: {
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
  };
  education: Education[];
}

export const PROFILE_DATA: ProfileData = {
  name: "Hiramani Chauhan",
  codename: "CODEVERSE",
  headline: "AI Engineer & Full-Stack Architect",
  shortBio:
    "Software engineer specialized in Generative AI, PyTorch deep learning pipelines, high-concurrency backend services, and interactive web experiences.",
  tagline: "Bridging mathematical rigor, neural architectures, and performant user interfaces.",
  socials: {
    email: "hiramanichauhan2399@gmail.com",
    github: "https://github.com/HiramaniChauhan",
    linkedin: "https://www.linkedin.com/in/hiramanichauhan",
  },
  resumeUrl: "https://drive.google.com/drive/folders/1jmYiL78oZmQfJjXGmw12g2UGCyl-bA-T?usp=sharing",
  aboutStory: {
    paragraph1:
      "I am an engineer driven by curiosity about how computation shapes the real world. My work spans the intersection of Artificial Intelligence, distributed backend microservices, and modern web engineering.",
    paragraph2:
      "Whether developing multi-agent reasoning workflows with LangGraph and RAG, fine-tuning computer vision models with YOLOv8, or engineering low-latency REST APIs in FastAPI, I strive for speed, clarity, and rock-solid architectural fundamentals.",
    paragraph3:
      "Beyond coding, I dedicate time to competitive programming, exploring algorithmic graph problems, and creating immersive 3D web experiences that challenge traditional interface design.",
  },
  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      field: "Computer Science & Advanced Software Engineering",
      institution: "NIT Tiruchirappalli",
      duration: "2024 — Present",
      status: "Completed",
      grade: "First Class with Distinction",
      highlights: [
        "AIR 6 in NIMCET 2024 (All India Rank 6)",
        "Advanced Algorithms & Dynamic Programming",
        "Distributed Databases & High Availability",
        "Artificial Intelligence & Machine Learning Architectures",
      ],
    },
    {
      degree: "Bachelor of Science (B.Sc.)",
      field: "Computer Science & Mathematical Foundations",
      institution: "Mahatma Gandhi Kanshi Vidyapith, Varanasi",
      duration: "2020 — 2023",
      status: "Completed",
      grade: "First Class",
      highlights: [
        "Object-Oriented Programming in C++ and Java",
        "Data Structures, Graph Traversals & Search Algorithms",
        "Relational Database Management Systems (DBMS)",
      ],
    },
  ],
};
