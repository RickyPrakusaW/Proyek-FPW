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
} from "@mui/material";

function Penjualan() {
  const [penjualan, setPenjualan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPenjualan = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getPenjualan"
        );
        setPenjualan(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error saat mengambil data penjualan:", error);
        setError("Gagal mengambil data penjualan.");
        setLoading(false);
      }
    };

    fetchPenjualan();
  }, []);

  const calculateTotalHarga = (idCart, totalHarga) => {
    if (!Array.isArray(idCart) || idCart.length === 0) {
      return totalHarga || 0;
    }
    return idCart.reduce(
      (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
      0
    );
  };

  const calculateTotalPemasukan = () => {
    return penjualan.reduce(
      (total, item) =>
        total + calculateTotalHarga(item.idCart, item.totalHarga),
      0
    );
  };

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
      <Button
        variant="contained"
        color="primary"
        onClick={exportToExcel}
        sx={{ mb: 2 }}
      >
        Ekspor ke Excel
      </Button>
      {penjualan.length === 0 ? (
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
              {penjualan.map((item) => (
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
      <Typography variant="h6" sx={{ mt: 3 }}>
        Total Pemasukan: Rp{" "}
        {calculateTotalPemasukan().toLocaleString("id-ID", {
          minimumFractionDigits: 0,
        })}
      </Typography>
    </Box>
  );
}

export default Penjualan;
