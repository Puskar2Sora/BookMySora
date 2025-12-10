import { useLocation } from "react-router-dom";
import { QRCodeSVG } from "qrcode.react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function Ticket() {
  const { state } = useLocation();

  const ticket = state || {
    movie: "Unknown Movie",
    theater: "Unknown Theater",
    seats: ["N/A"],
    time: "N/A",
    date: "N/A",
    poster: ticket.poster || "https://via.placeholder.com/200x300?text=Movie+Poster",
  };

  // ================= PDF DOWNLOAD (FINAL VERSION) =================
  const downloadPDF = async () => {
  const element = document.getElementById("ticket-card");

  if (!element) {
    alert("Ticket not found!");
    return;
  }

  try {
    const clone = element.cloneNode(true);

    clone.style.background = "#ffffff";
    clone.style.backgroundImage = "none";   // 🚀 FIX GRADIENT / OKLAB BUG
    clone.style.color = "#000000";
    clone.style.padding = "20px";
    clone.style.borderRadius = "16px";
    clone.style.width = "650px";

    clone.style.position = "fixed";
    clone.style.top = "-9999px";
    clone.style.left = "-9999px";
    clone.style.opacity = "0";
    clone.style.zIndex = "-1";

    document.body.appendChild(clone);

    const canvas = await html2canvas(clone, {
      scale: 3,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
    });

    document.body.removeChild(clone);

    const img = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfW = pdf.internal.pageSize.getWidth();
    const pdfH = (canvas.height * pdfW) / canvas.width;

    pdf.addImage(img, "PNG", 0, 0, pdfW, pdfH);
    pdf.save(`MovieTicket_${ticket.movie}.pdf`);
  } catch (err) {
    console.error("PDF Error:", err);
    alert("PDF generation failed!");
  }
};

  return (
    <div className="min-h-screen bg-[#0d0f18] flex flex-col items-center py-12 px-4">
      <button
        onClick={downloadPDF}
        className="px-6 py-3 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-lg mb-6"
      >
        Download PDF
      </button>

      <div
        id="ticket-card"
        className="max-w-2xl w-full bg-gradient-to-br from-[#1c1f2b] to-[#12141c] rounded-2xl shadow-2xl p-6 border border-white/10 backdrop-blur-xl"
      >
        <h1 className="text-4xl font-bold text-purple-400 mb-6">🎟️ Your Ticket</h1>

        <div className="flex flex-col md:flex-row gap-6">
          <img
  src={
    ticket.poster && ticket.poster.trim() !== ""
      ? ticket.poster
      : "https://via.placeholder.com/200x300?text=No+Poster"
  }
  alt="Movie Poster"
  className="w-40 h-56 rounded-xl object-cover shadow-lg"
/>


          <div className="flex-1 space-y-2 text-white text-lg">
            <p><span className="text-gray-400">Movie:</span> {ticket.movie}</p>
            <p><span className="text-gray-400">Theater:</span> {ticket.theater}</p>
            <p><span className="text-gray-400">Seats:</span> {ticket.seats.join(", ")}</p>
            <p><span className="text-gray-400">Time:</span> {ticket.time}</p>
            <p><span className="text-gray-400">Date:</span> {ticket.date}</p>
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <div className="bg-white p-4 rounded-xl shadow-xl">
            <QRCodeSVG
              value={JSON.stringify(ticket)}
              size={200}
              bgColor="#ffffff"
              fgColor="#000000"
              level="H"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
