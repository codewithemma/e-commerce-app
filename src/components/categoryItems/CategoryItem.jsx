import { url } from "@/utils/api";
import CategoryItems from "./CategoryItems";
import ErrorPage from "../errorPage/ErrorPage";

const getData = async () => {
  try {
    const res = await fetch(`${url}/api/user/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      return null;
    }
    return res.json();
  } catch (error) {
    return null;
  }
};
const CategoryItem = async () => {
  const productData = await getData();

  if (productData === null) {
    return <ErrorPage />;
  }

  return <CategoryItems productData={productData} />;
};

export default CategoryItem;
