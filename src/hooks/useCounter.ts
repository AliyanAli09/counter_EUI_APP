import { useState, useEffect } from "react";

export const useCounter = (initialValue = 0, initialStep = 1) => {
  // ✅ States
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number>(initialStep);
  const [history, setHistory] = useState<number[]>([initialValue]);
  const [undoStack, setUndoStack] = useState<number[]>([]);
  const [redoStack, setRedoStack] = useState<number[]>([]);

  // ✅ Load saved state on client (once)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCount = localStorage.getItem("counter-count");
      const savedStep = localStorage.getItem("counter-step");
      const savedHistory = localStorage.getItem("counter-history");
      const savedUndo = localStorage.getItem("counter-undo");
      const savedRedo = localStorage.getItem("counter-redo");

      if (savedCount) setCount(JSON.parse(savedCount));
      if (savedStep) setStep(JSON.parse(savedStep));
      if (savedHistory) setHistory(JSON.parse(savedHistory));
      if (savedUndo) setUndoStack(JSON.parse(savedUndo));
      if (savedRedo) setRedoStack(JSON.parse(savedRedo));
    }
  }, []);

  // ✅ Persist state changes to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("counter-count", JSON.stringify(count));
    }
  }, [count]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("counter-step", JSON.stringify(step));
    }
  }, [step]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("counter-history", JSON.stringify(history));
    }
  }, [history]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("counter-undo", JSON.stringify(undoStack));
    }
  }, [undoStack]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("counter-redo", JSON.stringify(redoStack));
    }
  }, [redoStack]);

  // ------------------ Helpers ------------------
  const updateHistory = (newValue: number) => {
    setHistory((prev) => [...prev, newValue]);
  };

  // ------------------ Actions ------------------
  const increment = () => {
    setUndoStack((prev) => [...prev, count]);
    setRedoStack([]);
    setCount((prev) => {
      const newValue = prev + step;
      updateHistory(newValue);
      return newValue;
    });
  };

  const decrement = () => {
    setUndoStack((prev) => [...prev, count]);
    setRedoStack([]);
    setCount((prev) => {
      const newValue = Math.max(prev - step, 0); // ✅ no negative
      updateHistory(newValue);
      return newValue;
    });
  };

  const reset = () => {
    setUndoStack((prev) => [...prev, count]);
    setRedoStack([]);
    setCount(initialValue);
    updateHistory(initialValue);
  };

  const undo = () => {
    setUndoStack((prevUndo) => {
      if (prevUndo.length === 0) return prevUndo;

      const prevValue = prevUndo[prevUndo.length - 1];
      setRedoStack((prevRedo) => [...prevRedo, count]);
      setCount(prevValue);
      updateHistory(prevValue);
      return prevUndo.slice(0, -1); // remove last
    });
  };

  const redo = () => {
    setRedoStack((prevRedo) => {
      if (prevRedo.length === 0) return prevRedo;

      const nextValue = prevRedo[prevRedo.length - 1];
      setUndoStack((prevUndo) => [...prevUndo, count]);
      setCount(nextValue);
      updateHistory(nextValue);
      return prevRedo.slice(0, -1); // remove last
    });
  };

  return {
    count,
    step,
    setStep,
    increment,
    decrement,
    reset,
    undo,
    redo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0,
    history, // ✅ persists across refresh
  };
};
