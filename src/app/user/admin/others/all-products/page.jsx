import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
import { url } from "@/utils/api";
import Table from "./DataGrid";
import styles from "./AllProducts.module.css";

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

  return (
    <div className={styles.container}>
      <AdminLinks />
      <OtherLinks />
      <Table productData={products} />
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
