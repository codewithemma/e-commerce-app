import Link from "next/link";
import styles from "./AdminLinks.module.css";

const AdminLinks = () => {
  return (
    <div className={styles.container}>
      <Link href="/user/admin" className={styles.link}>
        Home
      </Link>
      <Link href="/user/admin/create-item" className={styles.link}>
        Create an item
      </Link>
      <Link href="/user/admin/others" className={styles.link}>
        Others
      </Link>
    </div>
  );
};

export default AdminLinks;
