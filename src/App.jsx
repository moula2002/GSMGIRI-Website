import React, { useState, useEffect } from 'react';
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import ProductDetail from './pages/ProductDetail';
import Wallet from './pages/Wallet';
import History from './pages/History';
import Checkout from './pages/Checkout';
import Footer from './components/Footer';
import Modals from './components/Modals';
import { GlobeIcon, KeyIcon, WalletIcon } from './components/Icons';
import dashboardImg from './assets/dashboard.png';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('EN');
  const [balance, setBalance] = useState(() => {
    try {
      const saved = localStorage.getItem('gsmgiri_balance');
      return saved !== null ? Number(saved) : 25000;
    } catch { return 25000; }
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // Simulated Logged User (pre-auth for seamless UX)
  const [user, setUser] = useState({
    username: 'GSMGiriAgent',
    company: 'GSM GIRI B2B'
  });

  // Seeded mock order database — loaded from localStorage on first mount
  const SEED_ORDERS = [
    {
      id: 'TT-704192',
      title: 'Bali Beachfront Paradise - Agent Net Promo Rate (Couple)',
      category: 'packages',
      type: 'B2B Package',
      priceINR: 35000,
      client: 'Rajesh Sharma',
      clientContact: 'rajesh.sharma@gmail.com',
      date: '2026-06-03',
      time: '14:23 PM',
      status: 'Confirmed'
    },
    {
      id: 'TT-502891',
      title: 'White-label Flight Search Engine - 24 Hours Key Lease',
      category: 'leases',
      type: 'API Engine Lease',
      priceINR: 1500,
      client: 'System Admin',
      clientContact: 'API Pool Account',
      date: '2026-06-04',
      time: '09:12 AM',
      status: 'Completed'
    },
    {
      id: 'TT-103984',
      title: 'Global Visa Eligibility Checking API - 50 Credit Pack',
      category: 'credits',
      type: 'Credit Pack',
      priceINR: 4000,
      client: 'Sunita Roy',
      clientContact: 'sunita.travels@yahoo.com',
      date: '2026-06-05',
      time: '10:05 AM',
      status: 'Confirmed'
    }
  ];

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('gsmgiri_orders');
      return saved ? JSON.parse(saved) : SEED_ORDERS;
    } catch { return SEED_ORDERS; }
  });

  // Persist orders to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem('gsmgiri_orders', JSON.stringify(orders)); } catch {}
  }, [orders]);

  // Persist balance to localStorage whenever it changes
  useEffect(() => {
    try { localStorage.setItem('gsmgiri_balance', String(balance)); } catch {}
  }, [balance]);

  // Modal display states
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [fundSuccessData, setFundSuccessData] = useState(null);
  const [insufficientFundsData, setInsufficientFundsData] = useState(null);

  // Authentication Handlers
  const handleLoginSubmit = (userData) => {
    setUser(userData);
  };
  const handleLogout = () => {
    setUser(null);
  };

  // Wallet Funding simulation handler
  const onAddFunds = (amountINR, method) => {
    const newBalance = balance + amountINR;
    setBalance(newBalance);

    const txId = 'TXN-' + Math.floor(Math.random() * 90000000 + 10000000);
    const dateObj = new Date();
    const formattedDate = dateObj.toISOString().split('T')[0];
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    // Append to orders logs as funding log
    const fundLog = {
      id: txId,
      title: `Added Wallet Funds via ${method.toUpperCase()}`,
      category: 'credits',
      type: 'Wallet Deposit',
      priceINR: amountINR,
      client: user ? user.username : 'Guest Agent',
      clientContact: user ? user.company : 'Direct Pool',
      date: formattedDate,
      time: formattedTime,
      status: 'Completed'
    };

    setOrders([fundLog, ...orders]);
    setFundSuccessData({ amount: amountINR, method, txId });
  };

  // Booking simulation handler -> redirects to Checkout Page
  const onBookService = (service) => {
    // 1. Force Login Check
    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    // Redirect to checkout tab
    setSelectedProduct(service);
    setActiveTab('checkout');
  };

  // Product detail view selector
  const handleProductSelect = (service) => {
    setSelectedProduct(service);
    setActiveTab('product-detail');
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-teal-500/15 selection:text-teal-900">
      {/* Scroll to top header news ticker */}
      <TopHeader
        currency={currency}
        setCurrency={setCurrency}
        language={language}
        setLanguage={setLanguage}
      />

      {/* Main navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currency={currency}
        balance={balance}
        user={user}
        setOpenAuthModal={setOpenAuthModal}
        handleLogout={handleLogout}
      />

      {/* Panel routing container */}
      <main className="flex-grow">
        {activeTab === 'home' && (
          <Home
            currency={currency}
            onBookService={handleProductSelect}
            setSearchQuery={setSearchQuery}
            setActiveTab={setActiveTab}
          />
        )}

        {activeTab === 'services' && (
          <div className="py-6">
            {searchQuery && (
              <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between bg-slate-50/40 border border-slate-100 p-3.5 rounded-xl">
                <span className="text-xs text-slate-700">
                  Showing results for query: <span className="font-bold text-slate-850">"{searchQuery}"</span>
                </span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setActiveTab('services');
                  }}
                  className="text-xs text-[#d4af37] hover:text-[#c5a059] font-bold border border-slate-200 hover:border-[#d4af37] hover:bg-amber-50/10 px-3 py-1.5 rounded transition-all"
                >
                  Clear Filter
                </button>
              </div>
            )}

            <Services
              searchQuery={searchQuery}
              currency={currency}
              onBookService={handleProductSelect}
            />
          </div>
        )}

        {activeTab === 'product-detail' && selectedProduct && (
          <ProductDetail
            product={selectedProduct}
            setProduct={setSelectedProduct}
            currency={currency}
            user={user}
            setOpenAuthModal={setOpenAuthModal}
            onBookService={onBookService}
          />
        )}

        {activeTab === 'checkout' && selectedProduct && (
          <Checkout
            product={selectedProduct}
            currency={currency}
            balance={balance}
            setBalance={setBalance}
            user={user}
            setOpenAuthModal={setOpenAuthModal}
            orders={orders}
            setOrders={setOrders}
            setActiveTab={setActiveTab}
            setActiveInvoice={setActiveInvoice}
          />
        )}

        {activeTab === 'wallet' && (
          <Wallet
            currency={currency}
            balance={balance}
            onAddFunds={onAddFunds}
          />
        )}

        {activeTab === 'history' && (
          <History
            orders={orders}
            currency={currency}
            onViewInvoice={setActiveInvoice}
          />
        )}
      </main>

      {/* Footer layout */}
      <Footer currency={currency} />

      {/* General Interactive Modals */}
      <Modals
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        handleLoginSubmit={handleLoginSubmit}
        activeInvoice={activeInvoice}
        setActiveInvoice={setActiveInvoice}
        fundSuccessData={fundSuccessData}
        setFundSuccessData={setFundSuccessData}
        insufficientFundsData={insufficientFundsData}
        setInsufficientFundsData={setInsufficientFundsData}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </div>
  );
}
