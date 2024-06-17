import Wrapper from "../wrapper/Wrapper";
import styles from "./Footer.module.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <Wrapper>
        <div className={styles.footer_grid}>
          <div>
            <p className={styles.brand}>Exclusive</p>
            <p className={styles.p}>Subscribe</p>
            <p className={styles.p}>Get 10% off your first order</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <p className={styles.p}>Support</p>
            <Link className={styles.footer_link} href="/">
              http://exclusivee=commerce-app.vercel.app
            </Link>
            <Link className={styles.footer_link} href="/">
              2324 8214
            </Link>
          </div>
          <div>
            <Link className={styles.footer_link} href="#">
              My Account
            </Link>
            <Link className={styles.footer_link} href="/register">
              Login / Register
            </Link>
            <Link className={styles.footer_link} href="/cart">
              Cart
            </Link>
            <Link className={styles.footer_link} href="#">
              Shop
            </Link>
          </div>
          <div>
            <Link className={styles.footer_link} href="/">
              Privacy Policy
            </Link>
            <Link className={styles.footer_link} href="/">
              Terms of Use
            </Link>
            <Link className={styles.footer_link} href="/">
              FAQ
            </Link>
            <Link className={styles.footer_link} href="/">
              Contact
            </Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
