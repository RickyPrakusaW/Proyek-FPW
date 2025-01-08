import React, { useState, useEffect } from "react";
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
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Profile() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const [profile, setProfile] = useState({
    nama_lengkap: "",
    id_karyawan: "",
    email: "",
    password: "",
  });
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const textColor = isDarkMode ? "#ffffff" : "#000000";
  const cardBgColor = isDarkMode ? "#424242" : "#ffffff";
  const backgroundColor = isDarkMode ? "#303030" : "#f5f5f5";

  // Fetch data user saat halaman dimuat
  useEffect(() => {
    const fetchProfile = async () => {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setError("Tidak ada pengguna yang login.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:3000/api/admin/profile/${user.email}`
        );
        const data = await response.json();

        if (response.ok) {
          setProfile(data);
        } else {
          setError(data.message || "Gagal mengambil data profil.");
        }
      } catch (error) {
        setError("Terjadi kesalahan pada server.");
      }
    };

    fetchProfile();
  }, []);

  const handlePasswordChange = async () => {
    if (!profile.email || !newEmail || !newPassword) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/updateKaryawan`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email_lama: profile.email,
            password_lama: profile.password,
            email_baru: newEmail,
            password_baru: newPassword,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Email dan password berhasil diperbarui!");
        navigate("/karyawan/listBarang");
      } else {
        setError(data.error || "Terjadi kesalahan.");
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server.");
    }
  };

  const handleToggleOldPassword = () => setShowOldPassword(!showOldPassword);
  const handleToggleNewPassword = () => setShowNewPassword(!showNewPassword);

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column", backgroundColor }}>
      {/* Header */}
      <Box sx={{ bgcolor: "blue", color: "white", p: 2, textAlign: "center" }}>
        <Typography variant="h5">Selamat Datang {profile.nama_lengkap || "User"}</Typography>
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
                  {profile.nama_lengkap || "User"}
                </Typography>
                <Typography variant="body2" sx={{ color: isDarkMode ? "#cccccc" : "#666666" }}>
                  {profile.id_karyawan || "000000"}
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
                value={profile.email}
                InputLabelProps={{ style: { color: textColor } }}
                InputProps={{
                  style: {
                    color: textColor,
                    backgroundColor: isDarkMode ? "#616161" : "#f0f0f0",
                  },
                }}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })} // Allow email to be edited
              />
              <TextField
                label="Password Lama"
                type={showOldPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={profile.password}
                InputLabelProps={{ style: { color: textColor } }}
                InputProps={{
                  style: {
                    color: textColor,
                    backgroundColor: isDarkMode ? "#616161" : "#f0f0f0",
                  },
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleOldPassword} edge="end">
                        {showOldPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setProfile({ ...profile, password: e.target.value })} // Allow password to be edited
              />
              <TextField
                label="Email Baru"
                variant="outlined"
                fullWidth
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
              <TextField
                label="Password Baru"
                type={showNewPassword ? "text" : "password"}
                variant="outlined"
                fullWidth
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleToggleNewPassword} edge="end">
                        {showNewPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
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
    </Box>
  );
}

export default Profile;
