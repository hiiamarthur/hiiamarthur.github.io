import { createSignal, onCleanup, onMount, type Component } from "solid-js"

const HudTopBar: Component = () => {
  const [time, setTime] = createSignal("")

  const tick = () => {
    const now = new Date()
    const hh = String(now.getHours()).padStart(2, "0")
    const mm = String(now.getMinutes()).padStart(2, "0")
    const ss = String(now.getSeconds()).padStart(2, "0")
    setTime(`${hh}:${mm}:${ss}`)
  }

  onMount(() => {
    tick()
    const id = setInterval(tick, 1000)
    onCleanup(() => clearInterval(id))
  })

  return (
    <header class="flex-shrink-0 flex items-center justify-between px-4 h-11 border-b border-white/5 bg-[#080808]">
      {/* Left: Logo */}
      <div class="flex items-center gap-3">
        <div class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        <span class="font-space text-sm text-cyan-400 tracking-widest">
          ARTHUR.LAU_OS
        </span>
        <span class="font-mono text-[9px] text-slate-600 tracking-wider hidden sm:inline">
          v2.6.3
        </span>
      </div>

      {/* Center: status badges */}
      <div class="hidden md:flex items-center gap-4">
        <div class="flex items-center gap-1.5">
          <span class="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span class="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase">System: Operational</span>
        </div>
        <div class="w-px h-3 bg-white/10" />
        <span class="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase">Operator: Arthur Lau</span>
        <div class="w-px h-3 bg-white/10" />
        <span class="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase">Clearance: Senior</span>
      </div>

      {/* Right: clock */}
      <div class="flex items-center gap-2">
        <span class="font-mono text-[10px] text-cyan-600 tabular-nums tracking-widest">
          {time()}
        </span>
        <div class="w-px h-4 bg-white/8" />
        <span class="font-mono text-[9px] text-slate-600 tracking-wider hidden sm:inline">UTC-5</span>
      </div>
    </header>
  )
}

export default HudTopBar
