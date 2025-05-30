import { useState, useEffect } from 'react';
import { XPSystem } from './XPSystem';
import { MissionNavigation } from './MissionNavigation';
import { AchievementToast } from './AchievementToast';
import { IdentityFile } from './missions/IdentityFile';
import { Deployments } from './missions/Deployments';
import { SkillMatrix } from './missions/SkillMatrix';
import { CommunicationProtocol } from './missions/CommunicationProtocol';
import { useGameState } from '@/hooks/useGameState';
import { Achievement } from '@/types/game';

const missions = [
  {
    id: 'identity',
    code: 'MISSION 001',
    title: 'Identity File',
    description: 'Access developer dossier',
    xpReward: 25,
    completed: false,
  },
  {
    id: 'deployments',
    code: 'MISSION 002',
    title: 'Deployments',
    description: 'Review project archives',
    xpReward: 50,
    completed: false,
  },
  {
    id: 'skills',
    code: 'MISSION 003',
    title: 'Skill Matrix',
    description: 'Analyze capabilities',
    xpReward: 35,
    completed: false,
  },
  {
    id: 'contact',
    code: 'MISSION 004',
    title: 'Communication Protocol',
    description: 'Establish contact',
    xpReward: 20,
    completed: false,
  },
];

export function MainInterface() {
  const { gameState, awardXP, completeMission, addAchievement, toggleTheme } = useGameState();
  const [activeMission, setActiveMission] = useState('identity');
  const [currentAchievement, setCurrentAchievement] = useState<Achievement | null>(null);
  const [kotlinClickCount, setKotlinClickCount] = useState(0);

  // Update mission completion status
  const updatedMissions = missions.map(mission => ({
    ...mission,
    completed: gameState.completedMissions.includes(mission.id)
  }));

  useEffect(() => {
    // Apply theme
    if (gameState.isDarkMode) {
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
    }
  }, [gameState.isDarkMode]);

  useEffect(() => {
    // Show welcome achievement on first load
    if (gameState.xp === 0 && gameState.achievements.length === 0) {
      const achievement = addAchievement({
        type: 'welcome',
        title: 'Welcome to TVA Terminal',
        description: 'First login completed successfully',
        xp: 10,
      });
      setCurrentAchievement(achievement);
      awardXP(10);
    }
  }, []);

  const handleMissionSelect = (missionId: string) => {
    setActiveMission(missionId);
    
    const mission = missions.find(m => m.id === missionId);
    if (mission && !gameState.completedMissions.includes(missionId)) {
      completeMission(missionId);
      awardXP(mission.xpReward);
      
      const achievement = addAchievement({
        type: 'mission',
        title: `${mission.code} Complete`,
        description: `Successfully accessed ${mission.title}`,
        xp: mission.xpReward,
      });
      setCurrentAchievement(achievement);
    }
  };

  const handleProjectView = (xp: number) => {
    awardXP(xp);
    
    const achievement = addAchievement({
      type: 'project',
      title: 'Project Explored',
      description: 'Viewed project details and documentation',
      xp: xp,
    });
    setCurrentAchievement(achievement);
  };

  const handleTerminalCommand = (command: string) => {
    if (command === 'easter-egg') {
      awardXP(10);
      const achievement = addAchievement({
        type: 'easter-egg',
        title: 'Easter Egg Found!',
        description: 'Secret command master discovered',
        xp: 10,
      });
      setCurrentAchievement(achievement);
    } else if (command === 'kotlin') {
      setKotlinClickCount(prev => {
        const newCount = prev + 1;
        if (newCount === 5) {
          awardXP(25);
          const achievement = addAchievement({
            type: 'kotlin-enthusiast',
            title: 'Kotlin Enthusiast!',
            description: 'Asked about Kotlin 5 times - you must really love it!',
            xp: 25,
          });
          setCurrentAchievement(achievement);
          return 0; // Reset counter
        }
        return newCount;
      });
    }
  };

  const handleThemeToggle = () => {
    toggleTheme();
    const achievement = addAchievement({
      type: 'theme',
      title: gameState.isDarkMode ? 'Light Mode Activated' : 'Dark Mode Restored',
      description: gameState.isDarkMode ? 'Welcome to the bright side!' : 'TVA aesthetic maintained',
      xp: 5,
    });
    setCurrentAchievement(achievement);
    awardXP(5);
  };

  const renderMissionContent = () => {
    switch (activeMission) {
      case 'identity':
        return <IdentityFile />;
      case 'deployments':
        return <Deployments onProjectView={handleProjectView} />;
      case 'skills':
        return <SkillMatrix />;
      case 'contact':
        return <CommunicationProtocol />;
      default:
        return <IdentityFile />;
    }
  };

  return (
    <div className="min-h-screen">
      <XPSystem
        xp={gameState.xp}
        isDarkMode={gameState.isDarkMode}
        onThemeToggle={handleThemeToggle}
      />
      
      <MissionNavigation
        missions={updatedMissions}
        activeMission={activeMission}
        onMissionSelect={handleMissionSelect}
        onTerminalCommand={handleTerminalCommand}
      />
      
      <main className="ml-80 pt-24 min-h-screen">
        {renderMissionContent()}
      </main>
      
      <AchievementToast
        achievement={currentAchievement}
        onClose={() => setCurrentAchievement(null)}
      />
    </div>
  );
}
