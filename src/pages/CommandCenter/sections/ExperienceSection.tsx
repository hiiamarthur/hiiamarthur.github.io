import { createSignal, For, Show, type Component } from "solid-js"
import { experiences } from "../../../data/experiences"
import type { Experience } from "../../../types"
import YieldedIcon from "../../../components/yieldedIcon"
import SectionShell, { SectionInternalHeader } from "./SectionShell"

// ─── Mission Entry (collapsible project) ─────────────────────────────────────

const MissionEntry: Component<{
  index: number
  title: string
  descriptions: string[]
}> = (props) => {
  const [open, setOpen] = createSignal(false)

  return (
    <div class="border border-white/[0.06] rounded overflow-hidden">
      {/* Header row */}
      <button
        class="w-full flex items-center gap-3 px-5 py-4 text-left transition-colors duration-200 hover:bg-emerald-500/[0.05]"
        onClick={() => setOpen((v) => !v)}
      >
        {/* Index */}
        <span class="font-mono text-xs text-emerald-600/60 tabular-nums flex-shrink-0">
          M-{String(props.index + 1).padStart(2, "0")}
        </span>

        {/* Title */}
        <span class="font-mono text-sm tracking-wide text-slate-300 flex-1">
          {props.title}
        </span>

        {/* Chevron */}
        <svg
          class="w-3 h-3 text-emerald-600/50 flex-shrink-0 transition-transform duration-200"
          style={{ transform: open() ? "rotate(90deg)" : "rotate(0deg)" }}
          viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="2"
        >
          <path d="M6 4l4 4-4 4" />
        </svg>
      </button>

      {/* Expandable content */}
      <div
        class="overflow-hidden transition-all duration-300 ease-out"
        style={{
          "max-height": open() ? "600px" : "0px",
          opacity: open() ? "1" : "0",
        }}
      >
        <div class="px-4 pb-4 pt-1 border-t border-white/[0.04]">
          <ul class="flex flex-col gap-2">
            <For each={props.descriptions}>
              {(item) => (
                <li class="flex gap-2">
                  <span class="text-emerald-500/40 font-mono text-[10px] mt-0.5 flex-shrink-0">▸</span>
                  <span
                    class="font-mono text-sm text-slate-400 leading-relaxed"
                    innerHTML={item}
                  />
                </li>
              )}
            </For>
          </ul>
        </div>
      </div>
    </div>
  )
}

// ─── Tech pill ───────────────────────────────────────────────────────────────
// Uses YieldedIcon (brand icon + label) but filtered down to fit the dark theme.

const TechPill: Component<{ label: string }> = (props) => (
  <span
    class="inline-block"
    style={{
      // Desaturate brand colors and darken to blend with #0d0d0d backgrounds
      filter: "saturate(0.3) brightness(0.5) contrast(1.1)",
      "border-radius": "1rem",
      overflow: "hidden",
    }}
  >
    <YieldedIcon keyword={props.label}>{props.label}</YieldedIcon>
  </span>
)

// ─── Detail panel ─────────────────────────────────────────────────────────────

const DetailPanel: Component<{ exp: Experience }> = (props) => (
  <div class="flex flex-col gap-5">

    {/* Header card */}
    <div class="relative border border-emerald-500/15 bg-[#0d0d0d] rounded-lg p-5">
      {/* corner brackets */}
      <div class="absolute top-0 left-0 w-4 h-4 border-t border-l border-emerald-500/40 rounded-tl" />
      <div class="absolute top-0 right-0 w-4 h-4 border-t border-r border-emerald-500/40 rounded-tr" />
      <div class="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-emerald-500/40 rounded-bl" />
      <div class="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-emerald-500/40 rounded-br" />

      <div class="flex items-start justify-between gap-4 mb-3">
        <div>
          <div class="font-mono text-xs tracking-[0.3em] text-emerald-600 uppercase mb-1">
            Employer
          </div>
          <h3 class="font-space text-2xl text-white tracking-wide">{props.exp.company}</h3>
        </div>
        <div class="text-right flex-shrink-0">
          <div class="font-mono text-xs tracking-[0.3em] text-emerald-600 uppercase mb-1">
            Timeline
          </div>
          <div class="font-mono text-sm text-slate-400">{props.exp.duration}</div>
        </div>
      </div>

      <div class="flex items-center gap-2 mb-3">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
        <span class="font-mono text-sm tracking-[0.2em] text-emerald-400 uppercase">
          {props.exp.position}
        </span>
      </div>

      <Show when={props.exp.companyIntroduction}>
        <div class="h-px bg-emerald-500/10 mb-3" />
        <p class="font-mono text-sm text-slate-500 leading-relaxed">
          {props.exp.companyIntroduction}
        </p>
      </Show>
    </div>

    {/* Mission logs */}
    <Show when={props.exp.projects && props.exp.projects.length > 0}>
      <div>
        <div class="font-mono text-xs tracking-[0.3em] text-slate-600 uppercase mb-2">
          Mission Logs
        </div>
        <div class="flex flex-col gap-2">
          <For each={props.exp.projects}>
            {(project, i) => (
              <MissionEntry
                index={i()}
                title={project.title}
                descriptions={project.description as string[]}
              />
            )}
          </For>
        </div>
      </div>
    </Show>

    {/* Tech stack */}
    <Show when={props.exp.technologies && props.exp.technologies.length > 0}>
      <div>
        <div class="font-mono text-xs tracking-[0.3em] text-slate-600 uppercase mb-2">
          Tech Stack
        </div>
        <div class="flex flex-wrap gap-1.5">
          <For each={props.exp.technologies}>
            {(tech) => <TechPill label={tech} />}
          </For>
        </div>
      </div>
    </Show>
  </div>
)

// ─── ExperienceSection ────────────────────────────────────────────────────────

const ExperienceSection: Component = () => {
  const [selected, setSelected] = createSignal(experiences[0]?.id ?? "")
  const [headerActive, setHeaderActive] = createSignal(false)

  // Trigger header sweep after SectionShell body phase
  setTimeout(() => setHeaderActive(true), 160)

  const current = () => experiences.find((e) => e.id === selected())

  return (
    <SectionShell codename="OPS_LOG" label="Mission History" color="#34d399">
      <div class="max-w-6xl mx-auto py-10 px-8 flex flex-col flex-1">

        <SectionInternalHeader
          label="Mission History"
          color="#34d399"
          active={headerActive()}
          meta={`${experiences.length} DEPLOYMENTS`}
        />

        <div class="flex flex-col md:flex-row gap-4 flex-1 min-h-0">

          {/* ── Left: Mission roster ── */}
          <div class="flex-shrink-0 md:w-72 flex flex-col gap-1.5 overflow-y-auto" style={{ "scrollbar-width": "thin", "scrollbar-color": "rgba(52,211,153,0.1) transparent" }}>
            <div class="font-mono text-[9px] tracking-[0.3em] text-slate-700 uppercase mb-1 px-1">
              Roster
            </div>
            <For each={experiences}>
              {(exp, i) => {
                const active = () => selected() === exp.id
                return (
                  <button
                    onClick={() => setSelected(exp.id)}
                    class="relative text-left px-4 py-3 rounded border transition-all duration-200 overflow-hidden"
                    style={{
                      "border-color": active() ? "rgba(52,211,153,0.3)" : "rgba(255,255,255,0.05)",
                      background:     active() ? "rgba(52,211,153,0.06)" : "transparent",
                    }}
                  >
                    {/* Active left bar */}
                    <div
                      class="absolute left-0 top-2 bottom-2 w-0.5 rounded-r transition-opacity duration-200"
                      style={{
                        background: "linear-gradient(to bottom, transparent, #34d399, transparent)",
                        opacity: active() ? "1" : "0",
                      }}
                    />
                    <div class="font-mono text-[11px] tracking-[0.3em] mb-0.5"
                      style={{ color: active() ? "#34d399" : "rgba(71,85,105,0.7)" }}>
                      MISSION-{String(i() + 1).padStart(2, "0")}
                    </div>
                    <div class="font-mono text-sm leading-tight"
                      style={{ color: active() ? "rgba(226,232,240,0.9)" : "rgba(100,116,139,0.7)" }}>
                      {exp.company}
                    </div>
                    <div class="font-mono text-xs mt-0.5"
                      style={{ color: active() ? "rgba(52,211,153,0.6)" : "rgba(71,85,105,0.5)" }}>
                      {exp.duration}
                    </div>
                  </button>
                )
              }}
            </For>
          </div>

          {/* ── Right: Detail panel ── */}
          <div class="flex-1 min-w-0 overflow-y-auto" style={{ "scrollbar-width": "thin", "scrollbar-color": "rgba(52,211,153,0.15) transparent" }}>
            <Show when={current()}>
              <DetailPanel exp={current()!} />
            </Show>
          </div>

        </div>
      </div>
    </SectionShell>
  )
}

export default ExperienceSection
