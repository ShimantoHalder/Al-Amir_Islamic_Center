'use client';
import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react';
import { SectionContainer, SectionHeader } from '@/app/components/ui';
import { useScrollReveal } from '@/app/hooks';

const images = [
  { src: '/alamiric.jpeg',  alt: 'Al-Amir Islamic Center — Community Event',   caption: 'Community Gathering' },
  { src: '/alamiric1.jpeg', alt: 'Al-Amir Islamic Center — Masjid Interior',   caption: 'Inside the Masjid' },
  { src: '/alamiric2.jpeg', alt: 'Al-Amir Islamic Center — Prayer Hall',       caption: 'Prayer Hall' },
  { src: '/alm3.jpeg',      alt: 'Al-Amir Islamic Center — Islamic Center',    caption: 'Al-Amir Center' },
  { src: '/alm4.jpeg',      alt: 'Al-Amir Islamic Center — Masjid View',       caption: 'Masjid View' },
  { src: '/alm5.jpeg',      alt: 'Al-Amir Islamic Center — Community Life',    caption: 'Community Life' },
  { src: '/alm6.jpeg',      alt: 'Al-Amir Islamic Center — Friday Prayer',     caption: "Jumu'ah Prayer" },
  { src: '/alm7.jpeg',      alt: 'Al-Amir Islamic Center — Center Exterior',   caption: 'Center Exterior' },
];

export default function GallerySection() {
  const [lightbox,     setLightbox]     = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay,   setIsAutoPlay]   = useState(true);
  const { ref, visible } = useScrollReveal();

  /* Auto-advance */
  useEffect(() => {
    if (!isAutoPlay || lightbox !== null) return;
    const id = setInterval(() => {
      setCurrentIndex((p) => (p + 1) % images.length);
    }, 5000);
    return () => clearInterval(id);
  }, [isAutoPlay, lightbox]);

  /* Keyboard for lightbox */
  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape')      setLightbox(null);
      if (e.key === 'ArrowRight')  setLightbox((p) => p !== null ? (p + 1) % images.length : null);
      if (e.key === 'ArrowLeft')   setLightbox((p) => p !== null ? (p - 1 + images.length) % images.length : null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox]);

  const prev = useCallback(() => {
    setCurrentIndex((p) => (p - 1 + images.length) % images.length);
    setIsAutoPlay(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((p) => (p + 1) % images.length);
    setIsAutoPlay(false);
  }, []);

  return (
    <SectionContainer id="gallery" py="large" bg="dark">
      <SectionHeader
        icon="🖼"
        title={<>Our <span className="text-accent">Gallery</span></>}
        description="A glimpse into our masjid and the heart of our community life"
      />

      <div
        ref={ref}
        className={`reveal ${visible ? 'visible' : ''} relative w-full rounded-2xl md:rounded-3xl overflow-hidden border border-accent/15 shadow-[0_20px_80px_rgba(0,0,0,0.5)] mb-12 sm:mb-14 md:mb-16`}
        onMouseEnter={() => setIsAutoPlay(false)}
        onMouseLeave={() => setIsAutoPlay(true)}
      >
        {/* Main image slider */}
        <div className="relative w-full h-64 sm:h-80 md:h-[420px] lg:h-[520px] overflow-hidden bg-black/50">
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
              {/* Caption */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-7 md:p-8">
                <span className="text-white text-base sm:text-lg md:text-xl font-medium tracking-wide">
                  {img.caption}
                </span>
                <div className="text-gray-400 text-sm sm:text-base mt-1.5 sm:mt-2">{img.alt}</div>
              </div>
            </div>
          ))}

          {/* Zoom button */}
          <button
            onClick={() => setLightbox(currentIndex)}
            className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 sm:w-11 sm:h-11 rounded-full glass-card border border-white/20 flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-all duration-200"
            aria-label="Open fullscreen"
          >
            <ZoomIn size={18} />
          </button>

          {/* Image counter */}
          <div className="absolute top-4 left-4 sm:top-5 sm:left-5 glass-card border border-white/15 rounded-full px-4 py-2">
            <span className="text-white text-xs sm:text-sm font-mono">{currentIndex + 1} / {images.length}</span>
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={prev}
            className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card border border-white/15 flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-all duration-200 hover:scale-110"
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={next}
            className="absolute right-4 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 rounded-full glass-card border border-white/15 flex items-center justify-center text-white hover:text-accent hover:border-accent/50 transition-all duration-200 hover:scale-110"
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center items-center gap-3 sm:gap-4 py-5 sm:py-6 md:py-7 bg-black/40">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => { setCurrentIndex(index); setIsAutoPlay(false); }}
              className={`rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 sm:w-10 h-2.5 sm:h-3 bg-accent shadow-[0_0_12px_rgba(201,168,76,0.7)]'
                  : 'w-2.5 sm:w-3 h-2.5 sm:h-3 bg-gray-600 hover:bg-gray-400'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail strip */}
      <div className={`reveal reveal-delay-2 ${visible ? 'visible' : ''} grid grid-cols-4 gap-3 sm:gap-4 md:gap-5`}>
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => { setCurrentIndex(i); setIsAutoPlay(false); }}
            className={`gallery-item rounded-xl sm:rounded-2xl overflow-hidden aspect-video cursor-pointer ${
              i === currentIndex
                ? 'ring-2 sm:ring-3 ring-accent shadow-[0_0_20px_rgba(201,168,76,0.35)]'
                : 'ring-1 sm:ring-2 ring-white/10 hover:ring-accent/40'
            }`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.caption} className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-6 sm:p-8"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 w-11 h-11 sm:w-12 sm:h-12 rounded-full glass-card border border-white/20 flex items-center justify-center text-white hover:text-accent transition-colors"
          >
            <X size={22} />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => p !== null ? (p - 1 + images.length) % images.length : null); }}
            className="absolute left-5 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-card border border-white/20 flex items-center justify-center text-white hover:text-accent transition-colors"
          >
            <ChevronLeft size={24} />
          </button>

          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={images[lightbox].src}
            alt={images[lightbox].alt}
            className="max-w-full max-h-[85vh] object-contain rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((p) => p !== null ? (p + 1) % images.length : null); }}
            className="absolute right-5 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 sm:w-14 sm:h-14 rounded-full glass-card border border-white/20 flex items-center justify-center text-white hover:text-accent transition-colors"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 sm:bottom-8 text-gray-400 text-sm sm:text-base">
            {images[lightbox].caption} · {lightbox + 1}/{images.length}
          </div>
        </div>
      )}
    </SectionContainer>
  );
}
