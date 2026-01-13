import { useState } from "react";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const CartSidebar = ({ isOpen, onClose, cartItems }) => {
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 100 }}
      className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-lg p-5 z-50"
    >
      {/* Cart Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="cartHeader text-xl font-semibold">Shopping Bag ({cartItems.length})</h2>
        <button onClick={onClose} className="text-xl">
          <FaTimes />
        </button>
      </div>

      {/* Cart Items */}
      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="overflow-y-auto h-[70vh] space-y-4">
          {cartItems.map((item, index) => (
            <div key={index} className="flex items-center space-x-4 border-b pb-3">
              <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <p className="font-semibold">{item.name}</p>
                <p className="text-gray-600 text-sm">Size: {item.size}</p>
                <p className="text-gray-900 font-semibold">${item.price}</p>
              </div>
              <button className="text-red-500 text-sm">Remove</button>
            </div>
          ))}
        </div>
      )}

      {/* Checkout Button */}
      <div className="absolute bottom-0 left-0 w-full p-5 bg-white shadow-md">
        <button className="w-full bg-black text-white py-3 rounded-lg text-lg font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </motion.div>
  );
};

export default function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItems = [
    {
      name: "Double-breasted Wool Coat",
      size: "38",
      price: 4695,
      image: "https://example.com/image.jpg",
    },
  ];

  return (
    <>
      {/* Your Existing Cart SVG */}
      <button onClick={() => setIsCartOpen(true)} className="fixed top-5 right-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="black"
          className="w-8 h-8"
        >
          <path d="M6 6h15l-1.5 9h-12z" />
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="17" cy="20" r="1.5" />
        </svg>
      </button>

      {/* Cart Sidebar Component */}
      {isCartOpen && (
        <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} />
      )}
    </>
  );
}
