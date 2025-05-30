import { useState, KeyboardEvent } from 'react';
import { useTerminal } from '@/hooks/useTerminal';

interface TerminalCommandProps {
  onCommand: (command: string) => void;
}

export function TerminalCommand({ onCommand }: TerminalCommandProps) {
  const { input, response, handleInput, handleSubmit } = useTerminal();

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const result = handleSubmit();
      if (result) {
        onCommand(result.command);
      }
    }
  };

  return (
    <div className="mt-8 p-4 bg-tva-dark rounded-lg border border-tva-orange/30">
      <div className="text-tva-orange text-sm mb-2">TERMINAL:</div>
      <div className="flex items-center">
        <span className="text-tva-green">$&gt;</span>
        <input
          type="text"
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          onKeyPress={handleKeyPress}
          className="bg-transparent border-none outline-none text-tva-text ml-2 flex-1"
          placeholder="type 'help' for commands"
        />
      </div>
      <div className="text-xs text-tva-text-muted mt-2 min-h-[20px]">
        {response}
      </div>
    </div>
  );
}
