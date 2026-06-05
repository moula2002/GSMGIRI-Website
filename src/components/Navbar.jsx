import React, { useState } from 'react';
import { GlobeIcon, MenuIcon, XIcon, UserIcon, WalletIcon } from './Icons';

export default function Navbar({
  activeTab,
  setActiveTab,
  currency,
  balance,
  user,
  setOpenAuthModal,
  handleLogout
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to format currency
  const formatBalance = () => {
    if (currency === 'INR') {
      return `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }
    // Converted rate simulation (1 USD = 83 INR)
    const converted = balance / 83;
    return `$${converted.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Packages & Services' },
    { id: 'wallet', label: 'Add Funds' },
    { id: 'history', label: 'Order History' },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full z-40 bg-[#0b192c] border-b-2 border-[#d4af37] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Brand */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleTabClick('home')}>
            <div className="w-10 h-10 rounded-xl bg-[#070e1b] flex items-center justify-center text-white border border-[#d4af37]/20 shadow">
              <GlobeIcon className="w-6 h-6 text-[#d4af37]" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white">
                GSM<span className="text-[#d4af37] font-extrabold">GIRI</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-slate-350 font-semibold leading-none">
                B2B Agent Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`text-sm font-semibold transition-all relative py-2 ${
                  activeTab === item.id
                    ? 'text-[#d4af37] font-bold'
                    : 'text-white hover:text-[#d4af37]/80'
                }`}
              >
                {item.label}
                {activeTab === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full shadow-sm"></span>
                )}
              </button>
            ))}
          </div>

          {/* Wallet and User Section */}
          <div className="hidden md:flex items-center gap-4">
            {/* Wallet Tracker */}
            <div
              onClick={() => handleTabClick('wallet')}
              className="flex items-center gap-2 bg-[#070e1b] border border-slate-800 px-3.5 py-1.5 rounded-lg hover:border-[#d4af37] cursor-pointer transition-all duration-300 group hover:bg-[#0b192c] shadow-inner"
            >
              <WalletIcon className="w-4 h-4 text-[#d4af37] group-hover:scale-110 transition-transform" />
              <div className="text-left leading-none">
                <span className="text-[9px] block text-slate-400 font-bold uppercase tracking-wider">
                  Agent Wallet
                </span>
                <span className="text-sm font-extrabold text-[#d4af37] tracking-tight">
                  {formatBalance()}
                </span>
              </div>
            </div>

            {/* User Login/Logout */}
            {user ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-[#070e1b] border border-slate-800 px-3 py-1.5 rounded-lg">
                  <UserIcon className="w-4 h-4 text-[#d4af37]" />
                  <span className="text-xs font-bold text-white">{user.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-xs bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 px-3 py-2 rounded-lg font-bold transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="bg-[#d4af37] border border-[#d4af37]/40 hover:bg-[#c5a059] text-slate-950 shadow-sm px-4 py-2 rounded-lg text-sm font-black tracking-wide flex items-center gap-1.5 transition-all cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-slate-950" />
                Login / Register
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-3">
            {/* Wallet Badge on Mobile */}
            <div
              onClick={() => handleTabClick('wallet')}
              className="flex items-center gap-1 bg-[#070e1b] border border-slate-800 px-2.5 py-1 rounded-md text-[#d4af37] text-xs font-bold"
            >
              <WalletIcon className="w-3.5 h-3.5" />
              <span>{formatBalance()}</span>
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#d4af37] hover:bg-[#070e1b] focus:outline-none"
            >
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Slide-down */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b192c] border-b border-[#d4af37] py-2 px-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-semibold ${
                activeTab === item.id
                  ? 'bg-[#070e1b] text-[#d4af37] border-l-2 border-[#d4af37] font-bold'
                  : 'text-white hover:bg-[#070e1b]/70 hover:text-[#d4af37]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="border-t border-slate-800 pt-3 pb-2 flex flex-col gap-2">
            {user ? (
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400 px-3">Agent: {user.username}</span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-950/60 hover:bg-red-900 border border-red-500/40 text-red-200 px-3 py-1.5 rounded text-xs font-bold transition-all"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setOpenAuthModal(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full bg-[#d4af37] text-slate-950 py-2 rounded text-xs font-black text-center flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-slate-950" />
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
