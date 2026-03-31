import { createSignal, createMemo, onMount, onCleanup, Show, type Component } from "solid-js"

interface Props {
  command: string
  /** Called after the [ENTER] flash — this is when the section should swap */
  onDone: () => void
}

const TerminalTransition: Component<Props> = (props) => {
  const [typed, setTyped] = createSignal(0)
  const [phase, setPhase] = createSignal<"typing" | "enter" | "fading">("typing")

  const displayed = createMemo(() => props.command.slice(0, typed()))
  const isTyping  = () => typed() < props.command.length

  onMount(() => {
    let i = 0
    const id = setInterval(() => {
      i++
      setTyped(i)
      if (i >= props.command.length) {
        clearInterval(id)
        // Brief pause → [ENTER] flash → call onDone → fade
        setTimeout(() => {
          setPhase("enter")
          setTimeout(() => {
            props.onDone()
            setTimeout(() => setPhase("fading"), 80)
          }, 220)
        }, 60)
      }
    }, 16)
    onCleanup(() => clearInterval(id))
  })

  return (
    // Fixed strip centred just above the bottom HUD bar
    <div
      class="fixed bottom-9 left-0 right-0 z-40 flex justify-center pointer-events-none transition-opacity duration-300"
      style={{ opacity: phase() === "fading" ? "0" : "1" }}
    >
      <div class="flex items-center gap-2.5 px-5 py-2 bg-[#080808]/96 border border-white/10 rounded-lg backdrop-blur-md shadow-2xl">
        {/* Prompt */}
        <span class="font-mono text-xs text-cyan-500">$</span>

        {/* Typed text */}
        <span class="font-mono text-sm text-slate-200 tracking-wide">{displayed()}</span>

        {/* Block cursor while typing */}
        <Show when={isTyping()}>
          <span class="inline-block w-[2px] h-[14px] bg-cyan-400 animate-blink" />
        </Show>

        {/* [ENTER] flash */}
        <Show when={phase() === "enter" || phase() === "fading"}>
          <span class="font-mono text-[10px] tracking-[0.2em] text-emerald-400 ml-1">
            [ENTER] ✓
          </span>
        </Show>
      </div>
    </div>
  )
}

export default TerminalTransition
