'use client';

import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

import Carousel from './components/Carousel';
import ProductCard from './components/ProductCard';
import ReviewSlider from './components/ReviewSlider';


type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  category: string;
};

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories = Array.from(new Set(products.map((p) => p.category))).filter(Boolean);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        if (!res.ok) throw new Error('Failed to fetch products');

        setProducts(data);
        setFilteredProducts(data);
      } catch (error: any) {
        setError(error.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter logic
  useEffect(() => {
    let result = [...products];

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (minPrice) {
      result = result.filter((p) => p.price >= parseFloat(minPrice));
    }

    if (maxPrice) {
      result = result.filter((p) => p.price <= parseFloat(maxPrice));
    }

    if (selectedRatings.length > 0) {
      result = result.filter((p) =>
        selectedRatings.some((rating) => Math.floor(p.rating) >= rating)
      );
    }

    setFilteredProducts(result);
  }, [products, selectedCategories, minPrice, maxPrice, selectedRatings]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating)
        ? prev.filter((r) => r !== rating)
        : [...prev, rating]
    );
  };

  return (
    <div className="p-6">
      <Carousel />
  
      <h1 className="text-2xl font-bold my-6 text-center">Featured Products</h1>

      {/* Toggle Filters Button */}
      <div className="flex justify-between items-center mb-4">
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </Button>
      </div>

      <div className="flex gap-6">
        {/* Conditional Filters Sidebar */}
        {showFilters && (
          <aside className="w-full sm:w-64 p-4 bg-white border rounded-xl shadow-md transition-all ease-in-out max-h-fit">
            <h2 className="text-lg font-semibold mb-4">Filters</h2>

            {/* Category */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Label key={category} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedCategories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <span className="capitalize text-sm">{category}</span>
                  </Label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Price</h3>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Rating */}
            <div>
              <h3 className="font-medium mb-2">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2].map((rating) => (
                  <Label key={rating} className="flex items-center gap-2">
                    <Checkbox
                      checked={selectedRatings.includes(rating)}
                      onCheckedChange={() => toggleRating(rating)}
                    />
                    <span className="text-sm">{rating}★ & above</span>
                  </Label>
                ))}
              </div>
            </div>
          </aside>
        )}

        {/* Product Grid */}
        <main className="flex-1">
          {loading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-center">No products found.</p>
          )}
        </main>
        
      </div>
  <ReviewSlider/>
    </div>
  );
}
