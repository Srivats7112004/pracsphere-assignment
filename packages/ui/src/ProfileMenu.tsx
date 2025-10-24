"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  name: string;
  email: string;
  /** Preferred prop */
  avatarUrl?: string | null;
  /** Back-compat: allow `image` too */
  image?: string | null;
  onLogout?: () => void | Promise<void>;
};

export function ProfileMenu({ name, email, avatarUrl, image, onLogout }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as any)) setOpen(false);
    };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const photo = avatarUrl ?? image ?? null;
  const initial = name?.[0]?.toUpperCase() || "U";

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="rounded-full border px-3 py-1 flex items-center gap-2
                   dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition"
      >
        {photo ? (
          <img src={photo} alt={name} className="h-6 w-6 rounded-full object-cover" />
        ) : (
          <span className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 grid place-items-center text-xs">
            {initial}
          </span>
        )}
        <span className="hidden sm:inline">{name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-xl border bg-white p-3 shadow-md
                        dark:bg-gray-900 dark:border-gray-800">
          <div className="mb-3">
            <p className="font-medium">{name}</p>
            <p className="text-xs opacity-70">{email}</p>
          </div>
          {onLogout ? (
            <button
              onClick={onLogout}
              className="w-full rounded-lg border px-3 py-2 text-left hover:bg-gray-50
                         dark:hover:bg-gray-800 dark:border-gray-700"
            >
              Logout
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
