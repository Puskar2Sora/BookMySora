import { useLocation } from "react-router-dom";
import { QRCode } from "react-qrcode-logo";
import jsPDF from "jspdf";

export default function Ticket() {
  const { state } = useLocation();

  if (!state) return <h1 className="text-white p-10">Invalid Ticket</h1>;

  const { seats, amount, movie, theater, time, bookingId } = state;

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("🎟️ Movie Ticket", 20, 20);

    doc.setFontSize(12);
    doc.text(`Movie: ${movie}`, 20, 40);
    doc.text(`Theatre: ${theater}`, 20, 50);
    doc.text(`Showtime: ${time}`, 20, 60);
    doc.text(`Seats: ${seats.join(", ")}`, 20, 70);
    doc.text(`Amount Paid: ₹${amount}`, 20, 80);

    const image = document.getElementById("qr-img").toDataURL("image/png");
    doc.addImage(image, "PNG", 20, 100, 60, 60);

    doc.save("ticket.pdf");
  };

  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-3xl font-bold mb-6">🎟️ Your Ticket</h1>

      <div className="bg-white/10 p-6 rounded-xl max-w-lg shadow-lg">
        <p className="text-xl font-semibold">{movie}</p>
        <p className="text-gray-300 mt-2">Theatre: {theater}</p>
        <p className="text-gray-300">Showtime: {time}</p>
        <p className="text-gray-300">Seats: {seats.join(", ")}</p>
        <p className="text-gray-300">Amount Paid: ₹{amount}</p>

        <div className="flex justify-center my-6">
          <QRCode
            id="qr-img"
            value={`TICKET-${bookingId}`}
            size={150}
            qrStyle="dots"
            bgColor="#111"
            fgColor="#ff4dd2"
          />
        </div>

        <button
          onClick={downloadPDF}
          className="w-full py-3 mt-4 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:opacity-90"
        >
          Download Ticket PDF
        </button>
      </div>
    </div>
  );
}
