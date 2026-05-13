"use client";

import { useContext, createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { ThemeContextType } from "@/types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  // Move applyTheme before the effect that uses it
  const applyTheme = (dark: boolean) => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Use lazy initialization to set initial state from system preference
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window === "undefined") return false; // SSR safety
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  // Separate effect to apply theme whenever state changes
  useEffect(() => {
    applyTheme(isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
  };

  return (
    <ThemeContext value={{ isDarkMode, toggleTheme }}>{children}</ThemeContext>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
