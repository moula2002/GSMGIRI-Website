import React from 'react';

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800 font-sans">
      <h1 className="text-3xl font-black mb-6 text-[#0b192c] border-b-2 border-[#d4af37] pb-2 inline-block">Terms of Service</h1>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 mt-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p>
          Welcome to GSM GIRI. These terms and conditions outline the rules and regulations for the use of GSM GIRI's Website.
        </p>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use GSM GIRI 
          if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Cookies</h2>
        <p>
          We employ the use of cookies. By accessing GSM GIRI, you agreed to use cookies in agreement with the GSM GIRI's Privacy Policy.
        </p>
        
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">License</h2>
        <p>
          Unless otherwise stated, GSM GIRI and/or its licensors own the intellectual property rights for all material on GSM GIRI. 
          All intellectual property rights are reserved. You may access this from GSM GIRI for your own personal use subjected to 
          restrictions set in these terms and conditions.
        </p>
        
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">User Responsibilities</h2>
        <p>
          You must not:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Republish material from GSM GIRI</li>
          <li>Sell, rent or sub-license material from GSM GIRI</li>
          <li>Reproduce, duplicate or copy material from GSM GIRI</li>
          <li>Redistribute content from GSM GIRI</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Disclaimer</h2>
        <p>
          To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website.
        </p>
      </div>
    </div>
  );
}
