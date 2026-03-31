/**
 * SectionShell — three-zone cyberpunk mount animation.
 *
 * Also exports two reusable primitives:
 *   SectionInternalHeader — SpaceAge label that sweeps in horizontally (the "trigger" line)
 *   ElectricReveal        — block that wipes top→bottom behind a glowing charge line
 *
 * Typical page timing:
 *   0ms   → SectionShell top strip clips in
 *   140ms → body fades in + scan sweep
 *   160ms → SectionInternalHeader sweeps horizontally  ← visual "trigger"
 *   360ms → block 1 drops
 *   520ms → block 2 drops
 *   680ms → block 3 drops
 */

import { createSignal, onCleanup, onMount, type Component, type JSX } from "solid-js"
import { TerminalPrompt } from "../HudBottomBar"
import { commandState } from "../../../store/commandStore"

// ─── SectionInternalHeader ────────────────────────────────────────────────────
// The SpaceAge header line: ● Label ──────────────────
// Clips in left→right; acts as the visual "spark" that triggers block drops.

export const SectionInternalHeader: Component<{
  label: string
  color: string
  active: boolean
  meta?: string   // optional right-side readout e.g. "27 NODES · 37 EDGES"
}> = (props) => (
  <div
    class="flex items-center gap-2 mb-5 origin-left"
    style={{
      transform:  props.active ? "scaleX(1)"   : "scaleX(0)",
      opacity:    props.active ? "1"           : "0",
      transition: props.active
        ? "transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.2s ease"
        : "none",
    }}
  >
    <div
      class="w-1.5 h-1.5 rounded-full animate-pulse flex-shrink-0"
      style={{
        background:   props.color,
        "box-shadow": `0 0 5px ${props.color}`,
      }}
    />
    <span class="font-space text-xl text-slate-400 tracking-widest">
      {props.label}
    </span>
    <div
      class="flex-1 h-px"
      style={{ background: `linear-gradient(to right, ${props.color}45, transparent)` }}
    />
    {props.meta && (
      <span class="font-mono text-xs tabular-nums text-slate-500 flex-shrink-0">
        {props.meta}
      </span>
    )}
  </div>
)

// ─── ElectricReveal ───────────────────────────────────────────────────────────
// Wraps a content block — a glowing charge line races down first, then the
// block wipes in behind it and flickers bright as it materialises.

export const ElectricReveal: Component<{
  active: boolean
  color: string
  children: JSX.Element
}> = (props) => (
  <div
    class="relative overflow-hidden"
    style={{
      "clip-path": props.active ? "inset(0 0 0% 0)" : "inset(0 0 100% 0)",
      transition: props.active
        ? "clip-path 0.42s cubic-bezier(0.4, 0, 0.2, 1)"
        : "none",
    }}
  >
    {/* Charge line leading the reveal */}
    <div
      class="absolute inset-x-0 pointer-events-none z-20 h-[2px]"
      style={{
        background:   `linear-gradient(to right, transparent 5%, ${props.color} 40%, ${props.color} 60%, transparent 95%)`,
        "box-shadow": `0 0 8px 2px ${props.color}90`,
        top:          0,
        transform:    props.active ? "translateY(800%)" : "translateY(0%)",
        transition:   props.active ? "transform 0.42s cubic-bezier(0.4, 0, 0.6, 1)" : "none",
        opacity:      props.active ? "0" : "1",
      }}
    />
    {/* Content flickers bright on reveal */}
    <div
      class={props.active ? "animate-flicker" : ""}
      style={{ opacity: props.active ? undefined : "0" }}
    >
      {props.children}
    </div>
  </div>
)

// ─── SectionShell ─────────────────────────────────────────────────────────────

export interface SectionShellProps {
  codename: string
  label:    string
  color:    string
  children: JSX.Element
  footer?:  JSX.Element
}

const SectionShell: Component<SectionShellProps> = (props) => {
  const [phase, setPhase] = createSignal(0)

  onMount(() => {
    requestAnimationFrame(() => {
      setPhase(1)
      setTimeout(() => setPhase(2), 140)
      setTimeout(() => setPhase(3), 300)
    })
  })

  const [uptime, setUptime] = createSignal(0)
  onMount(() => {
    const start = Date.now()
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000)
    onCleanup(() => clearInterval(id))
  })

  

  const isoDate = () => new Date().toISOString().slice(0, 10)

  const fmtUptime = () => {
    const s = uptime()
    const m = Math.floor(s / 60)
    const h = Math.floor(m / 60)
    const pp = (n: number) => String(n).padStart(2, "0")
    return h > 0 ? `${pp(h)}:${pp(m % 60)}:${pp(s % 60)}` : `${pp(m)}:${pp(s % 60)}`
  }

  return (
    <div class="flex flex-col flex-1 min-h-0 relative">

      {/* ── ZONE 1: Top data strip — clips in from left ── */}
      <div
        class="flex-shrink-0 flex items-center gap-3 px-4 py-2 border-b overflow-hidden select-none"
        style={{
          "border-color": `${props.color}18`,
          background:     `linear-gradient(to right, ${props.color}08, transparent 60%)`,
          "clip-path":    phase() >= 1 ? "inset(0 0% 0 0)" : "inset(0 100% 0 0)",
          transition:     "clip-path 0.38s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div class="w-px h-5 flex-shrink-0" style={{ background: `${props.color}90` }} />
        <span class="font-mono text-xs tracking-[0.35em] uppercase flex-shrink-0"
          style={{ color: `${props.color}90` }}>
          {props.codename}
        </span>
        <div class="h-px flex-1"
          style={{ background: `linear-gradient(to right, ${props.color}35, transparent)` }} />
        <div class="flex items-center gap-2 flex-shrink-0">
          <span class="font-mono text-[11px] tracking-[0.25em] text-slate-700 uppercase">
            MODULE·LOADED
          </span>
          <span class="w-1 h-1 rounded-full animate-pulse"
            style={{ background: props.color, "box-shadow": `0 0 4px ${props.color}` }} />
        </div>
      </div>

      {/* ── ZONE 2: Body — fades in with scan sweep ── */}
      <div
        class="flex-1 relative flex flex-col min-h-0 overflow-y-auto overflow-x-hidden"
        style={{
          "scrollbar-width": "thin",
          "scrollbar-color": "rgba(255,255,255,0.06) transparent",
          opacity:    phase() >= 2 ? "1" : "0",
          transform:  phase() >= 2 ? "translateY(0)" : "translateY(10px)",
          transition: "opacity 0.5s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          filter:     phase() >= 2 ? "blur(0px)" : "blur(2px)",
        }}
      >
        {/* Scan-line overlay — clipped to Zone 2 via overflow-hidden wrapper */}
        <div class="absolute inset-0 pointer-events-none z-10 overflow-hidden">
          <div
            style={{
              height:     "35%",
              background: `linear-gradient(to bottom, transparent, ${props.color}0d 50%, transparent)`,
              transform:  phase() >= 2 ? "translateY(320%)" : "translateY(-100%)",
              transition: phase() >= 2 ? "transform 0.75s cubic-bezier(0.4, 0, 0.2, 1)" : "none",
            }}
          />
        </div>
        {props.children}
      </div>

      {/* ── ZONE 3: Bottom status strip — slides up ── */}
      <div
        class="flex-shrink-0 flex items-center gap-3 px-4 py-2 border-t select-none justify-between"
        style={{
          "border-color": `${props.color}10`,
          background:     `linear-gradient(to right, ${props.color}05, transparent 40%)`,
          opacity:        phase() >= 3 ? "1" : "0",
          transform:      phase() >= 3 ? "translateY(0)" : "translateY(6px)",
          transition:     "opacity 0.35s ease, transform 0.35s ease",
        }}
      >
        {props.footer ?? (
          <>
            <span class="font-mono text-[11px] tracking-[0.25em] text-slate-700 uppercase">
              {props.label}
            </span>
            <div class="h-px flex-1 bg-white/[0.025]" />
            <span class="font-mono text-[11px] tabular-nums text-slate-700">
              {new Date().toISOString().slice(0, 10)}
            </span>
            <span class="font-mono text-[11px] tracking-[0.2em]"
              style={{ color: `${props.color}45` }}>
              SYS:NOMINAL
            </span>
          </>
        )}
      </div>

      {/* ── Terminal prompt — sits just below Zone 3 ── */}
      <div
        class="flex-shrink-0 px-4 py-1.5 border-t select-none flex justify-between"
        style={{
          "border-color": "rgba(255,255,255,0.04)",
          background: "#080808",
          opacity: phase() >= 3 ? "1" : "0",
          transition: "opacity 0.4s ease 0.1s",
        }}
      >
        <TerminalPrompt />


      {/* Center: keyboard hints + graph focus */}
      <div class="hidden md:flex items-center gap-4 font-mono text-[9px] flex-1 justify-center">
        <div class="flex items-center gap-2 text-slate-700 tracking-wider">
          <span class="border border-white/10 rounded px-1 py-px text-[8px]">ESC</span>
          <span>HOME</span>
          <span class="text-white/15 mx-1">·</span>
          <span class="border border-white/10 rounded px-1 py-px text-[8px]">← →</span>
          <span>NAVIGATE</span>
        </div>

        <div
          class="flex items-center gap-1.5 transition-opacity duration-300"
          style={{ opacity: commandState.starMapFocusNode ? "1" : "0" }}
        >
          <span class="text-white/15">·</span>
          <span class="text-slate-600">GRAPH ←</span>
          <span class="text-cyan-500 tracking-widest">{commandState.starMapFocusNode ?? ""}</span>
        </div>
      </div>

      {/* Right: date + session + status */}
      <div class="flex items-center gap-3 font-mono text-[9px] shrink-0">
        <span class="text-slate-700 hidden lg:inline">{isoDate()}</span>
        <div class="w-px h-3 bg-white/8 hidden sm:block" />
        <span class="text-slate-700 hidden sm:inline tabular-nums">
          SESSION: {fmtUptime()}
        </span>
        <div class="w-px h-3 bg-white/8" />
        <span class="text-slate-600 hidden sm:inline tracking-wider">arthurlau.dev</span>
        <div class="w-px h-3 bg-white/8" />
        <div class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-emerald-400" />
          <span class="text-slate-600 tracking-wider">NOMINAL</span>
        </div>
      </div>
      </div>
    </div>
  )
}

export default SectionShell
