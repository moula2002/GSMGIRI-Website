import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { GlobeIcon, KeyIcon } from '../components/Icons';
export default function ProductDetail({
  product,
  services = [],
  imeiProducts = [],
  remoteProducts = [],
  setProduct,
  currency,
  user,
  setOpenAuthModal,
  onBookService,
  
  backTab = 'services',
  cart = [],
  setCart,
  wishlist = [],
  setWishlist
}) {
  const navigate = useNavigate();

  const [agreed, setAgreed] = useState(true);
  const [serialNo, setSerialNo] = useState('');

  const isImei = product.type === 'IMEI Service';

  // Scroll to top whenever this page is opened
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  // Helper to convert prices
  const getConvertedPrice = (priceINR) => {
    if (currency === 'INR') {
      return `₹${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(priceINR / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  const handleAddToCart = () => {
    const exists = cart.find(item => item.id === product.id);
    let updated;
    if (exists) {
      updated = cart.map(item => {
        if (item.id === product.id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      updated = [...cart, { ...product, quantity: 1 }];
    }
    setCart(updated);
    localStorage.setItem('gsm_cart', JSON.stringify(updated));
    alert('Added to cart successfully!');
  };

  const handleToggleWishlist = () => {
    let updated;
    if (wishlist.includes(product.id)) {
      updated = wishlist.filter(id => id !== product.id);
    } else {
      updated = [...wishlist, product.id];
    }
    setWishlist(updated);
    localStorage.setItem('gsm_wishlist', JSON.stringify(updated));
  };

  // Helper to render custom visual badge thumbnails
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

  // Find related services of same category
  const getRelatedServices = () => {
    if (product.type === 'IMEI Service') {
      return imeiProducts
        .filter(item => (item.id || item._id) !== product.id)
        .map(item => ({
          id: item.id || item._id,
          title: item.name,
          desc: item.description || '',
          priceINR: item.price || 0,
          type: 'IMEI Service',
          processing: item.duration || 'MINUTES',
          isInstant: true,
          thumbType: 'default',
          image: item.image || '',
          status: item.status || 'Active'
        }))
        .slice(0, 4);
    }
    
    if (product.category === 'remote') {
      return remoteProducts
        .filter(item => (item.id || item._id) !== product.id)
        .map(item => ({
          id: item.id || item._id,
          title: item.name,
          desc: item.description || '',
          priceINR: item.rentalPrice || 0,
          category: 'remote',
          type: 'Remote / Tool-Rent',
          processing: item.duration || 'INSTANT',
          isInstant: true,
          thumbType: 'rent',
          image: item.image || '',
          status: item.status || 'Active'
        }))
        .slice(0, 4);
    }

    return services
      .filter((item) => item.category === product.category && item.id !== product.id)
      .slice(0, 4);
  };

  const relatedItems = getRelatedServices();

  const handlePlaceOrder = () => {
    if (isImei && !serialNo.trim()) {
      alert("Please enter the Serial Number to proceed.");
      return;
    }
    const orderData = { ...product };
    if (isImei) orderData.serialNo = serialNo.trim();
    onBookService(orderData);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative font-sans text-left">
      {/* Back Button */}
      <button
        onClick={() => (backTab)}
        className="mb-4 flex items-center gap-2 text-xs font-black text-slate-600 hover:text-[#d4af37] transition-colors group cursor-pointer"
      >
        <span className="w-7 h-7 rounded-lg bg-white border border-slate-200 group-hover:border-[#d4af37]/50 flex items-center justify-center shadow-sm transition-all group-hover:bg-amber-50/20">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
        </span>
        <span className="uppercase tracking-wider">Back to Services</span>
      </button>

      {/* Breadcrumb */}
      <div className="text-[10px] text-slate-400 mb-6 flex items-center gap-1.5 font-bold uppercase select-none">
        <span>Home</span>
        <span>&gt;</span>
        <span className="text-slate-500 capitalize">{product.type || 'Remote'}</span>
        <span>&gt;</span>
        <span className="text-[#d4af37]">Place an order</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Product Info & Order Form */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start">
            {/* Service Thumbnail */}
            <div className="w-20 h-20 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-center shadow-sm select-none scale-110">
              {getServiceThumbnail(product)}
            </div>

            {/* Title & Path */}
            <div className="flex-1 text-center sm:text-left space-y-1">
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest block">
                Home / {product.type || 'Remote'} / Place an order
              </span>
              <h1 className="text-base sm:text-xl font-black text-slate-800 leading-snug uppercase">
                {product.title}
              </h1>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-3 border border-slate-200 rounded-2xl divide-x divide-slate-200 overflow-hidden bg-slate-50/50 shadow-sm">
            <div className="p-4 text-center">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1 select-none">PRICE</span>
              {user ? (
                <span className="text-xs sm:text-sm font-extrabold text-[#d4af37]">{getConvertedPrice(product.priceINR)}</span>
              ) : (
                <button
                  onClick={() => setOpenAuthModal(true)}
                  className="text-[10px] sm:text-xs font-black text-emerald-600 hover:text-emerald-700 underline cursor-pointer"
                >
                  Login to show
                </button>
              )}
            </div>
            <div className="p-4 text-center">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1 select-none">DELIVERY</span>
              <span className="text-xs sm:text-sm font-extrabold text-slate-700 uppercase tracking-tight">{product.processing}</span>
            </div>
            <div className="p-4 text-center">
              <span className="block text-[9px] font-black text-slate-400 uppercase tracking-wider mb-1 select-none">STATUS</span>
              <span className="text-xs sm:text-sm font-extrabold text-emerald-600 flex items-center justify-center gap-1 select-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                In Stock
              </span>
            </div>
          </div>

          {/* Serial Number Input */}
          {isImei && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-2 text-left">
              <label className="text-xs font-black text-slate-800 tracking-wide block">
                Enter Serial No
              </label>
              <input
                type="text"
                placeholder="Serial No"
                value={serialNo}
                onChange={(e) => setSerialNo(e.target.value)}
                className="w-full bg-[#F8FAFC] border border-[#008080]/40 focus:border-[#008080] text-sm rounded-lg px-4 py-3.5 text-slate-800 focus:outline-none focus:ring-1 focus:ring-[#008080]/30 transition-all shadow-inner placeholder-slate-400"
              />
            </div>
          )}

          {/* Detailed Product Description & Instructions */}
          {product.desc && (
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4 text-left">
              <div className="border-b border-slate-100 pb-2 flex items-center gap-2">
                <div className="w-1.5 h-4 bg-[#d4af37] rounded-sm"></div>
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Service Details & Instructions</h3>
              </div>
              <div className="text-xs text-slate-600 leading-relaxed font-sans whitespace-pre-wrap">
                {product.desc}
              </div>
            </div>
          )}

          {/* Terms & Actions */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-semibold text-slate-600 select-none cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="rounded text-[#d4af37] focus:ring-[#d4af37] w-4 h-4 accent-[#d4af37] cursor-pointer"
              />
              <span>
                I agree to the <span className="text-[#d4af37] hover:underline font-bold">terms and conditions</span>
              </span>
            </label>

            <div className="flex gap-4">
              <button
                onClick={handlePlaceOrder}
                disabled={!agreed || (isImei && !serialNo.trim())}
                className={`flex-1 font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow flex items-center justify-center gap-2 border ${
                  agreed && (!isImei || serialNo.trim())
                    ? 'bg-[#008080] hover:bg-[#006666] text-white border-[#008080]/35 hover:shadow-md cursor-pointer'
                    : 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed shadow-none'
                }`}
              >
                Continue
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Related Services */}
        <div className="space-y-4">
          <div className="border-b border-slate-200 pb-3">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest relative inline-block">
              RELATED SERVICES
              <span className="absolute bottom-[-13px] left-0 right-0 h-0.5 bg-[#d4af37]"></span>
            </h3>
          </div>

          <div className="space-y-4 pt-1.5">
            {relatedItems.length === 0 ? (
              <p className="text-xs text-slate-400 italic">No related tools found.</p>
            ) : (
              relatedItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setProduct(item);
                    setAgreed(true);
                  }}
                  className="flex items-center gap-3.5 bg-white border border-slate-200 rounded-xl p-3 shadow-sm hover:border-[#d4af37]/50 hover:shadow-md transition-all cursor-pointer group"
                >
                  {/* Visual Icon */}
                  <div className="scale-90">
                    {getServiceThumbnail(item)}
                  </div>
                  
                  <div className="flex-1 min-w-0 text-left">
                    <h4 className="text-[11px] font-black text-slate-800 leading-snug group-hover:text-[#d4af37] transition-colors truncate-2-lines uppercase">
                      {item.title}
                    </h4>
                    <div className="mt-1">
                      <span className="inline-block bg-[#fff5eb] text-[#f97316] border border-[#ffedd5] px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider leading-none">
                        {item.processing}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </section>
  );
}
