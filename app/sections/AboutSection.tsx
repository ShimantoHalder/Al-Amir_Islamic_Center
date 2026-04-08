'use client';
import { useState, useEffect } from 'react';
import { SectionContainer, SectionHeader, Card } from '@/app/components/ui';

const values = [
  {
    icon: '📖',
    title: 'Quran & Education',
    desc: 'Weekly Quran classes, Islamic studies for all ages, and Hifz program for youth.',
  },
  {
    icon: '🤝',
    title: 'Community Unity',
    desc: 'Bringing Muslim families together through events, Iftars, and community service.',
  },
  {
    icon: '🌙',
    title: 'Spiritual Growth',
    desc: 'Daily Salah in congregation, Friday Khutbahs, and Ramadan Tarawih prayers.',
  },
  {
    icon: '❤️',
    title: 'Charity & Zakat',
    desc: 'Organizing local food drives, Zakat distribution, and supporting families in need.',
  },
];

export default function AboutSection() {
  const [orbitPositions, setOrbitPositions] = useState<
    Array<{ deg: number; top: number; left: number }>
  >([]);

  useEffect(() => {
    const positions = [0, 60, 120, 180, 240, 300].map((deg) => ({
      deg,
      top: 50 + Math.sin((deg * Math.PI) / 180) * 135,
      left: 50 + Math.cos((deg * Math.PI) / 180) * 135,
    }));
    setOrbitPositions(positions);
  }, []);

  return (
    <SectionContainer id="about" py="large" bg="gradient">
      <SectionHeader
        icon="☪"
        title={<>About <span className="text-accent">Our Masjid</span></>}
        description="Al-Amir Islamic Center is a vibrant Muslim community hub in Florida, dedicated to worship, education, and serving our neighbors regardless of background."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-stretch mb-10 sm:mb-12 md:mb-16">
        <Card className="p-5 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl">
          <h3 className="text-accent font-bold text-lg md:text-xl mb-4 md:mb-5">Our Mission</h3>
          <p className="text-gray-300 leading-relaxed text-xs sm:text-sm mb-5 md:mb-6">
            To establish a house of Allah where every Muslim — new to Islam or born into the faith — finds a
            welcoming space for prayer, learning, and brotherhood. We serve the entire South Florida Muslim
            community with sincerity and compassion.
          </p>
          <div className="border-t border-blue-800/30 pt-5 md:pt-6 grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 text-center">
            {[
              { num: '500+', label: 'Families' },
              { num: '15+', label: 'Years' },
              { num: '7', label: 'Days/Week' },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-accent font-bold text-lg md:text-2xl">{s.num}</div>
                <div className="text-gray-500 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </Card>

        <div className="flex items-center justify-center min-h-64 sm:min-h-80 md:min-h-96">
          <div className="relative w-48 sm:w-56 md:w-64 h-48 sm:h-56 md:h-64">
            <div className="absolute inset-0 rounded-full border-2 border-blue-700/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-accent/20 scale-110" />
              <div className="text-center z-10">
                <div className="text-4xl sm:text-5xl md:text-6xl crescent">☪</div>
                <div className="text-accent text-xs sm:text-sm mt-2 font-medium">Al-Amir Islamic Center</div>
                <div className="text-gray-500 text-xs">Est. Florida, USA</div>
              </div>
            </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {values.map((v) => (
          <Card key={v.title} icon={v.icon} title={v.title} interactive className="text-center">
            <p className="text-gray-400 text-xs leading-relaxed">{v.desc}</p>
          </Card>
        ))}
      </div>
    </SectionContainer>
  );
}
