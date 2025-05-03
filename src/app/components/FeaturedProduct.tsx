'use client';
import React, { useState } from 'react';
import { FaStar, FaCartPlus, FaHeart } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
};

const FeaturedProducts = () => {
  const [isInCart, setIsInCart] = useState<{ [key: number]: boolean }>({});
  const [isWishlisted, setIsWishlisted] = useState<{ [key: number]: boolean }>({});

  const { addToCart, addToWishlist } = useCart();
  const router = useRouter();

  // Hardcoded products
  const products: Product[] = [
    {
      id: 1,
      title: 'Intex Television',
      description: 'Intex LED 32inch',
      image: 'https://www.intex.in/cdn/shop/products/1_9b8014ad-124e-4742-a628-9a4c4affe617.jpg?v=1648711109',
      price: 14000,
      rating: 3.7,
    },
    {
      id: 2,
      title: 'Bracelet',
      description: 'Gold plated bracelet for Women',
      image: 'https://starkle.in/cdn/shop/files/dinf.png?v=1684509479',
      price: 699,
      rating: 4.5,
    },
    {
      id: 3,
      title: 'Apple iPhone 16 pro max',
      description: '512GB Storage - Black titenium',
      image: 'https://media.dinomarket.com/docs/imgTD/2025-03/DM_D6B12717-BEB9-A2EF-9C40FFA8351B4328_ll.jpg',
      price: 100,
      rating: 4.8,
    },
    {
      id: 4,
      title: 'Samsung Galaxy Tab',
      description: '10.1 inch Display, 64GB Storage',
      image: 'https://via.placeholder.com/150',
      price: 25000,
      rating: 4.2,
    },
    {
      id: 5,
      title: 'Smart LED Bulb',
      description: 'RGB Smart Light Bulb with App Control',
      image: 'https://via.placeholder.com/150',
      price: 1499,
      rating: 4.0,
    },
    {
      id: 6,
      title: 'Dell Laptop',
      description: 'Core i5, 8GB RAM, 512GB SSD',
      image: 'https://via.placeholder.com/150',
      price: 54999,
      rating: 4.6,
    },
  ];

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setIsInCart({ ...isInCart, [product.id]: true });
    router.push('/cart');
  };

  const handleAddToWishlist = (product: Product) => {
    addToWishlist(product);
    setIsWishlisted({ ...isWishlisted, [product.id]: true });
    router.push('/wishlist');
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm mx-auto flex flex-col justify-between">
          {/* Image */}
          <div className="w-full h-92 overflow-hidden rounded-xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>

          {/* Title and Description */}
          <div className="mt-4">
            <h2 className="text-lg font-semibold">{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.description}</p>
          </div>

          {/* Price and Rating */}
          <div className="flex items-center justify-between mt-2">
            <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
            <div className="flex items-center gap-1 text-yellow-500">
              <FaStar />
              <span className="text-sm">{product.rating}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <button
              className="flex-1 bg-slate-900 text-white py-2 rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-slate-800 transition"
              onClick={() => handleAddToCart(product)}
            >
              <FaCartPlus />
              {isInCart[product.id] ? 'Added to Cart' : 'Add to Cart'}
            </button>
            <button
              className={`flex-1 border py-2 rounded-lg flex items-center justify-center gap-2 text-sm transition ${
                isWishlisted[product.id]
                  ? 'border-pink-500 text-pink-500 bg-pink-50'
                  : 'border-gray-400 hover:bg-gray-100'
              }`}
              onClick={() => handleAddToWishlist(product)}
            >
              <FaHeart />
              {isWishlisted[product.id] ? 'Wishlisted' : 'Wishlist'}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedProducts;
