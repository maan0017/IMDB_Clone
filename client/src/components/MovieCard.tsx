import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import type { MovieType } from "../types/types";
import type { FC } from "react";

type MovieProps = {
  movie?: MovieType | null;
  updateMovieReview?: (imdbId: string) => void;
};

export const MovieCard: FC<MovieProps> = ({ movie, updateMovieReview }) => {
  // --- No Movie Data State ---
  if (!movie) {
    return (
      <div className="h-full">
        <div
          className="border border-gray-200 dark:border-gray-700 rounded-xl 
                     flex items-center justify-center h-[350px] transition-colors duration-300 p-4"
        >
          <p className="text-gray-500 dark:text-gray-400 text-lg font-medium tracking-wide">
            🎬 No movie data available
          </p>
        </div>
      </div>
    );
  }

  // --- Movie Data Card ---
  return (
    <div key={movie._id} className="h-full">
      <Link
        to={`/stream/${movie.youtube_id}`}
        className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-xl"
      >
        <div
          className={`rounded-xl overflow-hidden flex flex-col h-full transition-all duration-300 
                      group-hover:scale-[1.03] group-hover:shadow-2xl group-active:scale-[1.01] relative
                      ${"bg-white border border-gray-200 shadow-xl dark:bg-transparent dark:border-gray-700"}`}
        >
          {/* Poster */}
          <div className="relative h-72 sm:h-80 w-full overflow-hidden">
            <img
              src={movie.poster_path || "/placeholder.jpg"}
              alt={movie.title || "Untitled"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <FontAwesomeIcon
                icon={faCirclePlay}
                className="text-white text-6xl sm:text-7xl drop-shadow-xl opacity-90"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 p-5 space-y-2">
            <h3
              className="text-lg sm:text-xl font-extrabold truncate 
                           text-gray-900 dark:text-gray-50 group-hover:text-cyan-500 transition-colors tracking-tight"
            >
              {movie.title || "Untitled"}
            </h3>

            <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
              IMDb ID:{" "}
              <span className="font-mono text-xs ml-1">
                {movie.imdb_id || "N/A"}
              </span>
            </p>

            {movie.ranking?.ranking_name && (
              <span className="self-start mt-1 bg-cyan-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md uppercase tracking-wider">
                {movie.ranking.ranking_name}
              </span>
            )}

            {updateMovieReview && (
              <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    updateMovieReview(movie.imdb_id);
                  }}
                  className="w-full py-2.5 text-sm rounded-lg font-bold transition-all duration-300 shadow-md
                             bg-cyan-600 text-white hover:bg-cyan-700 dark:bg-cyan-500 dark:hover:bg-cyan-600
                             focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
                >
                  See Review
                </button>
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};
