import mongoose from "mongoose";
const userSchema = mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: String,
    role: {
      type: String,
      enum: ["superadmin", "admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose?.model("User", userSchema);

export default User;
