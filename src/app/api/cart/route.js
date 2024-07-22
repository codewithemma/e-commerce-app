import CartModel from "@/models/Cart";
import { authOptions } from "@/utils/auth";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  try {
    const cart = await CartModel.findOne({ userId }).populate("items.product");

    if (!cart) {
      return new NextResponse(
        { message: "Cart not found" },
        { status: StatusCodes.NOT_FOUND }
      );
    }

    return new NextResponse(JSON.stringify(cart), { status: StatusCodes.OK });
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { message: "Error fetching cart" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

export const POST = async (req, res) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new NextResponse(
      { message: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  const { userId, items } = await req.json();
  console.log(userId, items);

  try {
    let cart = await CartModel.findOne({ userId });

    if (cart) {
      cart.items.push(...items);
      await cart.save();
    } else {
      cart = new CartModel({ userId, items });
      await cart.save();
    }
    return new NextResponse(
      { message: "Cart updated" },
      { status: StatusCodes.CREATED }
    );
  } catch (error) {
    return new NextResponse(
      { message: "internal server error" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};
