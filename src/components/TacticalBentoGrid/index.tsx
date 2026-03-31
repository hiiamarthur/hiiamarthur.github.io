import { For, type Component } from "solid-js"
import { commandState } from "../../store/commandStore"
import BentoCard from "./BentoCard"
import { BENTO_ITEMS } from "./bentoConfig"

// ─── Active Node Indicator ────────────────────────────────────────────────────
// Appears below the grid when a card is hovered — feeds context to StarMap.

const NodeIndicator: Component = () => (
  <div
    class="mt-4 h-5 flex items-center gap-2 font-mono text-[10px] tracking-widest transition-opacity duration-200"
    style={{ opacity: commandState.starMapFocusNode ? "1" : "0" }}
  >
    <div class="w-px h-3 bg-cyan-500/40" />
    <span class="text-slate-600">STAR_MAP ←</span>
    <span class="text-cyan-500">{commandState.starMapFocusNode}</span>
    <span class="text-slate-600">NODE FOCUSED</span>
  </div>
)

// ─── TacticalBentoGrid ────────────────────────────────────────────────────────

const TacticalBentoGrid: Component = () => {
  return (
    <section class="w-full max-w-7xl mx-auto px-4 py-16">
      {/*
        12-column grid at lg+. On mobile collapses to 1 column via grid-cols-1.
        Cards carry col-span-12 (mobile) + lg:col-span-N (desktop) classes.
      */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <For each={BENTO_ITEMS}>
          {(item, i) => <BentoCard item={item} index={i()} />}
        </For>
      </div>

      <NodeIndicator />
    </section>
  )
}

export default TacticalBentoGrid
