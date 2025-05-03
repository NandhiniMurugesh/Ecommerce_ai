'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from '@shadcn/ui/card';
import { Select, SelectItem, SelectTrigger, SelectValue } from '@shadcn/ui/select';
import { Button } from '@shadcn/ui/button';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

interface User {
  email: string;
}

interface Order {
  id: number;
  user: User;
  products: Product[];
  createdAt: string;
  totalPrice: number;
  status: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('/api/admin/orders');
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId: number, newStatus: string) => {
    try {
      await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      setOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Manage Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orders.map((order) => (
            <Card key={order.id} className="shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <CardTitle>Order #{order.id}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-4 overflow-x-auto mb-4">
                  {order.products.map((product) => (
                    <img
                      key={product.id}
                      src={product.image || '/default-image.jpg'}
                      alt={product.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <p className="text-gray-700">
                    <strong>User:</strong> {order.user?.email}
                  </p>
                  <p className="text-gray-700">
                    <strong>Date:</strong> {format(new Date(order.createdAt), 'dd MMM yyyy')}
                  </p>
                  <p className="text-gray-700">
                    <strong>Total:</strong> ₹{order.totalPrice}
                  </p>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <span className="font-semibold text-gray-700">Status:</span>
                  <Select
                    value={order.status}
                    onValueChange={(newStatus) => handleStatusChange(order.id, newStatus)}
                  >
                    <SelectTrigger className="border px-2 py-1 rounded bg-gray-50">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="shipped">Shipped</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </Select>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-800 mb-2">Products:</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {order.products.map((product) => (
                      <li key={product.id}>
                        {product.name} - ₹{product.price}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
