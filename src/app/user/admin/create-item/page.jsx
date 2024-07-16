import Product from "@/models/Product";
import CreateItem from "./productForm/ProductForm";
import { connectDB } from "@/utils/connect";

const page = async () => {
  await connectDB();
  const products = await Product.find({});
  return <CreateItem productData={JSON.parse(JSON.stringify(products))} />;
};

export default page;
