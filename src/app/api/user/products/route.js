import Product from "@/models/Product";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");

  const search = searchParams.get("search");

  try {
    await connectDB();
    let products;

    if (category) {
      products = await Product.find({ category });
    } else if (search) {
      const regex = new RegExp(search, "i");
      products = await Product.find({ name: regex });
    } else {
      products = await Product.find().sort("-createdAt");
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
