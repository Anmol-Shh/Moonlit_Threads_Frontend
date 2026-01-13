import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Latest = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); 
  // Directly use the S3 URL (ensure CORS is configured on S3)
  const MenvideoUrl = 'https://latestdrop.s3.ap-south-1.amazonaws.com/LatestMainVid/LatestDropMen.mp4';
  const WomenvideoUrl = 'https://latestdrop.s3.ap-south-1.amazonaws.com/LatestMainVid/LatestDropWomen.mp4';

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/dropimages`);
        setProducts(response.data.images || []); // Ensure we store an array
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchImages();
  }, []);
  
  const navigate = useNavigate();
  const MenRedirect = () => {
    navigate(`/shop/men`);
    e.preventDefault(); 
  }
  const WomenRedirect = () => {
    navigate(`/shop/women`);
    e.preventDefault(); 
  }
  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Header />
      <div onClick={MenRedirect} className="change-cursor video-container w-full max-w-full h-[50vh] md:h-[80vh] overflow-hidden relative items-center justify-center flex my-5 md:m-5" data-cursor-color="#321e12">
      <div className="absolute top-1 left-5 z-10 text-[var(--color-dark-brown)]">
      <h1 className="mensHeader text-[30px] md:text-[50px] ">Men's Drop</h1>
      <h3 className="text-[20px] font-[futura]">Explore the Latest S'25 Collection</h3>
      </div>
            <video 
                autoPlay
                loop
                muted
                controls={false}
                className="w-full h-full object-cover"
                >
                <source src={MenvideoUrl} type="video/mp4" />
            </video>
        </div>
        <div className="grid grid-cols-2 gap-2 ml-5 mr-5">
          {products.map((imageUrl, index) => (
            <img key={index} src={imageUrl} alt="Product Image" className="w-full h-auto" />
          ))}
        </div>

      <div onClick={WomenRedirect} className="change-cursor video-container w-full max-w-full h-[50vh] md:h-[80vh] overflow-hidden relative items-center justify-center flex my-5 md:m-5" data-cursor-color="#321e12">
      <div className="absolute top-1 right-5 z-10 text-[var(--color-dark-brown)]">
      <h1 className="mensHeader text-[30px] md:text-[50px] ">Women's Drop</h1>
      <h3 className="text-[20px] text-right font-[futura]">Explore the Latest S'25 Collection</h3>
      </div>
            <video 
                autoPlay
                loop
                muted
                controls={false}
                className="w-full h-full object-cover"
                >
                <source src={WomenvideoUrl} type="video/mp4" />
            </video>
        </div>
      <Footer />
    </>
  ); 
};

export default Latest;