import React from 'react';
import { WhatsappIcon, TelegramIcon, ShieldIcon, ZapIcon, HeadphonesIcon, WalletIcon } from './Icons';

export default function Footer({ currency }) {
  const currentYear = new Date().getFullYear();

  const travelPartners = [
    { name: "Amadeus GDS", desc: "Global Flight API" },
    { name: "Sabre System", desc: "Console Integration" },
    { name: "Emirates API", desc: "Direct Carrier Connect" },
    { name: "Expedia B2B", desc: "Bedbank Inventory" },
    { name: "Marriott Net", desc: "Wholesale Hotel Link" },
    { name: "Booking.com B2B", desc: "Instant Room Stock" }
  ];

  return (
    <footer className="w-full mt-16 text-slate-350 font-sans">
      
      {/* 1. WE ARE OFFICIAL SELLER (White Background) */}
      <div className="bg-white border-t-2 border-[#d4af37] py-8 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-left mb-6 border-l-4 border-[#d4af37] pl-2.5">
            <span className="text-xs font-black text-slate-800 uppercase tracking-widest block">
              WE ARE OFFICIAL SELLER
            </span>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* 1. iTunes Gift Card */}
            <div className="bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 border border-red-650/10 rounded-xl p-3 flex flex-col justify-center items-center text-white h-20 shadow-sm hover:scale-[1.02] transition-transform select-none">
              <span className="text-base font-black tracking-tight leading-none text-white">Apple</span>
              <span className="text-[8px] uppercase tracking-wider text-white/90 font-bold mt-1">iTunes Gift Card</span>
            </div>

            {/* 2. Hydra Tool */}
            <div className="bg-gradient-to-br from-slate-900 via-slate-950 to-black border border-slate-805 rounded-xl p-3 flex flex-col justify-center items-center text-white h-20 shadow-sm hover:scale-[1.02] transition-transform select-none">
              <span className="text-base font-black tracking-wider leading-none text-[#d4af37]">HYDRA</span>
              <span className="text-[8px] uppercase tracking-widest text-slate-450 font-bold mt-1">TOOL</span>
            </div>

            {/* 3. Huawei */}
            <div className="bg-white border border-slate-200 rounded-xl p-3 flex flex-col justify-center items-center text-slate-800 h-20 shadow-sm hover:scale-[1.02] transition-transform select-none">
              <span className="text-base font-black tracking-wide leading-none text-red-600">HUAWEI</span>
              <span className="text-[7px] uppercase tracking-wider text-slate-450 font-bold mt-1">Authorized Reseller</span>
            </div>

            {/* 4. Falcons */}
            <div className="bg-gradient-to-br from-blue-900 to-indigo-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-center items-center text-white h-20 shadow-sm hover:scale-[1.02] transition-transform select-none">
              <span className="text-base font-black tracking-tight leading-none text-cyan-400">Falcons</span>
              <span className="text-[8px] uppercase tracking-widest text-slate-450 font-bold mt-1">UMT / FALCON</span>
            </div>

            {/* 5. iRemoval Pro */}
            <div className="bg-gradient-to-br from-teal-800 to-emerald-950 border border-slate-800 rounded-xl p-3 flex flex-col justify-center items-center text-white h-20 shadow-sm hover:scale-[1.02] transition-transform select-none">
              <span className="text-sm font-black tracking-tight leading-none text-white">iRemoval</span>
              <span className="text-[8px] uppercase tracking-widest text-[#d4af37] font-bold mt-1">PRO</span>
            </div>

            {/* 6. Nexus */}
            <div className="bg-black border border-slate-900 rounded-xl p-3 flex flex-col justify-center items-center text-white h-20 shadow-sm hover:scale-[1.02] transition-transform select-none">
              <span className="text-base font-black tracking-widest leading-none text-yellow-500">NEXUS</span>
              <span className="text-[7px] uppercase tracking-wider text-slate-450 font-bold mt-1">DFT PRO</span>
            </div>

          </div>
        </div>
      </div>

      {/* Main Footer Wrapper (Navy Background) */}
      <div className="bg-[#0b192c] text-slate-350">
        
        {/* 2. Platform Value Props (Stats Bar equivalent) */}
        <div className="bg-[#050b14] py-6 text-white border-b border-slate-900/40">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center sm:text-left">
            
            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#0b192c]/60 border border-slate-800/80 flex items-center justify-center text-[#d4af37] shrink-0">
                <ZapIcon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <span className="block text-white text-xs font-bold uppercase tracking-wider">Quick Delivery</span>
                <span className="text-[10px] text-slate-400">Results within minutes</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#0b192c]/60 border border-slate-800/80 flex items-center justify-center text-[#d4af37] shrink-0">
                <ShieldIcon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <span className="block text-white text-xs font-bold uppercase tracking-wider">100% Secure</span>
                <span className="text-[10px] text-slate-400">SSL encrypted platform</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#0b192c]/60 border border-slate-800/80 flex items-center justify-center text-[#d4af37] shrink-0">
                <HeadphonesIcon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <span className="block text-white text-xs font-bold uppercase tracking-wider">24/7 Support</span>
                <span className="text-[10px] text-slate-400">Always here to help you</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5">
              <div className="w-10 h-10 rounded-lg bg-[#0b192c]/60 border border-slate-800/80 flex items-center justify-center text-[#d4af37] shrink-0">
                <WalletIcon className="w-5 h-5 text-[#d4af37]" />
              </div>
              <div>
                <span className="block text-white text-xs font-bold uppercase tracking-wider">Easy Recharge</span>
                <span className="text-[10px] text-slate-400">Binance, Tether, Visa & more</span>
              </div>
            </div>

          </div>
        </div>

      {/* 3. Main Directories & App Stores */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 text-xs font-medium">
        
        {/* Contacts */}
        <div className="space-y-3">
          <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
            CONTACT
          </span>
          <ul className="space-y-2 text-slate-400">
            <li className="flex items-center gap-2">
              <span className="text-[#d4af37] font-bold">✉</span>
              <a href="mailto:info@gsmgiri.com" className="hover:text-white">info@gsmgiri.com</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#d4af37] font-bold">☎</span>
              <a href="tel:+918247005409" className="hover:text-white">+91 8247005409</a>
            </li>
            <li className="flex items-center gap-2">
              <span className="text-[#d4af37] font-bold">📱</span>
              <a href="https://wa.me/918247005409" className="hover:text-white">+91 8247005409</a>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4af37] font-bold mt-0.5">⏱</span>
              <span>All Days, 9 AM – 11 PM GMT +5:30</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#d4af37] font-bold mt-0.5">📍</span>
              <span>Andhra Pradesh India</span>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-3">
          <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
            COMPANY
          </span>
          <ul className="space-y-2 text-slate-400">
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Home</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">About Us</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Contact Us</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Reseller Panel</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Free IMEI Checker</span></li>
          </ul>
        </div>

        {/* Quick Access */}
        <div className="space-y-3">
          <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
            QUICK ACCESS
          </span>
          <ul className="space-y-2 text-slate-400">
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">IMEI Service</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Server Service</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Remote Service</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Service by Group</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Best Selling</span></li>
          </ul>
        </div>

        {/* Legal */}
        <div className="space-y-3">
          <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
            LEGAL
          </span>
          <ul className="space-y-2 text-slate-400">
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Privacy Policy</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Terms of Service</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Delivery Policy</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Cancellation Policy</span></li>
            <li><span className="hover:text-[#d4af37] cursor-pointer transition-colors">Refund & Return Policy</span></li>
          </ul>
        </div>

        {/* App download buttons */}
        <div className="space-y-3.5">
          <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
            GET THE APP
          </span>
          <p className="text-[10px] text-slate-400 leading-relaxed font-light">
            Order, track & get support from your phone.
          </p>

          <div className="flex flex-col gap-2">
            {/* Apple App Store */}
            <a
              href="https://apple.co/3..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#070e1b] hover:bg-[#050b14] border border-slate-800/80 rounded-lg p-2.5 transition-colors group cursor-pointer"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#d4af37] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 4.17c.66-.81 1.11-1.93.99-3.06-1 .04-2.2.67-2.92 1.5-.62.72-1.16 1.86-1.02 2.97 1.11.08 2.24-.62 2.95-1.41z"/>
              </svg>
              <div className="text-left leading-none text-white">
                <span className="text-[8px] text-slate-400 block uppercase font-bold">Download on the</span>
                <span className="text-[11px] font-bold">App Store</span>
              </div>
            </a>

            {/* Google Play Store */}
            <a
              href="https://play.google.com/..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 bg-[#070e1b] hover:bg-[#050b14] border border-slate-800/80 rounded-lg p-2.5 transition-colors group cursor-pointer"
            >
              <svg className="w-5 h-5 text-white group-hover:text-[#d4af37] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M5 3.14a1.86 1.86 0 0 0-.44 1.3v15.12a1.86 1.86 0 0 0 .44 1.3l8.69-8.68zM18.66 11.23L15.3 9.34l-2.03 2.03 2.03 2.03 3.36-1.89a1.69 1.69 0 0 0 0-2.28zM14.28 13.96L5.86 22.38h.11a1.82 1.82 0 0 0 1.34-.63l7-3.95zM7.31 2.25a1.82 1.82 0 0 0-1.34.63l8.42 8.42 1.65-1.65-7-3.95a1.82 1.82 0 0 0-.73-.45z"/>
              </svg>
              <div className="text-left leading-none text-white">
                <span className="text-[8px] text-slate-400 block uppercase font-bold">Get it on</span>
                <span className="text-[11px] font-bold">Google Play</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* 4. Copyright Bar */}
      <div className="w-full bg-[#050b14] border-t border-slate-900/60 py-4 px-4 text-center text-[10px] text-slate-400 font-bold">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <span>
            © 2026 GSM GIRI. Powered by Innomatrics Technologies
          </span>
          <div className="flex gap-4">
            <span className="hover:text-[#d4af37] cursor-pointer">Agent Agreement</span>
            <span>•</span>
            <span className="hover:text-[#d4af37] cursor-pointer">PCI Compliance Certificate</span>
            <span>•</span>
            <span className="hover:text-[#d4af37] cursor-pointer">SLA Status (99.99%)</span>
          </div>
        </div>
      </div>

    </div>
  </footer>
  );
}
