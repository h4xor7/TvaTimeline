import { Button } from '@/components/ui/button';
import { TerminalCommand } from './TerminalCommand';

interface Mission {
  id: string;
  code: string;
  title: string;
  description: string;
  xpReward: number;
  completed: boolean;
}

interface MissionNavigationProps {
  missions: Mission[];
  activeMission: string;
  onMissionSelect: (missionId: string) => void;
  onTerminalCommand: (command: string) => void;
}

export function MissionNavigation({ 
  missions, 
  activeMission, 
  onMissionSelect, 
  onTerminalCommand 
}: MissionNavigationProps) {
  const handleMissionClick = (mission: Mission) => {
    onMissionSelect(mission.id);
  };

  const handleTerminalCommand = (command: string) => {
    const missionMap: Record<string, string> = {
      'about': 'identity',
      'projects': 'deployments',
      'skills': 'skills',
      'contact': 'contact'
    };

    if (missionMap[command]) {
      setTimeout(() => {
        onMissionSelect(missionMap[command]);
      }, 1000);
    }

    onTerminalCommand(command);
  };

  return (
    <nav className="fixed left-0 top-24 bottom-0 w-80 bg-tva-panel/80 backdrop-blur-md border-r border-tva-orange/30 p-6 overflow-y-auto">
      <h2 className="text-tva-orange font-orbitron font-bold text-lg mb-6">
        ACTIVE MISSIONS
      </h2>
      
      <div className="space-y-4">
        {missions.map((mission) => (
          <Button
            key={mission.id}
            variant="ghost"
            className={`w-full text-left p-4 rounded-lg holographic hover:glow-orange transition-all duration-300 transform hover:scale-105 ${
              activeMission === mission.id ? 'glow-orange' : ''
            } ${mission.completed ? 'opacity-75' : ''}`}
            onClick={() => handleMissionClick(mission)}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-tva-orange font-bold">{mission.code}</span>
              <span className="text-xs text-tva-text-muted">
                +{mission.xpReward} XP
                {mission.completed && <span className="ml-2 text-tva-green">✓</span>}
              </span>
            </div>
            <div className="text-tva-text font-semibold">{mission.title}</div>
            <div className="text-xs text-tva-text-muted mt-1">{mission.description}</div>
          </Button>
        ))}
      </div>

      <TerminalCommand onCommand={handleTerminalCommand} />
    </nav>
  );
}
