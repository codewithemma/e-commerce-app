import Wrapper from "../wrapper/Wrapper";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <Wrapper>
        <div className={styles.footer_grid}>
          <div>
            <h2>Exclusive</h2>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <input type="text" placeholder="Enter your Email" />
          </div>
          <div>
            <p>Support</p>
            <a href="#">http://aga.ga/nap</a>
            <a>+234 80 2324 8214</a>
          </div>
          <div>
            <a href="#">My Account</a>
            <a href="#">Login / Register</a>
            <a href="#">Cart</a>
            <a href="#">Shop</a>
          </div>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Use</a>
            <a href="#">FAQ</a>
            <a href="#">Contact</a>
          </div>
        </div>
      </Wrapper>
    </div>
  );
};

export default Footer;
