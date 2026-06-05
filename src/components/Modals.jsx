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
  const [name, setName] = useState('GSM Giri Partner');
  const [email, setEmail] = useState('agent@gsmgiri.com');
  const [mobile, setMobile] = useState('+919876543210');
  const [password, setPassword] = useState('••••••••');
  const [currency, setCurrency] = useState('INR');

  // Trigger login simulation
  const onAuthSubmit = (e) => {
    e.preventDefault();
    if (authTab === 'login') {
      const mockUsername = email.split('@')[0] || 'GSMGiriAgent';
      handleLoginSubmit({ username: mockUsername, company: 'GSM GIRI B2B' });
    } else {
      handleLoginSubmit({ username: name || 'AgentName', company: (currency || 'INR') + ' Agent' });
    }
    setOpenAuthModal(false);
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
                      <option value="EUR">EUR (Euro)</option>
                      <option value="GBP">GBP (British Pound)</option>
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
                    onClick={() => alert('Password reset simulation triggered. Check email inbox.')}
                    className="text-xs text-[#d4af37] hover:text-[#c5a059] font-bold transition-colors cursor-pointer"
                  >
                    Forgot Password?
                  </button>
                </div>
              )}

              {/* Action Button */}
              <button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-[#d4af37]/30 mt-3 hover:shadow-md"
              >
                {authTab === 'login' ? 'Login' : 'Register'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. BOOKING/RENT CONFIRMATION RECEIPT MODAL */}
      {activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md px-4">
          <div className="w-full max-w-lg bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-2xl relative animate-scale-up text-slate-800">
            {/* Close */}
            <button
              onClick={() => setActiveInvoice(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              <XIcon className="w-5 h-5" />
            </button>

            {/* Receipt Content Wrapper for Printing */}
            <div id="booking-invoice-slip" className="p-6 md:p-8 bg-white text-slate-600">
              
              {/* Receipt Header */}
              <div className="flex justify-between items-start border-b border-slate-200 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 leading-none">AGENT BOOKING TICKET</h2>
                  <span className="text-[9px] uppercase font-bold text-[#d4af37] tracking-wider mt-1.5 block">
                    B2B Inventory Fulfillment Slip
                  </span>
                </div>
                <div className="text-right">
                  <span className="block text-xs font-mono text-slate-400">Ref ID:</span>
                  <span className="font-mono text-[#d4af37] font-extrabold text-sm select-all">{activeInvoice.id}</span>
                </div>
              </div>

              {/* Service Title */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <span className="block text-[9px] text-slate-500 font-bold uppercase tracking-wider">Item/Service Title</span>
                <span className="text-sm font-bold text-slate-800 mt-1 block leading-snug">{activeInvoice.title}</span>
                <div className="flex justify-between items-center text-[10px] text-slate-500 mt-2.5 pt-2.5 border-t border-slate-200">
                  <span>Type: <span className="font-bold text-slate-700">{activeInvoice.type}</span></span>
                  <span>System: <span className="font-bold text-slate-700">Net Rate API</span></span>
                </div>
              </div>

              {/* Passenger/Rent Information */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-xs border-b border-slate-200 pb-5">
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
              <div className="space-y-2 mb-6">
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Gross Package Cost</span>
                  <span>₹{activeInvoice.priceINR.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>GDS Fuel/API Surcharges</span>
                  <span>₹0.00 (Waived)</span>
                </div>
                <div className="flex justify-between text-xs text-slate-500">
                  <span>Agent Commissions Deduct</span>
                  <span className="text-emerald-600">- ₹0.00 (B2B Net Rate)</span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200 pt-3 text-sm">
                  <span className="font-bold text-slate-800">Total Net Amount Debited</span>
                  <span className="font-extrabold text-[#d4af37] text-lg">
                    ₹{activeInvoice.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Barcode Mockup */}
              <div className="flex flex-col items-center gap-1.5 border-t border-slate-200 pt-6">
                {/* Barcode line representation */}
                <div className="h-10 w-full max-w-xs bg-slate-50 border border-slate-200 rounded p-1 flex justify-between">
                  {[1,3,1,1,2,4,1,2,1,3,1,1,2,2,1,4,1,2,1,1,3,2,1,2,1,4,1,1,3,1].map((width, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-800 h-full rounded-sm"
                      style={{ width: `${width * 2}px` }}
                    />
                  ))}
                </div>
                <span className="font-mono text-[9px] text-slate-400 tracking-widest select-all">
                  *TT-VOUCHER-{activeInvoice.id}*
                </span>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="bg-slate-50 p-4 flex gap-3 border-t border-slate-200 justify-end">
              <button
                onClick={() => window.print()}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-xs font-bold transition-all"
              >
                Print / Save PDF
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
      )}

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
