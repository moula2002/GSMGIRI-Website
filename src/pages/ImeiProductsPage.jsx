import React, { useState } from 'react';

const SmartphoneIcon = ({ className = 'w-6 h-6' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.75}>
    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
    <line x1="12" y1="18" x2="12.01" y2="18" />
  </svg>
);

const SearchIcon = ({ className = 'w-4 h-4' }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function ImeiProductsPage({
  imeiProducts = [],
  currency = 'INR',
  onProductSelect,
  user,
  setOpenAuthModal
}) {
  const [search, setSearch] = useState('');

  const getConvertedPrice = (price) => {
    if (currency === 'INR') return `₹${Number(price).toLocaleString('en-IN')}`;
    const converted = Math.round(Number(price) / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  const filtered = imeiProducts.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.description && p.description.toLowerCase().includes(search.toLowerCase()));
    return matchSearch;
  });

  const handleBook = (product) => {
    if (!user) {
      setOpenAuthModal(true);
      return;
    }
    // Map IMEI product fields to ProductDetail's expected shape
    onProductSelect({
      id: product.id || product._id,
      title: product.name,
      desc: product.description || '',
      priceINR: product.price || 0,
      type: 'IMEI Service',
      processing: 'MINUTES',
      isInstant: true,
      thumbType: 'default',
      image: product.image || '',
      status: product.status || 'Active'
    });
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans">
      {/* Page Header */}
      <div className="flex items-center gap-4 mb-8 p-6 bg-gradient-to-r from-[#0b192c] to-[#152e50] rounded-2xl shadow-lg">
        <div className="w-14 h-14 rounded-2xl bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center shrink-0">
          <SmartphoneIcon className="w-7 h-7 text-[#d4af37]" />
        </div>
        <div>
          <h1 className="text-xl font-black text-white tracking-tight">IMEI Services</h1>
          <p className="text-xs text-slate-400 mt-0.5 font-medium">
            {imeiProducts.length} service{imeiProducts.length !== 1 ? 's' : ''} available • Direct from database
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <SearchIcon className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search IMEI services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm border border-slate-200 rounded-xl bg-white focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37]/30 transition-all"
          />
        </div>
      </div>

      {/* Products Grid */}
      {imeiProducts.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 shadow-sm">
          <SmartphoneIcon className="w-14 h-14 text-slate-300 mx-auto mb-4" />
          <h3 className="text-base font-bold text-slate-600">No IMEI Services Yet</h3>
          <p className="text-xs text-slate-400 mt-1">IMEI services will appear here once added by the admin.</p>
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
              onClick={() => handleBook(product)}
              className="bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#d4af37]/50 hover:shadow-lg transition-all duration-300 group flex flex-col cursor-pointer"
            >
              {/* Product Image or Icon */}
              <div className="w-full h-36 rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-100 flex items-center justify-center shrink-0">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#0b192c] to-[#152e50] border border-[#d4af37]/30 flex items-center justify-center">
                      <SmartphoneIcon className="w-7 h-7 text-[#d4af37]" />
                    </div>
                    <span className="text-[9px] text-slate-400 uppercase tracking-widest font-bold">IMEI SERVICE</span>
                  </div>
                )}
              </div>

              <div className="flex-1 flex flex-col">

                <h3 className="text-sm font-black text-slate-800 group-hover:text-[#d4af37] transition-colors leading-snug mb-2">
                  {product.name}
                </h3>

                {product.description && (
                  <p className="text-xs text-slate-500 leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}

                {/* Status Badge */}
                <div className="flex items-center gap-2 mb-4">
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
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <span className="text-base font-black text-[#d4af37]">
                      {getConvertedPrice(product.price || 0)}
                    </span>
                  </div>
                  <button
                    className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-all shadow-sm hover:shadow-md cursor-pointer"
                  >
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
