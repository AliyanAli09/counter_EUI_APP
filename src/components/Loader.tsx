"use client";

import { EuiLoadingLogo } from "@elastic/eui";

export default function Loader() {
  return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-white dark:bg-gray-900">
      <EuiLoadingLogo logo="logoElastic" size="xl" />
    </div>
  );
}
