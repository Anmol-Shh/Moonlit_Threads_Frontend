import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import Lenis from '@studio-freight/lenis';
// import UserContext from './context/UserContext.jsx'; // Uncomment when using

const AppWrapper = () => {
  useEffect(() => {
    // Initialize Lenis Smooth Scrolling
    const lenis = new Lenis({
      duration: 1.2, // Adjust duration to control smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
      direction: 'vertical', // Scroll direction
      smooth: true, // Enable smooth scrolling
      smoothTouch: false, // Disable smooth touch for better control
    });

    // Animation frame to keep Lenis running
    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    // Cleanup Lenis instance on unmount
    return () => {
      lenis.destroy();
    };
  }, []);

  // Polyfill for `globalThis` and `global` if not defined
  if (typeof globalThis === 'undefined') {
    window.globalThis = window;
  }

  if (typeof global === 'undefined') {
    window.global = window;
  }

  return <App />;
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Context can be uncommented when needed */}
    {/* <UserContext> */}
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
    {/* </UserContext> */}
  </StrictMode>
);
