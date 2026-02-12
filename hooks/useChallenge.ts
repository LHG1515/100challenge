
import { useState, useEffect, useCallback } from 'react';
import { ChallengeData } from '../types';

const STORAGE_KEY = 'writing_challenge_100';

const DEFAULT_DATA: ChallengeData = {
  startDate: null,
  entries: {},
  notificationTime: '21:00',
  isInitialized: false,
};

export const useChallenge = () => {
  const [data, setData] = useState<ChallengeData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_DATA;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const initializeChallenge = useCallback((time: string) => {
    setData(prev => ({
      ...prev,
      startDate: new Date().toISOString(),
      notificationTime: time,
      isInitialized: true,
    }));
  }, []);

  const saveEntry = useCallback((day: number, text: string) => {
    setData(prev => ({
      ...prev,
      entries: {
        ...prev.entries,
        [day]: text.slice(0, 150),
      },
    }));
  }, []);

  const updateNotificationTime = useCallback((time: string) => {
    setData(prev => ({
      ...prev,
      notificationTime: time,
    }));
  }, []);

  const getCurrentDayNumber = useCallback(() => {
    if (!data.startDate) return 1;
    const start = new Date(data.startDate);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - start.getTime());
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return Math.min(diffDays + 1, 100);
  }, [data.startDate]);

  return {
    data,
    initializeChallenge,
    saveEntry,
    updateNotificationTime,
    getCurrentDayNumber,
  };
};
