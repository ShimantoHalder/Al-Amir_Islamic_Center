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

      <div className="relative bg-black/40 px-4 sm:px-6 lg:px-8 py-14 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto w-full">

          {/* Main footer grid — 40-56px gaps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 md:gap-14 mb-12 sm:mb-14">

            {/* Brand column */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-5">
                <span className="text-3xl crescent leading-none">☪</span>
                <div>
                  <div className="text-white font-bold text-base tracking-wide leading-tight">
                    Al-Amir Islamic Center
                  </div>
                  <div className="text-accent text-xs tracking-widest opacity-75">Florida, USA</div>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                A house of Allah for worship, learning, and community — serving South Florida with
                sincerity, compassion, and love for the Ummah.
              </p>
              {/* Arabic dua */}
              <div className="font-arabic text-accent/50 text-lg leading-loose text-right">
                رَبِّ اجْعَلْنِي مُقِيمَ الصَّلَاةِ
              </div>
              <p className="text-gray-700 text-xs mt-2 text-right">
                &quot;My Lord, make me an establisher of prayer.&quot;
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2.5">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-accent text-sm transition-colors duration-200 flex items-center gap-2.5 group"
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
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                Our Services
              </h4>
              <ul className="space-y-2.5">
                {services.map((s) => (
                  <li key={s} className="text-gray-500 text-sm flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/30 flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-accent text-xs font-bold uppercase tracking-widest mb-4">
                Contact
              </h4>
              <ul className="space-y-3.5">
                {[
                  { icon: '📍', text: 'Florida, USA' },
                  { icon: '📞', text: '+1 (305) 000-0000' },
                  { icon: '📧', text: 'info@alamirislamiccenter.org' },
                ].map((item) => (
                  <li key={item.icon} className="flex items-start gap-3">
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <span className="text-gray-500 text-sm leading-relaxed">{item.text}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-5 border-t border-blue-900/30">
                <div className="text-accent text-xs font-semibold mb-1.5">Friday Prayer</div>
                <div className="text-gray-500 text-sm">
                  Khutbah: 1:00 PM<br />
                  Iqamah: 1:15 PM
                </div>
              </div>

              {/* Donate CTA — standard btn-base size */}
              <a
                href="#donate"
                className="mt-5 flex items-center justify-center gap-2.5 donate-btn text-black font-bold text-sm px-8 py-3 rounded-full w-full"
              >
                🤲 Donate
              </a>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-blue-900/20 pt-6 sm:pt-7 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-5">
            <p className="text-gray-600 text-xs sm:text-sm text-center sm:text-left">
              © {year} Al-Amir Islamic Center. Built with ❤️ for the Ummah.
            </p>
            <div className="flex items-center gap-4">
              <p className="font-arabic text-accent/50 text-lg">سُبْحَانَ اللَّهِ وَبِحَمْدِهِ</p>
              <span className="text-gray-700 text-xs hidden sm:inline">Glory be to Allah</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
