'use client';
import { useEffect, useState } from 'react';
import { SectionContainer, SectionHeader, Card } from '@/app/components/ui';

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  icon: string;
}

async function fetchPrayerTimes(): Promise<PrayerTime[]> {
  try {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const res = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=Miami&country=US&method=2`
    );
    const data = await res.json();
    const t = data.data.timings;
    return [
      { name: 'Fajr', arabic: 'الفجر', time: t.Fajr, icon: '🌙' },
      { name: 'Sunrise', arabic: 'الشروق', time: t.Sunrise, icon: '🌅' },
      { name: 'Dhuhr', arabic: 'الظهر', time: t.Dhuhr, icon: '☀️' },
      { name: 'Asr', arabic: 'العصر', time: t.Asr, icon: '🌤' },
      { name: 'Maghrib', arabic: 'المغرب', time: t.Maghrib, icon: '🌇' },
      { name: 'Isha', arabic: 'العشاء', time: t.Isha, icon: '🌑' },
    ];
  } catch {
    return [
      { name: 'Fajr', arabic: 'الفجر', time: '5:42 AM', icon: '🌙' },
      { name: 'Sunrise', arabic: 'الشروق', time: '7:03 AM', icon: '🌅' },
      { name: 'Dhuhr', arabic: 'الظهر', time: '1:12 PM', icon: '☀️' },
      { name: 'Asr', arabic: 'العصر', time: '4:35 PM', icon: '🌤' },
      { name: 'Maghrib', arabic: 'المغرب', time: '7:22 PM', icon: '🌇' },
      { name: 'Isha', arabic: 'العشاء', time: '8:45 PM', icon: '🌑' },
    ];
  }
}

function getActivePrayer(prayers: PrayerTime[]): string {
  const now = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();

  const toMinutes = (t: string): number => {
    const clean = t.replace(/\s*(AM|PM)/i, '');
    const [h, m] = clean.split(':').map(Number);
    const isPM = t.toUpperCase().includes('PM');
    let hours = h;
    if (isPM && h !== 12) hours += 12;
    if (!isPM && h === 12) hours = 0;
    return hours * 60 + m;
  };

  let active = prayers[prayers.length - 1]?.name || '';
  for (let i = prayers.length - 1; i >= 0; i--) {
    if (prayers[i].name === 'Sunrise') continue;
    const pMin = toMinutes(prayers[i].time);
    if (nowMinutes >= pMin) {
      active = prayers[i].name;
      break;
    }
  }
  return active;
}

export default function PrayerTimesSection() {
  const [prayers, setPrayers] = useState<PrayerTime[]>([]);
  const [active, setActive] = useState('');
  const [loading, setLoading] = useState(true);
  const [dateStr, setDateStr] = useState('');

  useEffect(() => {
    fetchPrayerTimes().then((data) => {
      setPrayers(data);
      setActive(getActivePrayer(data));
      setLoading(false);
    });
    const now = new Date();
    setDateStr(
      now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    );
    const interval = setInterval(() => {
      setPrayers((prev) => {
        setActive(getActivePrayer(prev));
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer id="prayer-times" py="large">
      <SectionHeader
        icon="🕌"
        title={<>Prayer <span className="text-accent">Times</span></>}
        subtitle={
          <div>
            <p className="text-accent text-xs sm:text-sm">{dateStr || 'Loading date...'}</p>
            <p className="text-gray-400 text-xs">Miami / South Florida · Auto-updated daily</p>
          </div>
        }
      />

      {loading ? (
        <div className="flex justify-center items-center py-12 md:py-16">
          <div className="w-8 md:w-10 h-8 md:h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="ml-3 text-accent text-sm md:text-base">Fetching prayer times...</span>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 md:gap-4 mb-8 sm:mb-10 md:mb-12">
          {prayers.map((prayer) => (
            <Card
              key={prayer.name}
              icon={prayer.icon}
              className={`text-center p-3 sm:p-4 md:p-5 ${
                active === prayer.name ? 'active-prayer' : ''
              }`}
            >
              <div className="text-gray-400 text-xs mb-1 font-arabic">{prayer.arabic}</div>
              <div
                className={`font-bold text-xs md:text-sm mb-1 ${
                  active === prayer.name ? 'text-accent' : 'text-white'
                }`}
              >
                {prayer.name}
              </div>
              <div
                className={`text-sm md:text-base font-mono font-semibold ${
                  active === prayer.name ? 'text-accent' : 'text-blue-400'
                }`}
              >
                {prayer.time}
              </div>
              {active === prayer.name && (
                <div className="mt-1.5 text-xs text-accent font-medium animate-pulse">◉ Current</div>
              )}
            </Card>
          ))}
        </div>
      )}

      <div className="rounded-lg sm:rounded-xl md:rounded-2xl border border-accent/40 bg-accent/10 p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3 w-full sm:w-auto">
          <span className="text-2xl md:text-3xl">🕋</span>
          <div className="flex-1 sm:flex-none">
            <div className="text-accent font-bold text-base md:text-lg">Jumu'ah Prayer</div>
            <div className="text-gray-400 text-xs md:text-sm">Every Friday — Khutbah begins at 1:00 PM</div>
          </div>
        </div>
        <div className="text-center sm:text-right w-full sm:w-auto">
          <div className="text-white font-bold text-lg md:text-2xl">1:15 PM</div>
          <div className="text-accent text-xs">Iqamah time</div>
        </div>
      </div>
    </SectionContainer>
  );
}
