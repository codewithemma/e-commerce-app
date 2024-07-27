"use client";
import { useContext, useState } from "react";
import styles from "./CategoryItems.module.css";
import { IoEyeOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaArrowLeft, FaArrowRight, FaCartPlus } from "react-icons/fa";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import { url } from "@/utils/api";
import { CartContext } from "@/context/CartContext";

const CategoryItems = ({ productData }) => {
  const ItemsPerPage = 4;

  const [currentPage, setCurrentPage] = useState(1);

  // const totalItems = productData.length;
  // const totalPages = Math.ceil(totalItems / ItemsPerPage);

  const lastIndex = currentPage * ItemsPerPage;
  const firstIndex = lastIndex - ItemsPerPage;

  const currentData = productData.slice(firstIndex, lastIndex);

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const { addItemToCart } = useContext(CartContext);

  const handleAddToCart = async (product) => {
    const localCart = {
      productId: product._id,
      name: product.name,
      price: product.price,
      stock: product.stock,
      image: product.image,
      category: product.category,
      quantity: 1,
    };

    addItemToCart(localCart);
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
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              <FaArrowLeft />
            </button>
          </span>
          <span className={styles.pagination_container}>
            <button
              onClick={handleNextPage}
              disabled={currentData.length < ItemsPerPage}
            >
              <FaArrowRight />
            </button>
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
                    <CldImage
                      alt={item?.alt}
                      src={item.image}
                      fill
                      style={{ objectFit: "contain" }}
                      sizes="(max-width: 600px) 100vw, (max-width: 960px) 50vw, 33vw"
                    />
                    <div className={styles.actionButtons}>
                      <span className={styles.actionButtonContainer}>
                        <button className={styles.actionButton}>
                          <CiHeart />
                        </button>
                      </span>
                      <span className={styles.actionButtonContainer}>
                        <Link
                          href={`${url}/products/${item._id}`}
                          className={styles.actionButton}
                        >
                          <IoEyeOutline />
                        </Link>
                      </span>
                    </div>
                    <button
                      className={styles.addToCart}
                      onClick={() => handleAddToCart(item)}
                    >
                      <span>
                        <FaCartPlus />
                      </span>
                      <span>Add To Cart</span>
                    </button>
                  </div>
                  <div className={styles.pricing}>
                    <p className={styles.productName}>{item.name}</p>
                    <p className={styles.originalPrice}>&#36;{item.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className={styles.btn_container}>
            <Link href="/products">View All Products</Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CategoryItems;
