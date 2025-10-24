"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center gap-4 p-6">
      <AlertTriangle className="h-10 w-10 text-red-600 dark:text-red-400" />
      <div>
        <h2 className="text-lg font-semibold mb-1">Something went wrong</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          An unexpected error occurred. Please try again.
        </p>
      </div>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all"
      >
        <RotateCcw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  );
}
