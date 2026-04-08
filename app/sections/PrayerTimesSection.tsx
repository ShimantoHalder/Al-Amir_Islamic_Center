'use client';
import { useEffect, useState } from 'react';
import { SectionContainer, SectionHeader, Card } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

interface PrayerTime {
  name: string;
  arabic: string;
  time: string;
  icon: string;
}

interface HijriDate {
  day: string;
  month: string;
  year: string;
}

async function fetchPrayerTimes(): Promise<{ prayers: PrayerTime[]; hijri: HijriDate | null }> {
  try {
    const today = new Date();
    const day   = today.getDate();
    const month = today.getMonth() + 1;
    const year  = today.getFullYear();
    const res  = await fetch(
      `https://api.aladhan.com/v1/timingsByCity/${day}-${month}-${year}?city=Miami&country=US&method=2`
    );
    const data = await res.json();
    const t    = data.data.timings;
    const h    = data.data.date?.hijri;
    const prayers: PrayerTime[] = [
      { name: 'Fajr',    arabic: 'الفجر',  time: t.Fajr,    icon: '🌙' },
      { name: 'Sunrise', arabic: 'الشروق', time: t.Sunrise, icon: '🌅' },
      { name: 'Dhuhr',   arabic: 'الظهر',  time: t.Dhuhr,   icon: '☀️' },
      { name: 'Asr',     arabic: 'العصر',  time: t.Asr,     icon: '🌤' },
      { name: 'Maghrib', arabic: 'المغرب', time: t.Maghrib, icon: '🌇' },
      { name: 'Isha',    arabic: 'العشاء', time: t.Isha,    icon: '🌑' },
    ];
    const hijri: HijriDate | null = h
      ? { day: h.day, month: h.month.en, year: h.year }
      : null;
    return { prayers, hijri };
  } catch {
    return {
      prayers: [
        { name: 'Fajr',    arabic: 'الفجر',  time: '5:42 AM', icon: '🌙' },
        { name: 'Sunrise', arabic: 'الشروق', time: '7:03 AM', icon: '🌅' },
        { name: 'Dhuhr',   arabic: 'الظهر',  time: '1:12 PM', icon: '☀️' },
        { name: 'Asr',     arabic: 'العصر',  time: '4:35 PM', icon: '🌤' },
        { name: 'Maghrib', arabic: 'المغرب', time: '7:22 PM', icon: '🌇' },
        { name: 'Isha',    arabic: 'العشاء', time: '8:45 PM', icon: '🌑' },
      ],
      hijri: null,
    };
  }
}

function toMinutes(t: string): number {
  const clean = t.replace(/\s*(AM|PM)/i, '');
  const [h, m] = clean.split(':').map(Number);
  const isPM   = t.toUpperCase().includes('PM');
  let hours    = h;
  if (isPM && h !== 12) hours += 12;
  if (!isPM && h === 12) hours = 0;
  return hours * 60 + m;
}

function getActivePrayer(prayers: PrayerTime[]): string {
  const now        = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  let active       = prayers[prayers.length - 1]?.name || '';
  for (let i = prayers.length - 1; i >= 0; i--) {
    if (prayers[i].name === 'Sunrise') continue;
    if (nowMinutes >= toMinutes(prayers[i].time)) {
      active = prayers[i].name;
      break;
    }
  }
  return active;
}

function getNextPrayer(prayers: PrayerTime[]): { name: string; countdown: string } {
  const now        = new Date();
  const nowMinutes = now.getHours() * 60 + now.getMinutes();
  const prayerList = prayers.filter((p) => p.name !== 'Sunrise');
  for (const p of prayerList) {
    const pMin = toMinutes(p.time);
    if (pMin > nowMinutes) {
      const diff = pMin - nowMinutes;
      const h    = Math.floor(diff / 60);
      const m    = diff % 60;
      return {
        name: p.name,
        countdown: h > 0 ? `${h}h ${m}m` : `${m}m`,
      };
    }
  }
  const fajr = prayerList[0];
  const diff = 1440 - nowMinutes + toMinutes(fajr.time);
  const h    = Math.floor(diff / 60);
  const m    = diff % 60;
  return { name: fajr.name, countdown: h > 0 ? `${h}h ${m}m` : `${m}m` };
}

export default function PrayerTimesSection() {
  const [prayers,  setPrayers]  = useState<PrayerTime[]>([]);
  const [active,   setActive]   = useState('');
  const [loading,  setLoading]  = useState(true);
  const [dateStr,  setDateStr]  = useState('');
  const [hijri,    setHijri]    = useState<HijriDate | null>(null);
  const [nextInfo, setNextInfo] = useState<{ name: string; countdown: string } | null>(null);
  const { ref, visible } = useScrollReveal();

  useEffect(() => {
    fetchPrayerTimes().then(({ prayers: data, hijri: h }) => {
      setPrayers(data);
      setActive(getActivePrayer(data));
      setNextInfo(getNextPrayer(data));
      setHijri(h);
      setLoading(false);
    });
    const now = new Date();
    setDateStr(
      now.toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
      })
    );
    const interval = setInterval(() => {
      setPrayers((prev) => {
        setActive(getActivePrayer(prev));
        setNextInfo(getNextPrayer(prev));
        return prev;
      });
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer id="prayer-times" py="large" bg="gradient" pattern>
      <SectionHeader
        icon="🕌"
        title={<>Prayer <span className="text-accent">Times</span></>}
        subtitle={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3">
            <p className="text-accent text-sm sm:text-base font-medium">{dateStr || 'Loading...'}</p>
            {hijri && (
              <span className="text-gray-500 hidden sm:inline">·</span>
            )}
            {hijri && (
              <p className="font-arabic text-accent/70 text-sm">
                {hijri.day} {hijri.month} {hijri.year} AH
              </p>
            )}
            <span className="text-gray-500 hidden sm:inline">·</span>
            <p className="text-gray-500 text-xs">Miami / South Florida · Auto-updated</p>
          </div>
        }
      />

      {/* Next prayer countdown banner */}
      {!loading && nextInfo && (
        <div className="mb-8 sm:mb-10 glass-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-accent pulse-ring" />
            </div>
            <span className="text-gray-300 text-sm">
              Next prayer: <span className="text-white font-bold">{nextInfo.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest">In</span>
            <span className="text-accent font-bold text-xl sm:text-2xl font-mono">{nextInfo.countdown}</span>
          </div>
        </div>
      )}

      {/* Prayer cards - 5 Main Prayers */}
      {loading ? (
        <div className="flex justify-center items-center py-20 md:py-24">
          <div className="w-12 h-12 border-3 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="ml-6 text-accent text-base font-medium">Fetching prayer times for Miami...</span>
        </div>
      ) : prayers.length > 0 ? (
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-12 sm:mb-14 md:mb-16 w-full"
        >
          {prayers.filter((prayer) => prayer.name !== 'Sunrise').map((prayer, i) => (
            <div
              key={prayer.name}
              className={`prayer-card rounded-xl sm:rounded-2xl md:rounded-2xl lg:rounded-3xl text-center p-3 sm:p-4 md:p-5 ${
                active === prayer.name ? 'active-prayer' : ''
              } reveal reveal-delay-${Math.min(i + 1, 5)} ${visible ? 'visible' : ''}`}
            >
              <div className="text-xl sm:text-2xl md:text-3xl mb-1.5 sm:mb-2 md:mb-3 leading-none">{prayer.icon}</div>
              <div className="font-arabic text-gray-500 text-xs mb-0.5 leading-none">{prayer.arabic}</div>
              <div className={`font-bold text-xs sm:text-xs md:text-sm mb-1 tracking-wide ${active === prayer.name ? 'text-accent' : 'text-white'}`}>
                {prayer.name}
              </div>
              <div className={`text-xs sm:text-sm md:text-base font-mono font-semibold ${active === prayer.name ? 'text-accent' : 'text-blue-300'}`}>
                {prayer.time}
              </div>
              {active === prayer.name && (
                <div className="mt-1 text-xs text-accent font-medium animate-pulse flex items-center justify-center gap-0.5">
                  <span className="w-1 h-1 rounded-full bg-accent inline-block" />
                  Now
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 md:py-24">
          <p className="text-accent text-lg font-medium">Prayer times for Miami, Florida</p>
          <p className="text-gray-500 text-base mt-3">All times automatically updated</p>
        </div>
      )}

      {/* Jumu'ah banner */}
      <div className="rounded-2xl md:rounded-3xl border border-accent/35 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 p-6 sm:p-7 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shimmer-effect w-full">
        <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
          <span className="text-3xl sm:text-4xl flex-shrink-0">🕋</span>
          <div>
            <div className="text-accent font-bold text-base sm:text-lg md:text-xl tracking-wide">
              Jumu&apos;ah Prayer
            </div>
            <div className="text-gray-400 text-xs sm:text-sm mt-0.5">
              Every Friday — Khutbah begins at 1:00 PM
            </div>
          </div>
        </div>
        <div className="text-center sm:text-right flex-shrink-0">
          <div className="text-white font-bold text-2xl sm:text-3xl">1:15 PM</div>
          <div className="text-accent text-xs tracking-widest uppercase mt-0.5">Iqamah</div>
        </div>
      </div>
    </SectionContainer>
  );
}
