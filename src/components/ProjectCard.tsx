import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { ProjectItem } from '../types';
import LiveProjectButton from './LiveProjectButton';

interface ProjectCardProps {
  project: ProjectItem;
  index: number;
  totalCards: number;
  onLiveClick: (name: string) => void;
  key?: React.Key;
}

export default function ProjectCard({ project, index, totalCards, onLiveClick }: ProjectCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Track the scroll of the container track inside viewport bounds
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Calculate scaling factors: Card 0 starts at scale 1, shrinks to 0.94 as list scrolls past
  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  // Handle sticky position values based on device width
  const baseOffset = isMobile ? 96 : 128;
  const topStyle = `${baseOffset + index * 28}px`;

  return (
    <div 
      ref={containerRef} 
      className="relative h-[85vh] md:h-[95vh] w-full flex justify-center items-start"
    >
      <motion.div
        style={{
          scale,
          top: topStyle,
          willChange: 'transform',
        }}
        className="sticky rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-5 sm:p-6 md:p-8 w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col justify-between"
      >
        {/* Top Row Layout */}
        <div className="flex flex-row items-center justify-between gap-4 border-b border-white/10 pb-4 sm:pb-6 mb-4 sm:mb-6">
          <div className="flex items-center gap-4 sm:gap-6">
            {/* Outline Styled / Transparent Number Accent */}
            <span 
              className="font-black text-[#D7E2EA]/15 select-none leading-none inline-block align-middle"
              style={{ fontSize: 'clamp(2rem, 7vw, 90px)' }}
            >
              {project.number}
            </span>
            <div className="text-left">
              <span className="text-[10px] sm:text-xs text-neutral-400 uppercase tracking-widest block font-light mb-1">
                {project.category}
              </span>
              <h3 className="text-base sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase text-[#D7E2EA] tracking-tight leading-tight">
                {project.name}
              </h3>
            </div>
          </div>

          <LiveProjectButton 
            onClick={() => onLiveClick(project.name)} 
            className="scale-75 sm:scale-90 md:scale-100 origin-right"
          />
        </div>

        {/* Bottom Row Layout: Responsive Stackable Grid */}
        <div className="flex-grow grid grid-cols-1 md:grid-cols-10 gap-4 sm:gap-6 md:gap-8 items-stretch min-h-0">
          {/* Left Column (40% width on desktop) */}
          <div className="col-span-1 md:col-span-4 flex flex-col gap-4 sm:gap-6">
            {/* Left Top Preview */}
            <div 
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/5 bg-zinc-950 flex-shrink-0"
              style={{ height: 'clamp(120px, 15vw, 210px)' }}
            >
              <img
                src={project.col1Image1}
                alt={`${project.name} view one`}
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Left Bottom Preview */}
            <div 
              className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/5 bg-zinc-950 flex-grow"
              style={{ height: 'clamp(140px, 20vw, 310px)' }}
            >
              <img
                src={project.col1Image2}
                alt={`${project.name} view two`}
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Right Column (60% width on desktop) */}
          <div className="col-span-1 md:col-span-6 flex items-stretch">
            <div className="w-full overflow-hidden rounded-[30px] sm:rounded-[40px] md:rounded-[50px] border border-white/5 bg-zinc-950 flex h-full min-h-[220px]">
              <img
                src={project.col2Image}
                alt={`${project.name} main showcase`}
                className="w-full h-full object-cover rounded-[30px] sm:rounded-[40px] md:rounded-[50px] hover:scale-105 transition-transform duration-500"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
