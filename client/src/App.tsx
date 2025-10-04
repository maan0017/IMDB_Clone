import { useNavigate, Routes, Route } from "react-router-dom";
import { useCallback } from "react";
import useAuth from "./hooks/useAuth"; // Assuming hook exists
import Header from "./components/Header";
import Layout from "./components/Layout"; // Assuming layout component exists
import Home from "./components/Home"; // Assuming component exists
import Register from "./components/Register";
import Login from "./components/Login"; // Assuming component exists
import RequiredAuth from "./components/RequireAuth"; // Assuming component exists
import Review from "./components/Review"; // Assuming component exists
import StreamMovie from "./components/Stream"; // Assuming component exists
import { axiosClient } from "./types/axios.config"; // Assuming client configuration exists
import Recommended from "./components/Recommanded";
import toast from "react-hot-toast";

const App: React.FC = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useAuth(); // Assuming useAuth provides auth state and setter

  // Navigate to review page
  const updateMovieReview = useCallback(
    (imdb_id: string) => {
      navigate(`/review/${imdb_id}`);
    },
    [navigate],
  );

  // Handle logout
  const handleLogout = useCallback(async () => {
    if (!auth?.user_id) return;

    try {
      // API call to log out user
      await axiosClient.post("/logout", {
        user_id: auth.user_id,
      });
      // console.log("✅ Logout:", response.data);

      setAuth(null);
      localStorage.removeItem("user");
      toast.success("User Logged Out Successfully.");
      // Redirect to home or login page after successful logout
      navigate("/login");
    } catch (error) {
      console.error("❌ Error logging out:", error);
      // Optionally notify user of the error
    }
  }, [auth, setAuth, navigate]);

  return (
    // Theme responsive full-page container
    <div className="w-full min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors">
      {/* Header component with logout handler */}
      <Header handleLogout={handleLogout} />

      {/* Main Content Area: flex-1 ensures it takes remaining vertical space */}
      {/* pt-20 added to offset the likely sticky/fixed header (h-16) */}
      <main className="w-full px-4 sm:px-6 py-6 pt-20">
        <Routes>
          <Route element={<Layout />}>
            <Route
              path="/"
              element={<Home updateMovieReview={updateMovieReview} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {/* Protected routes wrapped by RequiredAuth */}
            <Route element={<RequiredAuth />}>
              <Route path="/recommended" element={<Recommended />} />
              <Route path="/review/:imdb_id" element={<Review />} />
              <Route path="/stream/:yt_id" element={<StreamMovie />} />
            </Route>

            {/* Catch-all route for 404 - optional */}
            {/* <Route path="*" element={<div>404 Not Found</div>} /> */}
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;
