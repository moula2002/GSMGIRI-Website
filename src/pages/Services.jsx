import React, { useState } from 'react';
import { GlobeIcon, KeyIcon } from '../components/Icons';
import bannerGsmGiri from '../assets/banner_gsmgiri.png';
import bannerNexaPro from '../assets/banner_nexapro_tool.png';
import bannerOctoplus from '../assets/banner_octoplus.png';

// 3-Column Top Promo Grid Headers Configuration
const PROMO_HEADERS = [
  {
    title: "NOW UNLOCKING TOOLS RENT AVAILABLE!",
    banner: bannerGsmGiri
  },
  {
    title: "UNLOCK TOOL SOFTWARE LICENSE PACKAGE ACTIVATION",
    banner: bannerNexaPro
  },
  {
    title: "ALL ACTIVATION CREDITS & INSTANT SERVICES AVAILABLE",
    banner: bannerOctoplus
  }
];

export default function Services({
  services = [],
  searchQuery,
  promoColumns: dbPromoColumns = [],
  currency,
  onBookService,
  categories: dbCategories = [],
  activeCategory = 'all',
  setActiveCategory
}) {
  const uniqueCategories = Array.from(new Set((services || []).map(s => s.category).filter(Boolean)));
  const categoryLabels = {
    leases: 'B2B Rent Tools',
    packages: 'License Activations',
    credits: 'Credits Pack',
    server: 'Server Services',
    remote: 'Remote Service / Tool-Rent',
    file: 'File Service',
    group: 'Service By Group'
  };
  const categoriesList = [
    { id: 'all', label: 'All Services' },
    ...dbCategories.map(cat => ({
      id: cat.slug,
      label: cat.name
    }))
  ];

  // Append any category from active services not present in the DB categories list
  uniqueCategories.forEach(slug => {
    if (!categoriesList.some(c => c.id === slug)) {
      const label = categoryLabels[slug] || (slug.charAt(0).toUpperCase() + slug.slice(1));
      categoriesList.push({ id: slug, label });
    }
  });

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

  // Filtering Logic
  const filterService = (service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = searchQuery === '' ||
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (service.desc && service.desc.toLowerCase().includes(searchQuery.toLowerCase())) ||
      service.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const bestSelling = (services || []).filter(s => s.isBestSelling === true);
  const recentAdded = [...(services || [])]
    .sort((a, b) => {
      if (a.isRecentlyAdded && !b.isRecentlyAdded) return -1;
      if (!a.isRecentlyAdded && b.isRecentlyAdded) return 1;
      const dateA = a.createdAt ? new Date(a.createdAt) : (a.id && a.id.startsWith('svc-') ? new Date(Number(a.id.replace('svc-', ''))) : new Date(0));
      const dateB = b.createdAt ? new Date(b.createdAt) : (b.id && b.id.startsWith('svc-') ? new Date(Number(b.id.replace('svc-', ''))) : new Date(0));
      return dateB - dateA;
    })
    .slice(0, 12);
  const otherServices = (services || []).filter(s => !s.isBestSelling && !recentAdded.some(ra => ra.id === s.id) && s.section !== 'promo');

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

  const filteredBestSelling = bestSelling.filter(filterService);
  const filteredRecentAdded = recentAdded.filter(filterService);
  const filteredOtherServices = otherServices.filter(filterService);

  const renderServiceGrid = (servicesList, title) => {
    if (servicesList.length === 0) return null;

    return (
      <div className="mb-12">
        {/* Category Section Title with Gold reference border */}
        <div className="flex items-center gap-2 mb-6 border-l-4 border-[#d4af37] pl-3">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 uppercase">
            {title}
          </h2>
        </div>

        {/* Card Grid - Row/Flex format */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesList.map((svc) => (
            <div
              key={svc.id}
              className="bg-white border border-slate-200 rounded-xl p-4 hover:border-[#d4af37]/60 hover:shadow-md transition-all duration-300 flex items-start gap-4 group shadow-sm"
            >
              {/* Left Side: Custom visual thumbnail */}
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
                    {svc.category === 'leases' ? <KeyIcon className="w-3 h-3 text-slate-950" /> : <GlobeIcon className="w-3 h-3 text-slate-950" />}
                    Purchase
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative font-sans">

      {/* Search status or headers */}
      {!searchQuery && (
        <>
          {/* 3-Column Top Promoted Services */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {promoColumns.map((col, idx) => (
              <div key={idx} className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm flex flex-col">

                {/* Banner Image */}
                <div className="h-28 overflow-hidden relative border-b border-slate-150">
                  <img src={col.banner} alt={col.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-slate-950/20"></div>
                </div>

                {/* List of 3 items stacked vertically */}
                <div className="p-4 flex-1 flex flex-col justify-between divide-y divide-slate-100">
                  {col.items.map((svc) => (
                    <div key={svc.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3.5 group">
                      {/* Thumbnail */}
                      {getServiceThumbnail(svc)}

                      {/* Details */}
                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <h4 className="text-[11px] font-black text-slate-800 leading-snug group-hover:text-[#d4af37] transition-colors truncate-2-lines">
                            {svc.title}
                          </h4>
                          <div className="mt-1">
                            <span className="inline-block bg-[#fff5eb] text-[#f97316] border border-[#ffedd5] px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider leading-none">
                              {svc.processing}
                            </span>
                          </div>
                        </div>

                        <div className="mt-2.5 flex items-center justify-between border-t border-slate-50 pt-1.5">
                          <span className="text-[10px] font-black text-[#d4af37]">
                            {getConvertedPrice(svc.priceINR)}
                          </span>
                          <button
                            onClick={() => onBookService(svc)}
                            className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 px-2.5 py-0.5 rounded text-[8px] font-black transition-all shadow-sm flex items-center gap-1 cursor-pointer border border-[#d4af37]/30 uppercase"
                          >
                            {svc.category === 'leases' ? <KeyIcon className="w-2.5 h-2.5 text-slate-950" /> : <GlobeIcon className="w-2.5 h-2.5 text-slate-950" />}
                            Purchase
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Category Selection Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 scrollbar-none">
        {categoriesList.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory && setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${activeCategory === cat.id
                ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-sm font-black'
                : 'bg-white border-slate-200 text-slate-500 hover:text-[#d4af37] hover:border-[#d4af37]/40'
              }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Content Grid */}
      {filteredBestSelling.length === 0 && filteredRecentAdded.length === 0 && filteredOtherServices.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
          <GlobeIcon className="w-12 h-12 text-slate-350 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Services Found</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search filters or selecting another category.</p>
        </div>
      ) : (
        <>
          {renderServiceGrid(filteredBestSelling, 'BEST SELLING')}
          {renderServiceGrid(filteredRecentAdded, 'RECENT ADDED')}
          {renderServiceGrid(filteredOtherServices, 'AVAILABLE SERVICES')}
        </>
      )}
    </section>
  );
}
