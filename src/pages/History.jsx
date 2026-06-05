import React, { useState } from 'react';
import { ClockIcon, GlobeIcon, KeyIcon } from '../components/Icons';

// Helper: generate a deterministic delivery code from order ID
const generateServiceCode = (orderId) => {
  const seed = orderId ? orderId.replace('TT-', '') : '000000';
  const hex = () => Math.floor(parseInt(seed) * 7 % 65536).toString(16).toUpperCase().padStart(4, '0');
  return {
    activationKey: `GSMG-${seed}-${hex()}-X${(parseInt(seed) % 97).toString(16).toUpperCase().padStart(2, '0')}`,
    serverCode:    `SRV::${hex()}::${seed}::UNLK`,
    apiToken:      `eyJhbGciOiJIUzI1NiJ9.${btoa('order:' + seed).replace(/=/g, '')}.GSMGIRI`,
    expiresAt:     new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]
  };
};

export default function History({ orders, currency, onViewInvoice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewCodeOrder, setViewCodeOrder] = useState(null);
  const [codeCopied, setCodeCopied] = useState(null);

  const handleCopy = (text, key) => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCodeCopied(key);
    setTimeout(() => setCodeCopied(null), 2000);
  };

  const formatPrice = (priceINR) => {
    if (currency === 'INR') {
      return `₹${priceINR.toLocaleString('en-IN')}`;
    }
    const converted = Math.round(priceINR / 83);
    return `$${converted.toLocaleString('en-US')}`;
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-200">
            ● Confirmed
          </span>
        );
      case 'Processing':
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-600 border border-amber-200 animate-pulse">
            ● Processing
          </span>
        );
      case 'Cancelled':
      case 'Refunded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-600 border border-rose-200">
            ● Refunded
          </span>
        );
      default:
        return null;
    }
  };

  // Filter logic
  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.client && order.client.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'confirmed' && (order.status === 'Confirmed' || order.status === 'Completed')) ||
      (statusFilter === 'processing' && order.status === 'Processing') ||
      (statusFilter === 'refunded' && order.status === 'Refunded');

    return matchesSearch && matchesStatus;
  });

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      {/* Section Title */}
      <div className="flex items-center gap-2 mb-8 border-l-4 border-[#d4af37] pl-3">
        <h1 className="text-2xl font-bold tracking-tight text-slate-800 uppercase">
          Agent Order &amp; Transaction Logs
        </h1>
      </div>

      {/* Filters and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm">
        {/* Search */}
        <div className="w-full md:max-w-md">
          <input
            type="text"
            placeholder="Search by Booking ID, Client name, or service..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 placeholder-slate-450 focus:outline-none focus:border-[#d4af37] transition-colors"
          />
        </div>

        {/* Status Category Tabs */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto scrollbar-none">
          {[
            { id: 'all', label: 'All Statuses' },
            { id: 'confirmed', label: 'Confirmed' },
            { id: 'processing', label: 'Processing' },
            { id: 'refunded', label: 'Refunded' }
          ].map((status) => (
            <button
              key={status.id}
              onClick={() => setStatusFilter(status.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all border ${
                statusFilter === status.id
                  ? 'bg-[#d4af37] text-slate-950 border-[#d4af37]'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:text-[#d4af37]'
              }`}
            >
              {status.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <ClockIcon className="w-12 h-12 text-slate-200 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-700">No Orders Match</h3>
            <p className="text-xs text-slate-400 mt-1">Try clearing filters or search terms.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 text-slate-550 text-[10px] uppercase font-bold tracking-widest border-b border-slate-200">
                  <th className="py-4 px-6">Order ID</th>
                  <th className="py-4 px-6">Service/Details</th>
                  <th className="py-4 px-6">Client Info</th>
                  <th className="py-4 px-6">Date / Time</th>
                  <th className="py-4 px-6 text-right">Debit Cost</th>
                  <th className="py-4 px-6 text-center">Status</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50/50 transition-colors">
                    {/* Order ID */}
                    <td className="py-4 px-6 font-mono text-[#d4af37] font-bold select-all">
                      {order.id}
                    </td>

                    {/* Service/Details */}
                    <td className="py-4 px-6 max-w-xs md:max-w-sm">
                      <div className="flex items-center gap-2">
                        {order.category === 'leases' ? (
                          <KeyIcon className="w-4 h-4 text-amber-600 shrink-0" />
                        ) : (
                          <GlobeIcon className="w-4 h-4 text-[#d4af37] shrink-0" />
                        )}
                        <span className="font-semibold text-slate-800 line-clamp-1">{order.title}</span>
                      </div>
                      <span className="block text-[9px] text-slate-400 uppercase mt-0.5 font-bold">
                        Type: {order.type}
                      </span>
                    </td>

                    {/* Client Info */}
                    <td className="py-4 px-6">
                      <span className="font-bold text-slate-700 block">{order.client || 'SaaS System'}</span>
                      <span className="text-[10px] text-slate-450">{order.clientContact || 'Direct Agent Pool'}</span>
                    </td>

                    {/* Date / Time */}
                    <td className="py-4 px-6 text-slate-600 whitespace-nowrap">
                      <div>{order.date}</div>
                      <div className="text-[10px] text-slate-450">{order.time}</div>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-6 text-right font-extrabold text-[#d4af37] whitespace-nowrap">
                      {formatPrice(order.priceINR)}
                    </td>

                    {/* Status */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      {getStatusBadge(order.status)}
                    </td>

                    {/* Actions: Invoice + View Code */}
                    <td className="py-4 px-6 text-center">
                      <div className="flex items-center justify-center gap-1.5 flex-wrap">
                        <button
                          onClick={() => onViewInvoice(order)}
                          className="text-[10px] border border-[#d4af37]/35 hover:border-[#d4af37] hover:bg-amber-50/10 text-[#d4af37] px-2.5 py-1.5 rounded transition-all font-bold whitespace-nowrap"
                        >
                          Invoice
                        </button>
                        <button
                          onClick={() => setViewCodeOrder(order)}
                          className="text-[10px] border border-[#0b192c] bg-[#0b192c] hover:bg-[#152e50] text-[#d4af37] px-2.5 py-1.5 rounded transition-all font-black flex items-center gap-1 whitespace-nowrap"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                          </svg>
                          View Code
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* VIEW CODE POPUP MODAL */}
      {viewCodeOrder && (() => {
        const codes = generateServiceCode(viewCodeOrder.id);
        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 backdrop-blur-md px-4">
            <div className="w-full max-w-lg bg-[#070e1b] border border-[#d4af37]/30 rounded-2xl overflow-hidden shadow-2xl relative text-white">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#d4af37]/20">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-[#d4af37]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase tracking-wider">Service Delivery Code</h3>
                    <span className="text-[9px] text-[#d4af37] font-bold uppercase tracking-widest">Order Ref: {viewCodeOrder.id}</span>
                  </div>
                </div>
                <button
                  onClick={() => { setViewCodeOrder(null); setCodeCopied(null); }}
                  className="text-slate-500 hover:text-white p-1 transition-colors cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Code Body */}
              <div className="p-6 space-y-3 max-h-[70vh] overflow-y-auto">
                {/* Order Info */}
                <div className="bg-[#0b192c] border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block mb-1">Service / Title</span>
                  <span className="text-slate-200 font-semibold text-xs leading-snug">{viewCodeOrder.title}</span>
                  <div className="flex gap-4 mt-2 pt-2 border-t border-slate-800">
                    <div>
                      <span className="text-[9px] text-slate-600 uppercase font-bold block">Type</span>
                      <span className="text-[10px] text-slate-300 font-semibold">{viewCodeOrder.type}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-600 uppercase font-bold block">Date</span>
                      <span className="text-[10px] text-slate-300 font-semibold">{viewCodeOrder.date}</span>
                    </div>
                    <div>
                      <span className="text-[9px] text-slate-600 uppercase font-bold block">Status</span>
                      <span className="text-[10px] text-emerald-400 font-bold">● {viewCodeOrder.status}</span>
                    </div>
                  </div>
                </div>

                {/* Activation Key only */}
                <div className="bg-[#0b192c] border border-slate-800 rounded-xl p-3.5">
                  <span className="text-[9px] font-bold uppercase tracking-widest text-slate-500 block mb-1.5">🔑 Activation Key</span>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 font-mono text-[11px] text-emerald-400 bg-slate-950/60 px-2.5 py-1.5 rounded-lg border border-slate-800 break-all select-all">
                      {codes.activationKey}
                    </code>
                    <button
                      onClick={() => handleCopy(codes.activationKey, 'activation')}
                      className="shrink-0 text-[9px] font-black uppercase tracking-wider px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer"
                      style={{
                        borderColor: codeCopied === 'activation' ? '#10b981' : '#d4af3740',
                        color: codeCopied === 'activation' ? '#10b981' : '#d4af37',
                        background: codeCopied === 'activation' ? 'rgba(16,185,129,0.1)' : 'rgba(212,175,55,0.08)'
                      }}
                    >
                      {codeCopied === 'activation' ? '✓ Copied' : 'Copy'}
                    </button>
                  </div>
                </div>

                {/* Expiry notice */}
                <div className="flex items-center gap-2 text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-xl px-3.5 py-2.5 font-bold">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Code valid until:&nbsp;<span className="text-white">{codes.expiresAt}</span>&nbsp;·&nbsp;Do not share with unauthorised agents.
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 pb-5 pt-2">
                <button
                  onClick={() => { setViewCodeOrder(null); setCodeCopied(null); }}
                  className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-2.5 rounded-xl text-xs uppercase tracking-wider transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
}
