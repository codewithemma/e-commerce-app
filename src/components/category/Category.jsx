import styles from "./Category.module.css";
import Link from "next/link";
import { MdDevices, MdMusicVideo, MdVideogameAsset } from "react-icons/md";
import { RiShirtFill } from "react-icons/ri";
const Category = () => {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Link
          href="/products?category=electronics"
          className={`${styles.cat_box} ${styles.electronics_1}`}
        >
          <p>Electronics</p>
          <span className={`${styles.cat_item} ${styles.electronics}`}>
            <MdDevices size={"20px"} />
          </span>
        </Link>
        <Link
          href="/products?category=fashion"
          className={`${styles.cat_box} ${styles.fashion_1}`}
        >
          <p>Fashion</p>
          <span className={`${styles.cat_item} ${styles.fashion}`}>
            <RiShirtFill size={"20px"} />
          </span>
        </Link>
        <Link
          href="/products?category=entertainment"
          className={`${styles.cat_box} ${styles.entertainment_1}`}
        >
          <p>Entertainment</p>
          <span className={`${styles.cat_item} ${styles.entertainment}`}>
            <MdMusicVideo size={"20px"} />
          </span>
        </Link>
        <Link
          href="/products?category=gaming"
          className={`${styles.cat_box} ${styles.gaming_1}`}
        >
          <p>Gaming</p>
          <span className={`${styles.cat_item} ${styles.gaming}`}>
            <MdVideogameAsset size={"20px"} />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Category;
