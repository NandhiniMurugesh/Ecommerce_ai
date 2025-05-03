'use client';
import React, { useState, useEffect } from 'react';
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

const ProductCard = ({ product }: { product: Product }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const { addToCart, removeFromWishlist, addToWishlist, wishlist } = useCart();
  const router = useRouter();

  // On mount, check if item is already wishlisted
  useEffect(() => {
    const isWished = wishlist?.some((item: Product) => item.id === product.id);
    setIsWishlisted(isWished);
  }, [wishlist, product.id]);

  const toggleWishlist = () => {
    if (isWishlisted) {
      removeFromWishlist(product.id);
      setIsWishlisted(false);
    } else {
      addToWishlist(product);
      setIsWishlisted(true);
    }
  };

  const handleAddToCart = () => {
    addToCart(product);
    setIsInCart(true);
    router.push('/cart');
  };

  const handleViewMore = () => {
    router.push(`/product/${product.id}`);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-4 w-full max-w-sm mx-auto relative group">
      {/* Wishlist Heart Icon */}
      <div
        className="absolute top-3 right-3 cursor-pointer z-10"
        onClick={toggleWishlist}
      >
        <FaHeart
          className={`text-2xl transition ${
            isWishlisted ? 'text-red-500' : 'text-gray-300 group-hover:text-red-400'
          }`}
        />
      </div>

      {/* Product Image */}
      <div className="w-full h-92 overflow-hidden rounded-xl relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />

        {/* Cart Icon (Bottom Left Corner) */}
        <div
          className="absolute bottom-3 left-3 bg-white rounded-full p-2 shadow cursor-pointer hover:bg-slate-100 transition"
          onClick={handleAddToCart}
        >
          <FaCartPlus className="text-slate-900 text-lg" />
        </div>
      </div>

      {/* Product Title */}
      <div className="mt-4">
        <h2 className="text-lg font-semibold truncate">{product.title}</h2>
        <p className="text-gray-500 text-sm line-clamp-2">{product.description}</p>
      </div>

      {/* Price and Rating */}
      <div className="flex items-center justify-between mt-2">
        <p className="text-green-600 font-bold text-lg">₹{product.price}</p>
        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-sm">{product.rating}</span>
        </div>
      </div>

      {/* View More Button */}
      <button
        className="mt-4 w-full bg-slate-900 text-white py-2 rounded-lg text-sm hover:bg-slate-800 transition"
        onClick={handleViewMore}
      >
        View More
      </button>
    </div>
  );
};

export default ProductCard;
