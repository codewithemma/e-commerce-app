import Wrapper from "../wrapper/Wrapper";
import styles from "./Footer.module.css";
import Link from "next/link";
const Footer = () => {
  return (
    <div className={styles.footer}>
      <Wrapper>
        <div className={styles.footer_grid}>
          <div>
            <h2>Exclusive</h2>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <input
              className={styles.input}
              type="text"
              placeholder="Enter your Email"
            />
          </div>
          <div>
            <p>Support</p>
            <Link href="/">http://aga.ga/nap</Link>
            <Link href="/">2324 8214</Link>
          </div>
          <div>
            <Link href="#">My Account</Link>
            <Link href="/login">Login / Register</Link>
            <Link href="/cart">Cart</Link>
            <Link href="#">Shop</Link>
          </div>
          <div>
            <Link href="/">Privacy Policy</Link>
            <Link href="/">Terms of Use</Link>
            <Link href="/">FAQ</Link>
            <Link href="/">Contact</Link>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
