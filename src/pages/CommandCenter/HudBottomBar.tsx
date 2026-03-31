import { type Component } from "solid-js"
import { commandState, type SectionId } from "../../store/commandStore"

const BREADCRUMB: Record<SectionId, string[]> = {
  hero:       ["ROOT", "HOME"],
  about:      ["ROOT", "IDENT", "OPERATOR_PROFILE"],
  experience: ["ROOT", "OPS_LOG", "MISSION_HISTORY"],
  projects:   ["ROOT", "TACTICAL", "DEPLOYED_SYSTEMS"],
  starmap:    ["ROOT", "STAR_MAP", "KNOWLEDGE_GRAPH"],
  contact:    ["ROOT", "COMMS", "OPEN_CHANNEL"],
}

const HudBottomBar: Component = () => {
  const crumbs = () => BREADCRUMB[commandState.activeSection]

  return (
    <footer class="flex-shrink-0 h-9 flex items-center justify-between px-4 border-t border-white/5 bg-[#080808]">
      {/* Breadcrumb */}
      <div class="flex items-center gap-1.5 font-mono text-[9px] tracking-wider">
        {crumbs().map((crumb, i) => (
          <>
            {i > 0 && <span class="text-white/15 mx-0.5">/</span>}
            <span class={i === crumbs().length - 1 ? "text-cyan-600" : "text-slate-700"}>
              {crumb}
            </span>
          </>
        ))}
      </div>

      {/* Center: node focus indicator */}
      <div
        class="hidden md:flex items-center gap-2 font-mono text-[9px] tracking-widest transition-opacity duration-300"
        style={{ opacity: commandState.starMapFocusNode ? "1" : "0" }}
      >
        <span class="text-slate-600">GRAPH ←</span>
        <span class="text-cyan-500">{commandState.starMapFocusNode ?? ""}</span>
      </div>

      {/* Right: version + status */}
      <div class="flex items-center gap-3 font-mono text-[9px]">
        <span class="text-slate-700 tracking-wider hidden sm:inline">arthurlau.dev</span>
        <div class="w-px h-3 bg-white/8" />
        <div class="flex items-center gap-1.5">
          <span class="w-1 h-1 rounded-full bg-emerald-400" />
          <span class="text-slate-600 tracking-wider">NOMINAL</span>
        </div>
      </div>
    </footer>
  )
}

export default HudBottomBar
