import React, { useState, useEffect } from 'react';
import { GlobeIcon } from '../components/Icons';

export default function Hero({ banners = [], onSearchQuery }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Filter MongoDB banners of type 'Carousel Slide'
  const activeSlides = banners && banners.length > 0
    ? banners.filter(b => b.type === 'Carousel Slide')
    : [];

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlides.length]);

  return (
    <section className="w-full bg-[#f8fafc] py-6 px-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Banner Slider Container */}
        {activeSlides.length > 0 ? (
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/7] md:aspect-[2.7/1] max-h-[380px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white group">
            {activeSlides.map((slide, idx) => (
              <div
                key={slide.id || idx}
                className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                  idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              >
                {slide.link ? (
                  <a href={slide.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                  </a>
                ) : (
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                )}
              </div>
            ))}

            {/* Navigation Arrows */}
            {activeSlides.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#d4af37] hover:text-slate-950 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100 cursor-pointer font-bold border border-white/10"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % activeSlides.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#d4af37] hover:text-slate-950 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100 cursor-pointer font-bold border border-white/10"
                >
                  ›
                </button>
              </>
            )}

            {/* Horizontal Dash Indicators */}
            {activeSlides.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {activeSlides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      idx === currentSlide ? 'bg-[#d4af37] w-8' : 'bg-white/40 hover:bg-white w-4'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          /* Placeholder / Fallback Slide if no database banners found */
          <div className="relative w-full aspect-[21/9] sm:aspect-[24/7] md:aspect-[2.7/1] max-h-[380px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-gradient-to-r from-slate-800 to-slate-900 flex flex-col items-center justify-center text-center p-6 text-white">
            <GlobeIcon className="w-12 h-12 text-[#d4af37] animate-pulse mb-3" />
            <h3 className="text-lg font-bold text-white uppercase tracking-wider">Welcome to GSM GIRI B2B</h3>
            <p className="text-xs text-slate-305 max-w-md mt-1">High-Quality Unlocking Solutions, Tool Rentals & B2B Services. Loading dynamic banners...</p>
          </div>
        )}
      </div>
    </section>
  );
}
