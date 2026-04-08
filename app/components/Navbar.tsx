'use client';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useScrolled } from '@/app/hooks';

const links = [
  { href: '#home',         label: 'Home' },
  { href: '#prayer-times', label: 'Prayer Times' },
  { href: '#about',        label: 'About' },
  { href: '#gallery',      label: 'Gallery' },
  { href: '#location',     label: 'Location' },
  { href: '#contact',      label: 'Contact' },
];

export default function Navbar() {
  const scrolled = useScrolled(40);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    const sectionIds = ['home', 'prayer-times', 'about', 'gallery', 'location', 'donate', 'contact'];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'nav-blur shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16 md:h-18">

        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group flex-shrink-0">
          <span className="text-xl sm:text-2xl crescent leading-none">☪</span>
          <div className="hidden sm:block">
            <div className="text-white font-bold text-xs sm:text-sm md:text-base leading-tight group-hover:text-accent transition-colors duration-300 tracking-wide">
              Al-Amir Islamic Center
            </div>
            <div className="text-accent text-xs tracking-widest opacity-80">Florida, USA</div>
          </div>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`relative px-3 lg:px-4 py-2 text-xs lg:text-sm font-medium transition-colors duration-200 group rounded-lg hover:bg-white/5 ${
                activeSection === l.href.replace('#', '')
                  ? 'text-accent'
                  : 'text-gray-300 hover:text-accent'
              }`}
            >
              {l.label}
              <span
                className={`absolute bottom-0 left-3 lg:left-4 right-3 lg:right-4 h-px bg-accent transition-all duration-300 ${
                  activeSection === l.href.replace('#', '') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'
                }`}
              />
            </a>
          ))}
          <a
            href="#donate"
            className="donate-btn text-black font-bold text-xs lg:text-sm px-4 lg:px-5 py-2 lg:py-2.5 rounded-full ml-2 cursor-pointer whitespace-nowrap"
          >
            Donate
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-400 overflow-hidden ${
          open ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="nav-blur border-t border-accent/10">
          <div className="flex flex-col px-4 py-4 gap-1 max-w-sm mx-auto">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 py-3 px-4 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeSection === l.href.replace('#', '')
                    ? 'text-accent bg-accent/10 border border-accent/20'
                    : 'text-gray-300 hover:text-accent hover:bg-white/5'
                }`}
              >
                {l.label}
              </a>
            ))}
            <a
              href="#donate"
              onClick={() => setOpen(false)}
              className="donate-btn text-center text-black font-bold text-sm px-6 py-3 rounded-full mt-2 cursor-pointer"
            >
              🤲 Donate Now
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
