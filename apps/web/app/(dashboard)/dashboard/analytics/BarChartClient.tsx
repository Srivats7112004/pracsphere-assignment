"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Cell
} from "recharts";

type Datum = { name: string; value: number };
const PALETTE = ["#60a5fa", "#f59e0b", "#ef4444"]; // blue, amber, red

export default function BarChartClient({ data }: { data?: Datum[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safe = Array.isArray(data) ? data : [];

  if (!mounted) return <div className="w-full h-72" />;
  if (safe.length === 0)
    return <div className="w-full h-72 grid place-items-center text-sm opacity-70">No data</div>;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={safe}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" isAnimationActive={false}>
            {safe.map((_, i) => (
              <Cell key={i} fill={PALETTE[i % PALETTE.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
