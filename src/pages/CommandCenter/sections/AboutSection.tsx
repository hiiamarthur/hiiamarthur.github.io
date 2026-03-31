import { createSignal, onMount, type Component } from "solid-js"
import SectionShell, { SectionInternalHeader, ElectricReveal } from "./SectionShell"

const STATS = [
  { label: "Experience", value: "7+ Years" },
  { label: "Education",  value: "BSc. CS — CUHK" },
  { label: "Location",   value: "Toronto, CA" },
  { label: "Status",     value: "Available", highlight: true },
]

const AboutSection: Component = () => {
  // phase 0 = hidden | 1 = header sweeps | 2 = ID card | 3 = stats | 4 = cert
  const [phase, setPhase] = createSignal(0)

  onMount(() => {
    setTimeout(() => setPhase(1), 160)   // header rolls out horizontally
    setTimeout(() => setPhase(2), 360)   // ID card drops (while header still sweeping)
    setTimeout(() => setPhase(3), 520)   // stats grid drops
    setTimeout(() => setPhase(4), 680)   // certificate drops
  })

  return (
    <SectionShell codename="IDENT" label="Operator Profile" color="#67e8f9">
      <div class="max-w-5xl mx-auto py-10 px-8 flex flex-col gap-6 flex-1">

        {/* ── Header line sweeps horizontally first ── */}
        <SectionInternalHeader
          label="Identification Modules"
          color="#67e8f9"
          active={phase() >= 1}
        />

        {/* ── Block 1: ID Card drops behind charge line ── */}
        <ElectricReveal active={phase() >= 2} color="#67e8f9">
          <div class="relative border border-cyan-500/20 bg-[#0d0d0d] rounded-lg p-6">
            {(["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
               "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"] as const
            ).map((cls) => (
              <div class={`absolute w-5 h-5 border-cyan-500/50 ${cls}`} />
            ))}
            <div class="flex gap-6 items-start">
              <img
                src="/images/photo.png"
                alt="Arthur Lau"
                class="w-32 h-32 rounded-lg object-cover border border-cyan-500/20 flex-shrink-0"
                onError={(e) => { e.currentTarget.style.display = "none" }}
              />
              <div class="flex-1">
                <div class="font-mono text-sm tracking-[0.25em] text-cyan-500 mb-3">
                  ID: ART-HUR · CLEARANCE: SENIOR_ENGINEER
                </div>
                <p class="text-lg text-slate-300 leading-relaxed">
                  Results-driven Software Engineer specialising in full-stack development —
                  React, Next.js, Python, C# (.NET), Flutter, and Cloud (Azure, AWS).
                  Delivering scalable, secure solutions across vending automation, ERP,
                  IoT, finance, and gaming. Strong cross-functional communicator; pursues
                  technical craftsmanship through mentorship and maintainable code.
                </p>
              </div>
            </div>
          </div>
        </ElectricReveal>

        {/* ── Block 2: Stats grid ── */}
        <ElectricReveal active={phase() >= 3} color="#67e8f9">
          <div class="grid grid-cols-2 gap-3">
            {STATS.map((s) => (
              <div class="border border-white/5 bg-white/[0.02] rounded px-4 py-3">
                <div class="font-mono text-sm tracking-[0.15em] text-slate-500 uppercase mb-1">
                  {s.label}
                </div>
                <div class="font-mono text-xl"
                  style={{ color: s.highlight ? "#34d399" : "rgba(226,232,240,0.9)" }}>
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </ElectricReveal>

        {/* ── Block 3: Certificate ── */}
        <ElectricReveal active={phase() >= 4} color="#f59e0b">
          <div class="border border-amber-500/15 bg-amber-500/[0.03] rounded px-4 py-3">
            <div class="font-mono text-sm tracking-[0.15em] text-amber-600 uppercase mb-1">
              Certification — In Progress
            </div>
            <div class="font-mono text-xl text-slate-300">
              AWS Solutions Architect Associate
            </div>
          </div>
        </ElectricReveal>

      </div>
    </SectionShell>
  )
}

export default AboutSection
