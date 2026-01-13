import { motion } from "framer-motion";
import { useState } from "react";
import { useAuthStore } from "../store/authStore";
import Input from "../components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#321e12] p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#B8AD9E] bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-[#8a7761]"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-[#321e12]">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 mt-4">
              <p className="text-[#321e12] text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <Input
                icon={Mail}
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 px-4 bg-[#321e12] text-white font-semibold rounded-lg shadow-md hover:bg-[#4a2c1a] focus:ring-2 focus:ring-[#8a7761] transition duration-200"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
              </motion.button>
            </form>
          ) : (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="w-16 h-16 bg-[#321e12] rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <Mail className="h-8 w-8 text-white" />
              </motion.div>
              <p className="text-[#321e12]">
                If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly.
              </p>
            </div>
          )}
        </div>

        <div className="px-8 py-4 bg-[#8a7761] bg-opacity-80 flex justify-center">
          <Link to="/login" className="text-sm text-white hover:underline flex items-center">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Login
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ForgotPasswordPage;
