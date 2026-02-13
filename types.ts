
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
  githubToken?: string;
  gistId?: string;
  lastSyncedAt?: string;
}

export type AppMode = 'calendar' | 'input' | 'grid';
