import { useState, useEffect } from 'react';

export function useTypingEffect(text: string, speed: number = 50, delay: number = 0) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const timeout = setTimeout(() => {
      let index = 0;
      const timer = setInterval(() => {
        if (index < text.length) {
          setDisplayedText(prev => prev + text[index]);
          index++;
        } else {
          clearInterval(timer);
          setIsComplete(true);
        }
      }, speed);

      return () => clearInterval(timer);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, speed, delay]);

  const reset = () => {
    setDisplayedText('');
    setIsComplete(false);
  };

  return { displayedText, isComplete, reset };
}
