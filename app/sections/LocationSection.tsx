'use client';
import { SectionContainer, SectionHeader, Card } from '@/app/components/ui';

export default function LocationSection() {
  const locations = [
    { icon: '🏠', label: 'Address', value: 'Al-Amir Islamic Center\nFlorida, USA\n(Full address to be confirmed)' },
    { icon: '📞', label: 'Phone', value: '+1 (305) 000-0000' },
    { icon: '📧', label: 'Email', value: 'info@alamirislamiccenter.org' },
    { icon: '🕌', label: 'Jumu\'ah', value: 'Every Friday\nKhutbah: 1:00 PM · Iqamah: 1:15 PM' },
    { icon: '⏰', label: 'Open', value: 'Daily — Open for all 5 prayers' },
  ];

  return (
    <SectionContainer id="location" py="large" bg="dark">
      <SectionHeader
        icon="📍"
        title={<>Find <span className="text-accent">Us</span></>}
        description="Al-Amir Islamic Center — Florida, USA"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 items-start">
        <div className="rounded-lg md:rounded-2xl overflow-hidden border border-blue-800/40 w-full" style={{ height: '300px' }}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d57258.9!2d-80.3!3d25.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b9d8c2b90bcb%3A0x1!2sFlorida%2C+USA!5e0!3m2!1sen!2sus!4v1234567890"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Al-Amir Islamic Center Location"
          />
        </div>

        <div className="space-y-3 md:space-y-4">
          {locations.map((item) => (
            <Card
              key={item.label}
              icon={item.icon}
              className="p-4 md:p-5 hover:-translate-y-0.5"
            >
              <div className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-1">
                {item.label}
              </div>
              <div className="text-gray-300 text-xs md:text-sm whitespace-pre-line">{item.value}</div>
            </Card>
          ))}

          <a
            href="https://maps.google.com/?q=Al-Amir+Islamic+Center+Florida"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center py-2.5 md:py-3 rounded-lg md:rounded-xl border border-blue-600 text-accent hover:bg-blue-900/30 transition-all hover:scale-[1.02] text-xs md:text-sm font-medium mt-2"
          >
            📍 Open in Google Maps
          </a>
        </div>
      </div>
    </SectionContainer>
  );
}
