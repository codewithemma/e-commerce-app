"use client";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import styles from "./Products.module.css";
import { CiHeart } from "react-icons/ci";
import { FaCartPlus } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import Wrapper from "@/components/wrapper/Wrapper";
import { url } from "@/utils/api";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/context/CartContext";
import { useSearchParams } from "next/navigation";
import ErrorPage from "@/components/errorPage/ErrorPage";

const ProductContainer = () => {
  const { handleAddToCart } = useContext(CartContext);
  const [productData, setProductData] = useState([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const getData = async () => {
      const category = searchParams.get("category");
      const query = category ? `category=${category}` : "";

      try {
        const res = await fetch(`/api/user/products?${query}`, {
          cache: "no-store",
        });
        const resData = await res.json();

        if (!res.ok) {
          return null;
        } else {
          setProductData(resData);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    getData();
  }, [searchParams]);

  if (productData === null) {
    return <ErrorPage />;
  }

  return (
    <Wrapper>
      <div className={styles.cart_nav}>
        <Link href="/">Home</Link> {">"}
        <Link href="/products"> Products</Link>
      </div>
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
// import Product from "@/models/Product";
// import React from "react";
// import ProductContainer from "./Products/Products";

// const Products = async () => {
//   const productData = await Product.find({});
//   return (
//     <ProductContainer productData={JSON.parse(JSON.stringify(productData))} />
//   );
// };

// export default Products;
