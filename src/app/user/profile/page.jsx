import { authOptions } from "@/utils/auth";
import { getServerSession } from "next-auth";
import Image from "next/image";
import styles from "./Profile.module.css";
import Wrapper from "@/components/wrapper/Wrapper";
import Link from "next/link";
import Form from "./Form";

const UserProfile = async () => {
  const session = await getServerSession(authOptions);

  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.profile_nav}>
          <div>
            <Link href="/">Home</Link> /
            <Link href="/user/profile"> My Account</Link>
          </div>
          <div>
            <span>Welcome!</span>
            <span> {session?.user?.email}</span>
          </div>
        </div>
        <div className={styles.profile_grid}>
          <div>
            <div className={styles.profile_links}>
              <p>Manage my account</p>
              <ul>
                <li>
                  <Link href="/user/profile">My Profile</Link>
                </li>
                <li>
                  <Link href="/">Address Book</Link>
                </li>
                <li>
                  <Link href="/">My Payment Options</Link>
                </li>
              </ul>
            </div>
            <div className={styles.profile_links}>
              <p>My Orders</p>
              <ul>
                <li>
                  <Link href="/">My Returns</Link>
                </li>
                <li>
                  <Link href="/">My Cancellations</Link>
                </li>
              </ul>
            </div>
            <div className={styles.profile_links}>
              <p>My Wishlist</p>
            </div>
          </div>
          <Form />
        </div>
      </div>
    </Wrapper>
  );
};

export default UserProfile;
