import React from "react";
import styles from "./Category.module.css";
import Image from "next/image";
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
            <Image
              src="/assets/arrow-left.svg"
              alt="arrow"
              width={20}
              height={20}
              priority
            />
          </button>
          <button>
            <Image
              src="/assets/arrow-right.svg"
              alt="arrow"
              width={20}
              height={20}
              priority
            />
          </button>
        </div>
      </div>
      <div className={styles.grid}>
        <div className={styles.cat_box}>
          <Image
            src={"/assets/phone.svg"}
            alt="dd"
            width={56}
            height={56}
            priority
          />
          <p>Phones</p>
        </div>
        <div className={styles.cat_box}>
          <Image
            src={"/assets/phone.svg"}
            alt="dd"
            width={56}
            height={56}
            priority
          />
          <p>Phones</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <Image
            src={"/assets/phone.svg"}
            alt="dd"
            width={56}
            height={56}
            priority
          />
          <p>Phones</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <Image
            src={"/assets/phone.svg"}
            alt="dd"
            width={56}
            height={56}
            priority
          />
          <p>Phones</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <Image
            src={"/assets/phone.svg"}
            alt="dd"
            width={56}
            height={56}
            priority
          />
          <p>Phones</p>
        </div>{" "}
        <div className={styles.cat_box}>
          <Image
            src={"/assets/phone.svg"}
            alt="dd"
            width={56}
            height={56}
            priority
          />
          <p>Phones</p>
        </div>
      </div>
    </div>
  );
};

export default Category;
