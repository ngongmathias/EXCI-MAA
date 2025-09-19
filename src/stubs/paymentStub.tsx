'use client';

export default function PaymentStub() {
  return (
    <div className="border-2 border-dashed border-gray-300 p-8 m-4 rounded-lg bg-gray-50">
      <h2 className="text-2xl font-bold text-gray-700 mb-4">Payment System</h2>
      <p className="text-gray-600">This is a placeholder for the payment integration</p>
      <div className="mt-4 p-4 bg-white rounded border">
        <p className="text-sm text-gray-500">Stripe payment integration will be implemented here</p>
      </div>
    </div>
  );
}
