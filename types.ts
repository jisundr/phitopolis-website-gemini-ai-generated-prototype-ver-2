export enum PageState {
  HOME = 'HOME',
  EXPERTISE = 'EXPERTISE',
  CAREERS = 'CAREERS',
  CONTACT = 'CONTACT'
}

export enum CareerTab {
  OPEN_ROLES = 'OPEN_ROLES',
  TECH_STACK = 'TECH_STACK',
  LIFE = 'LIFE',
  GRADUATE = 'GRADUATE'
}

export interface JobPosition {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  description: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}