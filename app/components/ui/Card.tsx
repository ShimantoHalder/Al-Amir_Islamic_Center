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
        rounded-2xl
        border border-accent/12
        bg-gradient-to-br from-blue-950/40 to-black/40
        backdrop-blur-md
        p-6
        transition-all duration-300
        ${interactive
          ? 'hover:border-accent/45 hover:shadow-[0_12px_40px_rgba(201,168,76,0.15)] hover:-translate-y-1.5 cursor-pointer'
          : ''
        }
        ${className}
      `}
    >
      {/* Icon — 16px gap to title */}
      {icon && (
        <div className="text-3xl sm:text-4xl mb-4 leading-none">
          {icon}
        </div>
      )}

      {/* Title — 12px gap to content */}
      {title && (
        <h4 className="text-white font-semibold text-base sm:text-lg mb-3 leading-snug tracking-wide">
          {title}
        </h4>
      )}

      {/* Content */}
      {children}
    </div>
  );
}
