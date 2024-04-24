import React from "react";
import styles from "./ProductList.module.css";
import Link from "next/link";
const ProductList = () => {
  const product = [
    {
      id: 1,
      name: "Phones",
    },
    {
      id: 2,
      name: "Console Gaming",
    },
    {
      id: 3,
      name: "Electronic",
    },
    {
      id: 4,
      name: "Smart Watches",
    },
    {
      id: 3,
      name: "Headphones",
    },
  ];
  return (
    <div className={styles.container}>
      <div>
        {" "}
        {product?.map((item) => {
          return (
            <ul className={styles.container_child} key={item.id}>
              <Link href="/slug">{item.name}</Link>
            </ul>
          );
        })}
      </div>
      <div className={styles.border}></div>
    </div>
  );
};

export default ProductList;
