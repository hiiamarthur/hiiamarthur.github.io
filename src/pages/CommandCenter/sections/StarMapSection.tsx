import { createSignal, onMount, type Component } from "solid-js"
import StarMapGraph from "../../../components/StarMapGraph"
import { NODES, EDGES } from "../../../components/StarMapGraph/graphData"
import SectionShell, { SectionInternalHeader, ElectricReveal } from "./SectionShell"

const StarMapSection: Component = () => {
  const [phase, setPhase] = createSignal(0)

  onMount(() => {
    setTimeout(() => setPhase(1), 160)   // header rolls out
    setTimeout(() => setPhase(2), 360)   // graph drops
  })

  return (
    <SectionShell codename="STAR_MAP" label="Knowledge Graph" color="#a855f7">
      <div>
        <div class="max-w-7xl mx-auto pt-6 px-4">
          <SectionInternalHeader
            label="Knowledge Graph"
            color="#a855f7"
            active={phase() >= 1}
            meta={`${NODES.length} NODES · ${EDGES.length} EDGES`}
          />
        </div>

        <ElectricReveal active={phase() >= 2} color="#a855f7">
          <StarMapGraph />
        </ElectricReveal>
      </div>
    </SectionShell>
  )
}

export default StarMapSection
