import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: string;
  subtitle?: React.ReactNode;
  description?: string;
}

export function SectionHeader({ icon, title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12 lg:mb-14">
      <span className="inline-block text-3xl sm:text-4xl md:text-5xl mb-2 sm:mb-3">{icon}</span>
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mt-2 sm:mt-3">
        {title}
      </h2>
      {subtitle && <div className="mt-2 sm:mt-3">{subtitle}</div>}
      <div className="section-divider mx-auto mt-3 sm:mt-4 mb-4 sm:mb-6" />
      {description && (
        <p className="text-gray-400 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed px-2">
          {description}
        </p>
      )}
    </div>
  );
}
