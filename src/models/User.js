import mongoose from "mongoose";
const user = mongoose.Schema(
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
    googleId: String,
  },
  { timeStamps: true }
);
const User = mongoose.models.User || mongoose.model("User", user);

export default User;
