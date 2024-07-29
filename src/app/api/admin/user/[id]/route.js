import User from "@/models/User";
import { authOptions } from "@/utils/auth";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const PUT = async (req, { params }) => {
  //SESSION VALIDATION
  const session = await getServerSession(authOptions);
  if (
    !(session?.user?.role === "superadmin" || session?.user?.role === "admin")
  ) {
    return new NextResponse(
      JSON.stringify(
        { message: "You are forbidden to make such request" },
        { status: StatusCodes.FORBIDDEN }
      )
    );
  }
  const { id } = params;
  const { fullName, email, role } = await req.json();
  await connectDB();
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        email,
        role,
      },
      { new: true }
    );
    return new NextResponse(
      JSON.stringify(updatedUser, { status: StatusCodes.OK })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        { message: '"Internal server error"' },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )
    );
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;
  await connectDB();
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify(
        { message: "User deleted successfully" },
        { status: StatusCodes.OK }
      )
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        { message: "Internal server error" },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )
    );
  }
};
