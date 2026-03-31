import { createStore } from "solid-js/store"

export type BootPhase = "idle" | "booting" | "complete"

export interface CommandCenterState {
  bootPhase: BootPhase
  /** The project card currently being hovered — drives StarMap highlight */
  activeModule: string | null
  /** The skill node currently focused in StarMap — drives cross-highlight in grid */
  starMapFocusNode: string | null
}

export const [commandState, setCommandState] = createStore<CommandCenterState>({
  bootPhase: "idle",
  activeModule: null,
  starMapFocusNode: null,
})
