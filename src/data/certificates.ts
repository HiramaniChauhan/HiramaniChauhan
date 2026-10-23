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
  "Academic & Scientific Excellence",
];

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: "cert-ngpe-2023",
    title: "National Graduate Physics Examination (NGPE - 2023)",
    category: "Academic & Scientific Excellence",
    issuer: "The Indian Association of Physics Teachers (IAPT)",
    issueDate: "2023",
    credentialId: "NGPE-2023-TOP-10%",
    imagePlaceholderText: "NATIONAL GRADUATE PHYSICS EXAMINATION // 2023",
    description:
      "Ranked among the top 10% of the centre candidates in Part A of the National Graduate Physics Examination - 2023 (B.Sc. level), conducted nationally by The Indian Association of Physics Teachers (IAPT).",
    skillsCovered: [
      "Mathematical Physics",
      "Analytical Problem Solving",
      "Classical Mechanics",
      "Quantum Mechanics",
      "Scientific Reasoning",
    ],
    isVerifiedPlaceholder: false,
    verificationUrl: "https://www.iapt.org.in/",
  },
];
