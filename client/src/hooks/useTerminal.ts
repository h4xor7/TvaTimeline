import { useState } from 'react';
import { TerminalCommand } from '@/types/game';

export function useTerminal() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [history, setHistory] = useState<string[]>([]);

  const commands: Record<string, TerminalCommand> = {
    'help': {
      command: 'help',
      response: 'Available commands: about, projects, skills, contact, clear, easter-egg, kotlin, tva, timeline, whoami'
    },
    'about': {
      command: 'about',
      response: 'Redirecting to Mission 001: Identity File...',
    },
    'projects': {
      command: 'projects',
      response: 'Redirecting to Mission 002: Deployments...',
    },
    'skills': {
      command: 'skills',
      response: 'Redirecting to Mission 003: Skill Matrix...',
    },
    'contact': {
      command: 'contact',
      response: 'Redirecting to Mission 004: Communication Protocol...',
    },
    'clear': {
      command: 'clear',
      response: '',
      action: () => {
        setResponse('');
        setHistory([]);
      }
    },
    'easter-egg': {
      command: 'easter-egg',
      response: '🥚 Secret achievement unlocked! You found the hidden command!'
    },
    'kotlin': {
      command: 'kotlin',
      response: 'Kotlin is the preferred language for Android development. Fun fact: It\'s named after Kotlin Island!'
    },
    'tva': {
      command: 'tva',
      response: 'Time Variance Authority - For All Time. Always.'
    },
    'timeline': {
      command: 'timeline',
      response: 'Current timeline: Sacred. Status: Protected.'
    },
    'whoami': {
      command: 'whoami',
      response: 'You are accessing SAURABH_PANDEY developer profile via TVA terminal.'
    }
  };

  const executeCommand = (commandInput: string): TerminalCommand | null => {
    const cmd = commandInput.toLowerCase().trim();
    const command = commands[cmd];
    
    if (command) {
      setResponse(command.response);
      setHistory(prev => [...prev, `$ ${commandInput}`, command.response]);
      command.action?.();
      return command;
    } else {
      const errorResponse = `Command '${cmd}' not recognized. Type 'help' for available commands.`;
      setResponse(errorResponse);
      setHistory(prev => [...prev, `$ ${commandInput}`, errorResponse]);
      return null;
    }
  };

  const handleInput = (value: string) => {
    setInput(value);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      const result = executeCommand(input);
      setInput('');
      return result;
    }
    return null;
  };

  return {
    input,
    response,
    history,
    handleInput,
    handleSubmit,
    executeCommand,
  };
}
