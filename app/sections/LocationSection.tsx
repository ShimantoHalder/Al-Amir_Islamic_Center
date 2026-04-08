'use client';
import { SectionContainer, SectionHeader } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

const contactItems = [
  {
    icon: '🏠',
    label: 'Address',
    value: 'Al-Amir Islamic Center\nFlorida, USA\n(Full address to be confirmed)',
    highlight: false,
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+1 (305) 000-0000',
    href: 'tel:+13050000000',
    highlight: false,
  },
  {
    icon: '📧',
    label: 'Email',
    value: 'info@alamirislamiccenter.org',
    href: 'mailto:info@alamirislamiccenter.org',
    highlight: false,
  },
  {
    icon: '🕌',
    label: "Jumu'ah",
    value: "Every Friday\nKhutbah: 1:00 PM · Iqamah: 1:15 PM",
    highlight: true,
  },
  {
    icon: '⏰',
    label: 'Hours',
    value: 'Open daily for all 5 prayers\nDoors open 15 min before each Salah',
    highlight: false,
  },
];

export default function LocationSection() {
  const { ref, visible } = useScrollReveal();

  return (
    <SectionContainer id="location" py="large" bg="dark">
      <SectionHeader
        icon="📍"
        title={<>Find <span className="text-accent">Us</span></>}
        description="Al-Amir Islamic Center — Your masjid in South Florida, open daily for the entire community"
      />

      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-14 items-start">

        {/* Map */}
        <div className={`reveal-left ${visible ? 'visible' : ''}`}>
          <div
            className="rounded-2xl md:rounded-3xl overflow-hidden border border-accent/15 shadow-[0_10px_50px_rgba(0,0,0,0.4)]"
            style={{ height: '340px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57258.9!2d-80.3!3d25.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9d8c2b90bcb%3A0x1!2sFlorida%2C+USA!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'hue-rotate(200deg) saturate(0.8) brightness(0.75)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al-Amir Islamic Center Location"
            />
          </div>

          <a
            href="https://maps.google.com/?q=Al-Amir+Islamic+Center+Florida"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 flex items-center justify-center gap-2.5 w-full py-4 px-10 rounded-xl border border-accent/30 text-accent hover:bg-accent/10 hover:border-accent/60 transition-all duration-300 hover:scale-[1.02] text-sm sm:text-base font-medium hover:shadow-[0_4px_20px_rgba(201,168,76,0.2)]"
          >
            <span>📍</span> Open in Google Maps
          </a>
        </div>

        {/* Contact info */}
        <div className={`reveal-right ${visible ? 'visible' : ''} space-y-3 sm:space-y-4`}>
          {contactItems.map((item, i) => (
            <div
              key={item.label}
              className={`
                gold-hover-card rounded-xl sm:rounded-2xl p-4 sm:p-5
                bg-gradient-to-br from-blue-950/40 to-black/40
                backdrop-blur-sm
                ${item.highlight ? 'border-accent/35 bg-accent/5' : ''}
                reveal reveal-delay-${Math.min(i + 1, 6)} ${visible ? 'visible' : ''}
              `}
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1 ${item.highlight ? 'text-accent' : 'text-yellow-400/80'}`}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-300 text-sm sm:text-base hover:text-accent transition-colors whitespace-pre-line block"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-gray-300 text-sm sm:text-base whitespace-pre-line leading-relaxed">
                      {item.value}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
