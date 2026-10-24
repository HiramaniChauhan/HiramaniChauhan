import type { Metadata } from "next";
import { Geist, Geist_Mono, Cormorant_Garamond, Unbounded, Syne } from "next/font/google";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["700", "800", "900"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"],
});

export const metadata: Metadata = {
  title: "Hiramani Chauhan | CODEVERSE — 3D AI & Software Engineering Universe",
  description:
    "Production-quality, cinematic 3D personal developer portfolio of Hiramani Chauhan. Demonstrating AI/ML engineering, GenAI pipelines, robust backend architectures, and high-performance full-stack applications.",
  keywords: [
    "Hiramani Chauhan",
    "CODEVERSE",
    "AI Engineer",
    "GenAI",
    "LLM Architecture",
    "Full Stack Developer",
    "Software Engineer",
    "Three.js Portfolio",
    "WebGL",
    "React 19",
    "Next.js",
    "FastAPI",
    "PyTorch",
  ],
  authors: [{ name: "Hiramani Chauhan" }],
  creator: "Hiramani Chauhan",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codeverse.dev",
    title: "Hiramani Chauhan | CODEVERSE — 3D AI & Software Engineering Universe",
    description:
      "Explore the interactive 3D universe of Hiramani Chauhan: AI & GenAI systems, computer vision, full-stack platforms, and engineering achievements.",
    siteName: "CODEVERSE // Hiramani Chauhan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hiramani Chauhan | CODEVERSE",
    description:
      "AI / GenAI Engineer | Full Stack Developer | Software Engineer. Explore projects in a 3D universe.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorant.variable} ${unbounded.variable} ${syne.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#0c0d12] text-[#edece8]">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
