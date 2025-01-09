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
  Box,
  Paper,
  styled,
  TextField,
} from "@mui/material";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GroupsIcon from '@mui/icons-material/Groups';

// Styled Components
const WhatsAppButton = styled(Paper)(({ theme, isDarkMode }) => ({
  padding: '16px',
  backgroundColor: isDarkMode ? '#424242' : '#ffffff',
  borderRadius: '12px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 16px rgba(37, 211, 102, 0.2)',
    backgroundColor: isDarkMode ? '#505050' : '#f8f8f8',
    '& .whatsapp-icon': {
      color: '#25D366',
      transform: 'scale(1.1)',
    }
  }
}));

function ListBarangKaryawan() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(""); // state for search query

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

  // Filter products based on search query
  const filteredProducts = products.filter((product) =>
    (product.Id_product && product.Id_product.toString().toLowerCase().includes(searchQuery.toLowerCase())) ||
    (product.Nama_product && product.Nama_product.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  

  return (
    <div
      style={{
        backgroundColor: isDarkMode ? "#303030" : "#f5f5f5",
        minHeight: "100vh",
        padding: "24px",
      }}
    >
      {/* WhatsApp Buttons Section */}
      <Grid container spacing={2} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <WhatsAppButton 
            isDarkMode={isDarkMode}
            elevation={1}
            onClick={() => window.open("https://wa.me/6281332075758", "_blank")}
            sx={{ height: '100%', marginBottom: { xs: 2, md: 0 } }}
          >
            <WhatsAppIcon 
              className="whatsapp-icon"
              sx={{ 
                fontSize: 32,
                color: isDarkMode ? '#ffffff' : '#128C7E',
                transition: 'all 0.3s ease'
              }} 
            />
            <Box>
              <Typography variant="h6" style={textColor}>
                Chat Admin
              </Typography>
              <Typography variant="body2" style={textColor} sx={{ opacity: 0.8 }}>
                Klik untuk membuka WhatsApp
              </Typography>
            </Box>
          </WhatsAppButton>
        </Grid>

        <Grid item xs={12} md={6}>
          <WhatsAppButton 
            isDarkMode={isDarkMode}
            elevation={1}
            onClick={() => window.open("https://chat.whatsapp.com/HuPk8fAJxvc452QZkOL6Ii", "_blank")}
            sx={{ height: '100%' }}
          >
            <GroupsIcon 
              className="whatsapp-icon"
              sx={{ 
                fontSize: 32,
                color: isDarkMode ? '#ffffff' : '#128C7E',
                transition: 'all 0.3s ease'
              }} 
            />
            <Box>
              <Typography variant="h6" style={textColor}>
                Grup WhatsApp Karyawan
              </Typography>
              <Typography variant="body2" style={textColor} sx={{ opacity: 0.8 }}>
                Klik untuk masuk ke grup
              </Typography>
            </Box>
          </WhatsAppButton>
        </Grid>
      </Grid>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          label="Search by ID or Name"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{
            backgroundColor: isDarkMode ? "#424242" : "#fff",
            "& .MuiInputBase-root": {
              color: isDarkMode ? "#fff" : "#000",
            },
          }}
        />
      </Box>

      {/* List Barang Section */}
      <Typography
        variant="h4"
        sx={{
          color: isDarkMode ? "#bbdefb" : "#1976d2",
          marginBottom: "24px",
          fontWeight: 600,
        }}
      >
        List Barang
      </Typography>

      {loading && (
        <Box display="flex" justifyContent="center" my={4}>
          <CircularProgress color={isDarkMode ? "secondary" : "primary"} />
        </Box>
      )}
      
      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}
      
      {!loading && !error && (
        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product._id}>
              <Card style={cardStyles}>
                {product.Photo_product ? (
                  <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:3000/uploads/product/${product.Photo_product}`}
                    alt={product.Nama_product}
                    sx={{ objectFit: "cover" }}
                  />
                ) : (
                  <Box height="200px" bgcolor="#e0e0e0" />
                )}
                <CardContent>
                <Typography 
                    variant="h6" 
                    component="div" 
                    style={textColor}
                    gutterBottom
                    noWrap
                  >
                    {product.Id_product}
                  </Typography>
                  <Typography 
                    variant="h6" 
                    component="div" 
                    style={textColor}
                    gutterBottom
                    noWrap
                  >
                    {product.Nama_product}
                  </Typography>
                  <Typography 
                    variant="body1" 
                    style={textColor}
                    sx={{ fontWeight: 600, mb: 1 }}
                  >
                    Rp. {product.Harga.toLocaleString('id-ID')}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    style={textColor}
                    sx={{ opacity: 0.8 }}
                  >
                    Stock: {product.Stock_barang}
                  </Typography>
                </CardContent>
                <CardActions sx={{ padding: 2 }}>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => addToCart(product)}
                    sx={{
                      ...buttonStyles,
                      borderRadius: '8px',
                      textTransform: 'none',
                      py: 1
                    }}
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
