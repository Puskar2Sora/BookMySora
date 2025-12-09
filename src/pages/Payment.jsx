import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "../contexts/AuthContext";

export default function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const { seats, amount, movie, theater, time } = state || {};

  const createTicket = async () => {
    const ticket = {
      userId: user.uid,
      movie,
      theater,
      time,
      seats,
      amount,
      createdAt: Date.now(),
    };

    const ref = await addDoc(collection(db, "tickets"), ticket);

    navigate(`/ticket/${ref.id}`, { state: ticket });
  };

  useEffect(() => {
    createTicket();
  }, []);

  return (
    <div className="text-white text-center mt-20 text-3xl">
      Processing Payment...
    </div>
  );
}
