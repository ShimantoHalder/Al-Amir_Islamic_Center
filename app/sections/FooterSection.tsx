'use client';

const FACEBOOK_URL = 'https://www.facebook.com/share/1JDuu2JWEh/?mibextid=wwXIfr';

const quickLinks = [
  { href: '#home',         label: 'Home' },
  { href: '#prayer-times', label: 'Prayer Times' },
  { href: '#about',        label: 'About' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#location',     label: 'Location' },
  { href: '#contact',      label: 'Contact' },
  { href: '#contact',      label: 'Donate' },
];

const services = [
  'Daily Salah (5 prayers)',
  "Friday Jumu'ah",
  'Quran Classes',
  'Islamic Education',
  'Youth Programs',
  'Community Iftar',
  'Zakat Collection',
  'New Muslim Support',
];

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-accent/10 overflow-hidden">
      {/* Top gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Subtle geometric pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none overflow-hidden">
        <svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMid slice" className="w-full h-full" fill="none">
          {Array.from({ length: 8 }).map((_, i) => (
            <g key={i}>
              <circle cx={150 * i} cy={200} r={180} stroke="#c9a84c" strokeWidth="0.8" />
              <circle cx={150 * i} cy={200} r={120} stroke="#c9a84c" strokeWidth="0.5" />
            </g>
          ))}
        </svg>
      </div>

      <div className="relative bg-black/40 px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full">

          {/*
            4-column footer grid.
            Mobile (1-col): every column is centred.
            SM+ (2-col): columns are left-aligned.
            LG+ (4-col): standard left-aligned multi-column footer.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 mb-12 sm:mb-14">

            {/* ── Brand column ── */}
            <div className="lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl crescent leading-none">☪</span>
                <div>
                  <div className="text-white font-bold text-base tracking-wide leading-tight">
                    Al-Amir Islamic Center
                  </div>
                  <div className="text-accent text-xs tracking-widest opacity-75">Florida, USA</div>
                </div>
              </div>
              <p className="text-light-500 text-sm leading-relaxed mb-5 max-w-xs">
                A house of Allah for worship, learning, and community — serving South Florida
                with sincerity, compassion, and love for the Ummah.
              </p>
              <div className="font-arabic text-accent/80 text-lg leading-loose">
                رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ
              </div>
              <p className="text-light-700 text-xs mt-1.5">
                &quot;My Lord, make me an establisher of prayer.&quot;
              </p>
            </div>

            {/* ── Quick Links ── */}
            <div className="flex flex-col items-center sm:items-start">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4 text-center sm:text-left w-full">
                Quick Links
              </h4>
              <ul className="flex flex-col gap-2.5">
                {quickLinks.map((link) => (
                  <li key={link.label} className="flex items-center justify-center sm:justify-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/40 flex-shrink-0" />
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-accent text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ── */}
            <div className="flex flex-col items-center sm:items-start">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4 text-center sm:text-left w-full">
                Our Services
              </h4>
              <ul className="flex flex-col gap-2.5">
                {services.map((s) => (
                  <li key={s} className="flex items-center justify-center sm:justify-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30 flex-shrink-0" />
                    <span className="text-gray-500 text-sm">{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact ── */}
            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                Contact
              </h4>
              <ul className="space-y-3.5 w-full">
                {[
                  { icon: '📍', text: 'Florida, USA' },
                  { icon: '📞', text: '(324) 222-3299' },
                  { icon: '📧', text: 'info@alamiric.org' },
                ].map((item) => (
                  <li key={item.icon} className="flex items-start gap-3 justify-center sm:justify-start">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-500 text-sm leading-relaxed break-all sm:break-normal">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-5 border-t border-blue-900/30 w-full text-center sm:text-left">
                <div className="text-accent text-xs font-semibold mb-1.5">Friday Prayer</div>
                <div className="text-gray-500 text-sm">
                  <span className="text-accent font-bold">Khutbah: 1:15 PM</span><br />
                  Iqamah: 1:30 PM
                </div>
              </div>

              <a
                href="#contact"
                className="mt-5 flex items-center justify-center gap-2.5 donate-btn text-black font-bold text-sm px-8 py-3 rounded-full w-full sm:w-auto"
              >
                🤲 Donate
              </a>
            </div>

          </div>

          {/* Bottom bar */}
          <div className="border-t border-blue-900/20 pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <p className="text-light-600 text-xs sm:text-sm">
              © {year} Al-Amir Islamic Center. Built with ❤️ for the Ummah.
            </p>
            <div className="flex items-center gap-4">
              {/* Facebook link */}
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow us on Facebook"
                className="flex items-center gap-2 text-blue-300 hover:text-[#1877F2] transition-colors duration-200 group"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path d="M24 12.073C24 5.404 18.627 0 12 0S0 5.404 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047v-2.66c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.235 2.686.235v2.97h-1.513c-1.491 0-1.956.932-1.956 1.889v2.263h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
                </svg>
                <span className="text-xs hidden sm:inline">Facebook</span>
              </a>
              <div className="flex items-center gap-3">
                <p className="font-arabic text-accent/80 text-lg">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
                <span className="text-light-700 text-xs hidden sm:inline">Glory be to Allah</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
