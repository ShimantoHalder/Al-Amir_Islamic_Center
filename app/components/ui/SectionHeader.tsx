import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
}

export function SectionHeader({ icon, title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8 sm:mb-10 w-full">
      {/* Icon */}
      <span className="text-4xl sm:text-5xl mb-3 leading-none">
        {icon}
      </span>

      {/* H2 heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
        {title}
      </h2>

      {/* Subtitle */}
      {subtitle && (
        <div className="mt-3 w-full flex flex-col items-center">{subtitle}</div>
      )}

      {/* Gold divider */}
      <div className="section-divider mt-4 mb-4" />

      {/* Description */}
      {description && (
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl text-center">
          {description}
        </p>
      )}
    </div>
  );
}
