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
      className={`
        rounded-2xl md:rounded-3xl
        border border-accent/12
        bg-gradient-to-br from-blue-950/40 to-black/40
        backdrop-blur-md
        p-6 sm:p-7 md:p-8
        transition-all duration-400
        ${interactive
          ? 'hover:border-accent/45 hover:shadow-[0_15px_50px_rgba(201,168,76,0.15)] hover:-translate-y-2 cursor-pointer'
          : ''
        }
        ${className}
      `}
    >
      {/* Icon with consistent spacing */}
      {icon && (
        <div className="text-3xl sm:text-4xl md:text-5xl mb-4 sm:mb-5 leading-none">
          {icon}
        </div>
      )}
      
      {/* Title with consistent spacing */}
      {title && (
        <h4 className="text-white font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 leading-snug tracking-wide">
          {title}
        </h4>
      )}
      
      {/* Content */}
      {children}
    </div>
  );
}
