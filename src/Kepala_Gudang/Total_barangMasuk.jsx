import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Impor useNavigate
import { useTheme } from "../ThemeContext";
import { Grid, Card, Typography, CircularProgress, Box } from "@mui/material";

const Total_barangMasuk = () => {
  const navigate = useNavigate(); // Gunakan useNavigate
  const { isDarkMode } = useTheme();
  const [barangData, setBarangData] = useState([]);
  const [barangKeluarData, setBarangKeluarData] = useState([]); // State untuk barang keluar
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data barang masuk
  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getStock");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal mengambil data barang");
        }

        setBarangData(result.data); // Set data barang masuk dari backend
      } catch (err) {
        setError(err.message);
      }
    };

    fetchBarangData();
  }, []);

  // Fetch data barang keluar
  useEffect(() => {
    const fetchBarangKeluarData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/barangKeluar");
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal mengambil data barang keluar");
        }

        setBarangKeluarData(result.data); // Set data barang keluar
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false); // Selesai memuat data
      }
    };

    fetchBarangKeluarData();
  }, []);

  // Gaya untuk kartu berdasarkan tema
  const cardStyles = {
    backgroundColor: isDarkMode ? "#1976d2" : "#64b5f6",
    textAlign: "center",
    padding: "20px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
    "&:hover": {
      backgroundColor: isDarkMode ? "#1565c0" : "#42a5f5",
    },
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#121212" : "#fff",
        color: isDarkMode ? "#fff" : "#000",
        p: 3,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* Main Content Section */}
      <Box sx={{ flex: 1, p: 3 }}>
        {/* Cards Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Kartu Total Barang */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={cardStyles}
              onClick={() => navigate("/kepalaGudang/totalBarang")} // Navigasi ke Total Barang
            >
              <Typography variant="h6" fontWeight="bold">
                Total Barang
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {barangData.length} Item
              </Typography>
            </Card>
          </Grid>

          {/* Kartu Total Barang Keluar */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={cardStyles}
              onClick={() => navigate("/kepalaGudang/totalBarangKeluar")} // Navigasi ke Total Barang Keluar
            >
              <Typography variant="h6" fontWeight="bold">
                Total Barang Keluar
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {barangKeluarData.reduce(
                  (total, barang) => total + (barang.Total_barang || 0),
                  0
                )}{" "}
                Karung
              </Typography>
            </Card>
          </Grid>

          {/* Kartu Total Barang Masuk */}
          <Grid item xs={12} sm={4}>
            <Card
              sx={cardStyles}
              onClick={() => navigate("/kepalaGudang/totalBarangMasuk")} // Navigasi ke Total Barang Masuk
            >
              <Typography variant="h6" fontWeight="bold">
                Total Barang Masuk
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {barangData.reduce(
                  (total, barang) => total + (barang.total_barang || 0),
                  0
                )}{" "}
                Karung
              </Typography>
            </Card>
          </Grid>
        </Grid>

        {/* Barang Cards Section */}
        {isLoading ? (
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <Grid container spacing={3} sx={{ mt: 4 }}>
            {barangData.map((barang, index) => (
              <Grid item xs={12} sm={4} key={barang._id || index}>
                <Card
                  sx={{
                    backgroundColor: isDarkMode ? "#424242" : "#f5f5f5",
                    p: 3,
                    textAlign: "center",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {barang.nama}
                  </Typography>
                  <Typography variant="body2">ID: {barang.id_barang}</Typography>
                  <Typography variant="body2">Tipe: {barang.tipe_barang}</Typography>
                  <Typography variant="body2">Jumlah: {barang.total_barang} karung</Typography>
                  <Typography variant="body2">Tanggal Masuk: {barang.tanggal_masuk}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Total_barangMasuk;
