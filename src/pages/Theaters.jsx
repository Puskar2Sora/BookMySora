    import useLocation from "../hooks/useLocation";
import { Link } from "react-router-dom";

export default function Theaters() {
  const city = useLocation();

  const theaters = {
    Kolkata: [
      { id: "pvr", name: "PVR Mani Square" },
      { id: "inox", name: "INOX City Centre" },
    ],
  }[city] || [];

  return (
    <div className="px-10 py-10 text-white">
      <h1 className="text-3xl font-bold">Choose Theatre</h1>
      <p className="text-gray-400 mt-2 mb-6">City: {city}</p>

      <div className="grid grid-cols-2 gap-6">
        {theaters.map((t) => (
          <div key={t.id} className="bg-white/5 p-6 rounded-xl">
            <h2 className="text-xl font-semibold">{t.name}</h2>
            <Link
              to={`/theatre/${t.id}`}
              className="mt-4 inline-block bg-gradient-to-r from-purple-600 to-pink-600 px-5 py-2 rounded-lg"
            >
              View Showtimes
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
