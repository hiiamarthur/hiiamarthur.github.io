import { type Component } from "solid-js"
import Tab from "../../../components/Tab"
import { experiences } from "../../../data/experiences"
import ExperienceCard from "../../../components/experience/ExperienceCard"

const ExperienceSection: Component = () => (
  <div class="max-w-4xl mx-auto py-8 px-4">
    <p class="font-mono text-[9px] tracking-[0.35em] text-cyan-600 uppercase mb-6">
      — Mission History / OPS LOG —
    </p>
    <Tab
      tabs={experiences.map((exp) => ({
        id: exp.id,
        label: exp.company,
        content: <ExperienceCard experience={exp} />,
      }))}
      defaultTab={experiences[0]?.id}
    />
  </div>
)

export default ExperienceSection
