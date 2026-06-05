import React, { useState, useEffect } from 'react';
import { SearchIcon, CalendarIcon, UsersIcon, GlobeIcon } from '../components/Icons';
import nexaproBanner from '../assets/banner_nexapro_tool.png';
import dftProBanner from '../assets/banner_dft_pro.png';
import octoplusBanner from '../assets/banner_octoplus.png';
import gsmgiriBanner from '../assets/banner_gsmgiri.png';

const slides = [
  {
    theme: 'yellow',
    gradient: 'linear-gradient(135deg, #0b192c 0%, #3a321a 65%, #eab308 100%)',
    logoText: 'NEXA',
    logoTextHighlight: 'PRO',
    logoSub: 'NEXAPRO TOOL',
    badge: 'Realme Auth Token Server 24x7',
    title: 'REALME AUTH SERVER',
    price: '1$ / DEVICE',
    tagline: 'BUY NOW AND SAVE UP TO 50%',
    link: 'www.nexapro.co.in'
  },
  {
    theme: 'cyan',
    gradient: 'linear-gradient(135deg, #0b192c 0%, #15313d 65%, #06b6d4 100%)',
    logoText: 'DFT',
    logoTextHighlight: 'PRO',
    logoSub: 'DFT PRO TOOL',
    badge: 'Xiaomi Auth Flash Server 24x7',
    title: 'XIAOMI AUTH FLASH',
    price: '0.5$ / CREDIT',
    tagline: 'INSTANT DELIVERY 24x7',
    link: 'www.dftpro.com'
  },
  {
    theme: 'orange',
    gradient: 'linear-gradient(135deg, #0b192c 0%, #382419 65%, #f97316 100%)',
    logoText: 'OCTOPLUS',
    logoTextHighlight: 'BOX',
    logoSub: 'OCTOPLUS SERVER',
    badge: 'Samsung Unlock Engine 24x7',
    title: 'SAMSUNG KEY',
    price: '3$ / KEY',
    tagline: 'INSTANT KEY ACTIVATION',
    link: 'www.octoplusbox.com'
  },
  {
    theme: 'teal',
    gradient: 'linear-gradient(135deg, #0b192c 0%, #0d2d31 65%, #d4af37 100%)',
    logoText: 'GSM',
    logoTextHighlight: 'GIRI',
    logoSub: 'GSM GIRI B2B',
    badge: 'Agent Wallet Management 24x7',
    title: 'WALLET RECHARGE',
    price: 'INSTANT',
    tagline: 'SUPPORTING CARDS & CRYPTO USDT',
    link: 'www.gsmgiri.com'
  }
];

export default function Hero({ onSearchQuery }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="w-full bg-[#f8fafc] py-6 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Banner Slider Container (Boxed Layout) */}
        <div className="relative w-full aspect-[21/9] sm:aspect-[24/7] md:aspect-[2.7/1] max-h-[380px] rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white group">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out flex ${
                idx === currentSlide ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
              style={{ backgroundColor: '#ffffff' }}
            >
              {/* Left Side: Grid background with tilted card */}
              <div 
                className="w-1/2 h-full relative p-4 sm:p-6 flex items-center justify-center shrink-0 overflow-hidden"
                style={{
                  backgroundImage: 'linear-gradient(to right, #f1f5f9 1px, transparent 1px), linear-gradient(to bottom, #f1f5f9 1px, transparent 1px)',
                  backgroundSize: '16px 16px'
                }}
              >
                {/* Decorative background circle */}
                <div className="absolute w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-slate-50 border border-slate-100 -top-6 -left-6 opacity-60"></div>
                
                {/* Tilted Logo Card */}
                <div className="transform -rotate-6 bg-white border border-[#d4af37]/20 rounded-xl p-3 sm:p-5 shadow-md max-w-[85%] select-none flex flex-col items-center relative z-10">
                  <div className="text-slate-400 text-[7px] sm:text-[9px] uppercase font-black tracking-widest leading-none mb-1 text-center">
                    {slide.logoSub.split(' ')[0]} SERVICE
                  </div>
                  <div className="flex items-center gap-1 border-y border-slate-100 py-1 sm:py-1.5 w-full justify-center">
                    <span className="text-sm sm:text-xl font-black text-slate-800 tracking-tight">{slide.logoText}</span>
                    <span className="text-sm sm:text-xl font-black text-white bg-[#0b192c] px-1 rounded shadow-sm border border-[#d4af37]/30">{slide.logoTextHighlight}</span>
                  </div>
                  <div className="text-slate-500 font-extrabold text-[8px] sm:text-[10px] tracking-wider mt-1.5 text-center uppercase">
                    {slide.logoSub}
                  </div>
                </div>
              </div>

              {/* Right Side: Angled colored blocks */}
              <div 
                className="w-1/2 h-full relative flex flex-col justify-center pl-8 sm:pl-16 md:pl-20 lg:pl-24 pr-4 sm:pr-8 text-left select-none text-white overflow-hidden"
                style={{
                  background: slide.gradient,
                  clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)'
                }}
              >
                {/* Outer border stripes inside the right block for aesthetic premium look */}
                <div className="absolute left-0 top-0 bottom-0 w-2 bg-black/10"></div>
                
                {/* Glowing sphere in the background */}
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#d4af37]/5 blur-xl pointer-events-none"></div>

                <div className="z-10 space-y-1 sm:space-y-1.5">
                  <span className="inline-block bg-[#d4af37]/20 border border-[#d4af37]/30 text-[#d4af37] text-[7px] sm:text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded leading-none">
                    {slide.badge}
                  </span>
                  <h2 className="text-sm sm:text-lg md:text-2xl font-black tracking-tight uppercase leading-none">
                    {slide.title}
                  </h2>
                  <div className="flex items-baseline gap-1 sm:gap-2">
                    <span className="text-base sm:text-2xl md:text-3xl font-black text-yellow-300 tracking-tighter leading-none">
                      {slide.price}
                    </span>
                  </div>
                  <p className="text-[7px] sm:text-[9px] text-white/90 font-bold tracking-wide leading-none uppercase">
                    {slide.tagline}
                  </p>
                  <div className="pt-1.5 sm:pt-2 flex items-center justify-between border-t border-white/20 mt-1">
                    <span className="text-[7px] sm:text-[9px] tracking-wider font-mono text-white/80 select-all leading-none">
                      {slide.link}
                    </span>
                    <button className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 transition-colors px-2.5 py-1 rounded text-[7px] sm:text-[9px] font-black uppercase tracking-wider shadow">
                      Buy Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#d4af37] hover:text-slate-950 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100 cursor-pointer font-bold border border-white/10"
          >
            ‹
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-[#d4af37] hover:text-slate-950 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-10 opacity-0 group-hover:opacity-100 cursor-pointer font-bold border border-white/10"
          >
            ›
          </button>

          {/* Horizontal Dash Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentSlide ? 'bg-[#d4af37] w-8' : 'bg-white/40 hover:bg-white w-4'
                }`}
              />
            ))}
          </div>
        </div>

        {/* 3-Column Promo Grid matching the lower banners in the reference screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          {/* Card 1 */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-[#d4af37] hover:shadow-md transition-all flex flex-col cursor-pointer group">
            <div className="h-32 overflow-hidden relative">
              <img src={nexaproBanner} alt="NexaPro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/10"></div>
            </div>
            <div className="p-3 text-left">
              <span className="text-[9px] font-black text-amber-600 bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Realme Auth
              </span>
              <h4 className="text-xs font-bold text-slate-800 mt-2">NexaPro Tool Server 24x7</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Instant Realme authorization tokens. Starts at 1$ per device.</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-[#d4af37] hover:shadow-md transition-all flex flex-col cursor-pointer group">
            <div className="h-32 overflow-hidden relative">
              <img src={dftProBanner} alt="DFT Pro" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/10"></div>
            </div>
            <div className="p-3 text-left">
              <span className="text-[9px] font-black text-[#d4af37] bg-amber-50 border border-amber-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Xiaomi Server
              </span>
              <h4 className="text-xs font-bold text-slate-800 mt-2">DFT Pro Auth Flash Server</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Xiaomi auth credit pools & flash engine. Starts at 0.5$ per credit.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:border-[#d4af37] hover:shadow-md transition-all flex flex-col cursor-pointer group">
            <div className="h-32 overflow-hidden relative">
              <img src={octoplusBanner} alt="Octoplus" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-slate-950/10"></div>
            </div>
            <div className="p-3 text-left">
              <span className="text-[9px] font-black text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded uppercase tracking-wider">
                Samsung Unlock
              </span>
              <h4 className="text-xs font-bold text-slate-800 mt-2">Octoplus Samsung Engine</h4>
              <p className="text-[10px] text-slate-500 mt-1 leading-relaxed">Samsung factory unlock keys and codes. Starts at 3$ instant.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
