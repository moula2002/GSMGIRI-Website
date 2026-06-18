import React from 'react';

export default function RefundPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 text-slate-800 font-sans">
      <h1 className="text-3xl font-black mb-6 text-[#0b192c] border-b-2 border-[#d4af37] pb-2 inline-block">Refund & Return Policy</h1>
      
      <div className="space-y-6 text-sm leading-relaxed text-slate-600 mt-6 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p>
          At GSM GIRI, we stand behind the quality of our services. This policy outlines the conditions under which refunds are provided.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Service Failures</h2>
        <p>
          If a digital service (such as an IMEI unlock or server request) fails to process successfully or is rejected by the supplier, the full amount deducted for that service will be automatically refunded to your GSM GIRI wallet balance.
        </p>
        
        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Incorrect Submissions</h2>
        <p>
          <strong>No refunds</strong> will be provided for orders submitted with incorrect information, such as a wrong IMEI number, incorrect carrier selection, or wrong device model. Please verify all details before placing an order.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Wallet Withdrawals</h2>
        <p>
          Funds deposited into your GSM GIRI wallet are generally non-refundable to the original payment method and must be used for services on the platform. Exceptions are made only in specific circumstances at the discretion of management.
        </p>

        <h2 className="text-xl font-bold text-slate-800 mt-8 mb-3">Verification Video Requirements</h2>
        <p>
          For certain unlocked services that claim failure but appear successful on our end, we may require a continuous, uncut video proof showing the device IMEI and the unlock failure before a refund can be processed.
        </p>
      </div>
    </div>
  );
}
