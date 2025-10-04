import { useTheme } from "next-themes";
import { type FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <main
      className={`
        min-h-screen w-full
        transition-colors duration-300
        ${
          resolvedTheme === "dark"
            ? "bg-gray-900 text-white"
            : "bg-gray-50 text-gray-900"
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
