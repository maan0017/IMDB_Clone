import { useRef, useEffect, useState, type FormEvent, type FC } from "react";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Spinner from "./Spinner";
import { MovieCard } from "./MovieCard";
import type { AxiosError } from "axios";
import type { MovieType } from "../types/types";
import { axiosClient } from "../types/axios.config";

const Review: FC = () => {
  const [movie, setMovie] = useState<MovieType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const revText = useRef<HTMLTextAreaElement>(null);
  const { imdb_id } = useParams<{ imdb_id: string }>();
  const { auth } = useAuth();

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      try {
        const response = await axiosClient.get<MovieType>(`/movie/${imdb_id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Error fetching movie:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [imdb_id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!revText.current) return;

    setLoading(true);
    try {
      const response = await axiosClient.patch<MovieType>(
        `/updatereview/${imdb_id}`,
        {
          admin_review: revText.current.value,
        },
      );

      setMovie((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          admin_review: response.data?.admin_review ?? prev.admin_review,
          ranking: {
            ranking_name:
              response.data?.ranking?.ranking_name ??
              prev.ranking?.ranking_name ??
              "Unranked",
            ranking_value:
              response.data?.ranking?.ranking_value ??
              prev.ranking?.ranking_value ??
              0,
          },
        };
      });
    } catch (err) {
      const error = err as AxiosError;
      console.error("Error updating review:", err);
      if (error.response?.status === 401) {
        localStorage.removeItem("user");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading || !movie) return <Spinner />;

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
        Admin Review
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
        {/* Movie Card */}
        <div className="flex justify-center">
          <MovieCard movie={movie} />
        </div>

        {/* Review Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-colors duration-300">
          {auth?.role === "ADMIN" ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label
                htmlFor="adminReview"
                className="text-gray-700 dark:text-gray-300 font-medium"
              >
                Write Admin Review
              </label>
              <textarea
                id="adminReview"
                ref={revText}
                defaultValue={movie.admin_review || ""}
                rows={8}
                required
                placeholder="Write your review here..."
                className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent transition-colors duration-200 resize-y"
              />
              <button
                type="submit"
                className="self-end px-6 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold transition-all duration-200 active:scale-95"
              >
                Submit Review
              </button>
            </form>
          ) : (
            <div className="text-gray-700 dark:text-gray-300 text-lg">
              {movie.admin_review || "No review available yet."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Review;
