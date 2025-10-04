import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes"; // Use next-themes hook instead of custom useTheme

export function ThemeToggleButton() {
  const { theme, setTheme } = useTheme(); // Using `theme` and `setTheme` from next-themes

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark"); // Toggle between dark and light
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`relative w-7 h-7 flex items-center justify-center rounded-full
                 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1
                 ${
                   theme === "dark"
                     ? "bg-gray-700 hover:bg-gray-600 text-yellow-400 focus:ring-yellow-500 focus:ring-offset-gray-900"
                     : "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-blue-500 focus:ring-offset-white"
                 }
                 active:scale-95`}
    >
      {/* Icon Wrapper */}
      <div className="relative w-4 h-4">
        <Sun
          className={`absolute w-4 h-4 transition-all duration-300
                      ${
                        theme === "dark"
                          ? "opacity-0 scale-0 rotate-90"
                          : "opacity-100 scale-100 rotate-0"
                      }`}
        />
        <Moon
          className={`absolute w-4 h-4 transition-all duration-300
                      ${
                        theme === "dark"
                          ? "opacity-100 scale-100 rotate-0"
                          : "opacity-0 scale-0 -rotate-90"
                      }`}
        />
      </div>
    </button>
  );
}
