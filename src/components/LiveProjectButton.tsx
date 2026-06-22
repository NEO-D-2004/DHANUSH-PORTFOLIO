import React from 'react';

interface LiveProjectButtonProps {
  id?: string;
  onClick?: () => void;
  className?: string;
}

export default function LiveProjectButton({ id, onClick, className = '' }: LiveProjectButtonProps) {
  return (
    <button
      id={id || "btn-live-project"}
      onClick={onClick}
      className={`rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base cursor-pointer hover:bg-[#D7E2EA]/10 transition-all duration-300 ${className}`}
    >
      Live Project
    </button>
  );
}
