import CartModel from "@/models/cart";
import { authOptions } from "@/utils/auth";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    return new NextResponse(
      { message: "Unauthorized" },
      { status: StatusCodes.UNAUTHORIZED }
    );
  }

  const userId = session.user.id;
  console.log(userId);

  try {
    const cart = await CartModel.findOne({ userId });
    console.log(cart);

    if (cart) {
      // Update existing cart
      cart.items = items;
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
