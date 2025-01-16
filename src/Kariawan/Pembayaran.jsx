import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardContent, Typography, Button, Grid, Box } from "@mui/material";
import axios from "axios";

function Pembayaran() {
  const location = useLocation();
  const navigate = useNavigate();

  const { idPenjualan } = location.state || { idPenjualan: "" };

  // State untuk data penjualan
  const [penjualanData, setPenjualanData] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState(""); // Menyimpan metode pembayaran yang dipilih

  // Fetch data penjualan
  useEffect(() => {
    const fetchPenjualanData = async () => {
      try {
        
        const response = await axios.get(`http://localhost:3000/api/admin/getPenjualan/${idPenjualan}`);
        
        setPenjualanData(response.data);
      } catch (error) {
        console.error("Error fetching penjualan data:", error);
        alert("Gagal memuat data penjualan.");
      }
    };

    fetchPenjualanData();
  }, [idPenjualan]);

  // Fungsi untuk mengirim data pembayaran ke backend
  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Pilih metode pembayaran terlebih dahulu!");
      return;
    }

    try {
      // Kirim PUT request untuk update metode pembayaran
      console.log('sebelum')
      const response = await axios.put(
        `http://localhost:3000/api/admin/updatePenjualan/${idPenjualan}`,
        { metodePembayaran: paymentMethod }
      );
      console.log('sesudah')

      alert("Pembayaran berhasil! Metode pembayaran telah diperbarui.");
      navigate("/karyawan");
    } catch (error) {
      console.error("Error selama pembayaran:", error);
      alert("Terjadi kesalahan saat memperbarui metode pembayaran: " + error.message);
    }
  };

  if (!penjualanData) {
    return <Typography>Memuat data...</Typography>;
  }

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
                src="https://w7.pngwing.com/pngs/561/1/png-transparent-bank-central-asia-logo-bca-finance-business-bank-blue-cdr-text.png"
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
            <Typography variant="h6">Total Tagihan: Rp. {penjualanData.totalHarga}</Typography>
          </div>

          {/* Data pelanggan */}
          <Box mt={3}>
            <Typography variant="subtitle1">Data Pelanggan:</Typography>
            {penjualanData.Customer_id && (
              <>
                <Typography>Nama: {penjualanData.Customer_id.Nama_lengkap}</Typography>
                <Typography>No Telepon: {penjualanData.Customer_id.No_telepone}</Typography>
                <Typography>Alamat: {penjualanData.Customer_id.Alamat}</Typography>
              </>
            )}
          </Box>

          {/* Tombol kembali */}
          <div style={{ marginTop: "20px" }}>
            <Button variant="contained" color="secondary" fullWidth onClick={() => navigate(-1)}>
              Kembali
            </Button>
          </div>

          {/* Tombol bayar */}
          <div style={{ marginTop: "10px" }}>
            <Button variant="contained" color="primary" fullWidth onClick={handlePayment}>
              Bayar
            </Button>
          </div>
        </CardContent>
      </Card>
    </Grid>
  );
}

export default Pembayaran;