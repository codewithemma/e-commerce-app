import { CartProvider } from "@/context/CartContext";

export const CartContextProvider = ({ children }) => {
  return <CartProvider>{children}</CartProvider>;
};
