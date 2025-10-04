import React from "react";
import { MovieCard } from "./MovieCard";
import type { MovieType } from "../types/types";
import { useTheme } from "next-themes";

type MoviesProps = {
  movies?: MovieType[];
  updateMovieReview?: (imdbId: string) => void;
  message?: string;
};

const Movies: React.FC<MoviesProps> = ({
  movies,
  updateMovieReview,
  message,
}) => {
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={`min-h-screen px-4 sm:px-6 lg:px-10 py-16 transition-colors duration-300 ${
        resolvedTheme === "dark"
          ? "bg-transparent text-gray-100"
          : "bg-gray-50 text-gray-900"
      }`}
    >
      {movies && Array.isArray(movies) && movies.length > 0 ? (
        <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
          {movies.map((movie) => (
            <MovieCard
              key={movie._id}
              updateMovieReview={updateMovieReview}
              movie={movie}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-80 max-w-md mx-auto text-center rounded-xl border border-dashed border-gray-300 dark:border-gray-700 bg-white/60 dark:bg-transparent shadow-sm p-8">
          <h2 className="text-2xl font-semibold mb-3">
            {message || "No movies available"}
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Add some movies to your collection and they will show up here.
          </p>
        </div>
      )}
    </div>
  );
};

export default Movies;
