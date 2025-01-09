import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

function ListBarangKaryawan() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cardStyles = {
    backgroundColor: isDarkMode ? "#424242" : "#fff",
    color: isDarkMode ? "#fff" : "#000",
  };

  const buttonStyles = {
    backgroundColor: isDarkMode ? "#66bb6a" : "#4caf50",
    "&:hover": {
      backgroundColor: isDarkMode ? "#388e3c" : "#388e3c",
    },
  };

  const textColor = {
    color: isDarkMode ? "#fff" : "#000",
  };

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/admin/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data.data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Add product to cart
  const addToCart = async (product) => {
    try {
      const response = await fetch("http://localhost:3000/api/admin/addToCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idBarang: product._id,
          Id_product: product._id,
          namaBarang: product.Nama_product,
          totalProduct: 1,
          harga: product.Harga,
          photo: product.Photo_product || "",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add product to cart");
      }

      const data = await response.json();
      alert(data.message || "Product successfully added to cart");
    } catch (error) {
      console.error("Error adding product to cart:", error.message);
      alert("An error occurred while adding product to the cart");
    }
  };

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#303030" : "#f5f5f5",
        minHeight: "100vh",
        padding: "16px",
      }}
    >
      {/* Tombol Chat dan Grup WhatsApp */}
      <div style={{ marginBottom: "16px" }}>
        <div
          style={{
            marginBottom: "8px",
            padding: "16px",
            backgroundColor: isDarkMode ? "#424242" : "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() => window.open("https://wa.me/6281332075758", "_blank")}
        >
          <Typography variant="h6" style={textColor}>
            Chat Admin
          </Typography>
          <Typography variant="body2" style={textColor}>
            Klik untuk membuka WhatsApp
          </Typography>
        </div>

        <div
          style={{
            padding: "16px",
            backgroundColor: isDarkMode ? "#424242" : "#fff",
            borderRadius: "8px",
            cursor: "pointer",
            textAlign: "center",
          }}
          onClick={() =>
            window.open("https://chat.whatsapp.com/HuPk8fAJxvc452QZkOL6Ii", "_blank")
          }
        >
          <Typography variant="h6" style={textColor}>
            Grup WhatsApp Karyawan
          </Typography>
          <Typography variant="body2" style={textColor}>
            Klik untuk masuk ke grup
          </Typography>
        </div>
      </div>

      {/* List Barang */}
      <Typography
        variant="h4"
        style={{
          color: isDarkMode ? "#bbdefb" : "#1976d2",
          marginBottom: "16px",
          ...textColor,
        }}
      >
        List Barang
      </Typography>
      {loading && <CircularProgress color={isDarkMode ? "secondary" : "primary"} />}
      {error && <Alert severity="error" style={textColor}>{error}</Alert>}
      {!loading && !error && (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card style={cardStyles}>
                {product.Photo_product ? (
                  <CardMedia
                    component="img"
                    height="140"
                    image={`http://localhost:3000/uploads/product/${product.Photo_product}`}
                    alt={product.Nama_product}
                  />
                ) : (
                  <div style={{ height: "140px", backgroundColor: "#e0e0e0" }} />
                )}
                <CardContent>
                  <Typography variant="h6" component="div" style={textColor}>
                    {product.Nama_product}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={textColor}>
                    Rp. {product.Harga}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" style={textColor}>
                    Stock: {product.Stock_barang}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    style={buttonStyles}
                    variant="contained"
                    onClick={() => addToCart(product)}
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
}

export default ListBarangKaryawan;
