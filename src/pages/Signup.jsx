import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { motion } from "framer-motion";

const Signup = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup(form.name, form.email, form.password);
      navigate("/movies");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-700/20 to-pink-600/10 blur-3xl"></div>

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl"
      >
        {/* Animated Gradient Border */}
        <div className="absolute inset-0 rounded-2xl p-[2px] bg-gradient-to-r from-purple-500 to-pink-600 opacity-30 blur-md"></div>

        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Create Your Account 🎟️
          </h1>

          <p className="text-gray-300 text-center mb-6">
            Sign up to start booking movies, managing your profile, and exploring theatres.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* NAME FIELD */}
            <div>
              <label className="text-gray-300 font-medium">Full Name</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 mt-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Enter your name"
              />
            </div>

            {/* EMAIL FIELD */}
            <div>
              <label className="text-gray-300 font-medium">Email Address</label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 mt-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD FIELD */}
            <div>
              <label className="text-gray-300 font-medium">Password</label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 mt-2 rounded-xl bg-black/30 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="••••••••"
              />
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <p className="text-red-400 text-sm text-center">{error}</p>
            )}

            {/* SIGNUP BUTTON */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full py-3 rounded-xl text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg shadow-purple-600/30 hover:opacity-90 transition"
            >
              Create Account
            </motion.button>
          </form>

          <p className="text-center text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-400 hover:text-pink-400 underline">
              Login here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;
