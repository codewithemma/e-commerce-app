"use client";
import AdminLinks from "@/components/adminLinks/AdminLinks";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./CreateItem.module.css";
import { useState } from "react";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";

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

  const handleFileDone = (file) => {
    setFormData({ ...formData, image: file.base64 });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const errorMessage = await res.json();
      if (res.ok) {
        toast.success("New Product created successfully");
      } else {
        toast.error(errorMessage.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Wrapper>
      <AdminLinks />
      <div className={styles.container}>
        <div className={styles.input}>
          <div className={styles.input_group}>
            <label htmlFor="name">Enter name of Product</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              placeholder="Enter name of product"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="description">Enter {"Product's"} description</label>
            <textarea
              type="text"
              name="description"
              value={formData.description}
              placeholder="Enter product's description"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              placeholder="Enter product's price"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="stock">How much is in Stock...?</label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              placeholder="stock"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="Category">Enter {"Product's"} Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              placeholder="Enter product's category"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="image">Image</label>
            <FileBase
              type="file"
              id="image"
              multiple={false}
              onDone={handleFileDone}
            />
          </div>
          <button className={styles.submit_btn} onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateItem;
