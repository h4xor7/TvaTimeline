import { useState, useEffect } from 'react';
import { GameState, Achievement } from '@/types/game';
import { nanoid } from 'nanoid';

const defaultGameState: GameState = {
  xp: 0,
  completedMissions: [],
  achievements: [],
  isDarkMode: true,
  sessionId: nanoid(),
};

export function useGameState() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem('tva_game_state');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultGameState, ...parsed };
      } catch {
        return defaultGameState;
      }
    }
    return defaultGameState;
  });

  useEffect(() => {
    localStorage.setItem('tva_game_state', JSON.stringify(gameState));
  }, [gameState]);

  const awardXP = (amount: number, reason?: string) => {
    setGameState(prev => ({
      ...prev,
      xp: prev.xp + amount
    }));
  };

  const completeMission = (missionId: string) => {
    setGameState(prev => ({
      ...prev,
      completedMissions: [...prev.completedMissions, missionId]
    }));
  };

  const addAchievement = (achievement: Omit<Achievement, 'sessionId'>) => {
    const newAchievement = {
      ...achievement,
      sessionId: gameState.sessionId
    };
    
    setGameState(prev => ({
      ...prev,
      achievements: [...prev.achievements, newAchievement]
    }));

    // Track achievement on server
    fetch('/api/achievements', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newAchievement),
    }).catch(console.error);

    return newAchievement;
  };

  const toggleTheme = () => {
    setGameState(prev => ({
      ...prev,
      isDarkMode: !prev.isDarkMode
    }));
  };

  const resetProgress = () => {
    setGameState({
      ...defaultGameState,
      sessionId: nanoid(),
    });
  };

  return {
    gameState,
    awardXP,
    completeMission,
    addAchievement,
    toggleTheme,
    resetProgress,
  };
}
