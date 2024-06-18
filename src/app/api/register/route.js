import User from "@/models/User";
import { connectDB } from "@/utils/connect";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { StatusCodes } from "http-status-codes";

//GET ALL USERS
export async function GET(req) {
  try {
    await connectDB();
    const users = await User.find({});
    console.log(users);
    return new NextResponse(JSON.stringify(users, { status: StatusCodes.OK }));
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        { message: error },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )
    );
  }
}
// CHECK FOR VALID EMAIL
const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

//POST A USER TO DB
export async function POST(req) {
  try {
    await connectDB();
    const { fullName, email, role, password } = await req.json();
    const exists = await User.findOne({ $or: [{ email }] });
    if (fullName.length === 0 || email.length === 0) {
      return NextResponse.json(
        { message: "Please provide all credentials" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (exists) {
      return NextResponse.json(
        { message: "Email already exists" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (password.length < 8) {
      return NextResponse.json(
        { message: "Password should be at least 8 characters long" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    if (!validateEmail(email)) {
      return NextResponse.json(
        { message: "Invalid email format" },
        { status: StatusCodes.BAD_REQUEST }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password: hashedPassword,
      role,
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
