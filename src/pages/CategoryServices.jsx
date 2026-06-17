import React, { useEffect } from 'react';
import { GlobeIcon, KeyIcon } from '../components/Icons';

export default function CategoryServices({
  services = [],
  categorySlug,
  categories = [],
  currency,
  onBookService,
  setActiveTab
}) {
  // Scroll to top when this page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [categorySlug]);

  const currentCategory = categories.find(c => c.slug === categorySlug);
  const categoryName = currentCategory ? currentCategory.name : (categorySlug ? categorySlug.toUpperCase() : 'Services');

  // Filter services by active category
  const filteredServices = services.filter(s => s.category === categorySlug);

  // Helper to convert prices
  const getConvertedPrice = (priceINR) => {
    if (currency === 'INR') {
      return `₹${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(priceINR / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  // Custom visual badge thumbnails
  const getServiceThumbnail = (svc) => {
    if (svc.image) {
      return (
        <img 
          src={svc.image} 
          alt={svc.title} 
          className="w-14 h-14 object-cover rounded-xl shrink-0 border border-slate-200"
        />
      );
    }
    const t = svc.thumbType || 'default';
    if (t === 'rent') {
      return (
        <div className="w-14 h-14 bg-gradient-to-br from-[#0b192c] to-[#152e50] rounded-xl flex flex-col items-center justify-center shrink-0 border border-cyan-500/20 text-center font-sans p-1 shadow-inner relative select-none">
          <span className="text-[6px] text-cyan-400 font-extrabold tracking-widest block leading-none uppercase">TOOL</span>
          <span className="text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-rose-450 tracking-tighter leading-none mt-0.5">RENT</span>
        </div>
      );
    }
    if (t === 'unlocktool') {
      return (
        <div className="w-14 h-14 bg-[#fff5eb] border border-orange-200 rounded-xl flex flex-col items-center justify-center shrink-0 text-center font-sans p-1">
          <span className="text-[7px] text-[#f97316] font-bold block leading-none">UNLOCK</span>
          <span className="text-xs text-slate-800 font-black mt-0.5 block leading-none">TOOL</span>
          <span className="text-[6px] text-slate-500 uppercase mt-0.5 block font-bold">LICENSE</span>
        </div>
      );
    }
    if (t === 'amt') {
      return (
        <div className="w-14 h-14 bg-gradient-to-br from-indigo-900 to-slate-950 border border-slate-800 rounded-xl flex flex-col items-center justify-center shrink-0 text-center p-1">
          <span className="text-[7px] text-indigo-400 font-bold block leading-none">ANDROID</span>
          <span className="text-xs text-white font-extrabold mt-0.5 block leading-none">MULTI</span>
          <span className="text-[7px] text-yellow-500 font-black mt-0.5 block leading-none">TOOL</span>
        </div>
      );
    }
    if (t === 'nexapro') {
      return (
        <div className="w-14 h-14 bg-black border border-[#d4af37]/30 rounded-xl flex flex-col items-center justify-center shrink-0 text-center p-1">
          <span className="text-[7px] text-[#d4af37] font-bold block leading-none">NEXA</span>
          <span className="text-[9px] text-white font-black mt-0.5 block leading-none">PRO</span>
          <span className="text-[6px] text-slate-500 uppercase mt-0.5 block font-bold">FRP</span>
        </div>
      );
    }
    if (t === 'gsrealme') {
      return (
        <div className="w-14 h-14 bg-[#050b14] border border-slate-800 rounded-xl flex flex-col items-center justify-center shrink-0 text-center p-1">
          <span className="text-[7px] text-slate-400 font-bold block leading-none">GS</span>
          <span className="text-xs text-yellow-500 font-extrabold mt-0.5 block leading-none">REALME</span>
          <span className="text-[6px] text-slate-500 mt-0.5 block uppercase">AUTH</span>
        </div>
      );
    }
    if (t === 'galaxy') {
      return (
        <div className="w-14 h-14 bg-blue-950 border border-blue-900 rounded-xl flex flex-col items-center justify-center shrink-0 text-center p-1 text-white">
          <span className="text-[7px] text-cyan-400 font-bold block leading-none">GALAXY</span>
          <span className="text-xs text-white font-black mt-0.5 block leading-none">MULTI</span>
          <span className="text-[6px] text-slate-400 mt-0.5 block uppercase">TOOL</span>
        </div>
      );
    }
    if (t === 'samsung') {
      return (
        <div className="w-14 h-14 bg-sky-950 border border-sky-900 rounded-xl flex flex-col items-center justify-center shrink-0 text-center p-1 text-white">
          <span className="text-[8px] text-cyan-400 font-extrabold block leading-none">SAMSUNG</span>
          <span className="text-[9px] text-white font-black mt-0.5 block leading-none">FRP</span>
          <span className="text-[6px] text-slate-400 mt-0.5 block uppercase">SERVICE</span>
        </div>
      );
    }
    return (
      <div className="w-14 h-14 bg-slate-50 border border-slate-200 rounded-xl flex flex-col items-center justify-center shrink-0 text-center p-1">
        <GlobeIcon className="w-5 h-5 text-slate-400" />
        <span className="text-[6px] text-slate-400 mt-0.5 block uppercase font-bold">SERVICE</span>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative font-sans text-left">
      
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('home')}
        className="mb-4 flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#d4af37] transition-colors group cursor-pointer"
      >
        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 group-hover:border-[#d4af37]/50 flex items-center justify-center shadow-sm transition-all group-hover:bg-amber-50/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </span>
        <span className="uppercase tracking-wider">Back to Home</span>
      </button>

      {/* Category Section Header */}
      <div className="flex items-center gap-2 mb-8 border-l-4 border-[#d4af37] pl-3">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-800 uppercase">
          {categoryName}
        </h1>
      </div>

      {filteredServices.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-xl mx-auto">
          <GlobeIcon className="w-12 h-12 text-slate-350 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Services Found</h3>
          <p className="text-xs text-slate-400 mt-1">There are no services configured in this category currently.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((svc) => (
            <div
              key={svc.id}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-300 flex items-start gap-4 group shadow-sm"
            >
              {/* Left Side: Thumbnail */}
              {getServiceThumbnail(svc)}

              {/* Right Side: Details */}
              <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                <div>
                  {/* Title */}
                  <h3 className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-[#d4af37] transition-colors leading-snug truncate-2-lines">
                    {svc.title}
                  </h3>

                  {/* Processing Badge */}
                  <div className="mt-1.5">
                    <span className="inline-block bg-[#fff5eb] text-[#f97316] border border-[#ffedd5] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                      {svc.processing}
                    </span>
                  </div>
                </div>

                {/* Price and Action button */}
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-black text-[#d4af37]">
                      {getConvertedPrice(svc.priceINR)}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookService(svc)}
                    className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 px-3 py-1 rounded text-[10px] font-black transition-all shadow-sm flex items-center gap-1 cursor-pointer border border-[#d4af37]/35 uppercase"
                  >
                    {svc.category === 'remote' ? <KeyIcon className="w-3 h-3 text-slate-950" /> : <GlobeIcon className="w-3 h-3 text-slate-950" />}
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
