import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles (optional)
import 'swiper/css';
import 'swiper/css/navigation'; // Import navigation styles (optional)
import 'swiper/css/pagination'; // Import pagination styles (optional)

const MySwiper = () => {
  const swiperRef = useRef(null);

  const settings = {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    }
  };

  return (
    <div className="swiper-container">
      <Swiper {...settings} ref={swiperRef}>
        <SwiperSlide>
          <img src="image1.jpg" alt="Image 1" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="image2.jpg" alt="Image 2" />
        </SwiperSlide>
        {/* Add more slides as needed */}
      </Swiper>
      <div className="swiper-pagination"></div>
      <div className="swiper-button-next"></div>
      <div className="swiper-button-prev"></div>
    </div>
  );
};