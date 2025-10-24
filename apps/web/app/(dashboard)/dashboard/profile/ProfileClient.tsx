"use client";
import { useState } from "react";
import { Card, Button, Input } from "@repo/ui";

type Props = {
  name: string;
  email: string;
  phone: string;
  bio: string;
  image: string;
};

export default function ProfileClient(props: Props) {
  const [name, setName] = useState(props.name);
  const [phone, setPhone] = useState(props.phone);
  const [bio, setBio] = useState(props.bio);
  const [image, setImage] = useState(props.image);
  const [preview, setPreview] = useState(props.image);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  async function uploadPhoto(file: File) {
    setMsg(null);
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/profile/upload", { method: "POST", body: fd });
    const j = await r.json();
    if (!r.ok) throw new Error(j.error || "Upload failed");
    setPreview(j.url);
    setImage(j.url);
  }

  async function saveAll() {
    setBusy(true);
    setMsg(null);
    const r = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, bio, image }),
    });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    setMsg(r.ok ? "✅ Saved" : j.error || "Failed to save");
  }

  return (
    <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
      <h2 className="font-semibold mb-3">Profile</h2>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-3">
          <div>
            <label className="text-sm block mb-1">Email</label>
            <Input value={props.email} disabled />
          </div>
          <div>
            <label className="text-sm block mb-1">Name</label>
            <Input value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block mb-1">Phone</label>
            <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
          <div>
            <label className="text-sm block mb-1">Bio</label>
            <textarea
              className="w-full rounded-xl border px-3 py-2 h-24 bg-white dark:bg-transparent dark:border-gray-800"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-3">
          <div className="aspect-square rounded-xl overflow-hidden border dark:border-gray-800 bg-black/5 flex items-center justify-center">
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <span className="text-sm opacity-60">No photo</span>
            )}
          </div>
          <label className="inline-flex items-center gap-2 rounded-xl border px-3 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files && uploadPhoto(e.target.files[0]).catch((err) => setMsg(err.message))}
            />
            Upload Photo
          </label>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <Button onClick={saveAll} disabled={busy}>
          {busy ? "Saving..." : "Save changes"}
        </Button>
        {msg && <p className="text-sm opacity-80">{msg}</p>}
      </div>
    </Card>
  );
}
