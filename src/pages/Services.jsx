import React, { useState } from 'react';
import { GlobeIcon, KeyIcon } from '../components/Icons';

const SERVICES_DATA = {
  bestSelling: [
    {
      id: 'bs1',
      title: 'Maldives Overwater Retreat - Agent Net Rate (Double Sharing)',
      category: 'packages',
      type: 'B2B Package',
      priceINR: 48000,
      processing: '1 INSTANT',
      isInstant: true,
      desc: '3 Nights luxury overwater villa, private transfers, net rate for double sharing.'
    },
    {
      id: 'bs2',
      title: 'White-label Flight Search Engine - 24 Hours Key Lease',
      category: 'leases',
      type: 'API Engine Lease',
      priceINR: 1500,
      processing: 'MINIUTES',
      isInstant: false,
      desc: 'Rent full multi-GDS flight aggregator UI branded for your agency. Valid for 24 hours.'
    },
    {
      id: 'bs3',
      title: 'Swiss Alpine Expedition - B2B Custom Vouchers',
      category: 'packages',
      type: 'B2B Package',
      priceINR: 85000,
      processing: '5-10 MINUTES',
      isInstant: false,
      desc: '5 Nights chalet stays, Swiss travel pass vouchers, agent custom logo PDF generation.'
    },
    {
      id: 'bs4',
      title: 'Global Visa Eligibility Checking API - 50 Credit Pack',
      category: 'credits',
      type: 'Credit Pack',
      priceINR: 4000,
      processing: '1 INSTANT',
      isInstant: true,
      desc: 'API keys for 50 instant automated visa documents checks across 150+ countries.'
    },
    {
      id: 'bs5',
      title: 'Paris Attractions & Activities API - 12 Hour Lease Key',
      category: 'leases',
      type: 'API Engine Lease',
      priceINR: 2800,
      processing: 'INSTANT',
      isInstant: true,
      desc: 'Direct XML key access to instant ticketing systems for Eiffel Tower, Louvre, Disneyland Paris.'
    },
    {
      id: 'bs6',
      title: 'Singapore Sentosa Island Voucher Bundle (Agent Net)',
      category: 'packages',
      type: 'B2B Package',
      priceINR: 12500,
      processing: '5 MINIUTES',
      isInstant: false,
      desc: 'Universal Studios & cable car net ticket bundles for sub-agency distribution.'
    }
  ],
  recentAdded: [
    {
      id: 'ra1',
      title: 'Bali Beachfront Paradise - Agent Net Promo Rate (Couple)',
      category: 'packages',
      type: 'B2B Package',
      priceINR: 35000,
      processing: '1 INSTANT',
      isInstant: true,
      desc: '4 Nights luxury Seminyak pool villa, private airport transfer, couple pricing.'
    },
    {
      id: 'ra2',
      title: 'Custom Travel Insurance Issuance API - 20 Policies Pack',
      category: 'credits',
      type: 'Credit Pack',
      priceINR: 2500,
      processing: '1-2 MINIUTES',
      isInstant: false,
      desc: 'Issue 20 international travel insurance coverage slips with instant PDF generation.'
    },
    {
      id: 'ra3',
      title: 'White-label Hotel Booking Engine - 3 Months Full Access',
      category: 'leases',
      type: 'API Engine Lease',
      priceINR: 18000,
      processing: '10-15 MINIUTES',
      isInstant: false,
      desc: 'Aggregated bed-bank booking system portal with custom margin tools. Zero hosting fees.'
    },
    {
      id: 'ra4',
      title: 'Disney World Orlando Agent Direct API Ticket Key',
      category: 'leases',
      type: 'API Engine Lease',
      priceINR: 9200,
      processing: 'INSTANT',
      isInstant: true,
      desc: '1-day parkhopper B2B tickets API direct link. Live stock allocation.'
    },
    {
      id: 'ra5',
      title: 'London Transit Pass API Integration Key (1 Week Pass)',
      category: 'leases',
      type: 'API Engine Lease',
      priceINR: 5600,
      processing: '1-3 HOURS',
      isInstant: false,
      desc: 'Generate Visitor Oyster Card codes directly for clients. Net rate billing.'
    },
    {
      id: 'ra6',
      title: 'Luxury Yacht Charter - Dubai Marina Net Agency Rate',
      category: 'packages',
      type: 'B2B Package',
      priceINR: 22000,
      processing: '10 MINIUTES',
      isInstant: false,
      desc: 'Private 3-hour yacht rental net rate. Instant voucher code generated for agency.'
    }
  ]
};

export default function Services({ searchQuery, currency, onBookService }) {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services' },
    { id: 'packages', label: 'B2B Packages' },
    { id: 'leases', label: 'API Leases' },
    { id: 'credits', label: 'Credit Packs' }
  ];

  // Helper to convert prices
  const getConvertedPrice = (priceINR) => {
    if (currency === 'INR') {
      return `₹${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(priceINR / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  // Restructured service card thumbnail generator on the left
  const getServiceThumbnail = (svc) => {
    if (svc.category === 'leases') {
      return (
        <div className="w-16 h-16 bg-slate-900 rounded-lg flex flex-col items-center justify-center shrink-0 border border-slate-800 text-center font-sans p-1.5 shadow-inner">
          <span className="text-[8px] text-cyan-400 font-extrabold tracking-widest block leading-none">API</span>
          <span className="text-xs text-rose-500 font-black tracking-widest mt-0.5 block leading-none">RENT</span>
          <span className="text-[7px] text-slate-500 uppercase mt-0.5 block">License</span>
        </div>
      );
    }
    if (svc.category === 'credits') {
      return (
        <div className="w-16 h-16 bg-teal-50 border border-teal-100 rounded-lg flex flex-col items-center justify-center shrink-0 text-center font-sans p-1.5">
          <span className="text-[8px] text-teal-700 font-bold block leading-none">CREDIT</span>
          <span className="text-sm text-teal-800 font-extrabold mt-0.5 block leading-none">API</span>
          <span className="text-[7px] text-teal-500 uppercase mt-0.5 block">Access</span>
        </div>
      );
    }
    // Packages (mini visual thumbnail photos)
    let photo = "https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=100&h=100&q=80";
    if (svc.title.includes("Swiss")) {
      photo = "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=100&h=100&q=80";
    } else if (svc.title.includes("Bali")) {
      photo = "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=100&h=100&q=80";
    } else if (svc.title.includes("Singapore")) {
      photo = "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=100&h=100&q=80";
    } else if (svc.title.includes("Dubai")) {
      photo = "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=100&h=100&q=80";
    }
    return (
      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 border border-slate-200 shadow-sm">
        <img src={photo} alt="" className="w-full h-full object-cover" />
      </div>
    );
  };

  // Filtering Logic
  const filterService = (service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch = searchQuery === '' || 
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      service.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  };

  const filteredBestSelling = SERVICES_DATA.bestSelling.filter(filterService);
  const filteredRecentAdded = SERVICES_DATA.recentAdded.filter(filterService);

  const renderServiceGrid = (services, title) => {
    if (services.length === 0) return null;

    return (
      <div className="mb-12">
        {/* Category Section Title with Teal reference styling */}
        <div className="flex items-center gap-2 mb-6 border-l-4 border-[#d4af37] pl-3">
          <h2 className="text-lg md:text-xl font-bold tracking-tight text-slate-800 uppercase">
            {title}
          </h2>
        </div>

        {/* Card Grid - Restructured to Row/Flex format matching gsmgiri */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((svc) => (
            <div
              key={svc.id}
              className="bg-white border border-slate-200 rounded-lg p-4 hover:border-teal-500/50 hover:shadow-md transition-all duration-300 flex items-start gap-4 group shadow-sm"
            >
              {/* Left Side: Thumbnail logo/graphic */}
              {getServiceThumbnail(svc)}

              {/* Right Side: Details */}
              <div className="flex-1 flex flex-col justify-between h-full min-w-0">
                <div>
                  {/* Title */}
                  <h3 className="text-xs md:text-sm font-bold text-slate-800 group-hover:text-[#d4af37] transition-colors leading-snug truncate-2-lines">
                    {svc.title}
                  </h3>
                  
                  {/* Processing Badge matching reference orange tags */}
                  <div className="mt-1">
                    <span className="inline-block bg-[#fff5eb] text-[#f97316] border border-[#ffedd5] px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider">
                      {svc.processing}
                    </span>
                  </div>
                </div>

                {/* Price and Action trigger */}
                <div className="mt-4 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-black text-[#d4af37]">
                      {getConvertedPrice(svc.priceINR)}
                    </span>
                  </div>

                  <button
                    onClick={() => onBookService(svc)}
                    className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 px-2.5 py-1 rounded text-[10px] font-black transition-all shadow-sm flex items-center gap-1 cursor-pointer border border-[#d4af37]/30"
                  >
                    {svc.category === 'leases' ? <KeyIcon className="w-3 h-3" /> : <GlobeIcon className="w-3 h-3" />}
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
    <section className="max-w-7xl mx-auto px-4 py-8 relative">
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
