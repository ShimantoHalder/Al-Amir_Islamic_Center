'use client';
import { useEffect, useState } from 'react';

function MosqueSVG() {
  return (
    <svg viewBox="0 0 400 200" className="w-full max-w-lg mx-auto opacity-90 float" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Main dome */}
      <ellipse cx="200" cy="110" rx="70" ry="65" fill="#1A315B" opacity="0.7"/>
      <path d="M130 110 Q200 30 270 110" fill="#276090" opacity="0.9"/>
      {/* Side domes */}
      <path d="M80 130 Q110 90 140 130" fill="#1A315B" opacity="0.8"/>
      <path d="M260 130 Q290 90 320 130" fill="#1A315B" opacity="0.8"/>
      {/* Minarets */}
      <rect x="60" y="80" width="16" height="80" rx="2" fill="#276090" opacity="0.8"/>
      <path d="M60 80 Q68 60 76 80" fill="#ac9861" opacity="0.9"/>
      <rect x="324" y="80" width="16" height="80" rx="2" fill="#276090" opacity="0.8"/>
      <path d="M324 80 Q332 60 340 80" fill="#ac9861" opacity="0.9"/>
      {/* Main building */}
      <rect x="100" y="130" width="200" height="30" rx="2" fill="#152140" opacity="0.95"/>
      {/* Arched windows */}
      <path d="M140 160 L140 140 Q150 130 160 140 L160 160Z" fill="#ac9861" opacity="0.5"/>
      <path d="M185 160 L185 140 Q195 130 205 140 L205 160Z" fill="#ac9861" opacity="0.5"/>
      <path d="M230 160 L230 140 Q240 130 250 140 L250 160Z" fill="#ac9861" opacity="0.5"/>
      {/* Stars */}
      <text x="68" y="78" fontSize="10" fill="#ac9861" opacity="0.9">★</text>
      <text x="332" y="78" fontSize="10" fill="#ac9861" opacity="0.9">★</text>
      {/* Crescent on main dome */}
      <text x="194" y="45" fontSize="16" fill="#ac9861" opacity="1">☪</text>
      {/* Ground */}
      <rect x="40" y="160" width="320" height="8" rx="4" fill="#276090" opacity="0.4"/>
    </svg>
  );
}

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
    <div className="absolute top-0 left-0 right-0 flex justify-between px-8 pointer-events-none overflow-hidden">
      {[
        { cls: 'lantern', offset: '10%' },
        { cls: 'lantern-2', offset: '50%' },
        { cls: 'lantern-3', offset: '85%' },
      ].map((l, i) => (
        <div key={i} className={`absolute ${l.cls}`} style={{ left: l.offset, top: 0 }}>
          <div className="w-0.5 h-10 mx-auto" style={{ backgroundColor: '#ac9861', opacity: 0.6 }} />
          <div className="w-6 h-8 rounded-b-full opacity-80 mx-auto shadow-lg" style={{ background: 'linear-gradient(to bottom, #ac9861, #8b7b5c)', boxShadow: '0 0 15px rgba(172,152,97,0.7)' }} />
        </div>
      ))}
    </div>
  );
}

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen gradient-animate flex flex-col items-center justify-center overflow-hidden px-3 sm:px-4"
    >
      <StarField />
      <Lanterns />

      {/* Content */}
      <div
        className={`relative z-10 text-center w-full flex flex-col items-center justify-center transition-all duration-1000 ${ visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* Arabic greeting */}
        <div className="text-base sm:text-xl md:text-2xl lg:text-3xl mb-2 sm:mb-3 font-light tracking-widest crescent text-accent leading-relaxed">
          ☪ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ☪
        </div>
        <p className="text-accent text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 opacity-80">
          In the name of Allah, the Most Gracious, the Most Merciful
        </p>

        <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 sm:mb-6 flex justify-center">
          <MosqueSVG />
        </div>

        <h1
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-white mt-2 sm:mt-3 md:mt-4 leading-tight px-2"
          style={{ textShadow: '0 0 40px rgba(26,49,91,0.6)' }}
        >
          Al-Amir
          <br />
          <span className="text-yellow-400">Islamic Center</span>
        </h1>

        <p className="text-gray-300 mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed px-2">
          Your home for worship, community & spiritual growth in{' '}
          <span className="text-accent font-medium">Florida, USA</span>.
          Join us for Salah, Jumu'ah & community events.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center mt-8 sm:mt-10 w-full px-4">
          <a
            href="#prayer-times"
            className="px-10 md:px-14 py-3.5 md:py-4 rounded-full font-semibold text-xs sm:text-sm text-white border border-blue-600 hover:bg-blue-900/40 transition-all duration-300 hover:scale-105 whitespace-nowrap"
          >
            🕌 Prayer Times
          </a>
          <a
            href="#contact"
            className="px-10 md:px-14 py-3.5 md:py-4 rounded-full font-semibold text-xs sm:text-sm text-black donate-btn whitespace-nowrap"
          >
            Contact Us
          </a>
        </div>

        {/* Jumu'ah badge */}
        <div className="mt-4 sm:mt-6 inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-blue-900/40 border border-blue-800/40 rounded-full px-3 sm:px-5 py-2 text-center">
          <div className="w-2 h-2 rounded-full bg-accent pulse-ring relative flex-shrink-0">
            <div className="absolute inset-0 rounded-full bg-accent" />
          </div>
          <span className="text-light text-xs sm:text-sm">
            Jumu'ah Khutbah — <span className="text-accent font-semibold">Every Friday at 1:15 PM</span>
          </span>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-50 animate-bounce">
        <div className="w-5 h-8 border-2 border-green-500 rounded-full flex justify-center pt-1">
          <div className="w-1 h-2 bg-green-400 rounded-full" />
        </div>
        <span className="text-green-500 text-xs">Scroll</span>
      </div>
    </section>
  );
}
