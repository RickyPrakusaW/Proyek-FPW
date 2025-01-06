import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  Button,
  Typography,
} from "@mui/material";

function Keranjang() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const textColor = isDarkMode ? "white" : "black";

  // Fetch cart items from backend
  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getCart");
        if (!response.ok) {
          throw new Error("Gagal mengambil data keranjang");
        }
        const data = await response.json();
        setCartItems(data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const updateCartItem = async (id, newQuantity) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/updateCart", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, totalProduct: newQuantity }),
      });

      if (!response.ok) {
        throw new Error("Gagal memperbarui jumlah barang");
      }

      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item._id === id
            ? { ...item, totalProduct: newQuantity, totalBelanja: newQuantity * item.harga }
            : item
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteCartItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/admin/deleteCart/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Gagal menghapus barang dari keranjang");
      }

      setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  const totalPenjualan = cartItems.reduce(
    (total, item) => total + item.totalBelanja,
    0
  );

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#121212" : "#f5f5f5",
        color: textColor,
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Keranjang
      </Typography>

      {loading && <Typography>Loading...</Typography>}
      {error && <Typography color="error">{error}</Typography>}

      {!loading && !error && cartItems.length === 0 && (
        <Typography>Keranjang kosong</Typography>
      )}

      {!loading && !error && cartItems.length > 0 && (
        <TableContainer component={Paper} style={{ backgroundColor: isDarkMode ? "#333" : "white" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell style={{ color: textColor }}>No</TableCell>
                <TableCell style={{ color: textColor }}>ID Barang</TableCell>
                <TableCell style={{ color: textColor }}>Nama Barang</TableCell>
                <TableCell style={{ color: textColor }}>Jumlah</TableCell>
                <TableCell style={{ color: textColor }}>Foto</TableCell>
                <TableCell style={{ color: textColor }}>Harga</TableCell>
                <TableCell style={{ color: textColor }}>Total</TableCell>
                <TableCell style={{ color: textColor }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems.map((item, index) => (
                <TableRow key={item._id}>
                  <TableCell style={{ color: textColor }}>{index + 1}</TableCell>
                  <TableCell style={{ color: textColor }}>{item.Id_product}</TableCell>
                  <TableCell style={{ color: textColor }}>{item.namaBarang}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      onClick={() => updateCartItem(item._id, Math.max(item.totalProduct - 1, 1))}
                    >
                      -
                    </Button>
                    <span style={{ margin: "0 8px", color: textColor }}>{item.totalProduct}</span>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => updateCartItem(item._id, item.totalProduct + 1)}
                    >
                      +
                    </Button>
                  </TableCell>
                  <TableCell>
                    {item.photo ? (
                      <img
                        src={item.photo}
                        alt={item.namaBarang}
                        style={{ width: 48, height: 48, objectFit: "cover" }}
                      />
                    ) : (
                      <div style={{ width: 48, height: 48, backgroundColor: "#ccc" }}></div>
                    )}
                  </TableCell>
                  <TableCell style={{ color: textColor }}>Rp. {item.harga}</TableCell>
                  <TableCell style={{ color: textColor }}>Rp. {item.totalBelanja}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      size="small"
                      onClick={() => deleteCartItem(item._id)}
                    >
                      Hapus
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {!loading && !error && cartItems.length > 0 && (
        <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Total Penjualan: Rp. {totalPenjualan}</Typography>
          <Button
            variant="contained"
            color="success"
            onClick={() => navigate("/karyawan/checkOut")}
          >
            Proses
          </Button>
        </div>
      )}
    </div>
  );
}

export default Keranjang;
