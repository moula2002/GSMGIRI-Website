import React, { useState, useEffect } from 'react';
import { WalletIcon } from '../components/Icons';
import moulaQR from '../assets/Moula QR.jpeg';

export default function Wallet({ currency, balance, onAddFunds, prefilledAmount }) {
  const [amount, setAmount] = useState(prefilledAmount ? String(prefilledAmount) : '1');
  const [gateway, setGateway] = useState('upi'); // 'binance', 'razorpay', 'upi'
  const [loading, setLoading] = useState(false);

  // UPI QR Flow States
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrStep, setQrStep] = useState('scan'); // 'scan' | 'confirming' | 'success'
  const [countdown, setCountdown] = useState(15);

  useEffect(() => {
    if (prefilledAmount) {
      setAmount(String(prefilledAmount));
    }
  }, [prefilledAmount]);

  // Countdown timer for QR scan waiting
  useEffect(() => {
    let timer;
    if (showQRModal && qrStep === 'scan' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [showQRModal, qrStep, countdown]);

  // Define payment gateways and their charges
  const gateways = [
    {
      id: 'binance',
      title: 'Binance C2C - USDT, USDC, TRC20',
      chargeLabel: '0% Charge',
      chargeRate: 0,
      color: '#F0B90B',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-[#F0B90B] flex items-center justify-center text-slate-900 shrink-0">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L4.5 9.5 6 11l6-6 6 6 1.5-1.5L12 2zm0 20l-7.5-7.5L6 13l6 6 6-6 1.5 1.5L12 22zm0-6.5L8.5 12 12 8.5 15.5 12 12 15.5z" />
          </svg>
        </div>
      )
    },
    {
      id: 'razorpay',
      title: 'Razorpay Only For cards',
      chargeLabel: '2.2% Charge',
      chargeRate: 0.022,
      color: '#0A2540',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-[#0B2545] flex flex-col items-center justify-center shrink-0 px-1">
          <span className="text-white text-[8px] font-black tracking-tighter uppercase leading-none">Razorpay</span>
          <div className="h-0.5 w-6 bg-[#00A1E0] mt-0.5 rounded"></div>
        </div>
      )
    },
    {
      id: 'upi',
      title: 'UPI',
      chargeLabel: '0% Charge',
      chargeRate: 0,
      color: '#E0E7FF',
      logo: (
        <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center shrink-0">
          <span className="text-slate-800 text-sm font-black tracking-tighter italic leading-none">
            <span className="text-emerald-600">U</span>
            <span className="text-slate-800">P</span>
            <span className="text-[#F57C00]">I</span>
          </span>
        </div>
      )
    }
  ];

  const selectedGateway = gateways.find(g => g.id === gateway) || gateways[2];

  // Dynamic calculations
  const parsedAmount = parseFloat(amount) || 0;
  const currentBalanceInr = currency === 'INR' ? balance : balance * 83;

  const balanceAfterDeposit = currentBalanceInr + parsedAmount;
  const gatewayCharge = parsedAmount * selectedGateway.chargeRate;
  const totalPay = parsedAmount + gatewayCharge;
  const upiLink = `upi://pay?pa=moula@upi&pn=MoulaHussain&am=${totalPay.toFixed(2)}&cu=INR`;
  const dynamicQRUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(upiLink)}`;

  const handlePayNow = (e) => {
    e.preventDefault();
    if (parsedAmount < 1) return;

    // If UPI is selected, show the QR modal flow
    if (gateway === 'upi') {
      setQrStep('scan');
      setCountdown(15);
      setShowQRModal(true);
      return;
    }

    // For other gateways, proceed normally
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const depositAmount = currency === 'INR' ? parsedAmount : parsedAmount / 83;
      onAddFunds(depositAmount, selectedGateway.id);
    }, 1500);
  };

  // Called when user confirms they have scanned & paid
  const handleConfirmPayment = () => {
    setQrStep('confirming');
    
    setTimeout(() => {
      setQrStep('success');
      
      // After showing success briefly, close modal and process payment
      setTimeout(() => {
        setShowQRModal(false);
        setQrStep('scan');
        const depositAmount = currency === 'INR' ? parsedAmount : parsedAmount / 83;
        onAddFunds(depositAmount, 'upi');
      }, 2000);
    }, 1500);
  };

  const handleCloseQR = () => {
    setShowQRModal(false);
    setQrStep('scan');
    setCountdown(15);
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-8 text-slate-850 font-sans">
      <div className="flex items-center gap-3.5 mb-8 bg-white border border-slate-200/50 p-6 rounded-3xl shadow-sm">
        <div className="w-12 h-12 rounded-2xl bg-[#008080]/10 flex items-center justify-center shrink-0">
          <WalletIcon className="w-6 h-6 text-[#008080]" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-black text-slate-850 tracking-tight">INR Fund Add</h1>
          <p className="text-xs text-slate-500 font-semibold mt-0.5">Top up your wallet balance instantly using UPI QR or other digital payment methods</p>
        </div>
      </div>
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl grid grid-cols-1 md:grid-cols-5 min-h-[500px]">

        {/* Left Side: Inputs and Payment Gateways (3 cols) */}
        <div className="md:col-span-3 p-6 sm:p-10 flex flex-col justify-between">
          <div>
            {/* Amount input */}
            <div className="mb-8">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                Enter Amount (INR)
              </h2>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-medium text-lg">
                  ₹
                </span>
                <input
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-slate-50/50 border-2 border-slate-200/80 rounded-2xl pl-10 pr-14 py-4 text-2xl font-black text-slate-800 focus:outline-none focus:border-[#008080] focus:bg-white transition-all"
                />
                <span className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase tracking-wider">
                  INR
                </span>
              </div>
              <p className="text-xs text-amber-600 font-medium mt-2 ml-2 flex items-center gap-1">
                <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                Minimum Add Funds Limit is 49.00 INR
              </p>
            </div>

            {/* Payment Gateway selections */}
            <div>
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">
                Payment Gateway
              </h2>
              <div className="space-y-3.5">
                {gateways.map((item) => {
                  const isActive = gateway === item.id;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setGateway(item.id)}
                      className={`relative flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all ${isActive
                          ? 'border-[#008080] bg-[#008080]/5'
                          : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50/50'
                        }`}
                    >
                      {item.logo}
                      <div className="text-left">
                        <h3 className="text-sm font-bold text-slate-800 leading-snug">
                          {item.title}
                        </h3>
                        <p className="text-xs font-semibold text-slate-450 mt-0.5">
                          {item.chargeLabel}
                        </p>
                      </div>

                      {/* Active green circle with checkmark */}
                      {isActive && (
                        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#008080] text-white flex items-center justify-center shadow-sm">
                          <svg className="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Invoice & Action Panel (2 cols) */}
        <div className="md:col-span-2 bg-[#EBF5F5]/70 p-6 sm:p-10 flex flex-col justify-between border-l border-slate-200/40">
          <div className="space-y-8">

            {/* Balance Info */}
            <div className="text-left">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200/80 pb-1.5">
                Balance Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Current Balance</span>
                  <span className="font-bold text-slate-700">
                    {currentBalanceInr.toFixed(2)} INR
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Balance After Deposit</span>
                  <span className="font-bold text-slate-800">
                    {balanceAfterDeposit.toFixed(2)} INR
                  </span>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="text-left">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-200/80 pb-1.5">
                Payment Information
              </h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Payment Gateway</span>
                  <span className="font-bold text-slate-700 uppercase">
                    {gateway}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Add Fund Amount</span>
                  <span className="font-extrabold text-slate-800">
                    ₹{parsedAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500 font-medium">Gateway Charge ({selectedGateway.chargeLabel})</span>
                  <span className="font-bold text-slate-700">
                    ₹{gatewayCharge.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between items-center border-t border-slate-200/80 pt-3.5">
                  <span className="text-sm font-bold text-slate-800">Total Pay</span>
                  <span className="text-xl font-black text-[#008080]">
                    ₹{totalPay.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Pay Button */}
          <button
            onClick={handlePayNow}
            disabled={loading || parsedAmount < 1}
            className="w-full bg-[#008080] hover:bg-[#006666] disabled:bg-slate-350 text-white font-black py-4 px-6 rounded-2xl text-sm uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-8 cursor-pointer disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing Payment...</span>
              </>
            ) : (
              <span>Pay Now</span>
            )}
          </button>

        </div>
      </div>

      {/* ============================================== */}
      {/* UPI QR CODE PAYMENT MODAL                      */}
      {/* ============================================== */}
      {showQRModal && (
        <div 
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
        >
          <div 
            className="relative bg-white rounded-3xl shadow-2xl w-full overflow-hidden"
            style={{ maxWidth: '420px', animation: 'qrModalIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)' }}
          >
            {/* Close button */}
            <button
              onClick={handleCloseQR}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-700 transition-all z-10 cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* ---- STEP 1: SCAN QR ---- */}
            {qrStep === 'scan' && (
              <div className="p-5 sm:p-6">
                {/* Header */}
                <div className="text-center mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#008080]/10 flex items-center justify-center mx-auto mb-2">
                    <svg className="w-5 h-5 text-[#008080]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="3" width="7" height="7" rx="1" />
                      <rect x="14" y="3" width="7" height="7" rx="1" />
                      <rect x="3" y="14" width="7" height="7" rx="1" />
                      <rect x="14" y="14" width="3" height="3" />
                      <path d="M21 14h-3v3" />
                      <path d="M18 21v-3h3" />
                    </svg>
                  </div>
                  <h3 className="text-base font-black text-slate-800 uppercase tracking-wide">
                    Scan & Pay via UPI
                  </h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 font-medium">
                    Scan this QR code with any UPI app to complete payment
                  </p>
                </div>

                {/* Amount Badge */}
                {parsedAmount > 0 && (
                  <div className="bg-gradient-to-r from-[#008080] to-[#006666] rounded-2xl p-3 mb-4 text-center text-white shadow-md">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-white/70 block">Amount to Pay</span>
                    <span className="text-2xl font-black block mt-0.5">₹{totalPay.toFixed(2)}</span>
                    {prefilledAmount && (
                      <span className="text-[9px] text-white/60 font-medium mt-0.5 block">Product amount: ₹{prefilledAmount}</span>
                    )}
                  </div>
                )}

                {/* QR Code Image */}
                <div className="flex justify-center mb-4">
                  <div className="relative p-2 bg-white rounded-2xl border-2 border-dashed border-[#008080]/30 shadow-inner">
                    <img 
                      src={moulaQR} 
                      alt="UPI Payment QR Code" 
                      className="w-44 h-44 object-contain rounded-xl"
                    />
                    {/* Animated scanning line */}
                    <div 
                      className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-[#008080] to-transparent rounded-full"
                      style={{ 
                        animation: 'scanLine 2s ease-in-out infinite',
                        top: '10px'
                      }}
                    />
                  </div>
                </div>

                {/* UPI Apps Row */}
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Pay with:</span>
                  <div className="flex gap-1.5">
                    {['GPay', 'PhonePe', 'Paytm', 'BHIM'].map(app => (
                      <span key={app} className="text-[8px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-1.5 py-0.5 rounded-md">
                        {app}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Confirm Payment Button */}
                <button
                  onClick={handleConfirmPayment}
                  className="w-full bg-[#008080] hover:bg-[#006666] text-white font-black py-3 rounded-xl text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span>I Have Completed the Payment</span>
                </button>

                <p className="text-center text-[9px] text-slate-400 mt-2 font-medium">
                  Click above after you have successfully paid via UPI
                </p>
              </div>
            )}

            {/* ---- STEP 2: CONFIRMING ---- */}
            {qrStep === 'confirming' && (
              <div className="p-8 sm:p-12 text-center">
                <div className="w-20 h-20 rounded-full bg-[#008080]/10 flex items-center justify-center mx-auto mb-6">
                  <svg className="w-10 h-10 text-[#008080] animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide mb-2">
                  Verifying Payment
                </h3>
                <p className="text-sm text-slate-500 font-medium">
                  Please wait while we confirm your UPI payment...
                </p>

                {/* Payment Details being verified */}
                <div className="mt-6 bg-slate-50 border border-slate-200/60 rounded-2xl p-5 text-left space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Amount</span>
                    <span className="font-black text-slate-800">₹{totalPay.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Gateway</span>
                    <span className="font-bold text-slate-700 uppercase">UPI</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 font-medium">Status</span>
                    <span className="font-bold text-amber-600 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                      Verifying...
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ---- STEP 3: SUCCESS ---- */}
            {qrStep === 'success' && (
              <div className="p-8 sm:p-12 text-center">
                {/* Animated success checkmark */}
                <div 
                  className="w-20 h-20 rounded-full bg-emerald-500 flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ animation: 'successPop 0.5s cubic-bezier(0.16, 1, 0.3, 1)' }}
                >
                  <svg className="w-10 h-10 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-black text-slate-800 uppercase tracking-wide mb-2">
                  Payment Successful!
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-6">
                  Your UPI payment has been received and verified
                </p>

                {/* Payment Receipt Summary */}
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5 text-left space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-700 font-medium">Amount Paid</span>
                    <span className="font-black text-emerald-800">₹{totalPay.toFixed(2)}</span>
                  </div>
                  {prefilledAmount && (
                    <div className="flex justify-between text-xs">
                      <span className="text-emerald-700 font-medium">Product Amount</span>
                      <span className="font-bold text-emerald-800">₹{prefilledAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-xs">
                    <span className="text-emerald-700 font-medium">Payment Method</span>
                    <span className="font-bold text-emerald-800 uppercase">UPI</span>
                  </div>
                  <div className="flex justify-between text-xs border-t border-emerald-200 pt-3">
                    <span className="text-emerald-700 font-medium">Status</span>
                    <span className="font-black text-emerald-600 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      Confirmed
                    </span>
                  </div>
                </div>

                <p className="text-[10px] text-slate-400 mt-4 font-medium">
                  Redirecting to your order...
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QR Modal Animations */}
      <style>{`
        @keyframes qrModalIn {
          from {
            opacity: 0;
            transform: scale(0.9) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
        @keyframes scanLine {
          0% { top: 12px; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: calc(100% - 12px); opacity: 0; }
        }
        @keyframes successPop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
