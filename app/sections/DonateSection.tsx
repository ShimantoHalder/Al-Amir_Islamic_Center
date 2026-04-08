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

      <div ref={ref} className="max-w-3xl mx-auto relative z-10">

        {/* Icon ring */}
        <div className={`reveal-scale ${visible ? 'visible' : ''} inline-flex items-center justify-center mb-8 sm:mb-10`}>
          <div className="relative">
            <div className="w-20 sm:w-24 h-20 sm:h-24 rounded-full border border-accent/30 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border border-accent/15 scale-125" />
              <div className="absolute inset-0 rounded-full border border-accent/08 scale-150" />
              <span className="text-4xl sm:text-5xl crescent">🤲</span>
            </div>
          </div>
        </div>

        {/* Heading */}
        <h2 className={`reveal ${visible ? 'visible' : ''} text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-wide`}>
          Support <span className="gold-text">Al-Amir</span>
        </h2>
        <div className="section-divider mx-auto mb-5 sm:mb-6" />

        {/* Arabic verse */}
        <div className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} font-arabic text-accent/80 text-base sm:text-lg mb-2 leading-loose`}>
          مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا
        </div>
        <p className="text-gray-500 text-xs italic mb-6 sm:mb-8">
          &quot;Who will lend Allah a goodly loan?&quot; — Quran 2:245
        </p>

        <p className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-xl mx-auto text-sm sm:text-base px-2`}>
          Your generous contribution helps us maintain the masjid, run Islamic education programs,
          serve the community, and support families in need — all for the sake of Allah.
        </p>

        {/* Donation tiers */}
        <div className={`reveal reveal-delay-3 ${visible ? 'visible' : ''} grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-10 sm:mb-12`}>
          {tiers.map((t) => (
            <div
              key={t.label}
              className="gold-hover-card rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-blue-950/40 to-black/40 backdrop-blur-sm text-left"
            >
              <div className="text-2xl sm:text-3xl mb-3">{t.icon}</div>
              <div className="text-accent font-bold text-base sm:text-lg mb-1 tracking-wide">{t.label}</div>
              <div className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-3">{t.desc}</div>
              <div className="text-white font-bold text-lg sm:text-xl">{t.amount}</div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <button
          onClick={handleDonate}
          className={`donate-btn reveal reveal-delay-4 ${visible ? 'visible' : ''} text-black font-bold text-sm sm:text-base md:text-lg px-14 sm:px-20 md:px-24 py-4 sm:py-5 rounded-full inline-flex items-center gap-3 cursor-pointer shadow-[0_4px_24px_rgba(201,168,76,0.3)]`}
        >
          <span className="text-xl">🤲</span>
          Donate Now — For the Sake of Allah
        </button>

        <p className="text-gray-600 text-xs mt-4 sm:mt-5 px-2">
          Clicking will open our secure donation form in a new tab.
          <br />
          <span className="text-accent/60">JazakAllahu Khayran — May Allah accept from you.</span>
        </p>

        {/* Decorative Arabic calligraphy bottom */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-accent/10">
          <div className="font-arabic text-accent/40 text-xl sm:text-2xl tracking-wide">
            اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا
          </div>
          <p className="text-gray-700 text-xs mt-1">
            &quot;O Allah, bless for us that which You have provided us.&quot;
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
