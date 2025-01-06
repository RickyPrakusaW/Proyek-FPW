import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import * as XLSX from "xlsx";
import {
  Box,
  Button,
  IconButton,
  InputBase,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Modal,
  Avatar,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import BlockRoundedIcon from "@mui/icons-material/BlockRounded";

const ManageKaryawan = () => {
  const navigate = useNavigate();
  const [karyawans, setKaryawans] = useState([]);
  const [filteredKaryawans, setFilteredKaryawans] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedKaryawan, setSelectedKaryawan] = useState(null);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchKaryawans = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getKaryawan"
        );
        const data = response.data?.data || [];
        setKaryawans(data);
        setFilteredKaryawans(data);
      } catch (err) {
        setError("Gagal memuat data karyawan. Coba lagi nanti.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchKaryawans();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const result = karyawans.filter(
      (karyawan) =>
        karyawan.nama_lengkap.toLowerCase().includes(lowerCaseQuery) ||
        karyawan.id_karyawan.toString().includes(lowerCaseQuery)
    );
    setFilteredKaryawans(result);
  }, [searchQuery, karyawans]);

  const updateStatusKaryawan = async (id, newStatus) => {
    if (
      !window.confirm(
        `Apakah Anda yakin ingin mengubah status menjadi ${newStatus}?`
      )
    )
      return;

    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/updateStatusKaryawan/${id}`,
        { status: newStatus }
      );
      if (response.status === 200) {
        setKaryawans((prevKaryawans) =>
          prevKaryawans.map((karyawan) =>
            karyawan.id_karyawan === id
              ? { ...karyawan, status: newStatus }
              : karyawan
          )
        );
      }
    } catch (err) {
      setError("Gagal memperbarui status karyawan.");
      console.error("Update error:", err);
    }
  };

  const closePopup = () => setSelectedKaryawan(null);

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredKaryawans);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Karyawan");
    XLSX.writeFile(wb, "Karyawan_List.xlsx");
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={isDarkMode ? "grey.900" : "background.default"}
        color={isDarkMode ? "common.white" : "text.primary"}
      >
        <Box textAlign="center">
          <Typography variant="h6" fontWeight="bold" mb={2}>
            Memuat data karyawan...
          </Typography>
          <CircularProgress />
        </Box>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        bgcolor={isDarkMode ? "grey.900" : "background.default"}
        color={isDarkMode ? "common.white" : "text.primary"}
      >
        <Box textAlign="center">
          <Typography variant="h6" color="error" fontWeight="bold" mb={2}>
            {error}
          </Typography>
          <Button variant="contained" color="primary" onClick={() => window.location.reload()}>
            Coba Lagi
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box minHeight="100vh" bgcolor={isDarkMode ? "grey.900" : "background.default"} color={isDarkMode ? "common.white" : "text.primary"}>
      <Box padding={8} flexGrow={1}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={5}>
          <Typography variant="h5" fontWeight="bold">
            Daftar Karyawan
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}>
              <InputBase
                placeholder="Cari Nama atau ID"
                inputProps={{ 'aria-label': 'cari karyawan' }}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                sx={{ ml: 1, flex: 1, color: isDarkMode ? 'common.white' : 'text.primary' }}
              />
              <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon color="primary" />
              </IconButton>
            </Paper>
            <Button
              variant="contained"
              color="success"
              startIcon={<AddIcon />}
              onClick={() => navigate("/admin/addKaryawan")}
            >
              Tambah Karyawan
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<FileDownloadIcon />}
              onClick={exportToExcel}
            >
              Export ke Excel
            </Button>
            <Typography variant="subtitle1" ml={5}>
              Total Karyawan: {filteredKaryawans.length}
            </Typography>
          </Box>
        </Box>

        <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
          <Table aria-label="daftar karyawan">
            <TableHead>
              <TableRow bgcolor={isDarkMode ? "primary.dark" : "primary.light"}>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>ID</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Nama Lengkap</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Tempat Lahir</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Tanggal Lahir</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Jenis Kelamin</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Golongan Darah</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>No Telepon</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ color: 'common.white', fontWeight: 'bold' }}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredKaryawans.map((karyawan) => (
                <TableRow
                  key={karyawan.id_karyawan}
                  sx={{ bgcolor: karyawan.index % 2 === 0 ? 'grey.50' : 'common.white' }}
                >
                  <TableCell>{karyawan.id_karyawan}</TableCell>
                  <TableCell>{karyawan.nama_lengkap}</TableCell>
                  <TableCell>{karyawan.tempat_lahir}</TableCell>
                  <TableCell>
                    {new Date(karyawan.tanggal_lahir).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </TableCell>
                  <TableCell>{karyawan.jenis_kelamin}</TableCell>
                  <TableCell>{karyawan.golongan_darah}</TableCell>
                  <TableCell>{karyawan.no_telepon}</TableCell>
                  <TableCell sx={{ fontWeight: 'bold', color: karyawan.status === "Aktif" ? 'success.main' : 'error.main' }}>
                    {karyawan.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="primary"
                      size="small"
                      onClick={() => setSelectedKaryawan(karyawan)}
                      sx={{ marginRight: 1 }}
                    >
                      Detail
                    </Button>
                    <Button
                      variant="contained"
                      size="small"
                      color={karyawan.status === "Aktif" ? "warning" : "secondary"}
                      startIcon={karyawan.status === "Aktif" ? <BlockRoundedIcon /> : <CheckCircleOutlineIcon />}
                      onClick={() =>
                        updateStatusKaryawan(
                          karyawan.id_karyawan,
                          karyawan.status === "Aktif" ? "Nonaktif" : "Aktif"
                        )
                      }
                    >
                      {karyawan.status === "Aktif" ? "Nonaktifkan" : "Aktifkan"}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredKaryawans.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    Tidak ada karyawan yang ditemukan.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Modal
          open={!!selectedKaryawan}
          onClose={closePopup}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: isDarkMode ? 'grey.800' : 'background.paper',
              color: isDarkMode ? 'common.white' : 'text.primary',
              border: '2px solid #000',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" mb={3}>
              Detail Karyawan
              <IconButton aria-label="close" onClick={closePopup} sx={{ position: 'absolute', right: 8, top: 8 }}>
                <CloseIcon />
              </IconButton>
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
              <Avatar
                alt={selectedKaryawan?.nama_lengkap}
                src={selectedKaryawan?.foto || "https://via.placeholder.com/150"}
                sx={{ width: 100, height: 100, mb: 2 }}
              />
              <Typography><strong>Nama:</strong> {selectedKaryawan?.nama_lengkap}</Typography>
              <Typography><strong>Alamat:</strong> {selectedKaryawan?.alamat || "-"}</Typography>
              <Typography><strong>Jenis Kelamin:</strong> {selectedKaryawan?.jenis_kelamin}</Typography>
              <Typography><strong>Golongan Darah:</strong> {selectedKaryawan?.golongan_darah}</Typography>
              <Typography><strong>No Telepon:</strong> {selectedKaryawan?.no_telepon}</Typography>
              <Typography><strong>Status:</strong> {selectedKaryawan?.status}</Typography>
            </Box>
            <Box textAlign="right">
              <Button variant="contained" color="error" onClick={closePopup}>
                Tutup
              </Button>
            </Box>
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default ManageKaryawan;