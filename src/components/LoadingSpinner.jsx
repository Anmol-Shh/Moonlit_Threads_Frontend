import { motion } from "framer-motion";

const LoadingSpinner = () => {
	return (
		<div className='min-h-screen bg-gradient-to-br from-gray-900 via-[#321e12] to-[#321e12] flex items-center justify-center relative overflow-hidden'>
			{/* Simple Loading Spinner */}
			<motion.div
				className='w-16 h-16 border-4 border-t-4 border-[#e1d9d2] border-green-200 rounded-full'
				animate={{ rotate: 360 }}
				transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
			/>
		</div>
	);
};

export default LoadingSpinner;