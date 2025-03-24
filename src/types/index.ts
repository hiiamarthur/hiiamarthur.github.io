export interface Experience {
  id: string;
  company: string;
  companyIntroduction?: string;
  position: string;
  duration: string;
  description?: string[];
  technologies: string[];
  projects?: Project[];
}

export interface Project {
  id: string;
  title: string;
  description: string | string[];
  technologies?: string[];
  imageUrl?: string;
  liveUrl?: string;
  githubUrl?: string;
} 