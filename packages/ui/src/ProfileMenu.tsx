"use client";
import { useState, useRef, useEffect } from "react";

type Props = {
  name: string;
  email: string;
  image?: string;        // ✅ new
  logoutHref?: string;   // ✅ simple server-safe logout
};

export function ProfileMenu({ name, email, image, logoutHref = "/api/auth/logout" }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => { if (!ref.current?.contains(e.target as any)) setOpen(false); };
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  const initials = (name || "U")
    .split(" ")
    .map((p) => p[0]?.toUpperCase())
    .join("")
    .slice(0, 2);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 rounded-full border px-2 py-1.5 hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        {/* Avatar circle */}
        <span className="relative inline-flex h-8 w-8 overflow-hidden rounded-full border">
          {image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt="avatar" className="h-full w-full object-cover" />
          ) : (
            <span className="grid h-full w-full place-items-center text-xs font-semibold">
              {initials}
            </span>
          )}
        </span>
        <span className="hidden sm:inline font-medium">{name}</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-56 rounded-xl border bg-white p-3 shadow-md dark:bg-black/60 dark:border-gray-800 backdrop-blur">
          <div className="mb-2">
            <p className="font-medium">{name}</p>
            <p className="text-xs opacity-70 break-all">{email}</p>
          </div>
          <form action={logoutHref} method="POST">
            <button
              type="submit"
              className="w-full rounded-lg border px-3 py-2 text-left hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              Logout
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
