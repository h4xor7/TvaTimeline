import { Button } from '@/components/ui/button';
import { ToggleLeft, ToggleRight } from 'lucide-react';

interface XPSystemProps {
  xp: number;
  isDarkMode: boolean;
  onThemeToggle: () => void;
}

export function XPSystem({ xp, isDarkMode, onThemeToggle }: XPSystemProps) {
  const progress = Math.min((xp % 1000) / 10, 100);
  
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-tva-panel/90 backdrop-blur-md border-b border-tva-orange/30">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="text-tva-orange font-orbitron font-bold text-xl">
              TVA://SAURABH_PANDEY
            </div>
            <div className="text-tva-text-muted">
              Android Developer • Timeline: SACRED
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-tva-text-muted text-sm">XP:</span>
              <span className="text-tva-orange font-bold">{xp}</span>
            </div>
            <div className="w-32 h-2 bg-tva-dark rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-tva-orange to-tva-orange-light transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onThemeToggle}
              className="text-tva-orange hover:text-tva-orange-light transition-colors p-2"
            >
              {isDarkMode ? (
                <ToggleLeft className="h-5 w-5" />
              ) : (
                <ToggleRight className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
