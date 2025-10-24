// Works on both local and serverless:
// - If CLOUDINARY_URL is present => uploads to Cloudinary (persistent for prod)
// - Else => saves to /public/uploads (good for local dev)
//
// NOTE: This route requires Node runtime (fs usage).
export const runtime = "nodejs";

import { NextResponse } from "next/server";

import { writeFile, mkdir } from "fs/promises";
import path from "path";

// Cloudinary is only used if CLOUDINARY_URL exists
import { v2 as cloudinary } from "cloudinary";
const hasCloudinary = !!process.env.CLOUDINARY_URL;
if (hasCloudinary) {
  cloudinary.config({ secure: true }); // CLOUDINARY_URL is auto-read
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Use Cloudinary if configured
    if (hasCloudinary) {
      const res = await new Promise<{ secure_url: string }>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "pracsphere/avatars",
            resource_type: "image",
            // You can also set public_id to user id if you want to overwrite.
          },
          (err, result) => (err ? reject(err) : resolve(result as any))
        );
        stream.end(buffer);
      });

      return NextResponse.json({ url: res.secure_url });
    }

    // Otherwise write locally (dev)
    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await mkdir(uploadDir, { recursive: true });

    const safeName = file.name.replace(/\s+/g, "_").replace(/[^\w.\-]/g, "");
    const filename = `${Date.now()}-${safeName}`;
    const filepath = path.join(uploadDir, filename);

    await writeFile(filepath, buffer);
    // public URL for Next static files
    const url = `/uploads/${filename}`;

    return NextResponse.json({ url });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: err?.message || "Upload failed" }, { status: 500 });
  }
}
