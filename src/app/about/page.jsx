import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./About.module.css";
import Link from "next/link";
import Image from "next/image";

const About = () => {
  return (
    <Wrapper>
      <div className={styles.cart_nav}>
        <Link href="/">Home</Link> {">"}
        <Link href="/cart"> About</Link>
      </div>
      <div className={styles.header_container}>
        <div>
          <p>Our Story</p>
          <div>
            <p>
              Launced in 2015, Exclusive is South {"Asia’s"} premier online
              shopping makterplace with an active presense in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sallers and 300 brands and serves
              3 millioons customers across the region.
            </p>
            <p>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>
        <div className={styles.heroImg_container}>
          <Image
            src="/assets/aboutImg.svg"
            alt="girl"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default About;
