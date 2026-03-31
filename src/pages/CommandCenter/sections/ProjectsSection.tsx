import { type Component } from "solid-js"
import TacticalBentoGrid from "../../../components/TacticalBentoGrid"

const ProjectsSection: Component = () => (
  <div>
    <div class="max-w-7xl mx-auto pt-8 px-4">
      <p class="font-mono text-[9px] tracking-[0.35em] text-cyan-600 uppercase mb-2">
        — Deployed Systems / TACTICAL —
      </p>
    </div>
    <TacticalBentoGrid />
  </div>
)

export default ProjectsSection
