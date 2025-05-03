'use client';
import { useCart } from '@/context/CartContext';

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist } = useCart();

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">💖 Your Wishlist</h2>

      {!wishlistItems || wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        wishlistItems.map((product) => (
          <div
            key={product.id}
            className="border p-4 mb-2 rounded w-50 justify-between items-center"
          >
            <div>
            <img src={product.image} alt="" className='h-50'/>
              <p className="font-semibold">{product.title}</p>
              <p className="text-sm text-gray-600">₹{product.price}</p>
            </div>
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  );
}
