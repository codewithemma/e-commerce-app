import Product from "@/models/Product";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
  const { slug } = params;

  try {
    const product = await Product.findById({ _id: slug });
    if (!product) {
      return new NextResponse(
        JSON.stringify(
          { message: "No product found" },
          { status: StatusCodes.NOT_FOUND }
        )
      );
    }
    return new NextResponse(
      JSON.stringify(product, { status: StatusCodes.OK })
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
