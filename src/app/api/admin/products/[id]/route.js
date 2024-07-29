import Product from "@/models/Product";
import { authOptions } from "@/utils/auth";
import { cloudinary } from "@/utils/cloudinary";
import { connectDB } from "@/utils/connect";
import { StatusCodes } from "http-status-codes";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
const handleDelete = async (id) => {
  await connectDB();
  const oldImage = await Product.findById(id);
  if (oldImage && oldImage.image && oldImage.image.length > 0) {
    const urlParts = oldImage.image.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];

    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result === "ok") {
      return "success";
    } else {
      return "failure";
    }
  } else {
    return "no image to delete";
  }
};

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
  await connectDB();
  try {
    const { name, description, image, price, stock, category } =
      await req.json();

    if (image && image.trim() !== "") {
      const handleRes = await handleDelete(id);
      if (handleRes === "success") {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
        });
        const imageUrl = uploadResponse.secure_url;
        const product = await Product.findOneAndUpdate(
          { _id: id },
          {
            $set: {
              name,
              description,
              image: imageUrl,
              price,
              stock,
              category,
              updatedAt: new Date(),
            },
          },
          { new: true }
        );
      } else {
        return new NextResponse(
          JSON.stringify(
            { message: "Failed to delete old image" },
            {
              status: StatusCodes.INTERNAL_SERVER_ERROR,
            }
          )
        );
      }
    } else {
      const product = await Product.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            name,
            description,
            price,
            stock,
            category,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );
    }
    return new NextResponse(
      JSON.stringify({ message: "success" }, { status: StatusCodes.OK })
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

export const DELETE = async (req, { params }) => {
  const { id } = params;
  await connectDB();
  try {
    const handleRes = await handleDelete(id);
    const deletedProduct = await Product.findByIdAndDelete(id);
    return new NextResponse(
      JSON.stringify(
        { message: "Product deleted successfully" },
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
