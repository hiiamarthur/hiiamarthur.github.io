import { Component, For } from 'solid-js';
import type { Experience } from '../../types';

interface Props {
  experience: Experience;
}

const ExperienceCard: Component<Props> = (props) => {
  return (
    <div class="experience-card">
      <h3 class="animate-fade-in-left">{props.experience.company}</h3>
      <h4 class="animate-fade-in-right">{props.experience.position}</h4>
      <p class="duration animate-fade-in-right">{props.experience.duration}</p>
      <ul>
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
      </ul>
      <div class="technologies ">
        <For each={props.experience.technologies}>
          {(tech, index) => (
            <span 
              class="tech-tag animate-fade-in-up"
              style={{ 
                "animation-delay": `${(index() * 0.1) + 1.2}s`
              }}
            >
              {tech}
            </span>
          )}
        </For>
      </div>
    </div>
  );
};

export default ExperienceCard; 