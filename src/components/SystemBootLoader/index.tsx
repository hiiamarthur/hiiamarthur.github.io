import {
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  For,
  Show,
  type Component,
} from "solid-js"
import { setCommandState } from "../../store/commandStore"

// ─── Boot Sequence Definition ────────────────────────────────────────────────

type LineType = "system" | "info" | "success" | "warning" | "granted" | "dim"

interface BootLine {
  text: string
  /** ms after component mount when this line becomes visible */
  at: number
  type: LineType
}

const BOOT_SEQUENCE: BootLine[] = [
  { at: 150,  type: "dim",     text: "────────────────────────────────────────────────────" },
  { at: 200,  type: "system",  text: "ARTHUR.LAU_OS  v2.6.3  [TORONTO-CA]" },
  { at: 300,  type: "dim",     text: "────────────────────────────────────────────────────" },
  { at: 600,  type: "system",  text: "» Initializing kernel modules..." },
  { at: 900,  type: "info",    text: "  ✓  solid-js@1.9.4          loaded" },
  { at: 1050, type: "info",    text: "  ✓  @solidjs/router@0.15.3  loaded" },
  { at: 1200, type: "info",    text: "  ✓  tailwindcss@3.4.17      loaded" },
  { at: 1500, type: "system",  text: "» Mounting data partitions..." },
  { at: 1700, type: "info",    text: "  ✓  /src/data/experiences   OK" },
  { at: 1850, type: "info",    text: "  ✓  /src/data/projects      OK" },
  { at: 2000, type: "info",    text: "  ✓  /src/store/commandStore OK" },
  { at: 2300, type: "system",  text: "» Authenticating operator..." },
  { at: 2700, type: "success", text: "  ✓  ID        : arthur.lau // Senior Software Engineer" },
  { at: 2900, type: "success", text: "  ✓  BASE      : Toronto, CA" },
  { at: 3100, type: "success", text: "  ✓  STACK     : React · Python · Elixir · .NET · SolidJS" },
  { at: 3300, type: "success", text: "  ✓  SPECIALTY : Agentic AI · Full-Stack · Distributed Systems" },
  { at: 3500, type: "success", text: "  ✓  CLEARANCE : SENIOR_ENGINEER // STATUS: AVAILABLE" },
  { at: 3900, type: "system",  text: "» Loading tactical modules..." },
  { at: 4100, type: "info",    text: "  [██████████████████████]  ARKHAM_ANALYSIS    ✓" },
  { at: 4300, type: "info",    text: "  [██████████████████████]  VIGILANT_STREAM    ✓" },
  { at: 4500, type: "info",    text: "  [██████████████████████]  STAR_MAP_GRAPH     ✓" },
  { at: 4800, type: "warning", text: "» Establishing secure channel... [AES-256-GCM]" },
  { at: 5300, type: "dim",     text: "────────────────────────────────────────────────────" },
  { at: 5500, type: "granted", text: "  ██████  ACCESS GRANTED  ██████" },
  { at: 5700, type: "dim",     text: "────────────────────────────────────────────────────" },
]

const TOTAL_LINES = BOOT_SEQUENCE.length
const FADE_OUT_DELAY = 1400 // ms after last line before the overlay fades

// ─── Color Map ───────────────────────────────────────────────────────────────

const lineColor: Record<LineType, string> = {
  system:  "text-cyan-400",
  info:    "text-slate-400",
  success: "text-emerald-400",
  warning: "text-amber-400",
  granted: "text-emerald-300",
  dim:     "text-slate-600",
}

// ─── Component ───────────────────────────────────────────────────────────────

const SystemBootLoader: Component = () => {
  const [revealedCount, setRevealedCount] = createSignal(0)
  const [phase, setPhase] = createSignal<"typing" | "fadeout">("typing")

  // Derived: 0–100 progress based on how many lines are shown
  const progress = createMemo(() =>
    Math.round((revealedCount() / TOTAL_LINES) * 100)
  )

  // Derived: lines currently visible (slice so For re-renders minimally)
  const visibleLines = createMemo(() =>
    BOOT_SEQUENCE.slice(0, revealedCount())
  )

  const timeouts: ReturnType<typeof setTimeout>[] = []

  onMount(() => {
    setCommandState("bootPhase", "booting")

    // Schedule each line reveal
    BOOT_SEQUENCE.forEach((line, i) => {
      timeouts.push(
        setTimeout(() => setRevealedCount(i + 1), line.at)
      )
    })

    // Schedule fade-out after last line
    const lastAt = BOOT_SEQUENCE[BOOT_SEQUENCE.length - 1].at
    timeouts.push(
      setTimeout(() => {
        setPhase("fadeout")
        // Give CSS transition time to complete, then mark boot done
        timeouts.push(
          setTimeout(() => setCommandState("bootPhase", "complete"), 800)
        )
      }, lastAt + FADE_OUT_DELAY)
    )
  })

  onCleanup(() => {
    timeouts.forEach(clearTimeout)
  })

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div
      class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700 ease-in-out"
      style={{
        background: "#0a0a0a",
        opacity: phase() === "fadeout" ? "0" : "1",
        "pointer-events": phase() === "fadeout" ? "none" : "all",
      }}
    >
      {/* Scanline overlay — pure CSS, no JS cost */}
      <div
        class="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 2px, rgba(0,0,0,0.08) 4px)",
        }}
      />

      {/* Subtle vignette */}
      <div
        class="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Terminal window */}
      <div class="relative z-20 w-full max-w-2xl mx-4">
        {/* Window chrome */}
        <div class="flex items-center gap-2 px-4 py-2 rounded-t-lg border border-b-0 border-cyan-900/50 bg-[#0f0f0f]">
          <span class="w-3 h-3 rounded-full bg-red-500/70" />
          <span class="w-3 h-3 rounded-full bg-yellow-500/70" />
          <span class="w-3 h-3 rounded-full bg-emerald-500/70" />
          <span class="ml-auto font-mono text-xs text-slate-500 tracking-widest">
            ARTHUR.LAU_OS — boot.sh
          </span>
        </div>

        {/* Terminal body */}
        <div
          class="rounded-b-lg border border-cyan-900/50 bg-[#0a0a0a]/95 backdrop-blur-sm px-6 py-5 font-mono text-sm leading-relaxed overflow-hidden"
          style={{ "min-height": "360px" }}
        >
          <For each={visibleLines()}>
            {(line, i) => (
              <div
                class={`${lineColor[line.type]} transition-all duration-150 whitespace-pre ${
                  line.type === "granted"
                    ? "text-center tracking-[0.35em] text-base font-bold animate-pulse"
                    : "tracking-wide"
                }`}
              >
                {/* Cursor only on last revealed line while still typing */}
                {i() === revealedCount() - 1 && phase() === "typing" && revealedCount() < TOTAL_LINES ? (
                  <>
                    {line.text}
                    <span class="inline-block w-2 h-4 ml-0.5 bg-cyan-400 align-middle animate-[blink_1s_step-end_infinite]" />
                  </>
                ) : (
                  line.text
                )}
              </div>
            )}
          </For>
        </div>

        {/* Progress bar */}
        <div class="mt-3 flex items-center gap-3">
          <div class="flex-1 h-px bg-slate-800 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-cyan-600 to-cyan-400 transition-all duration-300 ease-out"
              style={{ width: `${progress()}%` }}
            />
          </div>
          <span class="font-mono text-xs text-cyan-600 tabular-nums w-8 text-right">
            {progress()}%
          </span>
        </div>

        {/* Status line */}
        <div class="mt-2 flex items-center justify-between font-mono text-xs text-slate-600">
          <span class="tracking-widest">
            {progress() < 100 ? "LOADING..." : "BOOT SEQUENCE COMPLETE"}
          </span>
          <Show when={progress() < 100}>
            <span class="animate-pulse text-cyan-700">■ ■ ■</span>
          </Show>
          <Show when={progress() === 100}>
            <span class="text-emerald-600">■ NOMINAL</span>
          </Show>
        </div>
      </div>
    </div>
  )
}

export default SystemBootLoader
