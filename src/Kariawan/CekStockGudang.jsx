import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
} from "@mui/material";

function CekStockGudang() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/getStock") // Sesuaikan URL ini
      .then((response) => {
        console.log("Response data:", response.data); // Debug log
        setStocks(response.data.data || []); // Pastikan ada fallback
      })
      .catch((err) => {
        console.error("Error fetching data:", err.response || err.message); // Debug log
        setError("Gagal mengambil data stock.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "16px",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography variant="h4" gutterBottom style={{ color: "#000" }}>
        Stock Gudang
      </Typography>

      {loading && <CircularProgress color="primary" />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && (
        <Grid container spacing={3}>
          {stocks.length > 0 ? (
            stocks.map((stock) => (
              <Grid item xs={12} sm={6} md={4} key={stock._id_stock}>
                <Card>
                  <CardContent>
                    
                    <Typography variant="h6">{stock.nama_barang}</Typography>
                    <Typography variant="body2">
                      Jumlah: {stock.total_barang}
                    </Typography>
                    <Typography variant="body2">
                      Kategori: {stock.tipe_barang}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1">Data stock tidak ditemukan.</Typography>
          )}
        </Grid>
      )}
    </div>
  );
}

export default CekStockGudang;
