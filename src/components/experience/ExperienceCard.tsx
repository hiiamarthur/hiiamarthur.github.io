import { Component, For } from 'solid-js';
import type { Experience } from '../../types';

interface Props {
  experience: Experience;
}

const ExperienceCard: Component<Props> = (props) => {
  return (
    <div class="experience-card">
      <h3>{props.experience.company}</h3>
      <h4>{props.experience.position}</h4>
      <p class="duration">{props.experience.duration}</p>
      <ul>
        <For each={props.experience.description}>
          {(item) => <li>{item}</li>}
        </For>
      </ul>
      <div class="technologies">
        <For each={props.experience.technologies}>
          {(tech) => (
            <span class="tech-tag">{tech}</span>
          )}
        </For>
      </div>
    </div>
  );
};

export default ExperienceCard; 