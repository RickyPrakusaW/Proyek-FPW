import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../ThemeContext"; // Import ThemeContext

function Profile() {
  const navigate = useNavigate();
  const { isDarkMode } = useTheme(); // Gunakan ThemeContext
  const [oldEmail, setOldEmail] = useState(""); // State untuk email lama
  const [oldPassword, setOldPassword] = useState(""); // State untuk password lama
  const [newEmail, setNewEmail] = useState(""); // State untuk email baru
  const [newPassword, setNewPassword] = useState(""); // State untuk password baru
  const [error, setError] = useState(""); // State untuk error handling

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-gray-100 text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "bg-gray-700 text-white border-gray-600"
    : "bg-white text-gray-900 border-gray-300";
  const labelClasses = isDarkMode ? "text-gray-400" : "text-gray-600"; // Untuk label
  const valueClasses = isDarkMode ? "text-white" : "text-gray-900"; // Untuk value

  const handlePasswordChange = async () => {
    // Validasi input
    if (!oldEmail || !oldPassword || !newEmail || !newPassword) {
      setError("Semua field wajib diisi!");
      return;
    }

    try {
      // Kirim request ke backend untuk validasi dan update password
      const response = await fetch("https://localhost:3000/api/admin/updatePassword", {
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
      });

      const data = await response.json();

      if (response.ok) {
        // Jika berhasil, tampilkan pesan sukses
        alert("Email dan password berhasil diperbarui!");
        navigate("/dashboard"); // Redirect ke halaman lain jika perlu
      } else {
        // Jika terjadi error, tampilkan pesan error
        setError(data.error || "Terjadi kesalahan.");
      }
    } catch (error) {
      setError("Terjadi kesalahan pada server.");
    }
  };

  return (
    <div className={`flex h-screen ${themeClasses}`}>
      {/* Main Content */}
      <div className={`w-3/4 p-6 ${cardClasses}`}>
        {/* Header */}
        <div className={`${cardClasses} rounded-lg shadow p-4 mb-6 flex items-center`}>
          <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
            <img
              src="https://via.placeholder.com/100"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Tiok Richie</h1>
            <p className={labelClasses}>000000</p>
          </div>
        </div>

        {/* Biodata Section */}
        <div className={`${cardClasses} rounded-lg shadow p-6`}>
          <h2 className="text-lg font-bold text-blue-600 mb-4">Update Email dan Password</h2>
          <div className="grid grid-cols-2 gap-y-4">
            <p className={labelClasses}>Email Lama</p>
            <input
              type="email"
              value={oldEmail}
              onChange={(e) => setOldEmail(e.target.value)}
              className={`border rounded-lg px-3 py-1 w-full ${inputClasses}`}
            />

            <p className={labelClasses}>Password Lama</p>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className={`border rounded-lg px-3 py-1 w-full ${inputClasses}`}
            />

            <p className={labelClasses}>Email Baru</p>
            <input
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              className={`border rounded-lg px-3 py-1 w-full ${inputClasses}`}
            />

            <p className={labelClasses}>Password Baru</p>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`border rounded-lg px-3 py-1 w-full ${inputClasses}`}
            />

            {error && <p className="text-red-500 mt-2 col-span-2">{error}</p>}
          </div>
          <button
            onClick={handlePasswordChange}
            className="mt-6 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;