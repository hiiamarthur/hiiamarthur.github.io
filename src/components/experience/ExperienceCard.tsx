import { Component, createSignal, For } from "solid-js";
import type { Experience } from "../../types";
import Collapsible from "../../components/Collapsible";
import YieldedIcon from "../../components/yieldedIcon";

interface Props {
  experience: Experience;
}

const ExperienceCard: Component<Props> = (props) => {
  const [expandedIndex, setExpandedIndex] = createSignal(-1);
  return (
    <div class="experience-card">
      {/* <Collapsible title={props.experience.}></Collapsible> */}
      <h3 class="animate-fade-in-left">{props.experience.company}</h3>
      <h4 class="animate-fade-in-right">{props.experience.position}</h4>
      <p class="duration animate-fade-in-right">{props.experience.duration}</p>
      {/* <ul>
        <For each={props.experience.description}>
          {(item, index) => (
            <li 
              class="animate-fade-in-up" 
              style={{ 
                "animation-delay": `${(index() * 0.2) + 0.5}s`
              }}
            >
              {item}
            </li>
          )}
        </For>
      </ul> */}
      <ul>
        {props.experience.projects?.map((project, index) => (
          <div
            class="animate-fade-in-up m"
            style={{
              "animation-delay": `${index * 0.2 + 0.5}s`,
            }}
          >
            <Collapsible
              class="animate-fade-in-up"
              title={project.title}
              description={props.experience.description?.[index]}
              isExpanded={expandedIndex() === index}
              onToggle={() => setExpandedIndex(index)}
            >
              <div class="project-card">
                <For each={project.description as string[]}>
                  {(item, index) => (
                    <li
                      class="animate-fade-in-up custom-strong"
                      style={{
                        "animation-delay": `${index() * 0.2 + 0.5}s`,
                      }}
                      innerHTML={item}
                    ></li>
                  )}
                </For>
              </div>
            </Collapsible>
          </div>
        ))}
      </ul>

      <div class="technologies">
        <For each={props.experience.technologies}>
          {(tech, index) => (
            // <span
            //   class="tech-tag animate-fade-in-up "
            //   style={{
            //     "animation-delay": `${index() * 0.1 + 1.2}s`,
            //   }}
            // >
            <span
              class="animate-fade-in-up"  
              style={{
                "animation-delay": `${index() * 0.1 + 1.2}s`,
              }}
            >
              <YieldedIcon keyword={tech}>{tech}</YieldedIcon>
            </span>

            // </span>
          )}
        </For>
      </div>
    </div>
  );
};

export default ExperienceCard;
