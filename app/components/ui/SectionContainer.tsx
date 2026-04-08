import React from 'react';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  py?: 'small' | 'medium' | 'large';
  bg?: 'none' | 'gradient' | 'dark';
  pattern?: boolean;
}

export function SectionContainer({
  id,
  children,
  className = '',
  py = 'medium',
  bg = 'none',
  pattern = false,
}: SectionContainerProps) {
  // Consistent vertical spacing scale (80px - 120px between sections)
  const pyClasses = {
    small:  'py-16 sm:py-20 md:py-24 lg:py-28',
    medium: 'py-20 sm:py-28 md:py-32 lg:py-40',
    large:  'py-24 sm:py-32 md:py-40 lg:py-48',
  };

  const bgClasses = {
    none:     '',
    gradient: 'bg-gradient-to-b from-transparent via-blue-950/10 to-transparent',
    dark:     'bg-gradient-to-b from-black/20 via-blue-950/15 to-black/20',
  };

  return (
    <section
      id={id}
      className={`
        w-full flex flex-col items-center overflow-x-hidden
        px-4 sm:px-6 lg:px-8
        ${pyClasses[py]}
        ${bgClasses[bg]}
        ${pattern ? 'islamic-pattern-bg' : ''}
        section-glow-top
        ${className}
      `}
    >
      {/* Max-width container with consistent horizontal centering */}
      <div className="max-w-7xl mx-auto w-full">
        {children}
      </div>
    </section>
  );
}
