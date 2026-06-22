import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'motion/react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}

interface CharProps {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  key?: React.Key;
}

function Character({ char, index, total, progress }: CharProps) {
  // Stagger start scroll percentage across total length
  const start = index / total;
  // Use a slight overlap coefficient (0.05) to ensure smooth blend from character to character
  const end = Math.min(1, start + 0.05);
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  // Use a non-breaking space if it's whitespace to guarantee layout size calculation in inline-blocks
  const displayChar = char === ' ' ? '\u00A0' : char;

  return (
    <span className="relative inline-block select-none">
      <span className="opacity-0">{displayChar}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {displayChar}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className = '', style }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  
  // Track scroll position of the paragraph element with exact specified offsets
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const chars = text.split('');
  const total = chars.length;

  return (
    <p ref={containerRef} style={style} className={`flex flex-wrap justify-center leading-relaxed ${className}`}>
      {chars.map((char, index) => (
        <Character
          key={index}
          char={char}
          index={index}
          total={total}
          progress={scrollYProgress}
        />
      ))}
    </p>
  );
}
