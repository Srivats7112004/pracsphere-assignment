// apps/web/app/api/tasks/[id]/route.ts
import { NextResponse } from "next/server";
import { connectDB, TaskModel } from "@repo/db";
import { getSessionUser } from "@/lib/auth";

type Params = { id: string };

export async function GET(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  await connectDB();
  const u = await getSessionUser();
  if (!u) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const task = await TaskModel.findOne({ _id: id, userId: u.uid }).lean();
  if (!task) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ task });
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  await connectDB();
  const u = await getSessionUser();
  if (!u) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const updated = await TaskModel.findOneAndUpdate(
    { _id: id, userId: u.uid },
    body,
    { new: true }
  ).lean();

  if (!updated) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ task: updated });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<Params> }
) {
  const { id } = await params;
  await connectDB();
  const u = await getSessionUser();
  if (!u) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const deleted = await TaskModel.findOneAndDelete({ _id: id, userId: u.uid }).lean();
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
