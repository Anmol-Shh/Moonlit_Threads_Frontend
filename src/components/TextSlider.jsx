import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import '../textslider.css'
import collection1 from '../assets/collectionsBurberry.webp';
import collection2 from '../assets/collectionsVersace.avif';
import collection3 from '../assets/collectionsBurberryMen.webp';

const TextSlider = () => {
    const images = [
        { src: {collection1}, text: 'Welcome to Our Collection' },
        { src: {collection2}, text: 'Discover the Latest Trends' },
        { src: {collection3}, text: 'Shop the New Arrivals' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 1 });

        tl.to(textRef.current, { opacity: 1, duration: 0.5 })
          .to(imageRef.current, { opacity: 1, duration: 0.5 })
          .to(textRef.current, { opacity: 0, duration: 0.5 })
          .to(imageRef.current, { opacity: 0, duration: 0.5, onComplete: () => {
              setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
          }});
    }, [currentIndex, images.length]);

    return (
        <div className="slider-container">
            <div className="text-slider" ref={textRef}>
                <h2>{images[currentIndex].text}</h2>
            </div>
            <div className="image-slider" ref={imageRef}>
                <img src={images[currentIndex].src} alt={`Slide ${currentIndex}`} />
            </div>
        </div>
    );
};

export default TextSlider;