import React, { useEffect, useState } from "react";
import { useTheme } from "./../ThemeContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  Snackbar,
  Alert,
  Tooltip,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/system";

// Perbaikan StyledTableRow
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:hover": {
    backgroundColor: theme.palette.mode === "dark" ? "#0d47a1" : "#003f6e", // Warna hover berdasarkan mode
    transition: "background-color 0.3s ease",
  },
}));

const ReturAdmin = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [returData, setReturData] = useState([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  useEffect(() => {
    const fetchReturData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getReturGudang"
        );
        setReturData(response.data.data);
      } catch (error) {
        console.error("Error fetching retur data:", error);
        setSnackbarMessage("Gagal memuat data retur");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    };

    fetchReturData();
  }, []);

  const handleApprove = async (idReturGudang) => {
    try {
      await axios.put(
        `http://localhost:3000/api/admin/updateStatusRetur/${idReturGudang}`,
        {
          status: "approved",
        }
      );

      const response = await axios.get(
        "http://localhost:3000/api/admin/getReturGudang"
      );
      setReturData(response.data.data);
      setSnackbarMessage("Status retur berhasil disetujui");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error approving retur:", error);
      setSnackbarMessage("Gagal menyetujui retur");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const textColor = isDarkMode ? "white" : "black";
  const bgColor = isDarkMode ? "#424242" : "#ffffff";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "#303030" : "#f5f5f5",
        color: textColor,
        p: 3,
      }}
    >
      <Box sx={{ maxWidth: "90%", mx: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h4" fontWeight="bold">
            Retur Barang
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={() => navigate("/kepalagudang/addBarangRetur")}
          >
            Tambah Barang
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: bgColor,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Table>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: isDarkMode ? "#1976d2" : "#bbdefb",
                }}
              >
                <TableCell align="center" sx={{ color: textColor }}>
                  No
                </TableCell>
                <TableCell align="center" sx={{ color: textColor }}>
                  ID Barang
                </TableCell>
                <TableCell align="center" sx={{ color: textColor }}>
                  Nama Barang
                </TableCell>
                <TableCell align="center" sx={{ color: textColor }}>
                  Jumlah
                </TableCell>
                <TableCell align="center" sx={{ color: textColor }}>
                  Tanggal
                </TableCell>
                <TableCell align="center" sx={{ color: textColor }}>
                  Foto Barang
                </TableCell>
                <TableCell align="center" sx={{ color: textColor }}>
                  Status
                </TableCell>
                {/* <TableCell align="center" sx={{ color: textColor }}>
                  Aksi
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {returData.map((retur, index) => (
                <StyledTableRow key={retur.idReturGudang}>
                  <TableCell align="center" sx={{ color: textColor }}>
                    {index + 1}
                  </TableCell>
                  <TableCell align="center" sx={{ color: textColor }}>
                    {retur.id_barang}
                  </TableCell>
                  <TableCell align="center" sx={{ color: textColor }}>
                    {retur.namaBarang}
                  </TableCell>
                  <TableCell align="center" sx={{ color: textColor }}>
                    {retur.jumlahBarang}
                  </TableCell>
                  <TableCell align="center" sx={{ color: textColor }}>
                    {new Date(retur.tanggal).toLocaleDateString()}
                  </TableCell>
                  <TableCell align="center">
                    <Avatar
                      variant="square"
                      src={`http://localhost:3000/api/admin/uploads/stock/${retur.photoBarang}`}
                      alt="Barang"
                      sx={{ width: 56, height: 56, mx: "auto" }}
                    />
                  </TableCell>
                  <TableCell align="center" sx={{ color: textColor }}>
                    {retur.status === "approved" ? (
                      <Tooltip title="Approved">
                        <CheckCircleIcon sx={{ color: "green" }} />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Pending">
                        <PendingIcon sx={{ color: "orange" }} />
                      </Tooltip>
                    )}
                  </TableCell>
                  {/* <TableCell align="center">
                    {retur.status !== "approved" && (
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleApprove(retur.idReturGudang)}
                      >
                        Approve
                      </Button>
                    )}
                  </TableCell> */}
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Snackbar untuk feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ReturAdmin;