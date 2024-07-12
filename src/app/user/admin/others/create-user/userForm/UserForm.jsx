"use client";
import { useEffect, useState } from "react";
import styles from "./UserForm.module.css";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "@/components/loader/Loader";
import { FaEdit, FaTrash } from "react-icons/fa";
const UserForm = ({ userInfo }) => {
  const [pageSize, setPageSize] = useState(5);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });
  const [pending, setPending] = useState(false);

  const [rows, setRows] = useState([]);

  useEffect(() => {
    const processedData = userInfo.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setRows(processedData);
  }, [userInfo]);

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

  const handleUpdate = (id) => {
    // Implement update functionality for the row with id
    toast.info(`Update row with ID ${id}`);
  };

  const handleDelete = (id) => {
    // Implement delete functionality for the row with id
    toast.warn(`Delete row with ID ${id}`);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
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
            <FaTrash size={20} onClick={() => handleDelete(params.row.id)} />
          </button>
        </div>
      ),
    },

    // {
    //   field: "actions",
    //   headerName: "Delete",
    //   width: 150,
    //   renderCell: (params) => (
    //     <button
    //       className={styles.action_btn}
    //       onClick={() => handleDelete(params.row.id)}
    //     >
    //       Delete
    //     </button>
    //   ),
    // },
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
              disabled={pending}
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
              disabled={pending}
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
              disabled={pending}
            />
          </div>
          <select
            name="role"
            id="role"
            className={styles.select}
            onChange={handleChange}
            disabled={pending}
          >
            <option value="#">Select a Role</option>
            <option value="admin" name="role">
              Admin
            </option>
            <option value="user" name="role">
              User
            </option>
          </select>
          <button
            className={styles.submit_btn}
            onClick={handleSubmit}
            disabled={pending}
          >
            {pending ? <Loader /> : "submit"}
          </button>
        </div>
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
    </>
  );
};

export default UserForm;
