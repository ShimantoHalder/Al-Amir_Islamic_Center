export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-blue-900/40 bg-black/30 px-3 sm:px-4 py-12 md:py-16 w-full flex flex-col items-center pt-8 md:pt-12">
      <div className="max-w-5xl mx-auto w-full px-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl md:text-2xl crescent">☪</span>
              <span className="text-white font-bold text-sm md:text-base">Al-Amir Islamic Center</span>
            </div>
            <p className="text-gray-500 text-xs leading-relaxed">
              A house of Allah for worship, learning, and community — serving South Florida
              with sincerity and compassion.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">Quick Links</h4>
            <div className="space-y-2">
              {['#home', '#prayer-times', '#about', '#gallery', '#contact', '#donate'].map((href) => (
                <a
                  key={href}
                  href={href}
                  className="block text-gray-500 hover:text-accent text-xs transition-colors capitalize"
                >
                  {href.replace('#', '').replace('-', ' ')}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-accent text-xs font-semibold uppercase tracking-wider mb-3">Contact</h4>
            <div className="space-y-2 text-xs text-gray-500">
              <div>📍 Florida, USA</div>
              <div>📞 +1 (305) 000-0000</div>
              <div>📧 info@alamirislamiccenter.org</div>
              <div className="pt-2 text-accent/60 text-xs">
                Jumu&apos;ah every Friday · 1:15 PM
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-blue-900/20 pt-4 md:pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-gray-600 text-xs text-center sm:text-left">
            © {year} Al-Amir Islamic Center. Built with ❤️ for the Ummah.
          </p>
          <p className="text-accent/60 text-xs">
            سُبْحَانَ اللَّهِ وَبِحَمْدِهِ
          </p>
        </div>
      </div>
    </footer>
  );
}
