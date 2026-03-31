import { createSignal, createMemo, onMount, onCleanup, type Component } from "solid-js"
import { setCommandState } from "../../store/commandStore"

interface Props {
  url: string
  label: string
}

// Derive a friendly display URL (strips protocol, caps length)
function displayUrl(url: string): string {
  if (url.startsWith("mailto:")) return url.replace("mailto:", "")
  if (url.startsWith("/"))       return url
  try {
    const u = new URL(url)
    return `${u.hostname}${u.pathname !== "/" ? u.pathname : ""}`
  } catch {
    return url
  }
}

// Terminal command string shown in the overlay
function buildCommand(url: string, label: string): string {
  if (url.startsWith("mailto:"))          return `sendmail ${url.replace("mailto:", "")}`
  if (url.endsWith(".pdf") || url.startsWith("/")) return `download ${url.split("/").pop()}`
  return `open ${displayUrl(url)}`
}

const PROGRESS_STEP  = 5    // % per tick
const PROGRESS_TICK  = 30   // ms — 100/5 * 30 = 600ms fill
const TYPE_SPEED     = 14   // ms per char

const RedirectOverlay: Component<Props> = (props) => {
  const command   = buildCommand(props.url, props.label)
  const shortUrl  = displayUrl(props.url)

  const [typed,    setTyped]    = createSignal(0)
  const [progress, setProgress] = createSignal(0)
  const [phase,    setPhase]    = createSignal<"typing" | "loading" | "fading">("typing")

  const displayed = createMemo(() => command.slice(0, typed()))

  const cancel = () => {
    setCommandState("pendingRedirect", null)
  }

  onMount(() => {
    let typeId: ReturnType<typeof setInterval>
    let progressId: ReturnType<typeof setInterval>

    // Phase 1: type the command
    let i = 0
    typeId = setInterval(() => {
      i++
      setTyped(i)
      if (i >= command.length) {
        clearInterval(typeId)
        // Phase 2: fill progress bar then redirect
        setTimeout(() => {
          setPhase("loading")
          progressId = setInterval(() => {
            setProgress((p) => {
              const next = p + PROGRESS_STEP
              if (next >= 100) {
                clearInterval(progressId)
                // Phase 3: open URL, fade out, clear state
                setPhase("fading")
                if (props.url.startsWith("mailto:") || props.url.startsWith("tel:")) {
                  window.location.href = props.url
                } else {
                  window.open(props.url, "_blank", "noopener,noreferrer")
                }
                setTimeout(() => setCommandState("pendingRedirect", null), 350)
                return 100
              }
              return next
            })
          }, PROGRESS_TICK)
        }, 120)
      }
    }, TYPE_SPEED)

    onCleanup(() => {
      clearInterval(typeId)
      clearInterval(progressId)
    })
  })

  const barWidth = () => `${progress()}%`

  return (
    // Backdrop
    <div
      class="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-350"
      style={{
        background: "rgba(0,0,0,0.75)",
        "backdrop-filter": "blur(4px)",
        opacity: phase() === "fading" ? "0" : "1",
      }}
      onClick={cancel}
    >
      {/* Card — stop click propagation so clicking the card doesn't cancel */}
      <div
        class="relative w-full max-w-md mx-4 border border-white/10 bg-[#0a0a0a] rounded-lg overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent line */}
        <div class="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

        <div class="px-6 py-6">
          {/* Header */}
          <div class="flex items-center gap-2 mb-5">
            <div class="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            <span class="font-mono text-[9px] tracking-[0.3em] text-amber-500 uppercase">
              Establishing External Channel
            </span>
          </div>

          {/* Destination */}
          <div class="mb-4">
            <span class="font-mono text-[9px] text-slate-600 tracking-wider uppercase">Destination</span>
            <div class="font-mono text-sm text-slate-300 mt-1 tracking-wide truncate">
              {props.label} — {shortUrl}
            </div>
          </div>

          {/* Terminal command line */}
          <div class="flex items-center gap-2 px-4 py-2.5 rounded bg-[#080808] border border-white/5 mb-4 min-h-[40px]">
            <span class="font-mono text-xs text-cyan-500 shrink-0">$</span>
            <span class="font-mono text-sm text-slate-200 tracking-wide flex-1 break-all">{displayed()}</span>
            {phase() === "typing" && (
              <span class="inline-block w-[2px] h-[14px] bg-cyan-400 animate-blink shrink-0" />
            )}
          </div>

          {/* Progress bar */}
          <div class="mb-2">
            <div class="flex justify-between mb-1.5">
              <span class="font-mono text-[9px] text-slate-600 tracking-widest uppercase">
                {phase() === "typing" ? "Preparing..." : phase() === "loading" ? "Redirecting..." : "Done"}
              </span>
              <span class="font-mono text-[9px] text-cyan-600 tabular-nums">{progress()}%</span>
            </div>
            <div class="h-px bg-white/5 rounded-full overflow-hidden">
              <div
                class="h-full rounded-full transition-all ease-linear"
                style={{
                  width: barWidth(),
                  background: "linear-gradient(to right, #0891b2, #67e8f9)",
                  "box-shadow": "0 0 6px rgba(103,232,249,0.4)",
                  "transition-duration": `${PROGRESS_TICK}ms`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div class="px-6 py-3 border-t border-white/5 flex justify-between items-center">
          <button
            onClick={cancel}
            class="font-mono text-[9px] tracking-[0.2em] text-slate-600 hover:text-slate-400 transition-colors uppercase"
          >
            [ESC] Cancel
          </button>
          <span class="font-mono text-[8px] text-slate-700 tracking-wider">
            opens in new tab
          </span>
        </div>

        {/* Bottom accent line */}
        <div
          class="h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent transition-all ease-linear"
          style={{ width: barWidth(), "transition-duration": `${PROGRESS_TICK}ms` }}
        />
      </div>
    </div>
  )
}

export default RedirectOverlay
