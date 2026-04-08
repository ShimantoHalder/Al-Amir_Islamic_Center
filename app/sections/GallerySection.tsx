'use client';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/app/components/ui';

const images = [
  { src: '/alamiric.jpeg', alt: 'Al-Amir Islamic Center - Event 1' },
  { src: '/alamiric1.jpeg', alt: 'Al-Amir Islamic Center - Event 2' },
  { src: '/alamiric2.jpeg', alt: 'Al-Amir Islamic Center - Event 3' },
];

export default function GallerySection() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  useEffect(() => {
    if (!isAutoPlay || lightbox) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlay, lightbox]);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <SectionContainer id="gallery" py="large">
      <SectionHeader
        icon="🖼"
        title={<>Our <span className="text-accent">Gallery</span></>}
        description="A glimpse into our masjid and community life"
      />

      <div
        className="relative w-full rounded-lg md:rounded-2xl overflow-hidden bg-black/40 mb-6 sm:mb-8 md:mb-10"
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        <div className="relative w-full h-64 sm:h-80 md:h-[500px] lg:h-[600px] overflow-hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover cursor-pointer"
                onClick={() => setLightbox(img.src)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4 md:p-6">
                <span className="text-white text-xs sm:text-sm md:text-base">{img.alt}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 md:gap-3 p-3 sm:p-4 md:p-5 bg-black/50">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
                index === currentIndex ? 'bg-accent w-4 md:w-6' : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white hover:text-accent transition-colors"
          >
            <X size={24} />
          </button>
          <img
            src={lightbox}
            alt="Full view"
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}
    </SectionContainer>
  );
}
