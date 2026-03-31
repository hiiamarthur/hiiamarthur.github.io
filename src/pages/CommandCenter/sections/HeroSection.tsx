import { type Component } from "solid-js"
import { setCommandState, type SectionId } from "../../../store/commandStore"

const QUICK_LINKS: { label: string; section: SectionId; hint: string }[] = [
  { section: "about",      label: "IDENT",    hint: "Operator Profile"   },
  { section: "experience", label: "OPS LOG",  hint: "Mission History"    },
  { section: "projects",   label: "TACTICAL", hint: "Deployed Systems"   },
  { section: "starmap",    label: "STAR MAP", hint: "Knowledge Graph"    },
  { section: "contact",    label: "COMMS",    hint: "Open Channel"       },
]

const HeroSection: Component = () => (
  <div class="flex flex-col items-center justify-center h-full min-h-[60vh] select-none">
    {/* Identity display */}
    <div class="relative text-center mb-10">
      {/* Corner brackets */}
      <div class="absolute -top-4 -left-6 w-5 h-5 border-t-2 border-l-2 border-cyan-500/50" />
      <div class="absolute -top-4 -right-6 w-5 h-5 border-t-2 border-r-2 border-cyan-500/50" />
      <div class="absolute -bottom-4 -left-6 w-5 h-5 border-b-2 border-l-2 border-cyan-500/50" />
      <div class="absolute -bottom-4 -right-6 w-5 h-5 border-b-2 border-r-2 border-cyan-500/50" />

      <p class="font-mono text-[10px] tracking-[0.4em] text-cyan-600 mb-3 uppercase">
        Operator Identity Confirmed
      </p>

      <h1
        class="font-space text-5xl md:text-7xl text-white tracking-widest mb-2"
        style={{ "text-shadow": "0 0 40px rgba(103,232,249,0.3), 0 0 80px rgba(103,232,249,0.1)" }}
      >
        Hi, I'm Arthur
      </h1>

      <div class="flex items-center justify-center gap-3 mt-3">
        <div class="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60" />
        <p class="font-mono text-xs tracking-[0.25em] text-slate-400 uppercase">
          Senior Software Engineer · Toronto, CA
        </p>
        <div class="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60" />
      </div>

      <p class="font-mono text-[10px] tracking-[0.2em] text-slate-600 mt-2 uppercase">
        Full-Stack · Agentic AI · Distributed Systems
      </p>
    </div>

    {/* Quick-launch panel */}
    <div class="flex flex-wrap justify-center gap-3 max-w-xl">
      {QUICK_LINKS.map((link) => (
        <button
          onClick={() => setCommandState("activeSection", link.section)}
          class="group relative overflow-hidden flex flex-col items-center px-5 py-3 rounded border border-white/8 bg-white/[0.02] hover:border-cyan-500/40 hover:bg-cyan-500/5 transition-all duration-300 min-w-[90px]"
        >
          {/* Shimmer sweep on hover */}
          <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-cyan-400/8 to-transparent pointer-events-none" />

          <span class="font-mono text-[9px] tracking-[0.3em] text-cyan-500/70 group-hover:text-cyan-400 transition-colors uppercase">
            {link.label}
          </span>
          <span class="font-mono text-[8px] tracking-wider text-slate-600 group-hover:text-slate-400 mt-0.5 transition-colors">
            {link.hint}
          </span>
        </button>
      ))}
    </div>

    <p class="font-mono text-[9px] tracking-[0.3em] text-slate-700 mt-8 uppercase animate-pulse">
      Select module or use sidebar to navigate
    </p>
  </div>
)

export default HeroSection
