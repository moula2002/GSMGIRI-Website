import React, { useState } from 'react';

const WrenchIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ClockIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SearchIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function RemoteProductsPage({
  remoteProducts = [],
  currency = 'INR',
  onProductSelect,
  user,
  setOpenAuthModal
}) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getConvertedPrice = (price) => {
    if (currency === 'INR') return `₹${Number(price).toLocaleString('en-IN')}`;
    const converted = Math.round(Number(price) / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  // Extract unique categories
  const categories = ['all', ...Array.from(new Set(remoteProducts.map(p => p.category).filter(Boolean)))];

  const filtered = remoteProducts.filter(p => {
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase())) ||
      (p.duration && p.duration.toLowerCase().includes(search.toLowerCase())) ||
      (p.category && p.category.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  const handleBook = (product) => {
    if (!user) {
      setOpenAuthModal(true);
      return;
    }
    // Map Remote product fields to ProductDetail's expected shape
    onProductSelect({
      id: product.id || product._id,
      title: product.name,
      desc: product.description || '',
      priceINR: product.rentalPrice || 0,
      category: 'remote',
      type: 'Remote / Tool-Rent',
      processing: product.duration || 'INSTANT',
      isInstant: true,
      thumbType: 'rent',
      image: product.image || '',
      status: product.status || 'Active'
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-[#0b192c] to-[#1a3050] rounded-2xl shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center shrink-0">
          <WrenchIcon className="w-7 h-7 text-cyan-400" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">Remote / Tool-Rent</h1>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {remoteProducts.length} tool{remoteProducts.length !== 1 ? 's' : ''} available • Direct from database
          </p>
        </div>
        <div className="ml-auto hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
          <ClockIcon className="w-4 h-4 text-[#d4af37]" />
          <span className="text-xs text-white font-bold">Instant Activation</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tools by name, duration..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500/20 transition-all"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all ${
                selectedCategory === cat
                  ? 'bg-[#d4af37] text-slate-950 border-[#d4af37]'
                  : 'bg-white text-slate-500 border-slate-200 hover:border-[#d4af37]/40 hover:text-[#d4af37]'
              }`}
            >
              {cat === 'all' ? 'All Tools' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      {remoteProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <WrenchIcon className="w-14 h-14 text-slate-300 mx-auto mb-4" />
          <h3 className="text-base font-bold text-slate-600">No Remote Tools Yet</h3>
          <p className="text-xs text-slate-400 mt-1">Remote / Tool-Rent products will appear here once added by the admin.</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
          <h3 className="text-base font-bold text-slate-600">No Results Found</h3>
          <p className="text-xs text-slate-400 mt-1">Try a different search term or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product) => (
            <div
              key={product.id || product._id}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-cyan-400/50 hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              {/* Product Image or Icon */}
              <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-[#0b192c] to-[#152e50] border border-slate-800/40 flex items-center justify-center shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                      <WrenchIcon className="w-7 h-7 text-cyan-400" />
                    </div>
                    <span className="text-[8px] text-cyan-400 uppercase tracking-widest font-black">TOOL RENT</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col">
                {/* Category Badge */}
                {product.category && (
                  <span className="inline-block self-start mb-2 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-cyan-50 text-cyan-700 border border-cyan-200">
                    {product.category}
                  </span>
                )}

                <h3 className="text-sm font-black text-slate-800 group-hover:text-[#d4af37] transition-colors leading-snug mb-2">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Duration & Status Badges */}
                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {product.duration && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider bg-amber-50 text-amber-700 border border-amber-200">
                      <ClockIcon className="w-2.5 h-2.5" />
                      {product.duration}
                    </span>
                  )}
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                    product.status === 'Active'
                      ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${product.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                    {product.status || 'Active'}
                  </span>
                </div>

                {/* Price + CTA */}
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Rental Price</span>
                    <span className="text-base font-black text-[#d4af37]">
                      {getConvertedPrice(product.rentalPrice || 0)}
                    </span>
                  </div>
                  <button
                    onClick={() => handleBook(product)}
                    className="bg-gradient-to-r from-[#d4af37] to-[#c5a059] hover:from-[#c5a059] hover:to-[#b8923e] text-slate-950 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
                    Rent Now
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
