import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },

    // ✅ new fields for profile
    image: { type: String, default: "" }, // profile photo URL (Cloudinary)
    phone: { type: String, default: "" },
    bio: { type: String, default: "" },
  },
  { timestamps: true }
);

export const UserModel = models.User || model("User", UserSchema);
