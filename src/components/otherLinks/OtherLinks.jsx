import Link from "next/link";
import styles from "./OtherLinks.module.css";
import AdminLinks from "../adminLinks/AdminLinks";

const OtherLinks = () => {
  return (
    <div className={styles.container}>
      <Link href="/user/admin/others/all-products" className={styles.link}>
        View all Products
      </Link>
      <Link href="/user/admin/others/create-user" className={styles.link}>
        Create a user
      </Link>
    </div>
  );
};

export default OtherLinks;
