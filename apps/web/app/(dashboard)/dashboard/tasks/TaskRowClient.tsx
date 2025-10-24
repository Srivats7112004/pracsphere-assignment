// apps/web/app/(dashboard)/dashboard/tasks/TaskRowClient.tsx
"use client";
import { useEffect, useState } from "react";
import { Card, Button, Input } from "@repo/ui";
import { useRouter } from "next/navigation";

// 🔒 deterministic date formatter: same on server & client
const DATE_FMT = new Intl.DateTimeFormat("en-GB", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  timeZone: "UTC",
});
function formatDueDate(iso: string) {
  // If you store plain "YYYY-MM-DD", force UTC midnight to avoid TZ shift
  const d = iso.length === 10 ? new Date(iso + "T00:00:00Z") : new Date(iso);
  return DATE_FMT.format(d);
}

type TaskPlain = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "low" | "medium" | "high";
  dueDate: string | null;
  tags: string[];
  createdAt: string;
};

export default function TaskRowClient({ task }: { task: TaskPlain }) {
  const router = useRouter();
  const [editorOpen, setEditorOpen] = useState(false);

  const overdue =
    task.dueDate && !task.completed && new Date(task.dueDate) < new Date();

  async function toggle() {
    await fetch(`/api/tasks/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !task.completed }),
    });
    router.refresh();
  }

  async function remove() {
    await fetch(`/api/tasks/${task.id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <>
      <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800 hover:shadow-lg transition">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            {/* chips ... (unchanged) */}

            <div className="mt-2">
              <p className="font-medium break-words">{task.title}</p>
              {task.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {task.description}
                </p>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                {task.dueDate
                  ? `Due: ${formatDueDate(task.dueDate)}`
                  : "No due date"}
                {task.tags?.length ? ` • ${task.tags.join(", ")}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button onClick={toggle}>
              {task.completed ? "Undo" : "Complete"}
            </Button>
            <Button onClick={() => setEditorOpen(true)}>Edit</Button>
            <Button variant="destructive" onClick={remove}>
              Delete
            </Button>
          </div>
        </div>
      </Card>

      {/* editor modal ... (unchanged) */}
    </>
  );
}
