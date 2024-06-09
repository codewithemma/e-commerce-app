import User from "@/models/User";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";
//POST A USER TO DB
export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, password, role } = await req.json();
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
      role,
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
