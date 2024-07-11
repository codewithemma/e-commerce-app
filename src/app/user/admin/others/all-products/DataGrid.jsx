"use client";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";

const Table = ({ productData }) => {
  const [pageSize, setPageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "productName", headerName: "Product Name", width: 150 },
    { field: "category", headerName: "Category", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "stock", headerName: "Stock", width: 100 },
  ];
  useEffect(() => {
    const processedData = productData.map((user, index) => ({
      ...user,
      id: index + 1,
    }));
    setRows(processedData);
  }, [productData]);
  return (
    <DataGrid
      rows={rows}
      columns={columns}
      pageSize={pageSize}
      onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
      rowsPerPageOptions={[5, 10, 25]}
      pagination
      disableRowSelectionOnClick
    />
  );
};

export default Table;
