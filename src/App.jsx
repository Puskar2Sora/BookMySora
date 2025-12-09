// src/App.jsx
import Showtimes from "./pages/Showtimes";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import Ticket from "./pages/Ticket";

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Movies from "./pages/Movies";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/movies" element={<Movies />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* ⭐ SHOWTIMES */}
        <Route path="/shows/:movieId" element={<Showtimes />} />

        {/* ⭐ BOOKING */}
        <Route
          path="/book/:movieId/:hallId/:time"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        {/* ⭐ PAYMENT */}
        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        {/* ⭐ TICKET */}
        <Route path="/ticket/:id" element={<Ticket />} />

        <Route path="*" element={<div style={{ padding: 20 }}>Not Found</div>} />
      </Routes>
    </div>
  );
};

export default App;
