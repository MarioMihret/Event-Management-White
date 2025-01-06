import React, { useEffect, useState } from 'react';

interface TypewriterTextProps {
  text: string;
  delay?: number;
}

const TypewriterText: React.FC<TypewriterTextProps> = ({ text, delay = 100 }) => {
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (displayText.length < text.length) {
          setDisplayText(text.slice(0, displayText.length + 1));
        } else {
          setIsDeleting(true);
        }
      } else {
        // Deleting backward
        if (displayText.length > 0) {
          setDisplayText(text.slice(0, displayText.length - 1));
        } else {
          setIsDeleting(false);
        }
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, text, delay]);

  return (
    <span className="relative">
      {displayText}
      <span className="absolute right-[-4px] top-0 w-[2px] h-full bg-purple-400 animate-blink" />
    </span>
  );
};

export default TypewriterText;
