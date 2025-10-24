"use client";
import { useEffect, useState } from "react";
import {
  ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from "recharts";

type Datum = { name: string; value: number };

export default function LineChartClient({ data }: { data?: Datum[] }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const safe = Array.isArray(data) ? data : [];

  if (!mounted) return <div className="w-full h-72" />;
  if (safe.length === 0)
    return <div className="w-full h-72 grid place-items-center text-sm opacity-70">No data</div>;

  return (
    <div className="w-full h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={safe}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          {/* blue stroke, thicker for visibility */}
          <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
