'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';

interface Product {
  id: number;
  name: string;
  price: number;
  image?: string;
}

interface Order {
  id: number;
  createdAt: string;
  totalPrice: number;
  status: string;
  products: Product[];
}

export default function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/orders/get');
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('❌ Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      {orders.map((order) => (
        <div key={order.id} className="bg-white shadow p-4 rounded mb-4">
          <img
            src={order.products[0]?.image || '/default-image.jpg'}
            alt="Product"
            className="w-48 h-48 object-cover mb-2 rounded"
          />
          <p><strong>Date:</strong> {format(new Date(order.createdAt), 'dd MMM yyyy')}</p>
          <p>
            <strong>Status:</strong>{' '}
            <span
              className={`capitalize font-semibold ${
                order.status === 'delivered' ? 'text-green-600' :
                order.status === 'shipped' ? 'text-blue-600' :
                order.status === 'cancelled' ? 'text-red-600' :
                'text-yellow-600'
              }`}
            >
              {order.status}
            </span>
          </p>
          <p><strong>Total:</strong> ₹{order.totalPrice}</p>
          <ul className="list-disc ml-4 mt-2">
            {order.products.map((p) => (
              <li key={p.id}>{p.name} - ₹{p.price}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
