import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function CheckoutPage({ cart = [], user, currency, handleCheckoutComplete }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || cart.length === 0) {
      navigate('/cart');
    }
  }, [user, cart, navigate]);

  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  const getConvertedPrice = (priceINR) => {
    if (currency === 'INR') return priceINR;
    return Math.round(priceINR / 83);
  };

  const formatPrice = (price) => {
    if (currency === 'INR') return `₹${price.toLocaleString('en-IN')}`;
    return `$${price.toLocaleString('en-US')}`;
  };

  const subtotal = cart.reduce((acc, item) => acc + (getConvertedPrice(item.priceINR) * item.quantity), 0);

  const onConfirm = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleCheckoutComplete(cart, subtotal);
    }, 1500);
  };

  if (cart.length === 0 || !user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 font-sans text-left">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Checkout</h1>
        <p className="text-sm text-slate-500 mt-1">Review your order and complete the payment.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Order Summary & Billing */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Order Summary */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Order Summary</h2>
            <div className="space-y-4">
              {cart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="flex justify-between items-center pb-4 border-b border-slate-100 last:border-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <p className="text-sm font-bold text-slate-800 line-clamp-1">{item.title || item.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Qty: {item.quantity} {item.serialNo && `| S/N: ${item.serialNo}`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-black text-slate-800">{formatPrice(getConvertedPrice(item.priceINR) * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Billing Contact (Read-only from User) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Billing Contact</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Name / Company</label>
                <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-700 font-medium">
                  {user.username || user.company || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Email</label>
                <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-700 font-medium truncate">
                  {user.email || 'N/A'}
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number</label>
                <div className="bg-slate-50 border border-slate-200 px-3 py-2 rounded-lg text-sm text-slate-700 font-medium truncate">
                  {user.mobile || 'N/A'}
                </div>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Payment Method</h2>
            
            <div className="space-y-3">
              <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-[#d4af37] bg-[#d4af37]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="accent-[#d4af37] w-4 h-4" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">UPI / QR Code</p>
                  <p className="text-xs text-slate-500">Pay via GPay, PhonePe, Paytm</p>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-[#d4af37] bg-[#d4af37]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-[#d4af37] w-4 h-4" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Credit / Debit Card</p>
                  <p className="text-xs text-slate-500">Visa, Mastercard, RuPay</p>
                </div>
              </label>

              <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'crypto' ? 'border-[#d4af37] bg-[#d4af37]/5 shadow-sm' : 'border-slate-200 hover:border-slate-300'}`}>
                <input type="radio" name="payment" value="crypto" checked={paymentMethod === 'crypto'} onChange={() => setPaymentMethod('crypto')} className="accent-[#d4af37] w-4 h-4" />
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-800">Cryptocurrency</p>
                  <p className="text-xs text-slate-500">Pay via USDT, BTC, ETH</p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Column: Totals & Confirm */}
        <div>
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 shadow-sm sticky top-24">
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-widest mb-4">Total Amount</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span>Subtotal</span>
                <span className="font-semibold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between items-center text-sm text-slate-600">
                <span>Tax & Fees</span>
                <span className="font-semibold text-emerald-600">Included / Waived</span>
              </div>
              <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
                <span className="text-sm font-black text-slate-800">Total Payable</span>
                <span className="text-xl font-black text-[#d4af37]">{formatPrice(subtotal)}</span>
              </div>
            </div>

            <button
              onClick={onConfirm}
              disabled={loading}
              className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-4 rounded-xl text-sm uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <span className="animate-spin w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
                  Processing...
                </>
              ) : (
                `Pay ${formatPrice(subtotal)}`
              )}
            </button>
            
            <p className="text-center text-[10px] text-slate-400 mt-4 font-medium uppercase tracking-wider flex items-center justify-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
              Secure 256-bit Encrypted Checkout
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
