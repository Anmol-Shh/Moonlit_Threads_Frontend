import React, { useState, useEffect, useRef } from "react";

const CustomCursor = () => {
  const [cursorColor, setCursorColor] = useState("#ffffff"); // Default cursor color
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const ringRef = useRef({ x: 0, y: 0 });
  const requestRef = useRef();

  // ✅ Load saved cursor color from localStorage on mount
  useEffect(() => {
    const savedColor = localStorage.getItem("cursorColor");
    if (savedColor) {
      setCursorColor(savedColor);
    }
  }, []);

  useEffect(() => {
    const handleMouseMove = (event) => {
      setDotPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const animateRing = () => {
      const easingFactor = 0.2; // Controls smoothness
      ringRef.current.x += (dotPosition.x - ringRef.current.x) * easingFactor;
      ringRef.current.y += (dotPosition.y - ringRef.current.y) * easingFactor;
      setRingPosition({ x: ringRef.current.x, y: ringRef.current.y });
      requestRef.current = requestAnimationFrame(animateRing);
    };

    requestRef.current = requestAnimationFrame(animateRing);
    return () => cancelAnimationFrame(requestRef.current);
  }, [dotPosition]);

  useEffect(() => {
    const handleMouseEnter = (event) => {
      const newColor = event.target.getAttribute("data-cursor-color");
      if (newColor) {
        setCursorColor(newColor);
        localStorage.setItem("cursorColor", newColor); // ✅ Save color in localStorage
      }
    };

    const handleMouseLeave = () => {
      setCursorColor("#ffffff");
      localStorage.setItem("cursorColor", "#ffffff"); // ✅ Reset in localStorage
    };

    const hoverTargets = document.querySelectorAll(".change-cursor");

    hoverTargets.forEach((target) => {
      target.addEventListener("mouseenter", handleMouseEnter);
      target.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      hoverTargets.forEach((target) => {
        target.removeEventListener("mouseenter", handleMouseEnter);
        target.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <>
      <div
        className="cursor-dot"
        style={{
          left: `${dotPosition.x}px`,
          top: `${dotPosition.y}px`,
          backgroundColor: cursorColor,
        }}
      />
      <div
        className="cursor-ring"
        style={{
          left: `${ringPosition.x}px`,
          top: `${ringPosition.y}px`,
          borderColor: cursorColor,
        }}
      />
    </>
  );
};

export default CustomCursor;
