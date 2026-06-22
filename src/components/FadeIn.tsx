import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { FadeInProps } from '../types';

export default function FadeIn({
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  className = '',
  as = 'div'
}: FadeInProps) {
  // Memoize the dynamic motion component to prevent unmounting/remounting on parent re-renders
  const Component = useMemo(() => motion.create(as as any), [as]);

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </Component>
  );
}
