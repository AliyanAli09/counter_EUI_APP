"use client";

import {
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiTitle,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiPanel,
} from "@elastic/eui";
import { saveAs } from "file-saver";
import { Parser } from "json2csv";
import jsPDF from "jspdf";
import { useCallback } from "react";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  history: number[];
}

export default function HistorySidebar({
  isOpen,
  onClose,
  history,
}: HistorySidebarProps) {
  if (!isOpen) return null;

  // ✅ Export JSON
  const exportJSON = useCallback(() => {
    const blob = new Blob([JSON.stringify(history, null, 2)], {
      type: "application/json",
    });
    saveAs(blob, "counter-history.json");
  }, [history]);

  // ✅ Export CSV
  const exportCSV = useCallback(() => {
    const parser = new Parser({ fields: ["value"] });
    const csv = parser.parse(history.map((value) => ({ value })));
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "counter-history.csv");
  }, [history]);

  // ✅ Export PDF
  const exportPDF = useCallback(() => {
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Counter History", 10, 10);
    history.forEach((val, i) => {
      doc.text(`${i + 1}. ${val}`, 10, 20 + i * 10);
    });
    doc.save("counter-history.pdf");
  }, [history]);

  return (
    <EuiFlyout ownFocus onClose={onClose} size="s" aria-labelledby="history">
      <EuiFlyoutHeader hasBorder>
        <EuiTitle size="m">
          <h2 id="history">Counter History</h2>
        </EuiTitle>
      </EuiFlyoutHeader>

      <EuiFlyoutBody>
        <EuiPanel paddingSize="s" style={{ maxHeight: "300px", overflowY: "auto" }}>
          {history.length === 0 ? (
            <EuiText size="s">No history yet</EuiText>
          ) : (
            history.map((val, i) => (
              <EuiText key={i} size="s">
                {i + 1}. {val}
              </EuiText>
            ))
          )}
        </EuiPanel>

        <EuiSpacer size="l" />

        {/* Export buttons */}
        <EuiFlexGroup gutterSize="s" wrap>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={exportJSON} size="s" fill>
              Export JSON
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={exportCSV} size="s">
              Export CSV
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton onClick={exportPDF} size="s">
              Export PDF
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiFlyoutBody>
    </EuiFlyout>
  );
}
