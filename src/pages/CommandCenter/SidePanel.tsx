import { For, type Component } from "solid-js"
import { type SectionId } from "../../store/commandStore"

// ─── Section config ───────────────────────────────────────────────────────────

interface NavItem {
  id: SectionId
  codename: string
  label: string
  sublabel: string
  dot: string       // tailwind bg-* color
  accentColor: string
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero",       codename: "00",  label: "HOME",      sublabel: "Command Deck",      dot: "bg-slate-500",  accentColor: "#67e8f9" },
  { id: "about",      codename: "01",  label: "IDENT",     sublabel: "Operator Profile",  dot: "bg-cyan-400",   accentColor: "#67e8f9" },
  { id: "experience", codename: "02",  label: "OPS LOG",   sublabel: "Mission History",   dot: "bg-emerald-400",accentColor: "#34d399" },
  { id: "projects",   codename: "03",  label: "TACTICAL",  sublabel: "Deployed Systems",  dot: "bg-violet-400", accentColor: "#818cf8" },
  { id: "starmap",    codename: "04",  label: "STAR MAP",  sublabel: "Knowledge Graph",   dot: "bg-purple-400", accentColor: "#a855f7" },
  { id: "contact",    codename: "05",  label: "COMMS",     sublabel: "Open Channel",      dot: "bg-amber-400",  accentColor: "#f59e0b" },
]

// ─── Panel Button ─────────────────────────────────────────────────────────────

const PanelButton: Component<{
  item: NavItem
  active: boolean
  onClick: () => void
}> = (props) => (
  <button
    onClick={props.onClick}
    class="group relative overflow-hidden w-full text-left px-3 py-3 rounded transition-all duration-300"
    style={{
      background: props.active ? `${props.item.accentColor}0d` : "transparent",
      "border-color": props.active ? `${props.item.accentColor}40` : "rgba(255,255,255,0.04)",
      border: "1px solid",
    }}
  >
    {/* Active left accent bar */}
    <div
      class="absolute left-0 top-2 bottom-2 w-0.5 rounded-r transition-all duration-300"
      style={{
        background: props.item.accentColor,
        opacity: props.active ? "1" : "0",
        transform: props.active ? "scaleY(1)" : "scaleY(0)",
      }}
    />

    {/* Hover shimmer sweep (left → right) */}
    <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />

    {/* Hover border glow — rendered as box-shadow via inline transition */}
    <div class="relative flex items-center gap-2.5">
      {/* Code prefix */}
      <span
        class="font-mono text-[9px] tabular-nums flex-shrink-0 transition-colors duration-300"
        style={{ color: props.active ? props.item.accentColor : "rgba(100,116,139,0.7)" }}
      >
        {props.item.codename}
      </span>

      <div class="flex-1 min-w-0">
        {/* Main label */}
        <div
          class="font-mono text-[11px] font-medium tracking-[0.15em] transition-colors duration-300"
          style={{ color: props.active ? props.item.accentColor : "rgba(226,232,240,0.7)" }}
        >
          {props.item.label}
        </div>
        {/* Sublabel */}
        <div
          class="font-mono text-[9px] tracking-wider mt-0.5 transition-colors duration-300"
          style={{ color: props.active ? "rgba(148,163,184,0.9)" : "rgba(71,85,105,0.8)" }}
        >
          {props.item.sublabel}
        </div>
      </div>

      {/* Status dot */}
      <span
        class={`w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 ${props.item.dot}`}
        style={{ opacity: props.active ? "1" : "0.3" }}
      />
    </div>
  </button>
)

// ─── SidePanel ────────────────────────────────────────────────────────────────

const SidePanel: Component<{
  activeSection: SectionId
  onSelect: (id: SectionId) => void
}> = (props) => (
  <aside class="flex-shrink-0 w-48 flex flex-col border-r border-white/5 bg-[#080808] overflow-y-auto">
    {/* Header */}
    <div class="px-3 py-3 border-b border-white/5">
      <span class="font-mono text-[9px] tracking-[0.3em] text-slate-600 uppercase">
        Navigation
      </span>
    </div>

    {/* Nav items */}
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

    {/* Resume link */}
    <div class="px-2 py-3 border-t border-white/5">
      <a
        href="/files/Resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative overflow-hidden flex items-center justify-between w-full px-3 py-2.5 rounded border border-emerald-500/20 bg-emerald-500/[0.03] hover:border-emerald-500/40 hover:bg-emerald-500/8 transition-all duration-300"
      >
        <div class="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-gradient-to-r from-transparent via-emerald-400/8 to-transparent pointer-events-none" />
        <span class="font-mono text-[10px] tracking-[0.2em] text-emerald-500 group-hover:text-emerald-400 transition-colors uppercase relative">
          Resume ↗
        </span>
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </a>
    </div>
  </aside>
)

export default SidePanel
