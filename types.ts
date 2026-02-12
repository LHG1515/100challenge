
export interface Entry {
  day: number;
  text: string;
  date: string; // ISO String
}

export interface ChallengeData {
  startDate: string | null;
  entries: Record<number, string>;
  notificationTime: string; // HH:mm
  isInitialized: boolean;
}

export type AppMode = 'calendar' | 'input' | 'grid';
