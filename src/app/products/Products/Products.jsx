"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import styles from "./Products.module.css";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Wrapper from "@/components/wrapper/Wrapper";
import { url } from "@/utils/api";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const ProductContainer = ({ productData }) => {
  const { handleAddToCart } = useContext(CartContext);
  return (
    <Wrapper>
      <div className={styles.card_grid}>
        {productData.map((item) => {
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
    </Wrapper>
  );
};

export default ProductContainer;
