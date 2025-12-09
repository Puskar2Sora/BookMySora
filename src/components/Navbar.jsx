import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useAuth();
  const username = user?.displayName || user?.email?.split("@")[0];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="w-full backdrop-blur-lg bg-black/30 border-b border-white/10 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center relative">

        {/* LEFT SECTION */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text"
          >
           BookMySora
          </Link>
        </div>

        {/* CENTER SECTION: WELCOME TEXT */}
        {user && (
          <div className="absolute left-1/2 -translate-x-1/2 font-semibold text-lg bg-gradient-to-r from-purple-300 to-pink-300 text-transparent bg-clip-text">
            Welcome, {username}
          </div>
        )}

        {/* RIGHT SECTION */}
        <div className="flex items-center gap-6 text-gray-300">

          {/* If NOT logged in */}
          {!user && (
            <>
              <Link className="hover:text-white transition" to="/login">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 transition"
              >
                Sign Up
              </Link>
            </>
          )}

          {/* If LOGGED IN */}
          {user && (
            <>
              <Link className="hover:text-white transition" to="/profile">
                Profile
              </Link>

          <Link className="hover:text-white transition text-gray-300" to="/movies">
            Movies
          </Link>

              <button
                onClick={logout}
                className="hover:text-white transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
