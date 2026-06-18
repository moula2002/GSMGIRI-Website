import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { UserIcon, KeyIcon, GlobeIcon, WalletIcon } from '../components/Icons';

export default function Login({ handleLoginSubmit, }) {
  const navigate = useNavigate();

  const [authTab, setAuthTab] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = authTab === 'login' 
      ? { email, password }
      : { username: name, email, password, company };

    const endpoint = authTab === 'login' ? 'login' : 'register';

    try {
      const response = await fetch(`https://gsmgiri-website-backend.onrender.com/api/auth/${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Successful login/register
      handleLoginSubmit(data.user);
      ('home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12 bg-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#070e1b] to-slate-950">
      <div className="w-full max-w-md bg-[#0b192c]/80 backdrop-blur-md border border-[#d4af37]/20 rounded-2xl overflow-hidden shadow-2xl relative animate-scale-up text-white flex flex-col p-8">
        
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-[#070e1b] flex items-center justify-center text-white border border-[#d4af37]/30 shadow-lg mb-3">
            <GlobeIcon className="w-8 h-8 text-[#d4af37] animate-pulse" />
          </div>
          <h2 className="text-2xl font-black tracking-tight">
            GSM<span className="text-[#d4af37] font-extrabold">GIRI</span> B2B
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {authTab === 'login' ? 'Access your partner agency account' : 'Register a new agency profile'}
          </p>
        </div>

        {/* Tab Toggle buttons */}
        <div className="flex border-b border-slate-800 mb-6 bg-[#070e1b]/40 rounded-lg p-1.5">
          <button
            onClick={() => { setAuthTab('login'); setError(null); }}
            className={`flex-1 py-2 text-xs font-black tracking-wider transition-all rounded-md cursor-pointer ${
              authTab === 'login' ? 'bg-[#d4af37] text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            LOGIN
          </button>
          <button
            onClick={() => { setAuthTab('register'); setError(null); }}
            className={`flex-1 py-2 text-xs font-black tracking-wider transition-all rounded-md cursor-pointer ${
              authTab === 'register' ? 'bg-[#d4af37] text-slate-950 shadow' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            REGISTER
          </button>
        </div>

        {/* Display Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-200 rounded-xl text-xs font-bold text-left flex items-center gap-2">
            <span className="text-sm">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {authTab === 'register' && (
            <>
              {/* Name */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Enter Full Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <UserIcon className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="GSM Giri Partner"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#070e1b] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-550 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              {/* Company */}
              <div className="space-y-1.5 text-left">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Enter Company/Shop Name</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                    <WalletIcon className="w-4 h-4 text-slate-400" />
                  </span>
                  <input
                    type="text"
                    required
                    placeholder="GSM GIRI B2B"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full bg-[#070e1b] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-550 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email Address */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Agency Email</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-slate-400">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                </svg>
              </span>
              <input
                type="email"
                required
                placeholder="agent@gsmgiri.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#070e1b] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-550 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Account Password</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <KeyIcon className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="password"
                required
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#070e1b] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-550 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-[#d4af37]/30 mt-3 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <span className="animate-spin h-4 w-4 border-2 border-slate-950 border-t-transparent rounded-full"></span>
            ) : (
              authTab === 'login' ? 'Login Account' : 'Register Agency'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
