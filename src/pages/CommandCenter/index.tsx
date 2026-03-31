import { Show, type Component } from "solid-js"
import { commandState, setCommandState, type SectionId } from "../../store/commandStore"

import HudTopBar        from "./HudTopBar"
import SidePanel        from "./SidePanel"
import StatusColumn     from "./StatusColumn"
import HudBottomBar     from "./HudBottomBar"

import HeroSection       from "./sections/HeroSection"
import AboutSection      from "./sections/AboutSection"
import ExperienceSection from "./sections/ExperienceSection"
import ProjectsSection   from "./sections/ProjectsSection"
import StarMapSection    from "./sections/StarMapSection"
import ContactSection    from "./sections/ContactSection"

// ─── Section transition ───────────────────────────────────────────────────────
// We keep a "displayed" section that lags one tick behind the active section.
// This lets us apply a fade-out class before unmounting, then fade-in on mount.
// Since SolidJS Show unmounts immediately, we use a key-based re-mount trick:
// incrementing `renderKey` when the section changes causes Show to remount the
// new content, which naturally triggers the CSS fade-in animation.

// Thin wrapper that restamps a new DOM node (and its CSS mount animation)
// each time a new section is selected. Solid's Show already does this —
// this helper just makes the fade-in class apply on every Show entry.
const FadeIn: Component<{ children: any }> = (props) => (
  <div class="animate-fade-in min-h-full" style={{ "animation-duration": "0.2s" }}>
    {props.children}
  </div>
)

const CommandCenter: Component = () => {
  const selectSection = (id: SectionId) => {
    setCommandState("activeSection", id)
  }

  return (
    <div
      class="h-screen overflow-hidden flex flex-col text-white"
      style={{ background: "#0a0a0a" }}
    >
      {/* ── Top HUD bar ── */}
      <HudTopBar />

      {/* ── Main content row ── */}
      <div class="flex flex-1 overflow-hidden min-h-0">

        {/* Left nav sidebar — hidden on mobile, visible md+ */}
        <div class="hidden md:flex">
          <SidePanel
            activeSection={commandState.activeSection}
            onSelect={selectSection}
          />
        </div>

        {/* Center: swappable section display */}
        <main
          class="flex-1 overflow-y-auto overflow-x-hidden"
          style={{
            "scrollbar-width": "thin",
            "scrollbar-color": "rgba(34,211,238,0.2) transparent",
          }}
        >
          {/* Each Show mounts a FadeIn wrapper → CSS animation fires on entry */}
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
        </main>

        {/* Right status column — hidden on mobile */}
        <div class="hidden lg:flex">
          <StatusColumn />
        </div>
      </div>

      {/* ── Bottom HUD bar ── */}
      <HudBottomBar />

      {/* Mobile bottom nav (replaces sidebar on small screens) */}
      <nav class="md:hidden flex-shrink-0 flex items-stretch border-t border-white/5 bg-[#080808] overflow-x-auto">
        {(["hero", "about", "experience", "projects", "starmap", "contact"] as SectionId[]).map((id) => {
          const labels: Record<SectionId, string> = {
            hero: "HOME", about: "IDENT", experience: "OPS", projects: "TAC", starmap: "MAP", contact: "COMMS",
          }
          return (
            <button
              onClick={() => selectSection(id)}
              class="flex-1 min-w-[52px] py-3 font-mono text-[8px] tracking-widest transition-colors duration-200"
              style={{
                color: commandState.activeSection === id ? "#67e8f9" : "rgba(100,116,139,0.6)",
                "border-bottom": commandState.activeSection === id ? "2px solid #67e8f9" : "2px solid transparent",
              }}
            >
              {labels[id]}
            </button>
          )
        })}
      </nav>
    </div>
  )
}

export default CommandCenter
