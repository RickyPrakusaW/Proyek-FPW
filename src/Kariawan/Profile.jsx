import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
} from "@mui/material";

function Profile() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext
  const [oldEmail, setOldEmail] = useState(""); // State untuk email lama
  const [oldPassword, setOldPassword] = useState(""); // State untuk password lama
  const [newEmail, setNewEmail] = useState(""); // State untuk email baru
  const [newPassword, setNewPassword] = useState(""); // State untuk password baru
  const [error, setError] = useState(""); // State untuk error handling

  const textColor = isDarkMode ? "#ffffff" : "#000000"; // Warna teks
  const cardBgColor = isDarkMode ? "#424242" : "#ffffff"; // Warna kartu
  const backgroundColor = isDarkMode ? "#303030" : "#f5f5f5"; // Latar belakang

  const handlePasswordChange = async () => {
    if (!oldEmail || !oldPassword || !newEmail || !newPassword) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      const response = await fetch(
        "https://localhost:3000/api/admin/updatePassword",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldEmail,
            oldPassword,
            newEmail,
            newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Email dan password berhasil diperbarui!");
        navigate("/dashboard");
      } else {
        setError(data.error || "Terjadi kesalahan.");
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server.");
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <Card
        sx={{
          width: 400,
          bgcolor: cardBgColor,
          color: textColor,
          boxShadow: 3,
          borderRadius: 2,
          p: 3,
        }}
      >
        <CardContent>
          {/* Header */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
            <Avatar
              src="https://via.placeholder.com/100"
              alt="Profile"
              sx={{ width: 56, height: 56, mr: 2 }}
            />
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: textColor }}
              >
                Tiok Richie
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: isDarkMode ? "#cccccc" : "#666666" }}
              >
                000000
              </Typography>
            </Box>
          </Box>

          {/* Biodata Section */}
          <Typography variant="h6" sx={{ color: textColor, mb: 2 }}>
            Update Email dan Password
          </Typography>

          <Box component="form" sx={{ display: "grid", gap: 2 }}>
            <TextField
              label="Email Lama"
              variant="outlined"
              fullWidth
              value={oldEmail}
              onChange={(e) => setOldEmail(e.target.value)}
              InputLabelProps={{ style: { color: textColor } }}
              InputProps={{
                style: {
                  color: textColor,
                  backgroundColor: isDarkMode ? "#616161" : "#ffffff",
                },
              }}
            />

            <TextField
              label="Password Lama"
              type="password"
              variant="outlined"
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              InputLabelProps={{ style: { color: textColor } }}
              InputProps={{
                style: {
                  color: textColor,
                  backgroundColor: isDarkMode ? "#616161" : "#ffffff",
                },
              }}
            />

            <TextField
              label="Email Baru"
              variant="outlined"
              fullWidth
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              InputLabelProps={{ style: { color: textColor } }}
              InputProps={{
                style: {
                  color: textColor,
                  backgroundColor: isDarkMode ? "#616161" : "#ffffff",
                },
              }}
            />

            <TextField
              label="Password Baru"
              type="password"
              variant="outlined"
              fullWidth
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              InputLabelProps={{ style: { color: textColor } }}
              InputProps={{
                style: {
                  color: textColor,
                  backgroundColor: isDarkMode ? "#616161" : "#ffffff",
                },
              }}
            />

            {error && (
              <Typography variant="body2" sx={{ color: "red" }}>
                {error}
              </Typography>
            )}

            <Button
              variant="contained"
              fullWidth
              onClick={handlePasswordChange}
              sx={{
                bgcolor: "green",
                "&:hover": {
                  bgcolor: "darkgreen",
                },
              }}
            >
              Simpan
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Profile;
