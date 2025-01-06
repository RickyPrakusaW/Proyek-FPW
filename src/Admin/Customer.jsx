import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx"; // Import library XLSX untuk ekspor Excel
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useTheme } from "../ThemeContext"; // Assuming useTheme hook is available

function Customer() {
  const [customers, setCustomers] = useState([]); // State untuk menyimpan data customer
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null); // State untuk error handling
  const { isDarkMode } = useTheme(); // Get isDarkMode from context

  useEffect(() => {
    // Mengambil data customer dari backend saat komponen dimuat
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getCustomers"
        ); // Panggil API backend
        setCustomers(response.data.data); // Set state dengan data pelanggan
        setLoading(false); // Matikan loading
      } catch (err) {
        console.error("Error saat mengambil data pelanggan:", err.message);
        setError("Gagal mengambil data pelanggan. Silakan coba lagi.");
        setLoading(false);
      }
    };

    fetchCustomers();
  }, []); // Dependency array kosong, jadi dijalankan sekali saat komponen dimuat

  // Fungsi untuk mengekspor data ke file Excel
  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(customers); // Konversi data JSON ke sheet
    const workbook = XLSX.utils.book_new(); // Membuat file workbook baru
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Pelanggan"); // Tambahkan sheet ke workbook
    XLSX.writeFile(workbook, "Data_Pelanggan.xlsx"); // Unduh file Excel
  };

  if (loading) return <CircularProgress className="mx-auto mt-5" />;

  if (error)
    return (
      <Typography color="error" className="text-center mt-5">
        {error}
      </Typography>
    );

  return (
    <div className="p-5">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ color: isDarkMode ? "white" : "black" }}
      >
        Daftar Data Pelanggan
      </Typography>
      <Button
        onClick={exportToExcel}
        variant="contained"
        color="primary"
        sx={{
          marginBottom: 2,
          "&:hover": {
            backgroundColor: "primary.dark",
          },
        }}
      >
        Ekspor ke Excel
      </Button>
      {customers.length === 0 ? (
        <Typography align="center" sx={{ color: "black" }}>
          Tidak ada pelanggan yang tersedia.
        </Typography>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ maxWidth: "100%", marginTop: 2 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ color: "black" }}>ID Pelanggan</TableCell>
                <TableCell sx={{ color: "black" }}>Nama Lengkap</TableCell>
                <TableCell sx={{ color: "black" }}>No Telepon</TableCell>
                <TableCell sx={{ color: "black" }}>Alamat</TableCell>
                <TableCell sx={{ color: "black" }}>Kota</TableCell>
                <TableCell sx={{ color: "black" }}>Negara</TableCell>
                <TableCell sx={{ color: "black" }}>Kode Pos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer.Customer_id}>
                  <TableCell sx={{ color: "black" }}>
                    {customer.Customer_id}
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    {customer.Nama_lengkap}
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    {customer.No_telepone}
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    {customer.Alamat}
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>{customer.Kota}</TableCell>
                  <TableCell sx={{ color: "black" }}>
                    {customer.Negara}
                  </TableCell>
                  <TableCell sx={{ color: "black" }}>
                    {customer.Kodepos}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
}

export default Customer;
