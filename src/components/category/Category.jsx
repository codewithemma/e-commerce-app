import styles from "./Category.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMobile,
  faComputer,
  faSwatchbook,
  faCamera,
  faGamepad,
  faHeadphones,
  faArrowLeft,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";
const Category = () => {
  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.box}></div>
        <p className={styles.p}>Categories</p>
      </div>
      <div className={styles.flex}>
        <p>Browse By Category</p>
        <div className={styles.btn_group}>
          <button>
            <FontAwesomeIcon icon={faArrowLeft} size="2x" />
          </button>
          <button>
            <FontAwesomeIcon icon={faArrowRight} size="2x" />
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.cat_box}>
          <FontAwesomeIcon icon={faComputer} size="2x" />
          <p>Computers</p>
        </div>
        <div className={styles.cat_box}>
          <FontAwesomeIcon icon={faMobile} size="2x" />
          <p>Phones</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <FontAwesomeIcon icon={faSwatchbook} size="2x" />
          <p>SmartWatch</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <FontAwesomeIcon icon={faHeadphones} size="2x" />
          <p>Headphone</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <FontAwesomeIcon icon={faCamera} size="2x" />
          <p>Camera</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <FontAwesomeIcon icon={faGamepad} size="2x" />
          <p>Gaming</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
