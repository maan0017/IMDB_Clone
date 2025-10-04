import React, { useEffect, type FC } from "react";
import { ThemeProvider as NextThemeProvider, useTheme } from "next-themes";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  return (
    <NextThemeProvider defaultTheme="light" attribute="class">
      <ThemeKeyListener />
      {children}
    </NextThemeProvider>
  );
};

// Component that listens for the 't' key press to toggle the theme
const ThemeKeyListener: React.FC = () => {
  const { setTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Check if the event target is an input or textarea element
      const isInputField =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;

      // If the user is typing in an input/textarea, don't trigger theme change
      if (isInputField) return;

      if (event.key === "t" || event.key === "T") {
        // Toggle theme on 't' key press
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
      }
    };

    // Attach the event listener on mount
    window.addEventListener("keydown", handleKeyDown);

    // Cleanup the event listener on unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [setTheme]);

  return null;
};

export default ThemeProvider;
