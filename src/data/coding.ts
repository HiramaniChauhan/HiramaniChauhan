export interface CodingProfile {
  platform: string;
  name: string;
  handle: string;
  url: string;
  description: string;
  color: string;
}

export const CODING_PROFILES: CodingProfile[] = [
  {
    platform: "github",
    name: "GitHub",
    handle: "hiramanichauhan",
    url: "https://github.com/HiramaniChauhan",
    description: "Open-source projects, AI pipelines, system architectures, and full-stack experiments.",
    color: "#b9c7a5",
  },
  {
    platform: "leetcode",
    name: "LeetCode",
    handle: "hiramanichauhan",
    url: "https://leetcode.com/u/hiramanichauhan/",
    description: "Algorithmic challenges, Data Structures, Dynamic Programming, and Graph Traversals.",
    color: "#f59e0b",
  },
  {
    platform: "hackerrank",
    name: "HackerRank",
    handle: "hiramanichauhan",
    url: "https://www.hackerrank.com/profile/hiramanichauhan",
    description: "Python, Problem Solving, Algorithms, and SQL challenges.",
    color: "#10b981",
  },
  {
    platform: "codeforces",
    name: "Codeforces",
    handle: "hiramanichauhan",
    url: "https://codeforces.com/profile/hiramanichauhan",
    description: "Contest problem solving and mathematical computational challenges.",
    color: "#3b82f6",
  },
];
