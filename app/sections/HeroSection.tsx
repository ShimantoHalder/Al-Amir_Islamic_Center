'use client';
import { useAnimation } from '@/app/hooks';

function MosqueSVG() {
  return (
    <svg
      viewBox="0 0 400 200"
      className="w-full max-w-sm sm:max-w-md md:max-w-lg mx-auto opacity-90 float"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="200" cy="110" rx="70" ry="65" fill="#1A315B" opacity="0.7" />
      <path d="M130 110 Q200 30 270 110" fill="#276090" opacity="0.9" />
      <path d="M80 130 Q110 90 140 130" fill="#1A315B" opacity="0.8" />
      <path d="M260 130 Q290 90 320 130" fill="#1A315B" opacity="0.8" />
      <rect x="60" y="80" width="16" height="80" rx="2" fill="#276090" opacity="0.8" />
      <path d="M60 80 Q68 60 76 80" fill="#ac9861" opacity="0.9" />
      <rect x="324" y="80" width="16" height="80" rx="2" fill="#276090" opacity="0.8" />
      <path d="M324 80 Q332 60 340 80" fill="#ac9861" opacity="0.9" />
      <rect x="100" y="130" width="200" height="30" rx="2" fill="#152140" opacity="0.95" />
      <path d="M140 160 L140 140 Q150 130 160 140 L160 160Z" fill="#ac9861" opacity="0.5" />
      <path d="M185 160 L185 140 Q195 130 205 140 L205 160Z" fill="#ac9861" opacity="0.5" />
      <path d="M230 160 L230 140 Q240 130 250 140 L250 160Z" fill="#ac9861" opacity="0.5" />
      <text x="68" y="78" fontSize="10" fill="#ac9861" opacity="0.9">★</text>
      <text x="332" y="78" fontSize="10" fill="#ac9861" opacity="0.9">★</text>
      <text x="194" y="45" fontSize="16" fill="#ac9861" opacity="1">☪</text>
      <rect x="40" y="160" width="320" height="8" rx="4" fill="#276090" opacity="0.4" />
    </svg>
  );
}

export function HeroContent() {
  const visible = useAnimation(100);

  return (
    <div
      className={`relative z-10 text-center w-full flex flex-col items-center justify-center transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
    >
      <div className="text-sm sm:text-base md:text-xl lg:text-2xl mb-2 sm:mb-3 font-light tracking-widest crescent text-accent leading-relaxed">
        ☪ بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ ☪
      </div>
      <p className="text-accent text-xs sm:text-sm tracking-widest mb-4 sm:mb-6 opacity-80">
        In the name of Allah, the Most Gracious, the Most Merciful
      </p>

      <div className="w-full px-2 mb-4 sm:mb-6 flex justify-center">
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

      <p className="text-gray-300 mt-3 sm:mt-4 md:mt-5 text-xs sm:text-sm md:text-base lg:text-lg max-w-xl mx-auto leading-relaxed px-2">
        Your home for worship, community & spiritual growth in{' '}
        <span className="text-accent font-medium">Florida, USA</span>.
        Join us for Salah, Jumu'ah & community events.
      </p>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center mt-6 sm:mt-8 md:mt-10 w-full px-4">
        <a
          href="#prayer-times"
          className="px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-white border border-blue-600 hover:bg-blue-900/40 transition-all duration-300 hover:scale-105 whitespace-nowrap"
        >
          🕌 Prayer Times
        </a>
        <a
          href="#contact"
          className="px-8 sm:px-10 md:px-12 py-2.5 sm:py-3 md:py-3.5 rounded-full font-semibold text-xs sm:text-sm text-black donate-btn whitespace-nowrap"
        >
          Contact Us
        </a>
      </div>

      <div className="mt-4 sm:mt-6 inline-flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-blue-900/40 border border-blue-800/40 rounded-full px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 text-center">
        <div className="w-2 h-2 rounded-full bg-accent pulse-ring relative flex-shrink-0">
          <div className="absolute inset-0 rounded-full bg-accent" />
        </div>
        <span className="text-light text-xs sm:text-sm">
          Jumu'ah Khutbah — <span className="text-accent font-semibold">Every Friday at 1:15 PM</span>
        </span>
      </div>
    </div>
  );
}
