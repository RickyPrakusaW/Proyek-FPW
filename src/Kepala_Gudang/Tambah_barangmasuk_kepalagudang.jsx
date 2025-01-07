import React, { useState } from "react";
import { useTheme } from "./../ThemeContext";
import axios from "axios";
import { Alert, Snackbar } from "@mui/material"; // Import komponen Alert dan Snackbar

const TambahBarangMasukKepalaGudang = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    id_barang: "",
    nama_barang: "",
    total_barang: "",
    tipe_barang: "",
    tanggal_masuk: "",
    tanggal_keluar: "",
  });
  const [photo_barang, setPhotoBarang] = useState(null);
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false); // State untuk mengontrol Snackbar

  // Updated theme classes dengan warna teks yang konsisten
  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";

  const formContainerClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-100 text-gray-900";

  const inputClasses = isDarkMode
    ? "w-full border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
    : "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-900";

  const labelClasses = isDarkMode
    ? "block font-medium mb-1 text-white"
    : "block font-medium mb-1 text-gray-900";

  const buttonBackClasses = isDarkMode
    ? "bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
    : "bg-pink-300 text-gray-900 px-4 py-2 rounded hover:bg-pink-400";

  const buttonSaveClasses = isDarkMode
    ? "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    : "bg-green-300 text-gray-900 px-4 py-2 rounded hover:bg-green-400";

  const titleClasses = isDarkMode
    ? "text-2xl font-bold text-white"
    : "text-2xl font-bold text-gray-900";

  const fileInputClasses = isDarkMode
    ? "border rounded px-3 py-2 border-gray-700 text-white"
    : "border rounded px-3 py-2 border-gray-300 text-gray-900";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setPhotoBarang(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    const formPayload = new FormData();
    Object.keys(formData).forEach((key) => {
      formPayload.append(key, formData[key]);
    });
    if (photo_barang) {
      formPayload.append("photo_barang", photo_barang);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/addStock",
        formPayload,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setMessage(response.data.message || "Stock berhasil ditambahkan");
      setOpenSnackbar(true); // Buka Snackbar
      setFormData({
        id_barang: "",
        nama_barang: "",
        total_barang: "",
        tipe_barang: "",
        tanggal_masuk: "",
        tanggal_keluar: "",
      });
      setPhotoBarang(null);
    } catch (error) {
      setMessage(
        error.response?.data?.error || "Terjadi kesalahan pada server"
      );
      setOpenSnackbar(true); // Buka Snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false); // Tutup Snackbar
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      <div className="w-4/5 p-5 mx-auto">
        <div className="mb-6">
          <h1 className={titleClasses}>Tambah Barang Masuk</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className={`shadow-lg rounded-lg p-6 ${formContainerClasses}`}
        >
          <div className="space-y-4">
            <div>
              <label className={labelClasses}>ID Barang</label>
              <input
                type="text"
                name="id_barang"
                value={formData.id_barang}
                onChange={handleChange}
                placeholder="ID Barang"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Nama Barang</label>
              <input
                type="text"
                name="nama_barang"
                value={formData.nama_barang}
                onChange={handleChange}
                placeholder="Nama Barang"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Jumlah Barang</label>
              <input
                type="number"
                name="total_barang"
                value={formData.total_barang}
                onChange={handleChange}
                placeholder="Jumlah Barang"
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Tipe Barang</label>
              <select
                name="tipe_barang"
                value={formData.tipe_barang}
                onChange={handleChange}
                className={inputClasses}
              >
                <option value="">Pilih Tipe Barang</option>
                <option value="Tas_pakaian">Tas Pakaian</option>
                <option value="Tas_ransel">Tas Ransel</option>
                <option value="Tas_selempang">Tas Selempang</option>
              </select>
            </div>
            <div>
              <label className={labelClasses}>Tanggal Masuk</label>
              <input
                type="date"
                name="tanggal_masuk"
                value={formData.tanggal_masuk}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            <div>
              <label className={labelClasses}>Foto Barang</label>
              <input
                type="file"
                onChange={handleFileChange}
                className={fileInputClasses}
              />
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button type="button" className={buttonBackClasses}>
              Kembali
            </button>
            <button type="submit" className={buttonSaveClasses}>
              Simpan
            </button>
          </div>
        </form>
      </div>

      {/* Snackbar untuk menampilkan pesan */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000} // Snackbar akan hilang setelah 6 detik
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={message?.includes("berhasil") ? "success" : "error"} // Tentukan jenis Alert (success/error)
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TambahBarangMasukKepalaGudang;