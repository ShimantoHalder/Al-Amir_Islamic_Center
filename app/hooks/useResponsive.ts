import { useEffect, useState } from 'react';

type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export function useResponsive() {
  const [breakpoint, setBreakpoint] = useState<BreakPoint>('xs');

  useEffect(() => {
    const getBreakpoint = (): BreakPoint => {
      const width = window.innerWidth;
      if (width >= 1280) return 'xl';
      if (width >= 1024) return 'lg';
      if (width >= 768) return 'md';
      if (width >= 640) return 'sm';
      return 'xs';
    };

    const handleResize = () => setBreakpoint(getBreakpoint());
    setBreakpoint(getBreakpoint());
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    breakpoint,
    isMobile: breakpoint === 'xs',
    isTablet: breakpoint === 'sm' || breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl',
    is: (bp: BreakPoint) => breakpoint === bp,
    isAbove: (bp: BreakPoint) => {
      const bps: BreakPoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
      return bps.indexOf(breakpoint) >= bps.indexOf(bp);
    },
  };
}
