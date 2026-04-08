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
        border border-blue-800/30
        bg-gradient-to-br from-blue-950/40 to-black/40
        backdrop-blur-md
        p-5 sm:p-6 md:p-7
        transition-all duration-400
        ${interactive
          ? 'hover:border-accent/50 hover:shadow-[0_8px_32px_rgba(201,168,76,0.14),0_0_0_1px_rgba(201,168,76,0.1)] hover:-translate-y-2 cursor-pointer'
          : ''
        }
        ${className}
      `}
    >
      {icon && (
        <div className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 leading-none">{icon}</div>
      )}
      {title && (
        <h4 className="text-white font-semibold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 leading-snug">
          {title}
        </h4>
      )}
      {children}
    </div>
  );
}
