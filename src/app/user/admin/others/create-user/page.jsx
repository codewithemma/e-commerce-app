import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import UserForm from "./userForm/UserForm";

import User from "@/models/User";
import { connectDB } from "@/utils/connect";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

const CreateUser = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);

  if (
    !(session?.user?.role === "superadmin" || session?.user?.role === "admin")
  ) {
    return null;
  }

  const users = await User.find({}).select("-password");

  return (
    <div>
      <AdminLinks />
      <OtherLinks />
      <UserForm userInfo={JSON.parse(JSON.stringify(users))} />
    </div>
  );
};

export default CreateUser;
