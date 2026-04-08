import React from 'react';

interface CardProps {
  icon?: string;
  title?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
}

export function Card({ icon, title, children, className = '', interactive = false }: CardProps) {
  return (
    <div
      className={`rounded-lg sm:rounded-xl md:rounded-2xl border border-blue-800/40 bg-blue-950/30 p-4 sm:p-5 md:p-6 backdrop-blur transition-all duration-300 ${
        interactive
          ? 'hover:border-accent/40 hover:bg-blue-900/20 hover:-translate-y-1 cursor-pointer'
          : ''
      } ${className}`}
    >
      {icon && <div className="text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3">{icon}</div>}
      {title && <h4 className="text-white font-semibold text-xs sm:text-sm md:text-base mb-2">{title}</h4>}
      {children}
    </div>
  );
}
