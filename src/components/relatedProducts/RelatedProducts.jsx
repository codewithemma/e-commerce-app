"use client";
import { CldImage } from "next-cloudinary";
import styles from "./RelatedProducts.module.css";
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa";
import Link from "next/link";
import { url } from "@/utils/api";
import { useEffect, useState } from "react";
import ErrorPage from "../errorPage/ErrorPage";

const RelatedProducts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`${url}/api/user/products`, {
          cache: "no-store",
        });

        if (!res.ok) {
          return null;
        }
        const resData = await res.json();
        setData(resData);
      } catch (error) {
        return null;
      }
    };
    getData();
  }, []);

  if (data === null) {
    return <ErrorPage />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.upper}>
        <div className={styles.upper1}>
          <div className={styles.box}></div>
          <p className={styles.p}>Related Products</p>
        </div>
      </div>
      {data.length === 0 ? (
        <p>products currently not available, please check back later...😃</p>
      ) : (
        <>
          <div className={styles.card_grid}>
            {data
              .sort(() => 0.5 - Math.random())
              .slice(0, 4)
              .map((item) => {
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
                      <button className={styles.addToCart}>
                        <span>
                          <FaCartPlus />
                        </span>
                        <span>Add To Cart</span>
                      </button>
                    </div>
                    <div className={styles.pricing}>
                      <p className={styles.productName}>{item.name}</p>
                      <div className={styles.btn_flex}>
                        <p className={styles.originalPrice}>
                          &#36;{item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </>
      )}
    </div>
  );
};

export default RelatedProducts;
