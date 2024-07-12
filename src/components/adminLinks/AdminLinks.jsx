import Link from "next/link";
import styles from "./AdminLinks.module.css";

const AdminLinks = () => {
  return (
    <div className={styles.container}>
      <Link href="/user/admin" className={styles.link}>
        Home
      </Link>
      <Link href="/user/admin/create-item" className={styles.link}>
        Products
      </Link>
      <Link href="/user/admin/create-user" className={styles.link}>
        Users
      </Link>
    </div>
  );
};

export default AdminLinks;
