import React, { useState } from 'react';
import { ClockIcon, GlobeIcon, KeyIcon } from '../components/Icons';

export default function History({ orders, currency, onViewInvoice }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

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
          Agent Order & Transaction Logs
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
                  <th className="py-4 px-6 text-center">Receipt</th>
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
                      <span className="font-bold text-slate-700 block">{order.client || "SaaS System"}</span>
                      <span className="text-[10px] text-slate-450">{order.clientContact || "Direct Agent Pool"}</span>
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

                    {/* Action */}
                    <td className="py-4 px-6 text-center">
                      <button
                        onClick={() => onViewInvoice(order)}
                        className="text-[10px] border border-[#d4af37]/35 hover:border-[#d4af37] hover:bg-amber-50/10 text-[#d4af37] px-2.5 py-1.5 rounded transition-all font-bold"
                      >
                        Invoice
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
