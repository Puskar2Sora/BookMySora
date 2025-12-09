import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Showtimes = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const theatres = [
    {
      id: "inox",
      name: "INOX City Centre",
      times: ["10:00 AM", "1:00 PM", "4:00 PM", "7:00 PM"],
    },
    {
      id: "pvr",
      name: "PVR Mani Square",
      times: ["9:30 AM", "12:30 PM", "3:30 PM", "6:30 PM"],
    },
    {
      id: "cinepolis",
      name: "Cinepolis Lake Mall",
      times: ["11:00 AM", "2:00 PM", "5:00 PM", "8:00 PM"],
    },
  ];

  useEffect(() => {
    const loadMovie = async () => {
      try {
        const res = await fetch(`https://api.tvmaze.com/shows/${movieId}`);
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.log("Movie fetch error:", err);
      }
    };

    loadMovie();
  }, [movieId]);

  if (!movie)
    return <p className="text-gray-400 text-center mt-20">Loading showtimes...</p>;

  return (
    <div className="px-10 py-12 text-white">
      {/* Movie Header */}
      <div className="flex gap-8 items-center mb-10">
        <img
          src={movie.image?.medium}
          alt={movie.name}
          className="rounded-2xl shadow-xl w-48"
        />

        <div>
          <h1 className="text-4xl font-extrabold text-purple-300">
            {movie.name}
          </h1>
          <p className="text-gray-400 mt-2 text-lg">
            ⭐ Rating: {movie.rating?.average ?? "N/A"}
          </p>
          <p className="text-gray-400">{movie.genres.join(", ")}</p>
        </div>
      </div>

      {/* Theatre List */}
      <h2 className="text-2xl font-bold text-purple-200 mb-6">Select Showtime</h2>

      <div className="space-y-6">
        {theatres.map((hall) => (
          <div
            key={hall.id}
            className="bg-white/5 border border-white/10 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-4">{hall.name}</h3>

            <div className="flex gap-4 flex-wrap">
              {hall.times.map((time) => (
                <Link
                  key={time}
                  to={`/book/${movieId}/${hall.id}/${encodeURIComponent(time)}`}
                  className="px-5 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium hover:opacity-90 transition"
                >
                  {time}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Showtimes;
