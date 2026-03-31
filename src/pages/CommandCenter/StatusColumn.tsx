import { createSignal, onCleanup, onMount, type Component } from "solid-js"
import { commandState, type SectionId } from "../../store/commandStore"

// Fake vitals that subtly fluctuate to feel alive
function useFakeVitals() {
  const [cpu, setCpu] = createSignal(42)
  const [mem, setMem] = createSignal(61)
  const [net, setNet] = createSignal(28)

  onMount(() => {
    const id = setInterval(() => {
      setCpu((v) => Math.min(95, Math.max(12, v + (Math.random() - 0.5) * 8 | 0)))
      setMem((v) => Math.min(88, Math.max(40, v + (Math.random() - 0.5) * 4 | 0)))
      setNet((v) => Math.min(99, Math.max(5,  v + (Math.random() - 0.5) * 15 | 0)))
    }, 2400)
    onCleanup(() => clearInterval(id))
  })

  return { cpu, mem, net }
}

// ─── Micro bar ────────────────────────────────────────────────────────────────
const MicroBar: Component<{ label: string; value: number; color: string }> = (props) => (
  <div class="mb-3">
    <div class="flex justify-between mb-1">
      <span class="font-mono text-[9px] tracking-[0.2em] text-slate-600 uppercase">{props.label}</span>
      <span class="font-mono text-[9px] tabular-nums" style={{ color: props.color }}>
        {props.value}%
      </span>
    </div>
    <div class="h-px bg-white/5 rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-[2400ms] ease-in-out"
        style={{ width: `${props.value}%`, background: props.color, "box-shadow": `0 0 4px ${props.color}` }}
      />
    </div>
  </div>
)

// ─── Section map ─────────────────────────────────────────────────────────────
const SECTION_META: Record<SectionId, { codename: string; color: string }> = {
  hero:       { codename: "CMD_DECK",  color: "#67e8f9" },
  about:      { codename: "IDENT",     color: "#67e8f9" },
  experience: { codename: "OPS_LOG",   color: "#34d399" },
  projects:   { codename: "TACTICAL",  color: "#818cf8" },
  starmap:    { codename: "STAR_MAP",  color: "#a855f7" },
  contact:    { codename: "COMMS",     color: "#f59e0b" },
}

// ─── StatusColumn ─────────────────────────────────────────────────────────────
const StatusColumn: Component = () => {
  const { cpu, mem, net } = useFakeVitals()
  const meta = () => SECTION_META[commandState.activeSection]

  return (
    <aside class="flex-shrink-0 w-44 flex flex-col border-l border-white/5 bg-[#080808] overflow-y-auto">
      {/* Header */}
      <div class="px-3 py-3 border-b border-white/5">
        <span class="font-mono text-[9px] tracking-[0.3em] text-slate-600 uppercase">
          System
        </span>
      </div>

      <div class="flex-1 px-3 py-4 flex flex-col gap-5">
        {/* Active module */}
        <div>
          <div class="font-mono text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2">Active Module</div>
          <div
            class="font-mono text-[10px] tracking-wider font-medium transition-colors duration-300"
            style={{ color: meta().color }}
          >
            {meta().codename}
          </div>
          <div class="h-px mt-1.5 transition-all duration-300"
            style={{ background: `linear-gradient(to right, ${meta().color}60, transparent)` }}
          />
        </div>

        {/* Vitals */}
        <div>
          <div class="font-mono text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-3">Vitals</div>
          <MicroBar label="CPU" value={cpu()} color="#67e8f9" />
          <MicroBar label="MEM" value={mem()} color="#a78bfa" />
          <MicroBar label="NET" value={net()} color="#34d399" />
        </div>

        {/* Star map focus */}
        <div>
          <div class="font-mono text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2">Graph Focus</div>
          <div class="font-mono text-[10px] text-cyan-500 tracking-wider min-h-[16px] transition-all duration-300">
            {commandState.starMapFocusNode ?? "—"}
          </div>
        </div>

        {/* Connection status */}
        <div class="mt-auto">
          <div class="font-mono text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2">Connection</div>
          <div class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span class="font-mono text-[9px] tracking-wider text-emerald-500">SECURE</span>
          </div>
          <div class="font-mono text-[8px] text-slate-700 mt-1 tracking-wider">AES-256-GCM</div>
        </div>
      </div>
    </aside>
  )
}

export default StatusColumn
