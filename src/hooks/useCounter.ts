import { useState, useEffect } from "react";

export const useCounter = (initialValue = 0, initialStep = 1) => {
  // ✅ Safe defaults for SSR
  const [count, setCount] = useState<number>(initialValue);
  const [step, setStep] = useState<number>(initialStep);
  const [history, setHistory] = useState<number[]>([initialValue]);
  const [undoStack, setUndoStack] = useState<number[]>([]);
  const [redoStack, setRedoStack] = useState<number[]>([]);

  // ✅ Load from localStorage only on client
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

  // ✅ Persist changes to localStorage
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

  // ------------------ Actions ------------------
  const updateHistory = (newValue: number) => {
    setHistory((prev) => [...prev, newValue]);
  };

  const increment = () => {
    const newValue = count + step;
    setUndoStack((prev) => [...prev, count]);
    setRedoStack([]);
    setCount(newValue);
    updateHistory(newValue);
  };

  const decrement = () => {
    if (count > 0) {
      const newValue = count - step;
      setUndoStack((prev) => [...prev, count]);
      setRedoStack([]);
      setCount(newValue);
      updateHistory(newValue);
    }
  };

  const reset = () => {
    setUndoStack((prev) => [...prev, count]);
    setRedoStack([]);
    setCount(initialValue);
    updateHistory(initialValue);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prev = undoStack[undoStack.length - 1];
      setUndoStack((prev) => prev.slice(0, -1));
      setRedoStack((prev) => [...prev, count]);
      setCount(prev);
      updateHistory(prev);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack[redoStack.length - 1];
      setRedoStack((prev) => prev.slice(0, -1));
      setUndoStack((prev) => [...prev, count]);
      setCount(next);
      updateHistory(next);
    }
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
    history,
  };
};
