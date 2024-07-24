"use client";
import Wrapper from "@/components/wrapper/Wrapper";
import Link from "next/link";
import styles from "./Cart.module.css";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Image from "next/image";
import { useSession } from "next-auth/react";

const Cart = () => {
  const { cart, addToCartDB, addItemToCart } = useContext(CartContext);
  console.log(cart);

  const { data: session } = useSession();

  // const handleIncrement = async (cartItem) => {
  //   const newQty = cartItem?.quantity + 1;
  //   const updatedCartItems = cart.map((item) =>
  //     item._id === cartItem._id ? { ...item, quantity: newQty } : item
  //   );
  //   if (newQty > cartItem?.stock) return;
  //   if (session && session.user) {
  //     await addToCartDB(session.user._id, [updatedCartItems]);
  //   } else {
  //     addItemToCart(updatedCartItems);
  //   }
  // };

  const handleIncrement = async (cartItem) => {
    const newQty = cartItem?.quantity + 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty > cartItem?.stock) return;
    if (session && session.user) {
      await addToCartDB(session.user._id, [item]);
    } else {
      addItemToCart(item);
    }
  };

  const handleDecrement = async (cartItem) => {
    const newQty = cartItem?.quantity - 1;
    const item = { ...cartItem, quantity: newQty };
    if (newQty <= 0) return;
    if (session && session.user) {
      await addToCartDB(session.user._id, [item]);
    } else {
      addItemToCart(item);
    }
  };

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
        {cart.product?.map((item) => {
          return (
            <div key={item._id} className={styles.cart_item}>
              <button onClick={() => handleIncrement(item)}>increase</button>
              <button onClick={() => handleDecrement(item)}>decrease</button>
              <div className={styles.product_flex}>
                <Image src={item.image} alt="item" width={50} height={50} />
                <p>{item.name}</p>
              </div>
              <p>&#36;{item.price}</p>
              <input
                type="number"
                value={item.quantity}
                className={styles.input}
              />
              <p>&#36;{item.price * item.quantity.toFixed(2)}</p>
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
