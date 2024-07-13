import User from "@/models/User";
import { StatusCodes } from "http-status-codes";
import { NextResponse } from "next/server";

// export const GET = async (req, { params }) => {
//   const { id } = params;
//   console.log(id);

//   try {
//     const user = await User.findById(id);
//     return NextResponse.json({ user }, { status: StatusCodes.OK });
//   } catch (error) {
//     return NextResponse.json(
//       { message: "Error registering user!" },
//       { status: StatusCodes.INTERNAL_SERVER_ERROR }
//     );
//   }
// };

export const PUT = async (req, { params }) => {
  const { id } = params;
  const { fullName, address, image } = await req.json();
  try {
    const updatedUser = await User.findByIdAndUpdate(
      id,
      {
        fullName,
        address,
        image,
      },
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
