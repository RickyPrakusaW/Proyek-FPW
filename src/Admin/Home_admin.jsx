import React from "react";
import { useNavigate } from "react-router-dom";

const HomeAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="flex justify-between items-center p-5 bg-gray-800">
        <h1 className="text-xl font-bold">Home Page (Admin)</h1>
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
            <h2 className="text-xl font-semibold">Admin</h2>
          </div>
          <ul className="space-y-4">
            <li
              className="bg-blue-600 p-3 rounded-md cursor-pointer"
              onClick={() => navigate("/Homeadmin")}
            >
              Dashboard
            </li>
            <li
            onClick={() => navigate("/Managekariawan")}
              className="p-3 hover:bg-blue-600 rounded-md cursor-pointer"
                
            >
              Manage Karyawan
            </li>
            <li onClick={() => navigate("/Stockgudangadmin")} className="p-3 hover:bg-blue-600 rounded-md">Stock Gudang</li>
            <li onClick={() => navigate("/Returadmin")} className="p-3 hover:bg-blue-600 rounded-md">Retur Barang</li>
            <li className="p-3 hover:bg-blue-600 rounded-md">List Barang</li>
          </ul>
          <button
            className="mt-10 bg-pink-500 p-3 rounded-md w-full text-white font-semibold"
            onClick={() => navigate("/")}
          >
            Keluar
          </button>
        </div>

        <div className="flex-1 p-5 space-y-5">
          <div className="grid grid-cols-3 gap-5">
            <div className="bg-blue-600 p-5 rounded-md text-center">
              <h3 className="text-xl font-semibold">Penjualan Hari Ini</h3>
              <p className="text-2xl font-bold">Rp. 1.000.000</p>
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

          <div className="grid grid-cols-2 gap-5">
            <div className="bg-gray-800 p-5 rounded-md">
              <h3 className="text-xl font-semibold mb-3">Penjualan Bulanan</h3>
              <div className="relative w-full h-48 bg-blue-200 rounded-md"></div>
            </div>

            <div className="bg-gray-800 p-5 rounded-md">
              <h3 className="text-xl font-semibold mb-3">Stock Tipe Barang</h3>
              <div className="relative w-full h-48 bg-blue-200 rounded-md"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeAdmin;
