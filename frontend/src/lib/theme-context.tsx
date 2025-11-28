"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { safeStorage } from "./storage-helper";

export type Theme = "dark" | "warm" | "cool" | "neon" | "classic" | "sakura";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const isLoginPage = window.location.pathname === '/';
    if (isLoginPage) {
      setTheme("dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      try {
        const saved = safeStorage.getItem("shiroa-theme") as Theme;
        if (saved) {
          setTheme(saved);
        }
      } catch (e) {
        console.warn('Storage not available');
      }
    }
  }, []);

  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    try {
      safeStorage.setItem("shiroa-theme", newTheme);
    } catch (e) {
      console.warn('Storage not available');
    }
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
}
