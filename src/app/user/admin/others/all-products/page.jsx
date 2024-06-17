import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import { url } from "@/utils/api";
// import styles from "./page";
const getData = async () => {
  const res = await fetch(`${url}/api/products`, {
    cache: "no-store",
  });
  return res.json();
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
