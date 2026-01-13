import { motion } from "framer-motion";
import Input from "../components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../components/PasswordStrengthMeter";
import { useAuthStore } from "../store/authStore";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAuthStore();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signup(email, password, name);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center bg-[#B8AD9E] p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-[#321e12] bg-opacity-90 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden border border-[#8a7761]"
      >
        <div className="p-8">
          <h2 className="text-3xl font-bold text-center text-[#e1d9d2]">
            Create Account
          </h2>

          <form onSubmit={handleSignUp} className="space-y-5 mt-4">
            <Input
              icon={User}
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-white"
            />

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

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <PasswordStrengthMeter password={password} />

            <motion.button
              className="w-full py-3 px-4 bg-[#B8AD9E] text-white font-semibold rounded-lg shadow-md hover:bg-[#4a2c1a] focus:ring-2 focus:ring-[#8a7761] transition duration-200"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? <Loader className="animate-spin mx-auto" size={24} /> : "Sign Up"}
            </motion.button>
          </form>
        </div>

        <div className="px-8 py-4 bg-[#8a7761] text-center">
          <p className="text-sm text-white">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="text-[#321e12] font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SignUpPage;
