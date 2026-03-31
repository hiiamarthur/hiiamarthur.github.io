import { createSignal, onCleanup, onMount, For, type Component } from "solid-js"
import { commandState, type SectionId } from "../../store/commandStore"

// ─── Fake vitals ──────────────────────────────────────────────────────────────
function useFakeVitals() {
  const [cpu, setCpu] = createSignal(42)
  const [mem, setMem] = createSignal(61)
  const [net, setNet] = createSignal(28)
  onMount(() => {
    const id = setInterval(() => {
      setCpu((v) => Math.min(95, Math.max(12, v + ((Math.random() - 0.5) * 8) | 0)))
      setMem((v) => Math.min(88, Math.max(40, v + ((Math.random() - 0.5) * 4) | 0)))
      setNet((v) => Math.min(99, Math.max(5,  v + ((Math.random() - 0.5) * 15) | 0)))
    }, 2400)
    onCleanup(() => clearInterval(id))
  })
  return { cpu, mem, net }
}

// ─── Event log ────────────────────────────────────────────────────────────────
const LOG_POOL = [
  "store.init → commandStore",
  "graph.nodes → 27 indexed",
  "graph.edges → 37 mapped",
  "auth.verify → AES-256-GCM",
  "vitals.poll → 2400ms",
  "section.mount → CMD_DECK",
  "renderer → solid-js v1.9",
  "font.load → SpaceAge TTF",
  "bento.grid → 7 cards",
  "starmap.svg → rendered",
  "boot.seq → complete",
  "channel.open → COMMS",
]

function useEventLog() {
  const [log, setLog] = createSignal<string[]>(LOG_POOL.slice(0, 4))
  onMount(() => {
    let i = 4
    const id = setInterval(() => {
      setLog((prev) => [LOG_POOL[i % LOG_POOL.length], ...prev].slice(0, 5))
      i++
    }, 3200)
    onCleanup(() => clearInterval(id))
  })
  return log
}

// ─── Uptime counter ───────────────────────────────────────────────────────────
function useUptime() {
  const [secs, setSecs] = createSignal(0)
  onMount(() => {
    const start = Date.now()
    const id = setInterval(() => setSecs(Math.floor((Date.now() - start) / 1000)), 1000)
    onCleanup(() => clearInterval(id))
  })
  const fmt = () => {
    const s = secs()
    const m = Math.floor(s / 60)
    const pp = (n: number) => String(n).padStart(2, "0")
    return `${pp(m)}:${pp(s % 60)}`
  }
  return fmt
}

// ─── MicroBar ─────────────────────────────────────────────────────────────────
const MicroBar: Component<{ label: string; value: number; color: string }> = (props) => (
  <div class="mb-2.5">
    <div class="flex justify-between mb-1">
      <span class="font-mono text-[9px] tracking-[0.15em] text-slate-600 uppercase">{props.label}</span>
      <span class="font-mono text-[9px] tabular-nums" style={{ color: props.color }}>{props.value}%</span>
    </div>
    <div class="h-px bg-white/5 rounded-full overflow-hidden">
      <div
        class="h-full rounded-full transition-all duration-[2400ms] ease-in-out"
        style={{ width: `${props.value}%`, background: props.color, "box-shadow": `0 0 4px ${props.color}` }}
      />
    </div>
  </div>
)

// ─── Section meta ─────────────────────────────────────────────────────────────
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
  const log = useEventLog()
  const uptime = useUptime()
  const meta = () => SECTION_META[commandState.activeSection]

  return (
    <aside class="flex-shrink-0 w-44 flex flex-col border-l border-white/5 bg-[#080808] overflow-y-auto">

      <div class="px-3 py-2.5 border-b border-white/5">
        <span class="font-mono text-[9px] tracking-[0.3em] text-slate-600 uppercase">System</span>
      </div>

      <div class="flex-1 px-3 py-3 flex flex-col gap-4 overflow-y-auto">

        {/* Active module */}
        <div>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 uppercase mb-1.5">Module</div>
          <div class="font-mono text-[10px] tracking-wider font-medium transition-colors duration-300"
            style={{ color: meta().color }}>
            {meta().codename}
          </div>
          <div class="h-px mt-1 transition-all duration-300"
            style={{ background: `linear-gradient(to right, ${meta().color}50, transparent)` }} />
        </div>

        {/* Uptime */}
        <div>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 uppercase mb-1.5">Session</div>
          <div class="font-mono text-[11px] text-slate-400 tabular-nums tracking-widest">{uptime()}</div>
        </div>

        {/* Vitals */}
        <div>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 uppercase mb-2">Vitals</div>
          <MicroBar label="CPU" value={cpu()} color="#67e8f9" />
          <MicroBar label="MEM" value={mem()} color="#a78bfa" />
          <MicroBar label="NET" value={net()} color="#34d399" />
        </div>

        {/* Graph focus */}
        <div>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 uppercase mb-1.5">Graph Focus</div>
          <div class="font-mono text-[10px] text-cyan-500 tracking-wider min-h-[16px] transition-all duration-300">
            {commandState.starMapFocusNode ?? "—"}
          </div>
        </div>

        {/* Event log */}
        <div>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 uppercase mb-2">Event Log</div>
          <div class="flex flex-col gap-1">
            <For each={log()}>
              {(entry, i) => (
                <div
                  class="font-mono text-[8px] leading-relaxed transition-all duration-500"
                  style={{
                    color: i() === 0 ? "rgba(100,116,139,0.9)" : "rgba(71,85,105,0.5)",
                    opacity: i() === 0 ? "1" : `${1 - i() * 0.18}`,
                  }}
                >
                  <span class="text-white/15 mr-1">{i() === 0 ? "▸" : "·"}</span>
                  {entry}
                </div>
              )}
            </For>
          </div>
        </div>

        {/* Connection — pinned at bottom */}
        <div class="mt-auto pt-2 border-t border-white/5">
          <div class="flex items-center gap-1.5 mb-1">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span class="font-mono text-[9px] tracking-wider text-emerald-600">SECURE</span>
          </div>
          <div class="font-mono text-[8px] text-slate-700 tracking-wider">AES-256-GCM</div>
        </div>
      </div>
    </aside>
  )
}

export default StatusColumn
