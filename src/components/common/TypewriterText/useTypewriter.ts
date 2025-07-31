import { useState, useEffect } from 'react';

interface UseTypewriterProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriter = ({ text, delay = 100, onComplete }: UseTypewriterProps) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1));
        } else {
          onComplete?.();
          setIsDeleting(true);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(text.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, delay, onComplete]);

  return { displayText, isDeleting };
};