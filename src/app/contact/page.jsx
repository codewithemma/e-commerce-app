import Border from "@/components/border/Border";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./Contact.module.css";
import { FaEnvelope, FaPhone } from "react-icons/fa";
import Link from "next/link";

const Contact = () => {
  return (
    <Wrapper>
      <div className={styles.cart_nav}>
        <Link href="/">Home</Link> {">"}
        <Link href="/contact"> Contact</Link>
      </div>
      <div className={styles.container}>
        <div className={styles.container_child}>
          <div>
            <span>
              <FaPhone />
            </span>
            <p>Call To Us</p>
          </div>
          <div>
            <p>We are available 24/7, 7 days a week.</p>
            <p>Phone: +2348023248214</p>
          </div>
          <Border />
          <div>
            <span>
              <FaEnvelope />
            </span>
            <p>Write To US</p>
          </div>
          <div>
            <p>Fill out our form and we will contact you within 24 hours</p>
            <p>Email: support@codewithemma.com</p>
          </div>
        </div>
        <div className={styles.form}>
          <div className={styles.form_grid}>
            <div className={styles.input_group}>
              <input type="text" name="fullName" placeholder="Your Name" />
            </div>
            <div className={styles.input_group}>
              <input
                type="email"
                name="email"
                readonly
                placeholder="Your Email"
              />
            </div>
            <div className={styles.input_group}>
              <input type="text" name="phone" placeholder="Your Phone" />
            </div>
          </div>
          <div>
            <div className={styles.input_group}>
              <textarea type="text" name="message" placeholder="Your Message" />
            </div>
          </div>
          <div className={styles.relative_btn}>
            <div>
              <button>Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Contact;
