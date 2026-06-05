import React from 'react';
import Hero from './Hero';
import Services from './Services';

export default function Home({ currency, onBookService, setSearchQuery, setActiveTab }) {
  return (
    <div>
      {/* Carousel & Search Bar */}
      <Hero
        onSearchQuery={(q) => {
          setSearchQuery(q);
          setActiveTab('services');
        }}
      />

      {/* Quick Preview Grid (Services Section) */}
      <div className="bg-slate-100/40 border-t border-slate-200 py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-slate-800 uppercase tracking-tight">Best Selling Services</h2>
            <p className="text-[10px] text-slate-500 uppercase mt-0.5">Fast & Secure Mobile Unlocking Solutions</p>
          </div>
          <button
            onClick={() => {
              setSearchQuery('');
              setActiveTab('services');
            }}
            className="text-xs text-[#d4af37] hover:text-[#c5a059] font-bold border border-slate-200 hover:border-[#d4af37] hover:bg-amber-50/10 px-3 py-1.5 rounded transition-all"
          >
            View All Services →
          </button>
        </div>

        {/* Renders Services */}
        <Services
          searchQuery=""
          currency={currency}
          onBookService={onBookService}
        />
      </div>
    </div>
  );
}
