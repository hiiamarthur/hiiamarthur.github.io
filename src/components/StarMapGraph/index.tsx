import {
  createSignal,
  createMemo,
  onMount,
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

// ─── Background Grid ─────────────────────────────────────────────────────────

const BackgroundGrid: Component = () => {
  const cols = Math.floor(VB_W / 60)
  const rows = Math.floor(VB_H / 60)
  return (
    <g opacity="0.06">
      <For each={Array.from({ length: cols + 1 }, (_, i) => i)}>
        {(i) => (
          <line
            x1={i * 60} y1={0} x2={i * 60} y2={VB_H}
            stroke="#67e8f9" stroke-width="0.5"
          />
        )}
      </For>
      <For each={Array.from({ length: rows + 1 }, (_, i) => i)}>
        {(i) => (
          <line
            x1={0} y1={i * 60} x2={VB_W} y2={i * 60}
            stroke="#67e8f9" stroke-width="0.5"
          />
        )}
      </For>
    </g>
  )
}

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

  onMount(() => {
    // Small delay so the graph fades in after the rest of the page settles
    requestAnimationFrame(() => setMounted(true))
  })

  const { focusedId, highlightedEdges, highlightedNodes } = useHighlight()

  // Pre-index nodes by id so edge lookup is O(1)
  const nodeMap = new Map(NODES.map((n) => [n.id, n]))

  const hasHighlight = () => focusedId() !== null

  // Local hover (direct node hover, not bento-card-driven)
  const handleNodeHover = (id: string | null) => {
    if (id) {
      setCommandState("starMapFocusNode", NODES.find((n) => n.id === id)?.label ?? null)
    } else {
      // Only clear if no bento card is holding focus
      if (!commandState.activeModule) {
        setCommandState("starMapFocusNode", null)
      }
    }
  }

  return (
    <section class="w-full max-w-7xl mx-auto px-4 pb-20">
      {/* Section header */}
      <div class="flex items-center gap-4 mb-6">
        <div class="flex items-center gap-2">
          <div class="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          <span class="font-space text-sm text-slate-400 tracking-widest">
            Knowledge Graph
          </span>
        </div>
        <div class="flex-1 h-px bg-gradient-to-r from-slate-800 to-transparent" />
        <span class="font-mono text-[10px] text-slate-600 tabular-nums">
          {NODES.length} NODES · {EDGES.length} EDGES
        </span>
      </div>

      {/* SVG graph */}
      <div
        class="relative rounded-lg border border-white/5 bg-[#080808] overflow-hidden transition-opacity duration-700"
        style={{ opacity: mounted() ? "1" : "0" }}
      >
        {/* Radial vignette overlay */}
        <div
          class="absolute inset-0 pointer-events-none z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, transparent 55%, rgba(8,8,8,0.7) 100%)",
          }}
        />

        <svg
          viewBox={`0 0 ${VB_W} ${VB_H}`}
          class="w-full"
          style={{ "max-height": "520px" }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <FilterDefs />
          <BackgroundGrid />

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

          {/* ── Nodes ── (rendered on top of edges) */}
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
        </svg>

        {/* Focus tooltip */}
        <div
          class="absolute bottom-4 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.2em] text-slate-500 transition-opacity duration-300 pointer-events-none"
          style={{ opacity: focusedId() ? "0" : "1" }}
        >
          HOVER NODE OR CARD TO FOCUS
        </div>

        {/* Active node readout */}
        <Show when={focusedId()}>
          <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 font-mono text-[10px] tracking-widest pointer-events-none">
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
