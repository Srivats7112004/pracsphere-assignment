import { getSessionUser } from "@/lib/auth";
import { connectDB, UserModel } from "@repo/db";
import ProfileClient from "./ProfileClient";
import { Card } from "@repo/ui";

export default async function ProfilePage() {
  const u = await getSessionUser();
  if (!u) return null;

  await connectDB();
  const user = await UserModel.findById(u.uid)
    .select("name email image phone bio")
    .lean<{ name: string; email: string; image?: string; phone?: string; bio?: string } | null>();

  if (!user) return <div className="p-6 text-red-500">User not found.</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Profile</h1>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-4 dark:bg-gray-900/60 dark:border-gray-800">
          <h2 className="font-semibold mb-3">Account</h2>
          <div className="text-sm space-y-3">
            <div>
              <p className="text-gray-500 dark:text-gray-400">Name</p>
              <p className="font-medium">{user.name}</p>
            </div>
            <div>
              <p className="text-gray-500 dark:text-gray-400">Email</p>
              <p className="font-medium break-all">{user.email}</p>
            </div>
            {user.phone && (
              <div>
                <p className="text-gray-500 dark:text-gray-400">Phone</p>
                <p className="font-medium">{user.phone}</p>
              </div>
            )}
            {user.bio && (
              <div>
                <p className="text-gray-500 dark:text-gray-400">Bio</p>
                <p className="font-medium">{user.bio}</p>
              </div>
            )}
          </div>
        </Card>

        <ProfileClient
          name={user.name}
          email={user.email}
          phone={user.phone ?? ""}
          bio={user.bio ?? ""}
          image={user.image ?? ""}
        />
      </div>
    </div>
  );
}
