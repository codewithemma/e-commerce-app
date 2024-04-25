import Image from "next/image";
import styles from "./Services.module.css";

const Services = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <div className={styles.flex}>
          <Image
            alt="service image"
            src="/assets/services1.svg"
            width={80}
            height={80}
            priority
          />
          <p>FREE AND FAST DELIVERY</p>
          <p>Free delivery for all orders over $140</p>
        </div>
        <div className={styles.flex}>
          <Image
            alt="service image"
            src="/assets/services2.svg"
            width={80}
            height={80}
            priority
          />
          <p>24/7 CUSTOMER SERVICE</p>
          <p>Friendly 24/7 customer support</p>
        </div>
        <div className={styles.flex}>
          <Image
            alt="service image"
            src="/assets/services2.svg"
            width={80}
            height={80}
            priority
          />
          <p> MONEY BACK GUARANTEE</p>
          <p>We return money within 30 days</p>
        </div>
      </div>
    </div>
  );
};

export default Services;
