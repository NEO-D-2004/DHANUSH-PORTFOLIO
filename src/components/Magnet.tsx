import React, { useRef, useState, useEffect } from 'react';
import { MagnetProps } from '../types';

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = ''
}: MagnetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('translate3d(0px, 0px, 0px)');
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;

      const distance = Math.hypot(distanceX, distanceY);
      
      // Determine if cursor is within padding distance of the element
      const threshold = Math.max(rect.width, rect.height) / 2 + padding;

      if (distance < threshold) {
        setIsHovered(true);
        // Translate coordinates divided by strength factor
        const x = distanceX / strength;
        const y = distanceY / strength;
        setTransform(`translate3d(${x}px, ${y}px, 0px)`);
      } else {
        setIsHovered(false);
        setTransform('translate3d(0px, 0px, 0px)');
      }
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform('translate3d(0px, 0px, 0px)');
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [padding, strength]);

  const style: React.CSSProperties = {
    transform,
    transition: isHovered ? activeTransition : inactiveTransition,
    willChange: 'transform',
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}
