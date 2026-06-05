import React, { useState } from 'react';
import { GlobeIcon, KeyIcon } from '../components/Icons';
import b2bTravelBanner from '../assets/b2b_travel_api_banner.png';
import b2bHotelBanner from '../assets/b2b_hotel_api_banner.png';
import b2bFlightsBanner from '../assets/b2b_flights_api_banner.png';

// 3-Column Top Promo Grid Data
const PROMO_COLUMNS = [
  {
    title: "NOW UNLOCKING TOOLS RENT AVAILABLE!",
    banner: b2bTravelBanner,
    items: [
      {
        id: 'promo_r1',
        title: 'UnlockTool 6 Hours ➕ Fast (24x7)',
        category: 'leases',
        type: 'Rental Key',
        priceINR: 150,
        processing: '1 INSTANT',
        isInstant: true,
        thumbType: 'rent'
      },
      {
        id: 'promo_r2',
        title: 'Android Multi Tool - 2 Hours ➕ Fast (24x7)',
        category: 'leases',
        type: 'Rental Key',
        priceINR: 100,
        processing: 'INSTANT',
        isInstant: true,
        thumbType: 'rent'
      },
      {
        id: 'promo_r3',
        title: 'Tsm Pro Tool 3 Hours ➕ Fast (24x7)',
        category: 'leases',
        type: 'Rental Key',
        priceINR: 80,
        processing: 'INSTANT',
        isInstant: true,
        thumbType: 'rent'
      }
    ]
  },
  {
    title: "UNLOCK TOOL SOFTWARE LICENSE PACKAGE ACTIVATION",
    banner: b2bHotelBanner,
    items: [
      {
        id: 'promo_a1',
        title: 'UnlockTool 3 months License Activate/Renew',
        category: 'packages',
        type: 'License Activation',
        priceINR: 1850,
        processing: '1-60 MINIUTES',
        isInstant: false,
        thumbType: 'unlocktool'
      },
      {
        id: 'promo_a2',
        title: 'UnlockTool 6 months License Activate/Renew',
        category: 'packages',
        type: 'License Activation',
        priceINR: 2950,
        processing: '1-60 MINIUTES',
        isInstant: false,
        thumbType: 'unlocktool'
      },
      {
        id: 'promo_a3',
        title: 'UnlockTool 12 months License Activate/Renew',
        category: 'packages',
        type: 'License Activation',
        priceINR: 4450,
        processing: '1-60 MINIUTES',
        isInstant: false,
        thumbType: 'unlocktool'
      }
    ]
  },
  {
    title: "ALL ACTIVATION CREDITS & INSTANT SERVICES AVAILABLE",
    banner: b2bFlightsBanner,
    items: [
      {
        id: 'promo_c1',
        title: 'Android Multi Tool - 1 Year Activation(AMT)',
        category: 'credits',
        type: 'Software Activation',
        priceINR: 2450,
        processing: 'MINIUTES',
        isInstant: true,
        thumbType: 'amt'
      },
      {
        id: 'promo_c2',
        title: 'NexaPro Xiaomi Frp Tool ! FDL / FRP ] Any Quantity',
        category: 'credits',
        type: 'FRP Credit',
        priceINR: 180,
        processing: '1-5 MINUTES',
        isInstant: true,
        thumbType: 'nexapro'
      },
      {
        id: 'promo_c3',
        title: 'GS Realme Auth Tool Otp 1 Click',
        category: 'credits',
        type: 'Auth Credit',
        priceINR: 220,
        processing: '1-10 MINUTES',
        isInstant: true,
        thumbType: 'gsrealme'
      }
    ]
  }
];

export const SERVICES_DATA = {
  bestSelling: [
    {
      id: 'bs1',
      title: 'UnlockTool 6 Hours ➕ Fast (24x7)',
      category: 'leases',
      type: 'Rental Key',
      priceINR: 150,
      processing: '1 INSTANT',
      isInstant: true,
      thumbType: 'rent',
      desc: '6 Hours full access to UnlockTool rent console. High success rate, instant activation.'
    },
    {
      id: 'bs2',
      title: 'Android Multi Tool - 2 Hours ➕ Fast (24x7)',
      category: 'leases',
      type: 'Rental Key',
      priceINR: 100,
      processing: 'INSTANT',
      isInstant: true,
      thumbType: 'rent',
      desc: '2 Hours rental license key for Android Multi Tool. Instant credentials delivery.'
    },
    {
      id: 'bs3',
      title: 'Galaxy Auth GRT (Realme OTP) 1 Device',
      category: 'credits',
      type: 'Auth Service',
      priceINR: 120,
      processing: 'INSTANT INSTANT',
      isInstant: true,
      thumbType: 'galaxy',
      desc: 'Realme OTP authentication voucher code for 1 device unlock. Automated API delivery.'
    },
    {
      id: 'bs4',
      title: 'Tsm Pro Tool 3 Hours ➕ Fast (24x7)',
      category: 'leases',
      type: 'Rental Key',
      priceINR: 80,
      processing: 'INSTANT',
      isInstant: true,
      thumbType: 'rent',
      desc: '3 Hours rent token key for Tsm Pro Tool. Safe and automated system release.'
    },
    {
      id: 'bs5',
      title: 'Ghost Auth Tool [ Auth Flash / EFS / Mi Cloud / FDL / FRP ] Any Quantity...',
      category: 'credits',
      type: 'Auth Credit',
      priceINR: 190,
      processing: 'MINIUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'Ghost Auth Tool instant balance credit for Xiaomi auth flash, EFS reset, and bypass.'
    },
    {
      id: 'bs6',
      title: 'HQ AUTH REALME OTP ALL CPU [ NO NEED IMEI ]',
      category: 'credits',
      type: 'Auth Credit',
      priceINR: 250,
      processing: '1-10 MINUTES',
      isInstant: true,
      thumbType: 'gsrealme',
      desc: 'High-quality Realme OTP authentication bypass. Supporting all CPU chipsets.'
    },
    {
      id: 'bs7',
      title: 'NexaPro Xiaomi Frp Tool ! FDL / FRP ] Any Quantity [Existing...',
      category: 'credits',
      type: 'FRP Credit',
      priceINR: 180,
      processing: '1-5 MINUTES',
      isInstant: true,
      thumbType: 'nexapro',
      desc: 'Xiaomi custom FRP bypass credit pools. Instant API verification.'
    },
    {
      id: 'bs8',
      title: 'iRemoval PRO Charity Edition FREE API - iRemoval Pro A12+ FREE Edition...',
      category: 'credits',
      type: 'API Bypass',
      priceINR: 0,
      processing: 'MINIUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'iRemoval PRO free public utility token for A12+ iOS iCloud activation lock check.'
    },
    {
      id: 'bs9',
      title: 'FCK Tool Xiaomi FRP ( Exist User )No refund any issue ❌ ➕ Fast',
      category: 'credits',
      type: 'FRP Credit',
      priceINR: 110,
      processing: '10 MINIUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'Xiaomi FRP lock removal credit pools for existing active users.'
    },
    {
      id: 'bs10',
      title: 'NexaPro A12+ Hello bypass',
      category: 'packages',
      type: 'API Bypass',
      priceINR: 1500,
      processing: '1-2 MINUTES',
      isInstant: true,
      thumbType: 'nexapro',
      desc: 'NexaPro iOS 15/16/17 Hello screen activation bypass credit token.'
    },
    {
      id: 'bs11',
      title: 'Phoenix Service Tool [ SAMSUNG + Nokia HMD TOOL ] (FLASH - FRP - ...',
      category: 'packages',
      type: 'Software Key',
      priceINR: 2800,
      processing: '1-3 MINIUTES',
      isInstant: true,
      thumbType: 'samsung',
      desc: 'Phoenix service tool credits for official firmware flashing and Samsung FRP resets.'
    },
    {
      id: 'bs12',
      title: 'MR_AUTH_Tool | Xiaomi EDL | FRP',
      category: 'credits',
      type: 'Auth Service',
      priceINR: 220,
      processing: 'MINIUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'Xiaomi EDL authorized authentication credit package for flashing locked devices.'
    }
  ],
  recentAdded: [
    {
      id: 'ra1',
      title: 'MDM FIX TOOL RENT [ 6 Hours ]',
      category: 'leases',
      type: 'Rental Key',
      priceINR: 300,
      processing: 'INSTANT',
      isInstant: true,
      thumbType: 'rent',
      desc: '6 Hours full access lease to MDM Fix Tool console. Automated credentials delivery.'
    },
    {
      id: 'ra2',
      title: 'Galaxy Multi Tool 20 Credit Pack',
      category: 'credits',
      type: 'Credit Pack',
      priceINR: 1800,
      processing: 'INSTANT MINIUTES',
      isInstant: true,
      thumbType: 'galaxy',
      desc: '20 Credits package for Galaxy Multi Tool. Supporting Samsung unlock features.'
    },
    {
      id: 'ra3',
      title: 'Galaxy Multi Tool - 6 Months Auto Api',
      category: 'packages',
      type: 'API License',
      priceINR: 3500,
      processing: 'INSTANT',
      isInstant: true,
      thumbType: 'galaxy',
      desc: '6 Months access API license key for Galaxy Multi Tool server pool.'
    },
    {
      id: 'ra4',
      title: 'Galaxy Multi Tool - 1 Year Auto Api',
      category: 'packages',
      type: 'API License',
      priceINR: 6500,
      processing: 'INSTANT MINIUTES',
      isInstant: true,
      thumbType: 'galaxy',
      desc: '12 Months access API license key for Galaxy Multi Tool server pool.'
    },
    {
      id: 'ra5',
      title: 'Galaxy Multi Tool - 1 Months Auto Api',
      category: 'packages',
      type: 'API License',
      priceINR: 950,
      processing: 'INSTANT',
      isInstant: true,
      thumbType: 'galaxy',
      desc: '30 Days access API license key for Galaxy Multi Tool server pool.'
    },
    {
      id: 'ra6',
      title: 'Samsung FRP Worldwide - IMEI/SN Service (VIP Level)',
      category: 'credits',
      type: 'IMEI Service',
      priceINR: 1200,
      processing: 'MINIUTES',
      isInstant: true,
      thumbType: 'samsung',
      desc: 'VIP Samsung factory FRP lock check and removal via device IMEI/Serial number.'
    },
    {
      id: 'ra7',
      title: 'Samsung FRP Worldwide - IMEI/SN Service ( Super Level )',
      category: 'credits',
      type: 'IMEI Service',
      priceINR: 850,
      processing: '1-15 MINIUTES',
      isInstant: true,
      thumbType: 'samsung',
      desc: 'Standard Samsung factory FRP lock check and removal via device IMEI/Serial number.'
    },
    {
      id: 'ra8',
      title: 'UK-TOOLS Realme (O+ Support) Realme Token',
      category: 'credits',
      type: 'Auth Token',
      priceINR: 240,
      processing: 'MINIUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'Realme Oppo server authentication token. Direct automated API connection.'
    },
    {
      id: 'ra9',
      title: 'GALAXY ONEPLUS AUTH FLASH OTP (Galaxy-Realme.Com)',
      category: 'credits',
      type: 'Auth Flash',
      priceINR: 300,
      processing: 'INSTANT MINIUTES',
      isInstant: true,
      thumbType: 'galaxy',
      desc: 'OnePlus network auth flash OTP credits. Automated server validation.'
    },
    {
      id: 'ra10',
      title: 'JUDE AIO ACTIVATOR A5 TO A19 ICLOUD BYPASS NO NEED JAILBREAK',
      category: 'credits',
      type: 'iCloud Bypass',
      priceINR: 1450,
      processing: '1-5 MINUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'Jude AIO bypass credentials for iOS A5 to A19 devices. No jailbreak required.'
    },
    {
      id: 'ra11',
      title: 'INFINIX - TECNO - ITEL ID Removal - Official Service { 1 -...',
      category: 'credits',
      type: 'ID Removal',
      priceINR: 900,
      processing: '1-6 HOURS',
      isInstant: false,
      thumbType: 'default',
      desc: 'Official database ID removal service for Infinix, Tecno, and Itel account locks.'
    },
    {
      id: 'ra12',
      title: 'Rapid Flash Tool Auth Tool Credit Any Qty (AUTH, FRP, FASTBOOT TO...',
      category: 'credits',
      type: 'Auth Credit',
      priceINR: 130,
      processing: 'MINIUTES',
      isInstant: true,
      thumbType: 'default',
      desc: 'Rapid Flash Tool account credits. Supported for EDL auth flash and fastboot tools.'
    }
  ]
};

export default function Services({ searchQuery, currency, onBookService }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'leases', label: 'B2B Rent Tools' },
    { id: 'packages', label: 'License Activations' },
    { id: 'credits', label: 'Credits Pack' }
  ];

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

  const filteredBestSelling = SERVICES_DATA.bestSelling.filter(filterService);
  const filteredRecentAdded = SERVICES_DATA.recentAdded.filter(filterService);

  const renderServiceGrid = (services, title) => {
    if (services.length === 0) return null;

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
          {services.map((svc) => (
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
                    {svc.category === 'leases' ? 'Rent' : 'Book'}
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
            {PROMO_COLUMNS.map((col, idx) => (
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
                              {col.items.indexOf(svc) === 0 ? svc.processing : '1-60 MINIUTES'}
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
                            {svc.category === 'leases' ? 'Rent' : 'Book'}
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
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all border ${
              activeCategory === cat.id
                ? 'bg-[#d4af37] text-slate-950 border-[#d4af37] shadow-sm font-black'
                : 'bg-white border-slate-200 text-slate-500 hover:text-[#d4af37] hover:border-[#d4af37]/40'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Content Grid */}
      {filteredBestSelling.length === 0 && filteredRecentAdded.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
          <GlobeIcon className="w-12 h-12 text-slate-350 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-700">No Services Found</h3>
          <p className="text-xs text-slate-400 mt-1">Try adjusting your search filters or selecting another category.</p>
        </div>
      ) : (
        <>
          {renderServiceGrid(filteredBestSelling, 'BEST SELLING')}
          {renderServiceGrid(filteredRecentAdded, 'RECENT ADDED')}
        </>
      )}
    </section>
  );
}
