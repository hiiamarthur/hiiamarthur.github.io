import { createSignal, onMount, type Component } from "solid-js"
import { openExternal } from "../../../store/commandStore"
import SectionShell, { SectionInternalHeader, ElectricReveal } from "./SectionShell"

const CHANNELS = [
  {
    label:     "SECURE MAIL",
    protocol:  "SMTP · AES-256",
    value:     "pingtunglau@gmail.com",
    tag:       "PRIMARY CHANNEL",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.5" class="w-6 h-6">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="M2 7l10 7 10-7" />
      </svg>
    ),
    action: () => openExternal("mailto:pingtunglau@gmail.com", "EMAIL"),
    accentColor: "#67e8f9",
  },
  {
    label:     "CODE VAULT",
    protocol:  "SSH · PUBLIC REPOS",
    value:     "hiiamarthur",
    tag:       "GITHUB",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill={color} class="w-6 h-6">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
      </svg>
    ),
    action: () => openExternal("https://github.com/hiiamarthur", "GITHUB"),
    accentColor: "#a78bfa",
  },
  {
    label:     "PROFESSIONAL NET",
    protocol:  "TLS 1.3 · VERIFIED",
    value:     "arthurlau",
    tag:       "LINKEDIN",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill={color} class="w-6 h-6">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    action: () => openExternal("https://www.linkedin.com/in/arthurlau/", "LINKEDIN"),
    accentColor: "#818cf8",
  },
  {
    label:     "OPERATOR DOSSIER",
    protocol:  "GOOGLE DOCS · LIVE",
    value:     "Resume",
    tag:       "VIEW",
    icon: (color: string) => (
      <svg viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="1.5" class="w-6 h-6">
        <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    action: () => openExternal("https://docs.google.com/document/d/1p5RblZ3LCDfyuCzzxZpOag-XjcErW4d8xsK0Kw5rEDU/", "RESUME"),
    accentColor: "#34d399",
  },
]

const ContactSection: Component = () => {
  const [phase, setPhase] = createSignal(0)

  onMount(() => {
    setTimeout(() => setPhase(1), 160)
    setTimeout(() => setPhase(2), 360)
    setTimeout(() => setPhase(3), 520)
  })

  return (
    <SectionShell codename="COMMS" label="Open Channel" color="#f59e0b">
      <div class="max-w-4xl mx-auto py-10 px-8 flex flex-col flex-1">

        <SectionInternalHeader
          label="Open Channel"
          color="#f59e0b"
          active={phase() >= 1}
        />

        <div class="flex flex-col justify-between flex-1">
          <ElectricReveal active={phase() >= 2} color="#f59e0b">
            <div class="flex flex-col gap-3 mt-2">
              {CHANNELS.map((ch) => (
                <button
                  onClick={ch.action}
                  class="group relative overflow-hidden flex items-center gap-5 px-6 py-4 rounded border bg-[#0d0d0d] transition-all duration-300 text-left w-full"
                  style={{
                    "border-color": `${ch.accentColor}18`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = `${ch.accentColor}50`
                    e.currentTarget.style.background = `${ch.accentColor}06`
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = `${ch.accentColor}18`
                    e.currentTarget.style.background = "#0d0d0d"
                  }}
                >
                  {/* Sweep shimmer */}
                  <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-600 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                  {/* Left accent bar */}
                  <div class="absolute left-0 top-2 bottom-2 w-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: ch.accentColor }} />

                  {/* Icon */}
                  <div
                    class="flex-shrink-0 w-10 h-10 rounded flex items-center justify-center border transition-all duration-300"
                    style={{
                      "border-color": `${ch.accentColor}20`,
                      background:     `${ch.accentColor}08`,
                    }}
                  >
                    {ch.icon(ch.accentColor)}
                  </div>

                  {/* Text */}
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center gap-2 mb-0.5">
                      <span class="font-mono text-sm font-medium tracking-widest transition-colors duration-300"
                        style={{ color: ch.accentColor }}>
                        {ch.label}
                      </span>
                      <span class="font-mono text-[9px] tracking-widest px-1.5 py-0.5 rounded border opacity-50"
                        style={{ color: ch.accentColor, "border-color": `${ch.accentColor}30` }}>
                        {ch.tag}
                      </span>
                    </div>
                    <div class="font-mono text-[10px] tracking-[0.2em] text-slate-600 group-hover:text-slate-500 transition-colors">
                      {ch.protocol}
                    </div>
                  </div>

                  {/* Value + arrow */}
                  <div class="flex flex-col items-end gap-0.5 flex-shrink-0">
                    <span class="font-mono text-[11px] text-slate-500 group-hover:text-slate-300 transition-colors tracking-wide">
                      {ch.value}
                    </span>
                    <span class="font-mono text-[10px] transition-colors duration-300 opacity-0 group-hover:opacity-100"
                      style={{ color: ch.accentColor }}>
                      INITIATE →
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </ElectricReveal>

          <ElectricReveal active={phase() >= 3} color="#34d399">
            <div class="mt-5 border border-amber-500/10 bg-amber-500/[0.02] rounded px-4 py-3 text-center">
              <p class="font-mono text-sm tracking-[0.2em] text-slate-500">
                Currently open to new opportunities
              </p>
              <div class="flex items-center justify-center gap-2 mt-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span class="font-mono text-sm tracking-widest text-emerald-400">AVAILABLE FOR HIRE</span>
              </div>
            </div>
          </ElectricReveal>
        </div>

      </div>
    </SectionShell>
  )
}

export default ContactSection
