import React from 'react';
import { useTypewriter } from './useTypewriter';
import Cursor from './Cursor';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay, onComplete }) => {
  const { displayText } = useTypewriter({ text, delay, onComplete });

  return (
    <span className="relative">
      {displayText}
      <Cursor />
    </span>
  );
};

export default TypewriterText;