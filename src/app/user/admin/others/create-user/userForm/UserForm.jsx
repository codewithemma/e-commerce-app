"use client";
import { useState } from "react";
import styles from "./UserForm.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TablePagination,
  TableSortLabel,
} from "@mui/material";
import { toast } from "react-toastify";
const UserForm = ({ userInfo }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(formData),
      });
      const errorMessage = await res.json();
      if (res.ok) {
        setFormData({
          fullName: "",
          email: "",
          password: "",
          role: "",
        });
        toast.success("Persona created successfully");
      } else {
        toast.error(errorMessage.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };

  const [rows, setRows] = useState(formData);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("name");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.address.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedRows = filteredRows.sort((a, b) => {
    if (orderBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    } else if (orderBy === "age") {
      return order === "asc" ? a.name - b.name : b.name - a.name;
    } else if (orderBy === "address") {
      return order === "asc"
        ? a.address.localeCompare(b.address)
        : b.address.localeCompare(a.address);
    }
    return 0;
  });

  const paginatedRows = sortedRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

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
            submit
          </button>
        </div>{" "}
        <Paper>
          <TextField
            label="Filter"
            variant="outlined"
            fullWidth
            margin="normal"
            value={filter}
            onChange={handleFilterChange}
          />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sortDirection={orderBy === "name" ? order : false}>
                    <TableSortLabel
                      active={orderBy === "name"}
                      direction={orderBy === "name" ? order : "asc"}
                      onClick={() => handleRequestSort("name")}
                    >
                      Name
                    </TableSortLabel>
                  </TableCell>
                  <TableCell sortDirection={orderBy === "age" ? order : false}>
                    <TableSortLabel
                      active={orderBy === "age"}
                      direction={orderBy === "age" ? order : "asc"}
                      onClick={() => handleRequestSort("age")}
                    >
                      Age
                    </TableSortLabel>
                  </TableCell>
                  <TableCell
                    sortDirection={orderBy === "address" ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === "address"}
                      direction={orderBy === "address" ? order : "asc"}
                      onClick={() => handleRequestSort("address")}
                    >
                      Address
                    </TableSortLabel>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userInfo.map((row, index) => (
                  <TableRow key={index}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.age}</TableCell>
                    <TableCell>{row.address}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={sortedRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default UserForm;
