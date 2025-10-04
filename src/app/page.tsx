"use client";

import {
  EuiPageTemplate,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiHorizontalRule,
  EuiButton,
} from "@elastic/eui";
import CounterDisplay from "../components/CounterDisplay";
import CounterControls from "../components/CounterControls";
import StepControl from "../components/StepControl";
import { useCounter } from "../hooks/useCounter";
import { useKeyboardShortcuts } from "../hooks/useKeyboardShortcuts";
import ThemeToggle from "../components/ThemeToggle";
import HistorySidebar from "../components/HistorySidebar";
import { useState } from "react";

export default function HomePage() {
  const {
    count,
    step,
    setStep,
    increment,
    decrement,
    reset,
    undo,
    redo,
    canUndo,
    canRedo,
    history,
  } = useCounter(0, 1);

  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useKeyboardShortcuts({
    ArrowUp: increment,
    ArrowDown: decrement,
    r: reset,
    R: reset,
    u: undo,
    U: undo,
    y: redo,
    Y: redo,
  });

  return (
    <EuiPageTemplate restrictWidth={600} paddingSize="l">
      <EuiPanel style={{ textAlign: "center", margin: "0 auto" }} paddingSize="xl">
        <ThemeToggle />

        <EuiTitle size="l">
          <h1>Modern Counter App</h1>
        </EuiTitle>

        <EuiSpacer size="m" />

        <EuiFlexGroup justifyContent="center">
          <EuiFlexItem grow={false}>
            <CounterDisplay value={count} />
          </EuiFlexItem>
        </EuiFlexGroup>

        <EuiSpacer size="l" />
        <EuiHorizontalRule />
        <EuiSpacer size="l" />

        <CounterControls
          onIncrement={increment}
          onDecrement={decrement}
          onReset={reset}
          onUndo={undo}
          onRedo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
          isDecrementDisabled={count <= 0}
        />

        <EuiSpacer size="l" />

        <StepControl step={step} onChange={setStep} min={1} max={100} />

        <EuiSpacer size="xl" />

        <EuiButton onClick={() => setIsHistoryOpen(true)}>Show History</EuiButton>
      </EuiPanel>

      {/* History Sidebar */}
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
      />
    </EuiPageTemplate>
  );
}
