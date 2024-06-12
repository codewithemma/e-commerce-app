import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "superadmin" && session.user.role !== "admin") {
    return <p>You are not authorized to view this page!</p>;
  }

  return <p>admin page</p>;
};

export default AdminPage;
