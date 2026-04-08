'use client';
import { SectionContainer } from '@/app/components/ui';

const DONATION_FORM_URL = 'https://forms.google.com/';

export default function DonateSection() {
  const handleDonate = () => {
    window.open(DONATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <SectionContainer py="large" className="text-center">
      <div className="max-w-3xl mx-auto">
        <div className="relative inline-block mb-8 md:mb-10">
          <div className="w-16 sm:w-20 md:w-24 h-16 sm:h-20 md:h-24 rounded-full border-2 border-accent/40 flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 rounded-full border border-accent/20 scale-125" />
            <span className="text-3xl md:text-4xl">🤲</span>
          </div>
        </div>

        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
          Support <span className="text-accent">Al-Amir</span>
        </h2>
        <div className="section-divider mx-auto mb-5 md:mb-6" />

        <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto text-xs sm:text-sm px-2">
          Your generous contribution helps us maintain the masjid, run educational programs, serve the community,
          and support families in need — all for the sake of Allah.
        </p>

        <button
          onClick={handleDonate}
          className="donate-btn text-black font-bold text-xs sm:text-sm md:text-base px-8 sm:px-10 md:px-14 py-2.5 sm:py-3 md:py-4 rounded-full inline-flex items-center gap-2 cursor-pointer"
        >
          <span>🤲</span>
          Donate Now
          <span className="text-xs font-normal opacity-80 ml-1 hidden sm:inline">(Redirects to secure form)</span>
        </button>

        <p className="text-gray-600 text-xs mt-3 md:mt-4 px-2">
          Clicking will open the donation form in a new tab. JazakAllahu Khayran.
        </p>
      </div>
    </SectionContainer>
  );
}
