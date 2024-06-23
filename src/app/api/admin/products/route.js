import Product from "@/models/Product";
import { authOptions } from "@/utils/auth";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  //SESSION VALIDATION
  const session = await getServerSession(authOptions);
  console.log(session);
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
  //

  try {
    await connectDB();
    const { name, description, price, image, category, stock } =
      await req.json();
    const requiredFields = [name, description, price, image, category, stock];
    if (requiredFields.some((field) => field.length === 0)) {
      return new NextResponse(
        JSON.stringify({ message: "Please provide all inputs" }),
        { status: StatusCodes.BAD_REQUEST }
      );
    }

    const products = new Product({
      name,
      description,
      price,
      category,
      stock,
      image,
    });
    await products.save();
    return new NextResponse(
      JSON.stringify(products, { status: StatusCodes.CREATED })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        { message: "internal server error" },
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      )
    );
  }
};
