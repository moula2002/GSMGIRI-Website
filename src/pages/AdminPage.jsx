import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

export default function AdminPage() {
  const { usersList, adminAddFunds } = useWallet();
  const [searchTerm, setSearchTerm] = useState('');
  const [fundAmounts, setFundAmounts] = useState({});
  const [loadingEmail, setLoadingEmail] = useState(null);
  const [actionStatus, setActionStatus] = useState({ type: '', message: '' });

  const handleAddFundsSubmit = async (e, targetEmail, targetCurrency) => {
    e.preventDefault();
    const amountStr = fundAmounts[targetEmail];
    const amount = parseFloat(amountStr);
    if (isNaN(amount) || amount <= 0) {
      setActionStatus({ type: 'error', message: 'Please enter a valid positive amount.' });
      return;
    }

    setLoadingEmail(targetEmail);
    setActionStatus({ type: '', message: '' });

    const success = await adminAddFunds(targetEmail, amount);
    setLoadingEmail(null);

    if (success) {
      setActionStatus({ 
        type: 'success', 
        message: `Successfully added ${targetCurrency === 'USD' ? '$' : '₹'}${amount.toFixed(2)} to ${targetEmail}!` 
      });
      setFundAmounts(prev => ({ ...prev, [targetEmail]: '' }));
    } else {
      setActionStatus({ type: 'error', message: 'Failed to add funds. Please try again.' });
    }
  };

  const filteredUsers = usersList.filter(u => 
    u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.company && u.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-slate-800 text-left">
      <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 mb-6">
          <div>
            <h2 className="text-lg font-black uppercase tracking-wider text-slate-800">Admin Workspace</h2>
            <p className="text-xs text-slate-500 mt-1">Manage users, shop profiles, and manually adjust wallet balances.</p>
          </div>
          <div className="w-full sm:w-64">
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#008080]"
            />
          </div>
        </div>

        {actionStatus.message && (
          <div className={`p-3.5 rounded-xl text-xs font-bold mb-5 flex items-center gap-2 ${
            actionStatus.type === 'success' 
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-700' 
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            {actionStatus.type === 'success' ? '✓' : '⚠️'} {actionStatus.message}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">User</th>
                <th className="py-3 px-4">Company</th>
                <th className="py-3 px-4">Currency</th>
                <th className="py-3 px-4">Balance</th>
                <th className="py-3 px-4 text-right">Add Funds</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-slate-400 font-medium">
                    No users found matching the query.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => {
                  const curSymbol = u.currency === 'USD' ? '$' : '₹';
                  const curColor = u.currency === 'USD' 
                    ? 'bg-amber-50 text-amber-600 border border-amber-200' 
                    : 'bg-cyan-50 text-cyan-600 border border-cyan-200';
                  return (
                    <tr key={u.email} className="hover:bg-slate-50/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="font-bold text-slate-850">{u.username}</div>
                        <div className="text-[10px] text-slate-400 font-medium mt-0.5">{u.email}</div>
                        {u.role === 'admin' && (
                          <span className="inline-block bg-slate-100 text-slate-600 text-[9px] font-black px-1.5 py-0.5 rounded mt-1">ADMIN</span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-slate-600 font-medium">
                        {u.company || 'GSM GIRI B2B'}
                      </td>
                      <td className="py-4 px-4">
                        <span className={`text-[10px] font-black tracking-wider px-2.5 py-0.5 rounded-lg uppercase ${curColor}`}>
                          {u.currency}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-black text-slate-800 text-sm">
                        {curSymbol}{u.balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <form onSubmit={e => handleAddFundsSubmit(e, u.email, u.currency)} className="inline-flex items-center gap-2">
                          <div className="relative">
                            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[11px]">{curSymbol}</span>
                            <input
                              type="number"
                              step="0.01"
                              required
                              placeholder="Amount"
                              value={fundAmounts[u.email] || ''}
                              onChange={e => setFundAmounts(prev => ({ ...prev, [u.email]: e.target.value }))}
                              className="w-24 bg-slate-50 border border-slate-200 rounded-xl pl-6 pr-3 py-2 text-xs focus:outline-none focus:border-[#008080] font-bold text-slate-800"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={loadingEmail === u.email}
                            className="bg-[#008080] hover:bg-[#006666] text-white font-bold px-3.5 py-2 rounded-xl transition-all border border-[#008080]/30 cursor-pointer disabled:opacity-55"
                          >
                            {loadingEmail === u.email ? 'Adding...' : 'Add'}
                          </button>
                        </form>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
