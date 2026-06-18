import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { HomeIcon, GlobeIcon, ChevronDownIcon, MenuIcon, XIcon, UserIcon } from './Icons';
import logoImg from '../assets/GSM giri logo.png';

const BookIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 21C10.5 19.5 7.5 18 4.5 18H3V4H4.5C7.5 4 10.5 5.5 12 7V21Z" fill="#8bc34a" />
    <path d="M12 21C13.5 19.5 16.5 18 19.5 18H21V4H19.5C16.5 4 13.5 5.5 12 7V21Z" fill="#ffeb3b" />
    <path d="M12 4V21" stroke="#0b192c" strokeWidth="1.5" />
  </svg>
);

export default function Navbar({
  currency,
  setCurrency,
  balance,
  user,
  setOpenAuthModal,
  handleLogout,
  setSearchQuery,
  categories = [],
  activeCategory,
  setActiveCategory,
  selectedCategorySlug,
  setSelectedCategorySlug,
  cart = [],
  wishlist = []
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [serviceDropdownOpen, setServiceDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Helper to format currency
  const formatBalance = () => {
    if (currency === 'INR') {
      return `₹${balance.toLocaleString('en-IN', { minimumFractionDigits: 2 })}`;
    }
    const converted = balance / 83;
    return `$${converted.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
  };

  const handleHomeClick = () => {
    if (setSearchQuery) setSearchQuery('');
    navigate('/');
    setMobileMenuOpen(false);
  };

  const handleCategoryClick = (categorySlug = 'all') => {
    if (setSearchQuery) setSearchQuery('');
    if (categorySlug === 'all') {
      if (setActiveCategory) setActiveCategory('all');
      navigate('/services');
    } else {
      if (setSelectedCategorySlug) setSelectedCategorySlug(categorySlug);
      navigate('/category-services');
    }
    setServiceDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleImeiClick = () => {
    navigate('/imei-products');
    setMobileMenuOpen(false);
  };

  const handleWalletClick = () => {
    navigate('/wallet');
    setMobileMenuOpen(false);
  };

  const handleHistoryClick = () => {
    navigate('/history');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 w-full z-40 bg-[#0b192c] border-b-2 border-[#d4af37] text-white shadow-md font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Desktop Left Nav Items */}
          <div className="hidden md:flex items-center gap-6">
            {/* Logo Brand on Desktop */}
            <div className="flex items-center gap-2 cursor-pointer mr-3" onClick={handleHomeClick}>
              <img src={logoImg} alt="GSM GIRI Logo" className="h-14 object-contain mix-blend-screen" />
            </div>
            {/* Home */}
            <button
              onClick={handleHomeClick}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 text-white hover:text-white/80 cursor-pointer ${
                location.pathname === '/' ? 'opacity-100 font-bold border-b-2 border-white' : 'opacity-95'
              }`}
            >
              <HomeIcon className="w-4 h-4 text-white" />
              <span>Home</span>
            </button>

            {/* Service List Dropdown */}
            <div className="relative">
              <button
                onClick={() => setServiceDropdownOpen(!serviceDropdownOpen)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 text-white hover:text-white/80 cursor-pointer ${
                  location.pathname === '/services' || location.pathname === '/category-services' ? 'opacity-100 font-bold border-b-2 border-white' : 'opacity-95'
                }`}
              >
                <span>Service List</span>
                <ChevronDownIcon className="w-3.5 h-3.5 text-white/85" />
              </button>
              
              {serviceDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setServiceDropdownOpen(false)}></div>
                  <div className="absolute left-0 mt-2 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black/5 py-1 z-20">
                    <button
                      onClick={() => handleCategoryClick('all')}
                      className="block w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                    >
                      All Services
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.slug)}
                        className="block w-full text-left px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-100 hover:text-slate-900 cursor-pointer"
                      >
                        {cat.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* IMEI Service */}
            <button
              onClick={handleImeiClick}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 text-white hover:text-white/80 cursor-pointer ${
                location.pathname === '/imei-products' ? 'opacity-100 font-bold border-b-2 border-white' : 'opacity-95'
              }`}
            >
              <span>IMEI Service</span>
            </button>

            {/* Remote/ Tool-Rent */}
            <button
              onClick={() => { navigate('/remote-products'); setMobileMenuOpen(false); }}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 text-white hover:text-white/80 cursor-pointer ${
                location.pathname === '/remote-products' ? 'opacity-100 font-bold border-b-2 border-white' : 'opacity-95'
              }`}
            >
              <BookIcon className="w-4 h-4" />
              <span>Remote/ Tool-Rent</span>
            </button>

            {/* INR Fund Add */}
            <button
              onClick={() => user ? handleWalletClick() : setOpenAuthModal(true)}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 text-white hover:text-white/80 cursor-pointer ${
                location.pathname === '/wallet' ? 'opacity-100 font-bold border-b-2 border-white' : 'opacity-95'
              }`}
            >
              <span>INR Fund Add</span>
            </button>

            {/* Order history */}
            <button
              onClick={() => user ? handleHistoryClick() : setOpenAuthModal(true)}
              className={`flex items-center gap-1.5 text-sm font-semibold transition-all py-2 text-white hover:text-white/80 cursor-pointer ${
                location.pathname === '/history' ? 'opacity-100 font-bold border-b-2 border-white' : 'opacity-95'
              }`}
            >
              <span>Order history</span>
            </button>
          </div>

          {/* Desktop Right Side (Currency & Auth) */}
          <div className="hidden md:flex items-center gap-4">
            {/* Currency Select */}
            <div className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency && setCurrency(e.target.value)}
                className="appearance-none bg-white/5 hover:bg-white/10 border border-white/20 rounded-xl px-4 py-1.5 pr-8 text-sm font-semibold text-white cursor-pointer outline-none hover:border-white/40 focus:border-white transition-all font-sans"
              >
                <option value="USD" className="bg-[#0b192c] text-white font-bold">USD</option>
                <option value="INR" className="bg-[#0b192c] text-white font-bold">INR</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2.5 text-white/80">
                <ChevronDownIcon className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* User Session */}
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center border border-white/25 hover:border-white/45 bg-white/5 hover:bg-white/10 rounded-2xl px-4 py-1 text-white transition-all cursor-pointer outline-none gap-2 select-none"
                >
                  <div className="w-7 h-7 rounded-full border border-white/30 flex items-center justify-center bg-white/10 shrink-0">
                    <UserIcon className="w-4 h-4 text-white" />
                  </div>
                  <div className="flex flex-col text-left leading-tight shrink-0">
                    <span className="text-xs font-bold text-white leading-none">{user.username}</span>
                    <span className="text-[8px] font-black text-white/70 tracking-wider uppercase mt-1">{user.role === 'agent' ? 'CUSTOMER' : (user.role || 'CUSTOMER')}</span>
                  </div>
                  <div className="h-6 w-px bg-white/20 mx-1.5 self-center shrink-0"></div>
                  <span className="text-xs font-extrabold text-white shrink-0">{formatBalance()}</span>
                  <ChevronDownIcon className="w-3.5 h-3.5 text-white/80 shrink-0 ml-0.5" />
                </button>

                {dropdownOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setDropdownOpen(false)}></div>
                    <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white border border-slate-200/60 p-2 shadow-xl z-20 text-slate-800 animate-scale-up font-sans flex flex-col gap-0.5">
                      
                      {/* Dashboard Option */}
                      <button
                        onClick={() => { navigate('/dashboard'); setDropdownOpen(false); }}
                        className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 15a8 8 0 1 1 16 0" />
                          <line x1="6" y1="14" x2="7.5" y2="12.5" />
                          <line x1="18" y1="14" x2="16.5" y2="12.5" />
                          <line x1="12" y1="3" x2="12" y2="5" />
                          <line x1="12" y1="15" x2="15" y2="9" />
                          <circle cx="12" cy="15" r="1.25" fill="currentColor" />
                        </svg>
                        <span>Dashboard</span>
                      </button>

                      {/* Order History */}
                      <button
                        onClick={() => { navigate('/history'); setDropdownOpen(false); }}
                        className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                          <line x1="3" y1="6" x2="21" y2="6" />
                          <path d="M16 10a4 4 0 0 1-8 0" />
                          <path d="M9 14l2 2 4-4" />
                        </svg>
                        <span>Order History</span>
                      </button>

                      {/* Statement */}
                      <button
                        onClick={() => { navigate('/statement'); setDropdownOpen(false); }}
                        className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="4" width="18" height="16" rx="2" />
                          <line x1="3" y1="9" x2="21" y2="9" />
                          <line x1="8" y1="14" x2="16" y2="14" />
                        </svg>
                        <span>Statement</span>
                      </button>

                      {/* Invoice */}
                      <button
                        onClick={() => { navigate('/statement'); setDropdownOpen(false); }}
                        className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="1.5" />
                          <line x1="7" y1="8" x2="17" y2="8" />
                          <line x1="7" y1="12" x2="17" y2="12" />
                          <line x1="7" y1="16" x2="13" y2="16" />
                        </svg>
                        <span>Invoice</span>
                      </button>

                      {/* Add Balance */}
                      <button
                        onClick={() => { navigate('/wallet'); setDropdownOpen(false); }}
                        className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-slate-700 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <circle cx="12" cy="12" r="9" strokeDasharray="3 3" />
                          <line x1="12" y1="8" x2="12" y2="16" strokeLinecap="round" />
                          <line x1="8" y1="12" x2="16" y2="12" strokeLinecap="round" />
                        </svg>
                        <span>Add Balance</span>
                      </button>

                      {/* Divider */}
                      <div className="border-t border-dashed border-slate-200 my-1.5 mx-1"></div>

                      {/* Logout option styled light-red background */}
                      <button
                        onClick={() => { handleLogout(); setDropdownOpen(false); }}
                        className="flex items-center gap-4 w-full text-left px-4 py-3 rounded-xl text-sm font-semibold bg-[#FEE2E2]/60 hover:bg-[#FEE2E2] text-red-600 transition-colors cursor-pointer"
                      >
                        <svg className="w-5 h-5 text-red-500 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" />
                        </svg>
                        <span>Logout</span>
                      </button>

                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setOpenAuthModal(true)}
                className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg px-4 py-1.5 text-sm font-bold text-white hover:border-white/40 transition-all cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-white" />
                <span>Login | Register</span>
              </button>
            )}
          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Logo Brand on Mobile */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={handleHomeClick}>
              <img src={logoImg} alt="GSM GIRI Logo" className="h-11 object-contain mix-blend-screen" />
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-white/10 focus:outline-none"
            >
              {mobileMenuOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>      {/* Mobile Slide-down Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0b192c] border-t border-[#d4af37] py-3 px-4 flex flex-col gap-2.5 text-left">
          <button
            onClick={handleHomeClick}
            className="text-left w-full px-3 py-2 rounded-md text-sm font-semibold text-white hover:bg-white/10"
          >
            Home
          </button>
          
          <div className="border-t border-white/10 pt-2">
            <span className="block px-3 text-[10px] uppercase tracking-wider text-white/70 font-bold mb-1">Service Categories</span>
            <button
              onClick={() => handleCategoryClick('all')}
              className="text-left w-full px-3 py-1.5 rounded-md text-sm font-semibold text-white/95 hover:bg-white/10"
            >
              All Services
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.slug)}
                className="text-left w-full px-3 py-1.5 rounded-md text-sm font-semibold text-white/95 hover:bg-white/10"
              >
                {cat.name}
              </button>
            ))}
          </div>

          <button
            onClick={handleImeiClick}
            className="text-left w-full px-3 py-2 rounded-md text-sm font-semibold text-white hover:bg-white/10 border-t border-white/10"
          >
            IMEI Service
          </button>

          <button
            onClick={() => { navigate('/remote-products'); setMobileMenuOpen(false); }}
            className="text-left w-full px-3 py-2 rounded-md text-sm font-semibold text-white hover:bg-white/10"
          >
            Remote/ Tool-Rent
          </button>

          <button
            onClick={() => { if (user) handleWalletClick(); else setOpenAuthModal(true); setMobileMenuOpen(false); }}
            className="text-left w-full px-3 py-2 rounded-md text-sm font-semibold text-white hover:bg-white/10"
          >
            INR Fund Add
          </button>

          <button
            onClick={() => { if (user) handleHistoryClick(); else setOpenAuthModal(true); setMobileMenuOpen(false); }}
            className="text-left w-full px-3 py-2 rounded-md text-sm font-semibold text-white hover:bg-white/10"
          >
            Order history
          </button>

          <div className="border-t border-white/10 pt-3 pb-1 flex flex-col gap-3">
            {/* Mobile Currency Select */}
            <div className="flex items-center justify-between px-3">
              <span className="text-xs font-semibold text-white/80">Currency:</span>
              <select
                value={currency}
                onChange={(e) => {
                  if (setCurrency) setCurrency(e.target.value);
                  setMobileMenuOpen(false);
                }}
                className="bg-white/10 border border-white/20 rounded px-2.5 py-1 text-xs font-semibold text-white outline-none"
              >
                <option value="USD" className="bg-[#0b192c] text-white">USD ($)</option>
                <option value="INR" className="bg-[#0b192c] text-white">INR (₹)</option>
              </select>
            </div>

            {/* Mobile Auth Session */}
            {user ? (
              <div className="flex items-center justify-between px-3">
                <span className="text-xs font-semibold text-white truncate max-w-[180px]">
                  {user.username} ({formatBalance()})
                </span>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold transition-all"
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
                className="w-full bg-white/10 hover:bg-white/20 border border-white/20 text-white py-2 rounded text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <UserIcon className="w-4 h-4 text-white" />
                <span>Login / Register</span>
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
