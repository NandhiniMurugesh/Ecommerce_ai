'use client';

import { useEffect, useState } from "react";
import { User } from "lucide-react";

interface UserType {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

export default function ManageUsers() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('/api/admin/users');
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error("Error loading users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-96">Loading users...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto px-5">
        {/* Title */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2">
          <User /> Manage Users
        </h1>

        {/* Users Table */}
        <div className="overflow-x-auto bg-white rounded-lg  shadow">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4">ID</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Email</th>
                
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t hover:bg-gray-50">
              <td className="p-4">{user.id.toString().slice(0, 8)}</td>

                  <td className="p-4">{user.name || "-"}</td>
                  <td className="p-4">{user.email}</td>
                
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
