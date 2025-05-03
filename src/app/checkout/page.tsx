'use client';

import { useUser } from '@clerk/nextjs';
import { useCart } from '@/context/CartContext';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function CheckoutPage() {
  const { cartItems } = useCart();
  const { user } = useUser();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (user) {
      setName(user.firstName || '');
      setEmail(user.emailAddresses[0]?.emailAddress || '');
    }
  }, [user]);

  if (!user) {
    return <p className="text-center mt-10 text-lg">Please log in to proceed with checkout.</p>;
  }

  const total = cartItems.reduce((acc, item) => acc + item.price, 0);
  const totalAmountInPaise = total * 100;

  const handlePayment = async () => {
    if (!name.trim() || !phone || phone.length !== 10 || !email.includes('@') || !address.trim()) {
      alert('Please fill out all details correctly');
      return;
    }

    const res = await fetch('/api/razorpay/order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount: totalAmountInPaise }),
    });

    const order = await res.json();

    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: 'INR',
      name: 'Ecom-AI',
      description: 'Order Payment',
      order_id: order.id,
      handler: async function (response: any) {
        alert('✅ Payment Successful!\nPayment ID: ' + response.razorpay_payment_id);

        await fetch('/api/email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: email,
            subject: '🧾 Order Confirmation - Ecom-AI',
            orderId: order.id,
            paymentId: response.razorpay_payment_id,
            amount: total,
            customerName: name,
            deliveryAddress: address,
            products: cartItems.map((item) => item.title).join(', '),
          }),
        });
        // Save the order in the database
await fetch('/api/orders/save', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    totalPrice: total,
    productIds: cartItems.map((item) => item.id),
  }),
});

      },
      prefill: {
        name,
        email,
        contact: phone,
      },
      theme: { color: '#3399cc' },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  const formattedTotal = total.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'INR',
  });

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Checkout</h2>

      <div className="mb-4">
        {cartItems.map((item) => (
          <div key={item.id} className="mb-2">
            <p className="font-medium">{item.title}</p>
            <p className="text-sm">₹{item.price}</p>
          </div>
        ))}
        <hr className="my-2" />
        <p className="font-semibold">Total: {formattedTotal}</p>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Proceed to Pay
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
            <h3 className="text-lg font-semibold mb-4">Enter Delivery Details</h3>

            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
            />

            <textarea
              placeholder="Delivery Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full border px-3 py-2 mb-3 rounded"
              rows={3}
            />

            <div className="flex justify-between">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  handlePayment();
                }}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Pay Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
