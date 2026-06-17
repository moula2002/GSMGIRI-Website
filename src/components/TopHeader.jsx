import React from 'react';
import { WhatsappIcon, TelegramIcon } from './Icons';

export default function TopHeader({ currency, setCurrency, language, setLanguage }) {
  return (
    <div className="w-full z-50">
      {/* Top contact & select bar (styled in Yellow background) */}
      <div className="w-full bg-[#ffd700] text-slate-900 text-xs py-2 px-4 flex flex-col md:flex-row justify-between items-center gap-2 border-b border-yellow-500 shadow-sm font-sans">
        <div className="flex items-center gap-3">
          <a href="mailto:info@gsmgiri.com" className="flex items-center gap-1 hover:text-slate-800 transition-colors font-bold text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
            </svg>
            <span>info@gsmgiri.com</span>
          </a>
          <span className="text-slate-450">|</span>
          <a href="tel:9952620659" className="flex items-center gap-1 hover:text-slate-800 transition-colors font-bold text-slate-900">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-slate-800">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.48-5.15-3.806-6.63-6.63l1.293-.97c.362-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
            </svg>
            <span>9952620659</span>
          </a>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-center text-slate-900">
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/919952620659"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-green-700 transition-colors"
            >
              <WhatsappIcon className="w-4 h-4 text-[#25D366]" />
              <span className="font-bold text-slate-900">WhatsApp: +91 9952620659</span>
            </a>
            <a
              href="https://t.me/toursandtravelssaas"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-blue-700 transition-colors"
            >
              <TelegramIcon className="w-4 h-4 text-[#0088cc]" />
              <span className="font-bold text-slate-900">Telegram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
