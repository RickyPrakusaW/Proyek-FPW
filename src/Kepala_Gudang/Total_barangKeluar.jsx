import React from "react";
import { useTheme } from "../ThemeContext";

const Homekepalagudang = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  // Data Dummy untuk barang
  const barangData = [
    {
      id: "BRG001",
      nama: "Gandum",
      tipe: "Makanan",
      jumlah: "500 Karung",
      tanggalMasuk: "2024-12-01",
      foto: "https://via.placeholder.com/100",
    },
    {
      id: "BRG002",
      nama: "Pupuk",
      tipe: "Pertanian",
      jumlah: "300 Karung",
      tanggalMasuk: "2024-11-28",
      foto: "https://via.placeholder.com/100",
    },
    {
      id: "BRG003",
      nama: "Beras",
      tipe: "Makanan",
      jumlah: "200 Karung",
      tanggalMasuk: "2024-11-25",
      foto: "https://via.placeholder.com/100",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      } flex flex-col p-5 transition-colors duration-300`}
    >
      {/* Main Content Section */}
      <div className="flex-1 p-5 space-y-5">
        {/* Cards Section */}
        <div className="grid grid-cols-3 gap-5">
          <div
            className={`${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
            } p-5 rounded-md text-center cursor-pointer`}
          >
            <h3 className="text-xl font-semibold">Total Barang Masuk</h3>
            <p className="text-2xl font-bold">1000 Karung</p>
          </div>
          <div
            className={`${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
            } p-5 rounded-md text-center`}
          >
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div
            className={`${
              isDarkMode ? "bg-blue-600 text-white" : "bg-blue-300 text-black"
            } p-5 rounded-md text-center`}
          >
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">0 Barang</p>
          </div>
        </div>

        {/* Barang Cards Section */}
        <div className="grid grid-cols-3 gap-5">
          {barangData.map((barang) => (
            <div
              key={barang.id}
              className={`${
                isDarkMode ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
              } p-5 rounded-md text-center transition-colors`}
            >
              <img
                src={barang.foto}
                alt={barang.nama}
                className="w-20 h-20 mx-auto rounded-md mb-3"
              />
              <h4 className="text-lg font-bold">{barang.nama}</h4>
              <p className="text-sm">ID: {barang.id}</p>
              <p className="text-sm">Tipe: {barang.tipe}</p>
              <p className="text-sm">Jumlah: {barang.jumlah}</p>
              <p className="text-sm">Tanggal Masuk: {barang.tanggalMasuk}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homekepalagudang;
