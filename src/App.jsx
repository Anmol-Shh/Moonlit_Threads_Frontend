import React, { useEffect, useState } from 'react';  
import Home from './Pages/Home';
import './index.css';
import { Navigate, Route, Routes, useLocation } from 'react-router';
import Fragrance from './Pages/Fragrance';
import Cart from './Pages/Cart';
import CustomCursor from './components/CustomCursor';
import Men from './Pages/Men';
import Women from './Pages/Women';
import PrivateRoute from './Pages/PrivateRoute';
import ContactUs from './Pages/ContactUs';
import { AuthProvider } from './context/AuthProvider';
import ArticleDetails from './Pages/ArticleDetails';
import SignUpPage from "./Pages/SignUpPage";
import LoginPage from "./Pages/LoginPage";
import EmailVerificationPage from "./Pages/EmailVerificationPage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import LoadingSpinner from "./components/LoadingSpinner";
import Dashboard from './Pages/DashBoardPage';
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authStore";
import Latest from './Pages/Latest';
import OrderSuccessPage from './Pages/OrderSuccess';

// protect routes that require authentication
const ProtectedRoute = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (!isAuthenticated) {
		return <Navigate to='/login' replace />;
	}

	if (!user.isVerified) {
		return <Navigate to='/verify-email' replace />;
	}

	return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
	const { isAuthenticated, user } = useAuthStore();

	if (isAuthenticated && user.isVerified) {
		return <Navigate to='/' replace />;
	}

	return children;
};
const App = () => {
  const [loading, setLoading] = useState(true); // State to control loading screen
  const location = useLocation();  // Use useLocation to detect route changes

  const [cursorColor, setCursorColor] = useState('white');

  // Simulate a delay to showcase loading (e.g., an API call)
  const simulatePageLoad = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false); // Hide loading screen after a delay
    }, 1500); // Adjust time as needed
  };

  useEffect(() => {
    simulatePageLoad(); // Trigger loading on route change
  }, [location]); // Add location as a dependency to detect route changes

  const { isCheckingAuth, checkAuth } = useAuthStore();

	useEffect(() => {
		checkAuth();
	}, [checkAuth]);

	if (isCheckingAuth) return <LoadingSpinner />;

  
  return (
    <>
      {/* {loading && <LoadingScreen />}  */}
      <CustomCursor cursorColor={cursorColor} />
      {(
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/fragrance' element={<Fragrance />} />
          <Route path='/Latest' element={<Latest />} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/shop/men' element={<Men/>} />
          <Route path='/shop/women' element={<Women/>} />
          <Route path='/dashboard' element={<Dashboard/>} />
		  <Route path='/cart' element={<Cart />} />	
		  <Route path='/order-success' element={<OrderSuccessPage />} />
          <Route path="/cart" element={ 
            <PrivateRoute> 
              <Cart /> 
            </PrivateRoute> 
            } 
          /> 
		  <Route path="/products/:id" element={<ArticleDetails />} />
          <Route
					path='/'
					element={
						<ProtectedRoute>
							<Home />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/signup'
					element={
						<RedirectAuthenticatedUser>
							<SignUpPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route
					path='/login'
					element={
						<RedirectAuthenticatedUser>
							<LoginPage />
						</RedirectAuthenticatedUser>
					}
				/>
				<Route path='/verify-email' element={<EmailVerificationPage />} />
				<Route
					path='/forgot-password'
					element={
						<RedirectAuthenticatedUser>
							<ForgotPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>

				<Route
					path='/reset-password/:token'
					element={
						<RedirectAuthenticatedUser>
							<ResetPasswordPage />
						</RedirectAuthenticatedUser>
					}
				/>
				{/* catch all routes */}
				<Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
        <Toaster />
      </AuthProvider>
      )}
    </>
  );
};

export default App;
