import { createSignal, createMemo, onMount, onCleanup, type Component } from "solid-js"
import { setCommandState, type SectionId } from "../../../store/commandStore"
import SectionShell from "./SectionShell"

const HERO_TEXT = "Hi, I'm Arthur"
const TYPE_SPEED = 85

const QUICK_LINKS: { label: string; section: SectionId; hint: string }[] = [
  { section: "about",      label: "IDENT",    hint: "Operator Profile" },
  { section: "experience", label: "OPS LOG",  hint: "Mission History"  },
  { section: "projects",   label: "TACTICAL", hint: "Deployed Systems" },
  { section: "starmap",    label: "STAR MAP", hint: "Knowledge Graph"  },
  { section: "contact",    label: "COMMS",    hint: "Open Channel"     },
]

const HeroSection: Component = () => {
  const [charCount, setCharCount] = createSignal(0)
  const [done, setDone] = createSignal(false)

  const displayed = createMemo(() => HERO_TEXT.slice(0, charCount()))

  onMount(() => {
    const id = setInterval(() => {
      setCharCount((n) => {
        if (n >= HERO_TEXT.length) {
          clearInterval(id)
          setTimeout(() => setDone(true), 500)
          return n
        }
        return n + 1
      })
    }, TYPE_SPEED)
    onCleanup(() => clearInterval(id))
  })

  return (
    <SectionShell codename="CMD_DECK" label="Command Deck" color="#67e8f9">
      <div class="flex flex-col items-center justify-center h-full flex-1 select-none animate-float py-8">

        {/* ── Identity display ── */}
        <div class="relative text-center mb-10">
          {/* Corner brackets */}
          <div class="absolute -top-5 -left-7 w-5 h-5 border-t-2 border-l-2 border-cyan-500/40" />
          <div class="absolute -top-5 -right-7 w-5 h-5 border-t-2 border-r-2 border-cyan-500/40" />
          <div class="absolute -bottom-5 -left-7 w-5 h-5 border-b-2 border-l-2 border-cyan-500/40" />
          <div class="absolute -bottom-5 -right-7 w-5 h-5 border-b-2 border-r-2 border-cyan-500/40" />

          <p class="font-mono text-[12px] tracking-[0.4em] text-cyan-600 mb-4 uppercase">
            Operator Identity Confirmed
          </p>

          <h1
            class="font-space text-7xl md:text-9xl text-white tracking-widest mb-2 min-h-[1.2em]"
            style={{ "text-shadow": "0 0 40px rgba(103,232,249,0.3), 0 0 80px rgba(103,232,249,0.1)" }}
          >
            {displayed()}
            <span
              class="inline-block w-[3px] h-[0.85em] ml-1 align-middle bg-cyan-400 transition-opacity duration-300"
              style={{
                opacity: done() ? "0" : "1",
                animation: charCount() > 0 && charCount() < HERO_TEXT.length ? "none" : "blink 1s step-end infinite",
              }}
            />
          </h1>

          <div
            class="transition-all duration-700"
            style={{ opacity: done() ? "1" : "0", transform: done() ? "translateY(0)" : "translateY(6px)" }}
          >
            <div class="flex items-center justify-center gap-3 mt-3">
              <div class="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/50" />
              <p class="font-mono text-base tracking-[0.25em] text-slate-400 uppercase">
                Senior Software Engineer · Toronto, CA
              </p>
              <div class="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/50" />
            </div>
            <p class="font-mono text-sm tracking-[0.2em] text-slate-600 mt-2 uppercase">
              Full-Stack · Agentic AI · Distributed Systems
            </p>
          </div>
        </div>

        {/* ── Quick-launch panel ── */}
        <div
          class="flex flex-wrap justify-center gap-3 max-w-xl transition-all duration-700 delay-200"
          style={{ opacity: done() ? "1" : "0", transform: done() ? "translateY(0)" : "translateY(10px)" }}
        >
          {QUICK_LINKS.map((link) => (
            <button
              onClick={() => setCommandState("activeSection", link.section)}
              class="group relative overflow-hidden flex flex-col items-center px-7 py-4 rounded border border-white/[0.08] bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/[0.05] transition-all duration-300 min-w-[110px]"
            >
              <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-cyan-400/[0.08] to-transparent pointer-events-none" />
              <span class="font-mono text-[11px] tracking-[0.3em] text-cyan-500/70 group-hover:text-cyan-400 transition-colors uppercase">
                {link.label}
              </span>
              <span class="font-mono text-[10px] tracking-wider text-slate-600 group-hover:text-slate-400 mt-0.5 transition-colors">
                {link.hint}
              </span>
            </button>
          ))}
        </div>

        <p
          class="font-mono text-[11px] tracking-[0.3em] text-slate-700 mt-8 uppercase animate-pulse transition-opacity duration-700 delay-500"
          style={{ opacity: done() ? "1" : "0" }}
        >
          Select module or use sidebar to navigate
        </p>
      </div>
    </SectionShell>
  )
}

export default HeroSection
