import React, { useState, useEffect } from 'react';

export default function Contact({ user }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const [name, setName] = useState(user ? user.username : '');
  const [contact, setContact] = useState(user ? user.email : '');
  const [subject, setSubject] = useState('');
  const [service, setService] = useState('General Support');
  const [desc, setDesc] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !contact.trim() || !subject.trim() || !desc.trim()) {
      alert('Please fill out all fields.');
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      client: name.trim(),
      clientContact: contact.trim(),
      subject: subject.trim(),
      service,
      desc: desc.trim(),
      priority
    };

    try {
      const response = await fetch('https://gsmgiri-website-backend.onrender.com/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setSuccess(true);
        setSubject('');
        setDesc('');
      } else {
        const data = await response.json();
        throw new Error(data.error || 'Failed to submit inquiry');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 text-left font-sans text-slate-800">
      {/* Title */}
      <div className="flex items-center gap-3 mb-8 border-l-4 border-[#d4af37] pl-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-800 uppercase">
          Contact Support Desk
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
        {/* Contact Info */}
        <div className="space-y-6">
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
            <h3 className="text-xs font-black text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2">Support Channels</h3>
            
            <div className="space-y-3.5 text-xs">
              <div className="flex gap-3 items-start">
                <span className="text-base text-[#d4af37]">📞</span>
                <div>
                  <span className="font-bold text-slate-700 block">Phone & WhatsApp</span>
                  <a href="tel:+918247005409" className="text-slate-605 font-mono select-all hover:text-[#d4af37]">+91 824-700-5409</a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="text-base text-[#d4af37]">✉</span>
                <div>
                  <span className="font-bold text-slate-700 block">Email Address</span>
                  <a href="mailto:support@gsmgiri.com" className="text-slate-605 select-all hover:text-[#d4af37]">support@gsmgiri.com</a>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <span className="text-base text-[#d4af37]">🕒</span>
                <div>
                  <span className="font-bold text-slate-700 block">Business Hours</span>
                  <span className="text-slate-605">Mon - Sat: 09:00 AM - 09:00 PM (IST)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#0b192c] text-white border border-[#d4af37]/25 rounded-2xl p-5">
            <span className="text-[9px] font-black text-[#d4af37] uppercase tracking-wider block">Fulfillment SLA</span>
            <p className="text-[11px] text-slate-350 mt-1.5 leading-relaxed font-light">
              Server logs and rental key resets are processed continuously. Inquiry tickets are generally resolved within 15-30 minutes during business hours.
            </p>
          </div>
        </div>

        {/* Inquiry Form */}
        <div className="md:col-span-2">
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-sm font-black text-slate-800 uppercase tracking-widest border-b border-slate-100 pb-3.5 mb-5">
              Submit a Support Ticket
            </h3>

            {success && (
              <div className="mb-5 p-4 bg-emerald-50 border border-emerald-250 text-emerald-700 rounded-xl text-xs font-bold text-left flex items-start gap-2 animate-fade-in">
                <span>✓</span>
                <div>
                  <span className="block">Ticket Submitted Successfully!</span>
                  <span className="block font-normal mt-0.5 text-emerald-650">Our operator will process your request. You can check updates inside your User Dashboard.</span>
                </div>
              </div>
            )}

            {error && (
              <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-650 rounded-xl text-xs font-bold text-left">
                ⚠️ {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="block font-bold text-slate-700">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block font-bold text-slate-700">Contact Email / Phone</label>
                  <input
                    type="text"
                    required
                    placeholder="Email or Mobile"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 text-left">
                  <label className="block font-bold text-slate-700">Affected Service / Product</label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all cursor-pointer"
                  >
                    <option value="General Support">General Support</option>
                    <option value="UnlockTool Rent">UnlockTool Rent</option>
                    <option value="Android Multi Tool Rent">Android Multi Tool Rent</option>
                    <option value="NexaPro Activation">NexaPro Activation</option>
                    <option value="USDT/Wallet Deposit">USDT/Wallet Deposit</option>
                  </select>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="block font-bold text-slate-700">Priority</label>
                  <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all cursor-pointer"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block font-bold text-slate-700">Subject</label>
                <input
                  type="text"
                  required
                  placeholder="Summarize your issue"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                />
              </div>

              <div className="space-y-1.5 text-left">
                <label className="block font-bold text-slate-700">Detailed Description</label>
                <textarea
                  required
                  rows="4"
                  placeholder="Explain details of the activation issue, credentials error, or billing question..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-slate-800 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4af37] hover:bg-[#c5a059] disabled:bg-slate-350 text-slate-950 font-black py-3 rounded-xl uppercase tracking-wider transition-all shadow-sm border border-[#d4af37]/35 cursor-pointer text-center block"
              >
                {loading ? 'Submitting Ticket...' : 'Send Inquiry Ticket'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
