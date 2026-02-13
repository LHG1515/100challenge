
import { useState, useEffect, useCallback } from 'react';
import { ChallengeData } from '../types.ts';

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
    // 시작 날짜를 저장할 때 현재 시간을 포함하여 저장
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

    // 시작 날짜와 현재 날짜의 '시간' 정보를 00:00:00으로 초기화하여 날짜 차이만 계산
    const start = new Date(data.startDate);
    start.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 날짜 차이 계산 (밀리초 -> 일)
    const diffTime = today.getTime() - start.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    // Day 1은 시작한 날이므로 diffDays + 1
    // 최소 1일차, 최대 100일차로 제한
    return Math.min(Math.max(diffDays + 1, 1), 100);
  }, [data.startDate]);

  // GitHub Sync Logic
  const syncToGithub = useCallback(async (token: string) => {
    try {
      const fileName = 'writing-challenge-100-backup.json';
      const content = JSON.stringify(data, null, 2);
      const headers = {
        'Authorization': `token ${token}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
      };

      let method = 'POST';
      let url = 'https://api.github.com/gists';
      const body: any = {
        description: '100 Days Writing Challenge Backup',
        public: false,
        files: { [fileName]: { content } }
      };

      if (data.gistId) {
        method = 'PATCH';
        url = `https://api.github.com/gists/${data.gistId}`;
      }

      const response = await fetch(url, { method, headers, body: JSON.stringify(body) });
      const result = await response.json();

      if (response.ok) {
        setData(prev => ({
          ...prev,
          githubToken: token,
          gistId: result.id,
          lastSyncedAt: new Date().toISOString()
        }));
        return { success: true, gistId: result.id };
      } else {
        throw new Error(result.message || 'Sync failed');
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }, [data]);

  const syncFromGithub = useCallback(async (token: string, gistId: string) => {
    try {
      const headers = { 'Authorization': `token ${token}`, 'Accept': 'application/vnd.github.v3+json' };
      const response = await fetch(`https://api.github.com/gists/${gistId}`, { headers });
      const result = await response.json();

      if (response.ok) {
        const fileName = 'writing-challenge-100-backup.json';
        const file = result.files[fileName];
        if (file) {
          const remoteData = JSON.parse(file.content);
          // 원격 데이터를 불러올 때 현재의 인증 정보는 유지
          setData({ 
            ...remoteData, 
            githubToken: token, 
            gistId: result.id, 
            lastSyncedAt: new Date().toISOString() 
          });
          return { success: true };
        }
        throw new Error('Backup file not found in Gist');
      } else {
        throw new Error(result.message || 'Fetch failed');
      }
    } catch (err: any) {
      return { success: false, error: err.message };
    }
  }, []);

  return {
    data,
    initializeChallenge,
    saveEntry,
    updateNotificationTime,
    getCurrentDayNumber,
    syncToGithub,
    syncFromGithub
  };
};
