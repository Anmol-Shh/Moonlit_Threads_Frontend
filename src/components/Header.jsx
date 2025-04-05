import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import Sidebar from './Sidebar'; // Sidebar for navigation
import CartSidebar from './CartSidebar'; // Sidebar for cart
import usericon from '../assets/userIcon.svg';
import usercart from '../assets/vuesax-linear-shop1.svg';

const Header = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For navigation sidebar
  const [isCartOpen, setIsCartOpen] = useState(false); // For cart sidebar
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthStore();
  // Toggle navigation sidebar
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  // Handle user icon click
  const handleUserClick = () => {
    if (isAuthenticated && user) {
      navigate('/dashboard');
    } else {
      navigate('/login');
    }
  };

  return (
    <>
      <nav className="bname mt-1 py-4 px-10 text-black flex justify-between items-center">
        <button
          onClick={toggleSidebar}
          className="menu-btn ml-4 active:scale-90 ease-in-out duration-100"
        >
          {isSidebarOpen ? 'Close' : 'Menu'}
        </button>
        <h2 className="Moonlit-Threads cursor-pointer" onClick={() => navigate('/')}>
          Moonlit Threads
        </h2>
        <div className="icons flex gap-10">
          <img
            className="cursor-pointer hover:scale-110 transition"
            src={usericon}
            alt="User Icon"
            onClick={handleUserClick}
          />
          <img
            className="cursor-pointer hover:scale-110 transition"
            src={usercart}
            alt="Cart Icon"
            onClick={toggleCart} // Open the Cart Sidebar
          />
        </div>
      </nav>

      {/* Navigation Sidebar */}
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} toggleCart={toggleCart} userId={user?.id} />
    </>
  );
};

export default Header;
