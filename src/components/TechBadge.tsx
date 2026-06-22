import React from 'react';
import Magnet from './Magnet';

interface TechBadgeProps {
  icon: React.ReactNode;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TechBadge({ icon, label, className = '', style }: TechBadgeProps) {
  return (
    <div className={`absolute z-10 ${className}`} style={style}>
      <Magnet padding={60} strength={3.5}>
        <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl backdrop-blur-md shadow-2xl select-none group hover:border-[#B600A8]/40 hover:bg-white/10 transition-all duration-300 cursor-pointer">
          <div className="text-[#D7E2EA]/60 group-hover:text-white group-hover:scale-110 transition-all duration-300 w-4 h-4 flex items-center justify-center">
            {icon}
          </div>
          <span className="text-[10px] font-bold tracking-widest text-[#D7E2EA]/40 group-hover:text-[#D7E2EA] uppercase transition-colors duration-300">
            {label}
          </span>
        </div>
      </Magnet>
    </div>
  );
}
