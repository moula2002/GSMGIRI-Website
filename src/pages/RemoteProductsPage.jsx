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
    if (currency === 'INR') return `${Number(price).toFixed(2)} INR`;
    const converted = Number(price) / 83;
    return `${converted.toFixed(2)} USD`;
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
      <div className="flex flex-col md:flex-row justify-between mb-8 bg-white p-6 border border-slate-100 shadow-sm rounded-sm">
        <div>
          <h1 className="text-lg font-bold text-slate-800 uppercase tracking-wide">REMOTE SERVICE LIST</h1>
          <div className="text-sm text-slate-500 mt-1.5 flex items-center gap-2">
            <span className="hover:text-slate-800 cursor-pointer">Home</span>
            <span className="text-slate-300">&gt;</span>
            <span>Remote Service List</span>
          </div>
        </div>
        <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center gap-4">
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none w-full md:w-auto">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider border transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#008080] text-white border-[#008080]'
                    : 'bg-white text-slate-500 border-slate-200 hover:border-[#008080]/40 hover:text-[#008080]'
                }`}
              >
                {cat === 'all' ? 'All Tools' : cat}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search Service"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-64 px-4 py-2.5 text-sm border border-slate-200 rounded-md focus:outline-none focus:border-slate-300"
          />
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((product) => (
            <div
              key={product.id || product._id}
              onClick={() => handleBook(product)}
              className="bg-white border border-slate-100 rounded-md p-4 hover:border-slate-200 hover:shadow-sm transition-all duration-300 group flex flex-row items-center gap-4 cursor-pointer"
            >
              {/* Product Image or Icon */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-lg overflow-hidden shrink-0 flex items-center justify-center border border-slate-100 bg-[#008080]">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover bg-white"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-white">
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <path d="M8.5 10a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                      <path d="M21 15l-5-5L5 21" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h3 className="text-[13px] font-medium text-slate-600 uppercase leading-snug mb-3">
                  {product.name}
                </h3>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-cyan-50 text-teal-600 px-2 py-1 rounded text-[11px] font-bold">
                    {getConvertedPrice(product.rentalPrice || 0)}
                  </span>
                  <span className="bg-orange-50 text-orange-400 px-2 py-1 rounded text-[11px] font-bold uppercase">
                    {product.duration || 'INSTANT'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
