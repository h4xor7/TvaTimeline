import { useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { Achievement } from '@/types/game';

interface AchievementToastProps {
  achievement: Achievement | null;
  onClose: () => void;
}

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  useEffect(() => {
    if (achievement) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-24 right-6 z-50 animate-in slide-in-from-right">
      <div className="bg-tva-panel border border-tva-green glow-green p-4 rounded-lg max-w-sm">
        <div className="flex items-center space-x-3">
          <Trophy className="text-tva-green text-xl flex-shrink-0" />
          <div>
            <h4 className="text-tva-green font-bold">Achievement Unlocked!</h4>
            <p className="text-tva-text text-sm font-semibold">{achievement.title}</p>
            <p className="text-tva-text-muted text-xs">{achievement.description}</p>
            <p className="text-tva-orange text-xs font-bold">+{achievement.xp} XP</p>
          </div>
        </div>
      </div>
    </div>
  );
}
