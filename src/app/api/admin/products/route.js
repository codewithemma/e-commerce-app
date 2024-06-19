import Product from "@/models/Product";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const GET = async (req, res) => {
  await connectDB();

  const products = await Product.find().sort({
    _id: -1,
  });
  return new NextResponse(JSON.stringify(products, { status: StatusCodes.OK }));
};

export const POST = async (req) => {
  await connectDB();

  try {
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
