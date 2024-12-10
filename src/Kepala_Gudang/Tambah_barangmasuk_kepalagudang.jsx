import React, { useState } from "react";
import { useTheme } from "./../ThemeContext";
import axios from "axios";

const TambahBarangMasukKepalaGudang = () => {
  const { isDarkMode } = useTheme();
  const [formData, setFormData] = useState({
    id_stock: "",
    nama_barang: "",
    total_barang: "",
    tipe_barang: "",
    tanggal_masuk: "",
  });
  const [photo_barang, setPhotoBarang] = useState(null);
  const [message, setMessage] = useState("");

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const inputClasses = isDarkMode
    ? "w-full border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    : "w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const buttonBackClasses = isDarkMode
    ? "bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600"
    : "bg-pink-300 text-black px-4 py-2 rounded hover:bg-pink-400";
  const buttonSaveClasses = isDarkMode
    ? "bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
    : "bg-green-300 text-black px-4 py-2 rounded hover:bg-green-400";

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
      const response = await axios.post("http://localhost:3000/api/admin/addStock", formPayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setMessage(response.data.message || "Stock berhasil ditambahkan");
      setFormData({
        id_stock: "",
        nama_barang: "",
        total_barang: "",
        tipe_barang: "",
        tanggal_masuk: "",
      });
      setPhotoBarang(null);
    } catch (error) {
      setMessage(error.response?.data?.error || "Terjadi kesalahan pada server");
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Main Content */}
      <div className="w-4/5 p-5 mx-auto">
        {/* Form Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tambah Barang Masuk</h1>
        </div>

        {/* Message */}
        {message && (
          <div className={`mb-4 p-3 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}>
            {message}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`shadow-lg rounded-lg p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}
        >
          <div className="space-y-4">
            {/* ID Barang */}
            <div>
              <label className="block font-medium mb-1">ID Barang</label>
              <input
                type="text"
                name="id_stock"
                value={formData.id_stock}
                onChange={handleChange}
                placeholder="ID Barang"
                className={inputClasses}
              />
            </div>
            {/* Nama Barang */}
            <div>
              <label className="block font-medium mb-1">Nama Barang</label>
              <input
                type="text"
                name="nama_barang"
                value={formData.nama_barang}
                onChange={handleChange}
                placeholder="Nama Barang"
                className={inputClasses}
              />
            </div>
            {/* Jumlah Barang */}
            <div>
              <label className="block font-medium mb-1">Jumlah Barang</label>
              <input
                type="number"
                name="total_barang"
                value={formData.total_barang}
                onChange={handleChange}
                placeholder="Jumlah Barang"
                className={inputClasses}
              />
            </div>
            {/* Tipe Barang */}
            <div>
              <label className="block font-medium mb-1">Tipe Barang</label>
              <input
                type="text"
                name="tipe_barang"
                value={formData.tipe_barang}
                onChange={handleChange}
                placeholder="Tipe Barang"
                className={inputClasses}
              />
            </div>
            {/* Tanggal Masuk */}
            <div>
              <label className="block font-medium mb-1">Tanggal Masuk</label>
              <input
                type="date"
                name="tanggal_masuk"
                value={formData.tanggal_masuk}
                onChange={handleChange}
                className={inputClasses}
              />
            </div>
            {/* Foto Barang */}
            <div>
              <label className="block font-medium mb-1">Foto Barang</label>
              <input
                type="file"
                onChange={handleFileChange}
                className={`border rounded px-3 py-2 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
              />
            </div>
          </div>

          {/* Buttons */}
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
    </div>
  );
};

export default TambahBarangMasukKepalaGudang;
