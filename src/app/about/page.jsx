import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./About.module.css";
import Link from "next/link";
import Image from "next/image";
import Services from "@/components/servicesComponents/Services";

const About = () => {
  return (
    <>
      <div className={styles.cart_nav}>
        <Link href="/">Home</Link> {">"}
        <Link href="/about"> About</Link>
      </div>
      <div className={styles.header_container}>
        <div>
          <p className={styles.header}>Our Story</p>
          <div>
            <p className={styles.sub_text}>
              Launced in 2015, Exclusive is South {"Asia’s"} premier online
              shopping makterplace with an active presense in Bangladesh.
              Supported by wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sallers and 300 brands and serves
              3 millioons customers across the region.
            </p>
            <br />
            <p className={styles.sub_text}>
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
        </div>
        <div className={styles.heroImg_container}>
          <Image
            style={{ objectFit: "cover" }}
            src="/assets/aboutImage.svg"
            alt="girl"
            fill
            sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
          />
        </div>
      </div>
      <Services />
    </>
  );
};

export default About;
