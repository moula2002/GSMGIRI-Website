import React, { useState } from 'react';
import { XIcon, ShieldIcon, GlobeIcon, WalletIcon, UserIcon, KeyIcon } from './Icons';

// Custom SVG Icons matching user's form inputs
const MailIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
  </svg>
);

const PhoneIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
  </svg>
);

const DollarIcon = ({ className = "w-5 h-5" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

// Helper: generate a deterministic delivery code from order ID
const generateServiceCode = (orderId) => {
  const seed = orderId ? orderId.replace('TT-', '') : '000000';
  const hex = () => Math.floor(parseInt(seed) * 7 % 65536).toString(16).toUpperCase().padStart(4, '0');
  return {
    activationKey: `GSMG-${seed}-${hex()}-X${(parseInt(seed) % 97).toString(16).toUpperCase().padStart(2,'0')}`,
    serverCode:    `SRV::${hex()}::${seed}::UNLK`,
    apiToken:      `eyJhbGciOiJIUzI1NiJ9.${btoa('order:'+seed).replace(/=/g,'')}.GSMGIRI`,
    expiresAt:     new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  };
};

export default function Modals({
  openAuthModal,
  setOpenAuthModal,
  handleLoginSubmit,
  activeInvoice,
  setActiveInvoice,
  fundSuccessData,
  setFundSuccessData,
  insufficientFundsData,
  setInsufficientFundsData,
  activeTab,
  setActiveTab
}) {
  // Auth state
  const [authTab, setAuthTab] = useState('login');
  // View Code modal state
  const [viewCodeOrder, setViewCodeOrder] = useState(null);
  const [codeCopied, setCodeCopied] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCodeCopied(key);
    setTimeout(() => setCodeCopied(null), 2000);
  };
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Trigger login/register database integrations
  const onAuthSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = authTab === 'login'
      ? { email, password }
      : { username: name, email, mobile, password, currency, company: 'GSM GIRI B2B' };

    const endpoint = authTab === 'login' ? 'login' : 'register';

    try {
      const response = await fetch(`https://gsmgiri-website-backend.onrender.com/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      handleLoginSubmit(data.user);
      setOpenAuthModal(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* 1. AUTH MODAL */}
      {openAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl relative animate-scale-up text-slate-800 flex flex-col max-h-[90vh]">
            {/* Close button */}
            <button
              onClick={() => setOpenAuthModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 transition-colors z-20 cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Auth Tabs */}
            <div className="flex border-b border-slate-200 relative bg-slate-50/50">
              <button
                onClick={() => setAuthTab('login')}
                className={`py-4 px-6 text-sm font-black tracking-wider transition-colors relative cursor-pointer ${
                  authTab === 'login' ? 'text-[#d4af37]' : 'text-slate-450 hover:text-slate-700'
                }`}
              >
                LOGIN
                {authTab === 'login' && (
                  <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#d4af37] rounded-t"></div>
                )}
              </button>
              <button
                onClick={() => setAuthTab('register')}
                className={`py-4 px-6 text-sm font-black tracking-wider transition-colors relative cursor-pointer ${
                  authTab === 'register' ? 'text-[#d4af37]' : 'text-slate-450 hover:text-slate-700'
                }`}
              >
                REGISTER
                {authTab === 'register' && (
                  <div className="absolute bottom-0 left-6 right-6 h-[3px] bg-[#d4af37] rounded-t"></div>
                )}
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onAuthSubmit} className="p-6 space-y-4 overflow-y-auto">
              
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-650 rounded-xl text-xs font-bold text-left flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}
              {/* Register-only Fields */}
              {authTab === 'register' && (
                <>
                  {/* Name Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-slate-750">Enter Your Name</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <UserIcon className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                      />
                    </div>
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-slate-750">Enter Your Email</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <MailIcon className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                      />
                    </div>
                  </div>

                  {/* Mobile Input */}
                  <div className="space-y-1.5 text-left">
                    <label className="block text-xs font-bold text-slate-750">Enter Your Mobile</label>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                        <PhoneIcon className="w-4 h-4 text-slate-400" />
                      </span>
                      <input
                        type="tel"
                        required
                        placeholder="Mobile"
                        value={mobile}
                        onChange={(e) => setMobile(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                      />
                    </div>
                  </div>
                </>
              )}

              {/* Login-only Email Field */}
              {authTab === 'login' && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-slate-750">Your Email</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <MailIcon className="w-4 h-4 text-slate-400" />
                    </span>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                    />
                  </div>
                </div>
              )}

              {/* Password Field (For both) */}
              <div className="space-y-1.5 text-left">
                <label className="block text-xs font-bold text-slate-750">
                  {authTab === 'login' ? 'Your Password' : 'Enter Your Password'}
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                    <KeyIcon className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="password"
                    required
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              {/* Currency Dropdown (Register only) */}
              {authTab === 'register' && (
                <div className="space-y-1.5 text-left">
                  <label className="block text-xs font-bold text-slate-750">Enter Your Currency</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-slate-400">
                      <DollarIcon className="w-4 h-4 text-slate-400" />
                    </span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-10 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] appearance-none transition-all cursor-pointer"
                    >
                      <option value="INR">INR (Indian Rupee)</option>
                      <option value="USD">USD (US Dollar)</option>
                    </select>
                    <span className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-slate-400">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                      </svg>
                    </span>
                  </div>
                </div>
              )}

              {/* Forgot Password Link (Login only) */}
              {authTab === 'login' && (
                <div className="text-left py-0.5">
                  <button
                    type="button"
                    onClick={() => alert('Password reset instructions have been sent to your email. Check your inbox.')}
                    className="text-xs text-[#d4af37] hover:text-[#c5a059] font-bold transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] hover:bg-[#c5a059] disabled:bg-slate-300 disabled:cursor-not-allowed text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-[#d4af37]/30 mt-3 hover:shadow-md"
              >
                {loading ? (
                  <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
                ) : (
                  authTab === 'login' ? 'Login' : 'Register'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. BOOKING/RENT CONFIRMATION RECEIPT MODAL */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl relative animate-scale-up text-slate-800 max-h-[90vh] flex flex-col">
            {/* Close */}
            <button
              onClick={() => setActiveInvoice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 z-20 cursor-pointer"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Receipt Content Wrapper for Printing */}
            <div id="booking-invoice-slip" className="p-4 sm:p-6 bg-white text-slate-600 overflow-y-auto flex-grow">
              
              {/* Receipt Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-3 mb-4">
                <div>
                  <h2 className="text-base font-bold text-slate-800 leading-none">AGENT BOOKING TICKET</h2>
                  <span className="text-[9px] uppercase font-bold text-[#d4af37] tracking-wider mt-1.5 block">
                    B2B Inventory Fulfillment Slip
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-[10px] font-mono text-slate-400">Ref ID:</span>
                  <span className="font-mono text-[#d4af37] font-extrabold text-xs select-all">{activeInvoice.id}</span>
                </div>
              </div>

              {/* Service Title */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Item/Service Title</span>
                <span className="text-xs font-bold text-slate-800 mt-1 block leading-snug">{activeInvoice.title}</span>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-200">
                  <span>Type: <span className="font-bold text-slate-700">{activeInvoice.type}</span></span>
                  <span>System: <span className="font-bold text-slate-700">Net Rate API</span></span>
                </div>
              </div>

              {/* Passenger/Rent Information */}
              <div className="grid grid-cols-2 gap-3 mb-4 text-[11px] border-b border-slate-200 pb-3">
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Traveller / Agent ID</span>
                  <span className="font-semibold text-slate-800">{activeInvoice.client || "B2B Admin Pool"}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Contact/System</span>
                  <span className="font-semibold text-slate-800">{activeInvoice.clientContact || "Direct System API"}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Fulfillment Date</span>
                  <span className="text-slate-600">{activeInvoice.date} • {activeInvoice.time}</span>
                </div>
                <div>
                  <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider mb-0.5">Booking Status</span>
                  <span className="text-emerald-600 font-extrabold">● SECURE & CONFIRMED</span>
                </div>
              </div>

              {/* Totals Table */}
              <div className="space-y-1.5 mb-4">
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Gross Package Cost</span>
                  <span>₹{activeInvoice.priceINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>GDS Fuel/API Surcharges</span>
                  <span>₹0.00 (Waived)</span>
                </div>
                <div className="flex justify-between text-[11px] text-slate-500">
                  <span>Agent Commissions Deduct</span>
                  <span className="text-emerald-600">- ₹0.00 (B2B Net Rate)</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 pt-2.5 text-xs">
                  <span className="font-bold text-slate-800">Total Net Amount Debited</span>
                  <span className="font-extrabold text-[#d4af37] text-base">
                    ₹{activeInvoice.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Barcode Mockup */}
              <div className="flex flex-col items-center gap-1 border-t border-slate-200 pt-4">
                {/* Barcode line representation */}
                <div className="h-8 w-full max-w-xs bg-slate-50 border border-slate-200 rounded p-1 flex justify-between">
                  {[1,3,1,1,2,4,1,2,1,3,1,1,2,2,1,4,1,2,1,1,3,2,1,2,1,4,1,1,3,1].map((width, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 h-full rounded-sm"
                      style={{ width: `${width * 1.5}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[8px] text-slate-400 tracking-widest select-all">
                  *TT-VOUCHER-{activeInvoice.id}*
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-slate-50 p-4 flex gap-3 border-t border-slate-200 justify-between items-center flex-wrap">
              <button
                onClick={() => window.print()}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Print / Save PDF
              </button>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewCodeOrder(activeInvoice)}
                  className="bg-[#0b192c] hover:bg-[#152e50] text-[#d4af37] border border-[#d4af37]/40 hover:border-[#d4af37] px-4 py-2 rounded-lg text-xs font-black transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  View Code
                </button>
                <button
                  onClick={() => setActiveInvoice(null)}
                  className="bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 px-5 py-2 rounded-lg text-xs font-black transition-all cursor-pointer border border-[#d4af37]/30"
                >
                  Done
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* 3. VIEW CODE MODAL */}
      {viewCodeOrder && (() => {
        const codes = generateServiceCode(viewCodeOrder.id);
        return (
          <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/90 backdrop-blur-md px-4">
            <div className="w-full max-w-lg bg-[#070e1b] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl relative text-white animate-scale-up">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#d4af37]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Service Delivery Code</h3>
                    <span className="text-[9px] text-[#d4af37] font-bold uppercase tracking-widest">Order Ref: {viewCodeOrder.id}</span>
                  </div>
                </div>
                <button onClick={() => setViewCodeOrder(null)} className="text-slate-500 hover:text-white p-1 transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              {/* Code body */}
              <div className="p-6 space-y-3">
                {/* Order Info row */}
                <div className="bg-[#0b192c] border border-slate-800 rounded-xl p-3.5 text-xs text-slate-400 leading-snug">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Service / Title</span>
                  <span className="text-slate-200 font-semibold">{viewCodeOrder.title}</span>
                </div>

                {/* Activation Key only */}
                <div className="bg-[#0b192c] border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">🔑 Activation Key</span>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 font-mono text-[11px] text-emerald-400 bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800 break-all select-all">{codes.activationKey}</code>
                    <button
                      onClick={() => handleCopy(codes.activationKey, 'activation')}
                      className="shrink-0 text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer"
                      style={{ borderColor: codeCopied === 'activation' ? '#10b981' : '#d4af3740', color: codeCopied === 'activation' ? '#10b981' : '#d4af37', background: codeCopied === 'activation' ? 'rgba(16,185,129,0.1)' : 'rgba(212,175,55,0.08)' }}
                    >
                      {codeCopied === 'activation' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Expiry notice */}
                <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3.5 py-2.5 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  Code valid until: <span className="text-white">{codes.expiresAt}</span> &nbsp;·&nbsp; Do not share with unauthorised agents.
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-5">
                <button
                  onClick={() => setViewCodeOrder(null)}
                  className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 3. WALLET REPLENISHMENT SUCCESS SPLASH */}
      {fundSuccessData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="w-full max-w-sm bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl p-6 text-center animate-scale-up text-slate-800">
            
            <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto mb-4 text-emerald-600 text-2xl font-bold animate-pulse">
              ✓
            </div>

            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Funds Deposited Successfully!</h2>
            <p className="text-xs text-slate-500 mt-1">Your agency wallet has been credited with net-rate funds.</p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-5 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Method:</span>
                <span className="font-bold text-slate-700 capitalize">{fundSuccessData.method} Deposit</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Amount Credited:</span>
                <span className="font-bold text-[#d4af37]">₹{fundSuccessData.amount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Transaction ID:</span>
                <span className="font-mono text-slate-700 font-semibold">{fundSuccessData.txId}</span>
              </div>
            </div>

            <button
              onClick={() => setFundSuccessData(null)}
              className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-2.5 rounded-lg text-xs transition-colors cursor-pointer border border-[#d4af37]/30"
            >
              Continue
            </button>
          </div>
        </div>
      )}

      {/* 4. GENERAL INSUFFICIENT FUNDS MODAL */}
      {insufficientFundsData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="w-full max-w-sm bg-white border border-red-200 rounded-2xl overflow-hidden shadow-2xl p-6 text-center animate-scale-up text-slate-805">
            
            <div className="w-14 h-14 rounded-full bg-red-50 border border-red-200 flex items-center justify-center mx-auto mb-4 text-red-600 text-xl font-bold">
              ⚠
            </div>

            <h2 className="text-lg font-bold text-slate-800 tracking-tight">Insufficient Wallet Funds</h2>
            <p className="text-xs text-slate-500 mt-1">
              Your current wallet balance is insufficient to complete the booking for:
            </p>
            <p className="text-xs font-bold text-slate-800 mt-1 italic leading-tight">
              "{insufficientFundsData.title}"
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 my-5 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Service Price:</span>
                <span className="font-bold text-slate-700">₹{insufficientFundsData.priceINR.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Wallet:</span>
                <span className="font-bold text-red-650">₹{insufficientFundsData.currentBalance.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold">
                <span className="text-slate-500">Deficit Required:</span>
                <span className="text-[#d4af37]">₹{(insufficientFundsData.priceINR - insufficientFundsData.currentBalance).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setInsufficientFundsData(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-750 py-2.5 rounded-lg text-xs font-bold transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setInsufficientFundsData(null);
                  setActiveTab('wallet');
                }}
                className="flex-1 bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-2.5 rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm border border-[#d4af37]/30 cursor-pointer"
              >
                <WalletIcon className="w-4 h-4 text-white" />
                Add Funds
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
