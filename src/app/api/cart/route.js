import CartModel from "@/models/Cart";
import { authOptions } from "@/utils/auth";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

const GET = async (req) => {
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

    return new NextResponse(
      JSON.stringify({ items: cart.items }, { status: StatusCodes.OK })
    );
  } catch (error) {
    console.error(error);
    return new NextResponse(
      { message: "Error fetching cart" },
      { status: StatusCodes.INTERNAL_SERVER_ERROR }
    );
  }
};

const POST = async (req, res) => {
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
      items.forEach((newItem) => {
        const existingItem = cart.items.find(
          (item) => item._id === newItem._id
        );
        if (existingItem) {
          existingItem.quantity += newItem.quantity;
        } else {
          cart.items.push(newItem);
        }
      });
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
