import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-24">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl font-extrabold leading-tight"
      >
        Experience Movies Like Never Before 🎥
        <span className="block bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
          Anytime. Anywhere.
        </span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-xl text-gray-300 mt-6 max-w-2xl"
      >
        Discover movies, explore theatres, and book your seats with real-time availability.  
        Enter the world of cinematic magic.
      </motion.p>

      <motion.a
        href="/movies"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="inline-block mt-10 px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-lg rounded-xl shadow-lg shadow-purple-500/30 hover:scale-105 transition"
      >
        Browse Movies →
      </motion.a>
    </div>
  );
};

export default Home;
