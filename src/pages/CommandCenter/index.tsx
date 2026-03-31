import { Show, onMount, onCleanup, type Component } from "solid-js"
import { commandState, setCommandState, type SectionId } from "../../store/commandStore"

import HudTopBar       from "./HudTopBar"
import SidePanel       from "./SidePanel"
import StatusColumn    from "./StatusColumn"
import HudBottomBar    from "./HudBottomBar"
import RedirectOverlay from "./RedirectOverlay"

import HeroSection       from "./sections/HeroSection"
import AboutSection      from "./sections/AboutSection"
import ExperienceSection from "./sections/ExperienceSection"
import ProjectsSection   from "./sections/ProjectsSection"
import StarMapSection    from "./sections/StarMapSection"
import ContactSection    from "./sections/ContactSection"

// ─── Section order (for ← → keyboard nav) ────────────────────────────────────
const SECTION_ORDER: SectionId[] = ["hero", "about", "experience", "projects", "starmap", "contact"]


// ─── Section header metadata ──────────────────────────────────────────────────
const SECTION_TITLE: Record<SectionId, { codename: string; label: string; color: string }> = {
  hero:       { codename: "00", label: "HOME — Command Deck",        color: "#67e8f9" },
  about:      { codename: "01", label: "IDENT — Operator Profile",   color: "#67e8f9" },
  experience: { codename: "02", label: "OPS LOG — Mission History",  color: "#34d399" },
  projects:   { codename: "03", label: "TACTICAL — Deployed Systems",color: "#818cf8" },
  starmap:    { codename: "04", label: "STAR MAP — Knowledge Graph", color: "#a855f7" },
  contact:    { codename: "05", label: "COMMS — Open Channel",       color: "#f59e0b" },
}

// ─── Section header + back control ───────────────────────────────────────────
// Rendered above every non-hero section automatically.

const SectionHeader: Component<{ section: SectionId }> = (props) => {
  const meta = () => SECTION_TITLE[props.section]
  const idx = () => SECTION_ORDER.indexOf(props.section)
  const hasPrev = () => idx() > 1  // >1 because index 0 is hero
  const hasNext = () => idx() < SECTION_ORDER.length - 1

  const go = (id: SectionId) => setCommandState("activeSection", id)

  return (
    <div
      class="flex items-center gap-3 px-4 py-2.5 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-sm sticky top-0 z-10"
    >
      {/* ← HOME button — always visible on non-hero sections */}
      <button
        onClick={() => go("hero")}
        class="group flex items-center gap-1.5 px-2.5 py-1.5 rounded border border-white/8 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/[0.06] transition-all duration-200 shrink-0"
      >
        <svg class="w-3 h-3 text-slate-500 group-hover:text-cyan-400 transition-colors" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M10 12L6 8l4-4" />
        </svg>
        <span class="font-mono text-[9px] tracking-[0.2em] text-slate-500 group-hover:text-cyan-400 transition-colors uppercase">
          Home
        </span>
      </button>

      {/* Divider */}
      <span class="text-white/15 font-mono text-xs">/</span>

      {/* Section codename + label */}
      <div class="flex items-center gap-2 flex-1 min-w-0">
        <span
          class="font-mono text-[9px] tabular-nums"
          style={{ color: `${meta().color}80` }}
        >
          [{meta().codename}]
        </span>
        <span
          class="font-mono text-[10px] tracking-[0.15em] uppercase truncate"
          style={{ color: meta().color }}
        >
          {meta().label}
        </span>
      </div>

      {/* ← → prev / next arrows */}
      <div class="flex items-center gap-1 shrink-0">
        <button
          onClick={() => hasPrev() && go(SECTION_ORDER[idx() - 1])}
          disabled={!hasPrev()}
          class="w-7 h-7 flex items-center justify-center rounded border border-white/6 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
          title="Previous section  ←"
        >
          <svg class="w-3 h-3 text-slate-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M10 12L6 8l4-4" />
          </svg>
        </button>
        <button
          onClick={() => hasNext() && go(SECTION_ORDER[idx() + 1])}
          disabled={!hasNext()}
          class="w-7 h-7 flex items-center justify-center rounded border border-white/6 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04] disabled:opacity-20 disabled:cursor-not-allowed transition-all duration-200"
          title="Next section  →"
        >
          <svg class="w-3 h-3 text-slate-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M6 4l4 4-4 4" />
          </svg>
        </button>
      </div>

      {/* Keyboard hint — desktop only */}
      <div class="hidden xl:flex items-center gap-2 font-mono text-[8px] text-slate-700 shrink-0">
        <span class="border border-white/10 rounded px-1">ESC</span>
        <span>home</span>
        <span class="ml-1 border border-white/10 rounded px-1">← →</span>
        <span>nav</span>
      </div>
    </div>
  )
}

// ─── Fade-in wrapper ──────────────────────────────────────────────────────────
const FadeIn: Component<{ children: any }> = (props) => (
  <div class="animate-fade-in" style={{ "animation-duration": "0.2s" }}>
    {props.children}
  </div>
)

// ─── CommandCenter ────────────────────────────────────────────────────────────
const CommandCenter: Component = () => {
  // Navigation is immediate; the footer terminal prompt handles the typing effect
  const selectSection = (id: SectionId) => setCommandState("activeSection", id)

  // Keyboard navigation
  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return
      const i = SECTION_ORDER.indexOf(commandState.activeSection)
      if (e.key === "Escape")     { selectSection("hero"); return }
      if (e.key === "ArrowLeft"  && i > 0)                        selectSection(SECTION_ORDER[i - 1])
      if (e.key === "ArrowRight" && i < SECTION_ORDER.length - 1) selectSection(SECTION_ORDER[i + 1])
    }
    document.addEventListener("keydown", handler)
    onCleanup(() => document.removeEventListener("keydown", handler))
  })

  const isHero = () => commandState.activeSection === "hero"

  return (
    <div class="h-screen overflow-hidden flex flex-col text-white" style={{ background: "#0a0a0a" }}>

      <HudTopBar />

      <div class="flex flex-1 overflow-hidden min-h-0">

        {/* Left sidebar */}
        <div class="hidden md:flex">
          <SidePanel activeSection={commandState.activeSection} onSelect={selectSection} />
        </div>

        {/* Main content */}
        <main
          class="flex-1 overflow-y-auto overflow-x-hidden flex flex-col"
          style={{ "scrollbar-width": "thin", "scrollbar-color": "rgba(34,211,238,0.15) transparent" }}
        >
          {/* Sticky section header — only on non-hero sections */}
          <Show when={!isHero()}>
            <SectionHeader section={commandState.activeSection} />
          </Show>

          {/* Section content with fade-in on each swap */}
          <div class="flex-1">
            <Show when={commandState.activeSection === "hero"}>
              <FadeIn><HeroSection /></FadeIn>
            </Show>
            <Show when={commandState.activeSection === "about"}>
              <FadeIn><AboutSection /></FadeIn>
            </Show>
            <Show when={commandState.activeSection === "experience"}>
              <FadeIn><ExperienceSection /></FadeIn>
            </Show>
            <Show when={commandState.activeSection === "projects"}>
              <FadeIn><ProjectsSection /></FadeIn>
            </Show>
            <Show when={commandState.activeSection === "starmap"}>
              <FadeIn><StarMapSection /></FadeIn>
            </Show>
            <Show when={commandState.activeSection === "contact"}>
              <FadeIn><ContactSection /></FadeIn>
            </Show>
          </div>
        </main>

        {/* Right status column */}
        <div class="hidden lg:flex">
          <StatusColumn />
        </div>
      </div>

      <HudBottomBar />

      {/* Mobile bottom nav */}
      <nav class="md:hidden flex-shrink-0 flex items-stretch border-t border-white/5 bg-[#080808] overflow-x-auto">
        {SECTION_ORDER.map((id) => {
          const labels: Record<SectionId, string> = {
            hero: "HOME", about: "IDENT", experience: "OPS", projects: "TAC", starmap: "MAP", contact: "COMMS",
          }
          return (
            <button
              onClick={() => selectSection(id)}
              class="flex-1 min-w-[52px] py-3 font-mono text-[8px] tracking-widest transition-colors duration-200"
              style={{
                color: commandState.activeSection === id ? "#67e8f9" : "rgba(100,116,139,0.6)",
                "border-top": commandState.activeSection === id ? "1px solid #67e8f9" : "1px solid transparent",
              }}
            >
              {labels[id]}
            </button>
          )
        })}
      </nav>

      {/* ── Redirect overlay ── */}
      <Show when={commandState.pendingRedirect !== null}>
        <RedirectOverlay
          url={commandState.pendingRedirect!.url}
          label={commandState.pendingRedirect!.label}
        />
      </Show>
    </div>
  )
}

export default CommandCenter
