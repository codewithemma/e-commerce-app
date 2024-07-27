import Product from "@/models/Product";
import React from "react";
import ProductContainer from "./Products/Products";

const Products = async () => {
  const productData = await Product.find({});
  return (
    <ProductContainer productData={JSON.parse(JSON.stringify(productData))} />
  );
};

export default Products;
