import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { X, Plus, Minus } from 'lucide-react'; 
import '../CartSidebar.css'; 


const CartSidebar = ({ isOpen, toggleCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const { user } = useAuthStore();

  useEffect(() => {
    if (isOpen && user?._id) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/cart/${user._id}`)
        .then((res) => setCartItems(Array.isArray(res.data.items) ? res.data.items : []))
        .catch((err) => console.error("Error fetching cart:", err));
    }
  }, [isOpen, user]);

  const updateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1
    
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/${user._id}/${productId}`, {
        quantity: newQuantity
      });

      setCartItems(prevItems => 
        prevItems.map(item => 
          item.productId === productId 
            ? { ...item, quantity: newQuantity } 
            : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

    // Handle increment
    const handleIncrement = (productId, currentQuantity) => {
      updateQuantity(productId, currentQuantity + 1);
    };
  
    // Handle decrement
    const handleDecrement = (productId, currentQuantity) => {
      if (currentQuantity > 1) {
        updateQuantity(productId, currentQuantity - 1);
      }
    };
  
  useEffect(() => {
    const cartItemsDiv = document.querySelector(".cart-items");
  
    const disableBodyScroll = () => {
      document.body.style.overflow = "hidden"; // Prevents background scrolling
    };
  
    const enableBodyScroll = () => {
      document.body.style.overflow = ""; // Restores background scrolling
    };
  
    const handleWheel = (e) => {
      if (cartItemsDiv) {
        const isAtTop = cartItemsDiv.scrollTop === 0;
        const isAtBottom = cartItemsDiv.scrollHeight - cartItemsDiv.scrollTop === cartItemsDiv.clientHeight;
  
        if (!(isAtTop && e.deltaY < 0) && !(isAtBottom && e.deltaY > 0)) {
          e.stopPropagation(); // Stops the event from propagating to the parent elements
        }
      }
    };
  
    if (isOpen) {
      disableBodyScroll();
      cartItemsDiv?.addEventListener("wheel", handleWheel, { passive: false });
    } else {
      enableBodyScroll();
    }
  
    return () => {
      enableBodyScroll();
      cartItemsDiv?.removeEventListener("wheel", handleWheel);
    };
  }, [isOpen]);
  
  
  
  const handleRemove = async (productId) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/cart/${user._id}/${productId}`);
  
      setCartItems((prevItems) => prevItems.filter(item => item.productId !== productId));
    } catch (err) {
      console.error("Error removing item:", err.response?.data || err);
    }
  };
  
  

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleCheckout = async () => {
      try {
        const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payment/order`, {
          amount: subtotal, 
        });
        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.order.amount,
          currency: "INR",
          name: "Moonlit Threads",
          description: "Order Payment",
          order_id: data.order.id,
          handler: async function (response) { 
            console.log("🔹 Payment Successful: ", response); 
            
            try {
              console.log("🟡 Attempting to clear cart...");
              const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/cart/clear/${user._id}`);
              console.log("✅ Cart Cleared Successfully: ", res.data);  
              
                setCartItems([]);
                toggleCart();
            } catch (error) {
                console.error("❌ Error Clearing Cart: ", error);
            }
        },
        prefill: {
              name: "Anmol",
              email: "anmol@example.com",
              contact: "9999999999",
          },
          theme: {
              color: "#ffff",
          },
      };
      
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error in checkout: ", error);
      }
    };
    
  

  return (
    <>
      {isOpen && <div className=" fixed inset-0 bg-black bg-opacity-40 z-40" onClick={toggleCart}></div>}
      
      <div  
        className={`change-cursor fixed right-0 top-0 h-full w-full sm:w-96 bg-[#e1d9d2] z-50 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onClick={(e) => e.stopPropagation()}
        data-cursor-color="black"
      >
        <button className="absolute top-4 right-4" onClick={toggleCart}>
          <X size={24} />
        </button>

        <h2 className="cartHeader text-xl font-bold m-4">Shopping Bag ({cartItems.length})</h2>

        <div 
            className="cart-items m-4 space-y-4 overflow-y-auto h-[70vh] pointer-events-auto"
          >
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <div key={index} className="flex items-center border-b mb-4">
                  <img
                    src={item.image || "/fallback.jpg"}
                    alt={item.title || "Product"}
                    className="w-20 h-20 rounded-md mr-4"
                  />
                  <div className="flex-1">
                    <h3 className="cartDetails font-medium">{item.title || "No Name"}</h3>
                    <p className="cartDetails">Size: {item.size || "N/A"}</p>
                  {/* Quantity Adjuster */}
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => handleDecrement(item.productId, item.quantity)}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={16} />
                    </button>
                    
                    <span className="mx-3 w-8 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => handleIncrement(item.productId, item.quantity)}
                      className="p-1 rounded-full hover:bg-gray-200 transition-colors"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                    <p className="cartDetails text-sm text-gray-600 pt-1">
                      ₹{item.price.toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => handleRemove(item.productId)}
                      className="cartDetails text-red-500 text-sm mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 mt-8">Your cart is empty.</p>
            )}
          </div>


        {cartItems.length > 0 && (
          <div className="m-4">
            <p className="subtotal font-bold">Subtotal: ₹{subtotal.toLocaleString('en-IN')}</p>
            <button className="checkout-btn " onClick={handleCheckout}>Proceed to Checkout</button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartSidebar;
