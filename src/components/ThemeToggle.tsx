"use client";

import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button type="button" onClick={toggleTheme}>
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
}
