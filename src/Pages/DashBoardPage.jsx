import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { formatDate } from "../utils/date";
import { useNavigate } from "react-router-dom";
import { FiUser, FiCalendar, FiClock, FiLogOut, FiSettings, FiShoppingBag, FiHeart } from "react-icons/fi";

const DashboardPage = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Mock data for orders
  const recentOrders = [
    { id: "#ORD-78945", date: "2023-06-15", status: "Delivered", amount: 149.99 },
    { id: "#ORD-78231", date: "2023-06-10", status: "Shipped", amount: 89.50 },
    { id: "#ORD-77892", date: "2023-06-05", status: "Processing", amount: 34.99 }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-[var(--color-light-beige)] p-4 md:p-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="flex justify-between items-center mb-8"
        >
          <h1 className="text-3xl font-[kla] text-[var(--color-dark-brown)]">Dashboard</h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--color-dark-brown)] text-[var(--color-light-beige)] rounded-lg hover:bg-[var(--color-medium-brown)] transition-colors"
          >
            <FiLogOut /> Sign Out
          </motion.button>
        </motion.div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[var(--color-light-gray-tan)] rounded-xl shadow-sm p-6 lg:col-span-1 border border-[var(--color-tan)]"
          >
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 rounded-full bg-[var(--color-medium-brown)] flex items-center justify-center mb-4">
                <FiUser className="text-[var(--color-light-beige)] text-3xl" />
              </div>
              <h2 className="text-xl font-[futura] text-[var(--color-dark-brown)]">{user.name}</h2>
              <p className="text-[var(--color-grayish-brown)] font-[futura] ">{user.email}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <FiCalendar className="text-[var(--color-grayish-brown)] " />
                <div>
                  <p className="font-[futura] text-[var(--color-grayish-brown)]">Member since</p>
                  <p className="font-[futura] text-[var(--color-dark-brown)]">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <FiClock className="text-[var(--color-grayish-brown)]" />
                <div>
                  <p className="text-sm font-[futura]  text-[var(--color-grayish-brown)]">Last login</p>
                  <p className="font-medium font-[futura] text-[var(--color-dark-brown)]">{formatDate(user.lastLogin)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-[var(--color-light-gray-tan)] rounded-xl shadow-sm p-6 lg:col-span-2 border border-[var(--color-tan)]"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-[kla] text-[var(--color-dark-brown)]">Recent Orders</h2>
              <button 
                onClick={() => navigate('/orders')}
                className="text-[var(--color-dark-brown)] hover:text-[var(--color-medium-brown)] text-sm font-[futura]"
              >
                View All
              </button>
            </div>

            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.01 }}
                  className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-[var(--color-light-beige)] rounded-lg hover:bg-[var(--color-tan)] cursor-pointer border border-[var(--color-tan)]"
                  onClick={() => navigate(`/orders/${order.id}`)}
                >
                  <div className="mb-2 md:mb-0">
                    <p className="font-medium text-[var(--color-dark-brown)]">{order.id}</p>
                    <p className="text-sm text-[var(--color-grayish-brown)]">{order.date}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === "Delivered" 
                        ? "bg-[var(--color-slate-green)] text-[var(--color-light-beige)]" 
                        : order.status === "Shipped" 
                          ? "bg-[var(--color-medium-brown)] text-[var(--color-light-beige)]" 
                          : "bg-[var(--color-mauve-gray)] text-[var(--color-dark-brown)]"
                    }`}>
                      {order.status}
                    </span>
                    <p className="font-bold text-[var(--color-dark-brown)]">${order.amount.toFixed(2)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-[var(--color-light-gray-tan)] rounded-xl shadow-sm p-6 lg:col-span-3 border border-[var(--color-tan)]"
          >
            <h2 className="text-xl font-[futura]  text-[var(--color-dark-brown)] mb-6">Quick Actions</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/shop')}
                className="flex flex-col items-center justify-center p-4 bg-[var(--color-medium-brown)] text-[var(--color-light-beige)] rounded-lg hover:bg-[var(--color-dark-brown)] transition-colors "
              >
                <FiShoppingBag className="text-2xl mb-2" />
                <span className="text-sm font-[futura] ">Shop Now</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/orders')}
                className="flex flex-col items-center justify-center p-4 bg-[var(--color-slate-green)] text-[var(--color-light-beige)] rounded-lg hover:bg-[#4a5d52] transition-colors"
              >
                <FiShoppingBag className="text-2xl mb-2" />
                <span className="text-sm font-[futura] ">My Orders</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/wishlist')}
                className="flex flex-col items-center justify-center p-4 bg-[var(--color-mauve-gray)] text-[var(--color-dark-brown)] rounded-lg hover:bg-[#8d7f7d] transition-colors"
              >
                <FiHeart className="text-2xl mb-2" />
                <span className="text-sm font-[futura] ">Wishlist</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/settings')}
                className="flex flex-col items-center justify-center p-4 bg-[var(--color-tan)] text-[var(--color-dark-brown)] rounded-lg hover:bg-[var(--color-medium-brown)] hover:text-[var(--color-light-beige)] transition-colors"
              >
                <FiSettings className="text-2xl mb-2" />
                <span className="text-sm font-[futura]">Settings</span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardPage;