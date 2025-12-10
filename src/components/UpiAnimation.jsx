import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function UpiAnimation() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] py-10">
      {/* Spinning Loader */}
      <motion.div
        className="w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />

      <p className="mt-4 text-gray-300 text-lg">Processing Payment...</p>

      {/* Success Checkmark Appears */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        transition={{ delay: 2.5, type: "spring", stiffness: 200 }}
        className="mt-6 text-green-400"
      >
        <FaCheckCircle size={60} />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="text-green-400 text-xl font-bold mt-3"
      >
        Payment Successful!
      </motion.p>
    </div>
  );
}
