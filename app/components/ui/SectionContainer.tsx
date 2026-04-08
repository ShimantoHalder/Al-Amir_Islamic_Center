import React from 'react';

interface SectionContainerProps {
  id?: string;
  children: React.ReactNode;
  className?: string;
  py?: 'small' | 'medium' | 'large';
  bg?: 'none' | 'gradient' | 'dark';
}

export function SectionContainer({
  id,
  children,
  className = '',
  py = 'medium',
  bg = 'none',
}: SectionContainerProps) {
  const pyClasses = {
    small: 'py-8 sm:py-10 md:py-12',
    medium: 'py-12 sm:py-16 md:py-20 lg:py-28',
    large: 'py-16 sm:py-20 md:py-24 lg:py-32',
  };

  const bgClasses = {
    none: '',
    gradient: 'bg-gradient-to-b from-transparent to-green-950/20',
    dark: 'bg-blue-950/20',
  };

  return (
    <section
      id={id}
      className={`w-full flex flex-col items-center overflow-x-hidden px-3 sm:px-4 ${pyClasses[py]} ${bgClasses[bg]} ${className}`}
    >
      <div className="max-w-6xl mx-auto w-full px-2">
        {children}
      </div>
    </section>
  );
}
