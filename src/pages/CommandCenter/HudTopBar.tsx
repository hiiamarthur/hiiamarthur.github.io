import { createSignal, onCleanup, onMount, Show, type Component } from "solid-js"

// ─── Rotating ticker messages ─────────────────────────────────────────────────
const TICKER: string[] = [
  "REACTIVE RENDERING ENGINE: SOLID-JS v1.9  //  ACTIVE",
  "AI SUBSYSTEMS: AGENTIC PIPELINE  //  ONLINE",
  "KNOWLEDGE GRAPH: 34 NODES · 61 EDGES  //  MAPPED",
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

// ─── Battery indicator ────────────────────────────────────────────────────────
const BatteryIndicator: Component = () => {
  const [level, setLevel]       = createSignal<number | null>(null)
  const [charging, setCharging] = createSignal(false)

  onMount(async () => {
    if (!("getBattery" in navigator)) return
    try {
      const bat = await (navigator as any).getBattery()
      const update = () => { setLevel(Math.round(bat.level * 100)); setCharging(bat.charging) }
      update()
      bat.addEventListener("levelchange",    update)
      bat.addEventListener("chargingchange", update)
      onCleanup(() => {
        bat.removeEventListener("levelchange",    update)
        bat.removeEventListener("chargingchange", update)
      })
    } catch {}
  })

  const color = () => {
    const l = level()
    if (l === null) return "#475569"
    if (charging()) return "#34d399"
    if (l > 50) return "#34d399"
    if (l > 20) return "#f59e0b"
    return "#f87171"
  }

  const barWidth = () => `${Math.max(2, (level() ?? 0))}%`

  return (
    <Show when={level() !== null}>
      <div class="flex items-center gap-1.5 shrink-0">
        {/* Battery shell */}
        <div class="relative flex items-center" style={{ width: "22px", height: "11px" }}>
          <div
            class="rounded-sm border flex-1 h-full relative overflow-hidden"
            style={{ "border-color": `${color()}50`, width: "20px" }}
          >
            <div
              class="absolute left-0 top-0 bottom-0 transition-all duration-1000"
              style={{ width: barWidth(), background: color(), opacity: "0.85" }}
            />
          </div>
          {/* Terminal nub */}
          <div class="w-[2px] h-[5px] rounded-r-sm" style={{ background: `${color()}50` }} />
        </div>
        {/* Percentage + bolt */}
        <span class="font-mono text-[9px] tabular-nums" style={{ color: color() }}>
          {charging() ? "⚡" : ""}{level()}%
        </span>
      </div>
    </Show>
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

      {/* Right: operator + power + clock */}
      <div class="flex items-center gap-3 shrink-0">
        <span class="font-mono text-[9px] text-slate-600 tracking-wider hidden md:inline uppercase">
          Operator: Arthur Lau
        </span>
        <div class="w-px h-4 bg-white/8" />
        <BatteryIndicator />
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
