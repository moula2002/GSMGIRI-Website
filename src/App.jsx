import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import TopHeader from './components/TopHeader';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Services from './pages/Services';
import CategoryServices from './pages/CategoryServices';
import ProductDetail from './pages/ProductDetail';
import History from './pages/History';
import Footer from './components/Footer';
import Modals from './components/Modals';
import { GlobeIcon, KeyIcon } from './components/Icons';
import dashboardImg from './assets/dashboard.png';
import About from './pages/About';
import Contact from './pages/Contact';
import CartPage from './pages/CartPage';
import Dashboard from './pages/Dashboard';
import Statement from './pages/Statement';
import ImeiProductsPage from './pages/ImeiProductsPage';
import RemoteProductsPage from './pages/RemoteProductsPage';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import DeliveryPolicy from './pages/DeliveryPolicy';
import CancellationPolicy from './pages/CancellationPolicy';
import RefundPolicy from './pages/RefundPolicy';
import CheckoutPage from './pages/CheckoutPage';
const API_BASE = 'https://gsmgiri-website-backend.onrender.com/api';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const [currency, setCurrency] = useState('INR');
  const [language, setLanguage] = useState('EN');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Logged User
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('gsmgiri_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [orders, setOrders] = useState([]);
  const [services, setServices] = useState([]);
  const [imeiProducts, setImeiProducts] = useState([]);
  const [remoteProducts, setRemoteProducts] = useState([]);
  const [banners, setBanners] = useState([]);
  const [categories, setCategories] = useState([]);
  const [promoColumns, setPromoColumns] = useState([]);
  const [clients, setClients] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('');
  const [usersList, setUsersList] = useState([]);

  const fetchUsersList = async () => {
    if (!user || user.role !== 'admin') return;
    try {
      const response = await fetch(`${API_BASE}/admin/users`);
      if (response.ok) {
        const data = await response.json();
        setUsersList(data.users || []);
      }
    } catch (error) {
      console.error('Failed to load users list from server:', error);
    }
  };

  // Cart & Wishlist States
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem('gsm_cart');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem('gsm_wishlist');
      return stored ? JSON.parse(stored) : [];
    } catch { return []; }
  });

  // Guard protected tabs & redirect guests to login modal
  useEffect(() => {
    const protectedPaths = ['/checkout', '/history', '/dashboard', '/statement'];
    if (protectedPaths.some(p => location.pathname.startsWith(p)) && !user) {
      navigate('/');
      setOpenAuthModal(true);
    }
  }, [location.pathname, user, navigate]);

  // Synchronize storage updates across tabs/components
  useEffect(() => {
    const syncStorage = () => {
      try {
        const storedCart = localStorage.getItem('gsm_cart');
        if (storedCart) setCart(JSON.parse(storedCart));
        const storedWish = localStorage.getItem('gsm_wishlist');
        if (storedWish) setWishlist(JSON.parse(storedWish));
      } catch (e) {
        console.error(e);
      }
    };
    window.addEventListener('storage', syncStorage);
    return () => window.removeEventListener('storage', syncStorage);
  }, []);

  // Load state from the server on mount or when user changes
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const headers = {};
        if (user && user.email) {
          headers['x-user-email'] = user.email;
        }
        const response = await fetch(`${API_BASE}/data`, { headers });
        if (response.ok) {
          const data = await response.json();
          if (data.orders) setOrders(data.orders);
        }
        if (user && user.role === 'admin') {
          fetchUsersList();
        }
      } catch (error) {
        console.error('Failed to load initial data from server:', error);
      }
    };

    fetchInitialData();

    // Set up dynamic polling interval for user data (orders, balance) every 5 seconds
    const intervalId = setInterval(fetchInitialData, 5000);

    const fetchServices = async () => {
      try {
        const response = await fetch(`${API_BASE}/services`);
        if (response.ok) {
          const data = await response.json();
          setServices(data);
        }
      } catch (error) {
        console.error('Failed to load services from server:', error);
      }
    };

    const fetchBanners = async () => {
      try {
        const response = await fetch(`${API_BASE}/banners`);
        if (response.ok) {
          const data = await response.json();
          setBanners(data);
        }
      } catch (error) {
        console.error('Failed to load banners from server:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE}/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        }
      } catch (error) {
        console.error('Failed to load categories from server:', error);
      }
    };

    const fetchPromoColumns = async () => {
      try {
        const response = await fetch(`${API_BASE}/promo-columns`);
        if (response.ok) {
          const data = await response.json();
          setPromoColumns(data);
        }
      } catch (error) {
        console.error('Failed to load promo columns from server:', error);
      }
    };

    const fetchClients = async () => {
      try {
        const response = await fetch(`${API_BASE}/clients`);
        if (response.ok) {
          const data = await response.json();
          setClients(data);
        }
      } catch (error) {
        console.error('Failed to load clients from server:', error);
      }
    };

    const fetchImeiProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/imei-products`);
        if (response.ok) {
          const data = await response.json();
          setImeiProducts(data);
        }
      } catch (error) {
        console.error('Failed to load IMEI products from server:', error);
      }
    };

    const fetchRemoteProducts = async () => {
      try {
        const response = await fetch(`${API_BASE}/remote-products`);
        if (response.ok) {
          const data = await response.json();
          setRemoteProducts(data);
        }
      } catch (error) {
        console.error('Failed to load remote products from server:', error);
      }
    };

    fetchServices();
    fetchBanners();
    fetchCategories();
    fetchPromoColumns();
    fetchClients();
    fetchImeiProducts();
    fetchRemoteProducts();

    return () => {
      clearInterval(intervalId);
    };
  }, [user]);

  // Modal display states
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [productBackTab, setProductBackTab] = useState('services');

  // Authentication Handlers
  const handleLoginSubmit = (userData) => {
    setUser(userData);
    if (userData) {
      localStorage.setItem('gsmgiri_user', JSON.stringify(userData));
    } else {
      localStorage.removeItem('gsmgiri_user');
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_BASE}/auth/logout`, { method: 'POST' });
      setUser(null);
      localStorage.removeItem('gsmgiri_user');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  // Booking simulation handler -> redirects directly to Cart
  const onBookService = (service) => {
    // 1. Force Login Check
    if (!user) {
      setOpenAuthModal(true);
      return;
    }

    const exists = cart.find(item => item.id === service.id);
    let updated;
    if (exists) {
      updated = cart.map(item => item.id === service.id ? { ...item, quantity: item.quantity + 1, serialNo: service.serialNo || item.serialNo } : item);
    } else {
      updated = [...cart, { ...service, quantity: 1 }];
    }
    setCart(updated);
    localStorage.setItem('gsm_cart', JSON.stringify(updated));

    setSelectedProduct(service);
    navigate('/cart');
  };

  const handleCheckoutComplete = (checkoutCart, totalAmount) => {
    const orderId = 'TT-' + Math.floor(Math.random() * 900000 + 100000);
    const dateObj = new Date();
    const formattedDate = dateObj.toISOString().split('T')[0];
    const formattedTime = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const newOrder = {
      id: orderId,
      title: `${checkoutCart.length} Item(s) Checkout`,
      category: 'cart',
      type: 'Multiple Items',
      priceINR: totalAmount,
      client: user.username,
      clientContact: user.email || 'Direct User',
      date: formattedDate,
      time: formattedTime,
      status: 'Confirmed'
    };

    setOrders([newOrder, ...orders]);
    setCart([]);
    localStorage.removeItem('gsm_cart');
    setActiveInvoice(newOrder);
  };

  // Product detail view selector — tracks which page to go back to
  const handleProductSelect = (service, sourcePage = 'services') => {
    setSelectedProduct(service);
    setProductBackTab(sourcePage);
    navigate(`/product/${service.id || service._id || 'detail'}`);
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
        currency={currency}
        setCurrency={setCurrency}
        user={user}
        setOpenAuthModal={setOpenAuthModal}
        handleLogout={handleLogout}
        setSearchQuery={setSearchQuery}
        categories={categories}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        selectedCategorySlug={selectedCategorySlug}
        setSelectedCategorySlug={setSelectedCategorySlug}
        cart={cart}
        wishlist={wishlist}
      />

      {/* Panel routing container */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Home
              services={services}
              banners={banners}
              promoColumns={promoColumns}
              clients={clients}
              currency={currency}
              onBookService={handleProductSelect}
              setSearchQuery={setSearchQuery}
            />
          } />
          <Route path="/services" element={
            <div className="py-6">
              {searchQuery && (
                <div className="max-w-7xl mx-auto px-4 mb-4 flex items-center justify-between bg-slate-50/40 border border-slate-100 p-3.5 rounded-xl">
                  <span className="text-xs text-slate-700">
                    Showing results for query: <span className="font-bold text-slate-850">"{searchQuery}"</span>
                  </span>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      navigate('/services');
                    }}
                    className="text-xs text-[#d4af37] hover:text-[#c5a059] font-bold border border-slate-200 hover:border-[#d4af37] hover:bg-amber-50/10 px-3 py-1.5 rounded transition-all"
                  >
                    Clear Filter
                  </button>
                </div>
              )}
              <Services
                services={services}
                searchQuery={searchQuery}
                promoColumns={promoColumns}
                currency={currency}
                onBookService={handleProductSelect}
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
              />
            </div>
          } />
          <Route path="/category-services" element={
            <CategoryServices
              services={services}
              categorySlug={selectedCategorySlug}
              categories={categories}
              currency={currency}
              onBookService={handleProductSelect}
            />
          } />
          <Route path="/imei-products" element={
            <ImeiProductsPage
              imeiProducts={imeiProducts}
              currency={currency}
              onProductSelect={(p) => handleProductSelect(p, 'imei-products')}
              user={user}
              setOpenAuthModal={setOpenAuthModal}
            />
          } />
          <Route path="/remote-products" element={
            <RemoteProductsPage
              remoteProducts={remoteProducts}
              currency={currency}
              onProductSelect={(p) => handleProductSelect(p, 'remote-products')}
              user={user}
              setOpenAuthModal={setOpenAuthModal}
            />
          } />
          <Route path="/product/:id" element={
            selectedProduct ? (
              <ProductDetail
                product={selectedProduct}
                services={services}
                setProduct={setSelectedProduct}
                currency={currency}
                user={user}
                setOpenAuthModal={setOpenAuthModal}
                onBookService={onBookService}
                backTab={productBackTab}
                cart={cart}
                setCart={setCart}
                wishlist={wishlist}
                setWishlist={setWishlist}
              />
            ) : (
              <Navigate to="/services" />
            )
          } />
          <Route path="/history" element={
            <History
              orders={orders}
              currency={currency}
              onViewInvoice={setActiveInvoice}
              user={user}
              setOrders={setOrders}
            />
          } />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact user={user} />} />
          <Route path="/cart" element={
            <CartPage
              cart={cart}
              setCart={setCart}
              currency={currency}
              user={user}
              setOpenAuthModal={setOpenAuthModal}
              setSelectedProduct={setSelectedProduct}
            />
          } />
          <Route path="/checkout" element={
            <CheckoutPage
              cart={cart}
              user={user}
              currency={currency}
              handleCheckoutComplete={handleCheckoutComplete}
            />
          } />
          <Route path="/dashboard" element={
            <Dashboard
              user={user}
              setUser={setUser}
              currency={currency}
              orders={orders}
              services={services}
              wishlist={wishlist}
              setWishlist={setWishlist}
            />
          } />
          <Route path="/statement" element={
            <Statement
              orders={orders}
              currency={currency}
            />
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/delivery-policy" element={<DeliveryPolicy />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/refund-policy" element={<RefundPolicy />} />
        </Routes>
      </main>

      {/* Footer layout */}
      <Footer
        currency={currency}
        clients={clients}
        user={user}
        onClientsUpdate={async () => {
          try {
            const res = await fetch('https://gsmgiri-website-backend.onrender.com/api/clients');
            if (res.ok) setClients(await res.json());
          } catch (e) { console.error('Failed to refresh clients:', e); }
        }}
      />

      {/* General Interactive Modals */}
      <Modals
        openAuthModal={openAuthModal}
        setOpenAuthModal={setOpenAuthModal}
        handleLoginSubmit={handleLoginSubmit}
        activeInvoice={activeInvoice}
        setActiveInvoice={setActiveInvoice}
      />
    </div>
  );
}
