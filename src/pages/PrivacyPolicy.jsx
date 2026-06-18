import React from 'react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800 font-sans">
      <h1 className="text-3xl font-black mb-6 text-[#0b192c] border-b-2 border-[#d4af37] pb-2 inline-block">Privacy Policy</h1>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 mt-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p>
          At GSM GIRI, accessible from our website, one of our main priorities is the privacy of our visitors. 
          This Privacy Policy document contains types of information that is collected and recorded by GSM GIRI and how we use it.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Information We Collect</h2>
        <p>
          The personal information that you are asked to provide, and the reasons why you are asked to provide it, 
          will be made clear to you at the point we ask you to provide your personal information.
        </p>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, 
          phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">How We Use Your Information</h2>
        <p>We use the information we collect in various ways, including to:</p>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide, operate, and maintain our website</li>
          <li>Improve, personalize, and expand our website</li>
          <li>Understand and analyze how you use our website</li>
          <li>Develop new products, services, features, and functionality</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service.</li>
        </ul>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Log Files</h2>
        <p>
          GSM GIRI follows a standard procedure of using log files. These files log visitors when they visit websites. 
          All hosting companies do this and a part of hosting services' analytics. The information collected by log files 
          include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, 
          referring/exit pages, and possibly the number of clicks.
        </p>
      </div>
    </div>
  );
}
