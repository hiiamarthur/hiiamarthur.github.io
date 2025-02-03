import { Component, For } from 'solid-js';
import { experiences } from '../data/experiences';
import ExperienceCard from '../components/experience/ExperienceCard';
import type { Experience as ExperienceType } from '../types';

const Experience: Component = () => {
  return (
    <div class="experience-page">
      <h1>Professional Experience</h1>
      <div class="experience-grid">
        <For each={experiences}>
          {(experience: ExperienceType) => (
            <ExperienceCard experience={experience} />
          )}
        </For>
      </div>
    </div>
  );
};

export default Experience; 