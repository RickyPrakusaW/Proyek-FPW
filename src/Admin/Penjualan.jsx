import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  TextField,
} from "@mui/material";

function Penjualan({ isDarkMode }) {
  const [penjualan, setPenjualan] = useState([]); // Data penjualan dari API
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian

  useEffect(() => {
    const fetchPenjualan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getPenjualan"
        );
        setPenjualan(response.data.data); // Set data penjualan
        setLoading(false);
      } catch (error) {
        console.error("Error saat mengambil data penjualan:", error);
        setError("Gagal mengambil data penjualan.");
        setLoading(false);
      }
    };

    fetchPenjualan();
  }, []);

  // Fungsi untuk menghitung total harga
  const calculateTotalHarga = (idCart, totalHarga) => {
    if (!Array.isArray(idCart) || idCart.length === 0) {
      return totalHarga || 0;
    }
    return idCart.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
  };

  // Fungsi untuk menghitung total pemasukan
  const calculateTotalPemasukan = () => {
    return penjualan.reduce(
      (total, item) =>
        total + calculateTotalHarga(item.idCart, item.totalHarga),
      0
    );
  };

  // Fungsi untuk ekspor data ke Excel
  const exportToExcel = () => {
    const dataForExcel = penjualan.map((item) => ({
      "ID Penjualan": item.idPenjualan,
      "Nama Customer": item.Customer_id?.Nama_lengkap || "Tidak ada data",
      Pembayaran: item.metodePembayaran || "Tidak ada data",
      "Nama Barang": item.namaBarang || "Tidak ada data",
      "Total Barang": item.totalBarang || 0,
      "Total Harga": calculateTotalHarga(item.idCart, item.totalHarga),
      "Tanggal Pembelian": item.tanggalPembelian,
    }));

    const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Data Penjualan");
    XLSX.writeFile(workbook, "Data_Penjualan.xlsx");
  };

  // Fungsi untuk memfilter data berdasarkan nama customer
  const filteredPenjualan = penjualan.filter((item) =>
    item.Customer_id?.Nama_lengkap?.toLowerCase().includes(
      searchQuery.toLowerCase()
    )
  );

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center">
        {error}
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Data Penjualan
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        label="Cari berdasarkan nama customer"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{
          mb: 2,
          backgroundColor: isDarkMode ? "white" : "inherit", // Latar belakang putih saat dark mode
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: isDarkMode ? "black" : "inherit", // Border hitam saat dark mode
            },
            "&:hover fieldset": {
              borderColor: isDarkMode ? "black" : "inherit", // Border hitam saat hover di dark mode
            },
            "&.Mui-focused fieldset": {
              borderColor: isDarkMode ? "black" : "inherit", // Border hitam saat fokus di dark mode
            },
            // Warna teks input
            "& input": {
              color: isDarkMode ? "black" : "inherit", // Teks hitam saat dark mode
            },
          },
          // Warna label
          "& .MuiInputLabel-root": {
            color: isDarkMode ? "black" : "inherit", // Label hitam saat dark mode
          },
        }}
      />

      {/* Tombol Ekspor ke Excel */}
      <Button
        variant="contained"
        color="primary"
        onClick={exportToExcel}
        sx={{ mb: 2 }}
      >
        Ekspor ke Excel
      </Button>

      {/* Tabel Data Penjualan */}
      {filteredPenjualan.length === 0 ? (
        <Typography variant="body1">Tidak ada data penjualan.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID Penjualan</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Pembayaran</TableCell>
                <TableCell>Detail</TableCell>
                <TableCell>Total Barang</TableCell>
                <TableCell>Total Harga</TableCell>
                <TableCell>Tanggal Pembelian</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredPenjualan.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>{item.idPenjualan}</TableCell>
                  <TableCell>
                    {item.Customer_id?.Nama_lengkap || "Tidak ada data"}
                  </TableCell>
                  <TableCell>
                    {item.metodePembayaran || "Tidak ada data"}
                  </TableCell>
                  <TableCell>{item.namaBarang || "Tidak ada data"}</TableCell>
                  <TableCell>{item.totalBarang || "Tidak ada data"}</TableCell>
                  <TableCell>
                    {" "}
                    Rp. {item.totalHarga || "Tidak ada data"}{" "}
                  </TableCell>
                  <TableCell>
                    {item.tanggalPembelian
                      ? new Date(item.tanggalPembelian).toLocaleDateString(
                          "id-ID"
                        )
                      : "Tidak ada data"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Total Pemasukan */}
      {/* <Typography variant="h6" sx={{ mt: 3 }}>
        Total Pemasukan: Rp{" "}
        {calculateTotalPemasukan().toLocaleString("id-ID", {
          minimumFractionDigits: 0,
        })}
      </Typography> */}
    </Box>
  );
}

export default Penjualan;