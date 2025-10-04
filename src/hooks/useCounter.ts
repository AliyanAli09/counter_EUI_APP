import { useState, useEffect } from "react";

export const useCounter = (initialValue = 0, initialStep = 1) => {
  // Load from localStorage if exists, else use defaults
  const [count, setCount] = useState<number>(() => {
    const saved = localStorage.getItem("counter-count");
    return saved ? JSON.parse(saved) : initialValue;
  });

  const [step, setStep] = useState<number>(() => {
    const saved = localStorage.getItem("counter-step");
    return saved ? JSON.parse(saved) : initialStep;
  });

  const [history, setHistory] = useState<number[]>(() => {
    const saved = localStorage.getItem("counter-history");
    return saved ? JSON.parse(saved) : [initialValue];
  });

  const [undoStack, setUndoStack] = useState<number[]>(() => {
    const saved = localStorage.getItem("counter-undo");
    return saved ? JSON.parse(saved) : [];
  });

  const [redoStack, setRedoStack] = useState<number[]>(() => {
    const saved = localStorage.getItem("counter-redo");
    return saved ? JSON.parse(saved) : [];
  });

  // 🔄 Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("counter-count", JSON.stringify(count));
  }, [count]);

  useEffect(() => {
    localStorage.setItem("counter-step", JSON.stringify(step));
  }, [step]);

  useEffect(() => {
    localStorage.setItem("counter-history", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem("counter-undo", JSON.stringify(undoStack));
  }, [undoStack]);

  useEffect(() => {
    localStorage.setItem("counter-redo", JSON.stringify(redoStack));
  }, [redoStack]);

  // ------------------ Actions ------------------
  const updateHistory = (newValue: number) => {
    setHistory((prev) => [...prev, newValue]);
  };

  const increment = () => {
    const newValue = count + step;
    setUndoStack([...undoStack, count]);
    setRedoStack([]);
    setCount(newValue);
    updateHistory(newValue);
  };

  const decrement = () => {
    if (count > 0) {
      const newValue = count - step;
      setUndoStack([...undoStack, count]);
      setRedoStack([]);
      setCount(newValue);
      updateHistory(newValue);
    }
  };

  const reset = () => {
    setUndoStack([...undoStack, count]);
    setRedoStack([]);
    setCount(initialValue);
    updateHistory(initialValue);
  };

  const undo = () => {
    if (undoStack.length > 0) {
      const prev = undoStack.pop()!;
      setRedoStack([...redoStack, count]);
      setCount(prev);
      updateHistory(prev);
    }
  };

  const redo = () => {
    if (redoStack.length > 0) {
      const next = redoStack.pop()!;
      setUndoStack([...undoStack, count]);
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
    history, // ✅ stays after refresh
  };
};
