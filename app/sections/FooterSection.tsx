'use client';

const quickLinks = [
  { href: '#home',         label: 'Home' },
  { href: '#prayer-times', label: 'Prayer Times' },
  { href: '#about',        label: 'About' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#location',     label: 'Location' },
  { href: '#contact',      label: 'Contact' },
  { href: '#donate',       label: 'Donate' },
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
      {/* Top arch decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

      {/* Subtle geometric pattern bg */}
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

      <div className="relative bg-black/40 px-4 sm:px-6 lg:px-8 py-16 sm:py-20 md:py-24">
        <div className="max-w-7xl mx-auto w-full">

          {/* Main footer grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-14 md:gap-16 lg:gap-20 mb-14 sm:mb-18 md:mb-20">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5 sm:mb-6">
                <span className="text-3xl crescent leading-none">☪</span>
                <div>
                  <div className="text-white font-bold text-base sm:text-lg tracking-wide leading-tight">
                    Al-Amir Islamic Center
                  </div>
                  <div className="text-accent text-xs sm:text-sm tracking-widest opacity-75">Florida, USA</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm sm:text-base leading-relaxed mb-6 sm:mb-7">
                A house of Allah for worship, learning, and community — serving South Florida with
                sincerity, compassion, and love for the Ummah.
              </p>
              {/* Arabic dua */}
              <div className="font-arabic text-accent/50 text-lg sm:text-xl leading-loose text-right">
                رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ
              </div>
              <p className="text-gray-700 text-xs sm:text-sm mt-2 sm:mt-3 text-right">
                &quot;My Lord, make me an establisher of prayer.&quot;
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-5 sm:mb-6">
                Quick Links
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-accent text-sm sm:text-base transition-colors duration-200 flex items-center gap-3 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent transition-colors flex-shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-5 sm:mb-6">
                Our Services
              </h4>
              <ul className="space-y-2.5 sm:space-y-3">
                {services.map((s) => (
                  <li key={s} className="text-gray-500 text-sm sm:text-base flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-5 sm:mb-6">
                Contact
              </h4>
              <ul className="space-y-4 sm:space-y-4.5">
                {[
                  { icon: '📍', text: 'Florida, USA' },
                  { icon: '📞', text: '+1 (305) 000-0000' },
                  { icon: '📧', text: 'info@alamirislamiccenter.org' },
                ].map((item) => (
                  <li key={item.icon} className="flex items-start gap-3">
                    <span className="text-xl flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-500 text-sm sm:text-base leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 sm:mt-7 pt-6 sm:pt-7 border-t border-blue-900/30">
                <div className="text-accent text-xs font-semibold mb-2">Friday Prayer</div>
                <div className="text-gray-500 text-sm sm:text-base">
                  Khutbah: 1:00 PM<br className="mt-0.5" />
                  Iqamah: 1:15 PM
                </div>
              </div>

              {/* Donate CTA */}
              <a
                href="#donate"
                className="mt-6 sm:mt-7 flex items-center justify-center gap-3 donate-btn text-black font-bold text-sm sm:text-base px-10 py-3.5 sm:py-4 rounded-full w-full"
              >
                🤲 Donate
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-blue-900/20 pt-7 sm:pt-8 md:pt-10 flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6">
            <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              © {year} Al-Amir Islamic Center. Built with ❤️ for the Ummah.
            </p>
            <div className="flex items-center gap-5 sm:gap-6">
              <p className="font-arabic text-accent/50 text-lg sm:text-xl">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
              <span className="text-gray-700 text-xs sm:text-sm hidden sm:inline">Glory be to Allah</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
