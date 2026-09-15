import { createSignal, createEffect, onCleanup, type Component } from "solid-js"
import { commandState, type SectionId } from "../../store/commandStore"

// ─── Section → terminal command ───────────────────────────────────────────────
const SECTION_COMMANDS: Record<SectionId, string> = {
  hero:       "cd ~/home",
  about:      "cat ./operator.profile",
  experience: "less ./ops.log",
  projects:   "ls -la ./tactical/",
  starmap:    "render star_map --2d",
  commits:    "git log --all --oneline -n 40",
  contact:    "ssh comms@arthurlau.dev",
}

// ─── Persistent terminal prompt ───────────────────────────────────────────────
// Types the current section's command; stays visible with a blinking cursor.
export const TerminalPrompt: Component = () => {
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
const HudBottomBar: Component = () => (
  <footer class="flex-shrink-0 flex items-center justify-center px-4 py-1.5 border-t border-white/[0.04] bg-[#080808]">
    <p class="font-mono text-[9px] text-slate-700 tracking-wider text-center">
      © {new Date().getFullYear()} Arthur Lau · All rights reserved · Built with SolidJS &amp; TailwindCSS 
    </p>
  </footer>
)

export default HudBottomBar
