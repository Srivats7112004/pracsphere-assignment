// "use client" is not needed — this is a server component by default.

import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-dvh flex flex-col items-center justify-center text-center gap-4">
      <Loader2 className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Loading content, please wait…
      </p>
    </div>
  );
}
