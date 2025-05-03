'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { FaCartPlus } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type Product = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  brand?: string;
  category?: string;
  offers?: string;
  stock: number;
  warranty?: string;
  image2?: string;
  image3?: string;
  image4?: string;
};

const SingleProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const [mainImage, setMainImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setMainImage(data.image);
      } catch (error) {
        console.error('Failed to load product', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <div className="container mx-auto p-6">
        <Skeleton className="h-96 w-full mb-6" />
        <Skeleton className="h-8 w-1/2 mb-4" />
        <Skeleton className="h-6 w-1/3 mb-2" />
        <Skeleton className="h-16 w-full" />
      </div>
    );
  }

  const handleBuyNow = () => {
    addToCart(product);
    router.push('/checkout');
  };

  const handleImageClick = (src: string) => {
    setMainImage(src);
  };

  return (
    <div className="container mx-auto p-6">
      <Card className="flex flex-col md:flex-row gap-8 p-6">
        {/* Left - Images */}
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={mainImage ?? product.image}
            alt={product.title}
            className="max-h-[400px] object-contain border rounded-lg"
          />

          <div className="flex gap-3 mt-4">
            {[product.image, product.image2, product.image3, product.image4]
              .filter(Boolean)
              .map((imgSrc, index) => (
                <img
                  key={index}
                  src={imgSrc!}
                  alt={`Thumb ${index}`}
                  onClick={() => handleImageClick(imgSrc!)}
                  className="h-16 w-16 object-cover border rounded-md cursor-pointer hover:ring-2 ring-blue-500 transition"
                />
              ))}
          </div>
        </div>

        {/* Right - Info */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">{product.title}</h1>

          {product.brand && (
            <p className="text-muted-foreground">Brand: <strong>{product.brand}</strong></p>
          )}

          {product.category && (
            <p className="text-muted-foreground">Category: <strong>{product.category}</strong></p>
          )}

          <p className="text-green-600 text-2xl font-bold">₹{product.price}</p>

          <p className="text-yellow-500 text-lg">⭐ {product.rating} / 5</p>

          <div>
            {product.stock > 0 ? (
              <Badge variant="default" className="bg-green-500 hover:bg-green-600">
                In Stock ({product.stock})
              </Badge>
            ) : (
              <Badge variant="destructive">Out of Stock</Badge>
            )}
          </div>

          {product.offers && (
            <p className="text-blue-600 font-semibold">🎁 Offer: {product.offers}</p>
          )}

          {product.warranty && (
            <p className="text-gray-700">🛡️ Warranty: {product.warranty}</p>
          )}

          <p className="text-gray-600">{product.description}</p>

          {/* Alert if out of stock */}
          {product.stock === 0 && (
            <Alert variant="destructive">
              <AlertTitle>Out of Stock</AlertTitle>
              <AlertDescription>
                This product is currently unavailable.
              </AlertDescription>
            </Alert>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-4">
            <Button
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
              variant="default"
            >
              <FaCartPlus className="mr-2" />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </Button>

            {product.stock > 0 && (
              <Button onClick={handleBuyNow} variant="secondary">
                Buy Now
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SingleProductPage;
