import React from 'react';

export default function DeliveryPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800 font-sans">
      <h1 className="text-3xl font-black mb-6 text-[#0b192c] border-b-2 border-[#d4af37] pb-2 inline-block">Delivery Policy</h1>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 mt-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p>
          This Delivery Policy outlines the delivery timelines and methods for digital services and physical products provided by GSM GIRI.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Digital Services (IMEI & Server Unlocks)</h2>
        <p>
          Most digital services are processed automatically via our API servers. 
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Instant Services:</strong> Delivered within 1 to 15 minutes.</li>
          <li><strong>Standard Services:</strong> Delivered within 1 to 24 hours.</li>
          <li><strong>Specialized Unlocks:</strong> May take 1 to 7 business days, depending on the carrier and service type.</li>
        </ul>
        <p>
          Please refer to the specific service description for exact estimated delivery times. You will be notified via email and in your dashboard once the service is completed.
        </p>
        
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Remote Service Deliveries</h2>
        <p>
          Remote services require you to be online at the scheduled time. Delivery of the service is considered complete once our technician has successfully connected and performed the requested operation.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Delays</h2>
        <p>
          While we strive to meet all estimated delivery times, delays may occur due to server maintenance, supplier delays, or incorrect information provided during booking. We will keep you updated in case of any significant delays.
        </p>
      </div>
    </div>
  );
}
