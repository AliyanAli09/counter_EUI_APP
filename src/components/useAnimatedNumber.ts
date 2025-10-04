// src/components/useAnimatedNumber.ts
"use client";

import { useEffect, useRef, useState } from "react";
import { animate, motionValue } from "framer-motion";

/**
 * useAnimatedNumber
 * - Smoothly animates a numeric value from previous -> next
 * - Returns a string suitable for rendering (you can format if you want)
 *
 * Params:
 *   value: number - target value
 *   { duration } - animation duration in seconds (optional)
 *
 * Returns:
 *   displayed (string) - the animated value (formatted)
 */
export default function useAnimatedNumber(
  value: number,
  { duration = 0.5 }: { duration?: number } = {}
) {
  const mv = useRef(motionValue(value)); // persistent motion value
  const [displayed, setDisplayed] = useState<string>(() => String(value));

  // Keep motionValue synced if initial changes externally (edge-case)
  useEffect(() => {
    mv.current.set(value);
    setDisplayed(String(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  useEffect(() => {
    // animate motion value from current -> value
    const controls = animate(mv.current, value, {
      type: "spring",
      stiffness: 200,
      damping: 22,
      mass: 1,
      duration, // fallback for non-spring, but spring will be used
      onUpdate: (v) => {
        // format the visible number. Round to integer for counters.
        setDisplayed(String(Math.round(v)));
      },
    });

    return () => controls.stop();
  }, [value, duration]);

  return displayed;
}
