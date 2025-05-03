'use client';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CartPage() {
  const { cartItems, removeFromCart } = useCart();
  const router = useRouter();

  // Calculate the total price
  const totalPrice = cartItems.reduce((total, product) => total + product.price, 0);

  // Handle Place Order click
  const handlePlaceOrder = () => {
    if (cartItems.length > 0) {
      router.push('/checkout'); // Redirect to checkout page
    } else {
      alert('Your cart is empty!');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">🛒 Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((product) => (
            <div
              key={product.id}
              className="border w-50 p-4 mb-2 rounded justify-between items-center"
            >
              <div>
                <img src={product.image} alt={product.title} className="h-50" />
                <p className="font-semibold">{product.title}</p>
                <p className="text-sm text-gray-600">₹{product.price}</p>
              </div>
              <button
                onClick={() => removeFromCart(product.id)}
                className="text-sm bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}
          
          {/* Display total price */}
          <div className="mt-4">
            <p className="font-semibold">Total Price: ₹{totalPrice}</p>
          </div>
          
          {/* Place Order Button */}
          <button
            onClick={handlePlaceOrder}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
