import { connectDB, TaskModel } from "@repo/db";
import { getSessionUser } from "@/lib/auth";
import { Card } from "@repo/ui";
import ChartsClient from "./ChartsClient";         // Pie (status)
import BarChartClient from "./BarChartClient";     // Priority
import LineChartClient from "./LineChartClient";   // Trend

type Task = {
  title: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate?: string | null;
  createdAt: Date | string;
};

export const dynamic = "force-dynamic"; // ensure fresh
export const revalidate = 0;

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default async function AnalyticsPage() {
  const u = await getSessionUser();
  if (!u) return null;

  await connectDB();
  const rows = await TaskModel.find({ userId: u.uid }).sort({ createdAt: 1 }).lean<Task[]>();
  const tasks: Task[] = Array.isArray(rows) ? rows : [];

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const open = total - completed;
  const overdue = tasks.filter(t => {
    if (!t.dueDate) return false;
    const due = new Date((t.dueDate as any) as string);
    const today = new Date();
    return !t.completed && due < today;
  }).length;

  // Status pie
  const statusData = [
    { name: "Completed", value: completed },
    { name: "Open",      value: open },
  ];

  // Priority bar
  const byPriority = { low: 0, medium: 0, high: 0 } as Record<"low"|"medium"|"high", number>;
  tasks.forEach(t => { byPriority[t.priority] = (byPriority[t.priority] || 0) + 1; });
  const priorityData = [
    { name: "Low", value: byPriority.low },
    { name: "Medium", value: byPriority.medium },
    { name: "High", value: byPriority.high },
  ];

  // Creation trend (last 14 days)
  const days = 14;
  const mapByDay = new Map<string, number>();
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    mapByDay.set(ymd(d), 0);
  }
  tasks.forEach(t => {
    const key = ymd(new Date(t.createdAt));
    if (mapByDay.has(key)) mapByDay.set(key, (mapByDay.get(key) || 0) + 1);
  });
  const trendData = Array.from(mapByDay.entries()).map(([k, v]) => ({ name: k.slice(5), value: v })); // MM-DD label

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Analytics</h1>

      {/* KPIs */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <p className="text-sm opacity-70">Total Tasks</p>
          <p className="text-2xl font-bold">{total}</p>
        </Card>
        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <p className="text-sm opacity-70">Completed</p>
          <p className="text-2xl font-bold">{completed}</p>
        </Card>
        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <p className="text-sm opacity-70">Open</p>
          <p className="text-2xl font-bold">{open}</p>
        </Card>
        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <p className="text-sm opacity-70">Overdue</p>
          <p className="text-2xl font-bold">{overdue}</p>
        </Card>
      </section>

      {/* Charts */}
      <section className="grid gap-6 lg:grid-cols-2">
        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <h2 className="font-semibold mb-3">Status Distribution</h2>
          <ChartsClient data={statusData} />
        </Card>

        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <h2 className="font-semibold mb-3">By Priority</h2>
          <BarChartClient data={priorityData} />
        </Card>

        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800 lg:col-span-2">
          <h2 className="font-semibold mb-3">Tasks Created (Last 14 Days)</h2>
          <LineChartClient data={trendData} />
        </Card>
      </section>
    </div>
  );
}
