import User from "@/models/User";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
//POST A USER TO DB
export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password } = await req.json();
    const isFirstUser = (await User.countDocuments()) === 0;
    const newRole = isFirstUser ? "admin" : "user";
    const exists = await User.findOne({ $or: [{ email }] });
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      role: newRole,
      password: hashedPassword,
    });
    return NextResponse.json(
      { message: "User registered successfully" },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Error registering user!" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
}
