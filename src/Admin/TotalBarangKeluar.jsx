import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Avatar,
  Alert,
  Box,
} from "@mui/material";

function TotalBarangKeluar() {
  const [barangKeluar, setBarangKeluar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data barang keluar
  useEffect(() => {
    const fetchBarangKeluar = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/barangKeluar"
        );
        setBarangKeluar(response.data.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching data");
        setLoading(false);
      }
    };

    fetchBarangKeluar();
  }, []);

  // Function untuk approve status
  const handleApprove = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/barangKeluar/status/${id}`,
        { status: "Approve" }
      );
      // Update data di frontend setelah status diubah
      setBarangKeluar((prevBarang) =>
        prevBarang.map((item) =>
          item.Id_barang_keluar === id ? { ...item, Status: "Approve" } : item
        )
      );
      alert(response.data.message);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Gagal memperbarui status");
    }
  };

  // Jika masih loading
  if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;

  // Jika terjadi error
  if (error) return <Alert severity="error" style={{ margin: '20px auto', width: 'fit-content' }}>{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" align="center" gutterBottom color="black">
        Daftar Barang Keluar
      </Typography>
      {barangKeluar.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          Tidak ada data barang keluar
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Nama Barang</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Jumlah</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Photo</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barangKeluar.map((barang) => (
                <TableRow key={barang.Id_barang_keluar}>
                  <TableCell>{barang.Nama_barang}</TableCell>
                  <TableCell>{barang.Jumlah}</TableCell>
                  <TableCell>
                    <Avatar src={barang.photo_url} alt={barang.Nama_barang} />
                  </TableCell>
                  <TableCell>{barang.Status}</TableCell>
                  <TableCell>
                    {barang.Status === "Pending" ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(barang.Id_barang_keluar)}
                      >
                        Approve
                      </Button>
                    ) : (
                      <Typography color="success.main" fontWeight="bold">
                        Approved
                      </Typography>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}

export default TotalBarangKeluar;