import Link from "next/link";
import styles from "./AdminLinks.mondule.css";

const AdminLinks = () => {
  return (
    <div className={styles.container}>
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
  );
};

export default AdminLinks;
