import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeToggleButton } from "./ToggleThemeButton";
import type { FC } from "react";
import useAuth from "../hooks/useAuth";
import { useTheme } from "next-themes";

interface HeaderProps {
  handleLogout: () => void;
}

const Header: FC<HeaderProps> = ({ handleLogout }) => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const { resolvedTheme } = useTheme();

  const navItems: { name: string; path: string }[] = [
    { name: "Home", path: "/" },
    { name: "Recommended", path: "/recommended" },
  ];

  return (
    <header
      className={`fixed inset-0 h-fit z-50 w-full border-b backdrop-blur-md shadow-sm transition-colors duration-300 ${
        resolvedTheme === "dark"
          ? "bg-gray-900/90 border-gray-700"
          : "bg-white/90 border-gray-200"
      }`}
    >
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className={`flex items-center text-xl font-bold tracking-tight transition-colors ${
              resolvedTheme === "dark"
                ? "text-gray-200 hover:text-cyan-400"
                : "text-gray-900 hover:text-cyan-600"
            }`}
          >
            Magic Stream
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `text-sm font-medium transition-colors ${
                    isActive
                      ? resolvedTheme === "dark"
                        ? "text-cyan-400"
                        : "text-cyan-600"
                      : resolvedTheme === "dark"
                      ? "text-gray-300 hover:text-cyan-400"
                      : "text-gray-600 hover:text-cyan-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-4">
            <ThemeToggleButton />

            {auth ? (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    resolvedTheme === "dark" ? "text-gray-200" : "text-gray-900"
                  }`}
                >
                  Hello, <strong>{auth.first_name}</strong>
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className={`px-3 py-1.5 rounded-md border text-sm font-medium transition-colors cursor-pointer ${
                    resolvedTheme === "dark"
                      ? "border-gray-700 text-gray-200 hover:bg-gray-800"
                      : "border-gray-300 text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="px-3 py-1.5 rounded-md border border-cyan-500 text-cyan-500 text-sm font-medium hover:bg-cyan-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="px-3 py-1.5 rounded-md bg-cyan-500 text-white text-sm font-medium hover:bg-cyan-600 transition-colors cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
