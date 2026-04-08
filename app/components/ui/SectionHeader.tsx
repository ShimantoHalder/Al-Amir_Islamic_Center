import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
}

export function SectionHeader({ icon, title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-20">
      {/* Icon spacing */}
      <span className="inline-block text-4xl sm:text-5xl md:text-6xl mb-4 sm:mb-5">
        {icon}
      </span>
      
      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 sm:mt-4 tracking-wide">
        {title}
      </h2>
      
      {/* Subtitle spacing */}
      {subtitle && <div className="mt-4 sm:mt-5 md:mt-6">{subtitle}</div>}
      
      {/* Divider with consistent sizing */}
      <div className="section-divider mx-auto mt-4 sm:mt-5 md:mt-6 mb-6 sm:mb-7 md:mb-8" />
      
      {/* Description */}
      {description && (
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto px-3">
          {description}
        </p>
      )}
    </div>
  );
}
