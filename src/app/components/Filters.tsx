'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectItem, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

type FilterProps = {
  onFilterChange: (filters: any) => void;
  categories: string[];
  brands: string[];
};

const Filters = ({ onFilterChange, categories, brands }: FilterProps) => {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [category, setCategory] = useState('');
  const [brand, setBrand] = useState('');
  const [inStock, setInStock] = useState(false);

  useEffect(() => {
    onFilterChange({ minPrice, maxPrice, category, brand, inStock });
  }, [minPrice, maxPrice, category, brand, inStock]);

  return (
    <div className="bg-white p-4 shadow-md rounded-xl flex flex-wrap gap-4 justify-between mb-6">
      {/* Category */}
      <Select onValueChange={setCategory}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((cat) => (
            <SelectItem key={cat} value={cat}>
              {cat}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Brand */}
      <Select onValueChange={setBrand}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Brand" />
        </SelectTrigger>
        <SelectContent>
          {brands.map((br) => (
            <SelectItem key={br} value={br}>
              {br}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Price Range */}
      <Input
        placeholder="Min ₹"
        type="number"
        className="w-[100px]"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <Input
        placeholder="Max ₹"
        type="number"
        className="w-[100px]"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />

      {/* In Stock */}
      <label className="flex items-center gap-2">
        <Checkbox checked={inStock} onCheckedChange={() => setInStock(!inStock)} />
        In Stock
      </label>
    </div>
  );
};

export default Filters;
