import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import '../sidebar.css';

  const Sidebar = ({ isOpen, toggleSidebar}) => {
    const [isCategoriesHovered, setIsCategoriesHovered] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
      function handleClickOutside(event) {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
          toggleSidebar();
        }
      }
  
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      } else {
        document.removeEventListener('mousedown', handleClickOutside);
      }
  
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen, toggleSidebar]);

  return (
    <div ref={sidebarRef} className={`sidebar ${isOpen ? 'open' : ''}`}>
      <button className='close-btn' onClick={toggleSidebar}>x</button>
      <ul className='sidebar-list'>
        <li><Link to="/" onClick={toggleSidebar}>Home</Link></li>

        {/* Categories with hover-based sub-menu */}
        <li
          onMouseEnter={() => setIsCategoriesHovered(true)} 
          onMouseLeave={() => setIsCategoriesHovered(false)}
        >
        </li>
        <li><Link to="/shop/men" onClick={toggleSidebar}>Men</Link></li>
        <li><Link to="/shop/women" onClick={toggleSidebar}>Women</Link></li>
        <li><Link to="/fragrance" onClick={toggleSidebar}>Fragrance</Link></li>
        <li><Link to="/ContactUs" onClick={toggleSidebar}>Contact</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
