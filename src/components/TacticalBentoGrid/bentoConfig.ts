// ─── Bento Grid Configuration ────────────────────────────────────────────────
// Centralizes layout, accent colors, and star-map node links per card.
// Decoupled from component logic so the grid can be reconfigured without
// touching render code.

export type CardStatus = "DEPLOYED" | "ACTIVE" | "RESEARCH" | "WIP" | "ARCHIVED"

export interface BentoItem {
  id: string
  type: "project" | "operator" | "stat"
  name: string
  description: string
  technologies: string[]
  link?: string
  github?: string
  image?: string
  status: CardStatus
  /** Primary skill node that lights up in the StarMap on hover */
  starNode: string
  /** CSS hex/rgba used for the spotlight radial gradient */
  accentColor: string
  /** Tailwind col-span class — must be safelisted */
  colSpan: string
  /** Featured cards get a larger image pane and radar pulse decoration */
  featured?: boolean
}

export const BENTO_ITEMS: BentoItem[] = [
  // ── Row 1 ─────────────────────────────────────────────────────────────────
  {
    id: "tupper",
    type: "project",
    name: "tupper-playground",
    description:
      "Interactive web app for exploring Tupper's self-referential formula — render custom text and freehand drawings as bitmaps encoded within the formula.",
    technologies: ["Python", "Streamlit", "NumPy", "Pillow", "Matplotlib", "Cloudflare"],
    link: "https://tupper.arthurlau.dev",
    github: "https://github.com/hiiamarthur/tupper-playground",
    image: "/images/tupper.png",
    status: "DEPLOYED",
    starNode: "Python",
    accentColor: "#eab308",
    colSpan: "lg:col-span-12",
    featured: true,
  },

  // ── Row 2 ─────────────────────────────────────────────────────────────────
  {
    id: "arkham",
    type: "project",
    name: "Arkham Analysis",
    description:
      "Game-analytics assistant for Arkham Horror LCG — 1 000+ cards indexed via FastAPI, PostgreSQL full-text search, and an Angular SPA.",
    technologies: ["Python", "FastAPI", "PostgreSQL", "Angular", "Flutter"],
    link: "https://arkham-analysis.arthurlau.dev/",
    github: "https://github.com/hiiamarthur/arkham-analysis",
    image: "/images/arkham.png",
    status: "ACTIVE",
    starNode: "Python",
    accentColor: "#a855f7",
    colSpan: "lg:col-span-7",
    featured: true,
  },
  {
    id: "operator",
    type: "operator",
    name: "Arthur Lau",
    description:
      "Senior Software Engineer · Toronto, CA · Agentic AI & Full-Stack",
    technologies: ["React", "SolidJS", "Python", "Elixir", ".NET"],
    status: "DEPLOYED",
    starNode: "SolidJS",
    accentColor: "#22d3ee",
    colSpan: "lg:col-span-5",
  },

  // ── Row 3 ─────────────────────────────────────────────────────────────────
  {
    id: "mozilla-hubs",
    type: "project",
    name: "Mozilla Hubs Server",
    description:
      "Self-hosted, Dockerised metaverse platform with custom Avatar Maker, first-person view, and concert-ready 3D scenes running Elixir/Phoenix under the hood.",
    technologies: ["Elixir", "Phoenix", "Docker", "k8s", "React", "Three.js"],
    github: "https://github.com/hiiamarthur/mozilla-hubs",
    image: "/images/hubs.jpg",
    status: "ARCHIVED",
    starNode: "Elixir",
    accentColor: "#818cf8",
    colSpan: "lg:col-span-4",
  },
  {
    id: "itinerary",
    type: "project",
    name: "AI Itinerary Planner",
    description:
      "AIGC travel app — GPT-4-powered trip planning on FastAPI + PostgreSQL backend with a Flutter client.",
    technologies: ["Python", "FastAPI", "Flutter", "PostgreSQL", "GPT-4"],
    github: "https://github.com/reals-itinerary-planner",
    image: "/images/reals.png",
    status: "ACTIVE",
    starNode: "Python",
    accentColor: "#34d399",
    colSpan: "lg:col-span-4",
  },
  {
    id: "prompt-pounder",
    type: "project",
    name: "Prompt Pounder",
    description:
      "Chrome extension — whack-a-mole minigame that fires while you wait on slow LLM responses.",
    technologies: ["JavaScript", "Chrome APIs", "ChatGPT", "Gemini"],
    link: "https://chromewebstore.google.com/detail/prompt-pounder/lgbbiafaejhmkophjgahncgamlhomhad",
    github: "https://github.com/hiiamarthur/whack-a-mole-extension",
    image: "/images/whack-a-mole.png",
    status: "DEPLOYED",
    starNode: "JavaScript",
    accentColor: "#f59e0b",
    colSpan: "lg:col-span-4",
  },

  // ── Row 4 ─────────────────────────────────────────────────────────────────
  {
    id: "vigilant-stream",
    type: "project",
    name: "Vigilant Stream",
    description:
      "Distributed, fault-tolerant risk ingestion engine for high-velocity security signals — Python/FastAPI ingest layer → RabbitMQ → Elixir/OTP Broadway pipeline → Phoenix LiveView dashboard with adaptive back-pressure and OTP supervision trees.",
    technologies: ["Elixir", "Python", "RabbitMQ", "Phoenix", "FastAPI", "Nginx", "Docker"],
    github: "https://github.com/hiiamarthur/vigilant-stream",
    status: "DEPLOYED",
    starNode: "Elixir",
    accentColor: "#f97316",
    colSpan: "lg:col-span-12",
    featured: true,
  },

  // ── Row 5 ─────────────────────────────────────────────────────────────────
  {
    id: "chord",
    type: "project",
    name: "Chord Identification",
    description:
      "Symbolic-AI musicology engine using the Spiral Array Model + KNN for automatic chord ID, tonal-center detection, and hierarchical segmentation of musical scores.",
    technologies: ["Python", "Machine Learning", "KNN", "Signal Processing"],
    github: "https://github.com/hiiamarthur/KY2001-Automatic-Reduction-on-Chord-Indentification",
    image: "/images/chord.png",
    status: "RESEARCH",
    starNode: "Python",
    accentColor: "#f472b6",
    colSpan: "lg:col-span-6",
  },
  {
    id: "mediapipe",
    type: "project",
    name: "Object Grasping Game",
    description:
      "Real-time hand-pose Unity game using MediaPipe to track finger positions — grab objects with your actual hands via webcam.",
    technologies: ["Unity", "C#", "MediaPipe", "AR"],
    github: "https://github.com/hiiamarthur/mediapipeUnity",
    image: "/images/mediapipe.png",
    status: "ARCHIVED",
    starNode: "C#",
    accentColor: "#67e8f9",
    colSpan: "lg:col-span-6",
  },
]

export const STATUS_META: Record<CardStatus, { label: string; color: string; dot: string }> = {
  DEPLOYED: { label: "DEPLOYED",  color: "text-emerald-400", dot: "bg-emerald-400" },
  ACTIVE:   { label: "ACTIVE",    color: "text-cyan-400",    dot: "bg-cyan-400"    },
  WIP:      { label: "IN PROGRESS", color: "text-amber-400", dot: "bg-amber-400"   },
  RESEARCH: { label: "RESEARCH",  color: "text-violet-400",  dot: "bg-violet-400"  },
  ARCHIVED: { label: "ARCHIVED",  color: "text-slate-500",   dot: "bg-slate-500"   },
}
