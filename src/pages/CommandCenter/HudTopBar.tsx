import { createSignal, onCleanup, onMount, type Component } from "solid-js"

// ─── Rotating ticker messages ─────────────────────────────────────────────────
const TICKER: string[] = [
  "REACTIVE RENDERING ENGINE: SOLID-JS v1.9  //  ACTIVE",
  "AI SUBSYSTEMS: AGENTIC PIPELINE  //  ONLINE",
  "KNOWLEDGE GRAPH: 27 NODES · 37 EDGES  //  MAPPED",
  "FULL-STACK MATRIX: 7+ YEARS OPERATIONAL",
  "DEPLOYMENT GRID: AWS · AZURE · DOCKER  //  NOMINAL",
  "SECURE CHANNEL: AES-256-GCM  //  ESTABLISHED",
  "STACK LOCK: REACT · ELIXIR · PYTHON · .NET  //  LOADED",
]

const RotatingTicker: Component = () => {
  const [idx, setIdx] = createSignal(0)
  const [visible, setVisible] = createSignal(true)

  onMount(() => {
    const id = setInterval(() => {
      // Fade out → swap → fade in
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % TICKER.length)
        setVisible(true)
      }, 400)
    }, 4000)
    onCleanup(() => clearInterval(id))
  })

  return (
    <span
      class="font-mono text-[9px] tracking-[0.18em] text-slate-500 transition-opacity duration-400 uppercase hidden lg:inline"
      style={{ opacity: visible() ? "1" : "0" }}
    >
      {TICKER[idx()]}
    </span>
  )
}

// ─── HudTopBar ────────────────────────────────────────────────────────────────
const HudTopBar: Component = () => {
  const [time, setTime] = createSignal("")

  const tick = () => {
    const d = new Date()
    const p = (n: number) => String(n).padStart(2, "0")
    setTime(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`)
  }

  onMount(() => {
    tick()
    const id = setInterval(tick, 1000)
    onCleanup(() => clearInterval(id))
  })

  return (
    <header class="flex-shrink-0 flex items-center justify-between px-4 h-11 border-b border-white/5 bg-[#080808]">

      {/* Left: Logo + version */}
      <div class="flex items-center gap-3 min-w-0 shrink-0">
        <div class="relative">
          <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
          <div class="absolute inset-0 w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping opacity-40" />
        </div>
        <span class="font-space text-sm text-cyan-400 tracking-widest whitespace-nowrap">
          ARTHUR.LAU_OS
        </span>
        <div class="w-px h-4 bg-white/8 hidden sm:block" />
        <span class="font-mono text-[9px] text-slate-700 tracking-wider hidden sm:inline">v2.6.3</span>
        <span class="font-mono text-[9px] text-slate-700 hidden md:inline">·</span>
        <div class="hidden md:flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-emerald-400" />
          <span class="font-mono text-[9px] text-emerald-600 tracking-wider">OPERATIONAL</span>
        </div>
      </div>

      {/* Center: rotating ticker */}
      <div class="flex-1 text-center px-4 overflow-hidden">
        <RotatingTicker />
      </div>

      {/* Right: operator + clock */}
      <div class="flex items-center gap-3 shrink-0">
        <span class="font-mono text-[9px] text-slate-600 tracking-wider hidden md:inline uppercase">
          Operator: Arthur Lau
        </span>
        <div class="w-px h-4 bg-white/8" />
        <div class="flex items-center gap-1.5">
          <span class="font-mono text-[10px] text-cyan-600 tabular-nums tracking-widest">{time()}</span>
          <span class="font-mono text-[9px] text-slate-700 hidden sm:inline">UTC-5</span>
        </div>
      </div>
    </header>
  )
}

export default HudTopBar
