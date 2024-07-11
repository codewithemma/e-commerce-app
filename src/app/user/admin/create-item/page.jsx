"use client";
import AdminLinks from "@/components/adminLinks/AdminLinks";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./CreateItem.module.css";
import { useState } from "react";
import FileBase from "react-file-base64";
import { toast } from "react-toastify";
import Loader from "@/components/loader/Loader";

const CreateItem = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: "",
  });
  const [pending, setPending] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileDone = (file) => {
    setFormData({ ...formData, image: file.base64 });
  };

  const handleSubmit = async () => {
    try {
      setPending(true);
      const res = await fetch("/api/admin/products", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setPending(false);
        setFormData({
          name: "",
          description: "",
          price: "",
          image: "",
          stock: "",
          category: "",
        });
        toast.success("New Product created successfully");
      } else {
        const error = await res.json();
        setPending(false);
        toast.error(error.message);
      }
    } catch (error) {
      setPending(false);
      toast.error(error);
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
            <label htmlFor="Category">Enter {"Product's"}Category</label>
            <select
              name="category"
              id="Category"
              className={styles.select}
              onChange={handleChange}
            >
              <option value="">Select a Category</option>
              <option value="electronics" name="category">
                Electronics
              </option>
              <option value="fashion" name="category">
                Fashion
              </option>
              <option value="entertainment" name="category">
                Entertainment
              </option>
              <option value="gaming" name="category">
                Gaming
              </option>
            </select>
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
          <button
            className={styles.submit_btn}
            onClick={handleSubmit}
            disabled={pending}
          >
            {pending ? <Loader /> : "submit"}
          </button>
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateItem;
