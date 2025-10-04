import { useState, useEffect, type FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { axiosClient } from "../types/axios.config";
import toast from "react-hot-toast";

interface Genre {
  genre_id: number;
  genre_name: string;
}

const Register: React.FC = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [favouriteGenres, setFavouriteGenres] = useState<Genre[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = Number(e.target.value);
    setFavouriteGenres((prev) => {
      // Check if already selected
      const exists = prev.find((g) => g.genre_id === selectedId);
      if (exists) {
        // Remove it (unselect)
        return prev.filter((g) => g.genre_id !== selectedId);
      } else {
        // Add it (select)
        const option = Array.from(e.target.options).find(
          (opt) => Number(opt.value) === selectedId,
        );
        if (!option) return prev;
        return [
          ...prev,
          {
            genre_id: Number(option.value),
            genre_name: option.label,
          },
        ];
      }
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        first_name: firstName,
        last_name: lastName,
        email,
        password,
        role: "USER",
        // Only send genre_ids in the payload
        // favourite_genres: favouriteGenres.map((g) => g.genre_id),
        favourite_genres: favouriteGenres,
      };
      // Assuming a successful response does not have a data.error field
      const response = await axiosClient.post("/register", payload);

      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      toast.success("User Registered Successfully.");
      navigate("/login", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      // More specific error handling if possible
      const errorMessage =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosClient.get<Genre[]>("/genres");
        // Ensure the response data is an array before setting
        if (Array.isArray(response.data)) {
          setGenres(response.data);
        } else {
          console.error("Received non-array data for genres:", response.data);
        }
      } catch (err) {
        console.error("Error fetching genres:", err);
        // Optionally set an error state for the user here
      }
    };
    fetchGenres();
  }, []);

  return (
    // FULL HEIGHT CONTAINER: Centering the form vertically and horizontally.
    <div className="w-full min-h-screen flex items-center justify-center p-6 sm:p-10 bg-gray-50 dark:bg-gray-900">
      {/* FORM CARD: Max width ensures focus, large shadow for depth, slightly smaller corner radius for professionalism. */}
      <div className="w-full max-w-xl bg-white dark:bg-gray-800 rounded-xl shadow-2xl shadow-gray-300/60 dark:shadow-black/50 p-6 sm:p-10 border border-gray-100 dark:border-gray-700/50">
        {/* Logo and Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            Create Your Account
          </h2>
          <p className="mt-2 text-md text-gray-500 dark:text-gray-400">
            Start streaming your favorite movies today!
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/40 text-red-800 dark:text-red-300 px-4 py-3 rounded-lg text-sm font-medium shadow-sm border border-red-300 dark:border-red-700/50">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Fields (Flexible Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                // Input Styling: Full height, consistent border, focus ring effect
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100 shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-3 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                placeholder="John"
              />
            </div>
            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100 shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-3 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                placeholder="Doe"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                         text-gray-900 dark:text-gray-100 shadow-sm placeholder-gray-400 
                         focus:outline-none focus:ring-3 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Fields (Flexible Layout) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 
                           text-gray-900 dark:text-gray-100 shadow-sm placeholder-gray-400 
                           focus:outline-none focus:ring-3 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300"
                placeholder="Min 8 characters"
              />
            </div>
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-1"
              >
                Confirm Password
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                // Conditional styling for visual feedback
                className={`w-full px-4 py-3 rounded-lg border 
                  ${
                    confirmPassword && password !== confirmPassword
                      ? "border-red-500 dark:border-red-400 ring-1 ring-red-500"
                      : "border-gray-300 dark:border-gray-700 focus:ring-cyan-500 focus:border-cyan-500"
                  } bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-3 transition-all duration-300`}
                placeholder="Confirm Password"
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-600 dark:text-red-400 text-xs mt-1 font-medium">
                  Passwords do not match.
                </p>
              )}
            </div>
          </div>

          {/* Favourite Genres (Improved Multi-select Look) */}
          <div>
            <label
              htmlFor="genres-select"
              className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2"
            >
              Favourite Genres{" "}
              <span className="text-gray-400 dark:text-gray-500 font-normal">
                (Optional)
              </span>
            </label>
            <select
              id="genres-select"
              name="genres"
              title="select genres"
              multiple
              // Map to string for select value comparison
              value={favouriteGenres.map((g) => String(g.genre_id))}
              onChange={handleGenreChange}
              // Select Styling: More vertical space, consistent focus
              className="w-full h-44 px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 
                         bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm 
                         focus:outline-none focus:ring-3 focus:ring-cyan-500 transition-all duration-300"
            >
              {genres.map((genre) => (
                <option
                  key={genre.genre_id}
                  value={genre.genre_id}
                  // Label is important for the `handleGenreChange` logic
                  label={genre.genre_name}
                  className="p-1.5"
                >
                  {genre.genre_name}
                </option>
              ))}
            </select>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5">
              Hold **Ctrl** (Windows) or **Cmd** (Mac) to select multiple
              genres.
            </p>
          </div>

          {/* Submit Button (Highly visible primary action) */}
          <button
            type="submit"
            disabled={
              loading || (password.length > 0 && password !== confirmPassword)
            }
            // Button Styling: Large, full-width, deep shadow, loading spinner integrated
            className="w-full py-3.5 rounded-lg bg-cyan-600 hover:bg-cyan-700 text-white font-extrabold text-lg 
                       shadow-xl shadow-cyan-500/50 dark:shadow-cyan-600/40 transition-all duration-300 
                       flex justify-center items-center active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-3"></span>
                Processing...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400 pt-6 border-t border-gray-200 dark:border-gray-700">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-cyan-600 dark:text-cyan-400 font-extrabold hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors duration-200"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
