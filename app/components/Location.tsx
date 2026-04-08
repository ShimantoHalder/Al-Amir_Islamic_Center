'use client';

export default function Location() {
  return (
    <section id="location" className="py-16 md:py-28 px-3 sm:px-4 bg-green-950/10 w-full flex flex-col items-center">
      <div className="max-w-5xl mx-auto w-full px-2">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-3xl md:text-4xl">📍</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
            Find <span className="text-accent">Us</span>
          </h2>
          <div className="section-divider mx-auto mt-4 mb-6" />
          <p className="text-gray-400 text-xs sm:text-sm px-3">Al-Amir Islamic Center — Florida, USA</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 items-start">
          {/* Map */}
          <div className="rounded-lg md:rounded-2xl overflow-hidden border border-blue-800/40 w-full" style={{ height: '300px', minHeight: '300px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3441.3179575834943!2d-81.72926942443266!3d30.398719574747112!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e5bb001121e067%3A0x954968320fec7553!2sAl%20Amir%20Islami%20Center!5e0!3m2!1sen!2sbd!4v1775638467148!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Al-Amir Islamic Center Location"
            />
          </div>

          {/* Info */}
          <div className="space-y-4 md:space-y-6">
            {[
              { icon: '🏠', label: 'Address', value: 'Al-Amir Islamic Center\nFlorida, USA\n(Full address to be confirmed)' },
              { icon: '📞', label: 'Phone', value: '+1 (305) 000-0000' },
              { icon: '📧', label: 'Email', value: 'info@alamirislamiccenter.org' },
              { icon: '🕌', label: 'Jumu\'ah', value: 'Every Friday\nKhutbah: 1:00 PM · Iqamah: 1:15 PM' },
              { icon: '⏰', label: 'Open', value: 'Daily — Open for all 5 prayers' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-4 md:gap-5 items-start rounded-lg md:rounded-xl border border-blue-800/30 bg-blue-950/30 p-4 md:p-6 hover:border-accent/30 transition-colors"
              >
                <span className="text-lg md:text-xl mt-0.5 flex-shrink-0">{item.icon}</span>
                <div>
                  <div className="text-yellow-400 text-xs font-semibold uppercase tracking-wider mb-1">
                    {item.label}
                  </div>
                  <div className="text-gray-300 text-xs md:text-sm whitespace-pre-line">{item.value}</div>
                </div>
              </div>
            ))}

            <a
              href="https://maps.google.com/?q=Al-Amir+Islamic+Center+Florida"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-3 md:py-3.5 rounded-lg md:rounded-xl border border-blue-600 text-accent hover:bg-blue-900/30 transition-all hover:scale-[1.02] text-xs md:text-sm font-medium"
            >
              📍 Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
