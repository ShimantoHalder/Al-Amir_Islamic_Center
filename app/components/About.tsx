'use client';
import { useState, useEffect } from 'react';

const values = [
  { icon: '📖', title: 'Quran & Education', desc: 'Weekly Quran classes, Islamic studies for all ages, and Hifz program for youth.' },
  { icon: '🤝', title: 'Community Unity', desc: 'Bringing Muslim families together through events, Iftars, and community service.' },
  { icon: '🌙', title: 'Spiritual Growth', desc: 'Daily Salah in congregation, Friday Khutbahs, and Ramadan Tarawih prayers.' },
  { icon: '❤️', title: 'Charity & Zakat', desc: 'Organizing local food drives, Zakat distribution, and supporting families in need.' },
];

export default function About() {
  const [orbitPositions, setOrbitPositions] = useState<Array<{ deg: number; top: number; left: number }>>([]);

  useEffect(() => {
    const positions = [0, 60, 120, 180, 240, 300].map((deg) => ({
      deg,
      top: 50 + Math.sin((deg * Math.PI) / 180) * 135,
      left: 50 + Math.cos((deg * Math.PI) / 180) * 135,
    }));
    setOrbitPositions(positions);
  }, []);

  return (
    <section id="about" className="py-16 md:py-28 px-3 sm:px-4 bg-gradient-to-b from-transparent to-green-950/20 w-full flex flex-col items-center">
      <div className="max-w-5xl mx-auto w-full px-2">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-3xl md:text-4xl text-accent">☪</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
            About <span className="text-accent">Our Masjid</span>
          </h2>
          <div className="section-divider mx-auto mt-4 mb-6" />
            <p className="text-gray-400 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed px-3">
            Al-Amir Islamic Center is a vibrant Muslim community hub in Florida, dedicated to
            worship, education, and serving our neighbors regardless of background.
          </p>
        </div>

        {/* Mission + Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-stretch mb-12 md:mb-16">
          {/* Left — Mission statement */}
          <div className="rounded-2xl md:rounded-3xl border border-blue-800/40 bg-blue-950/30 p-6 md:p-8 backdrop-blur">
            <h3 className="text-accent font-bold text-lg md:text-xl mb-5">Our Mission</h3>
            <p className="text-gray-300 leading-relaxed text-xs sm:text-sm mb-6">
              To establish a house of Allah where every Muslim — new to Islam or born into the faith —
              finds a welcoming space for prayer, learning, and brotherhood. We serve the entire
              South Florida Muslim community with sincerity and compassion.
            </p>
            <div className="border-t border-blue-800/30 pt-6 grid grid-cols-3 gap-4 md:gap-6 text-center">
              {[
                { num: '500+', label: 'Families' },
                { num: '15+', label: 'Years Serving' },
                { num: '7', label: 'Days / Week' },
              ].map((s) => (
                <div key={s.label}>
                  <div className="text-accent font-bold text-xl md:text-2xl">{s.num}</div>
                  <div className="text-gray-500 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Decorative */}
          <div className="flex items-center justify-center min-h-80 md:min-h-96">
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-72 md:h-72">
              <div className="absolute inset-0 rounded-full border-2 border-blue-700/30 flex items-center justify-center">
                <div className="absolute inset-0 rounded-full border border-accent/20 scale-110" />
                <div className="text-center z-10">
                  <div className="text-5xl sm:text-6xl md:text-7xl crescent">☪</div>
                  <div className="text-accent text-xs sm:text-sm mt-2 font-medium">Al-Amir Islamic Center</div>
                  <div className="text-gray-500 text-xs">Est. Florida, USA</div>
                </div>
              </div>
              {/* Orbiting dots */}
              {orbitPositions.map((pos) => (
                <div
                  key={pos.deg}
                  className="absolute w-2 h-2 rounded-full bg-accent/60"
                  style={{
                    top: `calc(50% + ${pos.top - 50}px)`,
                    left: `calc(50% + ${pos.left - 50}px)`,
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-xl md:rounded-2xl border border-blue-800/30 bg-blue-950/30 p-5 md:p-6 text-center hover:border-accent/40 hover:bg-blue-900/20 transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="text-2xl md:text-3xl mb-3">{v.icon}</div>
              <h4 className="text-white font-semibold text-xs sm:text-sm mb-2 group-hover:text-accent transition-colors">
                {v.title}
              </h4>
              <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
