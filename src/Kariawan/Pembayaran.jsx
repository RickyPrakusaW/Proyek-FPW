import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import axios from "axios"; // Pastikan Anda memiliki axios terinstal

function Pembayaran() {
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data dari state navigasi
  const { totalBelanja, formData, cartItems, idPenjualan } = location.state || {
    totalBelanja: 0,
    formData: {},
    cartItems: [],
    idPenjualan: "", // Pastikan ID Penjualan ada
  };

  // State untuk metode pembayaran
  const [paymentMethod, setPaymentMethod] = useState(""); // Menyimpan metode pembayaran yang dipilih

  // Fungsi untuk mengirim data pembayaran ke backend
  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }
  
    console.log("ID Penjualan:", idPenjualan);
    console.log("Metode Pembayaran:", paymentMethod);
  
    try {
      // Kirim PUT request untuk update metode pembayaran
      const response = await axios.put(
        `http://localhost:3000/api/admin/updateMetodePembayaran/${idPenjualan}`,
        { metodePembayaran: paymentMethod }
      );
  
      alert("Pembayaran berhasil! Metode pembayaran telah diperbarui.");
      navigate("/karyawan");
    } catch (error) {
      console.error("Error selama pembayaran:", error);
      alert("Terjadi kesalahan saat memperbarui metode pembayaran: " + error.message);
    }
  };
  

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: "100vh" }}>
      <Card style={{ width: "400px", padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Pembayaran
          </Typography>

          {/* Pilihan metode pembayaran */}
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
            <Button
              variant={paymentMethod === "transfer" ? "contained" : "outlined"}
              color="primary"
              onClick={() => setPaymentMethod("transfer")}
              style={{ flex: 1, marginRight: "10px", display: "flex", alignItems: "center" }}
            >
              <img
                src={"https://w7.pngwing.com/pngs/561/1/png-transparent-bank-central-asia-logo-bca-finance-business-bank-blue-cdr-text.png"}
                alt="BCA Logo"
                style={{ width: "30px", height: "30px", marginRight: "10px" }}
              />
              BCA Transfer
            </Button>

            <Button
              variant={paymentMethod === "cash" ? "contained" : "outlined"}
              color="secondary"
              onClick={() => setPaymentMethod("cash")}
              style={{ flex: 1, marginLeft: "10px", display: "flex", alignItems: "center" }}
            >
              <span role="img" aria-label="cash" style={{ fontSize: "24px", marginRight: "10px" }}>
                💵
              </span>
              Cash
            </Button>
          </div>

          {/* Menampilkan total tagihan */}
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <Typography variant="h6">Total Tagihan: Rp. {totalBelanja}</Typography>
          </div>

          {/* Data pelanggan */}
          <Box mt={3}>
            <Typography variant="subtitle1">Data Pelanggan:</Typography>
            <Typography>Nama: {formData.Nama_lengkap}</Typography>
            <Typography>No Telepon: {formData.No_telepone}</Typography>
            <Typography>Alamat: {formData.Alamat}, {formData.Kota}, {formData.Negara}</Typography>
            <Typography>Kode Pos: {formData.Kodepos}</Typography>
          </Box>

          {/* Tombol kembali */}
          <div style={{ marginTop: "20px" }}>
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              onClick={() => navigate(-1)}
            >
              Kembali
            </Button>
          </div>

          {/* Tombol bayar */}
          <div style={{ marginTop: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handlePayment}
            >
              Bayar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Pembayaran;
