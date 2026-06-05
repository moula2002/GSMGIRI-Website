import React from 'react';
import { WhatsappIcon, TelegramIcon } from './Icons';

export default function TopHeader({ currency, setCurrency, language, setLanguage }) {
  const tickerText = "📢 All B2B Tour Packages / Flight APIs / Custom Itineraries / White-label Leases Available. Instant Wallet Funding via Cards & Crypto is active. Contact B2B WhatsApp +91 824-700-5409!";

  return (
    <div className="w-full z-50">
      {/* 1. Yellow Notification Notice Bar */}
      <div className="w-full bg-[#ffd700] text-slate-900 py-2.5 px-4 overflow-hidden border-b border-yellow-500 text-xs font-extrabold shadow-sm">
        <div className="max-w-7xl mx-auto flex whitespace-nowrap animate-marquee">
          <span className="px-6">{tickerText}</span>
          <span className="px-6">{tickerText}</span>
        </div>
      </div>

      {/* 2. Top contact & select bar */}
      <div className="w-full bg-[#0b192c] text-white text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="font-bold text-slate-300">🚀 B2B Helpdesk:</span>
          <span>Remote Assistance 24/7</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center text-teal-150">
          <div className="flex items-center gap-3 border-r border-slate-800 pr-4">
            <a
              href="https://wa.me/918247005409"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-[#25D366] transition-colors"
            >
              <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
              <span className="font-bold text-white">WhatsApp: +91 824-700-5409</span>
            </a>
            <a
              href="https://t.me/toursandtravelssaas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-300 transition-colors"
            >
              <TelegramIcon className="w-4 h-4 text-[#0088cc]" />
              <span className="font-bold text-white">Telegram</span>
            </a>
          </div>

          {/* Currency & Language Options */}
          <div className="flex items-center gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-[#070e1b] text-white border border-slate-800 rounded px-2 py-0.5 outline-none cursor-pointer focus:border-yellow-500 transition-colors font-bold"
            >
              <option value="INR">INR (₹)</option>
              <option value="USD">USD ($)</option>
            </select>

            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-[#070e1b] text-white border border-slate-800 rounded px-2 py-0.5 outline-none cursor-pointer focus:border-yellow-500 transition-colors font-bold"
            >
              <option value="EN">English</option>
              <option value="ES">Español</option>
              <option value="HI">हिन्दी</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
