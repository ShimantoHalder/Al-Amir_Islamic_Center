'use client';
import React from 'react';
import { useAnimation } from '@/app/hooks';

function MosqueSVG() {
  return (
    <svg
      viewBox="0 0 520 240"
      className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl mx-auto float"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="domeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#276090" stopOpacity="1" />
          <stop offset="100%" stopColor="#1A315B" stopOpacity="1" />
        </linearGradient>
        <linearGradient id="wallGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1a2f52" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#0f1e35" stopOpacity="0.95" />
        </linearGradient>
        <linearGradient id="minaretGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e3a6e" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#276090" stopOpacity="0.9" />
        </linearGradient>
        <filter id="goldGlow">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Ground shadow */}
      <ellipse cx="260" cy="233" rx="220" ry="6" fill="#c9a84c" opacity="0.07" />

      {/* Ground base line */}
      <rect x="40" y="226" width="440" height="6" rx="3" fill="#1e3a6e" opacity="0.7" />

      {/* ── LEFT OUTER MINARET ── */}
      <rect x="52" y="68" width="16" height="160" rx="2" fill="url(#minaretGrad)" />
      <rect x="44" y="140" width="32" height="7" rx="1" fill="#c9a84c" opacity="0.5" />
      <rect x="47" y="110" width="26" height="5" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="49" y="82" width="22" height="4" rx="1" fill="#c9a84c" opacity="0.35" />
      <path d="M52 68 Q60 44 68 68" fill="#152140" opacity="0.95" />
      <path d="M56 44 Q60 28 64 44" fill="#c9a84c" opacity="0.85" />
      <circle cx="60" cy="25" r="2" fill="#c9a84c" opacity="0.9" filter="url(#goldGlow)" />
      <text x="55.5" y="28" fontSize="9" fill="#c9a84c" opacity="0.95">★</text>

      {/* ── RIGHT OUTER MINARET ── */}
      <rect x="452" y="68" width="16" height="160" rx="2" fill="url(#minaretGrad)" />
      <rect x="444" y="140" width="32" height="7" rx="1" fill="#c9a84c" opacity="0.5" />
      <rect x="447" y="110" width="26" height="5" rx="1" fill="#c9a84c" opacity="0.4" />
      <rect x="449" y="82" width="22" height="4" rx="1" fill="#c9a84c" opacity="0.35" />
      <path d="M452 68 Q460 44 468 68" fill="#152140" opacity="0.95" />
      <path d="M456 44 Q460 28 464 44" fill="#c9a84c" opacity="0.85" />
      <circle cx="460" cy="25" r="2" fill="#c9a84c" opacity="0.9" filter="url(#goldGlow)" />
      <text x="455.5" y="28" fontSize="9" fill="#c9a84c" opacity="0.95">★</text>

      {/* ── SMALL SIDE DOMES ── */}
      <path d="M105 174 Q132 122 159 174" fill="url(#domeGrad)" opacity="0.82" />
      <ellipse cx="132" cy="174" rx="28" ry="6" fill="#0f1e35" opacity="0.6" />
      <path d="M361 174 Q388 122 415 174" fill="url(#domeGrad)" opacity="0.82" />
      <ellipse cx="388" cy="174" rx="28" ry="6" fill="#0f1e35" opacity="0.6" />

      {/* ── INNER MINARETS ── */}
      <rect x="118" y="100" width="13" height="126" rx="2" fill="url(#minaretGrad)" opacity="0.85" />
      <rect x="113" y="148" width="23" height="5" rx="1" fill="#c9a84c" opacity="0.45" />
      <path d="M118 100 Q124.5 82 131 100" fill="#152140" opacity="0.9" />
      <path d="M121 82 Q124.5 68 128 82" fill="#c9a84c" opacity="0.75" />
      <text x="120" y="70" fontSize="8" fill="#c9a84c" opacity="0.85">★</text>

      <rect x="389" y="100" width="13" height="126" rx="2" fill="url(#minaretGrad)" opacity="0.85" />
      <rect x="384" y="148" width="23" height="5" rx="1" fill="#c9a84c" opacity="0.45" />
      <path d="M389 100 Q395.5 82 402 100" fill="#152140" opacity="0.9" />
      <path d="M392 82 Q395.5 68 399 82" fill="#c9a84c" opacity="0.75" />
      <text x="390" y="70" fontSize="8" fill="#c9a84c" opacity="0.85">★</text>

      {/* ── MAIN BODY ── */}
      <rect x="100" y="175" width="320" height="52" rx="3" fill="url(#wallGrad)" />

      {/* Arched windows on body */}
      {[130, 175, 230, 285, 340].map((x, i) => (
        <g key={i}>
          <path d={`M${x} 227 L${x} 192 Q${x + 13} 177 ${x + 26} 192 L${x + 26} 227Z`} fill="#0a1220" opacity="0.75" />
          <path d={`M${x + 5} 220 L${x + 5} 197 Q${x + 13} 185 ${x + 21} 197 L${x + 21} 220Z`} fill="none" stroke="#c9a84c" strokeWidth="0.5" opacity="0.3" />
        </g>
      ))}

      {/* Horizontal trim on body */}
      <rect x="100" y="178" width="320" height="4" rx="2" fill="#c9a84c" opacity="0.2" />

      {/* ── MAIN DOME ── */}
      <ellipse cx="260" cy="175" rx="85" ry="18" fill="#0f1e35" opacity="0.7" />
      <path d="M175 175 Q260 62 345 175" fill="url(#domeGrad)" opacity="0.95" />
      <path d="M195 175 Q260 85 325 175" fill="#1a2f52" opacity="0.35" />
      {/* Dome rib lines */}
      {[200, 230, 260, 290, 320].map((x, i) => (
        <line key={i} x1={x} y1="175" x2="260" y2={i === 2 ? 62 : 80} stroke="#c9a84c" strokeWidth="0.4" opacity="0.15" />
      ))}
      {/* Dome top finial */}
      <circle cx="260" cy="62" r="5" fill="none" stroke="#c9a84c" strokeWidth="1" opacity="0.7" />
      <circle cx="260" cy="62" r="2.5" fill="#c9a84c" opacity="0.9" />

      {/* ── CRESCENT & STAR ON DOME ── */}
      <text x="242" y="52" fontSize="20" fill="#c9a84c" opacity="1" filter="url(#goldGlow)">☪</text>

      {/* Decorative trim line */}
      <line x1="100" y1="175" x2="420" y2="175" stroke="#c9a84c" strokeWidth="1" opacity="0.25" />

      {/* Gold gate arch at center bottom */}
      <path d="M228 227 L228 200 Q260 182 292 200 L292 227Z" fill="#0a1220" opacity="0.9" />
      <path d="M232 227 L232 202 Q260 186 288 202 L288 227Z" fill="none" stroke="#c9a84c" strokeWidth="0.7" opacity="0.5" />
    </svg>
  );
}

function HeroContent() {
  const visible = useAnimation(150);

  return (
    <div
      className={`relative z-10 text-center w-full flex flex-col items-center justify-center transition-all duration-1000 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Bismillah */}
      <div
        className="font-arabic text-xl sm:text-2xl md:text-3xl mb-2 sm:mb-3 crescent leading-relaxed tracking-wide"
        style={{ color: '#c9a84c' }}
      >
        بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
      </div>
      <p className="text-accent text-xs sm:text-sm tracking-widest mb-5 sm:mb-7 opacity-75 font-light">
        In the name of Allah, the Most Gracious, the Most Merciful
      </p>

      {/* Mosque illustration — balanced max-width with generous vertical gap */}
      <div className="w-full mb-5 sm:mb-7 flex justify-center">
        <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md">
          <MosqueSVG />
        </div>
      </div>

      {/* Main title — hero intentionally larger than spec H1 for visual impact */}
      <h1
        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-wide px-4"
        style={{ textShadow: '0 0 60px rgba(26,49,91,0.8)' }}
      >
        Al-Amir
        <br />
        <span className="gold-text">Islamic Center</span>
      </h1>

      {/* Ornate divider */}
      <div className="ornate-divider mt-4 mb-4 w-40 sm:w-52 mx-auto">
        <span>✦</span>
        <span className="text-xs opacity-50">◆</span>
        <span>✦</span>
      </div>

      {/* Subtitle — body text, constrained line length for readability */}
      <p className="text-sm sm:text-base md:text-lg text-gray-300 max-w-lg mx-auto leading-relaxed px-4 sm:px-6">
        Your home for worship, community &amp; spiritual growth in{' '}
        <span className="text-accent font-semibold">South Florida, USA</span>.
        <br className="hidden sm:block" />
        Join us for Salah, Jumu&apos;ah &amp; community events.
      </p>

      {/* CTA Buttons — consistent gap, btn-base ensures uniform size */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mt-7 sm:mt-9 w-full px-4 max-w-xs sm:max-w-none mx-auto">
        <a
          href="#prayer-times"
          className="btn-base btn-secondary w-full sm:w-auto"
        >
          <span>🕌</span> Prayer Times
        </a>
        <a
          href="#contact"
          className="donate-btn btn-base w-full sm:w-auto"
        >
          <span>✉️</span> Contact Us
        </a>
      </div>

      {/* Jumu'ah live badge */}
      <div className="mt-7 sm:mt-9 inline-flex flex-col sm:flex-row items-center gap-3 glass-card rounded-full px-5 sm:px-6 py-3 text-center border border-accent/20">
        <div className="relative flex-shrink-0 w-3 h-3">
          <div className="w-full h-full rounded-full bg-accent pulse-ring absolute inset-0" />
          <div className="w-full h-full rounded-full bg-accent relative z-10" />
        </div>
        <span className="text-light text-xs sm:text-sm font-light">
          Jumu&apos;ah Khutbah —{' '}
          <span className="text-accent font-bold">Every Friday at 1:15 PM</span>
        </span>
      </div>
    </div>
  );
}

function StarField() {
  const [stars, setStars] = React.useState<
    Array<{ id: number; x: number; y: number; size: number; delay: number; brightness: number }>
  >([]);

  React.useEffect(() => {
    const generated = Array.from({ length: 65 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 65,
      size: Math.random() * 2.8 + 0.4,
      delay: Math.random() * 4,
      brightness: Math.random() * 0.6 + 0.4,
    }));
    setStars(generated);
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
            opacity: s.brightness,
            animationDelay: `${s.delay}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

function Lanterns() {
  const lanternData = [
    { cls: 'lantern',   left: '8%',  height: 'h-10 sm:h-14' },
    { cls: 'lantern-2', left: '48%', height: 'h-8  sm:h-12' },
    { cls: 'lantern-3', left: '85%', height: 'h-10 sm:h-14' },
  ];

  return (
    <div className="absolute top-0 left-0 right-0 pointer-events-none overflow-hidden">
      {lanternData.map((l, i) => (
        <div key={i} className={`absolute top-0 ${l.cls}`} style={{ left: l.left }}>
          {/* String */}
          <div
            className={`w-px ${l.height} mx-auto`}
            style={{ background: 'linear-gradient(to bottom, rgba(201,168,76,0.7), rgba(201,168,76,0.3))' }}
          />
          {/* Body */}
          <div
            className="w-5 sm:w-7 h-7 sm:h-9 rounded-b-full mx-auto"
            style={{
              background: 'linear-gradient(160deg, #e8c97a, #c9a84c, #9d7f34)',
              boxShadow: '0 0 18px rgba(201,168,76,0.7), 0 0 40px rgba(201,168,76,0.25)',
            }}
          />
          {/* Glow on floor */}
          <div
            className="w-8 sm:w-10 h-2 rounded-full mx-auto mt-0.5 blur-sm"
            style={{ background: 'radial-gradient(ellipse, rgba(201,168,76,0.35), transparent 80%)' }}
          />
        </div>
      ))}
    </div>
  );
}

/* Decorative geometric pattern in background */
function GeometricBg() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.04]">
      <svg viewBox="0 0 800 800" className="absolute -right-40 -top-40 w-2/3 max-w-2xl" fill="none">
        <circle cx="400" cy="400" r="350" stroke="#c9a84c" strokeWidth="1" />
        <circle cx="400" cy="400" r="280" stroke="#c9a84c" strokeWidth="1" />
        <circle cx="400" cy="400" r="200" stroke="#c9a84c" strokeWidth="1" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
          <line
            key={deg}
            x1={Math.round(400 + Math.cos(deg * Math.PI / 180) * 350)}
            y1={Math.round(400 + Math.sin(deg * Math.PI / 180) * 350)}
            x2={Math.round(400 + Math.cos((deg + 180) * Math.PI / 180) * 350)}
            y2={Math.round(400 + Math.sin((deg + 180) * Math.PI / 180) * 350)}
            stroke="#c9a84c" strokeWidth="0.6"
          />
        ))}
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen gradient-animate flex flex-col items-center justify-center overflow-hidden px-4 sm:px-6"
    >
      <StarField />
      <GeometricBg />
      <Lanterns />
      <HeroContent />

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 animate-bounce">
        <div className="w-5 h-8 border-2 border-accent/60 rounded-full flex justify-center pt-1.5">
          <div className="w-1 h-2.5 bg-accent rounded-full" />
        </div>
        <span className="text-accent text-xs tracking-widest font-light">SCROLL</span>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0b1422] to-transparent pointer-events-none" />
    </section>
  );
}
