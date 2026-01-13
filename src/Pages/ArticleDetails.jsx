import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/authStore"; 
import CustomLoadingScreen from "../components/LoadingScreen";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../ArticleDetails.css";

const formatPrice = (price) => {
  if (typeof price !== 'number') return price;

  const priceStr = price.toString();

  const [wholePart, decimalPart] = priceStr.split(".");

  const lastThreeDigits = wholePart.slice(-3);
  const otherDigits = wholePart.slice(0, -3);

  const formattedWholePart = otherDigits
    ? otherDigits.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThreeDigits
    : lastThreeDigits;

  // Return the formatted price with decimal part if it exists
  return decimalPart ? `${formattedWholePart}.${decimalPart}` : formattedWholePart;
};

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthStore(); 
  const [article, setArticle] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!id) {
      setError("Invalid Product ID");
      return;
    }
  
    const fetchArticleDetails = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/${id}`);
        setArticle(response.data);
        setMainImage(response.data.images[0]);
      } catch (error) {
        console.error("Error fetching article details:", error);
        setError("Failed to load article details");
      }
    };
  
    fetchArticleDetails();
  }, [id]);
  
  if (error) return <div className="error-message">{error}</div>;
  if (!article) return <CustomLoadingScreen />;

  const handleSizeSelect = (event) => {
    setSelectedSize(event.target.value);
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const handleBuyNow = async () => {
    if (!selectedSize) {  
      alert("Please select a size before proceeding to checkout.");
      return;
    }
  
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/payment/order`, {
        amount: article.price,  
      });
  
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: data.order.amount,
        currency: "INR",
        name: "Moonlit Threads",
        description: `${article.title} - Size: ${selectedSize}`, 
        order_id: data.order.id,
        handler: async function (response) { 
          console.log("🟢 Payment Successful: ", response);
          alert("Payment successful!");  
          window.location.href = "/order-success"; 
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
      console.error("❌ Error in checkout: ", error);
    }
  };
  
  
  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value)); 
  };

  const handleAddToCart = async () => {
    if (!user) {
      alert("Please log in to add items to the cart.");
      return;
    }
  
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }
  
    if (!article) {
      alert("Product details are missing. Please try again.");
      return;
    }
  
    try {
      const payload = {
        userId: user._id,
        productId: article._id,
        title: article.title,
        quantity: Number(quantity),
        size: selectedSize,
        price: article.price, 
        image: article.images[0] 
      };
  
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/cart`, payload);
  
      if (response.status !== 200) {
        throw new Error("Failed to add item to cart");
      }
  
      alert("Item added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      if (error.response) {
        console.error("Server Response:", error.response.data);
        alert(`Error adding to cart: ${error.response.data.message}`);
      } else {
        alert("Error adding to cart");
      }
    }
  };
  

  return (
    <>
      <Header />
      <div className="article-details-container">
        <div className="image-section">
          <div className="main-image-container">
            <img src={mainImage} alt="Main Article" className="main-image" />
          </div>
          <div className="thumbnail-section">
            {article.images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                className={`thumbnail ${mainImage === img ? "active-thumbnail" : ""}`}
                onClick={() => handleThumbnailClick(img)}
              />
            ))}
          </div>
        </div>

        <div className="details-section">
          <h1 className="article-title">{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <p className="article-price">₹{formatPrice(article.price)}</p>

          <div className="size-selection">
            <p className="size-label">Select Size:</p>
            <select className="size-dropdown" value={selectedSize} onChange={handleSizeSelect}>
              <option value="" disabled>Select Size</option>
              {article.sizes.map((size, index) => (
                <option key={index} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div className="quantity-selection">
            <p className="quantity-label">Quantity:</p>
            <input
              type="number"
              className="quantity-input"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>

          <div className="actions">
            <button className="btn add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn buy-now" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ArticleDetails;
