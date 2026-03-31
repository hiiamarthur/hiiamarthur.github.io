import { type Component } from "solid-js"
import { openExternal } from "../../../store/commandStore"

const CHANNELS = [
  {
    label: "EMAIL",
    value: "pingtunglau@gmail.com",
    hint: "Primary channel",
    action: () => openExternal("mailto:pingtunglau@gmail.com", "EMAIL"),
    accentColor: "#67e8f9",
  },
  {
    label: "GITHUB",
    value: "github.com/hiiamarthur",
    hint: "Source repositories",
    action: () => openExternal("https://github.com/hiiamarthur", "GITHUB"),
    accentColor: "#a78bfa",
  },
  {
    label: "LINKEDIN",
    value: "linkedin.com/in/arthurlau",
    hint: "Professional network",
    action: () => openExternal("https://www.linkedin.com/in/arthurlau/", "LINKEDIN"),
    accentColor: "#818cf8",
  },
  {
    label: "RESUME",
    value: "Resume.pdf",
    hint: "Download credentials",
    action: () => openExternal("/files/Resume.pdf", "RESUME"),
    accentColor: "#34d399",
  },
]

const ContactSection: Component = () => (
  <div class="max-w-xl mx-auto py-8 px-4">
    <p class="font-mono text-[9px] tracking-[0.35em] text-cyan-600 uppercase mb-6">
      — Open Channel / COMMS —
    </p>

    <div class="flex flex-col gap-3">
      {CHANNELS.map((ch) => (
        <button
          onClick={ch.action}
          class="group relative overflow-hidden flex items-center gap-5 px-5 py-4 rounded border border-white/6 bg-[#0d0d0d] hover:border-current transition-all duration-300 text-left w-full"
          style={{ "--accent": ch.accentColor } as any}
        >
          {/* Shimmer sweep */}
          <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/4 to-transparent pointer-events-none" />

          {/* Left accent line */}
          <div
            class="absolute left-0 top-0 bottom-0 w-0.5 transition-opacity duration-300 opacity-0 group-hover:opacity-100 rounded-l"
            style={{ background: ch.accentColor }}
          />

          {/* Status dot */}
          <div class="w-2 h-2 rounded-full flex-shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100"
            style={{ background: ch.accentColor, "box-shadow": `0 0 8px ${ch.accentColor}` }}
          />

          <div class="flex-1 min-w-0">
            <div class="font-mono text-[9px] tracking-[0.3em] text-slate-500 uppercase mb-0.5 group-hover:text-slate-400 transition-colors">
              {ch.label}
            </div>
            <div class="font-mono text-sm text-slate-300 group-hover:text-white truncate transition-colors">
              {ch.value}
            </div>
          </div>

          <div class="font-mono text-[9px] tracking-wider text-slate-600 group-hover:text-slate-400 transition-colors flex-shrink-0">
            {ch.hint} →
          </div>
        </button>
      ))}
    </div>

    <div class="mt-8 border border-cyan-500/10 bg-cyan-500/[0.02] rounded px-4 py-3 text-center">
      <p class="font-mono text-[10px] tracking-[0.2em] text-slate-500">
        Currently open to new opportunities
      </p>
      <div class="flex items-center justify-center gap-2 mt-1">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span class="font-mono text-[10px] tracking-widest text-emerald-400">AVAILABLE FOR HIRE</span>
      </div>
    </div>
  </div>
)

export default ContactSection
