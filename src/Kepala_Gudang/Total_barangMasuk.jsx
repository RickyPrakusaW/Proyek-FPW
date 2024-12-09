import React from "react";
import { useTheme } from "./../ThemeContext";

const Homekepalagudang = () => {
  const { isDarkMode } = useTheme();

  const themeClasses = isDarkMode
    ? "bg-gray-900 text-white"
    : "bg-white text-gray-900";
  const cardClasses = isDarkMode
    ? "bg-blue-600 text-white p-5 rounded-md text-center cursor-pointer"
    : "bg-blue-300 text-black p-5 rounded-md text-center cursor-pointer";
  const sidebarClasses = isDarkMode
    ? "bg-gray-800 text-white"
    : "bg-gray-200 text-black";
  const sidebarHoverClasses = isDarkMode
    ? "hover:bg-blue-600"
    : "hover:bg-blue-400";
  const buttonClasses = isDarkMode
    ? "bg-pink-500 text-white p-3 rounded-md w-full font-semibold hover:bg-pink-600"
    : "bg-pink-300 text-black p-3 rounded-md w-full font-semibold hover:bg-pink-400";

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
    <div className={`min-h-screen flex ${themeClasses}`}>
      {/* Main Content */}
      <div className="flex-1 p-5 space-y-5">
        <div className="grid grid-cols-3 gap-5">
          <div className={cardClasses}>
            <h3 className="text-xl font-semibold">Total Barang Masuk</h3>
            <p className="text-2xl font-bold">1000 Karung</p>
          </div>
          <div className={cardClasses}>
            <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
            <p className="text-2xl font-bold">1000</p>
          </div>
          <div className={cardClasses}>
            <h3 className="text-xl font-semibold">Total Barang</h3>
            <p className="text-2xl font-bold">0 Barang</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5">
          {barangData.map((barang) => (
            <div
              key={barang.id}
              className={`p-5 rounded-md text-center ${sidebarClasses}`}
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
