export interface HistoricalEvent {
  year: string;
  title: string;
  description: string;
  criticalAnalysis?: string; // Added for deeper legal dive
  curatedEvidence?: string; // Added for manually verified, static primary sources (Deep Dive)
  icon: 'scroll' | 'gavel' | 'crown' | 'alert';
}

export interface AnalysisSection {
  id: string;
  title: string;
  prompt: string;
}

export enum ViewState {
  HOME = 'HOME',
  TIMELINE = 'TIMELINE',
  ANALYSIS = 'ANALYSIS',
  CHAT = 'CHAT',
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
