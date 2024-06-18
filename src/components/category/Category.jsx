import styles from "./Category.module.css";
import {
  CiCamera,
  CiCircleChevLeft,
  CiCircleChevRight,
  CiGps,
  CiHeadphones,
  CiLaptop,
  CiMobile3,
  CiStopwatch,
} from "react-icons/ci";
import { MdDevices, MdMusicVideo, MdVideogameAsset } from "react-icons/md";
import { RiShirtFill } from "react-icons/ri";
const Category = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.box}></div>
        <p className={styles.p}>Categories</p>
      </div>
      {/* <div className={styles.flex}>
        <p>Browse By Category</p>
        <div className={styles.btn_group}>
          <button>
            <CiCircleChevLeft size={"50px"} />
          </button>
          <button>
            <CiCircleChevRight size={"50px"} />
          </button>
        </div>
      </div> */}
      <div className={styles.grid}>
        <div className={`${styles.cat_box} ${styles.electronics_1}`}>
          <p>Electronics</p>
          <span className={`${styles.cat_item} ${styles.electronics}`}>
            <MdDevices size={"20px"} />
          </span>
        </div>
        <div className={`${styles.cat_box} ${styles.fashion_1}`}>
          <p>Fashion</p>
          <span className={`${styles.cat_item} ${styles.fashion}`}>
            <RiShirtFill size={"20px"} />
          </span>
        </div>
        <div className={`${styles.cat_box} ${styles.entertainment_1}`}>
          <p>Entertainment</p>
          <span className={`${styles.cat_item} ${styles.entertainment}`}>
            <MdMusicVideo size={"20px"} />
          </span>
        </div>
        <div className={`${styles.cat_box} ${styles.gaming_1}`}>
          <p>Gaming</p>
          <span className={`${styles.cat_item} ${styles.gaming}`}>
            <MdVideogameAsset size={"20px"} />
          </span>
        </div>
        {/* <div className={styles.cat_box}>
          <CiLaptop size={"50px"} />
          <p>Computers</p>
        </div>
        <div className={styles.cat_box}>
          <CiMobile3 size={"50px"} />
          <p>Phones</p>
        </div>
        <div className={styles.cat_box}>
          <CiStopwatch size={"50px"} />
          <p>SmartWatch</p>
        </div>
        <div className={styles.cat_box}>
          <CiHeadphones size={"50px"} />
          <p>Headphone</p>
        </div>
        <div className={styles.cat_box}>
          <CiCamera size={"50px"} />
          <p>Camera</p>
        </div>
        <div className={styles.cat_box}>
          <CiGps size={"50px"} />
          <p>Gaming</p>
        </div> */}
      </div>
    </div>
  );
};

export default Category;
