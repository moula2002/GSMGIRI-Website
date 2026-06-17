import React, { useState } from 'react';
import { UserIcon, ShieldIcon } from '../components/Icons';

export default function Dashboard({
  user,
  setUser,
  currency,
  balance,
  orders = [],
  setActiveTab,
  usersList = [],
  onAdminAddFunds
}) {
  const [subTab, setSubTab] = useState('dashboard');

  // Manage Users Search/Fund States
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

    const success = await onAdminAddFunds(targetEmail, amount);
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

  // Profile Form States
  const [username, setUsername] = useState(user?.username || '');
  const [mobile, setMobile] = useState(user?.mobile || '');
  const [company, setCompany] = useState(user?.company || '');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState(null);
  const [profileError, setProfileError] = useState(null);

  // Address/Telegram Bot States
  const [telegramUsername, setTelegramUsername] = useState('');
  const [telegramStatus, setTelegramStatus] = useState('Not Linked');

  // Helper icons
  const DashboardIcon = ({ className = "w-4.5 h-4.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 15a8 8 0 1 1 16 0" />
      <line x1="6" y1="14" x2="7.5" y2="12.5" />
      <line x1="18" y1="14" x2="16.5" y2="12.5" />
      <line x1="12" y1="3" x2="12" y2="5" />
      <line x1="12" y1="15" x2="15" y2="9" />
      <circle cx="12" cy="15" r="1" fill="currentColor" />
    </svg>
  );

  const KeyIcon = ({ className = "w-4.5 h-4.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  );

  const ApiIcon = ({ className = "w-4.5 h-4.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 17h-11a3 3 0 0 1 -3 -3v-2a3 3 0 0 1 3 -3h11" />
      <path d="M13 13l4 4l-4 4" />
      <path d="M7 7h11a3 3 0 0 1 3 3v2a3 3 0 0 1 -3 3h-11" />
      <path d="M11 11l-4 -4l4 -4" />
    </svg>
  );

  const TelegramIcon = ({ className = "w-4.5 h-4.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 10l-9 3l12-3" />
      <path d="M22 2L11 13l-4 8l-3-15L22 2z" />
    </svg>
  );

  const BellIcon = ({ className = "w-4.5 h-4.5" }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );

  // Dynamic calculations for status statistics
  const waitingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Waiting...').length;
  const processOrders = orders.filter(o => o.status === 'Processing' || o.status === 'Shipped').length;
  const successOrders = orders.filter(o => o.status === 'Confirmed' || o.status === 'Completed' || o.status === 'Delivered').length;
  const rejectedOrders = orders.filter(o => o.status === 'Cancelled' || o.status === 'Refunded' || o.status === 'Rejected').length;
  const totalOrders = orders.length;

  const currentBalance = balance;
  const formatVal = (val) => {
    return val.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setProfileMessage(null);
    setProfileError(null);
    try {
      const payload = { email: user.email, username, mobile, company };
      if (password) payload.password = password;

      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/users/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setUser(data.user);
        localStorage.setItem('gsmgiri_user', JSON.stringify(data.user));
        setProfileMessage('Profile settings updated successfully!');
        setPassword('');
      } else {
        setProfileError(data.error || 'Failed to update profile');
      }
    } catch (err) {
      setProfileError('Server connection error.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-slate-800 text-left">
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Sidebar Menu */}
        <div className="w-full lg:w-64 shrink-0 bg-white border border-slate-200/60 rounded-3xl p-4 shadow-sm flex flex-col gap-1">
          {(() => {
            const sidebarTabs = [
              { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
              { id: 'profile', label: 'Profile', icon: <UserIcon className="w-4.5 h-4.5" /> },
              { id: 'password', label: 'Password', icon: <KeyIcon /> },
              { id: 'security', label: 'Security', icon: <ShieldIcon className="w-4.5 h-4.5" /> },
              { id: 'api', label: 'API Access', icon: <ApiIcon /> },
              { id: 'telegram', label: 'Telegram Bot', icon: <TelegramIcon /> },
              { id: 'email', label: 'Email Notification', icon: <BellIcon /> }
            ];

            if (user && user.role === 'admin') {
              sidebarTabs.push({
                id: 'manage-users',
                label: 'Manage Users',
                icon: (
                  <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                )
              });
            }

            return sidebarTabs.map(tab => {
              const isActive = subTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setSubTab(tab.id)}
                  className={`w-full text-left px-5 py-3.5 text-sm font-semibold rounded-2xl transition-all flex items-center gap-3.5 cursor-pointer ${
                    isActive
                      ? 'bg-[#008080]/5 text-[#008080] border border-[#008080]/20'
                      : 'text-slate-500 hover:bg-slate-50 border border-transparent'
                  }`}
                >
                  <span className={isActive ? 'text-[#008080]' : 'text-slate-400'}>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              );
            });
          })()}
        </div>

        {/* Right Dashboard / Forms panel */}
        <div className="flex-grow w-full">
          
          {/* 1. DASHBOARD VIEW */}
          {subTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Top Row: Balance Card & Status Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 items-start">
                
                {/* Available Balance Card (3 cols) */}
                <div className="xl:col-span-3 bg-[#008080] rounded-3xl p-6 sm:p-8 text-white relative overflow-hidden shadow-lg flex flex-col justify-between min-h-[300px]">
                  {/* Decorative background shape */}
                  <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/5 -translate-y-12 translate-x-12"></div>
                  
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/80 font-bold block mb-1">
                      Available Balance
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight leading-none block">
                      {formatVal(currentBalance)} ₹ (INR)
                    </h2>
                  </div>

                  {/* Inner locked and total balance grid */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                      <span className="text-[10px] uppercase font-bold text-white/75 block">Locked Balance</span>
                      <span className="text-lg font-black block mt-1">0.00 ₹</span>
                    </div>
                    <div className="bg-white/10 rounded-2xl p-4 border border-white/10">
                      <span className="text-[10px] uppercase font-bold text-white/75 block">Total Receipts</span>
                      <span className="text-lg font-black block mt-1">6,287.28 ₹</span>
                    </div>
                  </div>

                  {/* Add balance action trigger button */}
                  <button
                    onClick={() => setActiveTab('wallet')}
                    className="w-full bg-[#006666]/30 hover:bg-[#006666]/50 border border-white/20 text-white font-bold py-3.5 rounded-2xl transition-all mt-6 flex items-center justify-center gap-2 cursor-pointer shadow-inner text-sm"
                  >
                    <span>+</span> Add Balance
                  </button>
                </div>

                {/* Status Grid (2 cols) */}
                <div className="xl:col-span-2 grid grid-cols-2 gap-4">
                  {/* Waiting */}
                  <div className="bg-[#4B5563]/10 hover:bg-[#4B5563]/15 rounded-3xl p-5 border border-slate-200/50 text-left flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[#4B5563]/15 flex items-center justify-center text-[#4B5563] shrink-0 font-bold text-lg">
                      ⏳
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-500 uppercase leading-none">Waiting...</span>
                      <span className="block text-base font-black text-slate-800 mt-1">{waitingOrders} Order</span>
                    </div>
                  </div>

                  {/* In Process */}
                  <div className="bg-[#D97706]/10 hover:bg-[#D97706]/15 rounded-3xl p-5 border border-slate-200/50 text-left flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[#D97706]/15 flex items-center justify-center text-[#D97706] shrink-0 font-bold text-lg">
                      🕒
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-500 uppercase leading-none">In Process</span>
                      <span className="block text-base font-black text-slate-800 mt-1">{processOrders} Order</span>
                    </div>
                  </div>

                  {/* Success */}
                  <div className="bg-[#10B981]/10 hover:bg-[#10B981]/15 rounded-3xl p-5 border border-slate-200/50 text-left flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[#10B981]/15 flex items-center justify-center text-[#10B981] shrink-0 font-bold text-lg">
                      ✓
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-500 uppercase leading-none">Success</span>
                      <span className="block text-base font-black text-slate-800 mt-1">{successOrders} Order</span>
                    </div>
                  </div>

                  {/* Rejected */}
                  <div className="bg-[#EF4444]/10 hover:bg-[#EF4444]/15 rounded-3xl p-5 border border-slate-200/50 text-left flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/15 flex items-center justify-center text-[#EF4444] shrink-0 font-bold text-lg">
                      🚫
                    </div>
                    <div>
                      <span className="block text-[11px] font-bold text-slate-500 uppercase leading-none">Rejected</span>
                      <span className="block text-base font-black text-slate-800 mt-1">{rejectedOrders} Order</span>
                    </div>
                  </div>

                  {/* Total Orders Placed (spans full width of the status block) */}
                  <div
                    onClick={() => setActiveTab('history')}
                    className="col-span-2 bg-[#008080] hover:bg-[#006666] text-white rounded-3xl p-5 flex items-center justify-between cursor-pointer transition-all shadow-md group border border-[#006666]/30"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center font-bold text-lg shrink-0">
                        🛍
                      </div>
                      <div className="text-left">
                        <span className="block text-[11px] font-bold text-white/80 uppercase leading-none">Total Orders Placed</span>
                        <span className="block text-lg font-black text-white mt-1">{totalOrders} Order</span>
                      </div>
                    </div>
                    <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white/20 transition-all flex items-center justify-center text-white">
                      →
                    </div>
                  </div>

                </div>

              </div>

              {/* Bottom Row: Invoices and Statements Tables */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
                
                {/* Invoices card */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Invoice</h3>
                    <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-[#008080] hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {[
                      { desc: 'Balance Deposit', amt: '100 INR', badge: 'PAID' },
                      { desc: 'Balance Deposit', amt: '77 INR', badge: 'PAID' },
                      { desc: 'Balance Deposit', amt: '350 INR', badge: 'PAID' }
                    ].map((row, idx) => (
                      <div key={idx} className="py-3 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">{row.desc}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-slate-800">{row.amt}</span>
                          <span className="bg-emerald-50 text-emerald-600 border border-emerald-200 text-[9px] font-black tracking-widest px-2 py-0.5 rounded-lg select-none">
                            {row.badge}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Statements card */}
                <div className="bg-white border border-slate-200/60 rounded-3xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">Statement</h3>
                    <button onClick={() => setActiveTab('history')} className="text-xs font-bold text-[#008080] hover:underline cursor-pointer">
                      View All
                    </button>
                  </div>
                  <div className="divide-y divide-slate-100 text-xs">
                    {[
                      { desc: 'Place Order (Web)', amt: '76.52 INR', type: 'DEBIT', color: 'bg-cyan-50 border-cyan-200 text-cyan-600' },
                      { desc: 'Balance added by UPI by Paytm', amt: '100.00 INR', type: 'CREDIT', color: 'bg-emerald-50 border-emerald-200 text-emerald-600' },
                      { desc: 'Place Order (Web)', amt: '42.53 INR', type: 'DEBIT', color: 'bg-cyan-50 border-cyan-200 text-cyan-600' }
                    ].map((row, idx) => (
                      <div key={idx} className="py-3 flex justify-between items-center">
                        <span className="font-semibold text-slate-700">{row.desc}</span>
                        <div className="flex items-center gap-4">
                          <span className="font-bold text-slate-800">{row.amt}</span>
                          <span className={`${row.color} text-[9px] font-black tracking-widest px-2 py-0.5 rounded-lg select-none`}>
                            {row.type}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. PROFILE SETTINGS */}
          {subTab === 'profile' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">Profile Information</h2>
              
              {profileMessage && <div className="p-3 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-xl text-xs font-bold mb-4">{profileMessage}</div>}
              {profileError && <div className="p-3 bg-red-50 border border-red-200 text-red-650 rounded-xl text-xs font-bold mb-4">⚠️ {profileError}</div>}

              <form onSubmit={handleProfileUpdate} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">Username</label>
                    <input type="text" required value={username} onChange={e => setUsername(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#008080]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">Email Address</label>
                    <input type="email" disabled value={user?.email} className="w-full bg-slate-100 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-400 cursor-not-allowed" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">Mobile Phone</label>
                    <input type="tel" required value={mobile} onChange={e => setMobile(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#008080]" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block font-bold text-slate-700">Company Name</label>
                    <input type="text" required value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#008080]" />
                  </div>
                </div>

                <button type="submit" className="bg-[#008080] hover:bg-[#006666] text-white font-bold py-2.5 px-6 rounded-xl uppercase tracking-wider transition-all border border-[#008080]/30 cursor-pointer mt-4">
                  Save Profile
                </button>
              </form>
            </div>
          )}

          {/* 3. PASSWORD CHANGE */}
          {subTab === 'password' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
              <h2 className="text-lg font-black uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">Change Key / Password</h2>
              
              <form onSubmit={handleProfileUpdate} className="space-y-4 text-xs">
                <div className="space-y-1.5">
                  <label className="block font-bold text-slate-700">New Password</label>
                  <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-none focus:border-[#008080]" />
                </div>
                <button type="submit" className="bg-[#008080] hover:bg-[#006666] text-white font-bold py-2.5 px-6 rounded-xl uppercase tracking-wider transition-all border border-[#008080]/30 cursor-pointer mt-4">
                  Update Password
                </button>
              </form>
            </div>
          )}

          {/* 4. SECURITY */}
          {subTab === 'security' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
              <h2 className="text-lg font-black uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">Account Security Settings</h2>
              <div className="space-y-4 text-xs leading-relaxed">
                <p className="text-slate-500 font-light">Configure multi-factor security rules and device restrictions to protect your agent balance card from unauthorized queries.</p>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">IP Access Whitelisting</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Restrict dashboard logins only from your registered shop IP address.</span>
                    </div>
                    <span className="text-xs font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded border border-red-200">DISABLED</span>
                  </div>
                  <div className="flex justify-between items-center border-t border-slate-200/50 pt-4">
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">Device Session Keys</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Invalidates all other active customer login sessions upon password modification.</span>
                    </div>
                    <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">ENABLED</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 5. API ACCESS */}
          {subTab === 'api' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
              <h2 className="text-lg font-black uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">Agent Integration API</h2>
              <div className="space-y-4 text-xs leading-relaxed">
                <p className="text-slate-500 font-light">Utilize our automated API access rules to link your custom software/IMEI unlocking scripts directly to the GSM Giri database pool.</p>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-3.5">
                  <div>
                    <label className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Developer API Key</label>
                    <div className="bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 font-mono text-[10px] text-slate-650 break-all select-all">
                      GSMG_API_KEY_LIVE_998247aBf923b7e774C37bE87CdE9871Aa62
                    </div>
                  </div>
                  <div className="pt-2">
                    <span className="block text-[10px] uppercase font-bold text-slate-500 mb-1">Fulfillment Server Webhook</span>
                    <input type="text" placeholder="https://yourdomain.com/webhooks/orders" className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-slate-700 focus:outline-none" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 6. TELEGRAM BOT */}
          {subTab === 'telegram' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
              <h2 className="text-lg font-black uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">Telegram Order Bot</h2>
              <div className="space-y-4 text-xs leading-relaxed">
                <p className="text-slate-500 font-light">Link your Telegram account to receive instant delivery confirmations, status upgrades, and invoices directly on your mobile chat feed.</p>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="font-bold text-slate-800 block text-xs">Bot Status</span>
                      <span className="text-[10px] font-bold text-[#008080] block mt-0.5">@GSMGiri_Notification_Bot</span>
                    </div>
                    <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-lg border border-slate-200">{telegramStatus}</span>
                  </div>
                  <div className="space-y-1.5 text-left pt-2 border-t border-slate-200/50">
                    <label className="block font-bold text-slate-700">Enter Telegram Username</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder="@username" value={telegramUsername} onChange={e => setTelegramUsername(e.target.value)} className="flex-grow bg-white border border-slate-200 rounded-xl px-3.5 py-2 focus:outline-none" />
                      <button type="button" onClick={() => { setTelegramStatus('Linked'); alert('Telegram channel linked successfully.'); }} className="bg-[#008080] hover:bg-[#006666] text-white font-bold px-4 py-2 rounded-xl uppercase tracking-wider cursor-pointer">Link</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 7. EMAIL NOTIFICATIONS */}
          {subTab === 'email' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm text-left">
              <h2 className="text-lg font-black uppercase tracking-wider border-b border-slate-100 pb-3 mb-6">Email Preferences</h2>
              <div className="space-y-4 text-xs leading-relaxed">
                <p className="text-slate-500 font-light">Control the types of notification logs sent to your primary registration email account.</p>
                <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-slate-850 block">Payment & Funding Alerts</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Emails verifying balance addition and payment deposit receipts.</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#008080] rounded border-slate-300 focus:ring-[#008080]" />
                  </div>
                  <div className="flex items-center justify-between border-t border-slate-200/50 pt-4">
                    <div>
                      <span className="font-bold text-slate-850 block">Order Status Milestones</span>
                      <span className="text-[10px] text-slate-400 block mt-0.5">Milestone notifications (Completed, Processing, or Shipped).</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-4 h-4 text-[#008080] rounded border-slate-300 focus:ring-[#008080]" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 8. MANAGE USERS VIEW (ADMIN ONLY) */}
          {subTab === 'manage-users' && user?.role === 'admin' && (
            <div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4 mb-6">
                <div>
                  <h2 className="text-lg font-black uppercase tracking-wider text-slate-800">Manage Users & Wallets</h2>
                  <p className="text-xs text-slate-500 mt-1">Add funds to user wallets. Enforces registered wallet currencies.</p>
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

              <div className="overflow-x-auto -mx-6 sm:mx-0">
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
                    {(() => {
                      const filteredUsers = usersList.filter(u => 
                        u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        (u.company && u.company.toLowerCase().includes(searchTerm.toLowerCase()))
                      );

                      if (filteredUsers.length === 0) {
                        return (
                          <tr>
                            <td colSpan="5" className="py-8 text-center text-slate-400 font-medium">
                              No users found matching the query.
                            </td>
                          </tr>
                        );
                      }

                      return filteredUsers.map(u => {
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
                                  className="bg-[#008080] hover:bg-[#006666] text-white font-bold px-3.5 py-2 rounded-xl transition-all border border-[#008080]/30 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                                >
                                  {loadingEmail === u.email ? 'Adding...' : 'Add'}
                                </button>
                              </form>
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
}
