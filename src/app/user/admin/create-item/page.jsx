import Product from "@/models/Product";
import CreateItem from "./productForm/ProductForm";

const page = async () => {
  const products = await Product.find({});
  return <CreateItem productData={JSON.parse(JSON.stringify(products))} />;
};

export default page;
