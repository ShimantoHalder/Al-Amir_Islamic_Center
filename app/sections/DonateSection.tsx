'use client';
import { SectionContainer, SectionHeader } from '@/app/components/ui';
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
    label: 'Masjid Fund',
    desc: 'Support our building & renovation costs',
    amount: '$100+',
  },
];

/* Decorative geometric SVG — absolutely positioned, does not affect layout */
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
            <line key={deg}
              x1={300 + Math.cos(r) * 260} y1={300 + Math.sin(r) * 260}
              x2={300 - Math.cos(r) * 260} y2={300 - Math.sin(r) * 260}
              stroke="#c9a84c" strokeWidth="0.7"
            />
          );
        })}
        <polygon points="300,40 360,200 540,200 400,300 460,460 300,360 140,460 200,300 60,200 240,200"
          stroke="#c9a84c" strokeWidth="1.5" fill="none" />
      </svg>
      <svg viewBox="0 0 600 600" className="absolute -right-24 -top-24 w-96 h-96" fill="none">
        <circle cx="300" cy="300" r="260" stroke="#c9a84c" strokeWidth="1.5" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => {
          const r = (deg * Math.PI) / 180;
          return (
            <line key={deg}
              x1={Math.round(300 + Math.cos(r) * 260)} y1={Math.round(300 + Math.sin(r) * 260)}
              x2={300} y2={300}
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
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    /*
      No `text-center` on SectionContainer — let SectionHeader + flex centering
      handle alignment so it matches every other section on the page.
    */
    <SectionContainer id="donate" py="large" bg="gradient" pattern className="relative overflow-hidden">
      <GeometricOrnament />

      {/* Standard section header — identical pattern to all other sections */}
      <SectionHeader
        icon="🤲"
        title={<>Support <span className="gold-text">Al-Amir</span></>}
        subtitle={
          <div className="flex flex-col items-center gap-1">
            <p className="font-arabic text-accent/80 text-lg sm:text-xl leading-loose">
              مَّن ذَا الَّذِي يُقْرِضُ اللَّهَ قَرْضًا حَسَنًا
            </p>
            <p className="text-gray-500 text-sm italic">
              &quot;Who will lend Allah a goodly loan?&quot; — Quran 2:245
            </p>
          </div>
        }
      />

      {/* Centred content wrapper */}
      <div ref={ref} className="max-w-4xl mx-auto w-full relative z-10 flex flex-col items-center">

        {/* Body text */}
        <p className={`reveal reveal-delay-1 ${visible ? 'visible' : ''} text-gray-300 leading-relaxed mb-8 sm:mb-10 max-w-xl text-center text-sm sm:text-base mx-auto`}>
          Your generous contribution helps us maintain the masjid, run Islamic education programs,
          serve the community, and support families in need — all for the sake of Allah.
        </p>

        {/* Donation tiers — equal height, centred grid */}
        <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6 mb-8 sm:mb-10 w-full`}>
          {tiers.map((t) => (
            <div
              key={t.label}
              className="gold-hover-card rounded-2xl p-6 bg-gradient-to-br from-blue-950/40 to-black/40 backdrop-blur-sm text-left flex flex-col"
            >
              <div className="text-4xl mb-4 leading-none">{t.icon}</div>
              <div className="text-accent font-bold text-lg sm:text-xl mb-2 tracking-wide">{t.label}</div>
              <div className="text-gray-400 text-sm leading-relaxed mb-4 flex-1">{t.desc}</div>
              <div className="text-white font-bold text-2xl mt-auto">{t.amount}</div>
            </div>
          ))}
        </div>

        {/* CTA button — centred via flex column + items-center on wrapper */}
        <button
          onClick={handleDonate}
          className={`donate-btn reveal reveal-delay-3 ${visible ? 'visible' : ''} text-black font-bold text-sm sm:text-base px-10 sm:px-14 py-4 rounded-full inline-flex items-center gap-3 cursor-pointer shadow-[0_8px_32px_rgba(201,168,76,0.3)]`}
        >
          <span className="text-xl">🤲</span>
          Donate Now — For the Sake of Allah
        </button>

        <p className="text-light-600 text-sm mt-5 sm:mt-6 text-center px-4">
          Click to reach our contact form and send us your donation inquiry.
          <br className="hidden sm:block" />
          <span className="text-accent/80">JazakAllahu Khayran — May Allah accept from you.</span>
        </p>

        {/* Closing calligraphy */}
        <div className="mt-8 sm:mt-10 pt-7 sm:pt-8 border-t border-accent/10 w-full text-center">
          <div className="font-arabic text-accent/70 text-2xl sm:text-3xl tracking-wide mb-2 sm:mb-3">
            اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا
          </div>
          <p className="text-light-700 text-sm">
            &quot;O Allah, bless for us that which You have provided us.&quot;
          </p>
        </div>
      </div>
    </SectionContainer>
  );
}
