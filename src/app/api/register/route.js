import User from "@/models/User";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();
    const exists = await User.findOne({ $or: [{ email }] });
    if (exists) {
      return new NextResponse(
        JSON.stringify({ message: "Email already exists" }, { status: 400 })
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ fullName, email, password: hashedPassword });
    return new NextResponse(
      JSON.stringify(
        { message: "User registered successfully" },
        { status: 200 }
      )
    );
  } catch (error) {
    console.log("Error while registering user", error);
    return new NextResponse(
      JSON.stringify({ message: "Error registering user!" }, { status: 400 })
    );
  }
}
