import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { WhatsappIcon, TelegramIcon, ShieldIcon, ZapIcon, HeadphonesIcon } from './Icons';

function ClientCard({ client }) {
  const bgClass = client.bgColor || 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-slate-700/60';
  const textClass = client.textColor || 'text-white';

  return (
    <div
      className={`${bgClass} rounded-2xl flex flex-col justify-center items-center shrink-0 mx-3
        w-44 h-24 shadow-lg hover:shadow-[0_0_22px_rgba(212,175,55,0.3)]
        hover:-translate-y-1.5 transition-all duration-300 cursor-pointer select-none group`}
      title={client.name}
    >
      {client.image ? (
        <div className="h-14 w-full flex items-center justify-center px-4">
          <img
            src={client.image}
            alt={client.name}
            className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <>
          <span className={`text-sm font-black tracking-tight leading-none text-center px-3 ${textClass}`}>
            {client.name}
          </span>
          {client.subtitle && (
            <span className="text-[9px] uppercase tracking-wider opacity-70 font-bold mt-1.5 text-center px-2 line-clamp-1">
              {client.subtitle}
            </span>
          )}
        </>
      )}
    </div>
  );
}

export default function Footer({ currency, clients = [] }) {
  const location = useLocation();
  const currentYear = new Date().getFullYear();
  const isHomePage = location.pathname === '/';

  return (
    <footer className="w-full mt-16 text-slate-350 font-sans">

      {/* 1. WE ARE OFFICIAL SELLER — Infinite Scrolling Carousel */}
      {isHomePage && (
        <div className="bg-white border-t-2 border-[#d4af37] border-b border-slate-200 overflow-hidden">

        {/* Section Header */}
        <div className="max-w-7xl mx-auto px-4 pt-6 pb-4 flex items-center gap-3">
          <div className="w-1 h-5 rounded-full bg-[#d4af37]" />
          <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.18em]">
            We Are Official Seller
          </span>
          <div className="flex-1 h-px bg-gradient-to-r from-[#d4af37]/30 to-transparent" />
          <span className="text-[9px] text-slate-400 uppercase tracking-widest font-semibold hidden sm:block">
            Trusted Brands
          </span>
        </div>

        {clients && clients.length > 0 ? (
          <div className="relative pb-6">
            {/* Left fade mask */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-20 z-10
              bg-gradient-to-r from-white via-white/80 to-transparent" />
            {/* Right fade mask */}
            <div className="pointer-events-none absolute right-0 top-0 h-full w-20 z-10
              bg-gradient-to-l from-white via-white/80 to-transparent" />

            {/* Single row — scrolls left */}
            <div className="overflow-hidden">
              <div
                className="animate-marquee"
                style={{ animationDuration: `${Math.max(18, clients.length * 3)}s` }}
              >
                {[...clients, ...clients].map((client, i) => (
                  <ClientCard key={`r1-${client.id}-${i}`} client={client} />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-slate-400 font-semibold italic">
            No active official seller badges configured.
          </div>
        )}
      </div>
      )}

      {/* Main Footer Wrapper (Navy Background) */}
      <div className="bg-[#0b192c] text-slate-350">

        {/* 2. Platform Value Props (Stats Bar equivalent) */}
        {isHomePage && (
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

          </div>
        </div>
        )}

        {/* 3. Main Directories & App Stores */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-xs font-medium">

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
                <a href="tel:+916363262006" className="hover:text-white">+91 63632 62006</a>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-[#d4af37] font-bold">📱</span>
                <a href="https://wa.me/916363262006" className="hover:text-white">+91 63632 62006</a>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold mt-0.5">⏱</span>
                <span>All Days, 9 AM – 11 PM GMT +5:30</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold mt-0.5">📍</span>
                <span>Bangalore Karnataka</span>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
              COMPANY
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Home</Link></li>
              <li><Link to="/about" className="hover:text-[#d4af37] cursor-pointer transition-colors block">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Contact Us</Link></li>
              <li><Link to="/dashboard" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Reseller Panel</Link></li>
              <li><Link to="/imei-products" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Free IMEI Checker</Link></li>
            </ul>
          </div>

          {/* Quick Access */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
              QUICK ACCESS
            </span>
            <ul className="space-y-2 text-slate-400">
              <li><Link to="/imei-products" className="hover:text-[#d4af37] cursor-pointer transition-colors block">IMEI Service</Link></li>
              <li><Link to="/services" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Server Service</Link></li>
              <li><Link to="/remote-products" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Remote Service</Link></li>
              <li><Link to="/category-services" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Service by Group</Link></li>
              <li><Link to="/services" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Best Selling</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-3">
            <span className="block text-[11px] font-bold text-white uppercase tracking-widest">
              LEGAL
            </span>
            <ul className="space-y-2 text-slate-400 flex flex-col items-start">
              <li><Link to="/privacy-policy" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Terms of Service</Link></li>
              <li><Link to="/delivery-policy" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Delivery Policy</Link></li>
              <li><Link to="/cancellation-policy" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Cancellation Policy</Link></li>
              <li><Link to="/refund-policy" className="hover:text-[#d4af37] cursor-pointer transition-colors block">Refund & Return Policy</Link></li>
            </ul>
          </div>

          {/* App download buttons removed */}
        </div>

        {/* 4. Copyright Bar */}
        <div className="w-full bg-[#050b14] border-t border-slate-900/60 py-4 px-4 text-center text-[10px] text-slate-400 font-bold">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-center gap-2">
            <span>
              © 2026 GSM GIRI. Powered by Innomatrics Technologies
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
