import { useEffect, useState } from "react";
import type { MovieType } from "../types/types";
import Spinner from "./Spinner";
import Movies from "./Movies";
import { axiosClient } from "../types/axios.config";

const Recommended: React.FC = () => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      setLoading(true);
      setMessage("");

      try {
        const response = await axiosClient.get<MovieType[]>(
          "/recommanded-movies",
        );
        setMovies(response.data);

        if (response.data.length === 0) {
          setMessage("No recommended movies available at the moment.");
        }
      } catch (error) {
        console.error("Error fetching recommended movies:", error);
        setMessage(
          "Error fetching recommended movies. Please try again later.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedMovies();
  }, []);

  return (
    <main
      className="
        min-h-screen px-4 sm:px-6 lg:px-8 py-8
        bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
        transition-colors duration-300
      "
    >
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      ) : (
        <Movies movies={movies} message={message} />
      )}
    </main>
  );
};

export default Recommended;
