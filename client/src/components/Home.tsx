import { useState, useEffect } from "react";
import type { MovieType } from "../types/types";
import Spinner from "./Spinner";
import Movies from "./Movies";
import { axiosClient } from "../types/axios.config";

type HomeProps = {
  updateMovieReview?: (imdbId: string) => void;
};

const Home: React.FC<HomeProps> = ({ updateMovieReview }) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setMessage("");
      try {
        const response = await axiosClient.get<MovieType[]>("/movies");
        setMovies(response.data);
        if (response && response.data && response.data.length === 0) {
          setMessage("There are currently no movies available.");
        }
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMessage("Error fetching movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <main
      className={`
        min-h-screen px-4 sm:px-6 lg:px-8 py-8 transition-colors
        bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
      `}
    >
      {loading ? (
        <div className="flex items-center justify-center h-96">
          <Spinner />
        </div>
      ) : (
        <Movies
          movies={movies}
          updateMovieReview={updateMovieReview}
          message={message}
        />
      )}
    </main>
  );
};

export default Home;
