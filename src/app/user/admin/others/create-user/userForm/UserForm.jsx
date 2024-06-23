"use client";
import { useState } from "react";
import styles from "./UserForm.module.css";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "@/components/loader/Loader";
const UserForm = ({ userInfo }) => {
  const [pageSize, setPageSize] = useState(5);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [pending, setPending] = useState(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      setPending(true);
      const res = await fetch("/api/admin/user", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const errorMessage = await res.json();
      if (res.ok) {
        setPending(false);
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("Persona created successfully");
      } else {
        setPending(false);
        toast.error(errorMessage.message);
      }
    } catch (error) {
      setPending(false);
      toast.error(error);
    }
  };

  const columns = [
    { field: "_id", headerName: "ID", width: 150 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
  ];

  return (
    <>
      <div className={styles.container}>
        <div className={styles.input}>
          <div className={styles.input_group}>
            <label htmlFor="name">Enter name </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              placeholder="Enter name"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="email">Enter Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter email"
              onChange={handleChange}
            />
          </div>
          <div className={styles.input_group}>
            <label htmlFor="password">Enter Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter Password"
              onChange={handleChange}
            />
          </div>
          <select
            name="role"
            id="role"
            className={styles.select}
            onChange={handleChange}
          >
            <option value="#">Select a Role</option>
            <option value="admin" name="role">
              Admin
            </option>
            <option value="user" name="role">
              User
            </option>
          </select>
          <button className={styles.submit_btn} onClick={handleSubmit}>
            {pending ? <Loader /> : "submit"}
          </button>
        </div>
        <DataGrid
          rows={userInfo}
          columns={columns}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 25]}
          pagination
          disableRowSelectionOnClick
          getRowId={(row) => row._id}
        />
      </div>
    </>
  );
};

export default UserForm;
