import Product from "@/models/Product";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  try {
    await connectDB();
    const products = await Product.find().sort({
      _id: -1,
    });
    return new NextResponse(
      JSON.stringify(products, { status: StatusCodes.OK })
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify(
        { message: "Something went wrong" },
        { status: StatusCodes.BAD_REQUEST }
      )
    );
  }
};
