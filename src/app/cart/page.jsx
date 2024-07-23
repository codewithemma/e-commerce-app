"use client";
import Wrapper from "@/components/wrapper/Wrapper";
import Link from "next/link";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";

const Cart = () => {
  const { cart } = useContext(CartContext);

  return (
    <Wrapper>
      <div className={styles.cart_nav}>
        <Link href="/">Home</Link> {">"}
        <Link href="/cart"> Cart</Link>
      </div>
      <div className={styles.cart_item}>
        <p>Product</p>
        <p>Price</p>
        <p>Quatity</p>
        <p>Subtotal</p>
      </div>
      <>
        {cart.map((item) => {
          return (
            <div key={item._id} className={styles.cart_item}>
              <div className={styles.product_flex}>
                <Image
                  src={item.product.image}
                  alt="item"
                  width={50}
                  height={50}
                />
                <p>{item.product.name}</p>
              </div>
              <p>&#36;{item.product.price}</p>
              <input type="number" defaultValue="1" className={styles.input} />
              <p>Subtotal</p>
            </div>
          );
        })}
      </>
      <div className={styles.btn_container}>
        <Link href="/">Return To Shop</Link>
        <button>Update Cart</button>
      </div>
      <div className={styles.coupon_container}>
        <div className={styles.coupon}>
          <input type="text" placeholder="Coupon Code" />
          <button>Apply Coupon</button>
        </div>
        <div className={styles.checkout_container}>
          <p style={{ fontWeight: "bold" }}>Cart Total</p>
          <div className={styles.checkout}>
            <p>Subtotal:</p>
            <p>&#36;money</p>
          </div>
          <div className={styles.checkout}>
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className={styles.checkout}>
            <p>Total:</p>
            <p>money</p>
          </div>
          <button>Proceed to checkout</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
