import Product from "@/models/Product";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");

  try {
    await connectDB();
    let products;
    if (category) {
      products = await Product.find({ category });
    } else {
      products = await Product.find().sort({
        _id: -1,
      });
    }
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
