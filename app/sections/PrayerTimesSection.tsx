'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { SectionContainer, SectionHeader } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

interface PrayerTime {
  name: string;
  arabic: string;
  time24: string;      // "HH:MM" 24-hour — used for math only
  timeDisplay: string; // "H:MM AM/PM"    — shown to user
  icon: string;
}

interface HijriDate {
  day: string;
  month: string;
  year: string;
}

// ─── Florida / Eastern timezone helpers ──────────────────────────────────────

/**
 * Returns a plain Date whose .getHours()/.getMinutes() equal the current
 * Eastern time (handles DST automatically via Intl).
 */
function getEasternNow(): Date {
  const str = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  return new Date(str);
}

function getEasternDateString(): string {
  return new Date().toLocaleDateString('en-US', {
    timeZone: 'America/New_York',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

/** Milliseconds until the next midnight in Eastern time (+500 ms buffer). */
function msUntilMidnightEastern(): number {
  const et      = getEasternNow();
  const elapsed = (et.getHours() * 3600 + et.getMinutes() * 60 + et.getSeconds()) * 1000;
  return 24 * 60 * 60 * 1000 - elapsed + 500;
}

// ─── Time format helpers ──────────────────────────────────────────────────────

/**
 * Strip any trailing timezone label the API sometimes appends, e.g. " (EDT)".
 * Returns a clean "HH:MM" string.
 */
function cleanTime(raw: string): string {
  return raw.split(' ')[0].trim();
}

/** Parse "HH:MM" (24-hour) → total minutes since midnight. */
function toMinutes(time24: string): number {
  const [h, m] = cleanTime(time24).split(':').map(Number);
  return (h || 0) * 60 + (m || 0);
}

/** Convert "HH:MM" (24-hour) → "H:MM AM/PM". */
function fmt12(raw: string): string {
  const [hStr, mStr] = cleanTime(raw).split(':');
  let   h  = parseInt(hStr, 10);
  const m  = mStr ?? '00';
  const p  = h >= 12 ? 'PM' : 'AM';
  if (h > 12)     h -= 12;
  else if (h === 0) h = 12;
  return `${h}:${m} ${p}`;
}

// ─── Fallback times (Jacksonville, FL — approximate) ─────────────────────────

const FALLBACK: PrayerTime[] = [
  { name: 'Fajr',    arabic: 'الفجر',  time24: '05:42', timeDisplay: '5:42 AM',  icon: '🌙' },
  { name: 'Sunrise', arabic: 'الشروق', time24: '07:03', timeDisplay: '7:03 AM',  icon: '🌅' },
  { name: 'Dhuhr',   arabic: 'الظهر',  time24: '13:12', timeDisplay: '1:12 PM',  icon: '☀️' },
  { name: 'Asr',     arabic: 'العصر',  time24: '16:35', timeDisplay: '4:35 PM',  icon: '🌤' },
  { name: 'Maghrib', arabic: 'المغرب', time24: '19:22', timeDisplay: '7:22 PM',  icon: '🌇' },
  { name: 'Isha',    arabic: 'العشاء', time24: '20:45', timeDisplay: '8:45 PM',  icon: '🌑' },
];

// ─── API fetch ────────────────────────────────────────────────────────────────

async function fetchPrayerTimes(): Promise<{
  prayers: PrayerTime[];
  hijri: HijriDate | null;
  fromAPI: boolean;
}> {
  try {
    // Use today's date in Eastern time (so it is always correct for Florida,
    // even for visitors whose browser clock is in a different timezone).
    const et    = getEasternNow();
    const day   = et.getDate();
    const month = et.getMonth() + 1;
    const year  = et.getFullYear();

    // Exact coordinates of Al-Amir Islamic Center (Jacksonville, FL)
    // Method 2 = ISNA (standard for North America)
    const url =
      `https://api.aladhan.com/v1/timings/${day}-${month}-${year}` +
      `?latitude=30.398719&longitude=-81.729269&method=2&school=0`;

    const res = await fetch(url, { cache: 'no-store' });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();
    const t    = data.data.timings as Record<string, string>;
    const h    = data.data.date?.hijri;

    const prayers: PrayerTime[] = [
      { name: 'Fajr',    arabic: 'الفجر',  time24: cleanTime(t.Fajr),    timeDisplay: fmt12(t.Fajr),    icon: '🌙' },
      { name: 'Sunrise', arabic: 'الشروق', time24: cleanTime(t.Sunrise), timeDisplay: fmt12(t.Sunrise), icon: '🌅' },
      { name: 'Dhuhr',   arabic: 'الظهر',  time24: cleanTime(t.Dhuhr),   timeDisplay: fmt12(t.Dhuhr),   icon: '☀️' },
      { name: 'Asr',     arabic: 'العصر',  time24: cleanTime(t.Asr),     timeDisplay: fmt12(t.Asr),     icon: '🌤' },
      { name: 'Maghrib', arabic: 'المغرب', time24: cleanTime(t.Maghrib), timeDisplay: fmt12(t.Maghrib), icon: '🌇' },
      { name: 'Isha',    arabic: 'العشاء', time24: cleanTime(t.Isha),    timeDisplay: fmt12(t.Isha),    icon: '🌑' },
    ];

    const hijri: HijriDate | null = h
      ? { day: h.day, month: h.month.en, year: h.year }
      : null;

    return { prayers, hijri, fromAPI: true };
  } catch {
    return { prayers: FALLBACK, hijri: null, fromAPI: false };
  }
}

// ─── Active / next prayer (all comparisons in Eastern time) ──────────────────

function getActive(prayers: PrayerTime[]): string {
  const et         = getEasternNow();
  const nowMinutes = et.getHours() * 60 + et.getMinutes();
  const salah      = prayers.filter((p) => p.name !== 'Sunrise');
  let   active     = salah[salah.length - 1]?.name ?? '';
  for (let i = salah.length - 1; i >= 0; i--) {
    if (nowMinutes >= toMinutes(salah[i].time24)) {
      active = salah[i].name;
      break;
    }
  }
  return active;
}

function getNext(prayers: PrayerTime[]): { name: string; countdown: string } {
  const et         = getEasternNow();
  const nowMinutes = et.getHours() * 60 + et.getMinutes();
  const salah      = prayers.filter((p) => p.name !== 'Sunrise');
  for (const p of salah) {
    const diff = toMinutes(p.time24) - nowMinutes;
    if (diff > 0) {
      const h = Math.floor(diff / 60);
      const m = diff % 60;
      return { name: p.name, countdown: h > 0 ? `${h}h ${m}m` : `${m}m` };
    }
  }
  // Past Isha — count down to tomorrow's Fajr
  const diff = 1440 - nowMinutes + toMinutes(salah[0].time24);
  const h    = Math.floor(diff / 60);
  const m    = diff % 60;
  return { name: salah[0].name, countdown: h > 0 ? `${h}h ${m}m` : `${m}m` };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function PrayerTimesSection() {
  const [prayers,  setPrayers]  = useState<PrayerTime[]>([]);
  const [active,   setActive]   = useState('');
  const [loading,  setLoading]  = useState(true);
  const [fromAPI,  setFromAPI]  = useState(true);
  const [dateStr,  setDateStr]  = useState('');
  const [hijri,    setHijri]    = useState<HijriDate | null>(null);
  const [nextInfo, setNextInfo] = useState<{ name: string; countdown: string } | null>(null);
  const midnightTimer           = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { ref, visible }        = useScrollReveal();

  const load = useCallback(async () => {
    setLoading(true);
    const { prayers: data, hijri: h, fromAPI: ok } = await fetchPrayerTimes();
    setPrayers(data);
    setActive(getActive(data));
    setNextInfo(getNext(data));
    setHijri(h);
    setDateStr(getEasternDateString());
    setFromAPI(ok);
    setLoading(false);
  }, []);

  useEffect(() => {
    // 1. Fetch on mount
    load();
    setDateStr(getEasternDateString());

    // 2. Tick every minute: update active prayer + countdown in Eastern time
    const tick = setInterval(() => {
      setPrayers((prev) => {
        if (prev.length) {
          setActive(getActive(prev));
          setNextInfo(getNext(prev));
        }
        return prev;
      });
      setDateStr(getEasternDateString());
    }, 60_000);

    // 3. Re-fetch at Eastern midnight so the new day's accurate times load
    //    automatically — no manual input ever needed.
    const scheduleMidnight = () => {
      midnightTimer.current = setTimeout(() => {
        load();
        scheduleMidnight(); // re-arm for the following day
      }, msUntilMidnightEastern());
    };
    scheduleMidnight();

    return () => {
      clearInterval(tick);
      if (midnightTimer.current) clearTimeout(midnightTimer.current);
    };
  }, [load]);

  return (
    <SectionContainer id="prayer-times" py="large" bg="gradient" pattern>
      <SectionHeader
        icon="🕌"
        title={<>Prayer <span className="text-accent">Times</span></>}
        subtitle={
          <div className="flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 flex-wrap">
            <p className="text-accent text-sm sm:text-base font-medium">{dateStr || 'Loading…'}</p>
            {hijri && <span className="text-gray-500 hidden sm:inline">·</span>}
            {hijri && (
              <p className="font-arabic text-accent/70 text-sm">
                {hijri.day} {hijri.month} {hijri.year} AH
              </p>
            )}
            <span className="text-gray-500 hidden sm:inline">·</span>
            <p className="text-gray-500 text-xs">Jacksonville, FL · Eastern Time · Auto-updated daily</p>
          </div>
        }
      />

      {/* API error warning with retry */}
      {!loading && !fromAPI && (
        <div className="mb-5 flex items-center gap-3 rounded-xl border border-yellow-700/30 bg-yellow-950/20 px-4 py-3 text-yellow-400/90 text-sm">
          <span className="flex-shrink-0 text-base">⚠️</span>
          <span className="flex-1">Showing estimated times — live data temporarily unavailable.</span>
          <button
            onClick={load}
            className="text-xs underline opacity-70 hover:opacity-100 whitespace-nowrap flex-shrink-0 transition-opacity"
          >
            Retry
          </button>
        </div>
      )}

      {/* Next prayer countdown banner */}
      {!loading && nextInfo && (
        <div className="mb-6 sm:mb-8 glass-card rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-3 border border-accent/20">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-accent pulse-ring" />
            </div>
            <span className="text-gray-300 text-sm sm:text-base">
              Next prayer: <span className="text-white font-bold">{nextInfo.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 uppercase tracking-widest">In</span>
            <span className="text-accent font-bold text-2xl sm:text-3xl font-mono">{nextInfo.countdown}</span>
          </div>
        </div>
      )}

      {/* Prayer cards — 5 main prayers */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
          <span className="ml-5 text-accent text-sm font-medium">Fetching today&apos;s prayer times…</span>
        </div>
      ) : (
        <div
          ref={ref}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 mb-8 sm:mb-10 w-full"
        >
          {prayers.filter((p) => p.name !== 'Sunrise').map((prayer, i) => (
            <div
              key={prayer.name}
              className={`prayer-card rounded-xl sm:rounded-2xl text-center p-4 sm:p-5 flex flex-col items-center ${
                active === prayer.name ? 'active-prayer' : ''
              } reveal reveal-delay-${Math.min(i + 1, 5)} ${visible ? 'visible' : ''}`}
            >
              {/* Icon */}
              <div className="text-2xl sm:text-3xl mb-2 leading-none">{prayer.icon}</div>
              {/* Arabic name */}
              <div className="font-arabic text-gray-500 text-xs sm:text-sm mb-1 leading-snug">
                {prayer.arabic}
              </div>
              {/* English name */}
              <div className={`font-bold text-sm sm:text-base mb-2 tracking-wide ${
                active === prayer.name ? 'text-accent' : 'text-white'
              }`}>
                {prayer.name}
              </div>
              {/* Time — most prominent element */}
              <div className={`text-base sm:text-lg font-mono font-bold leading-none ${
                active === prayer.name ? 'text-accent' : 'text-blue-200'
              }`}>
                {prayer.timeDisplay}
              </div>
              {active === prayer.name && (
                <div className="mt-2 text-xs text-accent font-semibold animate-pulse flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent inline-block" />
                  Now
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Jumu'ah banner */}
      <div className="rounded-2xl border border-accent/35 bg-gradient-to-r from-accent/10 via-accent/5 to-accent/10 p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shimmer-effect w-full">
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
