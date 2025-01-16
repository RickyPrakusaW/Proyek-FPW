import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import axios from "axios";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
} from "@mui/material";

const ListBarangAdmin = () => {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const textColor = isDarkMode ? "white" : "black";
  const bgColor = isDarkMode ? "rgba(33, 33, 33, 1)" : "white";

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/admin/products")
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
      });
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.Nama_product &&
      product.Nama_product.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDetail = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: isDarkMode ? "grey.900" : "grey.100",
        color: textColor,
        padding: 4,
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Typography variant="h4" fontWeight="bold" color={textColor}>
          List Barang
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            variant="contained"
            sx={{
              bgcolor: "green",
              "&:hover": {
                bgcolor: "darkgreen",
              },
            }}
            onClick={() => navigate("/admin/tambahBarang")}
          >
            + Tambah Barang
          </Button>
          <TextField
            variant="outlined"
            placeholder="Cari"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              input: { color: textColor },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: isDarkMode ? "white" : "grey.400",
                },
                "&:hover fieldset": {
                  borderColor: isDarkMode ? "white" : "grey.600",
                },
              },
            }}
          />
        </Box>
      </Box>

      <Grid container spacing={4}>
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.Id_product}>
              <Card
                sx={{
                  backgroundColor: bgColor,
                  color: textColor,
                  border: isDarkMode ? "1px solid white" : "1px solid grey.400",
                  boxShadow: 3,
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={`http://localhost:3000/uploads/product/${product.Photo_product}`}
                  alt={product.Nama_product}
                />
                <CardContent>
                <Typography variant="body1">
                    Id Barang: Rp {product.Id_product}
                  </Typography>
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    {product.Nama_product}
                  </Typography>
                  <Typography variant="body1">
                    Harga: Rp {product.Harga}
                  </Typography>
                  <Typography variant="body1">
                    Stock: {product.Stock_barang}
                  </Typography>
                  <Typography variant="body1">
                    Tanggal Masuk:{" "}
                    {new Date(product.Tanggal_masuk).toLocaleDateString(
                      "id-ID"
                    )}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={() => handleDetail(product)}
                  >
                    Detail
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))
        ) : (
          <Typography
            variant="h6"
            color={textColor}
            textAlign="center"
            width="100%"
          >
            Tidak ada barang yang ditemukan.
          </Typography>
        )}
      </Grid>

      {/* Popup Modal */}
      <Dialog
        open={showPopup}
        onClose={handleClosePopup}
        fullWidth
        maxWidth="sm"
      >
        <DialogContent
          sx={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          {selectedProduct && (
            <>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                {selectedProduct.Nama_product}
              </Typography>
              
              <CardMedia
                component="img"
                height="300"
                image={`http://localhost:3000/uploads/product/${selectedProduct.Photo_product}`}
                alt={selectedProduct.Nama_product}
                sx={{ borderRadius: 2, marginBottom: 2 }}
              />
              <Typography variant="body1">
                heleh: Rp {selectedProduct.Harga}
              </Typography>
              <Typography variant="body1">
                Harga: Rp {selectedProduct.Harga}
              </Typography>
              <Typography variant="body1">
                Stock: {selectedProduct.Stock_barang}
              </Typography>
              <Typography variant="body1">
                Tanggal Masuk:{" "}
                {new Date(selectedProduct.Tanggal_masuk).toLocaleDateString(
                  "id-ID"
                )}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: bgColor,
            color: textColor,
          }}
        >
          <Button
            variant="contained"
            sx={{
              bgcolor: "red",
              "&:hover": {
                bgcolor: "darkred",
              },
            }}
            onClick={handleClosePopup}
            fullWidth
          >
            Kembali
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListBarangAdmin;
