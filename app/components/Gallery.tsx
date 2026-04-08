'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

// Gallery images from Al-Amir Islamic Center
const images = [
  { src: '/alamiric.jpeg', alt: 'Al-Amir Islamic Center - Event 1' },
  { src: '/alamiric1.jpeg', alt: 'Al-Amir Islamic Center - Event 2' },
  { src: '/alamiric2.jpeg', alt: 'Al-Amir Islamic Center - Event 3' },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-scroll effect
  useEffect(() => {
    if (!isAutoPlay || lightbox) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000); // Auto-scroll every 5 seconds
    
    return () => clearInterval(interval);
  }, [isAutoPlay, lightbox]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <section id="gallery" className="py-16 md:py-28 px-3 sm:px-4 w-full flex flex-col items-center">
      <div className="max-w-5xl mx-auto w-full px-2">
        {/* Header */}
        <div className="text-center mb-12 md:mb-14">
          <span className="text-3xl md:text-4xl">🖼</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
            Our <span className="text-accent">Gallery</span>
          </h2>
          <div className="section-divider mx-auto mt-4 mb-6" />
          <p className="text-gray-400 text-xs sm:text-sm px-3">A glimpse into our masjid and community life</p>
        </div>

        {/* Auto-scroll slider */}
        <div
          className="relative w-full rounded-lg md:rounded-2xl overflow-hidden bg-black/40 mb-8 md:mb-10"
          onMouseEnter={() => setIsAutoPlay(false)}
          onMouseLeave={() => setIsAutoPlay(true)}
        >
          {/* Images container with smooth transition */}
          <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden">
            {images.map((img, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => setLightbox(img.src)}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-4 md:p-6">
                  <span className="text-white text-xs sm:text-sm md:text-base">{img.alt}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Previous button - Removed */}

          {/* Next button - Removed */}

          {/* Dots indicator */}
          <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2 md:gap-3">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-accent w-8 h-2 md:w-10 md:h-2.5'
                    : 'bg-white/50 hover:bg-white/70 w-2 h-2 md:w-2.5 md:h-2.5'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Gallery info */}
        <p className="text-center text-gray-600 text-xs mt-4 sm:mt-6 italic">
          Click on image to view in fullscreen • Auto-scrolls every 5 seconds
        </p>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white hover:text-accent transition-colors"
            onClick={() => setLightbox(null)}
          >
            <X size={24} className="sm:w-7 sm:h-7" />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Gallery"
            className="max-w-full max-h-[85vh] rounded-lg sm:rounded-xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
