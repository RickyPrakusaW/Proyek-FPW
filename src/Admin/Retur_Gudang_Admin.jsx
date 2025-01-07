import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
  Alert,
  Box,
} from '@mui/material';

function Retur_Gudang_Admin() {
  const [returGudang, setReturGudang] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data retur gudang dari API
  useEffect(() => {
    const fetchReturGudang = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/admin/getReturGudang');
        setReturGudang(response.data.data);
        setLoading(false);
      } catch (err) {
        setError(err.response?.data?.error || 'Error fetching data');
        setLoading(false);
      }
    };

    fetchReturGudang();
  }, []);

  // Fungsi untuk mengubah status menjadi "Approve"
  const handleApprove = async (idReturGudang) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/admin/updateStatusRetur/${idReturGudang}`, {
        status: 'approve',
      });

      // Update status di frontend tanpa refresh
      setReturGudang((prev) =>
        prev.map((retur) =>
          retur.idReturGudang === idReturGudang ? { ...retur, status: 'approve' } : retur
        )
      );
      alert('Status berhasil diperbarui menjadi Approve!');
    } catch (err) {
      alert(err.response?.data?.error || 'Terjadi kesalahan saat memperbarui status');
    }
  };

  if (loading) return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
  if (error) return <Alert severity="error" style={{ margin: '20px auto', width: 'fit-content' }}>{error}</Alert>;

  return (
    <Box sx={{ maxWidth: 800, margin: '20px auto', padding: 3, boxShadow: 3, borderRadius: 2, backgroundColor: 'background.paper' }}>
      <Typography variant="h4" align="center" gutterBottom color='black'>
        Daftar Retur Gudang
      </Typography>
      {returGudang.length === 0 ? (
        <Typography variant="body1" align="center" color="textSecondary">
          Tidak ada data retur ditemukan
        </Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>ID Barang</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Nama Barang</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Jumlah Retur</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Keterangan</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {returGudang.map((retur) => (
                <TableRow key={retur.idReturGudang}>
                  <TableCell>{retur.idReturGudang}</TableCell>
                  <TableCell>{retur.namaBarang || 'N/A'}</TableCell>
                  <TableCell>{retur.jumlahBarang}</TableCell>
                  <TableCell>{retur.keterangan || 'Tidak ada'}</TableCell>
                  <TableCell>{retur.status}</TableCell>
                  <TableCell>
                    {retur.status !== 'approve' ? (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(retur.idReturGudang)}
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

export default Retur_Gudang_Admin;