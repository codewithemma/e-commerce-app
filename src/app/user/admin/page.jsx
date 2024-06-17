import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import styles from "./Admin.module.css";
import Wrapper from "@/components/wrapper/Wrapper";
import AdminLinks from "@/components/adminLinks/AdminLinks";
const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session?.user?.role !== "superadmin" && session?.user?.role !== "admin") {
    return <p>You are not authorized to view this page!</p>;
  }

  return (
    <Wrapper>
      <div className={styles.container}>
        <AdminLinks />
      </div>
    </Wrapper>
  );
};

export default AdminPage;
