import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import { url } from "@/utils/api";
// import styles from "./page";

const getData = async () => {
  try {
    const res = await fetch(`${url}/api/user/products`, {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
const AllProducts = async () => {
  const products = await getData();
  console.log(products);
  return (
    <div>
      <AdminLinks />
      <OtherLinks />
      {products?.map((product) => {
        return (
          <div key={product._id}>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default AllProducts;
