import { For, type Component } from "solid-js"
import { commandState } from "../../store/commandStore"
import BentoCard from "./BentoCard"
import { BENTO_ITEMS } from "./bentoConfig"

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader: Component = () => (
  <div class="flex items-center gap-4 mb-6">
    <div class="flex items-center gap-2">
      <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
      <span class="font-mono text-xs tracking-[0.25em] text-slate-500 uppercase">
        Tactical Modules
      </span>
    </div>
    <div class="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent" />
    <span class="font-mono text-[10px] text-slate-600 tabular-nums">
      {BENTO_ITEMS.filter((i) => i.type === "project").length} PROJECTS INDEXED
    </span>
  </div>
)

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
      <SectionHeader />

      {/*
        12-column grid at lg+. On mobile collapses to 1 column via grid-cols-1.
        Cards carry col-span-12 (mobile) + lg:col-span-N (desktop) classes.
      */}
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-3">
        <For each={BENTO_ITEMS}>
          {(item) => <BentoCard item={item} />}
        </For>
      </div>

      <NodeIndicator />
    </section>
  )
}

export default TacticalBentoGrid
