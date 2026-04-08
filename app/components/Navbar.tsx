'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const links = [
  { href: '#home', label: 'Home' },
  { href: '#prayer-times', label: 'Prayer Times' },
  { href: '#about', label: 'About' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'nav-blur shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-3 sm:px-4 md:px-6 flex items-center justify-between h-14 md:h-16">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2 group flex-shrink-0">
          <span className="text-xl md:text-2xl crescent">☪</span>
          <div className="hidden sm:block">
          <div className="text-white font-bold text-xs md:text-sm leading-tight group-hover:text-accent transition-colors">
              Al-Amir Islamic Center
            </div>
            <div className="text-accent text-xs">Florida, USA</div>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-4 lg:gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-gray-300 hover:text-accent text-xs lg:text-sm font-medium transition-colors duration-200 relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300" />
            </a>
          ))}
          <a
            href="#donate"
            className="donate-btn text-black font-bold text-xs lg:text-sm px-3 lg:px-4 py-2 rounded-full cursor-pointer"
          >
            Donate
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden nav-blur border-t border-accent-dark">
          <div className="flex flex-col px-4 py-3 gap-2">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-gray-300 hover:text-accent text-xs sm:text-sm py-1 transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setOpen(false)}
              className="donate-btn text-center text-black font-bold text-xs sm:text-sm px-4 py-2 rounded-full mt-1"
            >
              Donate
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
