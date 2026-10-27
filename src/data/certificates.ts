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
  certificateUrl?: string; // Google Drive link to view original certificate
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
    certificateUrl: "https://drive.google.com/file/d/1zxFrXO3wc3_7QSSwFknB3A1Ari6OseA8/view?usp=sharing", // Paste your Google Drive link here (e.g. https://drive.google.com/file/d/...)
  },
];
