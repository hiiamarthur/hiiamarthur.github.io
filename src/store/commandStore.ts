import { createStore } from "solid-js/store"

export type BootPhase = "idle" | "booting" | "complete"
export type SectionId = "hero" | "about" | "experience" | "projects" | "starmap" | "contact"

export interface PendingRedirect {
  url: string
  /** Human-readable destination shown in the overlay */
  label: string
}

export interface CommandCenterState {
  bootPhase: BootPhase
  activeSection: SectionId
  /** The project card currently being hovered — drives StarMap highlight */
  activeModule: string | null
  /** The skill node currently focused in StarMap — drives cross-highlight in grid */
  starMapFocusNode: string | null
  /** Set this to trigger the redirect overlay and then open the URL */
  pendingRedirect: PendingRedirect | null
}

export const [commandState, setCommandState] = createStore<CommandCenterState>({
  bootPhase: "idle",
  activeSection: "hero",
  activeModule: null,
  starMapFocusNode: null,
  pendingRedirect: null,
})

/** Call this anywhere instead of window.open — triggers the redirect overlay */
export const openExternal = (url: string, label: string) =>
  setCommandState("pendingRedirect", { url, label })
