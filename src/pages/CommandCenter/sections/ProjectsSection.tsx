import { createSignal, onMount, type Component } from "solid-js"
import TacticalBentoGrid from "../../../components/TacticalBentoGrid"
import { BENTO_ITEMS } from "../../../components/TacticalBentoGrid/bentoConfig"
import SectionShell, { SectionInternalHeader } from "./SectionShell"

const ProjectsSection: Component = () => {
  const [phase, setPhase] = createSignal(0)

  onMount(() => {
    setTimeout(() => setPhase(1), 160)   // header rolls out
  })

  const projectCount = BENTO_ITEMS.filter((i) => i.type === "project").length

  return (
    <SectionShell codename="TACTICAL" label="Deployed Systems" color="#818cf8">
      <div>
        <div class="max-w-7xl mx-auto pt-6 px-4">
          <SectionInternalHeader
            label="Tactical Modules"
            color="#818cf8"
            active={phase() >= 1}
            meta={`${projectCount} PROJECTS INDEXED`}
          />
        </div>

        <TacticalBentoGrid />
      </div>
    </SectionShell>
  )
}

export default ProjectsSection
