// scripts/assignAdmin.js
import { connectDB } from "./connect";
import User from "@/models/User";

async function assignAdminRole(email) {
  await connectDB();
  await User.updateOne({ email }, { role: "admin" });
  console.log(`Assigned admin role to ${email}`);
}

assignAdminRole("chikezieemmanuel29@gmail.com").catch(console.error);
