import Product from "@/models/Product";
import { connectDB } from "@/utils/connect";
import React from "react";
import ProductDescription from "./ProductDescription";

const page = async ({ params }) => {
  const { id } = params;
  await connectDB();

  const productData = await Product.findById(id);

  return (
    <ProductDescription productData={JSON.parse(JSON.stringify(productData))} />
  );
};

export default page;
