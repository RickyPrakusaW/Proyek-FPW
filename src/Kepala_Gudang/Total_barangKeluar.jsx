import React, { useEffect, useState } from "react";
import { useTheme } from "../ThemeContext";
import { Grid, Card, Typography, CircularProgress, Box } from "@mui/material";

const Homekepalagudang = () => {
  const { isDarkMode } = useTheme();
  const [barangData, setBarangData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBarangData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/barangKeluar"); // Endpoint backend
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || "Gagal mengambil data barang");
        }

        setBarangData(result.data); // Set data barang keluar dari backend
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBarangData();
  }, []);

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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: isDarkMode ? "#1976d2" : "#64b5f6",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Barang Keluar
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
          <Grid item xs={12} sm={4}>
            <Card
              sx={{
                backgroundColor: isDarkMode ? "#1976d2" : "#64b5f6",
                textAlign: "center",
                p: 3,
              }}
            >
              <Typography variant="h6" fontWeight="bold">
                Total Barang
              </Typography>
              <Typography variant="h4" fontWeight="bold">
                {barangData.length} Barang
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
              <Grid item xs={12} sm={4} key={barang.Id_barang_keluar || index}>
                <Card
                  sx={{
                    backgroundColor: isDarkMode ? "#424242" : "#f5f5f5",
                    p: 3,
                    textAlign: "center",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  {/* Display photo at the top */}
                  {/* {barang.Photo_barang_keluar && (
                    <img
                      src={barang.photo_url}
                      alt={barang.Nama_barang}
                      style={{
                        width: "100%",
                        height: "auto",
                        borderRadius: "8px",
                        marginBottom: "16px", // Adds space between image and text
                      }}
                    />
                  )} */}

                  {/* Display barang information */}
                  <Typography variant="h6" fontWeight="bold">
                    {barang.Nama_barang}
                  </Typography>
                  <Typography variant="body2">ID: {barang.Id_barang_keluar}</Typography>
                  <Typography variant="body2">id_barang : {barang.id_barang}</Typography>
                  <Typography variant="body2">Tipe: {barang.Tipe_barang}</Typography>
                  <Typography variant="body2">Jumlah: {barang.Total_barang} Karung</Typography>
                  <Typography variant="body2">Tanggal Keluar: {barang.Tanggal_keluar}</Typography>
                  <Typography variant="body2">Status: {barang.Status}</Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Homekepalagudang;
