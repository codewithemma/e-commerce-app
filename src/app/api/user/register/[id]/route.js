import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { cloudinary } from "@/utils/cloudinary";

let imageUrl = "";

export const PUT = async (req, { params }) => {
  const { id } = params;
  const { fullName, address, image } = await req.json();
  if (image && image.trim() !== "") {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
    });
    imageUrl = uploadResponse.secure_url;
  }

  const updateFields = {
    ...(fullName && { fullName }),
    ...(address && { address }),
    ...(imageUrl && { image: imageUrl }),
  };

  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    );

    return new NextResponse(
      JSON.stringify(updatedUser, { status: StatusCodes.OK })
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
  const { image } = await req.json();

  if (image && image.trim() !== "") {
    const urlParts = image.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];

    try {
      const result = await cloudinary.uploader.destroy(publicId);

      const updatedUser = await User.findByIdAndUpdate(
        id,
        { $unset: { image: "" } },
        { new: true }
      );

      return new NextResponse(JSON.stringify(result), {
        status: StatusCodes.OK,
      });
    } catch (error) {
      return new NextResponse(
        JSON.stringify({ message: "Error deleting image" }),
        { status: StatusCodes.INTERNAL_SERVER_ERROR }
      );
    }
  } else {
    return new NextResponse(JSON.stringify({ message: "No image to delete" }), {
      status: StatusCodes.BAD_REQUEST,
    });
  }
};
