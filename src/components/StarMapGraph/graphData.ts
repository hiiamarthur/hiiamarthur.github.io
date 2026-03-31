// ─── Graph Data ───────────────────────────────────────────────────────────────
// All positions are in a 900×540 coordinate space.
// Pre-computed layout — no runtime physics, no jitter, deterministic.

export type NodeCategory =
  | "hub"
  | "language"
  | "frontend"
  | "backend"
  | "infra"
  | "database"
  | "ai"

export interface GraphNode {
  id: string
  label: string
  category: NodeCategory
  x: number
  y: number
  /** Radius at rest */
  r: number
}

export interface GraphEdge {
  id: string
  source: string
  target: string
  /** 1 = thin, 2 = medium, 3 = thick */
  weight: 1 | 2 | 3
}

// ─── Category → accent color ──────────────────────────────────────────────────
export const CATEGORY_COLOR: Record<NodeCategory, string> = {
  hub:      "#67e8f9", // cyan   — Arthur hub
  language: "#a78bfa", // violet — raw languages
  frontend: "#818cf8", // indigo — UI frameworks
  backend:  "#34d399", // emerald — server frameworks
  infra:    "#f59e0b", // amber  — infrastructure
  database: "#fb7185", // rose   — data stores
  ai:       "#c084fc", // purple — AI/ML
}

// ─── Nodes ────────────────────────────────────────────────────────────────────
export const NODES: GraphNode[] = [
  // Hub
  { id: "arthur",       label: "Arthur",      category: "hub",      x: 450, y: 270, r: 12 },

  // Languages — upper-left sector
  { id: "python",       label: "Python",      category: "language", x: 200, y: 120, r: 10 },
  { id: "typescript",   label: "TypeScript",  category: "language", x: 320, y: 75,  r: 10 },
  { id: "javascript",   label: "JavaScript",  category: "language", x: 440, y: 60,  r: 7  },
  { id: "elixir",       label: "Elixir",      category: "language", x: 145, y: 215, r: 9  },
  { id: "csharp",       label: "C#",          category: "language", x: 115, y: 315, r: 9  },
  { id: "dart",         label: "Dart",        category: "language", x: 165, y: 415, r: 6  },
  { id: "go",           label: "Go",          category: "language", x: 270, y: 60,  r: 6  },

  // Frontend — upper-right sector
  { id: "react",        label: "React",       category: "frontend", x: 680, y: 95,  r: 10 },
  { id: "nextjs",       label: "Next.js",     category: "frontend", x: 575, y: 75,  r: 9  },
  { id: "solidjs",      label: "SolidJS",     category: "frontend", x: 790, y: 175, r: 8  },
  { id: "angular",      label: "Angular",     category: "frontend", x: 760, y: 275, r: 7  },
  { id: "svelte",       label: "Svelte",      category: "frontend", x: 650, y: 195, r: 7  },
  { id: "threejs",      label: "Three.js",    category: "frontend", x: 590, y: 145, r: 6  },
  { id: "flutter",      label: "Flutter",     category: "frontend", x: 810, y: 375, r: 8  },

  // Backend — lower-left sector
  { id: "fastapi",      label: "FastAPI",     category: "backend",  x: 265, y: 390, r: 8  },
  { id: "nestjs",       label: "NestJS",      category: "backend",  x: 310, y: 420, r: 7  },
  { id: "phoenix",      label: "Phoenix",     category: "backend",  x: 175, y: 465, r: 8  },
  { id: "dotnet",       label: ".NET",        category: "backend",  x: 100, y: 415, r: 9  },
  { id: "nodejs",       label: "Node.js",     category: "backend",  x: 335, y: 455, r: 7  },
  { id: "rabbitmq",     label: "RabbitMQ",    category: "backend",  x: 440, y: 385, r: 7  },

  // Database — lower-center
  { id: "postgresql",   label: "PostgreSQL",  category: "database", x: 450, y: 470, r: 8  },
  { id: "mongodb",      label: "MongoDB",     category: "database", x: 510, y: 430, r: 6  },
  { id: "redis",        label: "Redis",       category: "database", x: 545, y: 495, r: 6  },
  { id: "mssql",        label: "MSSQL",       category: "database", x: 360, y: 500, r: 7  },

  // Infra — right-center / lower-right
  { id: "docker",       label: "Docker",      category: "infra",    x: 620, y: 455, r: 8  },
  { id: "k8s",          label: "k8s",         category: "infra",    x: 680, y: 500, r: 7  },
  { id: "mqtt",         label: "MQTT",        category: "infra",    x: 160, y: 350, r: 6  },
  { id: "aws",          label: "AWS",         category: "infra",    x: 815, y: 435, r: 7  },
  { id: "azure",        label: "Azure",       category: "infra",    x: 840, y: 500, r: 6  },
  { id: "githubActions",label: "CI/CD",       category: "infra",    x: 760, y: 470, r: 6  },

  // AI/ML — lower-right
  { id: "gpt4",         label: "GPT-4",       category: "ai",       x: 700, y: 390, r: 7  },
  { id: "ml",           label: "ML",          category: "ai",       x: 660, y: 510, r: 7  },
  { id: "agenticai",    label: "Agentic AI",  category: "ai",       x: 570, y: 535, r: 9  },
]

// ─── Edges ────────────────────────────────────────────────────────────────────
export const EDGES: GraphEdge[] = [
  // Arthur — primary connections (weight 3 = core expertise)
  { id: "e1",  source: "arthur",     target: "python",      weight: 3 },
  { id: "e2",  source: "arthur",     target: "react",       weight: 3 },
  { id: "e3",  source: "arthur",     target: "elixir",      weight: 3 },
  { id: "e4",  source: "arthur",     target: "csharp",      weight: 3 },
  { id: "e5",  source: "arthur",     target: "typescript",  weight: 3 },
  { id: "e6",  source: "arthur",     target: "agenticai",   weight: 3 },
  { id: "e7",  source: "arthur",     target: "nextjs",      weight: 3 },
  { id: "e8",  source: "arthur",     target: "solidjs",     weight: 2 },
  { id: "e9",  source: "arthur",     target: "fastapi",     weight: 2 },
  { id: "e10", source: "arthur",     target: "nestjs",      weight: 2 },
  { id: "e11", source: "arthur",     target: "rabbitmq",    weight: 2 },
  { id: "e12", source: "arthur",     target: "svelte",      weight: 2 },
  { id: "e13", source: "arthur",     target: "go",          weight: 1 },

  // Language → framework chains
  { id: "e14", source: "python",     target: "fastapi",     weight: 3 },
  { id: "e15", source: "python",     target: "ml",          weight: 2 },
  { id: "e16", source: "python",     target: "postgresql",  weight: 2 },
  { id: "e17", source: "python",     target: "rabbitmq",    weight: 2 },
  { id: "e18", source: "python",     target: "mqtt",        weight: 1 },
  { id: "e19", source: "python",     target: "agenticai",   weight: 2 },
  { id: "e20", source: "elixir",     target: "phoenix",     weight: 3 },
  { id: "e21", source: "elixir",     target: "rabbitmq",    weight: 3 },
  { id: "e22", source: "csharp",     target: "dotnet",      weight: 3 },
  { id: "e23", source: "csharp",     target: "flutter",     weight: 2 },
  { id: "e24", source: "csharp",     target: "mqtt",        weight: 2 },
  { id: "e25", source: "dart",       target: "flutter",     weight: 3 },
  { id: "e26", source: "typescript", target: "react",       weight: 2 },
  { id: "e27", source: "typescript", target: "angular",     weight: 2 },
  { id: "e28", source: "typescript", target: "nextjs",      weight: 3 },
  { id: "e29", source: "typescript", target: "nestjs",      weight: 2 },
  { id: "e30", source: "typescript", target: "svelte",      weight: 2 },
  { id: "e31", source: "javascript", target: "typescript",  weight: 2 },
  { id: "e32", source: "javascript", target: "nodejs",      weight: 2 },
  { id: "e33", source: "javascript", target: "threejs",     weight: 2 },
  { id: "e34", source: "go",         target: "typescript",  weight: 1 },

  // Frontend ecosystem
  { id: "e35", source: "react",      target: "nextjs",      weight: 2 },
  { id: "e36", source: "react",      target: "solidjs",     weight: 1 },
  { id: "e37", source: "react",      target: "threejs",     weight: 2 },
  { id: "e38", source: "react",      target: "svelte",      weight: 1 },

  // Backend → data
  { id: "e39", source: "fastapi",    target: "postgresql",  weight: 2 },
  { id: "e40", source: "fastapi",    target: "rabbitmq",    weight: 2 },
  { id: "e41", source: "fastapi",    target: "docker",      weight: 1 },
  { id: "e42", source: "phoenix",    target: "postgresql",  weight: 2 },
  { id: "e43", source: "dotnet",     target: "mssql",       weight: 3 },
  { id: "e44", source: "dotnet",     target: "mqtt",        weight: 2 },
  { id: "e45", source: "nodejs",     target: "redis",       weight: 1 },
  { id: "e46", source: "nodejs",     target: "mongodb",     weight: 2 },
  { id: "e47", source: "nodejs",     target: "nestjs",      weight: 3 },
  { id: "e48", source: "nestjs",     target: "mssql",       weight: 2 },
  { id: "e49", source: "nestjs",     target: "postgresql",  weight: 1 },
  { id: "e50", source: "rabbitmq",   target: "postgresql",  weight: 1 },
  { id: "e51", source: "postgresql", target: "redis",       weight: 1 },
  { id: "e52", source: "mongodb",    target: "redis",       weight: 1 },

  // Infra cluster
  { id: "e53", source: "docker",     target: "k8s",         weight: 2 },
  { id: "e54", source: "docker",     target: "aws",         weight: 2 },
  { id: "e55", source: "k8s",        target: "aws",         weight: 2 },
  { id: "e56", source: "aws",        target: "azure",       weight: 1 },
  { id: "e57", source: "githubActions", target: "docker",   weight: 2 },
  { id: "e58", source: "mqtt",       target: "dotnet",      weight: 2 },

  // AI connections
  { id: "e59", source: "ml",         target: "agenticai",   weight: 2 },
  { id: "e60", source: "gpt4",       target: "agenticai",   weight: 2 },
  { id: "e61", source: "ml",         target: "gpt4",        weight: 1 },
]

// ─── Star-map node label → graph node ID ─────────────────────────────────────
// BentoConfig cards set `starNode` to a skill name string.
// This map resolves that to the actual graph node id.
export const STAR_NODE_LOOKUP: Record<string, string> = {
  "Python":     "python",
  "Elixir":     "elixir",
  "React":      "react",
  "SolidJS":    "solidjs",
  "C#":         "csharp",
  "JavaScript": "javascript",
  "TypeScript": "typescript",
  "RabbitMQ":   "rabbitmq",
  "Next.js":    "nextjs",
  "NestJS":     "nestjs",
  "Svelte":     "svelte",
  "Three.js":   "threejs",
  "MongoDB":    "mongodb",
  "Go":         "go",
}
