'use client';
import { useState, useEffect, useRef } from 'react';
import { SectionContainer, SectionHeader, Card } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

const values = [
  {
    icon: '📖',
    title: 'Quran & Education',
    desc: 'Weekly Quran classes, Islamic studies for all ages, and a dedicated Hifz program for youth.',
  },
  {
    icon: '🤝',
    title: 'Community Unity',
    desc: 'Bringing Muslim families together through events, Iftars, and meaningful community service.',
  },
  {
    icon: '🌙',
    title: 'Spiritual Growth',
    desc: 'Daily Salah in congregation, Friday Khutbahs, and Ramadan Tarawih prayers every night.',
  },
  {
    icon: '❤️',
    title: 'Charity & Zakat',
    desc: 'Organizing local food drives, Zakat distribution, and supporting families across South Florida.',
  },
];

const stats = [
  { num: '500+', label: 'Muslim Families' },
  { num: '15+',  label: 'Years of Service' },
  { num: '7',    label: 'Days a Week Open' },
  { num: '5',    label: 'Daily Prayers' },
];

/* Islamic 8-pointed star SVG */
function IslamicStar() {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
      <defs>
        <radialGradient id="starGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(201,168,76,0.25)" />
          <stop offset="100%" stopColor="rgba(201,168,76,0)" />
        </radialGradient>
      </defs>
      {/* Outer circles */}
      <circle cx="100" cy="100" r="90" stroke="rgba(201,168,76,0.12)" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="72" stroke="rgba(201,168,76,0.18)" strokeWidth="1" fill="none" />
      <circle cx="100" cy="100" r="50" stroke="rgba(201,168,76,0.1)" strokeWidth="1" fill="none" />
      {/* 8-pointed star */}
      <polygon
        points="100,14 113,65 164,52 131,92 180,105 129,118 142,169 100,136 58,169 71,118 20,105 69,92 36,52 87,65"
        stroke="rgba(201,168,76,0.55)"
        strokeWidth="1"
        fill="url(#starGrad)"
      />
      <polygon
        points="100,34 110,70 146,60 122,90 158,100 122,110 146,140 110,130 100,166 90,130 54,140 78,110 42,100 78,90 54,60 90,70"
        stroke="rgba(201,168,76,0.25)"
        strokeWidth="0.8"
        fill="none"
      />
      {/* Center crescent */}
      <text x="85" y="113" fontSize="32" fill="rgba(201,168,76,0.85)">☪</text>
      {/* Orbit dots */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad  = (deg * Math.PI) / 180;
        const cx   = Math.round((100 + Math.cos(rad) * 72) * 100) / 100;
        const cy   = Math.round((100 + Math.sin(rad) * 72) * 100) / 100;
        return (
          <circle key={deg} cx={cx} cy={cy} r="2.5" fill="rgba(201,168,76,0.6)" />
        );
      })}
    </svg>
  );
}

function AnimatedStat({ num, label }: { num: string; label: string }) {
  const ref     = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShow(true); obs.disconnect(); } },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center py-2">
      <div
        className={`text-accent font-bold text-2xl sm:text-3xl leading-none transition-all duration-700 ${
          show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {num}
      </div>
      <div className="text-gray-500 text-[11px] sm:text-xs mt-1.5 tracking-wide uppercase leading-tight">{label}</div>
    </div>
  );
}

export default function AboutSection() {
  const { ref: cardRef, visible: cardVisible } = useScrollReveal();
  const { ref: valueRef, visible: valueVisible } = useScrollReveal();

  return (
    <SectionContainer id="about" py="large" bg="gradient" pattern>
      <SectionHeader
        icon="☪"
        title={<>About <span className="text-accent">Al-Amir</span></>}
        description="Al-Amir Islamic Center is a vibrant Muslim community hub in South Florida, dedicated to worship, education, and serving our neighbors with sincerity and compassion."
      />

      {/* Mission + Visual */}
      <div
        ref={cardRef}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-stretch mb-10 sm:mb-12 md:mb-14"
      >
        {/* Mission card */}
        <div className={`reveal-left ${cardVisible ? 'visible' : ''}`}>
          <Card className="h-full">
            <h3 className="text-accent font-bold text-xl sm:text-2xl mb-4 tracking-wide">
              Our Mission
            </h3>
            {/* Prose — max-w-prose prevents lines too wide for readability */}
            <p className="text-gray-300 leading-relaxed text-sm sm:text-base mb-5 max-w-prose">
              To establish a house of Allah where every Muslim — new to Islam or born into the
              faith — finds a welcoming space for prayer, learning, and brotherhood. We serve the
              entire South Florida Muslim community with sincerity and love.
            </p>

            {/* Arabic quote */}
            <div className="bg-accent/8 border border-accent/20 rounded-xl p-4 sm:p-5 mb-5 text-center">
              <p className="font-arabic text-accent text-lg sm:text-xl leading-loose">
                وَأَنَّ الْمَسَاجِدَ لِلَّهِ فَلَا تَدْعُوا مَعَ اللَّهِ أَحَدًا
              </p>
              <p className="text-gray-500 text-xs sm:text-sm mt-3 italic">
                &quot;And the masjids are for Allah, so invoke not anyone along with Allah.&quot; — Quran 72:18
              </p>
            </div>

            {/* Stats — 2-col on mobile, 4-col on sm+ for readability */}
            <div className="border-t border-blue-800/30 pt-5 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <AnimatedStat key={s.label} num={s.num} label={s.label} />
              ))}
            </div>
          </Card>
        </div>

        {/* Islamic star visual */}
        <div className={`reveal-right ${cardVisible ? 'visible' : ''} flex items-center justify-center min-h-64 sm:min-h-72 md:min-h-80`}>
          <div className="relative w-56 sm:w-64 md:w-72 h-56 sm:h-64 md:h-72 crescent">
            <IslamicStar />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <div className="text-xs text-gray-600 mt-16 tracking-widest uppercase text-center">
                Est. Florida, USA
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Value cards — equal height via items-stretch, consistent 24px gap */}
      <div
        ref={valueRef}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
      >
        {values.map((v, i) => (
          <Card
            key={v.title}
            icon={v.icon}
            title={v.title}
            interactive
            className={`text-left h-full reveal reveal-delay-${i + 1} ${valueVisible ? 'visible' : ''}`}
          >
            <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
