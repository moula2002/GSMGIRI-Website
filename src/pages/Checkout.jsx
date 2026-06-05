import React, { useState, useEffect } from 'react';
import { GlobeIcon, KeyIcon, ShieldIcon, WalletIcon } from '../components/Icons';

export default function Checkout({
  product,
  currency,
  balance,
  setBalance,
  user,
  setOpenAuthModal,
  orders,
  setOrders,
  setActiveTab,
  setActiveInvoice
}) {
  // Scroll to top when checkout page loads
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);
  const [paymentMethod, setPaymentMethod] = useState('wallet'); // 'wallet' or 'online'
  const [onlineType, setOnlineType] = useState('upi'); // 'upi', 'card', 'crypto'
  const [upiId, setUpiId] = useState('agent@upi');
  const [cardNumber, setCardNumber] = useState('4111 2222 3333 4444');
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState('summary'); // 'summary' or 'success'

  // Helper to convert prices
  const getConvertedPrice = (priceINR) => {
    if (currency === 'INR') {
      return `₹${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(priceINR / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  // Helper to render custom visual badge thumbnails
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

  const handlePayment = (e) => {
    e.preventDefault();
    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    if (paymentMethod === 'wallet' && balance < product.priceINR) {
      alert(`Insufficient Wallet Balance. Please add funds or use Online Payment.`);
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      // Deduct balance if paid via Wallet
      if (paymentMethod === 'wallet') {
        setBalance(balance - product.priceINR);
      }

      // Generate order entry
      const orderId = 'TT-' + Math.floor(Math.random() * 900000 + 100000);
      const dateObj = new Date();
      const formattedDate = dateObj.toISOString().split('T')[0];
      const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      const newOrder = {
        id: orderId,
        title: product.title,
        category: product.category,
        type: product.type,
        priceINR: product.priceINR,
        client: user.username,
        clientContact: paymentMethod === 'wallet' ? user.company : `Dummy Online Gateway (${onlineType.toUpperCase()})`,
        date: formattedDate,
        time: formattedTime,
        status: 'Confirmed'
      };

      // Update orders database
      setOrders([newOrder, ...orders]);
      setIsProcessing(false);
      
      // Redirect to history (orders page)
      setActiveTab('history');

      // Trigger invoice modal immediately
      setActiveInvoice(newOrder);
    }, 1500);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 relative font-sans text-left">
      {/* Back Button */}
      <button
        onClick={() => setActiveTab('services')}
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
        <span className="text-slate-500">{product.type || 'Remote'}</span>
        <span>&gt;</span>
        <span className="text-slate-500">Checkout</span>
        <span>&gt;</span>
        <span className="text-[#d4af37]">Process Payment</span>
      </div>

      {isProcessing ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-12 shadow-sm text-center max-w-xl mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-[#d4af37] border-t-transparent animate-spin mx-auto"></div>
          <h2 className="text-base font-black text-slate-800 uppercase tracking-wider">Processing Secure Payment...</h2>
          <p className="text-xs text-slate-450">Please do not refresh the page or click back. We are validating B2B server logs.</p>
        </div>
      ) : (
        <form onSubmit={handlePayment} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Billing & Payment Selection */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Billing Info */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Billing Info</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">Agent Username</span>
                  <span className="font-extrabold text-slate-800">{user ? user.username : 'Guest Agent'}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-400 font-bold uppercase mb-0.5">Agency Company</span>
                  <span className="font-extrabold text-slate-800">{user ? user.company : 'GSM GIRI Agency'}</span>
                </div>
              </div>
            </div>

            {/* Payment Options */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Select Payment Method</h3>
              </div>

              <div className="space-y-3">
                {/* Method 1: Wallet Balance */}
                <label className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === 'wallet'
                    ? 'border-[#d4af37] bg-amber-50/5'
                    : 'border-slate-200 hover:border-slate-350'
                }`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="wallet"
                    checked={paymentMethod === 'wallet'}
                    onChange={() => setPaymentMethod('wallet')}
                    className="mt-1 accent-[#d4af37] cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-black text-slate-800 block uppercase">Agent Wallet Balance</span>
                    <span className="text-[10px] text-slate-450 block mt-0.5">
                      Deduct from your starter balance: <span className="font-bold text-[#d4af37]">{getConvertedPrice(balance)}</span>
                    </span>
                    {balance < product.priceINR && (
                      <span className="text-[9px] text-red-500 font-bold block mt-1">⚠ Insufficient balance. Please recharge or select online payment.</span>
                    )}
                  </div>
                </label>

                {/* Method 2: Dummy Online Payment */}
                <label className={`flex items-start gap-3 border rounded-xl p-4 cursor-pointer transition-all ${
                  paymentMethod === 'online'
                    ? 'border-[#d4af37] bg-amber-50/5'
                    : 'border-slate-200 hover:border-slate-350'
                }`}>
                  <input
                    type="radio"
                    name="payment_method"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="mt-1 accent-[#d4af37] cursor-pointer"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-black text-slate-800 block uppercase flex items-center gap-1.5">
                      Dummy Online Payment
                      <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.2 rounded text-[7px] font-black uppercase">Sandbox</span>
                    </span>
                    <span className="text-[10px] text-slate-450 block mt-0.5">
                      Simulate direct payment gateways (UPI, Credit/Debit cards, USDT Crypto)
                    </span>
                  </div>
                </label>
              </div>

              {/* Online Payment Settings Form (Only shown if selected) */}
              {paymentMethod === 'online' && (
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mt-3 space-y-4 animate-fade-in text-xs">
                  <div className="flex gap-3 border-b border-slate-200 pb-3">
                    <button
                      type="button"
                      onClick={() => setOnlineType('upi')}
                      className={`px-3 py-1.5 rounded-lg font-bold uppercase text-[10px] border transition-all ${
                        onlineType === 'upi'
                          ? 'bg-[#0b192c] text-white border-[#0b192c]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      UPI ID
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnlineType('card')}
                      className={`px-3 py-1.5 rounded-lg font-bold uppercase text-[10px] border transition-all ${
                        onlineType === 'card'
                          ? 'bg-[#0b192c] text-white border-[#0b192c]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      Credit/Debit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setOnlineType('crypto')}
                      className={`px-3 py-1.5 rounded-lg font-bold uppercase text-[10px] border transition-all ${
                        onlineType === 'crypto'
                          ? 'bg-[#0b192c] text-white border-[#0b192c]'
                          : 'bg-white text-slate-600 border-slate-200 hover:border-slate-350'
                      }`}
                    >
                      USDT Crypto
                    </button>
                  </div>

                  {onlineType === 'upi' && (
                    <div className="space-y-1.5 text-left">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Enter UPI ID</label>
                      <input
                        type="text"
                        required
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                      />
                    </div>
                  )}

                  {onlineType === 'card' && (
                    <div className="space-y-3">
                      <div className="space-y-1.5 text-left">
                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5 text-left">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">Expiry Date</label>
                          <input type="text" required placeholder="MM/YY" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]" />
                        </div>
                        <div className="space-y-1.5 text-left">
                          <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wide">CVV</label>
                          <input type="password" required placeholder="***" maxLength="3" className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {onlineType === 'crypto' && (
                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 space-y-2">
                      <span className="font-bold text-amber-600 block leading-none">USDT (TRC-20) Simulated Gateway</span>
                      <p className="text-[10px] text-slate-500 leading-relaxed font-light">
                        Simulating direct crypto token transfers. To pay, click checkout. This is a dummy sandbox.
                      </p>
                    </div>
                  )}

                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1.5 bg-emerald-50 border border-emerald-100 rounded-lg p-2.5">
                    <span>🔒 Secured Sandbox Mode: No real funds or sensitive details will be shared or debited.</span>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Pay */}
          <div className="space-y-6">
            
            {/* Product Summary Card */}
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-4">
              <div className="border-b border-slate-100 pb-2">
                <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest">Order Summary</h3>
              </div>

              <div className="flex gap-3 items-center">
                {getServiceThumbnail(product)}
                <div className="flex-1 min-w-0">
                  <h4 className="text-[11px] font-black text-slate-800 truncate-2-lines uppercase leading-snug">{product.title}</h4>
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider block mt-0.5">{product.type || 'Remote'}</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-slate-100 pt-3.5 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{getConvertedPrice(product.priceINR)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Gateway/Process Fee</span>
                  <span className="text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-150 pt-3.5 font-bold text-slate-800">
                  <span className="text-sm uppercase font-black tracking-wide">Total due</span>
                  <span className="text-base text-[#d4af37] font-black">{getConvertedPrice(product.priceINR)}</span>
                </div>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
              className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-4 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer border border-[#d4af37]/35 hover:shadow-lg"
            >
              <ShieldIcon className="w-4 h-4 text-slate-950" />
              Pay & Place Order
            </button>

          </div>

        </form>
      )}
    </section>
  );
}
