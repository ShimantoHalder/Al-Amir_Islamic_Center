import { useEffect, useState } from 'react';

export function useAnimation(delay: number = 100) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return visible;
}
