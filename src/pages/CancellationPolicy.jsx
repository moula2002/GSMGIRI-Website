import React from 'react';

export default function CancellationPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800 font-sans">
      <h1 className="text-3xl font-black mb-6 text-[#0b192c] border-b-2 border-[#d4af37] pb-2 inline-block">Cancellation Policy</h1>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 mt-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p>
          We understand that sometimes you may need to cancel an order. Our cancellation policy is designed to be fair to both our customers and our service providers.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Order Cancellation</h2>
        <p>
          <strong>Digital Services:</strong> Because our IMEI and Server unlock orders are processed automatically and sent directly to the suppliers, they cannot be cancelled once the order status changes to "In Process".
        </p>
        <p>
          If your order is still in "Pending" status, you may request a cancellation by contacting our support team.
        </p>
        
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Remote Services</h2>
        <p>
          You may cancel a scheduled remote service session up to 2 hours before the scheduled time without any penalty. Cancellations made within 2 hours of the scheduled time may be subject to a cancellation fee.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">How to Request a Cancellation</h2>
        <p>
          To request a cancellation, please log in to your dashboard, locate the specific order, and open a support ticket, or contact us directly via WhatsApp or email with your Order ID.
        </p>
      </div>
    </div>
  );
}
