import { type Component } from "solid-js"
import StarMapGraph from "../../../components/StarMapGraph"

const StarMapSection: Component = () => (
  <div>
    <div class="max-w-7xl mx-auto pt-8 px-4">
      <p class="font-mono text-[9px] tracking-[0.35em] text-violet-500 uppercase mb-2">
        — Skill Matrix / STAR MAP —
      </p>
    </div>
    <StarMapGraph />
  </div>
)

export default StarMapSection
