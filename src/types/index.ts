export interface PersonalInfo {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  bio: string;
  social: {
    linkedin: string;
    github: string;
  };
  education: {
    institution: string;
    degree: string;
    cgpa: string;
    duration: string;
    location: string;
  };
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration: string;
  location: string;
  type: 'Internship' | 'Full-time' | 'Contract' | 'Freelance';
  description: string;
  technologies: string[];
  achievements: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  features: string[];
  github?: string;
  demo?: string;
  category: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'Competition' | 'Skills' | 'Achievement' | 'Recognition' | 'Project';
  icon: string;
  details?: Record<string, any>;
}

export interface TechnicalSkills {
  languages: {
    advanced: string[];
    intermediate: string[];
    basic: string[];
  };
  developerTools: string[];
  webTechnologies: string[];
  libraries: string[];
  specializations: string[];
}

export interface SearchHistoryItem {
  id: number;
  query: string;
  response: string;
  timestamp: string;
  bookmarked?: boolean;
}
