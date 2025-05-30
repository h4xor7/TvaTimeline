export interface GameState {
  xp: number;
  completedMissions: string[];
  achievements: Achievement[];
  isDarkMode: boolean;
  sessionId: string;
}

export interface Achievement {
  id?: number;
  sessionId: string;
  type: string;
  title: string;
  description: string;
  xp: number;
  createdAt?: Date;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

export interface Project {
  name: string;
  description: string;
  image: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
  xpReward: number;
}

export interface Skill {
  name: string;
  proficiency: number;
  category: 'technical' | 'framework' | 'tool';
}

export interface TerminalCommand {
  command: string;
  response: string;
  action?: () => void;
}
