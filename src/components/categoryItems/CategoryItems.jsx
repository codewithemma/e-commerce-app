"use client";
import { useState } from "react";
import styles from "./CategoryItems.module.css";
import Image from "next/image";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaCartPlus } from "react-icons/fa";

let ItemsPerPage = 4;
const CategoryItems = ({ productData }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = productData.length;
  const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const lastIndex = currentPage * ItemsPerPage;
  const firstIndex = lastIndex - ItemsPerPage;

  const currentData = productData.slice(firstIndex, lastIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.upper1}>
          <div className={styles.box}></div>
          <p className={styles.p}>New Arrivals</p>
        </div>
        <div className={styles.upper1}>
          <span className={styles.pagination_container}>
            <FaArrowLeft
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            />
          </span>
          <span className={styles.pagination_container}>
            <FaArrowRight
              onClick={handleNextPage}
              disabled={currentData.length < ItemsPerPage}
            />
          </span>
        </div>
      </div>
      {productData.length === 0 ? (
        <p>products currently not available, please check back later...😃</p>
      ) : (
        <>
          <div className={styles.card_grid}>
            {currentData.map((item) => {
              return (
                <div key={item._id} className={styles.productCard}>
                  <div className={styles.img_container}>
                    <Image
                      alt={item?.alt}
                      src={item.image}
                      fill
                      style={{ objectFit: "contain" }}
                    />
                    <div className={styles.actionButtons}>
                      <span className={styles.actionButtonContainer}>
                        <button className={styles.actionButton}>
                          <CiHeart />
                        </button>
                      </span>
                      <span className={styles.actionButtonContainer}>
                        <button className={styles.actionButton}>
                          <IoEyeOutline />
                        </button>
                      </span>
                    </div>
                    <button className={styles.addToCart}>
                      <span>
                        <FaCartPlus />
                      </span>
                      <span>Add To Cart</span>
                    </button>
                  </div>
                  <div className={styles.pricing}>
                    <p className={styles.productName}>{item.name}</p>
                    <p className={styles.originalPrice}>NGN {item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.btn_container}>
            <button>View All Products</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryItems;
