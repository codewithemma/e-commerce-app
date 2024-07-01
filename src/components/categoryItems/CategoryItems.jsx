"use client";
import { useState } from "react";
import styles from "./CategoryItems.module.css";

const product = [
  {
    name: "phone",
    price: 5000,
  },
  {
    name: "phone",
    price: 5000,
  },
  {
    name: "phone",
    price: 5000,
  },
  {
    name: "phone",
    price: 5000,
  },
  {
    name: "phone",
    price: 5000,
  },
  {
    name: "phone",
    price: 5000,
  },
  {
    name: "phone",
    price: 5000,
  },
];

let ItemsPerPage = 4;
const CategoryItems = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = product.length;
  const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const lastIndex = currentPage * ItemsPerPage;
  const firstIndex = lastIndex - ItemsPerPage;

  const currentData = product.slice(firstIndex, lastIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  return (
    <div className={styles.card_container}>
      {currentData.map((item, id) => {
        return (
          <div className={styles.card_grisd} key={id}>
            <p>{item.name}</p>
            <br />
            <p> {item.price}</p>
          </div>
        );
      })}
      <div>
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          prev
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentData.length < ItemsPerPage}
        >
          next
        </button>
      </div>
    </div>
  );
};

export default CategoryItems;
