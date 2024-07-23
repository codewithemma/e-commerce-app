import { url } from "@/utils/api";
import RelatedProducts from "./RelatedProducts";

const getData = async () => {
  try {
    const res = await fetch(`${url}/api/user/products`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
const RelatedProduct = async () => {
  const productData = await getData();

  return <RelatedProducts productData={productData} />;
};

export default RelatedProduct;
