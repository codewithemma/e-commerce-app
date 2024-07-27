"use client";
import AdminLinks from "@/components/adminLinks/AdminLinks";
import Wrapper from "@/components/wrapper/Wrapper";
import styles from "./ProductForm.module.css";
import { useState, useEffect } from "react";
import FileBase from "react-file-base64";
import { toast } from "sonner";
import Loader from "@/components/loader/Loader";
import { DataGrid } from "@mui/x-data-grid";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

const CreateItem = ({ productData }) => {
  useEffect(() => {
    const processedData = productData.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setRows(processedData);
  }, [productData]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    category: "",
  });
  const [pageSize, setPageSize] = useState(5);
  const [pending, setPending] = useState(false);
  const [rows, setRows] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  console.log(selectedProduct);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFileDone = (file) => {
    setFormData({ ...formData, image: file.base64 });
  };

  const handleClearFormData = () => {
    setFormData({
      name: "",
      description: "",
      price: "",
      image: "",
      stock: "",
      category: "",
    });
  };

  const handleSubmit = async () => {
    try {
      setPending(true);
      const method = selectedProduct ? "PUT" : "POST";
      const url = selectedProduct
        ? `/api/admin/products/${selectedProduct._id}`
        : "/api/admin/products";
      const res = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const errorMessage = await res.json();
      console.log(errorMessage);

      if (res.ok) {
        setPending(false);
        handleClearFormData();
        setSelectedProduct(null);
        toast.success(
          `Product ${selectedProduct ? "updated" : "created"} successfully`
        );
        window.location.reload();
      } else {
        setPending(false);
        toast.error(errorMessage.message);
      }
    } catch (error) {
      setPending(false);
      toast.error(error);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleUpdate = (id) => {
    const product = rows.find((product) => product.id === id);
    scrollToTop();
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      category: product.category,
    });
    setSelectedProduct(product);
    toast.info(`Update row with ID ${id}`);
  };

  const handleDelete = async (id) => {
    const product = rows.find((item) => item.id === id);
    if (window.confirm("Are you sure you want to delete this user...?")) {
      try {
        const res = await fetch(`/api/admin/products/${product._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({}),
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message);
        }
        window.location.reload();
      } catch (error) {
        toast.error(error.message || "Something went wrong");
      }
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 20 },
    { field: "name", headerName: "Product Name", width: 250 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "price", headerName: "Price", width: 50 },
    { field: "stock", headerName: "Stock", width: 50 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div className={styles.actions_flex}>
          <button>
            <FaEdit size={20} onClick={() => handleUpdate(params.row.id)} />
          </button>
          <button>
            <FaTrashAlt size={20} onClick={() => handleDelete(params.row.id)} />
          </button>
        </div>
      ),
    },
  ];

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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="Category">Enter {"Product's"}Category</label>
            <select
              name="category"
              id="Category"
              className={styles.select}
              onChange={handleChange}
              value={formData.category}
              disabled={pending}
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
              value={formData.image}
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
        <div className={styles.grid}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 25]}
            pagination
            disableRowSelectionOnClick
          />
        </div>
      </div>
    </Wrapper>
  );
};

export default CreateItem;
