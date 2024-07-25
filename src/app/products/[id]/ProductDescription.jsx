"use client";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./ProductDescription.module.css";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { useContext, useState } from "react";
import Image from "next/image";
import Border from "@/components/border/Border";
import { FaMinus, FaPlus, FaRegHeart, FaTruck } from "react-icons/fa";
import { FaArrowsRotate } from "react-icons/fa6";
import RelatedProducts from "@/components/relatedProducts/RelatedProducts";
import { toast } from "sonner";

const ProductDescription = ({ productData }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
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
      quantity,
    };

    addItemToCart(localCart);
    setQuantity(1);
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
              <button onClick={handleDecrement}>
                <FaMinus />
              </button>
              <input type="text" readOnly value={quantity} />
              <button onClick={handleIncrement}>
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
      <RelatedProducts />
    </Wrapper>
  );
};

export default ProductDescription;
