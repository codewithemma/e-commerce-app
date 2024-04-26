import mongoose from "mongoose";
const user = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Must provide a name"],
      unique: [true, "Must be unique"],
    },
    username: {
      type: String,
      // required: [true, "Must provide a username"],
      // unique: [true, "Must be unique"],
    },
    email: {
      type: String,
      required: [true, "Must provide an email"],
      unique: [true, "Email already exists"],
    },
    image: {
      type: String,
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
