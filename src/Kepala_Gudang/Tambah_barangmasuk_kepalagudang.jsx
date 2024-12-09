import React from "react";
import { useTheme } from "./../ThemeContext";

const TambahBarangMasukKepalaGudang = () => {
  const { isDarkMode } = useTheme();

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

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses}`}>
      {/* Main Content */}
      <div className="w-4/5 p-5 mx-auto">
        {/* Form Title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Tambah Barang Masuk</h1>
        </div>

        {/* Form */}
        <form className={`shadow-lg rounded-lg p-6 ${isDarkMode ? "bg-gray-800" : "bg-gray-100"}`}>
          <div className="space-y-4">
            {/* ID Barang */}
            <div>
              <label className="block font-medium mb-1">ID Barang</label>
              <input
                type="text"
                placeholder="ID Barang"
                className={inputClasses}
              />
            </div>
            {/* Nama Barang */}
            <div>
              <label className="block font-medium mb-1">Nama Barang</label>
              <input
                type="text"
                placeholder="Nama Barang"
                className={inputClasses}
              />
            </div>
            {/* Jumlah Barang */}
            <div>
              <label className="block font-medium mb-1">Jumlah Barang</label>
              <input
                type="number"
                placeholder="Jumlah Barang"
                className={inputClasses}
              />
            </div>
            {/* Tipe Barang */}
            <div>
              <label className="block font-medium mb-1">Tipe Barang</label>
              <input
                type="text"
                placeholder="Tipe Barang"
                className={inputClasses}
              />
            </div>
            {/* Tanggal Masuk */}
            <div>
              <label className="block font-medium mb-1">Tanggal Masuk</label>
              <input
                type="date"
                className={inputClasses}
              />
            </div>
            {/* Foto Barang */}
            <div>
              <label className="block font-medium mb-1">Foto Barang</label>
              <div className="flex items-center">
                <input
                  type="file"
                  className={`border rounded px-3 py-2 ${isDarkMode ? "border-gray-700" : "border-gray-300"}`}
                />
                <span className={`ml-4 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                  Tidak Ada File yang Dipilih
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              className={buttonBackClasses}
            >
              Kembali
            </button>
            <button
              type="submit"
              className={buttonSaveClasses}
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TambahBarangMasukKepalaGudang;
