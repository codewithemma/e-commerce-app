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
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }
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
    </div>
  );
};

export default AllProducts;
