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

      {/*
        Two-column layout: map left, contact details right.
        items-stretch ensures both columns fill equal height on md+.
      */}
      <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-stretch w-full">

        {/* Map column */}
        <div className={`reveal-left ${visible ? 'visible' : ''} w-full flex flex-col`}>
          <div
            className="rounded-2xl overflow-hidden border border-accent/15 shadow-[0_16px_60px_rgba(0,0,0,0.4)] flex-1"
            style={{ minHeight: '340px' }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.3179575834943!2d-81.72926942443266!3d30.398719574747112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5bb001121e067%3A0x954968320fec7553!2sAl%20Amir%20Islami%20Center!5e0!3m2!1sen!2sbd!4v1775638467148!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'hue-rotate(200deg) saturate(0.8) brightness(0.75)', display: 'block', minHeight: '340px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al-Amir Islamic Center Location"
            />
          </div>

          {/* Google Maps CTA — consistent btn-base sizing */}
          <a
            href="https://maps.google.com/?q=Al-Amir+Islamic+Center+Florida"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-base btn-secondary mt-4 sm:mt-5 w-full justify-center"
          >
            <span>📍</span> Open in Google Maps
          </a>
        </div>

        {/* Contact info column — consistent gap between cards */}
        <div className={`reveal-right ${visible ? 'visible' : ''} flex flex-col gap-3 sm:gap-4 w-full`}>
          {contactItems.map((item, i) => (
            <div
              key={item.label}
              className={`
                gold-hover-card rounded-xl p-5 sm:p-6
                bg-gradient-to-br from-blue-950/40 to-black/40
                backdrop-blur-sm flex-1
                ${item.highlight ? 'border-accent/35 bg-accent/5' : ''}
                reveal reveal-delay-${Math.min(i + 1, 6)} ${visible ? 'visible' : ''}
              `}
            >
              <div className="flex items-start gap-4">
                <span className="text-xl sm:text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className={`text-xs font-bold uppercase tracking-widest mb-1.5 sm:mb-2 ${item.highlight ? 'text-accent' : 'text-yellow-400/80'}`}>
                    {item.label}
                  </div>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="text-gray-300 text-sm hover:text-accent transition-colors whitespace-pre-line block leading-relaxed"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <div className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">
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
