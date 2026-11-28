// ============================================================
// PORTFOLIO CONFIGURATION — Sivaharish
// Centralized configuration file for personal details,
// skills, projects, open-source contributions, and links.
// ============================================================

export const config = {
  // ── Personal Information ──────────────────────────────────
  name: "Sivaharish",
  initials: "SH",
  title: "Software Engineer",
  location: "Chennai, India",
  status: "Student",
  education: {
    degree: "B.E. Computer Science and Engineering",
    college: "St. Joseph's College of Engineering",
    location: "Chennai, India",
    graduationYear: "2029",
  },
  headline:
    "Engineering Student · Java Programmer · Data Structures & Algorithms · Open-Source Contributor · Aspiring Software Development Engineer",
  tagline: "Building software that solves real problems.",
  email: "ssivaharish@outlook.com",

  // ── Availability & Status ────────────────────────────────
  available: true,
  availabilityText: "Computer Science Student · Expected 2029",

  // ── Social & Developer Profiles ───────────────────────────
  github: "https://github.com/sivaharish31",
  linkedin: "https://www.linkedin.com/in/ssivaharish",
  codolio: "https://codolio.com/profile/Sivaharish",

  // ── SEO / Meta ───────────────────────────────────────────
  siteUrl: "https://sivaharish-dev.vercel.app",
  pageTitle: "Sivaharish | Software Engineer",
  metaDescription:
    "Explore the portfolio of Sivaharish, a Computer Science engineering student, Java programmer, and open-source contributor interested in software engineering and backend development.",

  // ── About Section ─────────────────────────────────────────
  about: {
    paragraphs: [
      "I am a Computer Science and Engineering student at St. Joseph's College of Engineering, Chennai (expected graduation 2029), with a strong passion for software engineering and solving real-world engineering problems.",
      "My primary programming language is Java. I actively work on developing my core programming fundamentals, data structures and algorithms, and practical software design skills.",
      "I am deeply interested in backend engineering, system design, and open-source development. I believe that good software is reliable, maintainable, and engineered with clarity.",
      "Rather than only building isolated demos, I actively explore established open-source codebases from organizations like Google, AWS, Microsoft, Netflix, and IBM—debugging complex issues and contributing tested code improvements.",
    ],
    highlights: [
      { label: "Java Programming & OOP", icon: "code-2" },
      { label: "Data Structures & Algorithms", icon: "cpu" },
      { label: "Open-Source Contributions", icon: "git-merge" },
      { label: "Backend Engineering & System Design", icon: "server" },
    ],
  },
};

// ── Skills Configuration ─────────────────────────────────────
// Honestly represented with appropriate proficiency categories.
export interface SkillCategory {
  title: string;
  items: { name: string; level?: "Intermediate" | "Beginner" }[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming Languages",
    items: [
      { name: "Java", level: "Intermediate" },
      { name: "SQL", level: "Intermediate" },
      { name: "Python", level: "Beginner" },
      { name: "JavaScript", level: "Beginner" },
      { name: "TypeScript", level: "Beginner" },
    ],
  },
  {
    title: "Java Concepts",
    items: [
      { name: "Object-Oriented Programming (OOP)" },
    ],
  },
  {
    title: "Frontend Development",
    items: [
      { name: "React" },
      { name: "HTML" },
      { name: "CSS" },
    ],
  },
  {
    title: "Databases",
    items: [
      { name: "MySQL" },
    ],
  },
  {
    title: "Tools & Platforms",
    items: [
      { name: "Git" },
      { name: "GitHub" },
      { name: "Visual Studio Code" },
    ],
  },
  {
    title: "Engineering Interests",
    items: [
      { name: "Data Structures & Algorithms" },
      { name: "System Design" },
      { name: "Backend Engineering" },
      { name: "Open-Source Development" },
    ],
  },
];

// ── Projects Configuration ────────────────────────────────────
export interface Project {
  id: string;
  name: string;
  projectType: string;
  tagline: string;
  description: string;
  architecture: string;
  technologies: string[];
  githubUrl: string;
  liveUrl?: string;
  features: string[];
  featured: boolean;
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: "contest-compass",
    name: "Contest Compass",
    projectType: "Individual Project",
    tagline: "Competitive Programming Contest Discovery Platform",
    description:
      "A platform to discover and track programming contests from different competitive programming platforms.",
    architecture:
      "Spring Boot backend with React frontend and MySQL database.",
    technologies: ["Java", "Spring Boot", "React", "MySQL"],
    githubUrl: "https://github.com/sivaharish31/Contest-Compass",
    features: [
      "Contest discovery",
      "Automated contest synchronization",
      "Saved contests",
      "User authentication",
      "User profiles",
      "Contest reminders",
      "Email notifications",
      "Search and filtering",
      "Responsive user interface",
      "Multiple contest platform integrations",
    ],
    featured: true,
    accentColor: "#2563EB",
  },
];

// ── Open Source Contributions ─────────────────────────────────
export interface Contribution {
  id: string;
  org: string;
  orgDisplayName: string;
  orgLogoUrl?: string;
  repoOwner: string;
  repo: string;
  prNumber: number;
  prTitle: string;
  prDescription: string;
  prUrl: string;
  status: "open" | "merged" | "closed" | "unknown";
  language: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

export const contributions: Contribution[] = [
  {
    id: "netflix-metaflow",
    org: "netflix",
    orgDisplayName: "Netflix",
    orgLogoUrl: "/logos/netflix.svg",
    repoOwner: "Netflix",
    repo: "metaflow",
    prNumber: 3417,
    prTitle: "fix(cards): prevent Table.from_dataframe from mutating input DataFrame",
    prDescription:
      "Fixed an issue in Metaflow Cards where converting a pandas DataFrame into a table mutated the original input DataFrame.",
    prUrl: "https://github.com/Netflix/metaflow/pull/3417",
    status: "merged",
    language: "Python",
    createdAt: "2026-10-24",
    updatedAt: "2026-11-10",
    tags: ["metaflow-cards", "dataframe", "bug-fix"],
  },
  {
    id: "azure-sdk",
    org: "microsoft",
    orgDisplayName: "Microsoft Azure",
    orgLogoUrl: "/logos/microsoft.svg",
    repoOwner: "Azure",
    repo: "azure-sdk-for-java",
    prNumber: 51059,
    prTitle: "fix(azure-core): restore interrupt status in sync retry policy",
    prDescription:
      "Ensured thread interrupt status is properly preserved in synchronous HTTP retry policies when interrupted, adhering to standard Java concurrency guidelines.",
    prUrl: "https://github.com/Azure/azure-sdk-for-java/pull/51059",
    status: "merged",
    language: "Java",
    createdAt: "2026-11-02",
    updatedAt: "2026-11-02",
    tags: ["concurrency", "retry-policy", "azure-core"],
  },
  {
    id: "aws-sdk",
    org: "aws",
    orgDisplayName: "AWS",
    orgLogoUrl: "/logos/aws.svg",
    repoOwner: "aws",
    repo: "aws-sdk-java-v2",
    prNumber: 7546,
    prTitle: "Fix SSO profile token provider resource cleanup",
    prDescription:
      "Fixed resource cleanup for the SSO profile token provider by retaining and closing closeable token providers, with tests for closeable and non-closeable implementations.",
    prUrl: "https://github.com/aws/aws-sdk-java-v2/pull/7546",
    status: "open",
    language: "Java",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["resource-management", "SSO", "token-provider"],
  },
  {
    id: "jsonata",
    org: "ibm",
    orgDisplayName: "IBM",
    orgLogoUrl: "/logos/ibm.svg",
    repoOwner: "IBM",
    repo: "JSONata4Java",
    prNumber: 462,
    prTitle: "Fix substring handling for non-BMP Unicode characters",
    prDescription:
      "Fixed substring handling for non-BMP Unicode characters by correctly accounting for Unicode code points rather than treating UTF-16 offsets as character positions.",
    prUrl: "https://github.com/IBM/JSONata4Java/pull/462",
    status: "open",
    language: "Java",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["unicode", "code-points", "string-processing"],
  },
  {
    id: "microsoft-vscode",
    org: "microsoft",
    orgDisplayName: "Microsoft",
    orgLogoUrl: "/logos/microsoft.svg",
    repoOwner: "microsoft",
    repo: "vscode",
    prNumber: 340171,
    prTitle: "fix(scm): restore auto-surround in commit input",
    prDescription:
      "Restored editor auto-surrounding behavior in the Source Control (SCM) commit message input box.",
    prUrl: "https://github.com/microsoft/vscode/pull/340171",
    status: "open",
    language: "TypeScript",
    createdAt: "2026-10-06",
    updatedAt: "2026-10-07",
    tags: ["vscode", "scm", "editor"],
  },
  {
    id: "elastic-elasticsearch",
    org: "elastic",
    orgDisplayName: "Elastic",
    repoOwner: "elastic",
    repo: "elasticsearch",
    prNumber: 164460,
    prTitle: "Fix SOURCE rendering in ES|QL text formats",
    prDescription:
      "Fixed SOURCE command rendering output formatting across ES|QL text-based response formats.",
    prUrl: "https://github.com/elastic/elasticsearch/pull/164460",
    status: "open",
    language: "Java",
    createdAt: "2026-11-03",
    updatedAt: "2026-11-04",
    tags: ["esql", "formatting", "elasticsearch"],
  },
  {
    id: "uber-nullaway",
    org: "uber",
    orgDisplayName: "Uber",
    repoOwner: "uber",
    repo: "NullAway",
    prNumber: 2113,
    prTitle: "Fix Checker Framework EnsuresNonNullIf support",
    prDescription:
      "Improved support for Checker Framework @EnsuresNonNullIf contracts during NullAway static nullability analysis.",
    prUrl: "https://github.com/uber/NullAway/pull/2113",
    status: "open",
    language: "Java",
    createdAt: "2026-11-02",
    updatedAt: "2026-11-02",
    tags: ["static-analysis", "nullability", "java"],
  },
  {
    id: "error-prone",
    org: "google",
    orgDisplayName: "Google",
    orgLogoUrl: "/logos/google.svg",
    repoOwner: "google",
    repo: "error-prone",
    prNumber: 6351,
    prTitle: "DoNotCallSuggester: handle nested single-statement blocks",
    prDescription:
      "Handled nested single-statement blocks in DoNotCallSuggester so the matching logic recognizes nested throw statements.",
    prUrl: "https://github.com/google/error-prone/pull/6351",
    status: "closed",
    language: "Java",
    createdAt: "2026-11-12",
    updatedAt: "2026-11-12",
    tags: ["static-analysis", "AST", "bug-fix"],
  },
];

// ── Additional Developer Profiles ───────────────────────────
export const communityLinks = [
  {
    name: "Codolio",
    url: "https://codolio.com/profile/Sivaharish",
    description: "Competitive programming and problem-solving profile.",
  },
];

// ── Engineering Interests ─────────────────────────────────────
export const interests = [
  {
    title: "Data Structures & Algorithms",
    description:
      "Strengthening algorithmic problem-solving, efficiency, and foundational computational thinking.",
    icon: "cpu",
  },
  {
    title: "Backend Engineering",
    description:
      "Understanding clean server architectures, request lifecycle, and reliable application backends.",
    icon: "server",
  },
  {
    title: "System Design",
    description:
      "Exploring how scalable architectures are structured, data flow, and trade-offs.",
    icon: "code-2",
  },
  {
    title: "Database Engineering",
    description:
      "Relational data modeling, schema design, and query optimization with MySQL.",
    icon: "database",
  },
  {
    title: "Open-Source Development",
    description:
      "Navigating large production codebases, static analysis, and contributing tested fixes.",
    icon: "git-branch",
  },
  {
    title: "Software Quality & Testing",
    description:
      "Writing unit tests, edge-case analysis, and adherence to clean code principles.",
    icon: "shield-check",
  },
];
// ── Competitive Programming Profiles ─────────────────────────
export interface CPPlatform {
  id: "leetcode" | "codeforces" | "atcoder" | "codechef";
  name: string;
  handle: string;
  url: string;
  tagline: string;
  accentColor: string;
  bgGradient: string;
  stats: {
    label: string;
    value: string | number;
    subtext?: string;
  }[];
  breakdown?: {
    easy?: number;
    medium?: number;
    hard?: number;
  };
  ratingHistory?: {
    contestName: string;
    rank: number;
    rating: number;
  }[];
  lastVerified: string;
  verifiedNotes: string;
}

export const competitiveProfiles: CPPlatform[] = [
  {
    id: "leetcode",
    name: "LeetCode",
    handle: "SivaHarish_S",
    url: "https://leetcode.com/u/SivaHarish_S/",
    tagline: "Algorithmic Problem Solving & Data Structures",
    accentColor: "#FFA116",
    bgGradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    stats: [
      { label: "Total Solved", value: 187, subtext: "Problems" },
      { label: "Global Rank", value: "~981k", subtext: "Top Competitive" },
      { label: "Primary Lang", value: "Java", subtext: "Core language" },
    ],
    breakdown: {
      easy: 152,
      medium: 34,
      hard: 1,
    },
    lastVerified: "November 2026",
    verifiedNotes: "187 verified problems solved (152 Easy, 34 Medium, 1 Hard)",
  },
  {
    id: "codeforces",
    name: "Codeforces",
    handle: "sivaharish",
    url: "https://codeforces.com/profile/sivaharish",
    tagline: "Timed Contests & Mathematical Rigor",
    accentColor: "#1F8ACB",
    bgGradient: "from-blue-500/10 via-blue-500/5 to-transparent",
    stats: [
      { label: "Current Rating", value: 1015, subtext: "Newbie" },
      { label: "Max Rating", value: 1015, subtext: "Peak Rating" },
      { label: "Rated Rounds", value: 4, subtext: "Official Contests" },
    ],
    ratingHistory: [
      { contestName: "Round 1080 (Div. 3)", rank: 20797, rating: 367 },
      { contestName: "WorldQuant Round 1 (Div. 1 + 2)", rank: 7535, rating: 597 },
      { contestName: "Round 1134 (Div. 4)", rank: 8629, rating: 810 },
      { contestName: "Round 1135 (Div. 2)", rank: 2900, rating: 1015 },
    ],
    lastVerified: "November 2026",
    verifiedNotes: "4 rated rounds: 367 → 597 → 810 → 1015 rating progression",
  },
  {
    id: "atcoder",
    name: "AtCoder",
    handle: "sivaharish31",
    url: "https://atcoder.jp/users/sivaharish31",
    tagline: "Japanese Algorithmic Contests",
    accentColor: "#222222",
    bgGradient: "from-slate-800/10 via-slate-800/5 to-transparent",
    stats: [
      { label: "Rating", value: 32, subtext: "Provisional" },
      { label: "Highest Rating", value: 32, subtext: "Peak Rating" },
      { label: "Rated Matches", value: 4, subtext: "ABC Contests" },
    ],
    lastVerified: "November 2026",
    verifiedNotes: "Active participant in AtCoder Beginner Contests (ABC 482, 483, 484, 485)",
  },
  {
    id: "codechef",
    name: "CodeChef",
    handle: "sivaharish_31",
    url: "https://www.codechef.com/users/sivaharish_31",
    tagline: "Competitive Programming & Star Divisions",
    accentColor: "#8B5A2B",
    bgGradient: "from-amber-800/10 via-amber-800/5 to-transparent",
    stats: [
      { label: "Rating", value: 1259, subtext: "Division 4" },
      { label: "Highest Rating", value: 1259, subtext: "Peak Rating" },
      { label: "Problems Solved", value: 145, subtext: "Total Solved" },
    ],
    lastVerified: "November 2026",
    verifiedNotes: "145 problems solved, peak rating 1259",
  },
];

// ── Unified Developer Identity ────────────────────────────────
export const unifiedDeveloperIdentity = [
  {
    category: "Software Development & Open Source",
    platform: "GitHub",
    handle: "sivaharish31",
    url: "https://github.com/sivaharish31",
    description: "Production software repositories, open-source bug fixes to Google, AWS, Microsoft, Netflix, IBM.",
    highlight: "5+ Major Org PRs",
  },
  {
    category: "Algorithmic Problem Solving",
    platform: "LeetCode",
    handle: "SivaHarish_S",
    url: "https://leetcode.com/u/SivaHarish_S/",
    description: "Daily data structures and algorithmic challenge solving in Java.",
    highlight: "187 Solved",
  },
  {
    category: "Timed Algorithmic Contests",
    platform: "Codeforces",
    handle: "sivaharish",
    url: "https://codeforces.com/profile/sivaharish",
    description: "Competitive programming rounds, rating progression from 367 to 1015.",
    highlight: "1015 Rating",
  },
  {
    category: "Algorithmic Contests",
    platform: "AtCoder",
    handle: "sivaharish31",
    url: "https://atcoder.jp/users/sivaharish31",
    description: "AtCoder Beginner Contests focused on mathematical and algorithmic precision.",
    highlight: "4 Rated Contests",
  },
  {
    category: "Competitive Programming",
    platform: "CodeChef",
    handle: "sivaharish_31",
    url: "https://www.codechef.com/users/sivaharish_31",
    description: "Star division rounds and problem sets, peak rating 1259.",
    highlight: "145 Solved · Peak 1259",
  },
  {
    category: "Coding Activity & Tracking",
    platform: "Codolio",
    handle: "Sivaharish",
    url: "https://codolio.com/profile/Sivaharish",
    description: "Aggregated coding journey, contest tracks, and verified developer profile.",
    highlight: "Active Profile",
  },
  {
    category: "Professional Network",
    platform: "LinkedIn",
    handle: "ssivaharish",
    url: "https://www.linkedin.com/in/ssivaharish",
    description: "Professional updates, engineering student journey, and technical connections.",
    highlight: "Student @ St. Joseph's",
  },
];

// ── Certifications & Training ─────────────────────────────────
export interface Certification {
  id: string;
  name: string;
  issuer: string;
  category: "Certification" | "Training Badge" | "Course" | "Course (Elite)";
  badgeLabel: string;
  statusLabel: string;
  description: string;
  isAws?: boolean;
  accentGlow: string;
}

export const certifications: Certification[] = [
  {
    id: "oracle-agentic-ai",
    name: "Agentic AI Certified Foundations Associate",
    issuer: "Oracle",
    category: "Certification",
    badgeLabel: "Certification",
    statusLabel: "Certification Earned",
    description:
      "Foundations associate certification covering core principles and architectures of agentic AI systems.",
    accentGlow: "from-red-500/10 via-red-500/5 to-transparent",
  },
  {
    id: "aws-cloud-operations",
    name: "Graduate - Cloud Operations Training Badge",
    issuer: "AWS Academy",
    category: "Training Badge",
    badgeLabel: "AWS Training Badge",
    statusLabel: "Training Badge Earned",
    description:
      "AWS Academy graduate training in cloud operations, system administration, and infrastructure provisioning.",
    isAws: true,
    accentGlow: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
  {
    id: "aws-ml-nlp",
    name: "Graduate - Machine Learning for Natural Language Processing Training Badge",
    issuer: "AWS Academy",
    category: "Training Badge",
    badgeLabel: "AWS Training Badge",
    statusLabel: "Training Badge Earned",
    description:
      "AWS Academy graduate training in machine learning workflows applied to natural language processing.",
    isAws: true,
    accentGlow: "from-amber-500/10 via-amber-500/5 to-transparent",
  },
  {
    id: "nptel-dbms",
    name: "Database Management System",
    issuer: "NPTEL",
    category: "Course",
    badgeLabel: "Course",
    statusLabel: "Coursework Completed",
    description:
      "Academic course completion covering relational database management systems and SQL fundamentals.",
    accentGlow: "from-emerald-500/10 via-emerald-500/5 to-transparent",
  },
  {
    id: "nptel-python-data-science",
    name: "Python for Data Science (Elite)",
    issuer: "NPTEL",
    category: "Course (Elite)",
    badgeLabel: "Elite Distinction",
    statusLabel: "Coursework Completed (Elite)",
    description:
      "Academic course in Python programming for data science, completed with Elite standing distinction.",
    accentGlow: "from-indigo-500/10 via-indigo-500/5 to-transparent",
  },
  {
    id: "ini-fundamentals-computing",
    name: "Fundamentals of Computing",
    issuer: "INI",
    category: "Course",
    badgeLabel: "Course",
    statusLabel: "Coursework Completed",
    description:
      "Foundational course covering computing essentials, fundamental architecture, and programming logic.",
    accentGlow: "from-sky-500/10 via-sky-500/5 to-transparent",
  },
];
