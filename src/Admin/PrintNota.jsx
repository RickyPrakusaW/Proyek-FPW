import React, { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Button,
  Box,
  IconButton,
  Tooltip,
  Container,
  TextField,
} from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useTheme } from "../ThemeContext"; // Asumsikan Anda memiliki hook useTheme

function PrintNota() {
  const [penjualan, setPenjualan] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State untuk menyimpan query pencarian
  const { isDarkMode } = useTheme(); // Ambil nilai isDarkMode dari context

  useEffect(() => {
    const fetchPenjualan = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/getPenjualan");
        const result = await response.json();
        if (response.ok) {
          setPenjualan(result.data);
        } else {
          console.error(result.message);
        }
      } catch (error) {
        console.error("Error fetching penjualan:", error);
      }
    };

    fetchPenjualan();
  }, []);

  // Fungsi untuk memfilter data berdasarkan nama customer
  const filteredPenjualan = penjualan.filter((nota) =>
    nota.Customer_id?.Nama_lengkap?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handlePrint = (nota) => {
    const doc = new jsPDF();
    
    // Menambahkan logo dari folder assets
    const logoUrl = "../assets/logo.jpg"; // Path relatif ke logo

    doc.addImage(logoUrl, 'JPEG', 10, 10, 30, 30); // Menambahkan logo ke PDF

    // Header nota
    doc.setFontSize(16);
    doc.text("TOKO SEMOGA JADI JAYA", 105, 20, { align: "center" });
    doc.setFontSize(12);
    doc.text("Menjual Tas dan Koper", 105, 27, { align: "center" });
    doc.text("Alamat: Dupak Grosir Surabaya Blok A2 No. 5", 105, 34, { align: "center" });
    doc.text("Telepon: 08510059521", 105, 41, { align: "center" });

    // Info Nota
    doc.setFontSize(10);
    doc.text(`Nama Customer: ${nota.Customer_id.Nama_lengkap}`, 20, 50);
    doc.text(`Metode Pembayaran: ${nota.metodePembayaran}`, 20, 57);
    doc.text(`Tanggal Pembelian: ${nota.tanggalPembelian}`, 20, 64);
    doc.text(`Total Barang: ${nota.totalBarang}`, 20, 71);
    doc.text(`Total Harga: Rp ${nota.totalHarga}`, 20, 78);

    // Header tabel
    const tableStartY = 85;
    doc.setFontSize(10);
    doc.text("No", 20, tableStartY);
    doc.text("Nama Barang", 40, tableStartY);
    doc.text("Harga", 120, tableStartY);
    doc.text("Jumlah", 150, tableStartY);
    doc.text("Total", 180, tableStartY);
    doc.line(20, tableStartY + 2, 190, tableStartY + 2);

    // Data tabel
    let yOffset = tableStartY + 10;
    let grandTotal = 0;

    if (nota.idCart && Array.isArray(nota.idCart)) {
      nota.idCart.forEach((item, index) => {
        const itemTotal = item.harga * item.totalProduct;
        grandTotal += itemTotal;

        doc.text(`${index + 1}`, 20, yOffset);
        doc.text(item.namaBarang, 40, yOffset);
        doc.text(`Rp ${item.harga}`, 120, yOffset);
        doc.text(`${item.totalProduct}`, 150, yOffset);
        doc.text(`Rp ${itemTotal}`, 180, yOffset);
        yOffset += 10;
      });
    }

    // Footer
    yOffset += 20;
    doc.text(`Grand Total: Rp ${grandTotal}`, 20, yOffset);

    yOffset += 20;
    doc.text("Tanda Terima,", 20, yOffset);
    doc.text("Hormat Kami,", 150, yOffset);

    doc.save(`Nota_${nota._id}.pdf`);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <ReceiptIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography variant="h4" component="h1">
          Data Penjualan
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Cari berdasarkan nama customer"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: isDarkMode ? "white" : "inherit", // Latar belakang putih saat dark mode
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: isDarkMode ? "black" : "inherit", // Border hitam saat dark mode
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? "black" : "inherit", // Border hitam saat hover di dark mode
              },
              '&.Mui-focused fieldset': {
                borderColor: isDarkMode ? "black" : "inherit", // Border hitam saat fokus di dark mode
              },
            },
            '& .MuiInputLabel-root': {
              color: isDarkMode ? "black" : "inherit", // Label hitam saat dark mode
            },
            '& .MuiInputBase-input': {
              color: isDarkMode ? "black" : "inherit", // Teks input hitam saat dark mode
            },
          }}
        />
      </Box>

      <TableContainer component={Paper} elevation={3}>
        <Table sx={{ minWidth: 650 }} aria-label="penjualan table">
          <TableHead>
            <TableRow sx={{ backgroundColor: 'primary.main' }}>
              <TableCell sx={{ color: 'white' }}>No</TableCell>
              <TableCell sx={{ color: 'white' }}>Nama Customer</TableCell>
              <TableCell sx={{ color: 'white' }}>Pembayaran</TableCell>
              <TableCell sx={{ color: 'white' }}>Detail</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Barang</TableCell>
              <TableCell sx={{ color: 'white' }}>Total Harga</TableCell>
              <TableCell sx={{ color: 'white' }}>Tanggal Pembelian</TableCell>
              <TableCell sx={{ color: 'white' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPenjualan.map((nota, index) => (
              <TableRow
                key={nota.idPenjualan}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'action.hover' } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{nota.Customer_id.Nama_lengkap}</TableCell>
                <TableCell>{nota.metodePembayaran}</TableCell>
                <TableCell>
                  {nota.idCart &&
                    nota.idCart.map((item) => (
                      <Typography key={item.namaBarang} variant="body2" sx={{ mb: 0.5 }}>
                        {item.namaBarang} - {item.totalProduct} pcs
                      </Typography>
                    ))}
                </TableCell>
                <TableCell>{nota.totalBarang}</TableCell>
                <TableCell>Rp {nota.totalHarga.toLocaleString()}</TableCell>
                <TableCell>{new Date(nota.tanggalPembelian).toLocaleDateString('id-ID')}</TableCell>
                <TableCell>
                  <Tooltip title="Print Nota">
                    <IconButton
                      color="primary"
                      onClick={() => handlePrint(nota)}
                      size="small"
                    >
                      <PrintIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default PrintNota;
