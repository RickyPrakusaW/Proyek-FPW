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
} from "@mui/material";

const ReturAdmin = () => {
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const [returData, setReturData] = useState([]);

  useEffect(() => {
    const fetchReturData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/admin/getReturGudang"
        );
        setReturData(response.data.data);
      } catch (error) {
        console.error("Error fetching retur data:", error);
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
    } catch (error) {
      console.error("Error approving retur:", error);
    }
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
            sx={{
              backgroundColor: "green",
              "&:hover": { backgroundColor: "darkgreen" },
            }}
            onClick={() => navigate("/kepalagudang/addBarangRetur")}
          >
            + Barang
          </Button>
        </Box>

        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: bgColor,
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
            
              </TableRow>
            </TableHead>
            <TableBody>
              {returData.map((retur, index) => (
                <TableRow
                  key={retur.idReturGudang}
                  sx={{
                    "&:hover": {
                      backgroundColor: isDarkMode ? "#1565c0" : "#e3f2fd",
                    },
                  }}
                >
                  <TableCell
                    align="center"
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  >
                    {index + 1}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  >
                    {retur.id_barang}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  >
                    {retur.namaBarang}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  >
                    {retur.jumlahBarang}
                  </TableCell>
                  <TableCell
                    align="center"
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  >
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
                  <TableCell
                    align="center"
                    sx={{ color: isDarkMode ? "white" : "black" }}
                  >
                    {retur.status}
                  </TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ReturAdmin;
