import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";
import { cloudinary } from "@/utils/cloudinary";
import { connectDB } from "@/utils/connect";

const handleDelete = async (id) => {
  await connectDB();
  const oldImage = await User.findById(id);

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
  try {
    await connectDB();
    const { id } = params;
    const { fullName, address, image } = await req.json();
    console.log(address);

    if (image && image.trim() !== "") {
      const handleRes = await handleDelete(id);
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
      });
      const imageUrl = uploadResponse.secure_url;
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fullName,
            address,
            image: imageUrl,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: id },
        {
          $set: {
            fullName,
            address,
            updatedAt: new Date(),
          },
        },
        { new: true }
      );
      console.log("hieejdkkdk", updatedUser);
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

// export const PUT = async (req, { params }) => {
//   try {
//     await connectDB();
//     let imageUrl = null;
//     const { id } = params;
//     const { fullName, address, image } = await req.json();

//     if (image && image.trim() !== "") {
//       const handleRes = await handleDelete(id);
//       const uploadResponse = await cloudinary.uploader.upload(image, {
//         upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME,
//       });
//       const imageUrl = uploadResponse.secure_url;
//       const updateFields = {
//         ...(fullName && { fullName }),
//         ...(address && { address }),
//         ...(imageUrl && { image: imageUrl }),
//         updatedAt: new Date(),
//       };
//       const updatedUser = await User.findByIdAndUpdate(
//         id,
//         { $set: updateFields },
//         { new: true }
//       );
//     }
//     return new NextResponse(
//       JSON.stringify(updatedUser, { status: StatusCodes.OK })
//     );
//   } catch (error) {
//     return new NextResponse(
//       JSON.stringify(
//         { message: "internal server error" },
//         { status: StatusCodes.INTERNAL_SERVER_ERROR }
//       )
//     );
//   }
// };
