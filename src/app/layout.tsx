"use client";

import React, { createContext, useState, useContext } from "react";
import { EuiProvider } from "@elastic/eui";

// Context for theme
const ThemeContext = createContext<{
  isDark: boolean;
  toggleTheme: () => void;
}>({ isDark: false, toggleTheme: () => {} });

export const useTheme = () => useContext(ThemeContext);

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <html lang="en">
      <body>
        <ThemeContext.Provider value={{ isDark, toggleTheme }}>
          <EuiProvider colorMode={isDark ? "dark" : "light"}>
            {children}
          </EuiProvider>
        </ThemeContext.Provider>
      </body>
    </html>
  );
}
