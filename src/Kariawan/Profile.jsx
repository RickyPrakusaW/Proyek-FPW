import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext";
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
  const { isDarkMode } = useTheme();
  const [oldEmail, setOldEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");

  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const cardBgColor = isDarkMode ? "#424242" : "#ffffff";
  const backgroundColor = isDarkMode ? "#303030" : "#f5f5f5";

  const handlePasswordChange = async () => {
    if (!oldEmail || !oldPassword || !newEmail || !newPassword) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/admin/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          oldEmail,
          oldPassword,
          newEmail,
          newPassword,
        }),
      });

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
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor }}>
      {/* Header */}
      <Box sx={{ bgcolor: "blue", color: "white", p: 2, textAlign: "center" }}>
        <Typography variant="h5">Selamat Datang Admin</Typography>
      </Box>

      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            {/* Profile Section */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
              <Avatar
                src="https://via.placeholder.com/100"
                alt="Profile"
                sx={{ width: 56, height: 56, mr: 2 }}
              />
              <Box>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: textColor }}>
                  Tiok Richie
                </Typography>
                <Typography variant="body2" sx={{ color: isDarkMode ? "#cccccc" : "#666666" }}>
                  000000
                </Typography>
              </Box>
            </Box>

            {/* Form Section */}
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

      {/* Footer */}
      <Box sx={{ bgcolor: "blue", color: "white", p: 2, textAlign: "center" }}>
        <Typography variant="body2">Proyek FPW 2025</Typography>
      </Box>
    </Box>
  );
}

export default Profile;
