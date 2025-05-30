import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { useTypingEffect } from '@/hooks/useTypingEffect';

interface LoginTerminalProps {
  onAccessGranted: () => void;
}

const terminalLines = [
  { text: '[SYSTEM] Initializing secure connection...', delay: 0, className: 'text-tva-green' },
  { text: '[SYSTEM] Quantum encryption active...', delay: 1000, className: 'text-tva-green' },
  { text: '[SYSTEM] Scanning temporal signatures...', delay: 2000, className: 'text-tva-green' },
  { text: '[WARNING] Unauthorized access attempt detected', delay: 3000, className: 'text-tva-yellow' },
  { text: '[OVERRIDE] Developer credentials verified', delay: 4000, className: 'text-tva-orange' },
  { text: '[ACCESS] Welcome, Saurabh Pandey', delay: 5000, className: 'text-tva-green' },
  { text: '[SYSTEM] Loading developer profile...', delay: 6000, className: 'text-tva-text' },
  { text: '[STATUS] 5+ years Android development experience detected', delay: 7000, className: 'text-tva-orange' },
  { text: '[READY] TVA Control Panel active', delay: 8000, className: 'text-tva-green' },
];

export function LoginTerminal({ onAccessGranted }: LoginTerminalProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);
  const [showAccessButton, setShowAccessButton] = useState(false);

  useEffect(() => {
    terminalLines.forEach((line, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, line.delay);
    });

    setTimeout(() => {
      setShowAccessButton(true);
    }, 9000);
  }, []);

  return (
    <div className="fixed inset-0 bg-tva-dark z-50 flex items-center justify-center">
      <div className="scan-line"></div>
      <div className="max-w-4xl w-full p-8">
        <div className="terminal-border bg-tva-panel p-8 rounded-lg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-tva-orange to-transparent"></div>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl font-orbitron font-bold text-tva-orange glow-orange mb-2">
              TVA TERMINAL ACCESS
            </h1>
            <p className="text-tva-text-muted">Time Variance Authority • Sacred Timeline Division</p>
          </div>
          
          <div className="font-tech text-sm space-y-2 min-h-[300px]">
            {terminalLines.map((line, index) => (
              <div
                key={index}
                className={`${line.className} ${
                  visibleLines.includes(index) ? 'opacity-100' : 'opacity-0'
                } transition-opacity duration-300`}
              >
                {visibleLines.includes(index) && (
                  <TypingLine text={line.text} speed={30} />
                )}
              </div>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            {showAccessButton && (
              <Button
                onClick={onAccessGranted}
                className="bg-tva-orange hover:bg-tva-orange-light px-8 py-3 rounded-lg font-orbitron font-bold transition-all duration-300 transform hover:scale-105 glow-orange"
              >
                ACCESS GRANTED - ENTER TERMINAL
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function TypingLine({ text, speed }: { text: string; speed: number }) {
  const { displayedText } = useTypingEffect(text, speed);
  
  return (
    <span>
      {displayedText}
      <span className="typing-cursor"></span>
    </span>
  );
}
