import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Profile = () => {
  const { user } = useAuth();

  // ⬅ STEP 5: Load saved tickets from localStorage
  const tickets = JSON.parse(localStorage.getItem("tickets") || "[]");

  return (
    <div className="min-h-screen flex justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="max-w-lg w-full bg-white/5 backdrop-blur-xl p-10 rounded-2xl border border-white/10 shadow-2xl relative"
      >
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text text-center">
          Your Profile
        </h1>

        {/* Avatar */}
        <div className="flex justify-center mt-6 mb-8">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-4xl font-bold text-white shadow-lg">
            {user?.email?.[0]?.toUpperCase() || "U"}
          </div>
        </div>

        {/* User Info */}
        <div className="space-y-4 text-lg">
          <div>
            <span className="text-gray-400">Name:</span>
            <p className="text-white font-semibold">{user?.displayName || "N/A"}</p>
          </div>

          <div>
            <span className="text-gray-400">Email:</span>
            <p className="text-white font-semibold">{user?.email}</p>
          </div>
        </div>

        <hr className="my-8 border-white/10" />

        {/* ⭐ STEP 5 — Show bookings */}
        <h2 className="text-xl font-bold mt-6 mb-2 text-center">Your Bookings 🎟️</h2>

        {tickets.length === 0 ? (
          <p className="text-gray-400 text-center">No bookings yet.</p>
        ) : (
          <div className="space-y-4 mt-4">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="bg-white/10 p-4 rounded-xl border border-white/10 hover:bg-white/20 transition cursor-pointer"
                onClick={() => window.location.href = `/ticket/${t.id}`}
              >
                <p className="text-lg font-bold text-purple-300">{t.movie}</p>
                <p className="text-gray-300">{t.theater}</p>
                <p className="text-gray-300">Seats: {t.seats}</p>
                <p className="text-gray-300">Time: {t.time}</p>
                <p className="text-gray-400 text-sm mt-1">Booked on {t.date}</p>
              </div>
            ))}
          </div>
        )}

      </motion.div>
    </div>
  );
};

export default Profile;
