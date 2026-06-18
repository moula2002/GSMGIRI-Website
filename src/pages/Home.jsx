import { useNavigate } from 'react-router-dom';
import React from 'react';
import Hero from './Hero';
import { GlobeIcon, KeyIcon } from '../components/Icons';
import bannerGsmGiri from '../assets/banner_gsmgiri.png';
import bannerNexaPro from '../assets/banner_nexapro_tool.png';
import bannerOctoplus from '../assets/banner_octoplus.png';

export default function Home({
  services = [],
  banners = [],
  promoColumns: dbPromoColumns = [],
  clients = [],
  currency,
  onBookService,
  setSearchQuery,
  }) {
  const navigate = useNavigate();

  // Filter lists from MongoDB using boolean flags
  const bestSellingServices = (services || []).filter(s => s.isBestSelling === true);
  const recentAddedServices = [...(services || [])]
    .sort((a, b) => {
      if (a.isRecentlyAdded && !b.isRecentlyAdded) return -1;
      if (!a.isRecentlyAdded && b.isRecentlyAdded) return 1;
      const dateA = a.createdAt ? new Date(a.createdAt) : (a.id && a.id.startsWith('svc-') ? new Date(Number(a.id.replace('svc-', ''))) : new Date(0));
      const dateB = b.createdAt ? new Date(b.createdAt) : (b.id && b.id.startsWith('svc-') ? new Date(Number(b.id.replace('svc-', ''))) : new Date(0));
      return dateB - dateA;
    })
    .slice(0, 12);

  const defaultBanners = [bannerGsmGiri, bannerNexaPro, bannerOctoplus];
  const defaultTitles = [
    "NOW UNLOCKING TOOLS RENT AVAILABLE!",
    "UNLOCK TOOL SOFTWARE LICENSE PACKAGE ACTIVATION",
    "ALL ACTIVATION CREDITS & INSTANT SERVICES AVAILABLE"
  ];

  const promoColumns = [0, 1, 2].map((colIdx) => {
    const dbCol = (dbPromoColumns || []).find(c => c.columnIndex === colIdx);
    const title = dbCol ? dbCol.title : defaultTitles[colIdx];
    const banner = dbCol && dbCol.banner && (dbCol.banner.startsWith('data:') || dbCol.banner.startsWith('http') || dbCol.banner.startsWith('/media/')) ? dbCol.banner : defaultBanners[colIdx];
    const items = (services || []).filter(s => s.section === 'promo' && s.promoColumnIndex === colIdx);
    return {
      title,
      banner,
      items
    };
  });

  // Custom visual badge thumbnails mapping to match the screenshot styles
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

  // Render a clean service card exactly matching the screenshot UI
  // Shows only the logo/thumbnail on the left, and title + processing badge on the right.
  // Clickable card redirects to the service detail view.
  const renderServiceCard = (svc) => {
    return (
      <div
        key={svc.id}
        onClick={() => onBookService(svc)}
        className="bg-white border border-slate-200/80 rounded-xl p-4 hover:border-slate-350 hover:shadow flex items-center gap-4 group cursor-pointer text-left h-24 select-none"
      >
        {/* Left Side: Thumbnail */}
        {getServiceThumbnail(svc)}

        {/* Right Side: Title and Processing Badge */}
        <div className="flex-1 flex flex-col justify-center min-w-0">
          <h3 className="text-xs font-bold text-slate-700 group-hover:text-slate-900 leading-snug truncate-2-lines uppercase tracking-tight">
            {svc.title}
          </h3>
          <div className="mt-1">
            <span className="inline-block bg-[#fff5eb] text-[#f97316] border border-[#ffedd5] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider leading-none">
              {svc.processing}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Carousel & Search Bar */}
      <Hero
        banners={banners}
        onSearchQuery={(q) => {
          setSearchQuery(q);
          ('services');
        }}
      />

      {/* Sections Container */}
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 font-sans">
        
        {/* Dynamic Promo Columns (Banner Down Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promoColumns.map((col, idx) => (
            <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">
              
              {/* Banner Image */}
              <div className="h-28 overflow-hidden relative border-b border-slate-150 shrink-0">
                <img src={col.banner} alt={col.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-950/20"></div>
              </div>

              {/* List of 3 items stacked vertically */}
              <div className="p-4 flex-1 flex flex-col justify-between divide-y divide-slate-100">
                {col.items.map((svc) => (
                  <div 
                    key={svc.id} 
                    onClick={() => onBookService(svc)}
                    className="py-3.5 first:pt-0 last:pb-0 flex items-center gap-3.5 group cursor-pointer"
                  >
                    {/* Thumbnail */}
                    {getServiceThumbnail(svc)}

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] font-black text-slate-700 group-hover:text-[#d4af37] transition-colors leading-snug truncate-2-lines uppercase tracking-tight">
                        {svc.title}
                      </h4>
                      <div className="mt-1">
                        <span className="inline-block bg-[#fff5eb] text-[#f97316] border border-[#ffedd5] px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider leading-none">
                          {svc.processing}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                {col.items.length === 0 && (
                  <div className="py-8 text-center text-xs text-slate-400 font-semibold italic">
                    No promoted services.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Best Selling Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-6 border-l-4 border-teal-600 pl-3">
            <h2 className="text-sm font-bold tracking-wider text-teal-700 uppercase">
              Best Selling
            </h2>
          </div>

          {/* Grid display */}
          {bestSellingServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-slate-400 font-semibold italic">No best-selling services found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bestSellingServices.map((svc) => renderServiceCard(svc))}
            </div>
          )}
        </div>

        {/* Recent Added Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-6 border-l-4 border-teal-600 pl-3">
            <h2 className="text-sm font-bold tracking-wider text-teal-700 uppercase">
              Recent Added
            </h2>
          </div>

          {/* Grid display */}
          {recentAddedServices.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-sm text-slate-400 font-semibold italic">No recently added services found.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAddedServices.map((svc) => renderServiceCard(svc))}
            </div>
          )}
        </div>


      </div>
    </div>
  );
}
