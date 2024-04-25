import mongoose from "mongoose";
const user = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Must provide a name"],
      unique: [true, "Must be unique"],
    },
    email: {
      type: String,
      required: [true, "Must provide an email"],
      unique: [true, "Must be unique"],
    },
    password: {
      type: String,
      required: [true, "Must provide a password"],
      unique: [true, "Must be unique"],
    },
  },
  { timeStamps: true }
);
const User = mongoose.models.User || mongoose.model("User", user);

export default User;
