import React, { useState, useEffect } from 'react';

interface TypewriterProps {
  strings: string[];
  typeSpeed?: number;
  backSpeed?: number;
  delayBetweenStrings?: number;
}

export default function Typewriter({
  strings,
  typeSpeed = 90,
  backSpeed = 90,
  delayBetweenStrings = 1500,
}: TypewriterProps) {
  const [currentText, setCurrentText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentFullString = strings[stringIndex];

    if (isDeleting) {
      // Deleting character
      timer = setTimeout(() => {
        setCurrentText((prev) => prev.slice(0, -1));
      }, backSpeed);
    } else {
      // Typing character
      timer = setTimeout(() => {
        setCurrentText((prev) => currentFullString.slice(0, prev.length + 1));
      }, typeSpeed);
    }

    // Check if typing is complete
    if (!isDeleting && currentText === currentFullString) {
      timer = setTimeout(() => setIsDeleting(true), delayBetweenStrings);
    }

    // Check if deletion is complete
    if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, stringIndex, strings, typeSpeed, backSpeed, delayBetweenStrings]);

  return <span>{currentText}</span>;
}
