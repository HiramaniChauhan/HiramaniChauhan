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
    handle: "HiramaniChauhan",
    url: "https://github.com/HiramaniChauhan",
    description: "Open-source projects, AI pipelines, system architectures, and full-stack experiments.",
    color: "#b9c7a5",
  },
  {
    platform: "leetcode-1",
    name: "LeetCode",
    handle: "vickythenewone",
    url: "https://leetcode.com/u/vickythenewone/",
    description: "Algorithmic challenges, Data Structures, Dynamic Programming, and Graph Traversals.",
    color: "#f59e0b",
  },
  {
    platform: "leetcode-2",
    name: "LeetCode",
    handle: "hira_ch_n",
    url: "https://leetcode.com/u/hira_ch_n/",
    description: "Algorithmic challenges, Data Structures, Dynamic Programming, and Graph Traversals.",
    color: "#f59e0b",
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
