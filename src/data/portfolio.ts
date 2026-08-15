export const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof NAV)[number]["id"];

/** Technologies shown in the home constellation. */
export const CONSTELLATION = [
  "C++",
  "Python",
  "JavaScript",
  "React",
  "Node.js",
  "Next.js",
  "SQL",
  "AI",
  "n8n",
] as const;

export type Skill = {
  name: string;
  use: string;
  /** project slugs this skill is used in */
  projects: string[];
};

export const SKILL_GROUPS: { group: string; items: Skill[] }[] = [
  {
    group: "Programming",
    items: [
      { name: "C++", use: "Data structures, algorithms and coursework problem solving.", projects: [] },
      { name: "Python", use: "Scripts, automation glue and working with AI APIs.", projects: ["insight-bot", "flow-desk"] },
      { name: "JavaScript", use: "The language behind everything I ship on the web.", projects: ["studio-site", "insight-bot", "flow-desk"] },
    ],
  },
  {
    group: "Frontend",
    items: [
      { name: "HTML", use: "Semantic structure — the base of every interface.", projects: ["studio-site"] },
      { name: "CSS", use: "Layout, motion and design systems without heavy libraries.", projects: ["studio-site"] },
      { name: "React", use: "Component architecture for interactive product UIs.", projects: ["studio-site", "flow-desk"] },
      { name: "Next.js", use: "Routing, rendering and deploying full stack apps.", projects: ["studio-site"] },
    ],
  },
  {
    group: "Backend",
    items: [
      { name: "Node.js", use: "APIs, server logic and connecting services together.", projects: ["insight-bot", "flow-desk"] },
      { name: "REST APIs", use: "Designing endpoints that the frontend can trust.", projects: ["insight-bot", "flow-desk"] },
    ],
  },
  {
    group: "Database",
    items: [{ name: "SQL", use: "Schemas, queries and keeping data honest.", projects: ["flow-desk"] }],
  },
  {
    group: "AI & Automation",
    items: [
      { name: "AI APIs", use: "Adding language models into real product features.", projects: ["insight-bot"] },
      { name: "n8n", use: "Workflows that move data between apps without babysitting.", projects: ["flow-desk"] },
      { name: "AI-assisted dev", use: "Building and shipping ideas fast, then hardening them.", projects: ["studio-site", "insight-bot", "flow-desk"] },
    ],
  },
  {
    group: "Tools",
    items: [
      { name: "Git", use: "Version control and disciplined commits.", projects: [] },
      { name: "GitHub", use: "Hosting work, issues and collaboration.", projects: [] },
      { name: "VS Code", use: "My daily workspace, heavily customised.", projects: [] },
    ],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  problem: string;
  solution: string;
  stack: string[];
  development: string;
  result: string;
  github?: string;
  live?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "studio-site",
    name: "Studio Site",
    tagline: "A cinematic marketing site built in a weekend",
    overview: "An interactive single-page site with scroll-driven motion and a small content layer.",
    problem: "Small creators need a site that feels premium, but agency work is slow and expensive.",
    solution:
      "A component-driven front end with a design-token system, so the whole look can be re-themed from one file.",
    stack: ["Next.js", "React", "CSS", "AI-assisted dev"],
    development:
      "Motion is composed from a few reusable primitives instead of one-off animations, which keeps the bundle small and the feel consistent.",
    result: "Went from idea to a deployed, responsive site in a weekend — and it still loads fast on mobile.",
  },
  {
    slug: "insight-bot",
    name: "Insight Bot",
    tagline: "Turning documents into answers",
    overview: "A small assistant that reads a set of documents and answers questions about them.",
    problem: "Useful information gets buried in long PDFs and notes nobody re-reads.",
    solution: "A Node service that chunks and indexes text, then asks a language model with only the relevant context.",
    stack: ["Node.js", "Python", "AI APIs", "REST APIs"],
    development:
      "Most of the work was retrieval quality, not prompting — better chunking beat any clever prompt I tried.",
    result: "Answers with sources in a couple of seconds, and it taught me how much engineering sits under an AI feature.",
  },
  {
    slug: "flow-desk",
    name: "Flow Desk",
    tagline: "Automation with a dashboard in front of it",
    overview: "A dashboard on top of n8n workflows, so automations are visible instead of invisible.",
    problem: "Automations silently fail, and nobody notices until something downstream breaks.",
    solution: "Workflows write their runs into SQL; a React dashboard shows status, history and failures at a glance.",
    stack: ["React", "Node.js", "SQL", "n8n", "Python"],
    development: "Everything is event-driven — each workflow step reports in, so the UI never has to poll the tools.",
    result: "Failed runs are caught the same day instead of a week later.",
  },
];

export const LINKS = {
  github: "https://github.com/",
  linkedin: "https://www.linkedin.com/",
  email: "mailto:hello@adityasharma.dev",
} as const;
