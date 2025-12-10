import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import UpiAnimation from "../components/UpiAnimation";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [upiId, setUpiId] = useState("");
  const [pin, setPin] = useState("");
  const [showAnimation, setShowAnimation] = useState(false);

  const keypadButtons = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

  const handlePayment = () => {
    if (!upiId.includes("@")) {
      alert("Enter a valid UPI ID");
      return;
    }
    if (pin.length < 4) {
      alert("Enter 4-digit UPI PIN");
      return;
    }

    setShowAnimation(true);

    setTimeout(() => {
      // ⭐ SAVE TICKET DATA (Premium ticket support)
      const ticket = {
        id: Date.now(), // unique ticket id
        movie: state.movie,
        seats: state.seats,
        amount: state.amount,
        theater: state.theater,
        time: state.time,
        date: new Date().toLocaleDateString(),
        poster: state.poster || "", // ⭐ optional movie poster
      };

      // Save into localStorage
      const prev = JSON.parse(localStorage.getItem("tickets") || "[]");
      localStorage.setItem("tickets", JSON.stringify([ticket, ...prev]));

      // ⭐ Navigate TO THE TICKET PAGE with full ticket details
      navigate(`/ticket/${ticket.id}`, {
        state: ticket,
      });
    }, 3200);
  };

  return (
    <div className="text-white p-10">
      {showAnimation ? (
        <UpiAnimation />
      ) : (
        <div className="max-w-md mx-auto bg-white/10 p-6 rounded-xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4">UPI Payment</h2>

          {/* UPI ID */}
          <input
            placeholder="example@upi"
            value={upiId}
            onChange={(e) => setUpiId(e.target.value)}
            className="w-full p-3 bg-black/30 border border-white/20 rounded mb-4"
          />

          {/* PIN Dot Display */}
          <div className="flex justify-center mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div
                key={i}
                className={`w-4 h-4 mx-1 rounded-full ${
                  pin.length > i ? "bg-purple-500" : "bg-gray-500"
                }`}
              ></div>
            ))}
          </div>

          {/* Number Pad */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {keypadButtons.map((num) => (
              <button
                key={num}
                onClick={() => pin.length < 4 && setPin(pin + num)}
                className="py-3 bg-white/20 rounded text-xl hover:bg-white/30"
              >
                {num}
              </button>
            ))}
          </div>

          {/* CLEAR PIN */}
          <button
            onClick={() => setPin("")}
            className="w-full py-2 bg-red-500/40 rounded mb-4"
          >
            Clear PIN
          </button>

          {/* PAY BUTTON */}
          <button
            onClick={handlePayment}
            className="w-full py-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded text-xl font-bold"
          >
            Pay ₹{state.amount}
          </button>
        </div>
      )}
    </div>
  );
}
