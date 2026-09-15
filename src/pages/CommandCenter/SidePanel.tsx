import { createSignal, createMemo, For, type Component } from "solid-js"
import { openExternal, commandState, type SectionId } from "../../store/commandStore"

// ─── Section config ───────────────────────────────────────────────────────────

interface NavItem {
  id: SectionId
  codename: string
  label: string
  sublabel: string
  accentColor: string
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero",       codename: "00",  label: "HOME",      sublabel: "Command Deck",      accentColor: "#67e8f9" },
  { id: "about",      codename: "01",  label: "IDENT",     sublabel: "Operator Profile",  accentColor: "#67e8f9" },
  { id: "experience", codename: "02",  label: "OPS LOG",   sublabel: "Mission History",   accentColor: "#34d399" },
  { id: "projects",   codename: "03",  label: "TACTICAL",  sublabel: "Deployed Systems",  accentColor: "#818cf8" },
  { id: "starmap",    codename: "04",  label: "STAR MAP",  sublabel: "Knowledge Graph",   accentColor: "#a855f7" },
  { id: "commits",    codename: "05",  label: "GIT LOG",   sublabel: "Commit Feed",       accentColor: "#4ade80" },
  { id: "contact",    codename: "06",  label: "COMMS",     sublabel: "Open Channel",      accentColor: "#f59e0b" },
]

// ─── Corner bracket helper ────────────────────────────────────────────────────
// Four absolute-positioned divs that grow from 0→8px on hover/active.
// This is the signature sci-fi targeting-reticle effect.

const CornerBrackets: Component<{ color: string; lit: boolean }> = (props) => {
  const size = () => props.lit ? "8px" : "0px"
  const opacity = () => props.lit ? "0.85" : "0"

  const base = "absolute pointer-events-none transition-all duration-200"
  const borderStyle = () => `1px solid ${props.color}`

  return (
    <>
      {/* Top-left */}
      <div class={`${base} top-1 left-1`}
        style={{ width: size(), height: size(), "border-top": borderStyle(), "border-left": borderStyle(), opacity: opacity() }} />
      {/* Top-right */}
      <div class={`${base} top-1 right-1`}
        style={{ width: size(), height: size(), "border-top": borderStyle(), "border-right": borderStyle(), opacity: opacity() }} />
      {/* Bottom-left */}
      <div class={`${base} bottom-1 left-1`}
        style={{ width: size(), height: size(), "border-bottom": borderStyle(), "border-left": borderStyle(), opacity: opacity() }} />
      {/* Bottom-right */}
      <div class={`${base} bottom-1 right-1`}
        style={{ width: size(), height: size(), "border-bottom": borderStyle(), "border-right": borderStyle(), opacity: opacity() }} />
    </>
  )
}

// ─── Panel Button ─────────────────────────────────────────────────────────────

const PanelButton: Component<{
  item: NavItem
  active: boolean
  onClick: () => void
}> = (props) => {
  const [hovered, setHovered] = createSignal(false)

  // Both hovered AND active states "light up" the button
  const lit = createMemo(() => hovered() || props.active)

  const buttonStyle = createMemo(() => ({
    background: lit() ? `${props.item.accentColor}0d` : "transparent",
    "border-color": lit() ? `${props.item.accentColor}45` : "rgba(255,255,255,0.04)",
    border: "1px solid",
    // Outer glow only on hover (not active, too noisy when all buttons glow)
    "box-shadow": hovered()
      ? `0 0 0 1px ${props.item.accentColor}18, inset 0 1px 0 ${props.item.accentColor}18, 0 2px 12px ${props.item.accentColor}10`
      : "none",
    transition: "all 0.2s ease",
  }))

  return (
    <button
      class="relative overflow-hidden w-full text-left px-3 py-3 rounded"
      style={buttonStyle()}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={props.onClick}
    >
      {/* ── Corner bracket targeting reticle ── */}
      <CornerBrackets color={props.item.accentColor} lit={lit()} />

      {/* ── Top glow beam (horizontal line across top edge) ── */}
      <div
        class="absolute top-0 left-4 right-4 h-px pointer-events-none transition-opacity duration-200"
        style={{
          background: `linear-gradient(to right, transparent, ${props.item.accentColor}70, transparent)`,
          opacity: lit() ? "1" : "0",
        }}
      />

      {/* ── Active left accent bar ── */}
      <div
        class="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-r pointer-events-none transition-all duration-250"
        style={{
          background: `linear-gradient(to bottom, transparent, ${props.item.accentColor}, transparent)`,
          opacity: props.active ? "1" : "0",
          transform: props.active ? "scaleY(1)" : "scaleY(0.2)",
        }}
      />

      {/* ── Shimmer sweep (uses accent color, not generic white) ── */}
      <div
        class="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${props.item.accentColor}0a, transparent)`,
          transform: hovered() ? "translateX(100%)" : "translateX(-100%)",
          transition: hovered() ? "transform 0.55s ease-out" : "none",
        }}
      />

      {/* ── Content ── */}
      <div class="relative flex items-center gap-2.5">

        {/* Codename — glows on hover */}
        <span
          class="font-mono text-[9px] tabular-nums flex-shrink-0 transition-all duration-200"
          style={{
            color: lit() ? props.item.accentColor : "rgba(100,116,139,0.6)",
            "text-shadow": hovered() ? `0 0 8px ${props.item.accentColor}` : "none",
          }}
        >
          {props.item.codename}
        </span>

        <div class="flex-1 min-w-0">
          {/* Main label */}
          <div
            class="font-mono text-[11px] font-medium tracking-[0.15em] transition-colors duration-200"
            style={{ color: lit() ? props.item.accentColor : "rgba(226,232,240,0.65)" }}
          >
            {props.item.label}
          </div>

          {/* Sublabel */}
          <div
            class="font-mono text-[9px] tracking-wider mt-0.5 transition-colors duration-200"
            style={{ color: lit() ? "rgba(148,163,184,0.85)" : "rgba(71,85,105,0.7)" }}
          >
            {props.item.sublabel}
          </div>

          {/* Secondary data readout — slides down on hover only */}
          <div
            class="font-mono text-[8px] tracking-[0.2em] overflow-hidden transition-all duration-250"
            style={{
              color: `${props.item.accentColor}70`,
              "max-height": hovered() ? "14px" : "0px",
              opacity: hovered() ? "1" : "0",
              "margin-top": hovered() ? "3px" : "0px",
            }}
          >
            SYS:ONLINE · MOD_{props.item.codename}
          </div>
        </div>

        {/* Status dot — gains glow on hover/active */}
        <span
          class="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-250"
          style={{
            background: props.item.accentColor,
            opacity: lit() ? "1" : "0.25",
            "box-shadow": lit() ? `0 0 5px ${props.item.accentColor}, 0 0 10px ${props.item.accentColor}60` : "none",
          }}
        />
      </div>
    </button>
  )
}

// ─── Sidebar header ───────────────────────────────────────────────────────────
// Shows the active section's accent color as a subtle top bar + SpaceAge label.

const SidebarHeader: Component = () => {
  // Derive accent of the currently active section
  const activeAccent = createMemo(() =>
    NAV_ITEMS.find((n) => n.id === commandState.activeSection)?.accentColor ?? "#67e8f9"
  )

  return (
    <div class="relative px-3 py-3 border-b border-white/10 overflow-hidden">
      {/* Top colour bar — tracks active section */}
      <div
        class="absolute top-0 left-0 right-0 h-px transition-all duration-500"
        style={{ background: `linear-gradient(to right, transparent, ${activeAccent()}60, transparent)` }}
      />

      <div class="flex items-center justify-between">
        <div>
          <span class="font-space text-xs text-slate-400 tracking-widest">NAV</span>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 mt-0.5 uppercase">
            {NAV_ITEMS.length} Modules
          </div>
        </div>
        {/* Live indicator */}
        <div class="flex items-center gap-1">
          <span class="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
          <span class="font-mono text-[8px] text-slate-700 tracking-wider">LIVE</span>
        </div>
      </div>
    </div>
  )
}

// ─── SidePanel ────────────────────────────────────────────────────────────────

const SidePanel: Component<{
  activeSection: SectionId
  onSelect: (id: SectionId) => void
}> = (props) => (
  <aside class="flex-shrink-0 w-48 flex flex-col border-r border-cyan-500/10 overflow-y-auto" style={{ background: "#04080f", "box-shadow": "2px 0 32px rgba(0,0,0,0.8), inset -1px 0 0 rgba(103,232,249,0.05)" }}>
    <SidebarHeader />

    <nav class="flex-1 px-2 py-2 flex flex-col gap-1">
      <For each={NAV_ITEMS}>
        {(item) => (
          <PanelButton
            item={item}
            active={props.activeSection === item.id}
            onClick={() => props.onSelect(item.id)}
          />
        )}
      </For>
    </nav>

    {/* Resume — treated as a special launch button */}
    <div class="px-2 py-3 border-t border-white/10">
      <ResumeButton />
    </div>
  </aside>
)

// ─── Resume launch button ─────────────────────────────────────────────────────

const ResumeButton: Component = () => {
  const [hovered, setHovered] = createSignal(false)
  const color = "#34d399"

  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => openExternal("https://docs.google.com/document/d/1p5RblZ3LCDfyuCzzxZpOag-XjcErW4d8xsK0Kw5rEDU/", "RESUME")}
      class="relative overflow-hidden flex items-center justify-between w-full px-3 py-2.5 rounded transition-all duration-200"
      style={{
        border: `1px solid ${hovered() ? color + "50" : color + "25"}`,
        background: hovered() ? `${color}0d` : `${color}05`,
        "box-shadow": hovered() ? `0 0 0 1px ${color}15, inset 0 1px 0 ${color}15` : "none",
      }}
    >
      <CornerBrackets color={color} lit={hovered()} />

      {/* Top beam */}
      <div
        class="absolute top-0 left-4 right-4 h-px pointer-events-none transition-opacity duration-200"
        style={{
          background: `linear-gradient(to right, transparent, ${color}60, transparent)`,
          opacity: hovered() ? "1" : "0",
        }}
      />

      {/* Shimmer */}
      <div
        class="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(to right, transparent, ${color}0a, transparent)`,
          transform: hovered() ? "translateX(100%)" : "translateX(-100%)",
          transition: hovered() ? "transform 0.5s ease-out" : "none",
        }}
      />

      <span
        class="font-mono text-[10px] tracking-[0.2em] uppercase relative transition-colors duration-200"
        style={{ color: hovered() ? color : `${color}90` }}
      >
        Resume ↗
      </span>
      <span
        class="w-1.5 h-1.5 rounded-full relative transition-all duration-200"
        style={{
          background: color,
          "box-shadow": hovered() ? `0 0 6px ${color}` : "none",
          opacity: hovered() ? "1" : "0.5",
          animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        }}
      />
    </button>
  )
}

export default SidePanel
