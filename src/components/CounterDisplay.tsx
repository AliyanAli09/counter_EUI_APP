// src/components/CounterDisplay.tsx
"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useAnimatedNumber from "./useAnimatedNumber";
import { EuiText } from "@elastic/eui";

interface CounterDisplayProps {
  value: number;
  /**
   * Optional:
   * - duration (seconds) for the numeric tween
   * - className for custom styling
   */
  duration?: number;
  className?: string;
}

/**
 * CounterDisplay
 * - Animates numeric changes (smooth count)
 * - Adds a subtle entrance/bounce each time the value changes
 * - Accessible: uses aria-live="polite"
 */
export default function CounterDisplay({
  value,
  duration = 0.45,
  className = "",
}: CounterDisplayProps) {
  // useAnimatedNumber returns a string (we round inside hook)
  const displayed = useAnimatedNumber(value, { duration });

  return (
    <div aria-live="polite" aria-atomic="true" className={className}>
      <AnimatePresence mode="wait">
        {/* key on `value` causes re-animation on each change */}
        <motion.div
          key={value}
          initial={{ scale: 0.92, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.92, opacity: 0, transition: { duration: 0.12 } }}
          transition={{ type: "spring", stiffness: 500, damping: 28 }}
          style={{ display: "inline-block" }}
        >
          <EuiText>
            <h1 style={{ fontSize: "3rem", margin: 0, fontWeight: 700 }}>
              {displayed}
            </h1>
          </EuiText>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
