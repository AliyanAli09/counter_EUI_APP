"use client";
import { EuiProvider, EuiLoadingLogo } from "@elastic/eui";
import "../styles/globals.css"; 
import React, { createContext, useState, useContext, useEffect } from "react";

// Context for theme
const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({ isDark: false, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Simulate loader for 600ms
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  return (
    <html lang="en">
      <body>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <EuiProvider colorMode={isDark ? "dark" : "light"}>
            {loading ? (
              <div className="flex items-center justify-center h-screen w-screen bg-white dark:bg-gray-900">
                <EuiLoadingLogo logo="logoElastic" size="xl" />
              </div>
            ) : (
              children
            )}
          </EuiProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
