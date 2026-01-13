import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../components/Input";
import { useAuthStore } from "../store/authStore";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login, isLoading, error } = useAuthStore();

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, password);
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
            Welcome Back
          </h2>

          <form onSubmit={handleLogin} className="space-y-5 mt-4">
            <Input
              icon={Mail}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white"
            />

            <Input
              icon={Lock}
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white"
            />

            <div className="flex justify-end mb-3">
              <Link
                to="/forgot-password"
                className="text-sm text-[#321e12] font-semibold hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-[#321e12] text-white font-semibold rounded-lg shadow-md hover:bg-[#4a2c1a] focus:ring-2 focus:ring-[#8a7761] transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Login"}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-[#8a7761] text-center">
          <p className="text-sm text-white">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#321e12] font-semibold hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;
