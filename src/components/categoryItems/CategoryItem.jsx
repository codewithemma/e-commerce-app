import { url } from "@/utils/api";
import CategoryItems from "./CategoryItems";

const getData = async () => {
  try {
    const res = await fetch(`${url}/api/user/products`, {
      cache: "no-store",
    });

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
const CategoryItem = async () => {
  const productData = await getData();

  return <CategoryItems productData={productData} />;
};

export default CategoryItem;
