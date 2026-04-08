'use client';
import { useAnimation } from '@/app/hooks';
import { useEffect, useState } from 'react';

function StarField() {
  const [stars, setStars] = useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number }>
  >([]);

  useEffect(() => {
    const generatedStars = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 60,
      size: Math.random() * 2.5 + 0.5,
      delay: Math.random() * 3,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s) => (
        <div
          key={s.id}
          className="absolute rounded-full bg-white star"
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function Lanterns() {
  return (
    <div className="absolute top-0 left-0 right-0 flex justify-between px-4 sm:px-6 md:px-8 pointer-events-none overflow-hidden">
      {[
        { cls: 'lantern', offset: '10%' },
        { cls: 'lantern-2', offset: '50%' },
        { cls: 'lantern-3', offset: '85%' },
      ].map((l, i) => (
        <div key={i} className={`absolute ${l.cls}`} style={{ left: l.offset, top: 0 }}>
          <div className="w-0.5 h-8 sm:h-10 mx-auto" style={{ backgroundColor: '#ac9861', opacity: 0.6 }} />
          <div
            className="w-4 sm:w-6 h-6 sm:h-8 rounded-b-full opacity-80 mx-auto shadow-lg"
            style={{
              background: 'linear-gradient(to bottom, #ac9861, #8b7b5c)',
              boxShadow: '0 0 15px rgba(172,152,97,0.7)',
            }}
          />
        </div>
      ))}
    </div>
  );
}

export function HeroDecorations() {
  return (
    <>
      <StarField />
      <Lanterns />
    </>
  );
}
