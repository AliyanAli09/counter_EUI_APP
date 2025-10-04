"use client";

import { useEffect } from "react";

type ShortcutMap = {
  [key: string]: () => void;
};

/**
 * useKeyboardShortcuts
 * 
 * @param shortcuts - key-to-callback mapping (e.g., { ArrowUp: increment })
 */
export function useKeyboardShortcuts(shortcuts: ShortcutMap) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key;

      if (shortcuts[key]) {
        event.preventDefault(); // prevent unwanted scrolling (esp. ArrowUp/ArrowDown)
        shortcuts[key]();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [shortcuts]);
}
