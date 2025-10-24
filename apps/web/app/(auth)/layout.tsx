// apps/web/app/(auth)/layout.tsx
import type { ReactNode } from "react";

export const metadata = {
  title: "Authentication | PracSphere",
  description: "Login or sign up to access your workspace",
};

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <section className="w-full max-w-md p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg border dark:border-gray-800">
        {children}
      </section>
    </main>
  );
}
