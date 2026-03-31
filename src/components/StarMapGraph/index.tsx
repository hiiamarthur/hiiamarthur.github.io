import {
  createSignal,
  createMemo,
  onMount,
  onCleanup,
  For,
  Show,
  type Component,
} from "solid-js"
import { commandState, setCommandState } from "../../store/commandStore"
import {
  NODES,
  EDGES,
  CATEGORY_COLOR,
  STAR_NODE_LOOKUP,
  type GraphNode,
  type GraphEdge,
} from "./graphData"

// ─── Constants ────────────────────────────────────────────────────────────────

const VB_W = 900
const VB_H = 540
// Padding so labels at the edges don't clip
const LABEL_OFFSET_Y = 16

// ─── Derived highlight sets ───────────────────────────────────────────────────
// Two memos that derive the complete highlight state from a single reactive
// source (commandState.starMapFocusNode). Everything downstream re-reads these
// — zero cascading re-renders.

function useHighlight() {
  // Resolve the raw string (e.g. "Python") → graph node id (e.g. "python")
  const focusedId = createMemo<string | null>(() => {
    const raw = commandState.starMapFocusNode
    if (!raw) return null
    // Check direct lookup first, then try lowercase match
    return STAR_NODE_LOOKUP[raw] ?? NODES.find((n) => n.id === raw.toLowerCase())?.id ?? null
  })

  // All edges that touch the focused node
  const highlightedEdges = createMemo<Set<string>>(() => {
    const fid = focusedId()
    if (!fid) return new Set()
    return new Set(
      EDGES.filter((e) => e.source === fid || e.target === fid).map((e) => e.id)
    )
  })

  // Focused node + all its direct neighbours
  const highlightedNodes = createMemo<Set<string>>(() => {
    const fid = focusedId()
    if (!fid) return new Set()
    const neighbours = new Set<string>([fid])
    EDGES.forEach((e) => {
      if (e.source === fid) neighbours.add(e.target)
      if (e.target === fid) neighbours.add(e.source)
    })
    return neighbours
  })

  return { focusedId, highlightedEdges, highlightedNodes }
}

// ─── SVG Filter Defs ─────────────────────────────────────────────────────────

const FilterDefs: Component = () => (
  <defs>
    {/* Soft glow for resting nodes and edges */}
    <filter id="glow-sm" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2.5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    {/* Strong glow for highlighted elements */}
    <filter id="glow-lg" x="-80%" y="-80%" width="260%" height="260%">
      <feGaussianBlur stdDeviation="5" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
    {/* Hub glow — extra bright for the Arthur center node */}
    <filter id="glow-hub" x="-100%" y="-100%" width="300%" height="300%">
      <feGaussianBlur stdDeviation="7" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>
)

// ─── Stellar Background ───────────────────────────────────────────────────────
// Pre-computed star field + nebula patches. Generated once at module load with
// a fixed seed so the layout is deterministic across renders.

function lcg(seed: number) {
  let s = seed >>> 0
  return () => { s = (Math.imul(1664525, s) + 1013904223) >>> 0; return s / 0xffffffff }
}

const rand = lcg(0xdeadbeef)

// 120 tiny background stars
const TINY_STARS = Array.from({ length: 120 }, () => ({
  x: rand() * VB_W, y: rand() * VB_H,
  r: rand() * 0.7 + 0.2,
  o: rand() * 0.4 + 0.1,
}))

// 30 slightly brighter mid stars
const MID_STARS = Array.from({ length: 30 }, () => ({
  x: rand() * VB_W, y: rand() * VB_H,
  r: rand() * 1.2 + 0.6,
  o: rand() * 0.35 + 0.15,
}))

// 8 bright feature stars with a cross-flare
const BRIGHT_STARS = Array.from({ length: 8 }, () => ({
  x: rand() * VB_W, y: rand() * VB_H,
  o: rand() * 0.3 + 0.25,
}))

// 4 nebula cloud centres
const NEBULAE = [
  { cx: 180, cy: 120, rx: 160, ry: 100, color: "#818cf8", o: 0.04 },
  { cx: 720, cy: 400, rx: 180, ry: 110, color: "#a855f7", o: 0.035 },
  { cx: 500, cy: 260, rx: 200, ry: 120, color: "#67e8f9", o: 0.025 },
  { cx: 80,  cy: 420, rx: 120, ry:  80, color: "#34d399", o: 0.03  },
]

const StellarBackground: Component = () => (
  <g>
    {/* Nebula patches */}
    {NEBULAE.map((n) => (
      <ellipse cx={n.cx} cy={n.cy} rx={n.rx} ry={n.ry}
        fill={n.color} opacity={n.o}
        style={{ filter: "blur(32px)" }}
      />
    ))}

    {/* Tiny background stars */}
    {TINY_STARS.map((s) => (
      <circle cx={s.x} cy={s.y} r={s.r} fill="#e2e8f0" opacity={s.o} />
    ))}

    {/* Mid-brightness stars */}
    {MID_STARS.map((s) => (
      <circle cx={s.x} cy={s.y} r={s.r} fill="#a5f3fc" opacity={s.o} />
    ))}

    {/* Bright stars with 4-point cross flare */}
    {BRIGHT_STARS.map((s) => (
      <g opacity={s.o}>
        <circle cx={s.x} cy={s.y} r={1.6} fill="white" />
        {/* horizontal flare */}
        <line x1={s.x - 6} y1={s.y} x2={s.x + 6} y2={s.y}
          stroke="white" stroke-width="0.4" opacity="0.5" />
        {/* vertical flare */}
        <line x1={s.x} y1={s.y - 6} x2={s.x} y2={s.y + 6}
          stroke="white" stroke-width="0.4" opacity="0.5" />
        {/* soft glow */}
        <circle cx={s.x} cy={s.y} r={4} fill="white" opacity="0.06" />
      </g>
    ))}

    {/* Subtle grid overlay — much dimmer than before */}
    <g opacity="0.025">
      {Array.from({ length: Math.floor(VB_W / 60) + 1 }, (_, i) => (
        <line x1={i * 60} y1={0} x2={i * 60} y2={VB_H} stroke="#67e8f9" stroke-width="0.5" />
      ))}
      {Array.from({ length: Math.floor(VB_H / 60) + 1 }, (_, i) => (
        <line x1={0} y1={i * 60} x2={VB_W} y2={i * 60} stroke="#67e8f9" stroke-width="0.5" />
      ))}
    </g>
  </g>
)

// ─── Edge Component ───────────────────────────────────────────────────────────

const EdgeLine: Component<{
  edge: GraphEdge
  sourceNode: GraphNode
  targetNode: GraphNode
  highlighted: boolean
  dimmed: boolean
}> = (props) => {
  const color = () => CATEGORY_COLOR[props.sourceNode.category]

  const strokeWidth = () => {
    const base = props.edge.weight * 0.6
    return props.highlighted ? base * 2.5 : base
  }

  const opacity = () => {
    if (props.highlighted) return 0.85
    if (props.dimmed) return 0.04
    return 0.18
  }

  // Path id used by animateMotion
  const pathId = `path-${props.edge.id}`

  return (
    <>
      <path
        id={pathId}
        d={`M ${props.sourceNode.x} ${props.sourceNode.y} L ${props.targetNode.x} ${props.targetNode.y}`}
        stroke={color()}
        stroke-width={strokeWidth()}
        opacity={opacity()}
        fill="none"
        filter={props.highlighted ? "url(#glow-sm)" : undefined}
        style={{ transition: "opacity 0.35s ease, stroke-width 0.25s ease" }}
      />

      {/* Traveling pulse dot — only rendered on highlighted edges, pure SMIL */}
      <Show when={props.highlighted}>
        <circle r="2.5" fill={color()} opacity="0.9" filter="url(#glow-sm)">
          <animateMotion dur="1.8s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
        {/* Return pulse, offset by 0.9s */}
        <circle r="1.5" fill={color()} opacity="0.5" filter="url(#glow-sm)">
          <animateMotion dur="1.8s" begin="0.9s" repeatCount="indefinite">
            <mpath href={`#${pathId}`} />
          </animateMotion>
        </circle>
      </Show>
    </>
  )
}

// ─── Node Component ───────────────────────────────────────────────────────────

const NodeCircle: Component<{
  node: GraphNode
  highlighted: boolean
  focused: boolean
  dimmed: boolean
  onHover: (id: string | null) => void
}> = (props) => {
  const color = () => CATEGORY_COLOR[props.node.category]

  const radius = () => {
    if (props.focused) return props.node.r * 2.0
    if (props.highlighted) return props.node.r * 1.5
    if (props.dimmed) return props.node.r * 0.75
    return props.node.r
  }

  const opacity = () => {
    if (props.dimmed) return 0.2
    return 1
  }

  const filter = () => {
    if (props.node.category === "hub") return "url(#glow-hub)"
    if (props.focused || props.highlighted) return "url(#glow-lg)"
    return "url(#glow-sm)"
  }

  const labelOpacity = () => {
    if (props.dimmed) return 0.15
    if (props.highlighted || props.focused) return 1
    return 0.55
  }

  const labelSize = () => {
    if (props.focused) return 11
    if (props.highlighted) return 10
    return 9
  }

  return (
    <g
      transform={`translate(${props.node.x}, ${props.node.y})`}
      style={{
        cursor: "pointer",
        transition: "opacity 0.3s ease",
        opacity: opacity(),
      }}
      onMouseEnter={() => props.onHover(props.node.id)}
      onMouseLeave={() => props.onHover(null)}
      onClick={() => {
        // Toggle: click again to deselect
        const current = commandState.starMapFocusNode
        const thisLabel = props.node.label
        setCommandState("starMapFocusNode", current === thisLabel ? null : thisLabel)
      }}
    >
      {/* Outer ring — only on highlighted/focused */}
      <Show when={props.highlighted || props.focused}>
        <circle
          r={radius() + 5}
          fill="none"
          stroke={color()}
          stroke-width="0.75"
          opacity="0.3"
          stroke-dasharray="3 4"
          style={{ transition: "r 0.3s ease" }}
        />
      </Show>

      {/* Main node circle */}
      <circle
        r={radius()}
        fill={color()}
        fill-opacity={props.focused ? 0.35 : 0.15}
        stroke={color()}
        stroke-width={props.focused ? 1.5 : 1}
        filter={filter()}
        style={{ transition: "r 0.25s ease, fill-opacity 0.25s ease" }}
      />

      {/* Label */}
      <text
        y={radius() + LABEL_OFFSET_Y}
        text-anchor="middle"
        fill={color()}
        font-size={labelSize()}
        font-family="ui-monospace, 'Cascadia Code', 'Fira Code', monospace"
        font-weight={props.focused ? "600" : "400"}
        letter-spacing="0.08em"
        opacity={labelOpacity()}
        style={{ transition: "opacity 0.3s ease, font-size 0.25s ease" }}
        pointer-events="none"
      >
        {props.node.label}
      </text>
    </g>
  )
}

// ─── Legend ───────────────────────────────────────────────────────────────────

const Legend: Component = () => {
  const entries: [string, string][] = [
    ["language", "Language"],
    ["frontend", "Frontend"],
    ["backend",  "Backend"],
    ["database", "Database"],
    ["infra",    "Infra"],
    ["ai",       "AI / ML"],
  ]
  return (
    <div class="flex flex-wrap gap-x-4 gap-y-1.5 mt-3">
      <For each={entries}>
        {([cat, label]) => (
          <div class="flex items-center gap-1.5">
            <span
              class="w-2 h-2 rounded-full"
              style={{ background: CATEGORY_COLOR[cat as keyof typeof CATEGORY_COLOR] }}
            />
            <span class="font-mono text-[9px] tracking-widest text-slate-500 uppercase">
              {label}
            </span>
          </div>
        )}
      </For>
    </div>
  )
}

// ─── StarMapGraph ─────────────────────────────────────────────────────────────

const StarMapGraph: Component = () => {
  const [mounted, setMounted] = createSignal(false)
  const [panX,    setPanX]    = createSignal(0)
  const [panY,    setPanY]    = createSignal(0)
  const [zoom,    setZoom]    = createSignal(1)
  const [dragging, setDragging] = createSignal(false)

  let svgRef!: SVGSVGElement
  let lastMouse = { x: 0, y: 0 }
  let lastTouchDist = 0
  let lastTouchMid  = { x: 0, y: 0 }

  onMount(() => {
    requestAnimationFrame(() => setMounted(true))

    // Must be non-passive to call preventDefault on wheel
    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const factor = e.deltaY < 0 ? 1.12 : 0.9
      const newZoom = Math.min(5, Math.max(0.25, zoom() * factor))
      // Zoom toward cursor in SVG coords
      const pt = svgRef.createSVGPoint()
      pt.x = e.clientX; pt.y = e.clientY
      const svgPt = pt.matrixTransform(svgRef.getScreenCTM()!.inverse())
      const zr = newZoom / zoom()
      setPanX(svgPt.x * (1 - zr) + panX() * zr)
      setPanY(svgPt.y * (1 - zr) + panY() * zr)
      setZoom(newZoom)
    }
    svgRef.addEventListener("wheel", onWheel, { passive: false })
    onCleanup(() => svgRef.removeEventListener("wheel", onWheel))
  })

  const handleMouseDown = (e: MouseEvent) => {
    setDragging(true)
    lastMouse = { x: e.clientX, y: e.clientY }
  }
  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging()) return
    const rect = svgRef.getBoundingClientRect()
    const sx = VB_W / rect.width
    const sy = VB_H / rect.height
    setPanX(p => p + (e.clientX - lastMouse.x) * sx)
    setPanY(p => p + (e.clientY - lastMouse.y) * sy)
    lastMouse = { x: e.clientX, y: e.clientY }
  }
  const stopDrag = () => setDragging(false)

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length === 1) {
      setDragging(true)
      lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.touches.length === 2) {
      setDragging(false)
      lastTouchDist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY,
      )
      lastTouchMid = {
        x: (e.touches[0].clientX + e.touches[1].clientX) / 2,
        y: (e.touches[0].clientY + e.touches[1].clientY) / 2,
      }
    }
  }
  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault()
    if (e.touches.length === 1 && dragging()) {
      const rect = svgRef.getBoundingClientRect()
      const sx = VB_W / rect.width
      const sy = VB_H / rect.height
      setPanX(p => p + (e.touches[0].clientX - lastMouse.x) * sx)
      setPanY(p => p + (e.touches[0].clientY - lastMouse.y) * sy)
      lastMouse = { x: e.touches[0].clientX, y: e.touches[0].clientY }
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[1].clientX - e.touches[0].clientX,
        e.touches[1].clientY - e.touches[0].clientY,
      )
      const newZoom = Math.min(5, Math.max(0.25, zoom() * (dist / lastTouchDist)))
      const pt = svgRef.createSVGPoint()
      pt.x = lastTouchMid.x; pt.y = lastTouchMid.y
      const svgPt = pt.matrixTransform(svgRef.getScreenCTM()!.inverse())
      const zr = newZoom / zoom()
      setPanX(svgPt.x * (1 - zr) + panX() * zr)
      setPanY(svgPt.y * (1 - zr) + panY() * zr)
      setZoom(newZoom)
      lastTouchDist = dist
    }
  }

  const resetView = () => { setPanX(0); setPanY(0); setZoom(1) }

  const transform = createMemo(() =>
    `translate(${panX()}, ${panY()}) scale(${zoom()})`
  )

  const { focusedId, highlightedEdges, highlightedNodes } = useHighlight()
  const nodeMap = new Map(NODES.map((n) => [n.id, n]))
  const hasHighlight = () => focusedId() !== null

  const handleNodeHover = (id: string | null) => {
    if (dragging()) return
    if (id) {
      setCommandState("starMapFocusNode", NODES.find((n) => n.id === id)?.label ?? null)
    } else {
      if (!commandState.activeModule) setCommandState("starMapFocusNode", null)
    }
  }

  return (
    <section class="w-full max-w-7xl mx-auto px-4">
      <div
        class="relative rounded-lg border border-white/5 bg-[#080808] overflow-hidden transition-opacity duration-700"
        style={{ opacity: mounted() ? "1" : "0" }}
      >
        <svg
          ref={svgRef!}
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          class="w-full"
          style={{
            cursor: dragging() ? "grabbing" : "grab",
            "touch-action": "none",
          }}
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={stopDrag}
        >
          <FilterDefs />

          {/* All content inside the pan/zoom group */}
          <g transform={transform()}>
            <StellarBackground />

            {/* ── Edges ── */}
            <g>
              <For each={EDGES}>
                {(edge) => {
                  const src = nodeMap.get(edge.source)
                  const tgt = nodeMap.get(edge.target)
                  if (!src || !tgt) return null
                  return (
                    <EdgeLine
                      edge={edge}
                      sourceNode={src}
                      targetNode={tgt}
                      highlighted={highlightedEdges().has(edge.id)}
                      dimmed={hasHighlight() && !highlightedEdges().has(edge.id)}
                    />
                  )
                }}
              </For>
            </g>

            {/* ── Nodes ── */}
            <g>
              <For each={NODES}>
                {(node) => (
                  <NodeCircle
                    node={node}
                    focused={focusedId() === node.id}
                    highlighted={highlightedNodes().has(node.id)}
                    dimmed={hasHighlight() && !highlightedNodes().has(node.id)}
                    onHover={handleNodeHover}
                  />
                )}
              </For>
            </g>
          </g>
        </svg>

        {/* Controls: reset + hint */}
        <div class="absolute top-3 right-3 flex items-center gap-2">
          <Show when={zoom() !== 1 || panX() !== 0 || panY() !== 0}>
            <button
              onClick={resetView}
              class="font-mono text-[9px] tracking-widest text-slate-500 border border-white/10 rounded px-2 py-1 hover:text-slate-300 hover:border-white/20 transition-colors bg-[#080808]/80"
            >
              RESET
            </button>
          </Show>
          <span class="font-mono text-[9px] tracking-widest text-slate-700 hidden sm:inline">
            DRAG · SCROLL TO ZOOM
          </span>
        </div>

        {/* Focus tooltip */}
        <div
          class="absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-slate-600 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: focusedId() ? "0" : "1" }}
        >
          HOVER NODE TO FOCUS
        </div>

        {/* Active node readout */}
        <Show when={focusedId()}>
          <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] tracking-widest pointer-events-none">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span class="text-slate-500">FOCUSING</span>
            <span class="text-cyan-400">{commandState.starMapFocusNode}</span>
            <span class="text-slate-600">
              · {highlightedNodes().size - 1} CONNECTION{highlightedNodes().size - 1 !== 1 ? "S" : ""}
            </span>
          </div>
        </Show>
      </div>

      <Legend />
    </section>
  )
}

export default StarMapGraph
