import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { connectDB, UserModel } from "@repo/db";

export async function GET() {
  const u = await getSessionUser();
  if (!u) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await connectDB();
  const user = await UserModel.findById(u.uid)
    .select("name email image phone bio")
    .lean<{ name: string; email: string; image?: string; phone?: string; bio?: string } | null>();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(req: Request) {
  const u = await getSessionUser();
  if (!u) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const payload = await req.json(); // { name?, phone?, bio?, image? }
  const set: Record<string, any> = {};
  ["name", "phone", "bio", "image"].forEach((k) => {
    if (k in payload) set[k] = payload[k] ?? "";
  });

  await connectDB();
  await UserModel.updateOne({ _id: u.uid }, { $set: set });

  const user = await UserModel.findById(u.uid)
    .select("name email image phone bio")
    .lean();

  return NextResponse.json({ ok: true, user });
}
