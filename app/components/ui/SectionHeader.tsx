import React from 'react';

interface SectionHeaderProps {
  icon: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
}

export function SectionHeader({ icon, title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-10 sm:mb-12 md:mb-14">
      {/* Icon — 12-16px gap to heading */}
      <span className="inline-block text-4xl sm:text-5xl mb-3 sm:mb-4 leading-none">
        {icon}
      </span>

      {/* H2 heading */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight tracking-wide">
        {title}
      </h2>

      {/* Subtitle — 12-16px below heading */}
      {subtitle && <div className="mt-3 sm:mt-4">{subtitle}</div>}

      {/* Ornate divider — 12-16px gap each side */}
      <div className="section-divider mx-auto mt-4 mb-5 sm:mb-6" />

      {/* Description — 12px gap from divider */}
      {description && (
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto">
          {description}
        </p>
      )}
    </div>
  );
}
