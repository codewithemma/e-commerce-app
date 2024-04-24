"use client";
import styles from "./Embla.module.css";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
const EmblaCarousel = () => {
  const [emblaRef] = useEmblaCarousel({ loop: false }, [Autoplay()]);
  return (
    <div
      style={{ textAlign: "center" }}
      className={styles.embla}
      ref={emblaRef}
    >
      <div className={styles.embla__container}>
        <div className={`${styles.embla__slide} ${styles.img_container}`}>
          <Image
            alt="sjjd"
            priority
            src="/assets/test.svg"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className={`${styles.embla__slide} ${styles.img_container}`}>
          <Image
            alt="sjjd"
            priority
            src="/assets/test1.svg"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
        <div className={`${styles.embla__slide} ${styles.img_container}`}>
          <Image
            alt="sjjd"
            priority
            src="/assets/test2.svg"
            style={{ objectFit: "cover" }}
            fill
          />
        </div>
      </div>
    </div>
  );
};

export default EmblaCarousel;
