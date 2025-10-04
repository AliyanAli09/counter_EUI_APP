"use client";

import { EuiButton, EuiFlexGroup, EuiFlexItem, EuiSpacer } from "@elastic/eui";

interface CounterControlsProps {
  onIncrement: () => void;
  onDecrement: () => void;
  onReset: () => void;
  onUndo: () => void;
  onRedo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  isDecrementDisabled: boolean;
}

export default function CounterControls({
  onIncrement,
  onDecrement,
  onReset,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
  isDecrementDisabled,
}: CounterControlsProps) {
  return (
    <>
      {/* Main Controls: Increment, Decrement, Reset */}
      <EuiFlexGroup justifyContent="center" gutterSize="m">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onDecrement} isDisabled={isDecrementDisabled} color="danger">
            - Decrement
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onIncrement} fill color="primary">
            + Increment
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onReset} color="warning" iconType="refresh">
            Reset
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>

      <EuiSpacer size="m" />

      {/* History Controls: Undo, Redo */}
      <EuiFlexGroup justifyContent="center" gutterSize="s">
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onUndo} isDisabled={!canUndo} iconType="undo" size="s">
            Undo
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem grow={false}>
          <EuiButton onClick={onRedo} isDisabled={!canRedo} iconType="redo" size="s">
            Redo
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
}