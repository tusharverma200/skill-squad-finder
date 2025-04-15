
export enum SkillColor {
  React = 'react',
  Vue = 'vue',
  Angular = 'angular',
  Node = 'node',
  Python = 'python',
  Design = 'design',
  Frontend = 'frontend',
  Backend = 'backend',
  Mobile = 'mobile',
  DevOps = 'devops',
  AI = 'ai',
  Blockchain = 'blockchain'
}

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  skills: string[];
  location: string;
  hackathonInterests: string[];
  email: string;
  github?: string;
  linkedin?: string;
}

export interface FilterCriteria {
  skills: string[];
  location: string;
  hackathonInterests: string;
  searchTerm: string;
}

export interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  messages: Message[];
  lastMessageTime: Date;
}

export interface Hackathon {
  id: string;
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  location: string;
  isOnline: boolean;
  url: string;
  organizerName: string;
  prizes?: string[];
  logo?: string;
  tags: string[];
}
