'use client';

import AddProduct from '@/app/addproduct/page';
import { useEffect, useState } from 'react';

interface Product {
    id: number;
    title: string;  // Changed from 'name' to 'title'
    price: number;
    description: string;
    rating: number;
    image: string;
    // No 'category' field in your model
}

const AdminProductsPage = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const res = await fetch('/api/products');
            
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Failed to fetch products');
            }

            const data: Product[] = await res.json();
            
            if (data && data.length > 0) {
                setProducts(data);
            } else {
                setError('No products found');
            }
        } catch (error) {
            setError(error.message || 'Error fetching products');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin - Manage Products</h1>
            <AddProduct/>
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            )}
            
            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}
            
            {!loading && !error && (
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-4 border-b border-gray-200">{product.id}</td>
                                    <td className="px-6 py-4 border-b border-gray-200"><img src={product.image} alt="" className='h-50 w-50' /></td>
                                    <td className="px-6 py-4 border-b border-gray-200">{product.title}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">₹{product.price.toFixed(2)}</td>
                                    <td className="px-6 py-4 border-b border-gray-200">{product.rating}</td>
                                    <td className="px-6 py-4 border-b border-gray-200 text-sm text-gray-500 truncate max-w-xs">
                                        {product.description}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;