import React from "react";
import styles from "./ProductList.module.css";
import Link from "next/link";
const ProductList = () => {
  const product = [
    {
      id: 1,
      name: "Electronics",
      category: "electronics",
    },
    {
      id: 2,
      name: "Fashion",
      category: "fashion",
    },
    {
      id: 3,
      name: "Entertainment",
      category: "entertainment",
    },
    {
      id: 4,
      name: "Gaming",
      category: "gaming",
    },
  ];
  return (
    <div className={styles.container}>
      <div>
        {" "}
        {product?.map((item) => {
          return (
            <ul className={styles.container_child} key={item.id}>
              <Link
                href={`/products?category=${item.category}`}
                className={styles.product}
              >
                {item.name}
              </Link>
            </ul>
          );
        })}
      </div>
      <div className={styles.border}></div>
    </div>
  );
};

export default ProductList;
