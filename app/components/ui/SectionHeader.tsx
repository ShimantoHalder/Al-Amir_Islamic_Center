import React from 'react';

interface SectionHeaderProps {
  icon?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  description?: string;
}

export function SectionHeader({ icon, title, subtitle, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-12 sm:mb-16 md:mb-20">
      {icon && (
        <span className="inline-block text-4xl sm:text-5xl mb-3 sm:mb-4 crescent">{icon}</span>
      )}
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-1 sm:mt-2 tracking-wide leading-tight">
        {title}
      </h2>

      {/* Ornate Islamic divider */}
      <div className="ornate-divider mt-4 sm:mt-5 mb-4 sm:mb-5 mx-auto max-w-xs">
        <span>✦</span>
        <span className="text-xs opacity-60">◆</span>
        <span>✦</span>
      </div>

      {subtitle && <div className="mt-2 sm:mt-3">{subtitle}</div>}

      {description && (
        <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-2 mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
