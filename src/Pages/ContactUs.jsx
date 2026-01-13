import React, { useState } from "react"; 
import "../ContactUs.css"; 
import Header from "../components/Header";
import Footer from "../components/Footer";
import CustomLoadingScreen from "../components/LoadingScreen"; // Assuming you have this component
import Swal from 'sweetalert2';

const BookADemo = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    phone: "",
    region: "",
    eventType: "",
    capacity: "",
    referralSource: "",
  });

  const [loading, setLoading] = useState(false); // New state for tracking form submission

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => { 
    e.preventDefault(); 
    setLoading(true); 
    
    try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/form/submit`, { 
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Thank you! Your demo request has been submitted.',
                confirmButtonColor: '#4CAF50',
                timer: 4000
            });

            setFormData({ 
                firstName: "", 
                lastName: "", 
                companyName: "", 
                email: "", 
                phone: "", 
                region: "", 
                eventType: "", 
                capacity: "", 
                referralSource: "", 
            });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: result.message || 'Something went wrong. Please try again.',
                    confirmButtonColor: '#d33'
                });
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while submitting the form. Please try again later.',
                confirmButtonColor: '#d33'
            });
        } finally {
            setLoading(false);
        }
    };

  if (loading) return <CustomLoadingScreen />; // Display the loading screen while submitting

  return (
    <>
      <Header />
      <div className="book-a-demo">
        <header className="demo-header">
          <h1>Let's Have A Chat ?</h1>
          <p>
            Connect with our team to discover how we can help you turn your thoughts into an apparel.
          </p>
        </header>

        <form className="change-cursor demo-form" onSubmit={handleSubmit} data-cursor-color="#321e12">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder=" your@email.com"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              pattern="[0-9]{10}"
              maxLength="10" 
              title="Please enter a valid 10-digit phone number"
              />
          </div>


          <div className="form-row">
            <div className="form-group">
              <label htmlFor="region">Region *</label>
              <select
                id="region"
                name="region"
                value={formData.region}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Region</option>
                <option value="North America">North America</option>
                <option value="South America">South America</option>
                <option value="Europe">Europe</option>
                <option value="Asia">Asia</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="eventType">Event Type</label>
              <select
                id="eventType"
                name="eventType"
                value={formData.eventType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Event Type</option>
                <option value="Music Festival">Music Festival</option>
                <option value="Retreat">Retreat</option>
                <option value="Conference">Conference</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="referralSource">How did you hear about us?</label>
            <select
              id="referralSource"
              name="referralSource"
              value={formData.referralSource}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Source</option>
              <option value="Google">Google</option>
              <option value="Facebook">Facebook</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="Referred by a friend">
                Referred by a Friend
              </option>
            </select>
          </div>

          <div className="submit-button-container">
            <button type="submit" className="submit-button">
              SUBMIT →
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default BookADemo;
