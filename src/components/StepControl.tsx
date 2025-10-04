"use client";

import { useState, useEffect } from "react";
import {
  EuiFormRow,
  EuiRange,
  EuiFieldNumber,
  EuiFlexGroup,
  EuiFlexItem,
  useGeneratedHtmlId,
  type EuiRangeProps,
} from "@elastic/eui";

interface StepControlProps {
  step: number;
  onChange: (newStep: number) => void;
  min?: number;
  max?: number;
}

export default function StepControl({
  step,
  onChange,
  min = 1,
  max = 100, // Matching the max from HomePage
}: StepControlProps) {
  const clamp = (n: number) => Math.max(min, Math.min(max, Math.floor(n)));

  const [sliderValue, setSliderValue] = useState<number>(step);
  const [inputValue, setInputValue] = useState<string>(String(step));

  const inputRangeSliderId = useGeneratedHtmlId({ prefix: "inputRangeSlider" });

  useEffect(() => {
    setSliderValue(step);
    setInputValue(String(step));
  }, [step]);

  // Slider change
  const handleRangeChange: EuiRangeProps["onChange"] = (event, isValid) => {
    if (!isValid) return;
    const newStep = clamp(Number(event.currentTarget.value));
    setSliderValue(newStep);
    setInputValue(String(newStep));
    onChange(newStep);
  };

  // Number change
  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    setInputValue(raw);
    if (raw === "") return;

    const numeric = clamp(Number(raw));
    setSliderValue(numeric);
    onChange(numeric);
  };

  const handleNumberBlur = () => {
    if (inputValue === "") {
      setInputValue(String(min));
      setSliderValue(min);
      onChange(min);
    }
  };

  return (
    <EuiFlexGroup alignItems="center" gutterSize="l">
      <EuiFlexItem grow={2}>
        <EuiFormRow label={`Set Step Size (Current: ${step})`}>
          <EuiRange
            id={inputRangeSliderId}
            min={min}
            max={max}
            value={sliderValue} // number
            onChange={handleRangeChange}
            showValue
            // Adjusted tick interval and added a label for better understanding
            showTicks
            tickInterval={10} 
            aria-label="Step size slider"
          />
        </EuiFormRow>
      </EuiFlexItem>
      <EuiFlexItem grow={1}>
        <EuiFormRow label="Manual Input">
          <EuiFieldNumber
            min={min}
            max={max}
            value={inputValue}
            onChange={handleNumberChange}
            onBlur={handleNumberBlur}
            placeholder="Step"
          />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}