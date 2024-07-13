import { url } from "@/utils/api";
import CategoryItems from "./CategoryItems";

// const getData = async () => {
//   try {
//     const res = await fetch(`${url}/api/user/products`, {
//       cache: "no-store",
//     });
//     if (!res.ok) {
//       throw new Error(`HTTP error! status: ${res.status}`);
//     }
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return null;
//   }
// };

const getData = async () => {
  try {
    const fetchUrl = `${url}/api/user/products`;
    console.log("Fetching data from:", fetchUrl);

    const res = await fetch(fetchUrl, {
      cache: "no-store",
    });

    console.log("Response status:", res.status);

    if (!res.ok) {
      console.error(`HTTP error! status: ${res.status} - ${res.statusText}`);
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    console.log("Fetched data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    console.error("Error stack trace:", error.stack);
    return null;
  }
};
const CategoryItem = async () => {
  const productData = await getData();
  return <CategoryItems productData={productData} />;
};

export default CategoryItem;
