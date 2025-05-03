'use client';

import Link from 'next/link';
import { Package, ClipboardList, Users, DollarSign, PlusCircle } from 'lucide-react';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">
        
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Admin Dashboard</h1>

        {/* Analytics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="p-5 bg-white rounded-lg shadow flex flex-col items-center justify-center">
            <DollarSign size={30} className="text-green-500 mb-2" />
            <p className="text-xl font-semibold">₹50,000</p>
            <p className="text-gray-500 text-sm">Total Revenue</p>
          </div>

          <div className="p-5 bg-white rounded-lg shadow flex flex-col items-center justify-center">
            <ClipboardList size={30} className="text-blue-500 mb-2" />
            <p className="text-xl font-semibold">120</p>
            <p className="text-gray-500 text-sm">Orders</p>
          </div>

          <div className="p-5 bg-white rounded-lg shadow flex flex-col items-center justify-center">
            <Package size={30} className="text-purple-500 mb-2" />
            <p className="text-xl font-semibold">80</p>
            <p className="text-gray-500 text-sm">Products</p>
          </div>

          <div className="p-5 bg-white rounded-lg shadow flex flex-col items-center justify-center">
            <Users size={30} className="text-pink-500 mb-2" />
            <p className="text-xl font-semibold">40</p>
            <p className="text-gray-500 text-sm">Users</p>
          </div>
        </div>

        {/* Quick Action Buttons */}
       

        {/* Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Manage Products Card */}
          <Link href="/admin/products" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
            <Package size={40} className="text-blue-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Manage Products</h2>
            <p className="text-gray-500 text-sm mt-2">Add, edit, or remove products.</p>
          </Link>

          {/* View Orders Card */}
          <Link href="/admin/orders" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
            <ClipboardList size={40} className="text-green-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">View Orders</h2>
            <p className="text-gray-500 text-sm mt-2">Track and manage customer orders.</p>
          </Link>

          {/*  Manage Users Card */}
          <Link href="/admin/users" className="p-6 bg-white rounded-lg shadow hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center text-center">
            <Users size={40} className="text-purple-600 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700">Manage Users</h2>
            <p className="text-gray-500 text-sm mt-2">View and manage registered users.</p>
          </Link>

        </div>
      </div>
    </div>
  );
}
