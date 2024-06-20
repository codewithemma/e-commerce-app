import AdminLinks from "@/components/adminLinks/AdminLinks";
import OtherLinks from "@/components/otherLinks/OtherLinks";
// import styles from "./page";

const getData = async () => {
  try {
    const res = await fetch(`/api/admin/products`, {
      cache: "no-store",
    });
    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
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
