import { useParams } from "react-router-dom";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


const PRICES = {
  VIP: 450,
  COUPLE: 500,
  GOLD: 250,
  SILVER: 180,
  ECONOMY: 150,
};

export default function Booking() {
  const { hallId, time } = useParams();
  const showtime = decodeURIComponent(time);
  const navigate = useNavigate();


  const reservedSeats = ["A6", "A7", "C1-2"]; // demo

  const [selected, setSelected] = useState([]);

  const seatBlocks = {
    vip: [
      { row: "V1", seats: 8 },
      { row: "V2", seats: 8 },
    ],

    couple: [
      { row: "C1", pairs: 6 },
      { row: "C2", pairs: 6 },
    ],

    left: ["A", "B", "C", "D"].map((r) => ({ row: r, seats: 12 })),
    right: ["E", "F", "G", "H"].map((r) => ({ row: r, seats: 12 })),
  };

  // ---------------- Seat Selection Logic ----------------
  const isReserved = (id) => reservedSeats.includes(id);
  const isSelected = (id) => selected.includes(id);

  const toggleSeat = (seat) => {
    if (isReserved(seat.id)) return;

    if (seat.type === "COUPLE") {
      const root = `${seat.row}-${seat.pair}`;
      const s1 = `${root}-1`;
      const s2 = `${root}-2`;

      const bothSelected = isSelected(s1) && isSelected(s2);

      if (bothSelected) {
        setSelected((p) => p.filter((s) => s !== s1 && s !== s2));
      } else {
        setSelected((p) => [...p.filter((s) => s !== s1 && s !== s2), s1, s2]);
      }
      return;
    }

    if (isSelected(seat.id))
      setSelected((p) => p.filter((s) => s !== seat.id));
    else setSelected((p) => [...p, seat.id]);
  };

  // ---------------- PREMIUM SEAT COMPONENT ----------------
  const Seat = ({ id, label, type, big }) => {
    const reserved = isReserved(id);
    const selected = isSelected(id);

    return (
      <motion.div
        whileHover={{ scale: reserved ? 1 : 1.12, rotateX: 15 }}
        whileTap={{ scale: reserved ? 1 : 0.95 }}
        onClick={() => toggleSeat({ id, type })}
        className={`
          ${big ? "w-12 h-12" : "w-9 h-9"}
          flex items-center justify-center rounded-lg cursor-pointer
          font-semibold text-xs
          transition-all border
          ${
            reserved
              ? "bg-gray-500 border-gray-400 cursor-not-allowed"
              : selected
              ? "bg-pink-600 border-pink-400 shadow-xl shadow-pink-500/40"
              : "bg-[#1e2a3a] border-gray-600 hover:bg-[#2c3e50]"
          }
        `}
        style={{
          boxShadow: selected ? "0 0 15px rgba(255,0,120,0.7)" : "",
        }}
      >
        {label}
      </motion.div>
    );
  };

  // ---------------- TOTAL PRICE ----------------
  const totalPrice = useMemo(() => {
    let total = 0;
    const coupleHandled = new Set();

    selected.forEach((s) => {
      if (s.includes("-")) {
        const root = s.split("-").slice(0, 2).join("-");
        if (!coupleHandled.has(root)) {
          coupleHandled.add(root);
          total += PRICES.COUPLE;
        }
      } else {
        const row = s[0];
        if ("A".includes(row)) total += PRICES.GOLD;
        else if ("B".includes(row)) total += PRICES.SILVER;
        else if ("V".includes(row)) total += PRICES.VIP;
        else total += PRICES.ECONOMY;
      }
    });

    return total;
  }, [selected]);

  // ---------------- COUPLE SEATS ----------------
  const CoupleRow = ({ row, pairs }) => (
    <div className="flex items-center gap-4 justify-center my-4">
      <span className="text-gray-400">{row}</span>

      <div className="flex gap-6">
        {Array.from({ length: pairs }, (_, i) => {
          const s1 = `${row}-${i + 1}-1`;
          const s2 = `${row}-${i + 1}-2`;
          return (
            <div key={i} className="flex gap-2">
              <Seat id={s1} type="COUPLE" big />
              <Seat id={s2} type="COUPLE" big />
            </div>
          );
        })}
      </div>

      <span className="text-gray-400">{row}</span>
    </div>
  );

  // ---------------- ROW BLOCK ----------------
  const RowBlock = ({ rows }) => (
    <div className="flex flex-col gap-3">
      {rows.map((row) => (
        <div
          key={row.row}
          className="flex items-center gap-3 justify-center"
          style={{
            transform: `perspective(400px) rotateX(12deg)`, // curved cinema effect
          }}
        >
          <span className="w-6 text-gray-500">{row.row}</span>

          <div className="grid grid-cols-12 gap-2">
            {Array.from({ length: row.seats }).map((_, i) => {
              const id = `${row.row}${i + 1}`;
              return <Seat key={id} id={id} label={i + 1} type="NORMAL" />;
            })}
          </div>

          <span className="w-6 text-gray-500">{row.row}</span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="px-10 py-10 text-white">
      <h1 className="text-3xl font-bold text-purple-300 mb-2">Select Your Seats</h1>
      <p className="text-gray-400">Theatre: {hallId} • Showtime: {showtime}</p>

      {/* Cinema Screen */}
      <div className="flex justify-center my-8">
        <div
          className="px-16 py-3 text-lg font-bold text-white rounded-full
          bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
          style={{ transform: "perspective(600px) rotateX(25deg)" }}
        >
          SCREEN
        </div>
      </div>

      {/* VIP */}
      <div className="mt-10">
        <h2 className="text-center text-yellow-400 mb-3 font-semibold">VIP – ₹450</h2>
        <RowBlock rows={seatBlocks.vip} />
      </div>

      {/* COUPLE */}
      <div className="mt-14">
        <h2 className="text-center text-pink-400 mb-3 font-semibold">Couple Seats – ₹500</h2>
        {seatBlocks.couple.map((r) => (
          <CoupleRow key={r.row} row={r.row} pairs={r.pairs} />
        ))}
      </div>

      {/* NORMAL SEATS */}
      <div className="flex justify-center gap-20 mt-14">
        <RowBlock rows={seatBlocks.left} />
        <RowBlock rows={seatBlocks.right} />
      </div>

      {/* Booking Summary */}
      <div className="mt-10 bg-white/5 p-5 rounded-xl max-w-md shadow-md backdrop-blur">
        <h2 className="text-xl font-bold">Booking Summary</h2>

        <p className="mt-2 text-gray-300">
          Seats:{" "}
          <span className="text-purple-300">{selected.join(", ") || "None"}</span>
        </p>

        <p className="mt-2 text-gray-300">
          Total Amount:{" "}
          <span className="text-purple-300 font-bold">₹{totalPrice}</span>
        </p>
<button
  className="w-full py-4 rounded-xl text-xl font-semibold bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 transition mt-4"
  onClick={() => {
    if (selected.length === 0) {
      alert("Please select at least one seat");
      return;
    }

    navigate("/payment", {
      state: {
        seats: selected,
        amount: totalPrice,
        movie: "Selected Movie",  // TEMP — replace later
        theater: hallId,
        time: showtime,
      },
    });
  }}
>
  Proceed to Payment
</button>


      </div>
    </div>
  );
}
