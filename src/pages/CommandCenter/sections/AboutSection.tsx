import { type Component } from "solid-js"

const STATS = [
  { label: "Experience", value: "7+ Years" },
  { label: "Education",  value: "BSc. CS — CUHK" },
  { label: "Location",   value: "Toronto, CA" },
  { label: "Status",     value: "Available" },
]

const AboutSection: Component = () => (
  <div class="max-w-2xl mx-auto py-8 px-4">
    <p class="font-mono text-[9px] tracking-[0.35em] text-cyan-600 uppercase mb-6">
      — Operator Profile / IDENT —
    </p>

    {/* ID Card */}
    <div class="relative border border-cyan-500/20 bg-[#0d0d0d] rounded-lg p-6 mb-6">
      {/* Corner brackets */}
      {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((cls) => (
        <div class={`absolute w-5 h-5 border-cyan-500/50 ${cls}`} />
      ))}

      <div class="flex gap-6 items-start">
        <img
          src="/images/photo.png"
          alt="Arthur Lau"
          class="w-24 h-24 rounded-lg object-cover border border-cyan-500/20 flex-shrink-0"
          onError={(e) => { e.currentTarget.style.display = "none" }}
        />
        <div class="flex-1">
          <div class="font-mono text-[9px] tracking-[0.3em] text-cyan-500 mb-1">ID: ART-HUR · CLEARANCE: SENIOR_ENGINEER</div>
          <p class="text-sm text-slate-300 leading-relaxed">
            Results-driven Software Engineer specialising in full-stack development —
            React, Next.js, Python, C# (.NET), Flutter, and Cloud (Azure, AWS).
            Delivering scalable, secure solutions across vending automation, ERP,
            IoT, finance, and gaming. Strong cross-functional communicator; pursues
            technical craftsmanship through mentorship and maintainable code.
          </p>
        </div>
      </div>
    </div>

    {/* Stats grid */}
    <div class="grid grid-cols-2 gap-3 mb-6">
      {STATS.map((s) => (
        <div class="border border-white/5 bg-white/[0.02] rounded px-4 py-3">
          <div class="font-mono text-[9px] tracking-[0.2em] text-slate-500 uppercase mb-1">{s.label}</div>
          <div
            class="font-mono text-sm text-slate-200"
            style={{ color: s.label === "Status" ? "#34d399" : undefined }}
          >
            {s.value}
          </div>
        </div>
      ))}
    </div>

    {/* Certificate */}
    <div class="border border-amber-500/15 bg-amber-500/[0.03] rounded px-4 py-3">
      <div class="font-mono text-[9px] tracking-[0.2em] text-amber-600 uppercase mb-1">Certification — In Progress</div>
      <div class="font-mono text-sm text-slate-300">AWS Solutions Architect Associate</div>
    </div>
  </div>
)

export default AboutSection
