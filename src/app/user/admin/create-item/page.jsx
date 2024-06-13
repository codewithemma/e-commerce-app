"use client";
import AdminLinks from "@/components/adminLinks/AdminLinks";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./CreateItem.module.css";
import { useState } from "react";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const createProduct = () => {
    alert(formData);
    console.log(formData);
  };
  return (
    <Wrapper>
      <AdminLinks />
      <div className={styles.container}>
        <div className={styles.input_group}>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder="Enter name of product"
            onChange={handleChange}
          />
          <input
            type="text"
            name="description"
            value={formData.description}
            placeholder="Enter product's description"
            onChange={handleChange}
          />
          <input
            type="number"
            name="price"
            value={formData.price}
            placeholder="Enter product's price"
            onChange={handleChange}
          />
          <input
            type="number"
            name="stock"
            value={formData.stock}
            placeholder="stock"
            onChange={handleChange}
          />
          <input
            type="text"
            name="category"
            value={formData.category}
            placeholder="Enter product's category"
            onChange={handleChange}
          />
          <input
            type="text"
            name="image"
            value={formData.image}
            placeholder="Enter product's image link"
            onChange={handleChange}
          />
          <button onClick={createProduct}>submit</button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateItem;
