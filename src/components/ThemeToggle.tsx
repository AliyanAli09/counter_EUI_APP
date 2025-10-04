"use client";

import { EuiSwitch } from "@elastic/eui";
import { useTheme } from "../app/layout"; // import from RootLayout

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <EuiSwitch
      label={isDark ? " Dark Mode" : " Light Mode"}
      checked={isDark}
      onChange={toggleTheme}
      showLabel={true}
    />
  );
}
