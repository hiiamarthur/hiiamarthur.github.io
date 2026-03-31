import {
  createSignal,
  createMemo,
  For,
  Show,
  type Component,
} from "solid-js"
import { setCommandState, openExternal } from "../../store/commandStore"
import { type BentoItem, STATUS_META } from "./bentoConfig"

// ─── Radar Pulse SVG ─────────────────────────────────────────────────────────
// Three concentric rings expand outward using SMIL <animate> — works in all
// modern browsers without CSS @keyframes for SVG presentation attributes.

const RadarPulse: Component<{ color: string }> = (props) => (
  <svg
    class="absolute bottom-4 right-4 w-16 h-16 opacity-40 pointer-events-none"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Static center dot */}
    <circle cx="32" cy="32" r="2.5" fill={props.color} opacity="0.9" />
    {/* Ring 1 */}
    <circle cx="32" cy="32" r="4" stroke={props.color} stroke-width="1">
      <animate attributeName="r"       from="4"  to="28" dur="2.4s" begin="0s"    repeatCount="indefinite" />
      <animate attributeName="opacity" from="0.8" to="0"  dur="2.4s" begin="0s"    repeatCount="indefinite" />
    </circle>
    {/* Ring 2 — offset 0.8s */}
    <circle cx="32" cy="32" r="4" stroke={props.color} stroke-width="0.75">
      <animate attributeName="r"       from="4"  to="28" dur="2.4s" begin="0.8s"  repeatCount="indefinite" />
      <animate attributeName="opacity" from="0.8" to="0"  dur="2.4s" begin="0.8s"  repeatCount="indefinite" />
    </circle>
    {/* Ring 3 — offset 1.6s */}
    <circle cx="32" cy="32" r="4" stroke={props.color} stroke-width="0.5">
      <animate attributeName="r"       from="4"  to="28" dur="2.4s" begin="1.6s"  repeatCount="indefinite" />
      <animate attributeName="opacity" from="0.8" to="0"  dur="2.4s" begin="1.6s"  repeatCount="indefinite" />
    </circle>
  </svg>
)

// ─── Tech Pill ───────────────────────────────────────────────────────────────

const TechPill: Component<{ label: string; dimmed: boolean }> = (props) => (
  <span
    class="px-2 py-0.5 rounded text-[10px] font-mono tracking-wider border transition-all duration-300"
    classList={{
      "border-white/10 text-slate-500 bg-white/[0.02]": props.dimmed,
      "border-cyan-500/30 text-cyan-400/80 bg-cyan-500/5": !props.dimmed,
    }}
  >
    {props.label}
  </span>
)

// ─── External Link Icon ───────────────────────────────────────────────────────

const ExternalLinkIcon = () => (
  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
)

const GithubIcon = () => (
  <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
)

// ─── Operator Card ────────────────────────────────────────────────────────────
// Special "about me" card with availability badge and stat grid

const OperatorCard: Component<{
  item: BentoItem
  isHovered: boolean
  mouseX: number
  mouseY: number
}> = (props) => {
  const stats = [
    { label: "EXPERIENCE", value: "7+ YRS" },
    { label: "LOCATION",   value: "Toronto" },
    { label: "STATUS",     value: "AVAILABLE" },
    { label: "CLEARANCE",  value: "SENIOR" },
  ]

  return (
    <div class="h-full flex flex-col justify-between p-6">
      {/* Header */}
      <div>
        <div class="flex items-center justify-between mb-4">
          <div
            class="text-[10px] font-mono tracking-[0.2em] px-2 py-1 rounded border"
            style={{
              color: "#22d3ee",
              "border-color": "rgba(34,211,238,0.3)",
              background: "rgba(34,211,238,0.05)",
            }}
          >
            OPERATOR
          </div>
          {/* Animated availability dot */}
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span class="text-[10px] font-mono text-emerald-400 tracking-widest">AVAILABLE</span>
          </div>
        </div>

        <h2 class="text-2xl font-bold text-white tracking-tight mb-1">
          {props.item.name}
        </h2>
        <p class="text-xs font-mono text-slate-400 leading-relaxed">
          {props.item.description}
        </p>
      </div>

      {/* Stat grid */}
      <div class="grid grid-cols-2 gap-2 my-4">
        <For each={stats}>
          {(stat) => (
            <div class="rounded border border-white/5 bg-white/[0.02] px-3 py-2">
              <div class="text-[9px] font-mono tracking-[0.2em] text-slate-500 mb-0.5">
                {stat.label}
              </div>
              <div
                class="text-sm font-mono font-medium"
                style={{ color: stat.label === "STATUS" ? "#34d399" : "#e2e8f0" }}
              >
                {stat.value}
              </div>
            </div>
          )}
        </For>
      </div>

      {/* Tech stack */}
      <div class="flex flex-wrap gap-1.5">
        <For each={props.item.technologies}>
          {(tech) => <TechPill label={tech} dimmed={false} />}
        </For>
      </div>

      {/* Corner brackets */}
      <div class="absolute top-3 left-3 w-4 h-4 border-t border-l border-cyan-500/40 rounded-tl" />
      <div class="absolute top-3 right-3 w-4 h-4 border-t border-r border-cyan-500/40 rounded-tr" />
      <div class="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-cyan-500/40 rounded-bl" />
      <div class="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-cyan-500/40 rounded-br" />
    </div>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────────────

const ProjectCardContent: Component<{
  item: BentoItem
  isHovered: boolean
}> = (props) => {
  const meta = () => STATUS_META[props.item.status]

  return (
    <div class="h-full flex flex-col">
      {/* Image pane — only on featured or if image provided */}
      <Show when={props.item.image && props.item.featured}>
        <div class="relative overflow-hidden h-40 rounded-t-lg">
          <img
            src={props.item.image}
            alt={props.item.name}
            class="w-full h-full object-cover transition-transform duration-700 ease-out"
            classList={{ "scale-105": props.isHovered }}
          />
          {/* Image gradient overlay */}
          <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
        </div>
      </Show>

      <div class="flex-1 flex flex-col p-5">
        {/* Status + links row */}
        <div class="flex items-center justify-between mb-3">
          <div class="flex items-center gap-1.5">
            <span
              class="w-1.5 h-1.5 rounded-full"
              classList={{
                [meta().dot]: true,
                "animate-pulse": props.item.status === "ACTIVE" || props.item.status === "DEPLOYED",
              }}
            />
            <span
              class="text-[9px] font-mono tracking-[0.2em]"
              classList={{ [meta().color]: true }}
            >
              {meta().label}
            </span>
          </div>
          <div class="flex items-center gap-2">
            <Show when={props.item.github}>
              <button
                class="text-slate-500 hover:text-slate-200 transition-colors"
                onClick={(e) => { e.stopPropagation(); openExternal(props.item.github!, `${props.item.name} — GitHub`) }}
              >
                <GithubIcon />
              </button>
            </Show>
            <Show when={props.item.link && !props.item.link.startsWith("Coming")}>
              <button
                class="text-slate-500 hover:text-slate-200 transition-colors"
                onClick={(e) => { e.stopPropagation(); openExternal(props.item.link!, props.item.name) }}
              >
                <ExternalLinkIcon />
              </button>
            </Show>
          </div>
        </div>

        {/* Title */}
        <h3 class="text-base font-semibold text-white mb-2 leading-tight">
          {props.item.name}
        </h3>

        {/* Description */}
        <p class="text-xs text-slate-400 leading-relaxed flex-1 mb-4">
          {props.item.description}
        </p>

        {/* Tech pills */}
        <div class="flex flex-wrap gap-1.5">
          <For each={props.item.technologies}>
            {(tech) => <TechPill label={tech} dimmed={false} />}
          </For>
        </div>
      </div>

      {/* Radar pulse on featured cards */}
      <Show when={props.item.featured}>
        <RadarPulse color={props.item.accentColor} />
      </Show>
    </div>
  )
}

// ─── BentoCard ────────────────────────────────────────────────────────────────

export interface BentoCardProps {
  item: BentoItem
}

const BentoCard: Component<BentoCardProps> = (props) => {
  const [mousePos, setMousePos] = createSignal({ x: 50, y: 50 })
  const [isHovered, setIsHovered] = createSignal(false)

  // Spotlight background follows mouse cursor — the Linear.app effect
  const spotlightStyle = createMemo(() => ({
    background: isHovered()
      ? `radial-gradient(circle 280px at ${mousePos().x}% ${mousePos().y}%, ${props.item.accentColor}12, transparent 70%)`
      : "transparent",
  }))

  // Border glow intensifies on hover
  const borderStyle = createMemo(() => ({
    "border-color": isHovered()
      ? `${props.item.accentColor}40`
      : "rgba(255,255,255,0.06)",
    "box-shadow": isHovered()
      ? `0 0 0 1px ${props.item.accentColor}20, inset 0 1px 0 0 ${props.item.accentColor}10`
      : "none",
  }))

  const handleMouseMove = (e: MouseEvent) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    setCommandState("activeModule", props.item.id)
    setCommandState("starMapFocusNode", props.item.starNode)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setCommandState("activeModule", null)
    setCommandState("starMapFocusNode", null)
  }

  return (
    <div
      // col-span-12: full-width on mobile; item.colSpan (e.g. "lg:col-span-7") takes over at lg
      class={`relative rounded-lg border bg-[#0d0d0d] overflow-hidden transition-all duration-300 cursor-default col-span-12 ${props.item.colSpan}`}
      style={borderStyle()}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Spotlight layer — renders above bg, below content */}
      <div
        class="absolute inset-0 pointer-events-none transition-all duration-300 z-0"
        style={spotlightStyle()}
      />

      {/* Content layer */}
      <div class="relative z-10 h-full">
        <Show
          when={props.item.type !== "operator"}
          fallback={
            <OperatorCard
              item={props.item}
              isHovered={isHovered()}
              mouseX={mousePos().x}
              mouseY={mousePos().y}
            />
          }
        >
          <ProjectCardContent item={props.item} isHovered={isHovered()} />
        </Show>
      </div>
    </div>
  )
}

export default BentoCard
