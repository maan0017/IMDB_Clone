import { useState, type FormEvent } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { axiosClient } from "../types/axios.config";
import toast from "react-hot-toast";

const Login: React.FC = () => {
  const { setAuth } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axiosClient.post("/login", { email, password });
      if (response.data.error) {
        setError(response.data.error);
        return;
      }

      setAuth(response.data);
      toast.success("Logged In Successfully.");
      navigate(from, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 space-y-6">
        {/* Logo and Heading */}
        <div className="text-center">
          {/* <img src={logo} alt="Logo" className="mx-auto h-14 w-14 mb-3" /> */}
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            Sign In
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Welcome back! Please login to your account.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-100 dark:bg-red-700 text-red-800 dark:text-red-100 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              autoFocus
              required
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                         bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                         transition-colors duration-200"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700
                         bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
                         focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent
                         transition-colors duration-200"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white font-semibold
                       transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400
                       active:scale-95 flex justify-center items-center"
          >
            {loading ? (
              <>
                <span className="animate-spin border-2 border-white border-t-transparent rounded-full w-5 h-5 mr-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-cyan-500 dark:text-cyan-400 font-medium hover:underline"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
