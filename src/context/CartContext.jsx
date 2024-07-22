"use client";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

export const CartContext = createContext();

const syncCartToDB = async (userId, items) => {
  await fetch("/api/cart", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, items }),
  });
};

const fetchCartFromDB = async (userId) => {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart from database");
    }

    const cart = await response.json();

    return cart.items;
  } catch (error) {
    console.error("Error fetching cart from database:", error);
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { data: session } = useSession();
  console.log(session);

  const loadCartFromLocalStorage = () => {
    const storedCart = localStorage.getItem("cart");

    if (storedCart) {
      setCart(JSON.parse(storedCart).cartItems);
    } else {
      setCart([]);
    }
  };

  useEffect(() => {
    if (session && session.user) {
      // Sync local storage items to DB
      const localCart = JSON.parse(localStorage.getItem("cart")) || [];

      if (localCart.length > 0) {
        (async () => {
          await syncCartToDB(session.user._id, localCart.cartItems);
          const updatedCart = await fetchCartFromDB(session.user._id);
          setCart(updatedCart);
          localStorage.removeItem("cart"); // Clear local storage after syncing
          console.log("Local storage cleared after syncing");
        })();
      } else {
        (async () => {
          const updatedCart = await fetchCartFromDB(session.user._id);
          setCart(updatedCart);
        })();
      }
    }
  }, [session]);

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  const addItemToCart = async (item) => {
    const isItemExist = cart.find((i) => i.product === item.product);

    let newCartItems;

    if (isItemExist) {
      newCartItems = cart.map((i) =>
        i.product === isItemExist.product
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      newCartItems = [...cart, item];
    }
    localStorage.setItem("cart", JSON.stringify({ cartItems: newCartItems }));
    setCart(newCartItems);

    if (session && session.user) {
      await syncCartToDB(session.user._id, newCartItems);
      const updatedCart = await fetchCartFromDB(session.user._id);
      setCart(updatedCart);
    }
  };

  return (
    <CartContext.Provider value={{ cart, addItemToCart }}>
      {children}
    </CartContext.Provider>
  );
};
