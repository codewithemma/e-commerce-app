"use client";
import { useEffect, useState } from "react";
import styles from "./UserForm.module.css";
import { toast } from "sonner";
import { DataGrid } from "@mui/x-data-grid";
import Loader from "@/components/loader/Loader";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Wrapper from "@/components/wrapper/Wrapper";
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
  const [selectedUser, setSelectedUser] = useState(null);

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
      const method = selectedUser ? "PUT" : "POST";
      const url = selectedUser
        ? `/api/admin/user/${selectedUser._id}`
        : "/api/admin/user";
      const res = await fetch(url, {
        method,
        headers: {
          "content-type": "application/json",
        },
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
        setSelectedUser(null);
        toast.success(
          `User ${selectedUser ? "updated" : "created"} successfully`
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
    const user = rows.find((data) => data.id === id);
    scrollToTop();
    setFormData({
      fullName: user.fullName,
      email: user.email,
      password: "",
      role: user.role,
    });
    setSelectedUser(user);
  };

  const handleDelete = async (id) => {
    const user = rows.find((user) => user.id === id);
    if (window.confirm("Are you sure you want to delete this user...?")) {
      try {
        const res = await fetch(`/api/admin/user/${user._id}`, {
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
            <FaTrashAlt size={20} onClick={() => handleDelete(params.row.id)} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <Wrapper>
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
            {pending ? <Loader /> : selectedUser ? "Update" : "Submit"}
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

export default UserForm;
