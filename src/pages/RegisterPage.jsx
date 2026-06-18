import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { register as registerApi } from '../services/authService';
import { UserIcon, KeyIcon, WalletIcon } from '../components/common/Icons';
import logoImg from '../assets/GSM giri logo.png';

export default function RegisterPage({ }) {
  const navigate = useNavigate();

  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [company, setCompany] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await registerApi(username, email, mobile, password, currency, company || 'GSM GIRI B2B');
      login(data.user);
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
        
        <div className="flex flex-col items-center mb-6 text-center">
          <img src={logoImg} alt="GSM GIRI Logo" className="h-24 object-contain mix-blend-screen mb-1" />
          <p className="text-xs text-slate-400 mt-1">Register a new agency profile</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-950/60 border border-red-500/40 text-red-200 rounded-xl text-xs font-bold text-left flex items-center gap-2">
            <span className="text-sm">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#070e1b] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-550 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
            </div>
          </div>

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

          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Mobile Phone</label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                <UserIcon className="w-4 h-4 text-slate-400" />
              </span>
              <input
                type="tel"
                required
                placeholder="Mobile Number"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full bg-[#070e1b] border border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-100 placeholder-slate-550 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
              />
            </div>
          </div>

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

          <div className="space-y-1.5 text-left">
            <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wide">Enter Your Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-[#070e1b] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-[#d4af37] transition-all cursor-pointer"
            >
              <option value="INR">INR (Indian Rupee)</option>
              <option value="USD">USD (US Dollar)</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#d4af37] hover:bg-[#c5a059] text-slate-950 font-black py-3 rounded-xl text-xs uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5 cursor-pointer border border-[#d4af37]/30 mt-3 disabled:opacity-50"
          >
            {loading ? 'Registering...' : 'Register Agency'}
          </button>
        </form>

        <div className="text-center mt-6 text-xs text-slate-400">
          Already have an account?{' '}
          <button onClick={() => ('login')} className="text-[#d4af37] font-bold hover:underline cursor-pointer">
            Login here
          </button>
        </div>
      </div>
    </div>
  );
}
