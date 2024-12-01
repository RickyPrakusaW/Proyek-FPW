import React from "react";
import { useNavigate } from "react-router-dom";

const Homekepalagudang = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/Total_barang");
  };

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
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-xl font-bold">Home Page (Kepala_Gudang)</h1>
      </div>
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-1/4 bg-gray-800 p-5">
          <div className="flex items-center space-x-3 mb-10">
            <img
              src="https://via.placeholder.com/50"
              alt="Admin Avatar"
              className="rounded-full w-12 h-12"
            />
            <h2 className="text-xl font-semibold">Kepala Gudang</h2>
          </div>
          <ul className="space-y-4">
            <li
              className="bg-blue-600 p-3 rounded-md cursor-pointer"
              onClick={() => navigate("/Homekepalagudang")}
            >
              Dashboard
            </li>
            <li
              onClick={() => navigate("/Stockgudangkepalagudang")}
              className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
            >
              Stock Gudang
            </li>
            <li
              onClick={() => navigate("/Tambahbarangmasuukkepalagudang")}
              className="p-3 hover:bg-blue-600 rounded-md"
            >
              Tambah Barang Masuk
            </li>
            <li
              className="p-3 hover:bg-blue-600 rounded-md"
            >
              Barang Keluar
            </li>
            <li
              onClick={() => navigate("/Returkepalagudang")}
              className="p-3 hover:bg-blue-600 rounded-md"
            >
              Retur Barang
            </li>
          </ul>
          <button
            className="mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold"
            onClick={() => navigate("/")}
          >
            Keluar
          </button>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 space-y-5">
          {/* Cards */}
          <div className="grid grid-cols-3 gap-5">
            <div
              className="bg-blue-600 p-5 rounded-md text-center cursor-pointer"
              onClick={handleClick}
            >
              <h3 className="text-xl font-semibold">Total Barang Masuk</h3>
              <p className="text-2xl font-bold">1000 Karung</p>
            </div>
            <div className="bg-blue-600 p-5 rounded-md text-center">
              <h3 className="text-xl font-semibold">Total Barang Keluar</h3>
              <p className="text-2xl font-bold">1000</p>
            </div>
            <div className="bg-blue-600 p-5 rounded-md text-center">
              <h3 className="text-xl font-semibold">Total Barang</h3>
              <p className="text-2xl font-bold">0 Barang</p>
            </div>
          </div>

          {/* Barang Cards */}
          <div className="grid grid-cols-3 gap-5">
            {barangData.map((barang) => (
              <div
                key={barang.id}
                className="bg-gray-800 p-5 rounded-md text-center"
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
    </div>
  );
};

export default Homekepalagudang;
