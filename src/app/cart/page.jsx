"use client";
import Wrapper from "@/components/wrapper/Wrapper";
import Link from "next/link";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Cart = () => {
  const {
    cart,
    handleDecrement,
    handleIncrement,
    deleteItemFromCart,
    calculateTotalPrice,
    totalPrice,
  } = useContext(CartContext);

  const { status } = useSession();

  return (
    <Wrapper>
      <div className={styles.cart_nav}>
        <Link href="/">Home</Link> {">"}
        <Link href="/cart"> Cart</Link>
      </div>
      <div className={`${styles.cart_item} ${styles.none}`}>
        <p>Product</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Subtotal</p>
      </div>
      <>{cart.length === 0 && <p className={styles.empty}>Cart is empty</p>}</>
      <>
        {cart?.map((item) => {
          return (
            <div key={item.productId} className={styles.cart_item}>
              <div className={styles.product_flex}>
                <Image src={item.image} alt="item" width={50} height={50} />
                <Link href={`/products/${item.productId}`}>{item.name}</Link>
              </div>
              <p>&#36;{item.price}</p>
              <div className={styles.control}>
                <button onClick={() => handleDecrement(item.productId)}>
                  -
                </button>
                <input
                  type="number"
                  value={item.quantity}
                  className={styles.input}
                  readOnly
                />
                <button onClick={() => handleIncrement(item.productId)}>
                  +
                </button>
              </div>
              <p>&#36;{(item.price * item.quantity).toFixed(2)}</p>
              <button
                className={styles.delete}
                onClick={() => deleteItemFromCart(item.productId)}
              >
                Remove
              </button>
            </div>
          );
        })}
      </>
      <div className={styles.btn_container}>
        <Link href="/">Return To Shop</Link>
        <button onClick={calculateTotalPrice}>Update Cart</button>
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
            <p>&#36;{totalPrice.toFixed(2)}</p>
          </div>
          <div className={styles.checkout}>
            <p>Shipping:</p>
            <p>Free</p>
          </div>
          <div className={styles.checkout}>
            <p>Total:</p>
            <p>&#36;{totalPrice.toFixed(2)}</p>
          </div>
          {status === "unauthenticated" ? (
            <Link href="/auth/register" className={styles.login}>
              Login to proceed
            </Link>
          ) : (
            <button>Proceed to checkout</button>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

export default Cart;
