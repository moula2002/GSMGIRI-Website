import React, { useState } from 'react';

export default function Statement({ orders = [], balance = 0, currency }) {
  const [searchTerm, setSearchTerm] = useState('');

  // Sort orders newest first to calculate running balance backwards
  const sortedOrders = [...orders].sort((a, b) => {
    const timeA = new Date(`${a.date}T${a.time || '00:00'}`);
    const timeB = new Date(`${b.date}T${b.time || '00:00'}`);
    return timeB - timeA;
  });

  // Calculate dynamic running balances backwards
  let tempBalance = balance;
  const statementItems = sortedOrders.map((o) => {
    const isCredit = o.category === 'credits';
    const amountVal = o.totalAmount || (o.priceINR * (o.quantity || 1));
    const stepBalance = tempBalance;

    // Adjust for next transaction backward calculation
    if (isCredit) {
      tempBalance -= amountVal;
    } else {
      tempBalance += amountVal;
    }

    return {
      id: o.id,
      dateTime: `${o.date} ${o.time || '00:00'}`,
      description: isCredit 
        ? (o.title || 'Balance added to Wallet')
        : (o.title || 'Place Order (Web)'),
      type: isCredit ? 'CREDIT' : 'DEBIT',
      amount: amountVal,
      balance: stepBalance,
      refId: isCredit 
        ? `Invoice-${o.id.replace('TXN-', '').slice(-6)}` 
        : `Order-${o.id.replace('TT-', '').slice(-6)}`
    };
  });

  // Filter based on search query
  const filteredItems = statementItems.filter(item => 
    item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.refId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.dateTime.includes(searchTerm)
  );

  const formatPrice = (amt) => {
    if (currency === 'INR') {
      return `${amt.toLocaleString('en-IN', { minimumFractionDigits: 2 })} INR`;
    }
    const converted = amt / 83;
    return `${converted.toLocaleString('en-US', { minimumFractionDigits: 2 })} USD`;
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-8 font-sans text-slate-800 text-left">
      {/* Header and Breadcrumb */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-slate-800 uppercase">
            My Statement ({filteredItems.length} Items)
          </h1>
          <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-wider flex items-center gap-1.5">
            <span>Home</span>
            <span>&gt;</span>
            <span>Dashboard</span>
            <span>&gt;</span>
            <span className="text-[#008080]">Statement</span>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full md:max-w-xs shrink-0">
          <input
            type="text"
            placeholder="Search Description or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#008080] transition-colors shadow-sm"
          />
        </div>
      </div>

      {/* Statement Table */}
      <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xl">
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <span className="text-3xl block mb-2">📋</span>
            <h3 className="text-sm font-bold text-slate-700">No Statement Found</h3>
            <p className="text-[11px] text-slate-450 mt-0.5">Your financial activity ledger is currently empty.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200/80 text-slate-500 text-[10px] font-black uppercase tracking-wider">
                  <th className="py-4.5 px-6">Date & Time</th>
                  <th className="py-4.5 px-6">Description</th>
                  <th className="py-4.5 px-6 text-center">Type</th>
                  <th className="py-4.5 px-6 text-right">Amount</th>
                  <th className="py-4.5 px-6 text-right">Balance</th>
                  <th className="py-4.5 px-6 text-right">Order/Invoice</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-semibold text-slate-700">
                {filteredItems.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 transition-colors">
                    {/* Date & Time */}
                    <td className="py-4 px-6 text-slate-500 whitespace-nowrap">
                      {item.dateTime}
                    </td>

                    {/* Description */}
                    <td className="py-4 px-6 text-slate-800">
                      {item.description}
                    </td>

                    {/* Type Badge */}
                    <td className="py-4 px-6 text-center whitespace-nowrap">
                      <span className={`inline-block text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded-lg select-none ${
                        item.type === 'DEBIT' 
                          ? 'bg-rose-50 border border-rose-200 text-red-650' 
                          : 'bg-emerald-50 border border-emerald-200 text-emerald-600'
                      }`}>
                        {item.type}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="py-4 px-6 text-right text-slate-800 whitespace-nowrap">
                      {formatPrice(item.amount)}
                    </td>

                    {/* Balance */}
                    <td className="py-4 px-6 text-right text-slate-600 whitespace-nowrap">
                      {formatPrice(item.balance)}
                    </td>

                    {/* Order/Invoice Reference */}
                    <td className="py-4 px-6 text-right text-slate-500 font-mono select-all whitespace-nowrap">
                      {item.refId}
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
