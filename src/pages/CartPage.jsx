import { useNavigate } from 'react-router-dom';
import React from 'react';

export default function CartPage({
  cart = [],
  setCart,
  currency,
  user,
  setOpenAuthModal,
  
  setSelectedProduct
}) {
  const navigate = useNavigate();

  const getConvertedPrice = (priceINR) => {
    if (currency === 'INR') {
      return priceINR;
    }
    return Math.round(priceINR / 83);
  };

  const formatPrice = (price) => {
    if (currency === 'INR') {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return `$${price.toLocaleString('en-US')}`;
  };

  const handleQtyChange = (id, val) => {
    const updated = cart.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(1, item.quantity + val) };
      }
      return item;
    });
    setCart(updated);
    localStorage.setItem('gsm_cart', JSON.stringify(updated));
  };

  const handleRemove = (id) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('gsm_cart', JSON.stringify(updated));
  };

  const getSubtotal = () => {
    return cart.reduce((acc, item) => acc + (getConvertedPrice(item.priceINR) * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (!user) {
      setOpenAuthModal(true);
      return;
    }
    if (cart.length === 0) return;

    // We can set the selected product to a synthetic product representating the cart, 
    // or tell checkout to process the cart.
    // Let's pass a synthetic cart product or checkout cart items
    setSelectedProduct({
      id: 'cart-checkout',
      title: `${cart.length} Cart Items Checkout`,
      priceINR: cart.reduce((acc, item) => acc + (item.priceINR * item.quantity), 0),
      processing: '1-15 MINUTES',
      type: 'Cart Purchase',
      isCart: true,
      items: cart
    });
    navigate('/checkout');
  };

  // Helper to render thumbnails
  const getServiceThumbnail = (svc) => {
    if (svc.image) {
      return <img src={svc.image} alt={svc.title} className="w-12 h-12 object-cover rounded-xl" />;
    }
    const t = svc.thumbType || 'default';
    return (
      <div className="w-12 h-12 bg-slate-100 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-center">
        <span className="text-[7px] text-slate-400 font-bold uppercase">SERVICE</span>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-left font-sans text-slate-800">
      <div className="flex items-center gap-3 mb-8 border-l-4 border-[#d4af37] pl-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">
          Shopping Cart
        </h1>
      </div>

      {cart.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center shadow-sm space-y-4">
          <span className="text-4xl">🛒</span>
          <h2 className="text-lg font-bold text-slate-700">Your Cart is Empty</h2>
          <p className="text-xs text-slate-400">Add services and tool rentals from the inventory list to checkout.</p>
          <button
            onClick={() => navigate('/services')}
            className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer border border-[#d4af37]/35 inline-block"
          >
            Browse Services
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-4 justify-between"
              >
                <div className="flex items-center gap-3.5 flex-1 min-w-0">
                  {getServiceThumbnail(item)}
                  <div className="min-w-0">
                    <h3 className="text-xs font-bold text-slate-800 uppercase truncate leading-snug">
                      {item.title}
                    </h3>
                    <span className="text-[9px] text-[#d4af37] font-bold block mt-0.5">
                      Rate: {formatPrice(getConvertedPrice(item.priceINR))}
                    </span>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden shrink-0 bg-slate-50">
                  <button
                    onClick={() => handleQtyChange(item.id, -1)}
                    className="px-2 py-1 hover:bg-slate-200 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 font-bold text-slate-700 bg-white min-w-[24px] text-center text-xs">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => handleQtyChange(item.id, 1)}
                    className="px-2 py-1 hover:bg-slate-200 font-bold transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Item Total & Remove */}
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-xs font-black text-slate-800 min-w-[60px] text-right">
                    {formatPrice(getConvertedPrice(item.priceINR) * item.quantity)}
                  </span>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="text-red-500 hover:text-red-750 p-1.5 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    title="Remove Item"
                  >
                    🗑
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-2">
              Cart Summary
            </h3>

            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Total Items:</span>
                <span className="font-bold text-slate-800">{cart.reduce((a, b) => a + b.quantity, 0)}</span>
              </div>
              <div className="flex justify-between border-t border-slate-100 pt-3 text-sm font-bold text-slate-800">
                <span className="uppercase tracking-wide">Subtotal:</span>
                <span className="text-base text-[#d4af37] font-black">{formatPrice(getSubtotal())}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm border border-[#d4af37]/35 cursor-pointer text-center block mt-3"
            >
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
