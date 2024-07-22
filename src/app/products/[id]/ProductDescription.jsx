"use client";

import { CartContext } from "@/context/CartContext";
import { useContext } from "react";

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
    <div>
      <p>{productData._id}</p>
      <p>{productData.name}</p>
      <p>{productData.description}</p>
      <p>{productData.price}</p>
      <p>{productData.stock}</p>
      <button onClick={() => handleAddToCart(productData)}>Add to Cart</button>
    </div>
  );
};

export default ProductDescription;
