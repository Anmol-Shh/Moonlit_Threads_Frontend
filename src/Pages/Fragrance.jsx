// import React from 'react'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

// const Fragrance = () => {
//   return (
//     <>
//     <Header/>
//     <div>
//       <img src='https://fragrance1.s3.ap-south-1.amazonaws.com/FragranceMain'
//       alt='Fragrance'
//      className='p-3'>
//       </img>
//     </div>
//     <Footer/>
//     </>
//   )
// }

// export default Fragrance;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomLoadingScreen from "../components/LoadingScreen";
import axios from "axios";
import "../index.css";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/products");
        const menProducts = response.data.filter(
          (product) => product.category.toLowerCase() === "fragrance"
        );
        setProducts(menProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleArticleClick = (productId) => {
    if (!productId || productId.length !== 24) {
      console.error("Invalid Product ID:", productId);
      return;
    }
    navigate(`/products/${productId}`);
  };

  if (loading) return <CustomLoadingScreen />;

  return (
    <>
    <Header />
    <div className="video-container relative m-5">
    {/* Text Overlay */}
    <div className="absolute left-5 z-10 text-[var(--color-dark-brown)]">
    <h3 className="mensHeader text-[80px] text-center">Fragrances</h3>
    </div>
    <img src="https://fragrance1.s3.ap-south-1.amazonaws.com/FragranceMain"></img>
  </div>
      <div className="px-6 py-4">
      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="cursor-pointer bg-[#ffff] rounded-md"
            onClick={() => handleArticleClick(product._id)}
          >
            {/* Swiper for Each Product */}
            <div className="relative overflow-hidden swiper-container">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                  nextEl: `.next-button-${product._id}`,
                  prevEl: `.prev-button-${product._id}`,
                }}
                pagination={{
                  el: `.pagination-${product._id}`,
                  type: "progressbar",
                }}
                loop={true}
                slidesPerView={1}
                spaceBetween={0} // Ensure no spacing between slides
                style={{ overflow: 'hidden' }} // Prevents overflow from displaying outside the container
                className="w-full group"
                onSlideChange={(swiper) => {
                  const progressElement = document.querySelector(`.progress-bar-${product._id}`);
                  if (progressElement) {
                    const progress = ((swiper.realIndex + 1) / swiper.slides.length) * 100;
                    progressElement.style.width = `${progress}%`;
                  }
                }}
              >
                {product.images && product.images.length > 0 ? (
                  product.images.map((img, i) => (
                    <SwiperSlide key={i} className="overflow-hidden"> {/* Added overflow-hidden here */}
                  <div className="relative overflow-hidden"> {/* Wrapper to contain scaling effect */}
                    <img
                      src={img}
                      alt={`${product.title} - Image ${i + 1}`}
                      className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => (e.target.src = "/fallback.jpg")}
                    />
                  </div>
                </SwiperSlide>
                  ))
                ) : (
                  <SwiperSlide>
                    <img
                      src="/fallback.jpg"
                      alt="No Image Available"
                      className="w-full h-80 object-cover rounded-lg transition-transform duration-300 group-hover:scale-105"
                    />
                  </SwiperSlide>
                )}

                {/* Custom Navigation Buttons */}
                <div
                  className={`next-button-${product._id} absolute top-1/2 right-2 z-10 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 cursor-pointer hover:bg-opacity-100 transition-all`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div
                  className={`prev-button-${product._id} absolute top-1/2 left-2 z-10 transform -translate-y-1/2 bg-white bg-opacity-75 rounded-full p-2 cursor-pointer hover:bg-opacity-100 transition-all`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-gray-800"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </div>
              </Swiper>

              {/* Progress Bar at the Bottom of the Tile */}
              <div
                className={`pagination-${product._id} relative bottom-0 left-0 right-0 h-1 bg-white z-10`}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className={`progress-bar-${product._id} absolute top-0 left-0 h-full bg-[#5A7061] transition-all duration-300`}
                  style={{ width: '0%' }} // Start with 0% progress
                ></div>
              </div>
            </div>

            {/* Product Details */}
            <div className="m-1 text-center">
              <h4 className="prodName text-lg">{product.title}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>


      <Footer />
    </>
  );
};

export default Shop;