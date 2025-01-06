import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
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
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const ReturAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [barangReturs, setBarangReturs] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [newRetur, setNewRetur] = useState({
    Id_barang: "",
    Nama_barang: "",
    Jumlah_barang: "",
    Tanggal: "",
    Photo_product: null,
  });

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const textColor = isDarkMode ? "text-white" : "text-black"; // Define text color based on theme

  useEffect(() => {
    fetchReturs();
  }, []);

  const fetchReturs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/getRetur"
      );
      setBarangReturs(response.data.data);
    } catch (error) {
      console.error("Error fetching return data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewRetur({
      ...newRetur,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setNewRetur({
      ...newRetur,
      Photo_product: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id_barang", newRetur.Id_barang);
    formData.append("Nama_barang", newRetur.Nama_barang);
    formData.append("Jumlah_barang", newRetur.Jumlah_barang);
    formData.append("Tanggal", newRetur.Tanggal);
    formData.append("Photo_product", newRetur.Photo_product);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/addRetur",
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      alert(response.data.message);
      setShowModal(false);
      setNewRetur({
        Id_barang: "",
        Nama_barang: "",
        Jumlah_barang: "",
        Tanggal: "",
        Photo_product: null,
      });
      fetchReturs();
    } catch (error) {
      console.error("Error adding return:", error);
      alert("Failed to add return!");
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/updateRetur/${id}`,
        { Status: status }
      );
      alert(response.data.message);
      fetchReturs();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status!");
    }
  };

  return (
    <div className={`flex min-h-screen ${themeClasses}`}>
      <div className="flex-1 p-5">
        <div className="flex justify-between items-center mb-5">
          <h1 className={`text-2xl font-bold ${textColor}`}>Retur Barang</h1>
          <TextField
            label="Cari"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            fullWidth
            sx={{
              maxWidth: 300,
              backgroundColor: isDarkMode ? "#2c2c2c" : "white", // Dark background in dark mode
              "& .MuiInputBase-root": {
                color: isDarkMode ? "white" : "black", // White text in dark mode, black text in light mode
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? "#555" : "#ccc", // Darker border in dark mode
              },
              "& .MuiInputLabel-root": {
                color: isDarkMode ? "#ccc" : "#000", // Lighter label in dark mode
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: isDarkMode ? "#fff" : "#000", // Highlight border on hover
              },
            }}
          />

          <Button
            variant="contained"
            color="success"
            onClick={() => setShowModal(true)}
          >
            + Tambah Retur
          </Button>
        </div>

        <TableContainer component={Paper} sx={{ maxHeight: "400px" }}>
          <Table stickyHeader aria-label="retur barang table">
            <TableHead>
              <TableRow>
                <TableCell className={textColor}>No</TableCell>
                <TableCell className={textColor}>ID Barang</TableCell>
                <TableCell className={textColor}>Nama Barang</TableCell>
                <TableCell className={textColor}>Jumlah</TableCell>
                <TableCell className={textColor}>Foto Barang</TableCell>
                <TableCell className={textColor}>Status</TableCell>
                <TableCell className={textColor}>Aksi</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barangReturs.length > 0 ? (
                barangReturs
                  .filter((barang) =>
                    barang.Nama_barang.toLowerCase().includes(
                      searchQuery.toLowerCase()
                    )
                  )
                  .map((barang, index) => (
                    <TableRow key={barang._id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{barang.Id_barang}</TableCell>
                      <TableCell>{barang.Nama_barang}</TableCell>
                      <TableCell>{barang.Jumlah_barang}</TableCell>
                      <TableCell>
                        <img
                          src={
                            barang.Photo_product
                              ? `http://localhost:3000/uploads/${barang.Photo_product}`
                              : "https://via.placeholder.com/40"
                          }
                          alt={barang.Nama_barang}
                          className="w-10 h-10"
                        />
                      </TableCell>
                      <TableCell>{barang.Status}</TableCell>
                      <TableCell>
                        {barang.Status === "Barang rusak" && (
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              updateStatus(
                                barang.Id_retur_admin,
                                "Barang diretur ke supplier"
                              )
                            }
                            sx={{
                              paddingX: 3,
                              paddingY: 1.5,
                              fontWeight: "bold",
                              borderRadius: 2,
                              textTransform: "capitalize",
                              border: "2px solid", // Adds a custom border width
                              borderColor: "primary.main", // Border color matching the primary theme
                              "&:hover": {
                                backgroundColor: "primary.main", // Hover effect with primary color
                                color: "white", // Text color changes on hover
                              },
                            }}
                          >
                            Retur ke Supplier
                          </Button>
                        )}
                        {barang.Status === "Barang diretur ke supplier" && (
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() =>
                              updateStatus(
                                barang.Id_retur_admin,
                                "Barang dikembalikan dari supplier"
                              )
                            }
                            sx={{
                              paddingX: 3,
                              paddingY: 1.5,
                              fontWeight: "bold",
                              borderRadius: 2,
                              textTransform: "capitalize",
                              border: "2px solid", // Adds a custom border width
                              borderColor: "secondary.main", // Border color matching the secondary theme
                              "&:hover": {
                                backgroundColor: "secondary.main", // Hover effect with secondary color
                                color: "white", // Text color changes on hover
                              },
                            }}
                          >
                            Kembali dari Supplier
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    Tidak ada data retur barang.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={showModal} onClose={() => setShowModal(false)}>
          <DialogTitle className="text-black">Tambah Retur</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit}>
              <TextField
                label="ID Barang"
                variant="outlined"
                name="Id_barang"
                value={newRetur.Id_barang}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Nama Barang"
                variant="outlined"
                name="Nama_barang"
                value={newRetur.Nama_barang}
                onChange={handleChange}
                fullWidth
                margin="normal"
              />
              <TextField
                label="Jumlah Barang"
                variant="outlined"
                name="Jumlah_barang"
                value={newRetur.Jumlah_barang}
                onChange={handleChange}
                type="number"
                fullWidth
                margin="normal"
              />
              <TextField
                label="Tanggal"
                variant="outlined"
                name="Tanggal"
                value={newRetur.Tanggal}
                onChange={handleChange}
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-3 w-full"
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setShowModal(false)}
              color="secondary"
              variant="contained"
              sx={{
                marginRight: 2,
                paddingX: 3,
                paddingY: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#f44336", // Hover effect with a custom color (red)
                },
              }}
            >
              Batal
            </Button>
            <Button
              onClick={handleSubmit}
              color="success"
              variant="contained"
              sx={{
                paddingX: 3,
                paddingY: 1.5,
                fontWeight: "bold",
                borderRadius: 2,
                textTransform: "capitalize",
                "&:hover": {
                  backgroundColor: "#4caf50", // Hover effect with a custom color (green)
                },
              }}
            >
              Simpan
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ReturAdmin;
