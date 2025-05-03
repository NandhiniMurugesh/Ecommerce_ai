"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [image2, setImage2] = useState("");
  const [image3, setImage3] = useState("");
  const [image4, setImage4] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [warranty, setWarranty] = useState("");
  const [offers, setOffers] = useState("");

  const addProduct = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image || !price || !rating) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          image,
          image2,
          image3,
          image4,
          price: parseFloat(price),
          rating: parseFloat(rating),
          stock: parseInt(stock),
          brand,
          category,
          warranty,
          offers,
        }),
      });

      if (res.ok) {
        alert("✅ Product added successfully!");
        setTitle("");
        setDescription("");
        setImage("");
        setImage2("");
        setImage3("");
        setImage4("");
        setPrice("");
        setRating("");
        setStock("");
        setBrand("");
        setCategory("");
        setWarranty("");
        setOffers("");
      } else {
        const error = await res.json();
        alert(`❌ Failed to add product: ${error.message}`);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("❌ Something went wrong.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Add a New Product</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={addProduct} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Product Title</label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter product title" />
            </div>

            <div>
              <label className="block text-sm font-medium">Description</label>
              <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter product description" />
            </div>

            <div>
              <label className="block text-sm font-medium">Image URL</label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Paste image URL" />
            </div>

            <div>
              <label className="block text-sm font-medium">Image 2 URL</label>
              <Input value={image2} onChange={(e) => setImage2(e.target.value)} placeholder="Paste image 2 URL" />
            </div>

            <div>
              <label className="block text-sm font-medium">Image 3 URL</label>
              <Input value={image3} onChange={(e) => setImage3(e.target.value)} placeholder="Paste image 3 URL" />
            </div>

            <div>
              <label className="block text-sm font-medium">Image 4 URL</label>
              <Input value={image4} onChange={(e) => setImage4(e.target.value)} placeholder="Paste image 4 URL" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Rating</label>
                <Input type="number" step="0.1" value={rating} onChange={(e) => setRating(e.target.value)} placeholder="e.g. 4.5" />
              </div>
              <div>
                <label className="block text-sm font-medium">Price (₹)</label>
                <Input type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="e.g. 999" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Stock</label>
                <Input type="number" value={stock} onChange={(e) => setStock(e.target.value)} placeholder="e.g. 100" />
              </div>
              <div>
                <label className="block text-sm font-medium">Brand</label>
                <Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Enter product brand" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium">Category</label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Enter product category" />
              </div>
              <div>
                <label className="block text-sm font-medium">Warranty</label>
                <Input value={warranty} onChange={(e) => setWarranty(e.target.value)} placeholder="Enter product warranty" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium">Offers</label>
              <Input value={offers} onChange={(e) => setOffers(e.target.value)} placeholder="Enter offers" />
            </div>

            <Button type="submit" className="w-full mt-4">Add Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
