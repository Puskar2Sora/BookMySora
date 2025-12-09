import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useLocation from "../hooks/useLocation";

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const city = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch("https://api.tvmaze.com/shows");
        const data = await res.json();

        // Filter only movies (with image)
        const cleaned = data
          .filter((m) => m.image)
          .slice(0, 20); // limit to 20 trending movies

        setMovies(cleaned);
      } catch (err) {
        console.log("Movie fetch error:", err);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className="px-8 py-10 text-white">

      <h1 className="text-4xl font-extrabold text-purple-300 mb-2">
        Now Showing
      </h1>

      <p className="text-gray-300 mb-10">
        📍 Showing movies for {city ?? "your city"}
      </p>

      {/* IF LOADING */}
      {movies.length === 0 && (
        <p className="text-gray-400 text-lg">Fetching movies...</p>
      )}

      {/* MOVIE GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white/5 rounded-xl border border-white/10 p-4 backdrop-blur-xl shadow-xl"
          >
            {/* Poster */}
            <img
              src={movie.image.medium}
              alt={movie.name}
              className="rounded-lg w-full h-60 object-cover mb-4"
            />

            {/* Title */}
            <h2 className="text-xl font-semibold text-white">{movie.name}</h2>

            {/* Year + Rating */}
            <p className="text-gray-400 text-sm">
              Rating: ⭐ {movie.rating.average ?? "N/A"}
            </p>

            {/* Button */}
            <Link
              to={`/shows/${movie.id}`}
              className="block mt-4 px-5 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-center text-white hover:opacity-90"
            >
              View Shows
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
