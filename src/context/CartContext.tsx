'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
};

type CartContextType = {
  cartItems: Product[];
  wishlistItems: Product[];
  addToCart: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [wishlistItems, setWishlistItems] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    setCartItems((prev) =>
      prev.find((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const addToWishlist = (product: Product) => {
    setWishlistItems((prev) =>
      prev.find((item) => item.id === product.id) ? prev : [...prev, product]
    );
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== productId));
  };

  const removeFromWishlist = (productId: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlistItems,
        addToCart,
        addToWishlist,
        removeFromCart,
        removeFromWishlist,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
