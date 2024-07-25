"use client";
import Link from "next/link";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const loadCartFromLocalStorage = () => {
    setCart(
      localStorage.getItem("cart")
        ? JSON.parse(localStorage.getItem("cart"))
        : []
    );
  };

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  const addItemToCart = async (item) => {
    console.log("item", item);

    setCart((prevCart) => {
      const isItemExist = prevCart.find((i) => i.productId === item.productId);
      console.log("isExist", isItemExist);

      let newCartItems;
      if (isItemExist) {
        if (isItemExist.quantity + item.quantity > item.stock) {
          toast.error("Not enough stock available");
          return prevCart; // Return the previous state without changes
        }
        newCartItems = prevCart.map((i) =>
          i.productId === isItemExist.productId
            ? { ...i, quantity: i.quantity + item.quantity }
            : i
        );
      } else {
        if (item.quantity > item.stock) {
          toast.error("Not enough stock available");
          return prevCart; // Return the previous state without changes
        }

        newCartItems = [...prevCart, item];
      }

      console.log("Updated CartItems", newCartItems);

      // Save the new cart to localStorage
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      toast.success("Product successfully added to cart", {
        action: <Link href="/cart">View Cart</Link>,
      });

      return newCartItems;
    });
  };

  const handleIncrement = (productId) => {
    setCart((prevCart) => {
      const newCartItems = prevCart.map((item) => {
        if (item.productId === productId) {
          if (item.quantity + 1 > item.stock) {
            toast.error("Not enough stock available");
            return item;
          }
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const handleDecrement = (productId) => {
    setCart((prevCart) => {
      const newCartItems = prevCart.map((item) => {
        if (item.productId === productId) {
          if (item.quantity - 1 < 1) {
            toast.error("Quantity cannot be less than 1");
            return item;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
      localStorage.setItem("cart", JSON.stringify(newCartItems));
      return newCartItems;
    });
  };

  const deleteItemFromCart = (productId) => {
    if (
      window.confirm("Are you sure you want to remove this item from the cart?")
    ) {
      setCart((prevCart) => {
        const newCartItems = prevCart.filter(
          (item) => item.productId !== productId
        );
        localStorage.setItem("cart", JSON.stringify(newCartItems));
        toast.success("Product removed from cart");
        return newCartItems;
      });
    }
  };

  const calculateTotalPrice = () => {
    const total = cart.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
    setTotalPrice(total);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItemToCart,
        handleIncrement,
        handleDecrement,
        deleteItemFromCart,
        calculateTotalPrice,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
