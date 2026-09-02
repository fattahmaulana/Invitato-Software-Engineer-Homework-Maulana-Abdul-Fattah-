import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Ornament from './ui/Ornament';
import { useLanguage } from '../context/LanguageContext';

const galleryPhotos: string[] = [
  '/assets/images/gallery/gallery-01.png',
  '/assets/images/gallery/gallery-02.png',
  '/assets/images/gallery/gallery-03.png',
  '/assets/images/gallery/gallery-04.png',
  '/assets/images/gallery/gallery-05.png',
  '/assets/images/gallery/gallery-06.png',
  '/assets/images/gallery/gallery-07.png',
  '/assets/images/gallery/gallery-08.png',
  '/assets/images/gallery/gallery-09.png',
  '/assets/images/gallery/gallery-10.png',
];

export default function Gallery() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1200
  );
  const autoPlayRef = useRef<number | null>(null);

  // Track window resize to ensure mathematically dead-centered positioning
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Compute responsive card width & gap
  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth >= 640 && viewportWidth < 1024;
  
  // Card dimensions: on mobile 72% of viewport so left and right photos peek symmetrically (approx 14% each side)
  const cardWidth = isMobile
    ? Math.min(Math.round(viewportWidth * 0.72), 300)
    : isTablet
    ? 340
    : 400;
  const gap = isMobile ? 14 : 24;

  const centerOffset = (viewportWidth - cardWidth) / 2;
  const targetX = centerOffset - currentIndex * (cardWidth + gap);

  // Auto slide effect
  useEffect(() => {
    if (!isAutoPlay || selectedPhoto !== null) return;

    autoPlayRef.current = window.setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
    }, 4000);

    return () => {
      if (autoPlayRef.current) clearTimeout(autoPlayRef.current);
    };
  }, [currentIndex, isAutoPlay, selectedPhoto]);

  const handlePrev = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev - 1 + galleryPhotos.length) % galleryPhotos.length);
  };

  const handleNext = () => {
    setIsAutoPlay(false);
    setCurrentIndex((prev) => (prev + 1) % galleryPhotos.length);
  };

  return (
    <section
      id="gallery"
      className="w-full py-20 md:py-28 bg-cream relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center px-4 mb-8 sm:mb-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="section-subtitle"
        >
          {t.gallery.subtitle}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="section-title mb-4"
        >
          {t.gallery.title}
        </motion.h2>

        <Ornament type="divider" className="mb-4 w-44 mx-auto" />
      </div>

      {/* Full-Width Frameless Carousel with Left & Right Peek Previews */}
      <div className="w-full relative overflow-hidden py-4">
        {/* Navigation Arrow Left */}
        <button
          onClick={handlePrev}
          aria-label="Previous Photo"
          className="absolute left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20 hover:scale-110 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Navigation Arrow Right */}
        <button
          onClick={handleNext}
          aria-label="Next Photo"
          className="absolute right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center transition-all duration-300 shadow-xl border border-white/20 hover:scale-110 active:scale-95"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Continuous Fluid Track */}
        <motion.div
          className="flex items-center"
          animate={{ x: targetX }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          style={{
            width: galleryPhotos.length * (cardWidth + gap),
            cursor: 'grab',
          }}
          drag="x"
          dragConstraints={{
            left: centerOffset - (galleryPhotos.length - 1) * (cardWidth + gap) - 50,
            right: centerOffset + 50,
          }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -40 && currentIndex < galleryPhotos.length - 1) {
              handleNext();
            } else if (info.offset.x > 40 && currentIndex > 0) {
              handlePrev();
            }
          }}
        >
          {galleryPhotos.map((src, index) => {
            const isActive = index === currentIndex;
            const isAdjacent = Math.abs(index - currentIndex) === 1;

            return (
              <motion.div
                key={index}
                style={{
                  width: cardWidth,
                  marginRight: index === galleryPhotos.length - 1 ? 0 : gap,
                }}
                animate={{
                  scale: isActive ? 1.04 : isAdjacent ? 0.90 : 0.82,
                  opacity: isActive ? 1 : isAdjacent ? 0.6 : 0.25,
                }}
                transition={{ duration: 0.4 }}
                onClick={() => {
                  if (isActive) {
                    setSelectedPhoto(index);
                  } else {
                    setIsAutoPlay(false);
                    setCurrentIndex(index);
                  }
                }}
                className={`aspect-[3/4] flex-shrink-0 relative overflow-hidden rounded-2xl shadow-lg transition-all duration-500 bg-primary/10 select-none ${
                  isActive ? 'shadow-2xl z-20 cursor-pointer' : 'z-10 cursor-pointer hover:opacity-80'
                }`}
              >
                <img
                  src={src}
                  alt={`Ricky & Fellycia Gallery ${index + 1}`}
                  loading="lazy"
                  draggable={false}
                  className="w-full h-full object-cover object-center pointer-events-none transition-transform duration-700 ease-out"
                />

                {/* Subtle vignette for depth on adjacent cards */}
                {!isActive && (
                  <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] transition-opacity duration-300" />
                )}

                {/* Active card hover shine */}
                {isActive && (
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Slide Indicator Dots & Index */}
      <div className="flex flex-col items-center justify-center gap-3 mt-6 sm:mt-8">
        <div className="flex items-center gap-1.5 sm:gap-2">
          {galleryPhotos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setIsAutoPlay(false);
                setCurrentIndex(idx);
              }}
              className={`transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? 'w-7 sm:w-8 h-2 bg-primary shadow-sm'
                  : 'w-2 h-2 bg-primary/25 hover:bg-primary/50'
              }`}
              aria-label={`Go to photo ${idx + 1}`}
            />
          ))}
        </div>
        <span className="font-sans text-xs uppercase tracking-widest text-secondary/70 font-medium">
          {currentIndex + 1} / {galleryPhotos.length}
        </span>
      </div>

      {/* Lightbox Modal on Photo Click */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
            onClick={() => setSelectedPhoto(null)}
          >
            {/* Close button */}
            <button
              className="absolute top-5 right-5 text-white/80 hover:text-white z-20 p-2.5 rounded-full bg-black/40 hover:bg-black/70 transition-colors"
              onClick={() => setSelectedPhoto(null)}
              aria-label="Close Lightbox"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Navigation Left */}
            {selectedPhoto > 0 && (
              <button
                className="absolute left-4 md:left-8 text-white/80 hover:text-white z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 transition-all transform -translate-y-1/2 top-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(selectedPhoto - 1);
                }}
                aria-label="Previous Photo"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}

            {/* Modal Navigation Right */}
            {selectedPhoto < galleryPhotos.length - 1 && (
              <button
                className="absolute right-4 md:right-8 text-white/80 hover:text-white z-20 p-3 rounded-full bg-black/40 hover:bg-black/70 transition-all transform -translate-y-1/2 top-1/2"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPhoto(selectedPhoto + 1);
                }}
                aria-label="Next Photo"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Full-Size Image Container */}
            <motion.div
              key={selectedPhoto}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl max-h-[90vh] w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative max-h-[85vh] overflow-hidden rounded-2xl shadow-2xl flex items-center justify-center">
                <img
                  src={galleryPhotos[selectedPhoto]}
                  alt={`Ricky & Fellycia ${selectedPhoto + 1}`}
                  className="max-w-full max-h-[85vh] object-contain rounded-2xl"
                />
              </div>
              <div className="mt-3 text-center text-white/70 font-sans text-xs uppercase tracking-widest">
                {selectedPhoto + 1} / {galleryPhotos.length}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
