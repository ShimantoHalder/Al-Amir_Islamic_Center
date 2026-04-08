'use client';
import { SectionContainer } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

const DONATION_FORM_URL = 'https://forms.google.com/';

const tiers = [
  {
    icon: '🌱',
    label: 'Sadaqah',
    desc: 'Any amount for daily upkeep & operations',
    amount: 'Any',
  },
  {
    icon: '🌟',
    label: 'Zakat',
    desc: 'Fulfil your annual Zakat obligation',
    amount: '2.5%',
  },
  {
    icon: '🏛️',
    label: "Masjid Fund",
    desc: 'Support our building & renovation costs',
    amount: '$100+',
  },
];

/* Decorative geometric SVG */
function GeometricOrnament() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.06]">
      <svg viewBox="0 0 600 600" className="absolute -left-24 -bottom-24 w-96 h-96" fill="none">
        <circle cx="300" cy="300" r="260" stroke="#c9a84c" strokeWidth="1.5" />
        <circle cx="300" cy="300" r="200" stroke="#c9a84c" strokeWidth="1" />
        <circle cx="300" cy="300" r="140" stroke="#c9a84c" strokeWidth="1" />
        {[0,45,90,135,180,225,270,315].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={300 + Math.cos(r) * 260}
              y1={300 + Math.sin(r) * 260}
              x2={300 - Math.cos(r) * 260}
              y2={300 - Math.sin(r) * 260}
              stroke="#c9a84c" strokeWidth="0.7"
            />
          );
        })}
        <polygon
          points="300,40 360,200 540,200 400,300 460,460 300,360 140,460 200,300 60,200 240,200"
          stroke="#c9a84c" strokeWidth="1.5" fill="none"
        />
      </svg>
      <svg viewBox="0 0 600 600" className="absolute -right-24 -top-24 w-96 h-96" fill="none">
        <circle cx="300" cy="300" r="260" stroke="#c9a84c" strokeWidth="1.5" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={Math.round(300 + Math.cos(r) * 260)}
              y1={Math.round(300 + Math.sin(r) * 260)}
              x2={300}
              y2={300}
              stroke="#c9a84c" strokeWidth="0.5"
            />
          );
        })}
      </svg>
    </div>
  );
}

export default function DonateSection() {
  const { ref, visible } = useScrollReveal();

  const handleDonate = () => {
    window.open(DONATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <SectionContainer id="donate" py="large" className="text-center relative overflow-hidden">
      <GeometricOrnament />

      <div ref={ref} className="max-w-4xl mx-auto relative z-10">

        {/* Icon ring */}
        <div className={`reveal-scale ${visible ? 'visible' : ''} inline-flex items-center justify-center mb-10 sm:mb-12 md:mb-14`}>
          <div className="relative">
            <div className="w-24 sm:w-28 h-24 sm:h-28 rounded-full border border-accent/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-accent/15 scale-125" />
              <div className="absolute inset-0 rounded-full border border-accent/08 scale-150" />
              <span className="text-5xl sm:text-6xl crescent">🤲</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className={`reveal ${visible ? 'visible' : ''} text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-4 sm:mb-5 md:mb-6 tracking-wide`}>
          Support <span className="gold-text">Al-Amir</span>
        </h2>
        <div className="section-divider mx-auto mb-6 sm:mb-7 md:mb-8" />

        {/* Arabic verse */}
        <div className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} font-arabic text-accent/80 text-lg sm:text-xl md:text-2xl mb-3 sm:mb-4 leading-loose`}>
          مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا
        </div>
        <p className="text-gray-500 text-sm sm:text-base italic mb-8 sm:mb-10">
          &quot;Who will lend Allah a goodly loan?&quot; — Quran 2:245
        </p>

        <p className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} text-gray-300 leading-relaxed mb-10 sm:mb-12 md:mb-14 max-w-2xl mx-auto text-base sm:text-lg px-4`}>
          Your generous contribution helps us maintain the masjid, run Islamic education programs,
          serve the community, and support families in need — all for the sake of Allah.
        </p>

        {/* Donation tiers */}
        <div className={`reveal reveal-delay-3 ${visible ? 'visible' : ''} grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-7 md:gap-8 mb-12 sm:mb-14 md:mb-16`}>
          {tiers.map((t) => (
            <div
              key={t.label}
              className="gold-hover-card rounded-2xl md:rounded-3xl p-6 sm:p-7 md:p-8 bg-gradient-to-br from-blue-950/40 to-black/40 backdrop-blur-sm text-left"
            >
              <div className="text-4xl sm:text-5xl mb-4 sm:mb-5">{t.icon}</div>
              <div className="text-accent font-bold text-lg sm:text-xl mb-2 sm:mb-3 tracking-wide">{t.label}</div>
              <div className="text-gray-400 text-sm sm:text-base leading-relaxed mb-4 sm:mb-5">{t.desc}</div>
              <div className="text-white font-bold text-xl sm:text-2xl">{t.amount}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleDonate}
          className={`donate-btn reveal reveal-delay-4 ${visible ? 'visible' : ''} text-black font-bold text-base sm:text-lg md:text-xl px-16 sm:px-24 md:px-32 py-4 sm:py-5 md:py-6 rounded-full inline-flex items-center gap-3 cursor-pointer shadow-[0_8px_32px_rgba(201,168,76,0.3)]`}
        >
          <span className="text-2xl">🤲</span>
          Donate Now — For the Sake of Allah
        </button>

        <p className="text-gray-600 text-sm sm:text-base mt-6 sm:mt-8 px-4">
          Clicking will open our secure donation form in a new tab.
          <br className="hidden sm:block" />
          <span className="text-accent/60">JazakAllahu Khayran — May Allah accept from you.</span>
        </p>

        {/* Decorative Arabic calligraphy bottom */}
        <div className="mt-10 sm:mt-12 md:mt-14 pt-8 sm:pt-10 md:pt-12 border-t border-accent/10">
          <div className="font-arabic text-accent/40 text-2xl sm:text-3xl md:text-4xl tracking-wide mb-3 sm:mb-4">
            اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا
          </div>
          <p className="text-gray-700 text-sm sm:text-base">
            &quot;O Allah, bless for us that which You have provided us.&quot;
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
