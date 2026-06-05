import React, { useState } from 'react';
import { WalletIcon, GlobeIcon } from '../components/Icons';

export default function Wallet({ currency, balance, onAddFunds }) {
  const [amount, setAmount] = useState('10000');
  const [method, setMethod] = useState('bank');
  const [loading, setLoading] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  const bankDetails = {
    bankName: "ICICI Bank Ltd",
    accName: "GSM GIRI SaaS Pvt Ltd",
    accNum: "998247005409",
    ifsc: "ICIC0000104",
    branch: "Andhra Pradesh Branch, India",
    depositRef: "AGENT-REF-" + Math.floor(Math.random() * 900000 + 100000)
  };

  const cryptoAddress = "0x8247005409aBf923b7e774C37bE87CdE9871Aa62";

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const getConvertedText = () => {
    const amt = parseFloat(amount) || 0;
    if (currency === 'INR') {
      return `₹${amt.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(amt / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  const handleRechargeSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onAddFunds(parsedAmount, method);
      setAmount('10000');
    }, 1500);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* Page Title */}
      <div className="flex items-center gap-2 mb-8 border-l-4 border-[#d4af37] pl-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 uppercase">
          Agent Wallet & Fund Manager
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-800">
        {/* Left Side: Wallet Info & Recharge Form */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
              Agent Balance Card
            </h2>
            {/* Visual Credit Card */}
            <div className="w-full h-44 rounded-2xl bg-gradient-to-br from-[#ffd700] via-[#e2b83d] to-[#b8860b] p-5 text-[#0b192c] flex flex-col justify-between shadow-lg relative overflow-hidden group border border-[#d4af37]/30">
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-white/10 group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="flex justify-between items-start z-10">
                <div>
                  <span className="text-[10px] text-[#0b192c] uppercase tracking-widest font-extrabold block leading-none">
                    GSM GIRI B2B Panel
                  </span>
                  <span className="text-xs text-[#0b192c]/85 font-bold mt-1 block">
                    Verified Agent Account
                  </span>
                </div>
                <GlobeIcon className="w-7 h-7 text-[#0b192c] animate-spin-slow" />
              </div>

              <div className="z-10">
                <span className="text-[10px] text-[#0b192c]/80 uppercase tracking-wider block font-black leading-none">
                  Available Agent Balance
                </span>
                <span className="text-2xl md:text-3xl font-black text-[#0b192c] tracking-tight block mt-1">
                  {currency === 'INR' ? `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}` : `$${(balance / 83).toLocaleString('en-US', { minimumFractionDigits: 2 })}`}
                </span>
              </div>

              <div className="flex justify-between items-center text-[10px] text-[#0b192c]/85 tracking-widest z-10 font-bold">
                <span>MID: 824-700-5409</span>
                <span>EXP: ** / **</span>
              </div>
            </div>
          </div>

          {/* Recharge Simulator Form */}
          <form onSubmit={handleRechargeSubmit} className="mt-8 border-t border-slate-100 pt-6">
            <h3 className="text-sm font-bold text-slate-700 mb-4 uppercase">
              Simulate Wallet Deposit
            </h3>

            <div className="mb-4">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                Amount to Deposit (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-slate-400 font-semibold text-sm">
                  INR (₹)
                </span>
                <input
                  type="number"
                  required
                  placeholder="e.g. 10000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-20 pr-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:border-[#d4af37] transition-colors"
                />
              </div>
              <p className="text-[10px] text-slate-500 mt-1.5 italic">
                Equivalent Value: <span className="text-[#d4af37] font-bold">{getConvertedText()}</span>
              </p>
            </div>

            <div className="mb-6">
              <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                Funding Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'bank', label: 'Bank Wire' },
                  { id: 'card', label: 'Credit Card' },
                  { id: 'crypto', label: 'Crypto USDT' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setMethod(item.id)}
                    className={`py-2 px-1 rounded-lg text-xs font-bold transition-all border ${
                      method === item.id
                        ? 'bg-amber-50/20 text-[#d4af37] border-[#d4af37] shadow-sm'
                        : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#d4af37] hover:bg-[#c5a059] disabled:bg-slate-700 text-slate-950 font-black py-3 px-4 rounded-xl text-sm transition-all duration-300 shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-[#d4af37]/30"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-slate-950" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Processing Deposit Request...</span>
                </>
              ) : (
                <>
                  <WalletIcon className="w-4 h-4 text-slate-950" />
                  <span>Simulate Fund Deposit</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Side: Account/Deposit Instructions based on method selected */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-4">
            Deposit Instructions
          </h2>

          {copiedText && (
            <div className="mb-4 bg-amber-50/10 border border-[#d4af37]/35 text-[#d4af37] text-xs px-3 py-2 rounded-lg text-center font-bold">
              ✓ Copied to clipboard!
            </div>
          )}

          {method === 'bank' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Add funds via IMPS, NEFT, or RTGS bank transfer. Copy the billing credentials below, perform the payment, and funds will credit instantly.
              </p>
              
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
                {[
                  { label: "Beneficiary Bank", value: bankDetails.bankName },
                  { label: "Account Name", value: bankDetails.accName },
                  { label: "Account Number", value: bankDetails.accNum, copyable: true },
                  { label: "IFSC Code", value: bankDetails.ifsc, copyable: true },
                  { label: "Branch", value: bankDetails.branch },
                  { label: "Your Agent Deposit ID", value: bankDetails.depositRef, copyable: true }
                ].map((field, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider">{field.label}</span>
                      <span className="text-slate-800 font-bold select-all">{field.value}</span>
                    </div>
                    {field.copyable && (
                      <button
                        onClick={() => handleCopy(field.value)}
                        className="text-[10px] text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37] hover:bg-amber-50/10 px-2 py-1 rounded transition-colors"
                      >
                        Copy
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Enter simulated card details below. All transactions are securely processed through our test Stripe gateway.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-4 text-xs">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Dummy Card Number</label>
                  <div className="w-full bg-white border border-slate-200 rounded px-3 py-2 text-slate-800 font-semibold">
                    4242 •••• •••• 4242
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">Expiry Date</label>
                    <div className="bg-white border border-slate-200 rounded px-3 py-2 text-slate-800 text-center font-semibold">
                      12 / 28
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">CVV</label>
                    <div className="bg-white border border-slate-200 rounded px-3 py-2 text-slate-800 text-center font-semibold">
                      ***
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {method === 'crypto' && (
            <div className="space-y-4">
              <p className="text-xs text-slate-600 font-light leading-relaxed">
                Deposit USDT (TRC-20 / ERC-20). The wallet is credited automatically after 2 network confirmations.
              </p>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex flex-col items-center gap-4 text-xs">
                {/* Simulated QR Code */}
                <div className="w-32 h-32 bg-white p-2.5 rounded-lg flex items-center justify-center border border-slate-200 shadow-sm relative group">
                  <div className="absolute inset-0 bg-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg"></div>
                  {/* Visual QR Code simulation */}
                  <div className="grid grid-cols-6 grid-rows-6 gap-1.5 w-full h-full text-slate-900">
                    <div className="bg-slate-800 col-span-2 row-span-2"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800 col-span-2 row-span-2"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800 col-span-2 row-span-2"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800 col-span-2 row-span-2"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800"></div>
                    <div className="bg-slate-800 col-span-2"></div>
                  </div>
                </div>

                <div className="w-full">
                  <span className="block text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1 text-center">
                    Deposit ERC20/TRC20 USDT Address
                  </span>
                  <div className="flex items-center gap-2 bg-white border border-slate-200 rounded px-2.5 py-2">
                    <span className="font-mono text-[10px] text-slate-600 break-all select-all flex-1 text-center leading-none">
                      {cryptoAddress}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleCopy(cryptoAddress)}
                      className="text-[10px] text-[#d4af37] border border-[#d4af37]/30 hover:border-[#d4af37] px-2.5 py-1.5 rounded transition-colors"
                    >
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
