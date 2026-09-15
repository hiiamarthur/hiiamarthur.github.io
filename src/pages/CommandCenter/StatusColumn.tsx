import { createSignal, onCleanup, onMount, For, type Component } from "solid-js"
import { commandState, type SectionId } from "../../store/commandStore"

// ─── Client info (browser + OS) ───────────────────────────────────────────────
// Detected once at module load; never changes during session.

function detectClient(): { browser: string; os: string } {
  const uaData = (navigator as any).userAgentData
  let browser = "Unknown"
  let os = "Unknown"

  const shortBrand = (brand: string) =>
    brand.replace("Google ", "").replace("Microsoft ", "")

  if (uaData?.brands) {
    os = uaData.platform ?? "Unknown"
    const real = (uaData.brands as { brand: string; version: string }[]).find(
      (b) => !b.brand.includes("Not") && b.brand !== "Chromium"
    )
    browser = real ? `${shortBrand(real.brand)} ${real.version}` : "Chromium"
  } else {
    const ua = navigator.userAgent
    if (ua.includes("Firefox/"))       browser = "Firefox "  + (ua.match(/Firefox\/([\d]+)/)?.[1]  ?? "")
    else if (ua.includes("Edg/"))      browser = "Edge "     + (ua.match(/Edg\/([\d]+)/)?.[1]      ?? "")
    else if (ua.includes("Chrome/"))   browser = "Chrome "   + (ua.match(/Chrome\/([\d]+)/)?.[1]   ?? "")
    else if (ua.includes("Safari/") && ua.includes("Version/"))
                                        browser = "Safari "  + (ua.match(/Version\/([\d]+)/)?.[1]  ?? "")

    if      (ua.includes("Windows"))                           os = "Windows"
    else if (ua.includes("Mac OS X"))                          os = "macOS"
    else if (ua.includes("Android"))                           os = "Android"
    else if (ua.includes("iPhone") || ua.includes("iPad"))     os = "iOS"
    else if (ua.includes("Linux"))                             os = "Linux"
  }

  return { browser, os }
}

const CLIENT = detectClient()

// ─── Vitals ───────────────────────────────────────────────────────────────────
// MEM: real JS heap % on Chrome/Edge; simulated elsewhere.
// NET: real downlink + effectiveType via Network Information API; simulated elsewhere.
// CPU: no usage API — shows core count + simulated load %.

function useVitals() {
  const cores = navigator.hardwareConcurrency ?? 4

  // CPU — always simulated, but seeded from core count
  const [cpu, setCpu] = createSignal(Math.min(90, cores * 8 + 10))

  // MEM — real if performance.memory exists
  const perfMem = (performance as any).memory as
    | { usedJSHeapSize: number; jsHeapSizeLimit: number }
    | undefined
  const [mem, setMem] = createSignal(
    perfMem
      ? Math.round((perfMem.usedJSHeapSize / perfMem.jsHeapSizeLimit) * 100)
      : 61
  )

  // NET — real downlink if Network Information API available
  const conn = (navigator as any).connection as
    | { effectiveType?: string; downlink?: number; addEventListener?: Function; removeEventListener?: Function }
    | undefined
  const downlinkToPercent = (mbps: number) => Math.min(99, Math.round((mbps / 50) * 100))
  const [net, setNet] = createSignal(
    conn?.downlink != null ? downlinkToPercent(conn.downlink) : 28
  )
  const [netLabel, setNetLabel] = createSignal<string>(
    conn?.effectiveType?.toUpperCase() ?? ""
  )

  onMount(() => {
    // Poll real MEM every 2400ms
    const memId = setInterval(() => {
      if (perfMem) {
        setMem(Math.round((perfMem.usedJSHeapSize / perfMem.jsHeapSizeLimit) * 100))
      } else {
        setMem((v) => Math.min(88, Math.max(40, v + (((Math.random() - 0.5) * 4) | 0))))
      }
    }, 2400)

    // Poll real NET or simulate
    const onConnChange = () => {
      if (conn?.downlink != null) setNet(downlinkToPercent(conn.downlink))
      if (conn?.effectiveType)    setNetLabel(conn.effectiveType.toUpperCase())
    }
    conn?.addEventListener?.("change", onConnChange)
    const netId = setInterval(() => {
      if (conn?.downlink == null) {
        setNet((v) => Math.min(99, Math.max(5, v + (((Math.random() - 0.5) * 15) | 0))))
      }
    }, 2400)

    // Simulate CPU load (no real API)
    const cpuId = setInterval(() => {
      setCpu((v) => Math.min(95, Math.max(12, v + (((Math.random() - 0.5) * 8) | 0))))
    }, 2400)

    onCleanup(() => {
      clearInterval(memId)
      clearInterval(netId)
      clearInterval(cpuId)
      conn?.removeEventListener?.("change", onConnChange)
    })
  })

  return { cpu, mem, net, netLabel, cores }
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
const MicroBar: Component<{ label: string; value: number; color: string; sublabel?: string }> = (props) => (
  <div class="mb-2.5">
    <div class="flex justify-between mb-1">
      <div class="flex items-baseline gap-1.5">
        <span class="font-mono text-[9px] tracking-[0.15em] text-slate-600 uppercase">{props.label}</span>
        {props.sublabel && (
          <span class="font-mono text-[7px] tracking-wider text-slate-700 uppercase">{props.sublabel}</span>
        )}
      </div>
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
  commits:    { codename: "GIT_LOG",   color: "#4ade80" },
  contact:    { codename: "COMMS",     color: "#f59e0b" },
}

// ─── StatusColumn ─────────────────────────────────────────────────────────────
const StatusColumn: Component = () => {
  const { cpu, mem, net, netLabel, cores } = useVitals()
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
          <MicroBar label="CPU" value={cpu()} color="#67e8f9" sublabel={`${cores}c`} />
          <MicroBar label="MEM" value={mem()} color="#a78bfa" sublabel={(performance as any).memory ? "heap" : "~"} />
          <MicroBar label="NET" value={net()} color="#34d399" sublabel={netLabel() || undefined} />
        </div>

        {/* Client info */}
        <div>
          <div class="font-mono text-[8px] tracking-[0.2em] text-slate-700 uppercase mb-2">Client</div>
          <div class="flex flex-col gap-1.5">
            {/* OS pill */}
            <div class="flex items-center gap-2">
              <span class="font-mono text-[7px] tracking-[0.2em] text-slate-700 uppercase w-5">OS</span>
              <span class="flex items-center gap-1 px-2 py-0.5 rounded border border-violet-500/20 bg-violet-500/[0.06]">
                <span class="w-1 h-1 rounded-full bg-violet-400/60" />
                <span class="font-mono text-[9px] text-violet-300/70 tracking-wide">{CLIENT.os}</span>
              </span>
            </div>
            {/* Browser pill */}
            <div class="flex items-center gap-2">
              <span class="font-mono text-[7px] tracking-[0.2em] text-slate-700 uppercase w-5">UA</span>
              <span class="flex items-center gap-1 px-2 py-0.5 rounded border border-cyan-500/20 bg-cyan-500/[0.06]">
                <span class="w-1 h-1 rounded-full bg-cyan-400/60" />
                <span class="font-mono text-[9px] text-cyan-300/70 tracking-wide">{CLIENT.browser}</span>
              </span>
            </div>
          </div>
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
