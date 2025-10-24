"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer, PieChart, Pie, Tooltip, Legend, Cell,
} from "recharts";

type Datum = { name: string; value: number };

// Tailwind-friendly palette (works in light/dark)
const PALETTE = [
  "#22c55e", // emerald
  "#3b82f6", // blue
  "#f59e0b", // amber
  "#ef4444", // red
  "#a78bfa", // violet
];

export default function ChartsClient({ data }: { data?: Datum[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safe = Array.isArray(data) ? data : [];

  if (!mounted) return <div className="w-full h-72" />;
  if (safe.length === 0)
    return <div className="w-full h-72 grid place-items-center text-sm opacity-70">No data</div>;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={safe}
            dataKey="value"
            nameKey="name"
            innerRadius={60}
            outerRadius={90}
            isAnimationActive={false}
          >
            {safe.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
