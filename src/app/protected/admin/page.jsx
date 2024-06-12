import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import styles from "./Admin.module.css";
import Wrapper from "@/components/wrapper/Wrapper";
import AdminLinks from "@/components/adminLinks/AdminLinks";
import Link from "next/link";
const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  if (session.user.role !== "superadmin" && session.user.role !== "admin") {
    return <p>You are not authorized to view this page!</p>;
  }

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.container_child}>
          <Link href="/protected/admin" className={styles.link}>
            Home
          </Link>
          <Link href="/protected/admin/create-item" className={styles.link}>
            Create an item
          </Link>
          <Link href="/protected/admin/others" className={styles.link}>
            Others
          </Link>
        </div>
      </div>
    </Wrapper>
  );
};

export default AdminPage;
