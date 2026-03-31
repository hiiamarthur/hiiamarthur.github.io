import { createSignal, createEffect, onCleanup, onMount, type Component } from "solid-js"
import { commandState, type SectionId } from "../../store/commandStore"

// ─── Section → terminal command ───────────────────────────────────────────────
const SECTION_COMMANDS: Record<SectionId, string> = {
  hero:       "cd ~/home",
  about:      "cat ./operator.profile",
  experience: "less ./ops.log",
  projects:   "ls -la ./tactical/",
  starmap:    "render star_map --2d",
  contact:    "ssh comms@arthurlau.dev",
}

// ─── Persistent terminal prompt ───────────────────────────────────────────────
// Types the current section's command; stays visible with a blinking cursor.
const TerminalPrompt: Component = () => {
  const [displayed, setDisplayed] = createSignal("")
  const [isTyping, setIsTyping]   = createSignal(false)

  createEffect(() => {
    const command = SECTION_COMMANDS[commandState.activeSection]

    setDisplayed("")
    setIsTyping(true)

    let i = 0
    const id = setInterval(() => {
      i++
      setDisplayed(command.slice(0, i))
      if (i >= command.length) {
        clearInterval(id)
        setIsTyping(false)
      }
    }, 20)

    onCleanup(() => clearInterval(id))
  })

  return (
    <div class="flex items-center gap-1.5 font-mono text-[11px] shrink-0">
      <span class="text-cyan-600">$</span>
      <span class="text-slate-300 tracking-wide">{displayed()}</span>
      {/* Cursor: no animation while typing, blink at rest */}
      <span
        class="inline-block w-[2px] h-[11px] bg-cyan-400 align-middle"
        style={{
          animation: isTyping() ? "none" : "blink 1s step-end infinite",
          opacity: isTyping() ? "1" : undefined,
        }}
      />
    </div>
  )
}

// ─── HudBottomBar ─────────────────────────────────────────────────────────────
const HudBottomBar: Component = () => {
  const [uptime, setUptime] = createSignal(0)
  onMount(() => {
    const start = Date.now()
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000)
    onCleanup(() => clearInterval(id))
  })

  const fmtUptime = () => {
    const s = uptime()
    const m = Math.floor(s / 60)
    const h = Math.floor(m / 60)
    const pp = (n: number) => String(n).padStart(2, "0")
    return h > 0 ? `${pp(h)}:${pp(m % 60)}:${pp(s % 60)}` : `${pp(m)}:${pp(s % 60)}`
  }

  const isoDate = () => new Date().toISOString().slice(0, 10)

  return (
    <footer class="flex-shrink-0 h-9 flex items-center justify-between px-4 border-t border-white/5 bg-[#080808] gap-3 overflow-hidden">

      {/* Left: persistent terminal command prompt */}
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
    </footer>
  )
}

export default HudBottomBar
