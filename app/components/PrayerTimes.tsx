'use client';
import { useEffect, useState } from 'react';

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  icon: string;
}

// Fetch prayer times from Aladhan API for Doral, FL (Miami area)
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
    // Fallback times for Florida (approximate)
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

export default function PrayerTimes() {
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
    // Update active prayer every minute
    const interval = setInterval(() => {
      setPrayers((prev) => {
        setActive(getActivePrayer(prev));
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="prayer-times" className="py-16 md:py-28 px-3 sm:px-4 relative overflow-hidden w-full flex flex-col items-center pt-20 md:pt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%232e8b57' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")" }}
      />

      <div className="max-w-5xl mx-auto relative z-10 w-full">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-3xl md:text-4xl">🕌</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
            Prayer <span className="text-accent">Times</span>
          </h2>
          <div className="section-divider mx-auto mt-4 mb-6" />
          <p className="text-accent text-xs sm:text-sm mt-1">{dateStr || 'Loading date...'}</p>
          <p className="text-gray-400 text-xs mt-1">Miami / South Florida · Auto-updated daily</p>
        </div>

        {/* Prayer cards */}
        {loading ? (
          <div className="flex justify-center items-center py-12 md:py-16">
            <div className="w-8 md:w-10 h-8 md:h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <span className="ml-3 text-accent text-sm md:text-base">Fetching prayer times...</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-5 mb-10 md:mb-12">
            {prayers.map((prayer) => (
              <div
                key={prayer.name}
                className={`prayer-card rounded-lg md:rounded-2xl p-4 md:p-5 text-center ${
                  active === prayer.name ? 'active-prayer' : ''
                }`}
              >
                <div className="text-xl md:text-2xl mb-2">{prayer.icon}</div>
                <div className="text-gray-400 text-xs mb-1 font-arabic">{prayer.arabic}</div>
                <div className={`font-bold text-xs md:text-sm mb-1 ${active === prayer.name ? 'text-accent' : 'text-white'}`}>
                  {prayer.name}
                </div>
                <div className={`text-sm md:text-lg font-mono font-semibold ${active === prayer.name ? 'text-accent' : 'text-blue-400'}`}>
                  {prayer.time}
                </div>
                {active === prayer.name && (
                  <div className="mt-2 text-xs text-accent font-medium animate-pulse">
                    ◉ Current
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Jumu'ah highlight */}
        <div className="mt-8 md:mt-10 rounded-lg md:rounded-2xl border border-accent/40 bg-accent/10 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 md:gap-6">
          <div className="flex items-center gap-2 md:gap-3">
            <span className="text-2xl md:text-3xl">🕋</span>
            <div>
              <div className="text-accent font-bold text-base md:text-lg">Jumu'ah Prayer</div>
              <div className="text-gray-400 text-xs md:text-sm">Every Friday — Khutbah begins at 1:00 PM</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-white font-bold text-lg md:text-2xl">1:15 PM</div>
            <div className="text-accent text-xs">Iqamah time</div>
          </div>
        </div>
      </div>
    </section>
  );
}
