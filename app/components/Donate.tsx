'use client';

// Donate section — redirects to a Google Form (or any donation form URL)
// Replace DONATION_FORM_URL with the actual form link when ready
const DONATION_FORM_URL = 'https://forms.google.com/'; // ← Replace with actual form URL

export default function Donate() {
  const handleDonate = () => {
    window.open(DONATION_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="donate" className="py-16 md:py-28 px-3 sm:px-4 w-full flex flex-col items-center pt-16 md:pt-24">
      <div className="max-w-3xl mx-auto text-center w-full px-2">
        {/* Decorative ring */}
        <div className="relative inline-block mb-10 md:mb-12">
          <div className="w-20 md:w-24 h-20 md:h-24 rounded-full border-2 border-accent/40 flex items-center justify-center mx-auto relative">
            <div className="absolute inset-0 rounded-full border border-accent/20 scale-125" />
            <span className="text-3xl md:text-4xl">🤲</span>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-5">
          Support <span className="text-accent">Al-Amir</span>
        </h2>
        <div className="section-divider mx-auto mb-6 md:mb-8" />

        <p className="text-gray-300 leading-relaxed mb-6 md:mb-8 max-w-xl mx-auto text-xs sm:text-sm px-3">
          Your generous contribution helps us maintain the masjid, run educational programs,
          serve the community, and support families in need — all for the sake of Allah.
        </p>

        {/* Main donate CTA */}
        <button
          onClick={handleDonate}
          className="donate-btn text-black font-bold text-sm md:text-lg px-10 md:px-14 py-3.5 md:py-4 rounded-full inline-flex items-center gap-2 cursor-pointer"
        >
          <span>🤲</span>
          Donate Now
          <span className="text-xs font-normal opacity-80 ml-1 hidden sm:inline">(Redirects to secure form)</span>
        </button>

        <p className="text-gray-600 text-xs mt-3 md:mt-4 px-2">
          Clicking will open the donation form in a new tab. JazakAllahu Khayran.
        </p>
      </div>
    </section>
  );
}
