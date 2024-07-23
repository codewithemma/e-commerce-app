"use client";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./ProductDescription.module.css";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useContext } from "react";
import Image from "next/image";
import Border from "@/components/border/Border";
import { FaMinus, FaPlus, FaRegHeart, FaTruck } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import RelatedProduct from "@/components/relatedProducts/RelatedProduct";

const ProductDescription = ({ productData }) => {
  const { addItemToCart } = useContext(CartContext);
  const handleAddToCart = (product) => {
    const item = {
      product: product._id,
      name: product.name,
      description: product.description,
      image: product.image,
      price: product.price,
      category: product.category,
    };
    addItemToCart(item);
  };
  return (
    <Wrapper>
      <div className={styles.desc_nav}>
        <Link href="/">Home</Link> {">"} <Link href="/products">Products</Link>{" "}
        {">"}
        <Link href="/cart"> {productData.name}</Link>
      </div>
      <div className={styles.product_main}>
        <div>
          <div className={styles.product_img_container}>
            <Image
              src={productData.image}
              alt={productData.name}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>
        <div>
          <div className={styles.prod_desc}>
            <p>{productData.name}</p>
            <p>&#36;{productData.price}</p>
            <p>{productData.description.slice(0, 150)}...</p>
          </div>
          <Border />
          <div className={styles.counter_container}>
            <div className={styles.counter}>
              <button>
                <FaMinus />
              </button>
              <input type="text" defaultValue="1" />
              <button>
                <FaPlus />
              </button>
            </div>
            <button
              className={styles.buy_now}
              onClick={() => handleAddToCart(productData)}
            >
              Buy Now
            </button>
            <div className={styles.wish}>
              <FaRegHeart />
            </div>
          </div>
          <div className={styles.delivery_container}>
            <div>
              <span>
                <FaTruck size="20px" />
              </span>
              <div className={styles.delivery}>
                <p>Free Delivery</p>
                <Link href="/user/billing">
                  Enter your postal code for Delivery Availability
                </Link>
              </div>
            </div>
            <div>
              <span>
                <FaArrowsRotate size="20px" />
              </span>
              <div className={styles.delivery}>
                <p>Return Delivery</p>
                <p>Free 30 Days Delivery Returns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <RelatedProduct />
    </Wrapper>
  );
};

export default ProductDescription;
