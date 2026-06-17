import React, { useEffect } from 'react';
import { GlobeIcon, ShieldIcon } from '../components/Icons';

export default function About() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-left font-sans">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8 border-l-4 border-[#d4af37] pl-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">
          About GSM GIRI B2B Portal
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Main Text */}
        <div className="md:col-span-2 space-y-6 text-sm text-slate-650 leading-relaxed">
          <p className="font-semibold text-slate-805 text-base">
            Welcome to GSM GIRI, the premier global B2B fulfillment portal for mobile technicians, retail agents, and unlock shop operators worldwide.
          </p>
          <p>
            Established as a specialized platform for digital mobile credentials, license activations, server logs, and remote tool rentals, GSM GIRI delivers high-speed automated connections to the most popular firmware, unlock, and flashing networks in the industry.
          </p>
          <p>
            We operate at scale, syncing directly with primary API adapters for tools such as UnlockTool, Android Multi Tool, NexaPro, and Hydra. This allows us to offer instant, net-rate pricing directly to our registered B2B partner network.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mt-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-1.5 h-3.5 bg-[#d4af37] rounded-sm"></span>
              Why Partner with GSM GIRI?
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span><strong>Instant API Delivery:</strong> Automated rental keys and voucher credentials generated in real-time.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span><strong>Net-Rate Pricing:</strong> Maximize your shop profit margins with wholesale credit and activation packages.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span><strong>Secure Deposits:</strong> Fast wallet replenishment via bank wire, credit card gateways, and USDT crypto channels.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4af37] font-bold">✔</span>
                <span><strong>Dispute Resolution:</strong> Dedicated support ticket desk operating 24x7 to ensure your order queue keeps moving.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Brand details sidebar */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-[#0b192c] to-[#152e50] border border-[#d4af37]/20 rounded-2xl p-6 text-white shadow">
            <div className="w-12 h-12 rounded-xl bg-[#070e1b] flex items-center justify-center border border-[#d4af37]/30 mb-4">
              <GlobeIcon className="w-7 h-7 text-[#d4af37] animate-spin-slow" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#d4af37]">Official Distributor</h3>
            <p className="text-[11px] text-slate-300 mt-2 font-light leading-relaxed">
              GSM GIRI is an official authorized reseller for major software keys, schematic services, and credit tokens. Enjoy warranty-backed activations.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
            <h4 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Our Stats</h4>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <span className="block text-lg font-black text-slate-800">10k+</span>
                <span className="text-[9px] text-slate-450 uppercase font-bold">Agents</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl">
                <span className="block text-lg font-black text-slate-800">2.5M+</span>
                <span className="text-[9px] text-slate-450 uppercase font-bold">Unlocks</span>
              </div>
              <div className="bg-slate-50 border border-slate-100 p-3 rounded-xl col-span-2">
                <span className="block text-lg font-black text-[#d4af37]">99.9%</span>
                <span className="text-[9px] text-slate-450 uppercase font-bold">API Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
